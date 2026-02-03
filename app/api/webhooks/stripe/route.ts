import { NextRequest, NextResponse } from 'next/server'
import { PaymentService } from '@/lib/services/payment'
import { EmailService } from '@/lib/services/email'
import { prisma } from '@/lib/prisma'
import Stripe from 'stripe'

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

        // Créer la commande dans la base de données
        const order = await prisma.order.create({
          data: {
            userId: userId || 'anonymous',
            stripeSessionId: session.id,
            status: 'paid',
            totalAmount,
            currency: session.currency || 'eur',
            customerEmail: email,
            items: {
              create: await Promise.all(
                lineItems.data.map(async (lineItem, index) => {
                  const quantity = lineItem.quantity || 1
                  const unitPrice = (lineItem.price?.unit_amount || 0) / 100

                  // Essayer d'utiliser le productId depuis les metadata en premier
                  let productId: string | undefined = productIdsFromMetadata[index]

                  // Si pas trouvé dans les metadata, chercher par nom
                  if (!productId) {
                    const productName = lineItem.description || lineItem.price?.product?.name || 'Produit'
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

        // Créer la facture Stripe
        let invoicePdfUrl: string | null = null
        let invoiceHostedUrl: string | null = null
        
        if (session.customer) {
          try {
            const stripeCustomerId = typeof session.customer === 'string' 
              ? session.customer 
              : session.customer.id

            console.log(`[webhooks/stripe] 🧾 Creating Stripe Invoice for customer: ${stripeCustomerId}`)

            // Créer les invoice items
            await Promise.all(
              order.items.map(async (item) => {
                const productName = item.product?.name || 'Produit'
                await stripe.invoiceItems.create({
                  customer: stripeCustomerId,
                  amount: Math.round(item.price * item.quantity * 100), // Convertir en centimes
                  currency: 'eur',
                  description: `${productName} × ${item.quantity}`,
                })
              })
            )

            // Créer la facture
            const invoice = await stripe.invoices.create({
              customer: stripeCustomerId,
              auto_advance: false,
              description: `Facture pour la commande ${order.id}`,
              metadata: {
                orderId: order.id,
              },
            })

            // Finaliser la facture pour générer le PDF
            const finalizedInvoice = await stripe.invoices.finalizeInvoice(invoice.id)
            
            // Marquer comme payée si nécessaire
            let paidInvoice = finalizedInvoice
            if (finalizedInvoice.status === 'open') {
              paidInvoice = await stripe.invoices.pay(finalizedInvoice.id, {
                paid_out_of_band: true,
              })
            }

            invoicePdfUrl = paidInvoice.invoice_pdf || null
            invoiceHostedUrl = paidInvoice.hosted_invoice_url || null

            console.log(`[webhooks/stripe] ✅ Invoice created: ${paidInvoice.id}`)
            console.log(`[webhooks/stripe] ✅ Invoice PDF: ${invoicePdfUrl}`)
          } catch (invoiceError) {
            console.error('[webhooks/stripe] ⚠️ Failed to create Stripe Invoice:', invoiceError)
            // Ne pas faire échouer le webhook si la facture échoue
          }
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

