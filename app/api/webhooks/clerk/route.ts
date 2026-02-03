
export async function POST() {
  try {
   
    return new Response('Webhook endpoint ready (install svix to activate)', { status: 200 })
  } catch (error) {
    console.error('Webhook error:', error)
    return new Response('Webhook error', { status: 500 })
  }
}

