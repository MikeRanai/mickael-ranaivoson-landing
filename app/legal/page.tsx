import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions Légales & CGV - Mickaël Ranaivoson",
  description:
    "Informations légales, Conditions Générales de Vente et Politique de Confidentialité de Mickaël Ranaivoson, développeur web à La Réunion.",
  openGraph: {
    title: "Mentions Légales & CGV - Mickaël Ranaivoson",
    description:
      "Informations légales, CGV et Politique de Confidentialité.",
    url: "/legal",
    type: "website",
    locale: "fr_FR",
  },
  alternates: {
    canonical: "/legal",
  },
};

export default function LegalPage() {
  return (
    <div className="bg-slate-950 min-h-screen text-slate-300">
      <main className="container mx-auto px-6 py-12 max-w-4xl space-y-16">
        
        <div className="space-y-4 border-b border-white/10 pb-8">
            <h1 className="text-4xl font-bold text-white">Informations Légales</h1>
            <p className="text-slate-400">Dernière mise à jour : Janvier 2026</p>
        </div>

        {/* SECTION 1 : MENTIONS LÉGALES */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-[#ffa800]">1. Mentions Légales</h2>
          <div className="prose prose-invert max-w-none space-y-4">
            <p>
              Conformément aux dispositions de la loi n°2004-575 du 21 juin 2004 pour la Confiance dans l'économie numérique, il est porté à la connaissance des utilisateurs du site les présentes mentions légales.
            </p>
            
            <h3 className="text-xl font-semibold text-white">Éditeur du site</h3>
            <ul className="list-disc pl-5 space-y-1">
                <li><strong>Nom commercial :</strong> MR Digital Solutions</li>
                <li><strong>Statut juridique :</strong> Entrepreneur Individuel (EI)</li>
                <li><strong>Responsable éditorial :</strong> Mickaël Ranaivoson</li>
                <li><strong>Siège social :</strong>4 rue Jacquot, Saint-Paul 97460 La Réunion</li>
                <li><strong>SIRET :</strong> 902 063 197 00021</li>
                <li><strong>Email :</strong> ranaimike@gmail.com</li>
                <li><strong>Téléphone :</strong> 0692342373</li>
            </ul>

            <h3 className="text-xl font-semibold text-white">Hébergement</h3>
            <p>
              Le site est hébergé par <strong>Vercel Inc.</strong><br/>
              Adresse : 340 S Lemon Ave #4133 Walnut, CA 91789, USA.<br/>
              Site web : https://vercel.com
            </p>
          </div>
        </section>

        {/* SECTION 2 : CGV */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-[#ffa800]">2. Conditions Générales de Vente (CGV)</h2>
          <div className="prose prose-invert max-w-none space-y-4 text-sm md:text-base">
            
            <h3 className="text-white font-bold">Article 1 : Objet et Champ d'application</h3>
            <p>
              Les présentes CGV régissent les relations contractuelles entre Mickaël Ranaivoson (le "Prestataire") et toute personne physique ou morale (le "Client") souhaitant bénéficier des services de développement web, conseil, ou solutions SaaS (ex: NoutAsso).
            </p>

            <h3 className="text-white font-bold">Article 2 : Commandes et Devis</h3>
            <p>
              Toute prestation donne lieu à l'établissement d'un devis gratuit. La commande est ferme et définitive après signature du devis par le Client et versement d'un acompte de 30% (sauf mention contraire).
            </p>

            <h3 className="text-white font-bold">Article 3 : Propriété Intellectuelle (Clause Importante)</h3>
            <p>
              Le transfert de propriété du code source et des livrables s'effectue <strong>uniquement après le paiement intégral</strong> du prix par le Client. Tant que la facture n'est pas soldée, les créations restent la propriété exclusive du Prestataire (Réserve de propriété, Loi n°80-335).
            </p>

            <h3 className="text-white font-bold">Article 4 : Dispositif Kap Numérik (Aides Régionales)</h3>
            <p>
              Le Prestataire propose une assistance au montage du dossier "Kap Numérik" de la Région Réunion. Cependant :
            </p>
            <ul className="list-disc pl-5">
                <li>Le Prestataire a une obligation de moyens, non de résultat, concernant l'obtention de l'aide.</li>
                <li>L'accord de subvention relève de la décision souveraine de la Région Réunion et de l'ASP.</li>
                <li>En cas de refus de l'aide par la Région (pour inéligibilité du Client ou épuisement des fonds), <strong>le Client reste redevable de la totalité de la somme due au Prestataire</strong>, selon les modalités définies au devis.</li>
            </ul>

            <h3 className="text-white font-bold">Article 5 : Responsabilité</h3>
            <p>
              Le Prestataire s'engage à apporter tout le soin nécessaire à la réalisation des prestations. Sa responsabilité ne pourra être engagée qu'en cas de faute prouvée et est plafonnée au montant de la prestation facturée. Le Prestataire ne peut être tenu responsable des pannes d'hébergeurs tiers (OVH, Vercel, AWS) ou de coupures internet.
            </p>
          </div>
        </section>

        {/* SECTION 3 : RGPD */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-[#ffa800]">3. Politique de Confidentialité (RGPD)</h2>
          <div className="prose prose-invert max-w-none space-y-4">
            <p>
              Conformément au Règlement Général sur la Protection des Données (RGPD), nous nous engageons à protéger vos données personnelles.
            </p>

            <h3 className="text-white font-bold">Données collectées</h3>
            <p>
              Via le formulaire de contact, nous collectons : Nom, Prénom, Email, Téléphone. Ces données sont utilisées uniquement pour répondre à votre demande commerciale. Elles ne sont jamais revendues à des tiers.
            </p>

            <h3 className="text-white font-bold">Vos droits</h3>
            <p>
              Vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Pour l'exercer, contactez-nous par email.
            </p>
            
            <h3 className="text-white font-bold">Cookies</h3>
            <p>
              Ce site utilise un minimum de cookies nécessaires au bon fonctionnement (session) et des cookies de mesure d'audience anonymes (non intrusifs).
            </p>
          </div>
        </section>

      </main>
    </div>
  );
}