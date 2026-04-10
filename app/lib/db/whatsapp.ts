import { prisma } from '@/lib/prisma'

export function getSlaMs(): number {
  const raw = process.env.WHATSAPP_SLA_MINUTES
  const minutes = raw ? Number.parseInt(raw, 10) : 60
  if (!Number.isFinite(minutes) || minutes < 1) {
    return 60 * 60 * 1000
  }
  return minutes * 60 * 1000
}

/**
 * Enregistre un message entrant une seule fois (idempotence par wamid).
 * Retourne false si le webhook est un doublon.
 */
export async function recordInboundMessageIfNew(params: {
  waMessageId: string
  customerWaId: string
  inboundAt: Date
  slaDeadlineAt: Date
}): Promise<boolean> {
  return prisma.$transaction(async (tx) => {
    const created = await tx.whatsappProcessedMessage.createMany({
      data: [{ waMessageId: params.waMessageId }],
      skipDuplicates: true,
    })
    if (created.count === 0) {
      return false
    }
    await tx.whatsappConversation.upsert({
      where: { customerWaId: params.customerWaId },
      create: {
        customerWaId: params.customerWaId,
        lastInboundAt: params.inboundAt,
        needsReply: true,
        slaDeadlineAt: params.slaDeadlineAt,
        slaAlertSentAt: null,
      },
      update: {
        lastInboundAt: params.inboundAt,
        needsReply: true,
        slaDeadlineAt: params.slaDeadlineAt,
        slaAlertSentAt: null,
      },
    })
    return true
  })
}

export async function markOutboundReplyToCustomer(params: {
  customerWaId: string
  repliedAt: Date
}): Promise<void> {
  await prisma.whatsappConversation.updateMany({
    where: { customerWaId: params.customerWaId },
    data: { lastReplyAt: params.repliedAt, needsReply: false },
  })
}

export async function findConversationsDueForSlaAlert(now: Date) {
  return prisma.whatsappConversation.findMany({
    where: {
      needsReply: true,
      slaAlertSentAt: null,
      slaDeadlineAt: { lte: now },
    },
  })
}

export async function markSlaAlertSent(conversationId: string, sentAt: Date): Promise<void> {
  await prisma.whatsappConversation.update({
    where: { id: conversationId },
    data: { slaAlertSentAt: sentAt },
  })
}
