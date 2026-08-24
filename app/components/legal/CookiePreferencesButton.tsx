'use client'

import { openCookiePreferences } from '@/lib/cookies/consent'

export function CookiePreferencesButton({ children }: { children: string }) {
  return (
    <button
      type="button"
      onClick={() => openCookiePreferences()}
      className="text-primary underline underline-offset-2 hover:text-primary/80"
    >
      {children}
    </button>
  )
}
