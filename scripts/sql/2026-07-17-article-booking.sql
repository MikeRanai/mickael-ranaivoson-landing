-- Article M2 : « Combien Booking vous coûte vraiment » — pilier SEO du segment
-- tourisme, pointe vers le calculateur de /tourisme. Ré-exécutable : ON CONFLICT
-- sur le slug met à jour le contenu (itérations de rédaction).
-- Pas de redeploy nécessaire : /blog est en ISR 60 s et dynamicParams accepte
-- le nouveau slug. (Le sitemap statique, lui, se rafraîchira au prochain deploy.)
-- Cover à ajouter ensuite via /dashboard/blog si souhaité (1600×900).

INSERT INTO "Post" (
  id, title, slug, content, excerpt, "metaDescription", tag,
  "coverImage", published, "publishedAt", "createdAt", "updatedAt"
)
VALUES (
  gen_random_uuid()::text,
  'Combien Booking vous coûte vraiment : le calcul honnête pour un gîte à La Réunion',
  'combien-booking-vous-coute-vraiment',
  $post$<p>Si vous louez un gîte, une chambre d'hôtes ou une location saisonnière à La Réunion, vous connaissez le chiffre officiel : Booking prélève « autour de 15 % ». Mais ce chiffre-là est rarement celui que vous payez réellement. Entre les programmes de visibilité, les remises financées de votre poche et les à-côtés, la note grimpe — et comme elle est prélevée à la source, elle ne saute jamais aux yeux dans la comptabilité.</p>

<p>Faisons le calcul honnêtement, poste par poste. Puis voyons ce qu'une stratégie de réservation directe change concrètement — sans discours anti-plateformes, parce que les plateformes restent utiles.</p>

<h2>Le décompte réel : bien plus que « 15 % »</h2>

<p>La commission de base de Booking.com en France se situe entre <strong>15 et 17 %</strong> du montant du séjour, TTC. C'est le point de départ. S'y ajoutent, selon vos choix :</p>

<ul>
<li><strong>Le programme « Établissement Préféré »</strong> : environ <strong>+3 points de commission</strong> en échange d'une meilleure visibilité (le petit pouce levé). Beaucoup d'hébergeurs l'activent sans mesurer son coût annuel.</li>
<li><strong>Les remises Genius</strong> : ce sont <strong>vous</strong> qui financez les 10 à 15 % de réduction affichés aux voyageurs fidèles de la plateforme. Ce n'est pas une commission, mais l'effet sur votre revenu net est le même.</li>
<li><strong>Le « Visibility Booster »</strong> : une enchère de commission supplémentaire pour remonter dans les résultats, aux périodes où vous en avez besoin… c'est-à-dire souvent.</li>
</ul>

<p>Résultat : beaucoup d'hébergeurs reversent en réalité <strong>entre 18 et 25 % de leur chiffre d'affaires</strong> aux plateformes. Airbnb n'est pas très différent : la répartition hôte/voyageur varie, mais le total prélevé sur la transaction tourne autour de 14 à 16 %.</p>

<h2>Exemple chiffré : un gîte à 2 500 € par mois</h2>

<p>Prenons un gîte qui encaisse en moyenne 2 500 € par mois via les plateformes, haute et basse saison confondues — soit 30 000 € par an. Voici ce que donnent trois niveaux de commission :</p>

<table>
<thead>
<tr><th>Scénario</th><th>Taux réel</th><th>Reversé par an</th></tr>
</thead>
<tbody>
<tr><td>Commission standard</td><td>15 %</td><td><strong>4 500 €</strong></td></tr>
<tr><td>+ Établissement Préféré</td><td>18 %</td><td><strong>5 400 €</strong></td></tr>
<tr><td>+ Genius et boosters</td><td>22 %</td><td><strong>6 600 €</strong></td></tr>
</tbody>
</table>

<p>Entre 4 500 et 6 600 € par an. Chaque année. Pour beaucoup de gîtes réunionnais, c'est l'équivalent d'un mois et demi à deux mois de chiffre d'affaires qui part en commissions — de quoi financer plusieurs fois un site de réservation directe, chaque année.</p>

<h2>Ce que la commission ne montre pas</h2>

<p>Le prélèvement n'est que la partie visible. Trois coûts cachés pèsent au moins autant :</p>

<h3>1. Le client ne vous appartient pas</h3>
<p>Booking garde le contact : l'email que vous voyez est un alias temporaire. Un voyageur ravi de son séjour ne peut pas être recontacté l'année suivante pour lui proposer de revenir en direct. Vous repayez la commission à chaque retour — pour un client que <em>vous</em> avez fidélisé.</p>

<h3>2. Une dépendance que vous ne contrôlez pas</h3>
<p>Un compte suspendu le temps d'une vérification, un changement d'algorithme, une hausse de commission : votre carnet de réservations dépend de décisions prises à Amsterdam, pas chez vous.</p>

<h3>3. Le mythe du « même prix partout »</h3>
<p>Bonne nouvelle méconnue : en France, <strong>les clauses de parité tarifaire sont interdites depuis la loi Macron de 2015</strong> (et le règlement européen DMA a enfoncé le clou en 2024). Autrement dit, vous avez parfaitement le droit d'afficher un <strong>meilleur prix en réservation directe</strong> que sur Booking. « Réservez en direct, c'est 10 % moins cher » est un argument légal — et redoutablement efficace, puisque vous économisez la commission au passage.</p>

<h2>La stratégie réaliste : ne quittez pas Booking</h2>

<p>Soyons clairs : fermer votre compte Booking serait une erreur pour la plupart des hébergements. Les plateformes excellent à une chose : vous faire découvrir par des voyageurs qui ne vous connaissent pas, notamment à l'international.</p>

<p>La stratégie gagnante est un <strong>mix</strong> :</p>

<ul>
<li><strong>Les plateformes pour être découvert</strong> — le premier séjour d'un nouveau client peut « coûter » une commission, c'est un coût d'acquisition acceptable.</li>
<li><strong>Le direct pour tout le reste</strong> — les clients qui reviennent, ceux qui vous trouvent sur Google (« gîte Cilaos », « chambre d'hôtes Saint-Leu »…), ceux envoyés par le bouche-à-oreille. Eux n'ont aucune raison de passer — et de vous faire payer — un intermédiaire.</li>
</ul>

<p>Concrètement, il vous faut trois briques : un <strong>site rapide</strong> avec calendrier de disponibilités et demande de réservation, une <strong>fiche Google Business</strong> soignée qui pointe vers ce site, et un <strong>argument direct</strong> (meilleur tarif, petit-déjeuner offert, arrivée flexible…) affiché clairement. Même en ne basculant que 30 % de vos séjours en direct, le calcul est vite fait : sur l'exemple ci-dessus à 18 %, cela représente environ 1 620 € d'économie par an — un site à 1 600 € est amorti en moins d'un an, puis chaque séjour direct est à 0 % à vie.</p>

<h2>Faites le calcul pour votre hébergement</h2>

<p>Chaque situation est différente : taux réel, chiffre d'affaires, part de clients fidèles. J'ai mis en ligne un <a href="/tourisme#calculateur">calculateur de commissions gratuit</a> — trois curseurs, aucun email demandé — pour estimer ce que les plateformes vous coûtent par an et en combien de mois un site de réservation directe serait amorti dans <em>votre</em> cas.</p>

<h2>Et le budget ?</h2>

<p>Un site vitrine avec calendrier et demandes de réservation démarre à <strong>1 600 € HT</strong> — un coût unique, pas un pourcentage à vie. Avec paiement d'acompte en ligne et confirmations automatiques, comptez à partir de 3 200 € HT. Les hébergements touristiques réunionnais sont par ailleurs éligibles au dispositif <a href="/aides-digitales-reunion">Kap Numérik</a> (jusqu'à 3 200 € remboursés) quand il est actif — il est actuellement en pause, mais vous pouvez vous inscrire pour être prévenu de la réouverture.</p>

<p>Envie d'en parler ? <a href="/?type=devis#contact">Décrivez-moi votre hébergement</a> : je vous dis honnêtement ce qu'un site de réservation directe peut vous rapporter — et si ça ne vaut pas le coup dans votre cas, je vous le dis aussi.</p>$post$,
  'Commission standard, programme Préféré, remises Genius : le vrai taux dépasse souvent 20 %. Le calcul poste par poste pour un gîte réunionnais, et la stratégie réaliste pour reprendre la main sans quitter Booking.',
  'Commission Booking réelle (15 à 25 %), exemple chiffré pour un gîte à La Réunion et stratégie de réservation directe. Calculateur gratuit inclus.',
  'general',
  NULL,
  true,
  now(),
  now(),
  now()
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  excerpt = EXCLUDED.excerpt,
  "metaDescription" = EXCLUDED."metaDescription",
  "updatedAt" = now();
