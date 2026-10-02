# À valider avant la mise en ligne

Livraison prévue : **16 octobre 2026**. Contenus reçus le 2 octobre 2026.

Tout ce qui manque s'écrit `[À CONFIRMER : quoi]`. Les marqueurs **visibles dans les pages** sont repérés « (visible) » :
il faut les remplacer (ou les supprimer avec la phrase qui les entoure) avant la mise en ligne.

---

## 1. À obtenir de Léane et Louison

| # | Marqueur | Où | Détail |
|---|----------|----|--------|
| 1 | `[À CONFIRMER : carte et liste des lieux à recevoir de Léane]` (visible) | Accueil, section « Les adresses où nous avons tourné » | Aucun fichier `lieux.md` reçu : la carte s'affiche sans pin. Il faut, pour chaque lieu : le nom, la commune, l'adresse (pour obtenir la latitude et la longitude une seule fois avec la Base Adresse Nationale, adresse.data.gouv.fr), un lien facultatif (publication Instagram ou site du commerçant) et l'accord du commerçant. Les lieux se saisissent dans `src/data/lieux.js` (modèle en haut du fichier). |
| 2 | `[À CONFIRMER : accord de X pour être cité sur le site]` | `src/data/lieux.js` (`accordAffichage`) | Un lieu n'est affiché que si `accordAffichage: true`. Être filmé pour Instagram n'est pas la même chose qu'être cité sur le site : un accord par commerçant est nécessaire. Aucun lieu n'est encore saisi : la liste des accords à obtenir sera celle des lieux reçus. |
| 3 | `[À CONFIRMER : position de X]` (visible dans la liste en texte) | `src/data/lieux.js` | Si une adresse n'est pas trouvée dans la Base Adresse Nationale, le lieu n'a pas de pin et ce marqueur apparaît à côté de son nom. Aucune position n'est jamais devinée. |
| 4 | `[À CONFIRMER : lien du formulaire à valider par Léane]` | `src/data/site.js` (`formulaire`) | Le lien du bouton « Parlez-nous de votre projet » a été décodé du code QR de la plaquette. À faire valider par Léane (et tester : le formulaire doit s'ouvrir et fonctionner). |
| 5 | `[À CONFIRMER : adresse professionnelle]` (visible) | Page « Mentions légales » | L'e-mail ne remplace pas une adresse postale. Aucune adresse personnelle n'a été saisie. À fournir par Louison. |
| 6 | `[À CONFIRMER : durées de conservation]` (visible) | Page « Confidentialité » | Louison a répondu « le minimum légal » : ce n'est pas une durée publiable. **Proposition de Matteo à valider par Louison : _à compléter par Matteo_.** Repère à vérifier avant tout usage : pour les demandes commerciales, la CNIL parle généralement de 3 ans à partir du dernier contact avec la personne (à confirmer auprès de la CNIL). Il faut aussi décider qui efface les réponses dans Google Forms, et quand. |
| 7 | Origine de `reference/carte-lieux.png` | Non utilisée sur le site | Joli plan de rues bleu sur crème, qui ressemble à un plan fabriqué avec les données OpenStreetMap, mais ce n'est ni une capture Google ni un export My Maps. Demander : qui l'a fabriquée, avec quel outil, et a-t-elle les droits ? Si le fond vient d'OpenStreetMap, la mention « © les contributeurs d'OpenStreetMap » est obligatoire. Elle ne peut de toute façon pas recevoir de pins (aucune coordonnée géographique connue). |
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
| 5 | Police des titres | Sunborn Sans One (plaquette) n'a pas de licence web confirmée. Les titres utilisent **Passion One** (libre, licence OFL), choisie en comparant les lettres du logo. La plaquette elle-même n'était pas dans `reference/` : la comparaison n'a donc été faite que sur le logo. Si Léane achète une licence web de Sunborn Sans One, il suffit de changer la police dans `astro.config.mjs`. |
| 6 | Logo | `reference/logo-hd.png` fait 1 350 × 1 080 px, mais le rond recadré ne fait que **552 × 552 px**. Il n'est jamais affiché plus grand que 276 px de large (écrans ×2) ni agrandi. Un fichier SVG permettrait de le montrer plus grand. |
| 7 | Mention de la carte | « IGN (Admin Express), via geo.api.gouv.fr, Licence Ouverte 2.0 », fond récupéré le 3 octobre 2026. À relire. |
| 8 | Contenus de la plaquette non repris | Étiquette NE PAS UTILISER : « + de 2 000 personnes dans notre communauté locale », ambition « guide local de référence et média influent », section « Nos résultats en 3 semaines ». Étiquette ADAPTER (cibles) : non reprise, pour éviter une affirmation non vérifiée. |
