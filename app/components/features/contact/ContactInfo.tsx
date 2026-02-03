'use client'

import { Mail, Phone } from 'lucide-react'

export default function ContactInfo() {
  return (
    <div className="bg-white/95 backdrop-blur-md rounded-lg p-6 mb-8 shadow-lg border-2 border-white/50">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Informations de contact
      </h3>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-primary/10 p-2">
            <Phone className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Téléphone</p>
            <p className="text-base font-medium text-gray-900">
              +33 1 23 45 67 89
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-primary/10 p-2">
            <Mail className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Email</p>
            <p className="text-base font-medium text-gray-900">
              contact@hydroclic.fr
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

