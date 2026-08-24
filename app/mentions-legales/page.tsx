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
  title: 'Mentions légales',
  description:
    'Mentions légales du site Hydroclic : éditeur, hébergeur, propriété intellectuelle et conditions d’utilisation.',
  alternates: { canonical: LEGAL_PATHS.mentions },
  robots: { index: true, follow: true },
}

export default function MentionsLegalesPage() {
  return (
    <LegalPageShell title="Mentions légales" subtitle="Informations légales concernant Hydroclic">
      <LegalSection title="1. Éditeur du site">
        <p>Le site {COMPANY.siteUrl.replace('https://', '')} est édité par :</p>
        <ul className="space-y-1">
          <li>
            <strong>Raison sociale :</strong> {COMPANY.legalName}
          </li>
          <li>
            <strong>Forme juridique :</strong> {COMPANY.legalForm}
          </li>
          <li>
            <strong>Capital social :</strong> {COMPANY.shareCapital}
          </li>
          <li>
            <strong>Siège social :</strong> {COMPANY.address.full}
          </li>
          <li>
            <strong>SIREN :</strong> {COMPANY.siren}
          </li>
          <li>
            <strong>SIRET :</strong> {COMPANY.siret}
          </li>
          <li>
            <strong>Immatriculation :</strong> {COMPANY.rcs}
          </li>
          <li>
            <strong>N° TVA intracommunautaire :</strong> {COMPANY.tva}
          </li>
          <li>
            <strong>Code NAF / APE :</strong> {COMPANY.naf}
          </li>
          <li>
            <strong>Email :</strong> <MailLink />
          </li>
          <li>
            <strong>Téléphone :</strong>{' '}
            <a href={`tel:${COMPANY.phoneTel}`} className="text-primary underline underline-offset-2">
              {COMPANY.phoneDisplay}
            </a>
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="2. Directeur de la publication">
        <p>Le directeur de la publication est {COMPANY.publicationDirector}.</p>
      </LegalSection>

      <LegalSection title="3. Hébergement">
        <p>Le site est hébergé par :</p>
        <ul className="space-y-1">
          <li>
            <strong>Hébergeur :</strong> {COMPANY.host.name}
          </li>
          <li>
            <strong>Adresse :</strong> {COMPANY.host.address}
          </li>
          <li>
            <strong>Site :</strong>{' '}
            <a
              href={COMPANY.host.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-2"
            >
              {COMPANY.host.url}
            </a>
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="4. Propriété intellectuelle">
        <p>
          L’ensemble du contenu de ce site (textes, images, logos, icônes, vidéos, bases de données,
          etc.) est la propriété exclusive de {COMPANY.legalName}, sauf mention contraire.
        </p>
        <p>
          Toute reproduction, représentation, modification, publication ou adaptation de tout ou
          partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite
          sans autorisation écrite préalable de {COMPANY.legalName}.
        </p>
        <p>
          Toute exploitation non autorisée du site ou de son contenu engage la responsabilité civile
          et/ou pénale de l’utilisateur.
        </p>
      </LegalSection>

      <LegalSection title="5. Protection des données personnelles">
        <p>
          Les données personnelles collectées sur ce site sont traitées conformément au Règlement
          (UE) 2016/679 (RGPD) et à la loi « Informatique et Libertés » du 6 janvier 1978 modifiée.
        </p>
        <p>
          Pour le détail des traitements, des durées de conservation et de vos droits, consultez
          notre <LegalLink href={LEGAL_PATHS.privacy}>politique de confidentialité</LegalLink>.
        </p>
      </LegalSection>

      <LegalSection title="6. Cookies">
        <p>
          Le site dépose des cookies strictement nécessaires à son fonctionnement (compte,
          panier, paiement, sécurité). Aucun cookie de mesure d’audience ou publicitaire n’est
          déposé sans votre accord.
        </p>
        <p>
          Vous pouvez consulter le détail et gérer vos choix dans notre{' '}
          <LegalLink href={LEGAL_PATHS.cookies}>politique cookies</LegalLink>.
        </p>
      </LegalSection>

      <LegalSection title="7. Conditions de vente">
        <p>
          Les ventes conclues sur le site sont régies par les{' '}
          <LegalLink href={LEGAL_PATHS.cgv}>conditions générales de vente</LegalLink>.
        </p>
      </LegalSection>

      <LegalSection title="8. Limitation de responsabilité">
        <p>
          {COMPANY.legalName} s’efforce d’assurer l’exactitude et la mise à jour des informations
          diffusées sur ce site, dont elle se réserve le droit de corriger le contenu à tout moment.
        </p>
        <p>
          {COMPANY.legalName} ne peut toutefois garantir l’exactitude, la précision ou
          l’exhaustivité des informations mises à disposition, ni la disponibilité ininterrompue du
          site.
        </p>
      </LegalSection>

      <LegalSection title="9. Liens hypertextes">
        <p>
          Le site peut contenir des liens vers d’autres sites. {COMPANY.legalName} n’exerce aucun
          contrôle sur ces ressources externes et décline toute responsabilité quant à leur contenu
          ou leur accessibilité.
        </p>
      </LegalSection>

      <LegalSection title="10. Droit applicable">
        <p>
          Les présentes mentions légales sont régies par le droit français. En cas de litige et à
          défaut d’accord amiable, les tribunaux français compétents seront saisis, sous réserve des
          règles impératives de compétence applicables aux consommateurs.
        </p>
      </LegalSection>

      <LegalSection title="11. Contact">
        <p>
          Pour toute question concernant ces mentions légales : <MailLink /> — {COMPANY.address.full}.
        </p>
      </LegalSection>

      <LegalUpdated />
    </LegalPageShell>
  )
}
