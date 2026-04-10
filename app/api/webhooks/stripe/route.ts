import { NextRequest, NextResponse } from 'next/server'
import { PaymentService } from '@/lib/services/payment'
import { EmailService } from '@/lib/services/email'
import { prisma } from '@/lib/prisma'
import Stripe from 'stripe'
import {
  checkoutAddressSnapshots,
  formatCheckoutAddressesForEmail,
} from '@/lib/stripe/checkoutAddresses'
import {
  parseDeliveryMethod,
  pickupShippingAddressSnapshot,
  pickupShippingSummaryText,
} from '@/lib/constants/delivery'

/**
 * API Route pour gérer les webhooks Stripe
 * POST /api/webhooks/stripe
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')

    if (!signature) {
      return NextResponse.json(
        { error: 'Signature manquante' },
        { status: 400 }
      )
    }

    // Vérifier la signature du webhook
    const event = PaymentService.verifyWebhookSignature(body, signature)

    // Gérer les différents types d'événements
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        
        // Le paiement a été complété avec succès
        console.log('[webhooks/stripe] Payment successful:', {
          sessionId: session.id,
          customerEmail: session.customer_email,
          amountTotal: session.amount_total,
          metadata: session.metadata,
        })

        // Vérifier que le paiement est bien complété
        if (session.payment_status !== 'paid') {
          console.log(`[webhooks/stripe] Payment status is ${session.payment_status}, skipping order creation`)
          break
        }

        const email = session.customer_details?.email || session.customer_email
        const userId = session.metadata?.userId as string | undefined
        const stripe = PaymentService.getStripeClient()

        if (!email) {
          console.warn('[webhooks/stripe] No email found in session, skipping order creation')
          break
        }

        // Récupérer les line items de la session
        const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
          expand: ['data.price.product'],
        })

        if (lineItems.data.length === 0) {
          console.warn('[webhooks/stripe] No line items found in session')
          break
        }

        // Calculer le total
        const totalAmount = (session.amount_total || 0) / 100 // Convertir de centimes en euros

        // Récupérer les productIds depuis les metadata si disponibles
        const productIdsFromMetadata = session.metadata?.productIds 
          ? (session.metadata.productIds as string).split(',').filter(Boolean)
          : []

        const addrSnap = checkoutAddressSnapshots(session)
        const addrEmail = formatCheckoutAddressesForEmail(session)
        const deliveryMethod = parseDeliveryMethod(session.metadata?.deliveryMethod)
        const isPickup = deliveryMethod === 'pickup'

        const shippingAddressForOrder = isPickup
          ? pickupShippingAddressSnapshot()
          : addrSnap.shippingAddress
            ? (addrSnap.shippingAddress as object)
            : undefined

        const shippingSummaryForEmail = isPickup
          ? pickupShippingSummaryText()
          : addrEmail.shippingSummary || undefined

        // Créer la commande dans la base de données
        const order = await prisma.order.create({
          data: {
            userId: userId || 'anonymous',
            stripeSessionId: session.id,
            status: 'paid',
            totalAmount,
            currency: session.currency || 'eur',
            deliveryMethod,
            customerEmail: email,
            customerPhone: addrSnap.customerPhone,
            billingAddress: addrSnap.billingAddress
              ? (addrSnap.billingAddress as object)
              : undefined,
            shippingAddress: shippingAddressForOrder,
            items: {
              create: await Promise.all(
                lineItems.data.map(async (lineItem, index) => {
                  const quantity = lineItem.quantity || 1
                  const unitPrice = (lineItem.price?.unit_amount || 0) / 100

                  // Essayer d'utiliser le productId depuis les metadata en premier
                  let productId: string | undefined = productIdsFromMetadata[index]

                  // Si pas trouvé dans les metadata, chercher par nom
                  if (!productId) {
                    // Extraire le nom du produit de manière sûre
                    let productName: string = lineItem.description || 'Produit'
                    
                    const productObject = lineItem.price?.product
                    if (productObject && typeof productObject === 'object' && 'name' in productObject) {
                      const stripeProduct = productObject as Stripe.Product
                      if (stripeProduct.name) {
                        productName = stripeProduct.name
                      }
                    }
                    
                    try {
                      const product = await prisma.product.findFirst({
                        where: {
                          OR: [
                            { name: productName },
                            { sku: productName },
                          ],
                        },
                      })
                      productId = product?.id
                    } catch (error) {
                      console.warn('[webhooks/stripe] Could not find product:', error)
                    }
                  }

                  if (!productId) {
                    throw new Error(`Product not found for line item: ${lineItem.description || 'Unknown'}`)
                  }

                  return {
                    productId,
                    quantity,
                    price: unitPrice,
                  }
                })
              ),
            },
          },
          include: {
            items: {
              include: {
                product: true,
              },
            },
          },
        })

        console.log(`[webhooks/stripe] ✅ Order created: ${order.id}`)

        // Récupérer la facture Stripe auto-générée (invoice_creation: enabled sur Checkout)
        let invoicePdfUrl: string | null = null
        let invoiceHostedUrl: string | null = null

        try {
          // session.invoice est défini quand invoice_creation: { enabled: true } est configuré
          const invoiceId = typeof session.invoice === 'string'
            ? session.invoice
            : (session.invoice as Stripe.Invoice | null)?.id ?? null

          if (invoiceId) {
            console.log(`[webhooks/stripe] 🧾 Retrieving auto-generated invoice: ${invoiceId}`)
            const invoice = await stripe.invoices.retrieve(invoiceId)

            // La facture doit être finalisée pour avoir un PDF
            let finalInvoice = invoice
            if (invoice.status === 'draft') {
              finalInvoice = await stripe.invoices.finalizeInvoice(invoice.id)
            }

            invoicePdfUrl = finalInvoice.invoice_pdf || null
            invoiceHostedUrl = finalInvoice.hosted_invoice_url || null

            console.log(`[webhooks/stripe] ✅ Invoice PDF: ${invoicePdfUrl}`)
          } else {
            console.warn('[webhooks/stripe] No invoice on session (invoice_creation not enabled or not yet available)')
          }
        } catch (invoiceError) {
          console.error('[webhooks/stripe] ⚠️ Failed to retrieve invoice:', invoiceError)
        }

        // Envoyer l'email de confirmation
        try {
          const emailConfigured = !!(process.env.EMAIL_USER && process.env.EMAIL_PASSWORD)
          if (!emailConfigured) {
            console.warn('[webhooks/stripe] ⚠️ Email not configured, skipping email send')
          } else {
            await EmailService.sendOrderConfirmationEmail({
              orderId: order.id,
              orderNumber: order.id.substring(0, 8).toUpperCase(),
              customerEmail: email,
              customerName: session.customer_details?.name || undefined,
              customerPhone: addrEmail.customerPhone,
              deliveryMethod,
              billingAddressSummary: addrEmail.billingSummary || undefined,
              shippingAddressSummary: shippingSummaryForEmail,
              items: order.items.map((item) => ({
                name: item.product?.name || 'Produit',
                quantity: item.quantity,
                price: item.price,
              })),
              totalAmount: order.totalAmount,
              currency: order.currency,
              invoicePdfUrl: invoicePdfUrl || undefined,
              invoiceHostedUrl: invoiceHostedUrl || undefined,
            })
            console.log(`[webhooks/stripe] ✅ Confirmation email sent to ${email}`)
          }
        } catch (emailError) {
          console.error('[webhooks/stripe] ❌ Failed to send confirmation email:', emailError)
          // Ne pas faire échouer le webhook si l'email échoue
        }

        break
      }

      case 'checkout.session.async_payment_succeeded': {
        const session = event.data.object as Stripe.Checkout.Session
        console.log('Async payment succeeded:', session.id)
        // Gérer le paiement asynchrone réussi
        break
      }

      case 'checkout.session.async_payment_failed': {
        const session = event.data.object as Stripe.Checkout.Session
        console.log('Async payment failed:', session.id)
        // Gérer l'échec du paiement asynchrone
        break
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.log('Payment intent succeeded:', paymentIntent.id)
        break
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.log('Payment intent failed:', paymentIntent.id)
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error: unknown) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: `Webhook Error: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 400 }
    )
  }
}

