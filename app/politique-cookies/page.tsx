import type { Metadata } from 'next'
import { LEGAL_PATHS } from '@/lib/legal/company'
import {
  LegalLink,
  LegalPageShell,
  LegalSection,
  LegalUpdated,
  MailLink,
} from '@/components/legal/LegalPageShell'
import { CookiePreferencesButton } from '@/components/legal/CookiePreferencesButton'

export const metadata: Metadata = {
  title: 'Politique cookies',
  description:
    'Politique cookies d’Hydroclic : cookies nécessaires, durée de conservation et gestion de votre consentement.',
  alternates: { canonical: LEGAL_PATHS.cookies },
  robots: { index: true, follow: true },
}

export default function PolitiqueCookiesPage() {
  return (
    <LegalPageShell
      title="Politique cookies"
      subtitle="Cookies et traceurs utilisés sur hydroclic.fr"
    >
      <LegalSection title="1. Qu’est-ce qu’un cookie ?">
        <p>
          Un cookie est un petit fichier déposé sur votre terminal lors de la visite d’un site. Il
          permet de reconnaître le navigateur, de maintenir une session ou de mémoriser un choix.
        </p>
      </LegalSection>

      <LegalSection title="2. Cookies strictement nécessaires">
        <p>
          Ces cookies sont indispensables au fonctionnement du site. Ils ne requièrent pas de
          consentement (art. 82 de la loi Informatique et Libertés et lignes directrices CNIL).
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 border-b">Cookie / stockage</th>
                <th className="text-left p-3 border-b">Finalité</th>
                <th className="text-left p-3 border-b">Durée</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-3">Cookies Clerk (__session, __client_uat, etc.)</td>
                <td className="p-3">Authentification et sécurité du compte</td>
                <td className="p-3">Session / jusqu’à 1 an selon le cookie</td>
              </tr>
              <tr className="border-b bg-gray-50/50">
                <td className="p-3">Cookie d’accès admin</td>
                <td className="p-3">Protection de l’espace d’administration</td>
                <td className="p-3">Session</td>
              </tr>
              <tr className="border-b">
                <td className="p-3">localStorage panier</td>
                <td className="p-3">Mémoriser le panier des visiteurs non connectés</td>
                <td className="p-3">Jusqu’à suppression par l’utilisateur</td>
              </tr>
              <tr className="border-b bg-gray-50/50">
                <td className="p-3">hydroclic_cookie_consent</td>
                <td className="p-3">Mémoriser vos choix cookies</td>
                <td className="p-3">6 mois</td>
              </tr>
              <tr>
                <td className="p-3">Cookies Stripe (domaine stripe.com)</td>
                <td className="p-3">Paiement sécurisé, anti-fraude</td>
                <td className="p-3">Selon Stripe, lors du checkout</td>
              </tr>
            </tbody>
          </table>
        </div>
      </LegalSection>

      <LegalSection title="3. Cookies optionnels">
        <p>
          À ce jour, Hydroclic ne dépose pas de cookies de mesure d’audience (type Google
          Analytics) ni de cookies publicitaires. Si de tels cookies étaient ajoutés, ils ne
          seraient déposés qu’après un consentement explicite, avec une possibilité de refuser
          aussi facilement que d’accepter.
        </p>
        <p>
          Votre choix est enregistré 6 mois. Vous pouvez à tout moment{' '}
          <CookiePreferencesButton>rouvrir le bandeau de consentement</CookiePreferencesButton> ou
          écrire à <MailLink />.
        </p>
      </LegalSection>

      <LegalSection title="4. Gérer les cookies via le navigateur">
        <p>
          Vous pouvez aussi bloquer ou supprimer les cookies depuis les paramètres de votre
          navigateur. Le blocage des cookies nécessaires peut empêcher de se connecter, de payer
          ou de conserver un panier.
        </p>
      </LegalSection>

      <LegalSection title="5. Documents liés">
        <p>
          <LegalLink href={LEGAL_PATHS.privacy}>Politique de confidentialité</LegalLink>
          {' · '}
          <LegalLink href={LEGAL_PATHS.mentions}>Mentions légales</LegalLink>
          {' · '}
          <LegalLink href={LEGAL_PATHS.cgv}>CGV</LegalLink>
        </p>
      </LegalSection>

      <LegalUpdated />
    </LegalPageShell>
  )
}
