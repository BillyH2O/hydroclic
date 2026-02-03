import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { LoginBackground } from '@/components/features/login/Background'
import ContactInfo from '../components/features/contact/ContactInfo'
import ContactForm from '../components/features/contact/ContactForm'

/**
 * Page de contact
 */
export default function ContactPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background plein écran */}
      <div className="fixed inset-0 z-0">
        <LoginBackground />
      </div>
      
      <div className="relative z-10 w-full min-h-screen font-sans">
        <Navbar solid />
        
        <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
            Contactez-nous
          </h1>
          <p className="text-lg text-white/90 drop-shadow-md">
            Une question ? Un projet ? N&apos;hésitez pas à nous contacter.
          </p>
        </div>

        {/* Informations de contact */}
        <ContactInfo />

        {/* Formulaire */}
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Envoyez-nous un message
          </h2>
          <ContactForm />
        </div>
        </main>

        <Footer />
      </div>
    </div>
  )
}

