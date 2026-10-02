// Script ponctuel, hors du site : prépare le logo et les icônes à partir de reference/logo-hd.png.
// Lancer à la main : node scripts/preparer-logo.mjs
// (utilise sharp, déjà présent avec Astro ; aucune dépendance ajoutée)
//
// Produit :
//   src/assets/logo.png            logo recadré (marges transparentes retirées), source pour astro:assets (WebP au build)
//   public/favicon-48.png          icône d'onglet 48 px
//   public/favicon.ico             même icône au format .ico
//   public/favicon-192.png         icône 192 px
//   public/apple-touch-icon.png    icône 180 px pour iPhone/iPad (fond crème)
import sharp from 'sharp';
import { writeFile, mkdir } from 'node:fs/promises';

const SOURCE = 'reference/logo-hd.png';
const CREME = { r: 248, g: 244, b: 236, alpha: 1 }; // #F8F4EC, couleur relevée sur le logo

await mkdir('src/assets', { recursive: true });

// 1. Recadrage : on retire les marges transparentes. Le logo n'est JAMAIS agrandi.
const recadre = await sharp(SOURCE)
  .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 }, threshold: 8 })
  .png({ compressionLevel: 9, effort: 10 })
  .toBuffer({ resolveWithObject: true });
console.log(`Logo recadré : ${recadre.info.width} x ${recadre.info.height} px`);
await writeFile('src/assets/logo.png', recadre.data);

// 2. Icônes (toujours en réduisant, jamais en agrandissant)
const reduit = (taille) =>
  sharp(recadre.data).resize(taille, taille, { kernel: 'lanczos3', fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png({ compressionLevel: 9 }).toBuffer();

const png48 = await reduit(48);
await writeFile('public/favicon-48.png', png48);
await writeFile('public/favicon-192.png', await reduit(192));

// favicon.ico = un en-tête de 22 octets + l'image PNG de 48 px
const ico = Buffer.alloc(22);
ico.writeUInt16LE(0, 0); // réservé
ico.writeUInt16LE(1, 2); // type : icône
ico.writeUInt16LE(1, 4); // une seule image
ico.writeUInt8(48, 6); // largeur
ico.writeUInt8(48, 7); // hauteur
ico.writeUInt16LE(1, 10); // plans
ico.writeUInt16LE(32, 12); // bits par pixel
ico.writeUInt32LE(png48.length, 14); // taille de l'image
ico.writeUInt32LE(22, 18); // position de l'image
await writeFile('public/favicon.ico', Buffer.concat([ico, png48]));

// Icône Apple : 180 px, fond crème (iOS n'aime pas la transparence), logo à 150 px au centre
const rond = await reduit(150);
await writeFile(
  'public/apple-touch-icon.png',
  await sharp({ create: { width: 180, height: 180, channels: 4, background: CREME } })
    .composite([{ input: rond, gravity: 'center' }])
    .png({ compressionLevel: 9 })
    .toBuffer(),
);
console.log('Icônes écrites dans public/.');
