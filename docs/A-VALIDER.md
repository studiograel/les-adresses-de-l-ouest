# À valider avant la mise en ligne

Livraison prévue : **16 octobre 2026**. Contenus reçus le 2 octobre 2026.

Tout ce qui manque s'écrit `[À CONFIRMER : quoi]`. Les marqueurs **visibles dans les pages** sont repérés « (visible) » :
il faut les remplacer (ou les supprimer avec la phrase qui les entoure) avant la mise en ligne.

---

## 1. À obtenir de Léane et Louison

| # | Marqueur | Où | Détail |
|---|----------|----|--------|
| 1 | `[À CONFIRMER : liste des lieux de tournage à recevoir de Léane]` (visible) | Accueil, rubrique « Les lieux » | Aucun fichier `lieux.md` reçu : la carte s'affiche sans pin. Il faut, pour chaque lieu : le nom, la commune, un lien facultatif (publication Instagram ou site du commerçant) et l'accord du commerçant. Les lieux se saisissent dans `src/data/lieux.js` (modèle en haut du fichier). **Les pins se posent à la main avec Matteo** (voir le point 3 : la carte ne peut pas être calée automatiquement). |
| 2 | `[À CONFIRMER : accord de X pour être cité sur le site]` | `src/data/lieux.js` (`accordAffichage`) | Un lieu n'est affiché que si `accordAffichage: true`. Être filmé pour Instagram n'est pas la même chose qu'être cité sur le site : un accord par commerçant est nécessaire. Aucun lieu n'est encore saisi : la liste des accords à obtenir sera celle des lieux reçus. |
| 3 | `[À CONFIRMER : position de X]` (visible dans la liste en texte) | `src/data/lieux.js` | La carte (`reference/carte-lieux.png`) ne porte aucun nom de commune ni aucun repère : on ne peut donc pas convertir une adresse en position sans deviner. Chaque pin est posé **à la main**, avec Matteo, commune par commune, en pourcentage de la largeur (`x`) et de la hauteur (`y`) de l'image recadrée (`src/assets/carte-lieux.webp`). Un lieu accepté mais sans `x` ni `y` apparaît dans la liste en texte avec ce marqueur, sans pin. Aucune position n'est jamais devinée. |
| 4 | `[À CONFIRMER : lien du formulaire à valider par Léane]` | `src/data/site.js` (`formulaire`) | Le lien du bouton « Parlez-nous de votre projet » a été décodé du code QR de la plaquette. À faire valider par Léane (et tester : le formulaire doit s'ouvrir et fonctionner). |
| 5 | `[À CONFIRMER : adresse professionnelle]` (visible) | Page « Mentions légales » | L'e-mail ne remplace pas une adresse postale. Aucune adresse personnelle n'a été saisie. À fournir par Louison. |
| 6 | `[À CONFIRMER : durées de conservation]` (visible) | Page « Confidentialité » | Louison a répondu « le minimum légal » : ce n'est pas une durée publiable. **Proposition de Matteo à valider par Louison : _à compléter par Matteo_.** Repère à vérifier avant tout usage : pour les demandes commerciales, la CNIL parle généralement de 3 ans à partir du dernier contact avec la personne (à confirmer auprès de la CNIL). Il faut aussi décider qui efface les réponses dans Google Forms, et quand. |
| 7 | Carte : droits confirmés oralement par Matteo le 03/10/2026 auprès de Louison et Léane ; demander une confirmation écrite (un e-mail suffit). **Priorité basse : ne bloque rien.** | Accueil, rubrique « Les lieux » (`reference/carte-lieux.png`, version recadrée dans `src/assets/carte-lieux.webp`) | Le fichier reste dans le dépôt. Question utile à poser en même temps : avec quel outil ou quelles données la carte a-t-elle été fabriquée ? Elle ne porte aucune mention de source (marges vides) et ce n'est pas une capture d'un service. Si le fond vient d'OpenStreetMap, la mention « © les contributeurs d'OpenStreetMap » deviendrait obligatoire en légende : elle n'est PAS ajoutée tant qu'on ne le sait pas. La légende actuelle est « Carte : Les Adresses de l'Ouest ». |
| 8 | Photos et vidéos libres de droits | `src/data/photos.js` | Aucune photo n'est utilisée. Pour en ajouter : droits et accord écrit des personnes visibles (voir `docs/AJOUTER-DES-PHOTOS.md`). |

## 2. Rappels de mise à jour

- **1er novembre 2026 : mettre à jour l'offre.** Après le 31 octobre 2026 (fin de journée, heure de Paris), le bloc de prix est remplacé automatiquement par « Tarif sur demande », même sans reconstruire le site. Il faut ensuite modifier `src/data/offre.js` (nouveau tarif ou formulation) puis reconstruire le site.
- **Chiffres du compte : mise à jour mensuelle.** Prochaine mise à jour prévue le 2 novembre 2026 (`src/data/chiffres.js`, `prochaineMiseAJour`). Toujours changer aussi la date affichée.

## 3. À valider par Matteo

| # | Point | Détail |
|---|-------|--------|
| 1 | `[À CONFIRMER : adresse définitive du site]` | `src/data/site.js` contient l'adresse provisoire `https://demo-adresses-ouest.pages.dev`. Elle sert aux balises canoniques, à `og:image`, au plan du site, à `robots.txt` et aux données structurées. À remplacer par le vrai domaine (une seule ligne). Aucun réglage DNS n'a été touché. |
| 2 | Relecture juridique | Les pages « Mentions légales » et « Confidentialité » ne sont **pas un avis juridique** : à faire relire. Points à regarder : la phrase « Ces informations servent à vous recontacter et à comprendre votre projet » (finalité déduite du formulaire, non confirmée) ; la mention de la CNIL ; le fait que l'hébergeur (Cloudflare) peut traiter des données techniques de connexion, non mentionné sur la page. |
| 3 | « Le site ne dépose aucun cookie » | Vérifié dans le code (aucun cookie, stockage local, outil de mesure ou ressource tierce) et dans la page construite (les seules adresses extérieures sont des liens). Non vérifié côté hébergement (Cloudflare) une fois le site en ligne : à contrôler après la mise en ligne. |
| 4 | Ancienne maquette et ses formulaires | L'ancienne page `public/index.html` contenait un faux formulaire de demande (aucun envoi, mais il affichait « On vous rappelle sous 48 h ») et un champ d'inscription à la newsletter. Je ne les ai pas supprimés : la page est rangée intacte dans `reference/ancienne-maquette-public-index.html`. **À confirmer : on les abandonne bien ?** Elle contenait aussi des prix inventés (190 €, 249 €, 480 €), « 2 000 habitants » et des noms de commerces : rien n'a été repris. |
| 5 | Polices | Direction « journal » (correction du 03/10/2026) : **Playfair Display** pour les titres, les chapeaux et les chiffres, **Libre Franklin** (sans empattement, libre, licence OFL) pour le texte courant et les petites capitales. Deux familles, hébergées sur le site. Cela remplace le choix précédent (Passion One). Sunborn Sans One (plaquette) n'a pas de licence web confirmée et n'est pas utilisée. |
| 6 | Logo | `reference/logo-hd.png` fait 1 350 × 1 080 px, mais le rond recadré ne fait que **552 × 552 px**. Il n'est jamais affiché plus grand que 276 px de large (écrans ×2) ni agrandi. Un fichier SVG permettrait de le montrer plus grand. |
| 7 | Contenus de la plaquette non repris | Étiquette NE PAS UTILISER : « + de 2 000 personnes dans notre communauté locale », ambition « guide local de référence et média influent », section « Nos résultats en 3 semaines ». Étiquette ADAPTER (cibles) : non reprise, pour éviter une affirmation non vérifiée. |
| 8 | Direction « journal » | Le site reprend la une d'un journal de proximité (bandeau de titre, double filet, colonnes, lettrine, encadré de petite annonce). Rien n'est inventé : aucun article, aucune signature de journaliste, aucun numéro d'édition, aucune date de « une ». Les colonnes de texte (concept, pourquoi) passent sur deux colonnes dès 768 px comme demandé ; elles donnent environ 70 caractères par ligne sur grand écran mais seulement 40 à 45 sur tablette étroite. |
