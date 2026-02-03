import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'

/**
 * Page des mentions légales
 */
export default function MentionsLegalesPage() {
  return (
    <div className="w-full min-h-screen bg-zinc-50 font-sans">
      <Navbar solid />
      
      <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Mentions légales
          </h1>
          <p className="text-lg text-gray-600">
            Informations légales concernant Hydroclic
          </p>
        </div>

        {/* Contenu */}
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8 space-y-8">
          {/* Éditeur du site */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              1. Éditeur du site
            </h2>
            <div className="text-gray-700 space-y-2">
              <p>
                <strong>Raison sociale :</strong> Hydroclic
              </p>
              <p>
                <strong>Forme juridique :</strong> [À compléter]
              </p>
              <p>
                <strong>Siège social :</strong> [Adresse à compléter]
              </p>
              <p>
                <strong>SIRET :</strong> [Numéro à compléter]
              </p>
              <p>
                <strong>RCS :</strong> [Ville et numéro à compléter]
              </p>
              <p>
                <strong>TVA Intracommunautaire :</strong> [Numéro à compléter]
              </p>
              <p>
                <strong>Email :</strong> contact@hydroclic.fr
              </p>
              <p>
                <strong>Téléphone :</strong> [Numéro à compléter]
              </p>
            </div>
          </section>

          {/* Directeur de publication */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              2. Directeur de publication
            </h2>
            <p className="text-gray-700">
              Le directeur de la publication est le représentant légal de la société Hydroclic.
            </p>
          </section>

          {/* Hébergement */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              3. Hébergement
            </h2>
            <div className="text-gray-700 space-y-2">
              <p>
                <strong>Hébergeur :</strong> [Nom de l&apos;hébergeur à compléter]
              </p>
              <p>
                <strong>Adresse :</strong> [Adresse de l&apos;hébergeur à compléter]
              </p>
              <p>
                <strong>Téléphone :</strong> [Numéro à compléter]
              </p>
            </div>
          </section>

          {/* Propriété intellectuelle */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              4. Propriété intellectuelle
            </h2>
            <p className="text-gray-700 mb-2">
              L&apos;ensemble du contenu de ce site (textes, images, logos, icônes, vidéos, etc.) est la propriété exclusive de Hydroclic, sauf mention contraire.
            </p>
            <p className="text-gray-700 mb-2">
              Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite sans autorisation écrite préalable de Hydroclic.
            </p>
            <p className="text-gray-700">
              Toute exploitation non autorisée du site ou de son contenu engage la responsabilité civile et/ou pénale de l&apos;utilisateur.
            </p>
          </section>

          {/* Protection des données */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              5. Protection des données personnelles
            </h2>
            <p className="text-gray-700 mb-2">
              Conformément à la loi &quot; Informatique et Libertés &quot; du 6 janvier 1978 modifiée et au Règlement Général sur la Protection des Données (RGPD), vous disposez d&apos;un droit d&apos;accès, de rectification, de suppression et d&apos;opposition aux données personnelles vous concernant.
            </p>
            <p className="text-gray-700">
              Pour exercer ces droits, vous pouvez nous contacter à l&apos;adresse : contact@hydroclic.fr
            </p>
            <p className="text-gray-700 mt-2">
              Pour plus d&apos;informations, consultez notre{' '}
              <a href="/politique-de-confidentialite" className="text-primary hover:underline">
                Politique de confidentialité
              </a>.
            </p>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              6. Cookies
            </h2>
            <p className="text-gray-700 mb-2">
              Ce site utilise des cookies pour améliorer l&apos;expérience utilisateur et analyser le trafic du site.
            </p>
            <p className="text-gray-700">
              En continuant à naviguer sur ce site, vous acceptez l&apos;utilisation de cookies conformément à notre politique de cookies.
            </p>
          </section>

          {/* Responsabilité */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              7. Limitation de responsabilité
            </h2>
            <p className="text-gray-700 mb-2">
              Hydroclic s&apos;efforce d&apos;assurer l&apos;exactitude et la mise à jour des informations diffusées sur ce site, dont elle se réserve le droit de corriger, à tout moment et sans préavis, le contenu.
            </p>
            <p className="text-gray-700 mb-2">
              Toutefois, Hydroclic ne peut garantir l&apos;exactitude, la précision ou l&apos;exhaustivité des informations mises à disposition sur ce site.
            </p>
            <p className="text-gray-700">
              En conséquence, Hydroclic décline toute responsabilité pour tout dommage résultant d&apos;une intrusion d&apos;un tiers ayant entraîné une modification des informations mises à disposition sur le site ou empêchant l&apos;accès au site.
            </p>
          </section>

          {/* Liens externes */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              8. Liens hypertextes
            </h2>
            <p className="text-gray-700 mb-2">
              Le site peut contenir des liens hypertextes vers d&apos;autres sites présents sur le réseau Internet.
            </p>
            <p className="text-gray-700">
              Les liens vers ces autres ressources vous font quitter le site Hydroclic. Il est possible de créer un lien vers la page de présentation de ce site sans autorisation expresse de l&pos;éditeur. Aucune autorisation ni demande d&pos;information préalable ne peut être exigée par l&pos;éditeur à l&pos;égard d&pos;un site qui souhaite établir un lien vers le site de l&pos;éditeur.
            </p>
          </section>

          {/* Droit applicable */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              9. Droit applicable
            </h2>
            <p className="text-gray-700">
              Les présentes mentions légales sont régies par le droit français. En cas de litige et à défaut d&pos;accord amiable, le litige sera porté devant les tribunaux français conformément aux règles de compétence en vigueur.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              10. Contact
            </h2>
            <p className="text-gray-700">
              Pour toute question concernant les présentes mentions légales, vous pouvez nous contacter à l&apos;adresse :{' '}
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

