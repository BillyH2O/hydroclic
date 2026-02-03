import { NextRequest, NextResponse } from 'next/server'
import { PaymentService } from '@/lib/services/payment'

/**
 * API Route pour récupérer les détails d'une session de checkout
 * GET /api/checkout/session?session_id=xxx
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const sessionId = searchParams.get('session_id')

    if (!sessionId) {
      return NextResponse.json(
        { error: 'session_id est requis' },
        { status: 400 }
      )
    }

    const session = await PaymentService.getCheckoutSession(sessionId)

    return NextResponse.json({
      id: session.id,
      amountTotal: session.amount_total,
      customerEmail: session.customer_email,
      paymentStatus: session.payment_status,
      status: session.status,
    })
  } catch (error) {
    console.error('Error fetching checkout session:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération de la session' },
      { status: 500 }
    )
  }
}

