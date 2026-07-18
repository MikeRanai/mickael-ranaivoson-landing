-- Étude de cas LRH (lrh.re) — méthode HCO : claims vérifiés uniquement.
--   · Mesures du 18/07/2026 (PSI + Lighthouse local, claim ≤ pire run) :
--     desktop 91/98 → claim « 90+ desktop » ; mobile 64-84 sur 9 runs → AUCUN claim
--     de score mobile (optimisation en cours, dit sobrement dans le texte).
--     100/100 accessibilité, bonnes pratiques & SEO constants sur tous les runs.
--   · Faits vérifiés sur le site : 6 clubs listés sur /clubs, calendrier/classements/
--     résultats en ligne, 7 matchs publiés pour illustrer (info Mickaël 18/07),
--     exploitation réelle à partir de la saison 2026-2027 (info Mickaël 18/07).
--   · Rôles de la plateforme confirmés par Mickaël 18/07 : la ligue gère les
--     compétitions, les clubs saisissent, arbitrage et actualités dans l'outil.
-- Ré-exécutable (UPDATE idempotent). Après exécution : redeploy (home statique).

UPDATE "Project"
SET
  content = $html$<h2>Le défi</h2><p>Le hockey réunionnais méritait mieux qu'une information éparpillée : pour suivre un match, connaître un classement ou savoir où prendre une licence, il fallait savoir à qui demander. La Ligue Réunionnaise de Hockey voulait un site officiel digne de ce nom — et surtout un outil pour faire vivre la saison sans ressaisir les mêmes informations à chaque journée.</p><h2>La solution</h2><p>J'ai construit les deux faces du projet :</p><ul><li><p><strong>Le site public</strong> — calendrier, résultats, classements calculés automatiquement, pages des 6 clubs de l'île, actualités, arbitrage, formation, parcours « prendre sa licence ».</p></li><li><p><strong>La plateforme de gestion</strong> — la ligue crée ses compétitions et son calendrier, les clubs saisissent leurs informations, l'arbitrage et les actualités se gèrent au même endroit. Un résultat saisi met à jour classements et pages publiques instantanément.</p></li></ul><h2>Les résultats</h2><p>Des chiffres vérifiables sur PageSpeed Insights (mesures du 18 juillet 2026) :</p><ul><li><p>Performance <strong>90+ sur desktop</strong> — côté mobile, l'optimisation se poursuit et le score évolue encore ;</p></li><li><p><strong>100/100 en accessibilité, bonnes pratiques et SEO</strong>, constants sur toutes les mesures.</p></li></ul><p>Et côté terrain : le site est en ligne avec les <strong>6 clubs de l'île</strong>, ses premiers matchs publiés, et la plateforme prête pour sa vraie première : <strong>la saison 2026-2027</strong>, qu'elle gérera de bout en bout. Une infrastructure numérique complète, livrée avant le premier coup d'envoi.</p>$html$,
  kpis = '[
    {"value": "100/100", "label": "accessibilité, bonnes pratiques & SEO"},
    {"value": "90+", "label": "PageSpeed desktop"},
    {"value": "6 clubs", "label": "de l''île réunis sur un site officiel"},
    {"value": "2026-27", "label": "première saison gérée par la plateforme"}
  ]'::jsonb,
  role = 'Création complète — site officiel & plateforme de gestion',
  sector = 'Ligue sportive',
  "techStack" = ARRAY['Next.js', 'TypeScript', 'Tailwind CSS', 'Prisma', 'PostgreSQL'],
  year = 2026
WHERE slug = 'ligue-reunionnaise-de-hockey';
