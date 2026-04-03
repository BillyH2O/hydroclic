import { clerkMiddleware } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import {
  ADMIN_GATE_COOKIE,
  computeAdminGateToken,
  getAdminGateSecret,
  isAdminGateConfigured,
  timingSafeEqualHex,
} from '@/lib/admin/gate'

export default clerkMiddleware(async (auth, request) => {
  const url = request.nextUrl

  // Webhooks (Stripe, Clerk, …) : pas de logique Clerk ni redirection.

  if (url.pathname.startsWith('/api/webhooks')) {
    return NextResponse.next()
  }

  // Intercepter toutes les redirections vers choose-organization et rediriger vers la page d'accueil
  if (
    url.pathname.includes('/tasks/choose-organization') ||
    url.pathname.includes('/choose-organization') ||
    url.searchParams.get('after_sign_in_url')?.includes('choose-organization') ||
    url.searchParams.get('after_sign_up_url')?.includes('choose-organization')
  ) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Admin : protégé uniquement par ADMIN_PASSWORD (cookie httpOnly), sans Clerk
  if (url.pathname.startsWith('/admin')) {
    if (isAdminGateConfigured() && !url.pathname.startsWith('/admin/access')) {
      const secret = getAdminGateSecret()
      const expected = await computeAdminGateToken(secret)
      const cookie = request.cookies.get(ADMIN_GATE_COOKIE)?.value
      const valid = Boolean(cookie && timingSafeEqualHex(cookie, expected))
      if (!valid) {
        const next = encodeURIComponent(url.pathname + url.search)
        return NextResponse.redirect(new URL(`/admin/access?next=${next}`, request.url))
      }
    }
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}

