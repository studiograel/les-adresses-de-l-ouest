# Product

<!-- impeccable:product-schema 1 -->

> Fiche écrite à partir du cahier des charges de Matteo (Studio Grael) du 3 octobre 2026 et de `reference/texte-plaquette-corrige.md`.
> Les faits ci-dessous sont ceux du cahier des charges ; aucun n'a été ajouté. Les entretiens de cadrage n'ont pas été refaits : le cahier des charges tenait lieu de réponse.

## Platform

web

## Users

- **Clients** : commerçants, restaurateurs, entrepreneurs locaux de l'Ouest lyonnais (clientèle exclusivement professionnelle). Ils découvrent le média, veulent savoir ce qu'on leur propose, ce que ça coûte et comment ça se passe, puis décident d'écrire.
- **Équipe** : Léane (community manager indépendante) et Louison (vidéaste et commercial) ; Matteo (Studio Grael) assure la conception et les mises à jour.

## Product Purpose

Site vitrine de « Les Adresses de l'Ouest », projet de communication locale (compte Instagram et page Facebook) qui met en lumière les commerces et petites entreprises de l'Ouest lyonnais en vidéo. Le site présente le concept, l'offre vidéo de lancement, le processus, des chiffres datés, la carte des lieux de tournage et un accompagnement complémentaire. Réussite : un professionnel local comprend l'offre et clique sur « Parlez-nous de votre projet ».

## Positioning

Un média 100 % dédié à l'Ouest lyonnais (Craponne, Francheville, Tassin, Brindas et au-delà), porté par un duo : stratégie et visuels d'un côté, vidéo et terrain de l'autre. Signature : « On vous emmène découvrir l'Ouest lyonnais. »

## Operating Context

Site statique Astro hébergé chez Cloudflare. Un seul appel à l'action : le bouton « Parlez-nous de votre projet », qui ouvre un Google Forms dans un nouvel onglet. Mises à jour à la main par Matteo (offre au 1er novembre 2026, chiffres chaque mois). Livraison le 16 octobre 2026.

## Capabilities and Constraints

- Aucun chiffre, prix, délai, avis, client, partenaire ou garantie inventé : tout ce qui manque s'écrit `[À CONFIRMER : quoi]`, visible dans la page et listé dans `docs/A-VALIDER.md`.
- Toutes les données chiffrées vivent dans `src/data/`.
- Aucun cookie, aucune mesure d'audience, aucune ressource tierce, polices auto-hébergées, aucune dépendance installée sans accord.
- Offre de lancement 180 € jusqu'au 31 octobre 2026 (fuseau Europe/Paris), puis « Tarif sur demande ».
- Chiffres du compte toujours datés ; ne jamais additionner les abonnés des deux réseaux, écrire « vues » et jamais « personnes touchées ».
- Pas de newsletter, pas de formulaire intégré, pas d'iframe.
- Décisions ouvertes : adresse définitive du site, durées de conservation des données, adresse professionnelle, liste et accords des lieux de tournage.

## Brand Commitments

Logo : rond crème au liseré orange, texte en bleu marine, silhouettes d'immeubles lyonnais en orange (ne pas redessiner). Couleurs relevées sur le fichier du logo. Polices de la plaquette : Sunborn Sans One (titres, licence web non confirmée, remplacée par une police libre proche) et Playfair Display. Univers voulu : journal / magazine local.

## Evidence on Hand

- Texte source : `reference/texte-plaquette-corrige.md` (fait foi).
- Logo : `reference/logo-hd.png` (rond utile de 552 × 552 px).
- Chiffres communiqués par l'équipe au 2 octobre 2026 (694 et 1 695 abonnés, 220 000 et 235 000 vues en un mois).
- **Absences à ne pas combler** : aucune photo libre de droits, aucune liste de lieux (`lieux.md`), aucun témoignage, aucun nom de client.
- `reference/carte-lieux.png` : plan de rues stylisé dont l'origine et les droits ne sont pas confirmés ; non utilisé.

## Product Principles

1. Dire vrai : ne publier que ce qui est confirmé, et rendre visible ce qui manque.
2. Un seul geste attendu du visiteur : écrire à l'équipe.
3. Local d'abord : le territoire (communes, carte) est le fil conducteur.
4. Respecter les personnes : pas de photo sans droits, pas de commerçant cité sans accord, pas de traceur.

## Accessibility & Inclusion

Mobile d'abord (375 px, puis 768 et 1440 px). Contraste 4,5:1 sur le texte et 3:1 sur les éléments d'interface, zones tactiles de 44 px, navigation complète au clavier, mouvement réduit respecté. Une seule page `<h1>` par page.
