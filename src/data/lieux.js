// Lieux où une vidéo a été tournée : une entrée par pin sur la carte.
//
// AUCUN LIEU REÇU POUR L'INSTANT : la liste est vide, la carte s'affiche sans pin.
// [À CONFIRMER : carte et liste des lieux à recevoir de Léane]
//
// Modèle d'une entrée (à copier dans la liste ci-dessous) :
//
//   {
//     nom: 'Nom du lieu',
//     commune: 'Craponne',
//     latitude: 45.0000,          // obtenue UNE fois avec la Base Adresse Nationale, jamais devinée
//     longitude: 4.0000,
//     lien: 'https://…',          // facultatif : publication Instagram ou site du commerçant
//     accordAffichage: true,      // true seulement si le commerçant a accepté d'être cité sur le site
//   }
//
// Un lieu avec accordAffichage: false (ou sans coordonnées) n'est jamais affiché.
// Voir docs/A-VALIDER.md pour la liste des accords à obtenir.

export const lieux = [];
