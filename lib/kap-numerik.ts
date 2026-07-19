/**
 * Source de vérité unique sur le dispositif Kap Numérik.
 *
 * Les chiffres et le statut du dispositif étaient auparavant recopiés à la main
 * dans le Hero, Pricing, /tourisme, /associations et /aides-digitales-reunion —
 * ils avaient divergé (une page annonçait "2021-2023", une autre "version
 * 2024-2027", une troisième une "réouverture 2026" jamais confirmée).
 *
 * Toute mention du dispositif doit désormais partir d'ici.
 *
 * Source officielle : Région Réunion, page mise à jour le 17 décembre 2025.
 * https://www.regionreunion.com/aides-services/article/le-kap-numerik-programme-europeen-feder-2021-2027
 * Relevé le 19 juillet 2026. À revérifier avant toute campagne s'appuyant dessus.
 */

export const KAP_NUMERIK = {
  /** Page officielle de la Région — à citer comme source. */
  sourceUrl:
    "https://www.regionreunion.com/aides-services/article/le-kap-numerik-programme-europeen-feder-2021-2027",
  /** Date à laquelle ces informations ont été relevées sur le site de la Région. */
  releveLe: "19 juillet 2026",
  /** Date de dernière mise à jour affichée par la Région sur sa page. */
  pageMiseAJourLe: "17 décembre 2025",

  /**
   * Statut courant. `suspendu` = le dépôt de NOUVELLES demandes est arrêté,
   * le dispositif n'est pas supprimé : une nouvelle version est annoncée.
   */
  statut: "suspendu" as const,

  /** Formulation officielle, à ne pas édulcorer. */
  statutOfficiel:
    "Le dépôt de nouvelles demandes est temporairement suspendu, le dispositif étant en cours de mise à jour par la Région. Une nouvelle version est annoncée, sans date de lancement communiquée à ce jour.",

  /** Version courte pour les encarts et bandeaux. */
  statutCourt: "Dispositif suspendu — nouvelle version en préparation, sans date annoncée.",

  /** Programme européen de rattachement. */
  programme: "FEDER 2021-2027",

  /** Plafond global de remboursement, toutes actions cumulées. */
  plafondGlobal: 3200,

  /** Taux de remboursement des dépenses éligibles HT, selon la taille. */
  taux: [
    { effectif: "0 à 9 salariés", taux: 80, plafond: 3200 },
    { effectif: "10 à 19 salariés", taux: 50, plafond: 2000 },
  ],

  /**
   * Plafonds PAR ACTION. Point capital : une création de site vitrine seule
   * est plafonnée à 1 200 €. Annoncer "jusqu'à 3 200 € pour votre site" est
   * faux — il faut cumuler plusieurs actions pour approcher le plafond global.
   */
  plafondsParAction: [
    { action: "Création ou refonte d'un site internet vitrine", plafond: 1200 },
    { action: "Création ou refonte d'un site internet marchand", plafond: 2000 },
    { action: "Développement d'une application mobile", plafond: 2000 },
    { action: "Chatbot", plafond: 2000 },
    { action: "Digitalisation de contenus (photos, web design, charte graphique)", plafond: 2000 },
    { action: "Community management", plafond: 1000 },
    { action: "Prestations de sécurité (audit, sécurisation)", plafond: 1000 },
    { action: "Abonnement à une marketplace", plafond: 1000 },
    { action: "Accompagnement à la stratégie digitale", plafond: 500 },
  ],

  /** Structures éligibles. Les associations le sont explicitement. */
  beneficiaires: [
    "TPE de moins de 20 salariés (y compris sans salarié) inscrites au RCS ou au Registre des métiers, siège à La Réunion — CA plafonné à 500 000 € (0-9 salariés) ou 1 000 000 € (10-19 salariés)",
    "Associations de moins de 10 salariés domiciliées à La Réunion",
    "Professions libérales non réglementées ou assimilées domiciliées à La Réunion, CA plafonné à 500 000 €",
  ],

  /** Secteurs exclus du dispositif. */
  secteursExclus: [
    "numérique",
    "agricole",
    "pêche",
    "promotion immobilière",
    "activités financières",
  ],

  /**
   * Obligations à respecter côté prestataire sur les sites livrés dans le cadre
   * du dispositif — à vérifier à chaque livraison concernée.
   */
  obligationsPrestataire: [
    "Numéro de SIRET communiqué au bénéficiaire",
    "Fiche d'engagement prestataire signée (téléchargeable sur le site de la Région)",
    "Logos Région et Europe affichés sur le site livré, suivis de la mention FEDER-FSE+ Réunion",
    "Site livré avec mentions légales et gestion des cookies (accepter / refuser)",
    "Rapport détaillant les actions réalisées, remis au bénéficiaire pour son dossier",
  ],

  /** Contact officiel du service instructeur. */
  contact: {
    email: "kap-numerik@cr-reunion.fr",
    telephone: "0262 92 22 82",
    horaires: "de 9h à 12h, du lundi au vendredi",
  },
} as const;

/** Plafond applicable à une création de site vitrine — le cas le plus courant. */
export const KAP_PLAFOND_SITE_VITRINE = 1200;
