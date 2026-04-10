import {
  findConversationsDueForSlaAlert,
  getSlaMs,
  markSlaAlertSent,
  recordInboundMessageIfNew,
} from '@/lib/db/whatsapp'
import { normalizeWaId } from '@/lib/whatsapp/normalize'
import { sendWhatsappTextMessage } from '@/lib/whatsapp/cloud'

type WaMessage = {
  from?: string
  id?: string
  timestamp?: string
  type?: string
}

type WaValue = {
  messaging_product?: string
  metadata?: { phone_number_id?: string }
  messages?: WaMessage[]
}

type WaChange = { value?: WaValue; field?: string }

type WaEntry = { changes?: WaChange[] }

type WaWebhookBody = {
  object?: string
  entry?: WaEntry[]
}

function collectInboundMessages(body: WaWebhookBody): Array<{
  phoneNumberId: string
  from: string
  messageId: string
  inboundAt: Date
}> {
  const out: Array<{
    phoneNumberId: string
    from: string
    messageId: string
    inboundAt: Date
  }> = []

  const entries = body.entry ?? []
  for (const ent of entries) {
    const changes = ent.changes ?? []
    for (const ch of changes) {
      const value = ch.value
      if (!value?.metadata?.phone_number_id) {
        continue
      }
      const phoneNumberId = value.metadata.phone_number_id
      const messages = value.messages ?? []
      for (const m of messages) {
        if (!m.from || !m.id) {
          continue
        }
        const tsSec = m.timestamp ? Number.parseInt(m.timestamp, 10) : NaN
        const inboundAt = Number.isFinite(tsSec)
          ? new Date(tsSec * 1000)
          : new Date()
        out.push({
          phoneNumberId,
          from: normalizeWaId(m.from),
          messageId: m.id,
          inboundAt,
        })
      }
    }
  }
  return out
}

export async function handleWhatsappWebhookJson(body: unknown): Promise<void> {
  const expectedPhoneId = process.env.WHATSAPP_PHONE_NUMBER_ID
  if (!expectedPhoneId && process.env.NODE_ENV === 'production') {
    console.warn('[whatsapp] WHATSAPP_PHONE_NUMBER_ID manquant — traitement webhook ignoré')
    return
  }
  const parsed = body as WaWebhookBody
  if (parsed.object !== 'whatsapp_business_account') {
    return
  }

  const inbound = collectInboundMessages(parsed)
  const slaMs = getSlaMs()

  for (const msg of inbound) {
    if (expectedPhoneId && msg.phoneNumberId !== expectedPhoneId) {
      continue
    }
    await recordInboundMessageIfNew({
      waMessageId: msg.messageId,
      customerWaId: msg.from,
      inboundAt: msg.inboundAt,
      slaDeadlineAt: new Date(msg.inboundAt.getTime() + slaMs),
    })
  }
}

export async function runWhatsappSlaAlerts(): Promise<{
  checked: number
  sent: number
  errors: string[]
}> {
  const alertTo = process.env.WHATSAPP_ALERT_TO_WAID
  if (!alertTo) {
    return {
      checked: 0,
      sent: 0,
      errors: ['WHATSAPP_ALERT_TO_WAID non défini'],
    }
  }

  const alertToNorm = normalizeWaId(alertTo)
  const now = new Date()
  const due = await findConversationsDueForSlaAlert(now)
  const errors: string[] = []
  let sent = 0

  for (const conv of due) {
    const body =
      process.env.WHATSAPP_SLA_ALERT_TEXT?.trim() ||
      `[Hydroclic] SLA: pas de réponse au client ${conv.customerWaId} dans le délai imparti. Dernier message reçu: ${conv.lastInboundAt.toISOString()}`

    const result = await sendWhatsappTextMessage({
      toWaId: alertToNorm,
      body,
    })

    if (!result.ok) {
      errors.push(`${conv.customerWaId}: ${result.error}`)
      continue
    }

    await markSlaAlertSent(conv.id, now)
    sent += 1
  }

  return { checked: due.length, sent, errors }
}
