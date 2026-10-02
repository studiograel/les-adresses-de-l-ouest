// Choisit les photos à afficher pour un emplacement ('hero', 'concept', 'offre', 'galerie').
// Une photo n'est affichée QUE si : son entrée dans src/data/photos.js a autorisation: true,
// un texte alternatif (alt) non vide, et le fichier existe dans src/assets/photos/.
// Sinon elle est ignorée, et la section garde sa mise en page typographique (aucun cadre vide).
import { photos } from '../data/photos.js';

const fichiers = import.meta.glob('../assets/photos/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  import: 'default',
});

const MAX_GALERIE = 8;

function ignorer(photo, raison) {
  console.warn(`[photos] « ${photo.fichier ?? '(sans fichier)'} » ignorée : ${raison}`);
}

export function photosPour(emplacement) {
  const retenues = [];

  for (const photo of photos) {
    if (photo.emplacement !== emplacement) continue;
    if (photo.autorisation !== true) continue; // droits ou accord écrit non confirmés : jamais affichée
    if (typeof photo.alt !== 'string' || photo.alt.trim() === '') {
      ignorer(photo, 'texte alternatif (alt) manquant');
      continue;
    }
    const image = fichiers[`../assets/photos/${photo.fichier}`];
    if (!image) {
      ignorer(photo, 'fichier introuvable dans src/assets/photos/');
      continue;
    }
    retenues.push({ ...photo, image });
  }

  return emplacement === 'galerie' ? retenues.slice(0, MAX_GALERIE) : retenues.slice(0, 1);
}
