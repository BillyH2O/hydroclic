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
  title: 'Conditions générales de vente',
  description:
    'Conditions générales de vente d’Hydroclic : commande, paiement, livraison, rétractation et garanties.',
  alternates: { canonical: LEGAL_PATHS.cgv },
  robots: { index: true, follow: true },
}

export default function CgvPage() {
  return (
    <LegalPageShell
      title="Conditions générales de vente"
      subtitle="Ventes conclues sur hydroclic.fr"
    >
      <LegalSection title="1. Objet et champ d’application">
        <p>
          Les présentes conditions générales de vente (CGV) régissent les ventes de produits
          conclues à distance sur le site {COMPANY.siteUrl.replace('https://www.', '')} entre{' '}
          {COMPANY.legalName} et tout client consommateur ou professionnel.
        </p>
        <p>
          Toute commande implique l’acceptation pleine et entière des CGV en vigueur au jour de la
          commande. Elles sont accessibles en permanence depuis le pied de page du site.
        </p>
      </LegalSection>

      <LegalSection title="2. Vendeur">
        <p>
          {COMPANY.legalName}, {COMPANY.legalForm}, capital {COMPANY.shareCapital},{' '}
          {COMPANY.rcs}, SIRET {COMPANY.siret}, TVA {COMPANY.tva}, siège {COMPANY.address.full}.
        </p>
        <p>
          Contact : <MailLink /> — {COMPANY.phoneDisplay}.
        </p>
      </LegalSection>

      <LegalSection title="3. Produits et prix">
        <p>
          Hydroclic commercialise des fournitures de plomberie, électricité, chauffage,
          climatisation, sanitaire, outillage et consommables. Les descriptifs et photos sont
          fournis à titre indicatif.
        </p>
        <p>
          Les prix sont indiqués en euros, toutes taxes comprises (TTC), hors frais de livraison.
          Un tarif professionnel peut s’appliquer aux comptes validés comme professionnels. Le
          prix dû est celui affiché au moment de la validation de la commande.
        </p>
        <p>
          Hydroclic se réserve le droit de corriger une erreur manifeste de prix. En cas
          d’indisponibilité après commande, le client est informé et remboursé du montant
          correspondant.
        </p>
      </LegalSection>

      <LegalSection title="4. Commande">
        <p>
          Le client sélectionne les produits, choisit la livraison à domicile ou le retrait au
          dépôt (click &amp; collect), puis procède au paiement via Stripe. La commande n’est
          ferme qu’après confirmation du paiement.
        </p>
        <p>
          Hydroclic se réserve le droit de refuser une commande anormale, de mauvaise foi, ou en
          cas de litige antérieur avec le client.
        </p>
      </LegalSection>

      <LegalSection title="5. Paiement">
        <p>
          Le paiement s’effectue en ligne par carte bancaire via Stripe, prestataire de paiement
          sécurisé. Hydroclic n’a pas accès aux numéros de carte. La commande est débitée au
          moment du paiement.
        </p>
      </LegalSection>

      <LegalSection title="6. Livraison à domicile">
        <p>
          La livraison est proposée en France métropolitaine, aux adresses saisies lors du
          paiement. Les frais et le seuil de gratuité éventuel sont indiqués dans le panier avant
          le paiement ; ils peuvent évoluer et sont ceux affichés au moment de la commande.
        </p>
        <p>
          Les délais communiqués sont indicatifs. En cas de retard anormal, le client consommateur
          peut user des recours prévus au Code de la consommation (mise en demeure, puis
          résolution dans les conditions légales).
        </p>
        <p>
          Le transfert des risques intervient à la remise du colis au client ou au tiers désigné.
          Il appartient au client de vérifier le colis à réception et de formuler les réserves
          utiles auprès du transporteur, puis de nous prévenir sous 72 heures.
        </p>
      </LegalSection>

      <LegalSection title="7. Click &amp; collect">
        <p>
          Le retrait au dépôt se fait à l’adresse suivante : {COMPANY.address.full}. Aucun frais
          de livraison n’est facturé pour ce mode. Un avis est envoyé lorsque la commande est
          prête. Passé un délai de 14 jours après cet avis, Hydroclic pourra considérer la
          commande abandonnée et procéder au remboursement, déduction faite le cas échéant des
          produits déjà préparés sur mesure.
        </p>
      </LegalSection>

      <LegalSection title="8. Droit de rétractation (consommateurs)">
        <p>
          Conformément aux articles L.221-18 et suivants du Code de la consommation, le client
          consommateur dispose d’un délai de 14 jours à compter de la réception du bien pour se
          rétracter, sans motif.
        </p>
        <p>
          Pour exercer ce droit, envoyez une déclaration non équivoque à <MailLink /> (ou utilisez
          le formulaire type prévu à l’article R.221-1 du Code de la consommation). Les produits
          doivent être renvoyés dans un état permettant la revente, dans un délai de 14 jours,
          aux frais du client, à {COMPANY.address.full}.
        </p>
        <p>
          Le remboursement intervient sous 14 jours à compter de la récupération des biens ou de
          la preuve d’expédition, par le même moyen de paiement, sauf accord contraire.
        </p>
        <p>
          Le droit de rétractation ne s’applique pas notamment aux biens confectionnés selon les
          spécifications du client, aux biens descellés qui ne peuvent être renvoyés pour des
          raisons d’hygiène, ou aux biens mélangés de manière indissociable (art. L.221-28).
        </p>
        <p>
          Les clients professionnels au sens du Code de la consommation ne bénéficient pas de ce
          droit de rétractation.
        </p>
      </LegalSection>

      <LegalSection title="9. Garanties">
        <p>
          Tous les clients consommateurs bénéficient de la garantie légale de conformité (art.
          L.217-3 et s. du Code de la consommation) et de la garantie des vices cachés (art. 1641
          et s. du Code civil).
        </p>
        <p>
          Lorsqu’il agit en garantie légale de conformité, le consommateur :
        </p>
        <ul className="list-disc list-inside space-y-1 ml-1">
          <li>bénéficie d’un délai de 2 ans à compter de la délivrance du bien ;</li>
          <li>peut choisir la réparation ou le remplacement, sous réserve des conditions légales ;</li>
          <li>
            est dispensé de rapporter la preuve de l’existence du défaut pendant 24 mois (12 mois
            pour les biens d’occasion).
          </li>
        </ul>
        <p>
          La garantie des vices cachés permet de demander la résolution de la vente ou une
          réduction du prix dans un délai de 2 ans à compter de la découverte du vice.
        </p>
      </LegalSection>

      <LegalSection title="10. Responsabilité">
        <p>
          Hydroclic n’est pas responsable des dommages résultant d’une mauvaise utilisation des
          produits, d’une installation non conforme aux règles de l’art, ou d’un cas de force
          majeure. Pour les professionnels, la responsabilité d’Hydroclic est limitée au montant
          de la commande concernée, hors dol ou faute lourde.
        </p>
      </LegalSection>

      <LegalSection title="11. Données personnelles">
        <p>
          Le traitement des données liées à la commande est décrit dans la{' '}
          <LegalLink href={LEGAL_PATHS.privacy}>politique de confidentialité</LegalLink>.
        </p>
      </LegalSection>

      <LegalSection title="12. Médiation et litiges">
        <p>
          En cas de réclamation, contactez d’abord le service client à <MailLink />. À défaut de
          solution amiable, le client consommateur peut saisir gratuitement un médiateur de la
          consommation (art. L.612-1 du Code de la consommation) ainsi que la plateforme
          européenne de règlement en ligne des litiges :{' '}
          <a
            href="https://ec.europa.eu/consumers/odr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline underline-offset-2"
          >
            https://ec.europa.eu/consumers/odr
          </a>
          .
        </p>
        <p>
          Les présentes CGV sont soumises au droit français. Le consommateur peut saisir soit
          l’une des juridictions territorialement compétentes en vertu du code de procédure
          civile, soit la juridiction du lieu où il demeurait au moment de la conclusion du
          contrat ou de la survenance du fait dommageable.
        </p>
      </LegalSection>

      <LegalUpdated />
    </LegalPageShell>
  )
}
