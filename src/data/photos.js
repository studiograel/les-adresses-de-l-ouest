// Photos et vidéos du site. LISTE VIDE : aucune photo n'est utilisée pour l'instant (droits non confirmés).
// Tant que cette liste est vide (ou qu'aucune entrée n'a autorisation: true), le site s'affiche
// en version typographique et AUCUN cadre vide n'apparaît.
//
// Procédure pas à pas : docs/AJOUTER-DES-PHOTOS.md
//
// Modèle d'une entrée :
//
//   {
//     fichier: 'boulangerie-vitrine.jpg',   // dans src/assets/photos/
//     alt: 'Vitrine de la boulangerie, pains alignés sur une planche en bois',  // obligatoire, descriptif
//     legende: 'Facultatif : texte sous la photo',
//     credit: 'Photo : Nom Prénom',
//     emplacement: 'concept',               // 'hero' | 'concept' | 'offre' | 'galerie'
//     autorisation: true,                   // true SEULEMENT si les droits ET l'accord écrit des personnes visibles sont confirmés
//     lienPublication: 'https://…',         // facultatif, pour une vidéo : aperçu + lien vers la publication
//   }
//
// Emplacements : une photo pour 'hero', une pour 'concept', une pour 'offre', et 6 à 8 au maximum pour 'galerie'.

export const photos = [];
