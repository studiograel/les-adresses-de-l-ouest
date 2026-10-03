// Script ponctuel, hors du site : prépare la carte des lieux de tournage à partir de reference/carte-lieux.png.
// Lancer à la main : node scripts/preparer-carte.mjs   (utilise sharp, déjà présent avec Astro)
//
// La carte appartient à Léane et Louison (droits confirmés oralement par Matteo le 03/10/2026).
// L'original reste intact dans reference/. Ce script ne fait que :
//   - retirer les marges vides (l'image d'origine est un format « Instagram » 1080 x 1350) ;
//   - NE PAS retoucher le dessin, NE PAS l'agrandir (dimensions réelles) ;
//   - écrire src/assets/carte-lieux.webp : WebP SANS PERTE (plus léger et plus net qu'un WebP avec perte pour ce dessin à deux couleurs).
//
// Toutes les positions de pins (src/data/lieux.js) sont des pourcentages DE CETTE IMAGE RECADRÉE.
import sharp from 'sharp';

const SOURCE = 'reference/carte-lieux.png';
const SORTIE = 'src/assets/carte-lieux.webp';

// Zone dessinée mesurée le 03/10/2026 : de (14, 218) à (1075, 1124) soit 1062 x 907 px.
// On vérifie qu'elle n'a pas changé (si le fichier d'origine est remplacé, il faut re-mesurer).
const zone = { left: 14, top: 218, width: 1062, height: 907 };

const meta = await sharp(SOURCE).metadata();
if (meta.width !== 1080 || meta.height !== 1350) {
  throw new Error(`La carte d'origine a changé (${meta.width} x ${meta.height}) : re-mesurer la zone dessinée.`);
}

await sharp(SOURCE).extract(zone).webp({ lossless: true, effort: 6 }).toFile(SORTIE);
const sortie = await sharp(SORTIE).metadata();
console.log(`Carte recadrée : ${sortie.width} x ${sortie.height} px -> ${SORTIE}`);
