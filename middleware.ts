import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

// Routes protégées qui nécessitent une authentification
const isProtectedRoute = createRouteMatcher([
  '/admin(.*)',
])

export default clerkMiddleware(async (auth, request) => {
  const url = request.nextUrl
  
  // Intercepter toutes les redirections vers choose-organization et rediriger vers la page d'accueil
  if (
    url.pathname.includes('/tasks/choose-organization') ||
    url.pathname.includes('/choose-organization') ||
    url.searchParams.get('after_sign_in_url')?.includes('choose-organization') ||
    url.searchParams.get('after_sign_up_url')?.includes('choose-organization')
  ) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Protéger les routes admin
  if (isProtectedRoute(request)) {
    await auth.protect()
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

