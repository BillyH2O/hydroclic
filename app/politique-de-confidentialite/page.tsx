import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'

/**
 * Page de politique de confidentialité
 */
export default function PolitiqueConfidentialitePage() {
  return (
    <div className="w-full min-h-screen bg-zinc-50 font-sans">
      <Navbar solid />
      
      <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Politique de confidentialité
          </h1>
          <p className="text-lg text-gray-600">
            Protection de vos données personnelles
          </p>
        </div>

        {/* Contenu */}
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8 space-y-8">
          {/* Introduction */}
          <section>
            <p className="text-gray-700 mb-4">
              Hydroclic (ci-après &quot; nous &quot;, &quot; notre &quot; ou &quot; le site &quot;) s&apos;engage à protéger et respecter votre vie privée. Cette politique de confidentialité explique comment nous collectons, utilisons, partageons et protégeons vos informations personnelles lorsque vous utilisez notre site web.
            </p>
            <p className="text-gray-700">
              En utilisant notre site, vous acceptez les pratiques décrites dans cette politique de confidentialité. Si vous n&apos;acceptez pas cette politique, veuillez ne pas utiliser notre site.
            </p>
          </section>

          {/* Responsable du traitement */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              1. Responsable du traitement des données
            </h2>
            <div className="text-gray-700 space-y-2">
              <p>
                <strong>Raison sociale :</strong> Hydroclic
              </p>
              <p>
                <strong>Adresse :</strong> [Adresse à compléter]
              </p>
              <p>
                <strong>Email :</strong>{' '}
                <a href="mailto:contact@hydroclic.fr" className="text-primary hover:underline">
                  contact@hydroclic.fr
                </a>
              </p>
            </div>
          </section>

          {/* Données collectées */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              2. Données personnelles collectées
            </h2>
            <p className="text-gray-700 mb-3">
              Nous collectons les données personnelles suivantes :
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>
                <strong>Données d&apos;identification :</strong> nom, prénom, adresse email, numéro de téléphone
              </li>
              <li>
                <strong>Données de connexion :</strong> adresse IP, type de navigateur, système d&apos;exploitation
              </li>
              <li>
                <strong>Données de navigation :</strong> pages visitées, durée de visite, liens cliqués
              </li>
              <li>
                <strong>Données de commande :</strong> historique des commandes, adresse de livraison, informations de paiement (traitées par notre prestataire de paiement sécurisé)
              </li>
              <li>
                <strong>Données professionnelles :</strong> pour les comptes professionnels, numéro SIRET, raison sociale, adresse professionnelle
              </li>
            </ul>
          </section>

          {/* Finalités */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              3. Finalités du traitement
            </h2>
            <p className="text-gray-700 mb-3">
              Vos données personnelles sont collectées et traitées pour les finalités suivantes :
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Gestion de votre compte utilisateur</li>
              <li>Traitement et suivi de vos commandes</li>
              <li>Gestion de la relation client et du service après-vente</li>
              <li>Envoi de communications commerciales (avec votre consentement)</li>
              <li>Amélioration de nos services et de l&apos;expérience utilisateur</li>
              <li>Respect de nos obligations légales et réglementaires</li>
              <li>Prévention de la fraude et sécurisation du site</li>
              <li>Statistiques et analyses de fréquentation</li>
            </ul>
          </section>

          {/* Base légale */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              4. Base légale du traitement
            </h2>
            <p className="text-gray-700 mb-3">
              Le traitement de vos données personnelles est fondé sur :
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li><strong>Votre consentement</strong> pour les communications marketing</li>
              <li><strong>L&apos;exécution d&apos;un contrat</strong> pour le traitement de vos commandes</li>
              <li><strong>L&apos;intérêt légitime</strong> pour l&apos;amélioration de nos services et la sécurité</li>
              <li><strong>Le respect d&apos;obligations légales</strong> pour la facturation et la comptabilité</li>
            </ul>
          </section>

          {/* Conservation */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              5. Durée de conservation
            </h2>
            <p className="text-gray-700 mb-3">
              Vos données personnelles sont conservées pour les durées suivantes :
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li><strong>Données de compte :</strong> pendant la durée de vie de votre compte et 3 ans après sa fermeture</li>
              <li><strong>Données de commande :</strong> 10 ans (obligation légale de conservation des factures)</li>
              <li><strong>Données de navigation :</strong> 13 mois maximum</li>
              <li><strong>Données de contact :</strong> 3 ans après le dernier contact</li>
            </ul>
          </section>

          {/* Destinataires */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              6. Destinataires des données
            </h2>
            <p className="text-gray-700 mb-3">
              Vos données personnelles peuvent être transmises aux destinataires suivants :
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Personnel autorisé d&apos;Hydroclic</li>
              <li>Prestataires techniques (hébergement, maintenance)</li>
              <li>Prestataires de paiement sécurisé (Stripe)</li>
              <li>Services de livraison</li>
              <li>Autorités compétentes en cas d&apos;obligation légale</li>
            </ul>
            <p className="text-gray-700 mt-3">
              Nous ne vendons jamais vos données personnelles à des tiers à des fins commerciales.
            </p>
          </section>

          {/* Transferts */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              7. Transferts de données hors UE
            </h2>
            <p className="text-gray-700">
              Certains de nos prestataires peuvent être situés hors de l&apos;Union Européenne. Dans ce cas, nous nous assurons que des garanties appropriées sont mises en place pour protéger vos données, conformément au RGPD.
            </p>
          </section>

          {/* Vos droits */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              8. Vos droits
            </h2>
            <p className="text-gray-700 mb-3">
              Conformément au RGPD, vous disposez des droits suivants concernant vos données personnelles :
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li><strong>Droit d&apos;accès :</strong> vous pouvez obtenir une copie de vos données personnelles</li>
              <li><strong>Droit de rectification :</strong> vous pouvez corriger vos données inexactes</li>
              <li><strong>Droit à l&apos;effacement :</strong> vous pouvez demander la suppression de vos données</li>
              <li><strong>Droit à la limitation :</strong> vous pouvez demander la limitation du traitement</li>
              <li><strong>Droit à la portabilité :</strong> vous pouvez récupérer vos données dans un format structuré</li>
              <li><strong>Droit d&apos;opposition :</strong> vous pouvez vous opposer au traitement de vos données</li>
              <li><strong>Droit de retirer votre consentement :</strong> à tout moment pour les communications marketing</li>
            </ul>
            <p className="text-gray-700 mt-4">
              Pour exercer ces droits, contactez-nous à l&apos;adresse :{' '}
              <a href="mailto:contact@hydroclic.fr" className="text-primary hover:underline">
                contact@hydroclic.fr
              </a>
            </p>
            <p className="text-gray-700 mt-2">
              Vous avez également le droit d&apos;introduire une réclamation auprès de la CNIL (Commission Nationale de l&apos;Informatique et des Libertés) si vous estimez que le traitement de vos données personnelles constitue une violation du RGPD.
            </p>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              9. Cookies et technologies similaires
            </h2>
            <p className="text-gray-700 mb-3">
              Notre site utilise des cookies pour :
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Assurer le bon fonctionnement du site</li>
              <li>Mémoriser vos préférences</li>
              <li>Analyser le trafic et améliorer nos services</li>
            </ul>
            <p className="text-gray-700 mt-3">
              Vous pouvez configurer votre navigateur pour refuser les cookies, mais cela peut affecter certaines fonctionnalités du site.
            </p>
          </section>

          {/* Sécurité */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              10. Sécurité des données
            </h2>
            <p className="text-gray-700 mb-3">
              Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données personnelles contre :
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>L&apos;accès non autorisé</li>
              <li>La perte ou la destruction accidentelle</li>
              <li>La divulgation non autorisée</li>
              <li>La modification non autorisée</li>
            </ul>
            <p className="text-gray-700 mt-3">
              Cependant, aucune méthode de transmission sur Internet ou de stockage électronique n&apos;est totalement sécurisée. Bien que nous nous efforcions d&apos;utiliser des moyens commercialement acceptables pour protéger vos données, nous ne pouvons garantir leur sécurité absolue.
            </p>
          </section>

          {/* Modifications */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              11. Modifications de la politique
            </h2>
            <p className="text-gray-700">
              Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. Les modifications entreront en vigueur dès leur publication sur cette page. Nous vous encourageons à consulter régulièrement cette page pour rester informé de la manière dont nous protégeons vos données.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              12. Contact
            </h2>
            <p className="text-gray-700">
              Pour toute question concernant cette politique de confidentialité ou le traitement de vos données personnelles, vous pouvez nous contacter à l&apos;adresse :{' '}
              <a href="mailto:contact@hydroclic.fr" className="text-primary hover:underline">
                contact@hydroclic.fr
              </a>
            </p>
          </section>

          {/* Date de mise à jour */}
          <div className="pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

