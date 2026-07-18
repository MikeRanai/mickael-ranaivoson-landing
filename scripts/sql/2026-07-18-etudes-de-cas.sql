-- Études de cas NoutAsso, Culture Afro, FD Informatique + correctif bullets LRH.
-- Méthode identique à HCO (16-17/07) : uniquement des claims vérifiés.
--   · Scores techniques : Lighthouse mobile/desktop mesurés le 18/07/2026 (2 runs par site,
--     claim ≤ pire run observé) — NoutAsso 92/95 mobile, 98 desktop ; Culture Afro 93/94 mobile,
--     99 desktop ; les deux 100/100 bonnes pratiques & SEO, CLS 0.
--   · KPIs métier NoutAsso : confirmés défendables par Mickaël le 18/07/2026.
--   · LRH mesuré 69-76 mobile (LCP ~5,1-5,6 s) → le bullet « +90 mobile » était invalide ;
--     remplacé par les claims vérifiés (100/100 a11y-BP-SEO). Étude de cas LRH reportée
--     après optimisation du site (décision Mickaël 18/07).
-- Ré-exécutable (UPDATE idempotents). Après exécution : redeploy (home statique).

-- ============================================================================
-- 1. NoutAsso — étude de cas (featured : les kpis s'affichent aussi sur la home)
-- ============================================================================
UPDATE "Project"
SET
  content = $html$<h2>Le défi</h2><p>Dans la plupart des associations réunionnaises, la gestion repose encore sur du papier, des tableurs et des boîtes mail : adhésions à ressaisir, cotisations à pointer, comptabilité à reconstituer en fin d'année pour l'assemblée générale et les documents attendus par la Préfecture. Ce travail invisible repose sur des bénévoles — et c'est souvent lui qui les épuise.</p><h2>La solution</h2><p>NoutAsso est un produit que j'ai conçu, développé et que j'exploite : une plateforme qui regroupe toute la gestion d'une association loi 1901 au même endroit.</p><ul><li><p><strong>Adhésions en ligne</strong> — fini le papier : le membre s'inscrit et paie en ligne, le bureau voit tout en temps réel.</p></li><li><p><strong>Comptabilité assistée par IA</strong> — les transactions sont catégorisées automatiquement, le trésorier valide au lieu de tout saisir.</p></li><li><p><strong>Documents officiels générés automatiquement</strong> — rapport financier et bilans prêts pour l'AG et conformes aux attentes de la Préfecture.</p></li></ul><p>La plateforme est gratuite pour les petites associations de La Réunion.</p><h2>Les résultats</h2><p>Côté technique, des chiffres que n'importe qui peut vérifier sur PageSpeed Insights (mesures du 18 juillet 2026) :</p><ul><li><p>Performance <strong>90+ sur mobile</strong> et <strong>95+ sur desktop</strong> ;</p></li><li><p><strong>100/100 en bonnes pratiques et SEO</strong>, zéro décalage de mise en page (CLS = 0).</p></li></ul><p>Et côté associations accompagnées :</p><ul><li><p>Le rapport financier passe de <strong>2 h de travail à 5 minutes</strong> de génération ;</p></li><li><p><strong>+25 % d'adhésions</strong> depuis le passage du papier au tunnel en ligne ;</p></li><li><p>Environ <strong>40 % de charge administrative en moins</strong> pour le bureau ;</p></li><li><p>Des documents <strong>acceptés tels quels par la Préfecture</strong>.</p></li></ul><p>C'est aussi ma vitrine la plus complète : le produit tourne en production, avec de vrais utilisateurs, des paiements et des obligations réglementaires.</p>$html$,
  kpis = '[
    {"value": "2h → 5min", "label": "génération du rapport financier"},
    {"value": "+25%", "label": "d''adhésions en ligne (vs papier)"},
    {"value": "−40%", "label": "de charge administrative au bureau"},
    {"value": "100%", "label": "conforme attentes Préfecture"}
  ]'::jsonb,
  role = 'Produit maison — conception, développement & exploitation',
  sector = 'SaaS — gestion associative',
  "techStack" = ARRAY['Next.js', 'TypeScript', 'Tailwind CSS', 'Prisma', 'PostgreSQL', 'Stripe', 'IA'],
  year = 2026
WHERE slug = 'noutasso';

-- ============================================================================
-- 2. Association Culture Afro — étude de cas
-- ============================================================================
UPDATE "Project"
SET
  content = $html$<h2>Le défi</h2><p>L'Association Culture Afro accompagne les femmes de La Réunion à comprendre, entretenir et aimer leurs cheveux texturés — ateliers d'éducation capillaire, loisirs créatifs, moments de transmission. Il lui fallait une présence en ligne à la hauteur de cette mission : une identité visuelle qui lui ressemble, un endroit où découvrir les ateliers et s'y inscrire sans passer par des échanges de messages.</p><h2>La solution</h2><p>J'ai créé le site de A à Z, en partant de l'identité avant la technique :</p><ul><li><p><strong>Identité visuelle alignée à la mission</strong> — un univers chaleureux et affirmé, loin des templates génériques.</p></li><li><p><strong>Inscription aux ateliers en ligne</strong> — les participantes réservent leur place directement depuis le site.</p></li><li><p><strong>SEO local</strong> — structure et contenus ciblant La Réunion et la thématique capillaire, pour être trouvée par les bonnes personnes.</p></li></ul><h2>Les résultats</h2><p>Des chiffres vérifiables en 30 secondes sur PageSpeed Insights (mesures du 18 juillet 2026) :</p><ul><li><p>Performance <strong>90+ sur mobile</strong> et <strong>95+ sur desktop</strong> ;</p></li><li><p><strong>100/100 en bonnes pratiques et SEO</strong> ;</p></li><li><p>Zéro décalage de mise en page (CLS = 0).</p></li></ul><p>Et surtout : une association qui maîtrise son image, et des inscriptions aux ateliers qui se font en ligne, sans friction.</p>$html$,
  kpis = '[
    {"value": "90+", "label": "PageSpeed mobile (95+ desktop)"},
    {"value": "100/100", "label": "bonnes pratiques & SEO"},
    {"value": "0", "label": "décalage de mise en page (CLS)"},
    {"value": "En ligne", "label": "inscriptions aux ateliers"}
  ]'::jsonb,
  role = 'Création complète — identité, développement & SEO',
  sector = 'Association culturelle',
  "techStack" = ARRAY['Next.js', 'TypeScript', 'Tailwind CSS', 'Prisma'],
  year = 2026
WHERE slug = 'association-culture-afro';

-- ============================================================================
-- 3. FD Informatique — étude de cas « projet confidentiel » (pas de kpis chiffrés :
--    app mise en production en juillet 2026, trop tôt pour des chiffres honnêtes)
-- ============================================================================
UPDATE "Project"
SET
  content = $html$<h2>Le défi</h2><p>FD Informatique gère un service après-vente au quotidien : du matériel qui entre, des réparations en cours, des clients à rappeler. Tant que tout cela vit dans des e-mails et des tableurs, personne n'a de vue d'ensemble : où en est chaque intervention, qu'a-t-on déjà fait pour ce client, qui devait être relancé cette semaine ? Les oublis ne sont pas une question de sérieux — c'est l'outil qui ne suit pas.</p><h2>La solution</h2><p>J'ai conçu et développé une application web interne, sur mesure, pensée pour le flux réel de l'atelier :</p><ul><li><p><strong>Suivi des interventions en temps réel</strong> — chaque dossier est tracé du dépôt du matériel à sa restitution, avec son statut visible d'un coup d'œil.</p></li><li><p><strong>Historique client centralisé</strong> — tout le passif d'un client (matériel, interventions, échanges) accessible en un clic.</p></li><li><p><strong>Relances intégrées au flux</strong> — ce qui doit être suivi est dans l'outil, pas dans la mémoire de quelqu'un.</p></li></ul><p><em>Projet interne et confidentiel : pas de lien public ni de captures d'écran — je peux en dire plus de vive voix.</em></p><h2>Les résultats</h2><p>L'application est en production depuis juillet 2026 — trop tôt pour annoncer des chiffres, et je ne publie que ce que je peux prouver. Ce qui change dès le premier jour :</p><ul><li><p>Plus aucune intervention hors radar : <strong>tout dossier ouvert est tracé</strong> jusqu'à sa clôture ;</p></li><li><p>Le contexte client complet <strong>en un clic</strong> au lieu de fouiller les boîtes mail ;</p></li><li><p>Les relances sortent de la tête des techniciens pour <strong>entrer dans l'outil</strong>.</p></li></ul><p>Une application métier n'a pas besoin d'être spectaculaire : elle doit coller au flux de travail réel et tenir dans la durée. C'est exactement ce type de projet que je construis pour les TPE.</p>$html$,
  role = 'Application métier — conception & développement',
  sector = 'Services informatiques',
  "techStack" = ARRAY['Next.js', 'TypeScript', 'Tailwind CSS', 'Prisma', 'PostgreSQL'],
  year = 2026
WHERE slug = 'fd-informatique';

-- ============================================================================
-- 4. LRH — correctif des claims de la carte home (mesures du 18/07/2026 :
--    perf mobile 69-76 → « +90 mobile » retiré ; a11y/BP/SEO 100/100 vérifiés).
--    L'étude de cas viendra après optimisation du site + re-mesure.
-- ============================================================================
UPDATE "Project"
SET
  description = 'Site officiel de la Ligue et plateforme de gestion sportive : calendrier, classements, clubs et actualités du hockey à La Réunion.',
  bullets = ARRAY[
    '100/100 accessibilité, bonnes pratiques & SEO',
    'Calendrier, classements et résultats en ligne',
    'Tunnel d''acquisition fluide'
  ]
WHERE slug = 'ligue-reunionnaise-de-hockey';
