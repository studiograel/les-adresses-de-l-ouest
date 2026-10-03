// Lieux où une vidéo a été tournée : une entrée par pin sur la carte.
//
// AUCUN LIEU REÇU POUR L'INSTANT : la liste est vide, la carte s'affiche sans pin.
// [À CONFIRMER : liste des lieux de tournage à recevoir de Léane]
//
// Modèle d'une entrée (à copier dans la liste ci-dessous) :
//
//   {
//     nom: 'Nom du lieu',
//     commune: 'Craponne',
//     lien: 'https://…',          // facultatif : publication Instagram ou site du commerçant
//     x: 42.5,                    // position du pin sur l'image de la carte, en % de sa LARGEUR (0 = bord gauche)
//     y: 61.0,                    // position du pin sur l'image de la carte, en % de sa HAUTEUR (0 = bord haut)
//     accordAffichage: true,      // true seulement si le commerçant a accepté d'être cité sur le site
//   }
//
// COMMENT TROUVER x ET y : ne jamais les deviner. La carte (reference/carte-lieux.png) ne porte aucun nom de commune
// ni aucun repère : on ne peut donc pas calculer la position à partir d'une adresse. On pose chaque pin À LA MAIN,
// avec Matteo, commune par commune : on ouvre le site, on repère l'endroit sur le plan, on note x et y, et on le dit ici.
// Les pourcentages sont ceux de l'image RECADRÉE (src/assets/carte-lieux.webp, 1062 x 907 px, voir scripts/preparer-carte.mjs).
//
// Un lieu avec accordAffichage: false n'est jamais affiché. Un lieu accepté mais sans x ni y apparaît dans la liste
// en texte avec [À CONFIRMER : position de …], sans pin.
// Voir docs/A-VALIDER.md pour la liste des accords à obtenir.

export const lieux = [];
