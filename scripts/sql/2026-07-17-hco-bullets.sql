-- Aligne les bullets de la carte HCO (home) sur les claims vérifiés de l'étude de cas.
-- L'ancien bullet « Score PageSpeed 95+ (mobile) » est le claim invalidé le 16/07 (pire run observé : 92).
-- Après exécution : redeploy nécessaire (home statique) — commit vide + push.
UPDATE "Project"
SET bullets = ARRAY[
  'Score PageSpeed 90+ mobile (100 desktop)',
  '1ʳᵉ page Google sur « hockey réunion »',
  '12 inscriptions en ligne dès la 1ʳᵉ saison'
]
WHERE slug = 'hockey-club-de-louest';
