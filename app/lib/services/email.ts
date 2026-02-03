import nodemailer from 'nodemailer'

export type SendMailParams = {
  to: string
  subject: string
  text?: string
  html?: string
  from?: string
  replyTo?: string
  attachments?: Array<{
    filename: string
    content: Buffer | string
    contentType?: string
  }>
}

/**
 * Service pour envoyer des emails
 */
export class EmailService {
  private static transporter: nodemailer.Transporter | null = null

  /**
   * Initialise le transporteur email
   */
  private static getTransporter(): nodemailer.Transporter {
    if (!this.transporter) {
      const emailUser = process.env.EMAIL_USER
      const emailPassword = process.env.EMAIL_PASSWORD

      if (!emailUser || !emailPassword) {
        throw new Error('EMAIL_USER et EMAIL_PASSWORD doivent être définis dans les variables d\'environnement')
      }

      this.transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true pour le port 465, false pour les autres ports
        auth: {
          user: emailUser,
          pass: emailPassword,
        },
        tls: {
          // Ne pas rejeter les certificats non autorisés en développement
          // En production, laisser la vérification par défaut
          rejectUnauthorized: process.env.NODE_ENV === 'production',
        },
        // Options supplémentaires pour éviter les problèmes de certificat
        requireTLS: true,
        connectionTimeout: 10000, // 10 secondes
        greetingTimeout: 10000,
      })
    }

    return this.transporter
  }

  /**
   * Envoie un email générique
   */
  static async sendMail(params: SendMailParams): Promise<void> {
    try {
      const transporter = this.getTransporter()
      const emailUser = process.env.EMAIL_USER
      const from = params.from || emailUser || 'no-reply@hydroclic.com'

      await transporter.sendMail({
        from,
        to: params.to,
        subject: params.subject,
        text: params.text,
        html: params.html,
        replyTo: params.replyTo,
        attachments: params.attachments,
      })

      console.log(`[EmailService] ✅ Email sent successfully to ${params.to}`)
    } catch (error) {
      console.error('[EmailService] ❌ Failed to send email:', error)
      throw error
    }
  }

  /**
   * Envoie un email de contact
   */
  static async sendContactEmail(data: {
    name: string
    email: string
    phone?: string
    subject: string
    message: string
  }): Promise<void> {
    const adminEmail = process.env.ADMIN_EMAIL

    if (!adminEmail) {
      throw new Error('ADMIN_EMAIL doit être défini dans les variables d\'environnement')
    }

    const emailUser = process.env.EMAIL_USER
    if (!emailUser) {
      throw new Error('EMAIL_USER doit être défini dans les variables d\'environnement')
    }

    try {
      const transporter = this.getTransporter()

      const mailOptions = {
        from: `"${data.name}" <${emailUser}>`,
        to: adminEmail,
        replyTo: data.email,
        subject: `Contact: ${data.subject}`,
        html: `
          <h2>Nouveau message de contact</h2>
          <p><strong>Nom:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          ${data.phone ? `<p><strong>Téléphone:</strong> ${data.phone}</p>` : ''}
          <p><strong>Sujet:</strong> ${data.subject}</p>
          <hr>
          <p><strong>Message:</strong></p>
          <p>${data.message.replace(/\n/g, '<br>')}</p>
        `,
        text: `
Nouveau message de contact

Nom: ${data.name}
Email: ${data.email}
${data.phone ? `Téléphone: ${data.phone}` : ''}
Sujet: ${data.subject}

Message:
${data.message}
        `,
      }

      await transporter.sendMail(mailOptions)
    } catch (error) {
      console.error('EmailService error:', error)
      throw error
    }
  }

  /**
   * Envoie un email de confirmation de commande avec les détails et la facture
   */
  static async sendOrderConfirmationEmail(data: {
    orderId: string
    orderNumber?: string
    customerEmail: string
    customerName?: string
    items: Array<{
      name: string
      quantity: number
      price: number
    }>
    totalAmount: number
    currency?: string
    invoicePdfUrl?: string
    invoiceHostedUrl?: string
  }): Promise<void> {
    const currencySymbol = data.currency === 'eur' || data.currency === 'EUR' ? '€' : data.currency || '€'
    const orderTotal = data.totalAmount.toFixed(2)
    const orderNumber = data.orderNumber || data.orderId.substring(0, 8).toUpperCase()
    const customerName = data.customerName || data.customerEmail.split('@')[0]

    const itemsList = data.items
      .map(
        (item) =>
          `• ${item.name} × ${item.quantity} - ${(item.price * item.quantity).toFixed(2)}${currencySymbol}`
      )
      .join('\n')

    const htmlCustomer = `
      <div style="font-family:system-ui,Arial,sans-serif;font-size:14px;line-height:1.6;max-width:600px;margin:0 auto">
        <h2 style="color:#1a1a1a;margin:0 0 20px 0">Confirmation de votre commande</h2>
        <p>Bonjour${customerName ? ` ${customerName}` : ''},</p>
        <p>Nous avons bien reçu votre paiement. Votre commande a été confirmée.</p>
        
        <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:16px;margin:20px 0">
          <h3 style="margin:0 0 12px 0;color:#1a1a1a">Détails de la commande</h3>
          <p style="margin:4px 0"><strong>Numéro de commande:</strong> ${orderNumber}</p>
          <p style="margin:4px 0"><strong>Date:</strong> ${new Date().toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}</p>
        </div>

        <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:16px;margin:20px 0">
          <h3 style="margin:0 0 12px 0;color:#1a1a1a">Vos informations de contact</h3>
          <p style="margin:4px 0"><strong>Email:</strong> ${data.customerEmail}</p>
        </div>

        <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:16px;margin:20px 0">
          <h3 style="margin:0 0 12px 0;color:#1a1a1a">Articles commandés</h3>
          <pre style="white-space:pre-wrap;font-family:inherit;margin:0">${itemsList}</pre>
        </div>

        <div style="background:#f0fdf4;border:1px solid #86efac;border-radius:8px;padding:16px;margin:20px 0">
          <p style="margin:0;font-size:18px;font-weight:600;color:#166534">
            <strong>Total payé: ${orderTotal}${currencySymbol}</strong>
          </p>
        </div>

        ${data.invoicePdfUrl ? `
        <div style="background:#eff6ff;border:1px solid #93c5fd;border-radius:8px;padding:16px;margin:20px 0;text-align:center">
          <p style="margin:0 0 12px 0;color:#1e40af;font-weight:600">📄 Votre facture</p>
          <a href="${data.invoicePdfUrl}" style="display:inline-block;background:#2563eb;color:white;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:500">Télécharger la facture PDF</a>
          ${data.invoiceHostedUrl ? `<p style="margin:12px 0 0 0;font-size:12px"><a href="${data.invoiceHostedUrl}" style="color:#2563eb">Voir la facture en ligne</a></p>` : ''}
        </div>
        ` : ''}

        <p style="margin-top:24px">Merci pour votre confiance !</p>
        <p style="margin-top:16px">Cordialement,<br/><strong>Hydroclic</strong></p>
        
        <p style="margin-top:24px;font-size:12px;color:#6b7280;border-top:1px solid #e5e7eb;padding-top:16px">
          Si vous avez des questions, n'hésitez pas à nous contacter.
        </p>
      </div>
    `

    const textCustomer = `Confirmation de votre commande

Bonjour${customerName ? ` ${customerName}` : ''},

Nous avons bien reçu votre paiement. Votre commande a été confirmée.

Détails de la commande:
- Numéro de commande: ${orderNumber}
- Date: ${new Date().toLocaleDateString('fr-FR')}

Vos informations de contact:
- Email: ${data.customerEmail}

Articles commandés:
${itemsList}

Total payé: ${orderTotal}${currencySymbol}
${data.invoicePdfUrl ? `\nVotre facture: ${data.invoicePdfUrl}\n` : ''}
Merci pour votre confiance !

Cordialement,
Hydroclic`

    await this.sendMail({
      to: data.customerEmail,
      subject: `Confirmation de commande ${orderNumber}`,
      html: htmlCustomer,
      text: textCustomer,
    })
  }
}

