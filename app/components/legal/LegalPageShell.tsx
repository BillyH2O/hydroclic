import type { ReactNode } from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { COMPANY } from '@/lib/legal/company'

export function LegalPageShell({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle?: string
  children: ReactNode
}) {
  return (
    <div className="w-full min-h-screen bg-zinc-50 font-sans">
      <Navbar solid />

      <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
          {subtitle ? <p className="text-lg text-gray-600">{subtitle}</p> : null}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 md:p-8 space-y-8">{children}</div>
      </main>

      <Footer />
    </div>
  )
}

export function LegalSection({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>
      <div className="text-gray-700 space-y-3 leading-relaxed">{children}</div>
    </section>
  )
}

export function LegalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="text-primary underline underline-offset-2 hover:text-primary/80">
      {children}
    </Link>
  )
}

export function LegalUpdated() {
  return (
    <div className="pt-6 border-t border-gray-200">
      <p className="text-sm text-gray-500">Dernière mise à jour : {COMPANY.lastUpdated}</p>
    </div>
  )
}

export function MailLink({ email = COMPANY.email }: { email?: string }) {
  return (
    <a href={`mailto:${email}`} className="text-primary underline underline-offset-2 hover:text-primary/80">
      {email}
    </a>
  )
}
