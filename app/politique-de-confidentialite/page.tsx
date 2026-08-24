import type { Metadata } from 'next'
import { COMPANY, LEGAL_PATHS } from '@/lib/legal/company'
import {
  LegalLink,
  LegalPageShell,
  LegalSection,
  LegalUpdated,
  MailLink,
} from '@/components/legal/LegalPageShell'

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description:
    'Politique de confidentialité d’Hydroclic : données collectées, finalités, bases légales, durées, destinataires et vos droits RGPD.',
  alternates: { canonical: LEGAL_PATHS.privacy },
  robots: { index: true, follow: true },
}

export default function PolitiqueConfidentialitePage() {
  return (
    <LegalPageShell
      title="Politique de confidentialité"
      subtitle="Protection de vos données personnelles"
    >
      <LegalSection title="1. Responsable du traitement">
        <p>
          Le responsable du traitement des données personnelles collectées sur le site{' '}
          {COMPANY.siteUrl.replace('https://', '')} est :
        </p>
        <ul className="space-y-1">
          <li>
            <strong>{COMPANY.legalName}</strong>, {COMPANY.legalForm}, au capital de{' '}
            {COMPANY.shareCapital}
          </li>
          <li>
            {COMPANY.siret} — {COMPANY.rcs}
          </li>
          <li>{COMPANY.address.full}</li>
          <li>
            Email : <MailLink />
          </li>
        </ul>
        <p>
          Aucun délégué à la protection des données (DPO) n’est désigné. Pour toute question
          relative à vos données, contactez-nous à <MailLink />.
        </p>
      </LegalSection>

      <LegalSection title="2. Données collectées">
        <p>Selon votre utilisation du site, nous pouvons traiter :</p>
        <ul className="list-disc list-inside space-y-2 ml-1">
          <li>
            <strong>Identification et contact :</strong> nom, prénom, adresse e-mail, téléphone,
            adresse de livraison et de facturation
          </li>
          <li>
            <strong>Compte :</strong> identifiants de connexion gérés par Clerk (voir § 6)
          </li>
          <li>
            <strong>Compte professionnel :</strong> raison sociale, SIRET, adresse professionnelle
          </li>
          <li>
            <strong>Commande :</strong> contenu du panier, historique de commandes, mode de
            livraison, statut de paiement (les données de carte sont collectées par Stripe, nous ne
            les stockons pas)
          </li>
          <li>
            <strong>Messages :</strong> contenu des formulaires de contact et échanges WhatsApp /
            e-mail
          </li>
          <li>
            <strong>Techniques :</strong> adresse IP, logs serveur, type de navigateur, cookies
            strictement nécessaires
          </li>
        </ul>
        <p>Nous ne collectons pas de données sensibles au sens de l’article 9 du RGPD.</p>
      </LegalSection>

      <LegalSection title="3. Finalités et bases légales">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 border-b">Finalité</th>
                <th className="text-left p-3 border-b">Base légale</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-3">Création et gestion du compte</td>
                <td className="p-3">Exécution du contrat (art. 6.1.b)</td>
              </tr>
              <tr className="border-b bg-gray-50/50">
                <td className="p-3">Traitement des commandes, paiement, livraison, facturation</td>
                <td className="p-3">Exécution du contrat ; obligation légale (comptabilité)</td>
              </tr>
              <tr className="border-b">
                <td className="p-3">Service client, SAV, messages de contact</td>
                <td className="p-3">Exécution du contrat ; intérêt légitime</td>
              </tr>
              <tr className="border-b bg-gray-50/50">
                <td className="p-3">Prévention de la fraude et sécurité du site</td>
                <td className="p-3">Intérêt légitime (art. 6.1.f)</td>
              </tr>
              <tr>
                <td className="p-3">Communications commerciales (si vous y avez consenti)</td>
                <td className="p-3">Consentement (art. 6.1.a), révocable à tout moment</td>
              </tr>
            </tbody>
          </table>
        </div>
      </LegalSection>

      <LegalSection title="4. Durées de conservation">
        <ul className="list-disc list-inside space-y-2 ml-1">
          <li>
            <strong>Compte :</strong> pendant la durée du compte, puis 3 ans après la dernière
            activité ou la suppression
          </li>
          <li>
            <strong>Commandes et factures :</strong> 10 ans (obligation comptable)
          </li>
          <li>
            <strong>Demandes de contact :</strong> 3 ans après le dernier échange
          </li>
          <li>
            <strong>Logs techniques :</strong> 12 mois maximum
          </li>
          <li>
            <strong>Preuve du consentement cookies :</strong> 6 mois (recommandation CNIL), puis
            renouvellement
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="5. Destinataires">
        <p>Vos données sont accessibles uniquement aux personnes habilitées d’Hydroclic et à :</p>
        <ul className="list-disc list-inside space-y-2 ml-1">
          <li>
            <strong>Vercel Inc.</strong> — hébergement du site
          </li>
          <li>
            <strong>Clerk, Inc.</strong> — authentification et gestion des comptes
          </li>
          <li>
            <strong>Stripe</strong> (Stripe Payments Europe Ltd / Stripe, Inc.) — paiement
            sécurisé. Hydroclic ne stocke pas les numéros de carte
          </li>
          <li>
            <strong>Prestataires e-mail / WhatsApp</strong> — envoi des messages que vous
            initiez
          </li>
          <li>Transporteurs, lorsque vous choisissez la livraison à domicile</li>
          <li>Autorités, uniquement si la loi l’exige</li>
        </ul>
        <p>Nous ne vendons jamais vos données.</p>
      </LegalSection>

      <LegalSection title="6. Transferts hors Union européenne">
        <p>
          Clerk, Vercel et Stripe peuvent traiter des données depuis les États-Unis. Ces transferts
          s’appuient sur les clauses contractuelles types de la Commission européenne et, le cas
          échéant, sur le cadre Data Privacy Framework.
        </p>
        <p>
          WhatsApp (Meta Platforms Ireland Ltd) peut également transférer des données hors UE
          lorsque vous utilisez le bouton WhatsApp, y compris si une commande est ensuite conclue
          dans cette conversation. Cette communication est initiée par vous.
        </p>
      </LegalSection>

      <LegalSection title="7. Vos droits">
        <p>Conformément au RGPD, vous disposez des droits suivants :</p>
        <ul className="list-disc list-inside space-y-2 ml-1">
          <li>accès, rectification, effacement</li>
          <li>limitation et opposition au traitement</li>
          <li>portabilité</li>
          <li>retrait du consentement, lorsque le traitement y est fondé</li>
          <li>directives relatives au sort de vos données après votre décès</li>
        </ul>
        <p>
          Pour les exercer, écrivez à <MailLink /> en précisant votre demande. Nous pourrons
          demander un justificatif d’identité en cas de doute. Réponse sous un mois.
        </p>
        <p>
          Vous pouvez introduire une réclamation auprès de la CNIL : 3 Place de Fontenoy, TSA
          80715, 75334 Paris Cedex 07 —{' '}
          <a
            href="https://www.cnil.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline underline-offset-2"
          >
            www.cnil.fr
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="8. Cookies">
        <p>
          Le détail des cookies, leur durée et vos choix figurent dans la{' '}
          <LegalLink href={LEGAL_PATHS.cookies}>politique cookies</LegalLink>. Les cookies non
          nécessaires ne sont déposés qu’après un consentement explicite (accepter / refuser).
        </p>
      </LegalSection>

      <LegalSection title="9. Sécurité">
        <p>
          Nous mettons en œuvre des mesures techniques et organisationnelles adaptées (HTTPS,
          accès restreints, prestataires de paiement certifiés). Aucune transmission sur Internet
          n’est toutefois infaillible.
        </p>
      </LegalSection>

      <LegalSection title="10. Modifications">
        <p>
          Cette politique peut être mise à jour. La date de dernière modification figure en bas de
          page. En cas de changement substantiel, une information sera affichée sur le site.
        </p>
      </LegalSection>

      <LegalSection title="11. Contact">
        <p>
          {COMPANY.legalName} — {COMPANY.address.full} — <MailLink />
        </p>
      </LegalSection>

      <LegalUpdated />
    </LegalPageShell>
  )
}
