// Script ponctuel, HORS du site : fabrique le fond de carte (src/data/fond-carte.js).
// Le site, lui, n'appelle AUCUNE API ni aucun service de carte : il lit seulement le fichier produit ici.
//
// Lancer à la main : node scripts/construire-fond-carte.mjs
//
// Données : contours des communes du Rhône, API Découpage administratif (geo.api.gouv.fr),
// issus de l'IGN (Admin Express), Licence Ouverte 2.0. Aucune clé, aucun compte.
//
// Ce que fait le script :
//   1. télécharge les contours des communes du Rhône ;
//   2. garde les communes de la zone (celles du texte de la plaquette + leurs voisines) ;
//   3. les projette à plat (échelle locale, suffisante à cette taille) et simplifie les tracés (quelques ko) ;
//   4. écrit src/data/fond-carte.js, avec les paramètres de projection pour placer les pins (latitude, longitude).
import { writeFile } from 'node:fs/promises';

const API =
  'https://geo.api.gouv.fr/communes?codeDepartement=69&fields=nom,code,centre,contour&format=json&geometry=contour';

// Communes « principales » : celles du texte de la plaquette (Craponne, Francheville, Tassin, Brindas) et Sainte-Foy-lès-Lyon.
// Elles définissent le cadre de la carte ; leurs voisines sont dessinées autour.
const PRINCIPALES = ['69069', '69089', '69244', '69028', '69202'];
const MARGE_DEGRES = { lat: 0.018, lon: 0.026 }; // marge autour des communes principales
const LARGEUR = 1000; // unités du dessin (le SVG s'adapte ensuite à l'écran)
const TOLERANCE = { principale: 1.5, voisine: 2.6 }; // simplification des tracés, en unités du dessin
const SANS_NOM = ['69142']; // communes voisines dont le nom gênerait la lecture (La Mulatière)

const reponse = await fetch(API);
if (!reponse.ok) throw new Error(`API : erreur ${reponse.status}`);
const communes = await reponse.json();

// Anneaux de chaque commune (un polygone ou plusieurs)
const anneaux = (c) => (c.contour.type === 'Polygon' ? c.contour.coordinates : c.contour.coordinates.flat());
const tousPoints = (c) => anneaux(c).flat();

// 1. Cadre : boîte autour des communes principales
const principales = communes.filter((c) => PRINCIPALES.includes(c.code));
if (principales.length !== PRINCIPALES.length) throw new Error('Une commune principale est introuvable.');
const pts = principales.flatMap(tousPoints);
const lonMin = Math.min(...pts.map((p) => p[0])) - MARGE_DEGRES.lon;
const lonMax = Math.max(...pts.map((p) => p[0])) + MARGE_DEGRES.lon;
const latMin = Math.min(...pts.map((p) => p[1])) - MARGE_DEGRES.lat;
const latMax = Math.max(...pts.map((p) => p[1])) + MARGE_DEGRES.lat;

// 2. Projection à plat : x suit la longitude (corrigée par le cosinus de la latitude), y suit la latitude
const latRef = (latMin + latMax) / 2;
const cosLat = Math.cos((latRef * Math.PI) / 180);
const k = LARGEUR / ((lonMax - lonMin) * cosLat); // unités par degré de latitude
const hauteur = Math.round((latMax - latMin) * k);
const projeter = ([lon, lat]) => [(lon - lonMin) * cosLat * k, (latMax - lat) * k];

// 3. Simplification des tracés (Douglas-Peucker)
function simplifier(points, tol) {
  if (points.length < 3) return points;
  const [ax, ay] = points[0];
  const [bx, by] = points[points.length - 1];
  const dx = bx - ax;
  const dy = by - ay;
  const norme = Math.hypot(dx, dy) || 1;
  let pire = 0;
  let indice = 0;
  for (let i = 1; i < points.length - 1; i++) {
    const d = Math.abs(dy * (points[i][0] - ax) - dx * (points[i][1] - ay)) / norme;
    if (d > pire) {
      pire = d;
      indice = i;
    }
  }
  if (pire <= tol) return [points[0], points[points.length - 1]];
  return [...simplifier(points.slice(0, indice + 1), tol).slice(0, -1), ...simplifier(points.slice(indice), tol)];
}

// Un contour est une boucle fermée (départ = arrivée) : on la coupe d'abord au point le plus éloigné du départ.
function simplifierBoucle(points, tol) {
  const [x0, y0] = points[0];
  let loin = 0;
  let indice = 1;
  points.forEach(([x, y], i) => {
    const d = Math.hypot(x - x0, y - y0);
    if (d > loin) {
      loin = d;
      indice = i;
    }
  });
  const premiere = simplifier(points.slice(0, indice + 1), tol);
  const seconde = simplifier(points.slice(indice), tol);
  return [...premiere.slice(0, -1), ...seconde];
}

// Centre d'un contour (centre de gravité de sa surface) : sert à poser le nom de la commune
function centre(anneau) {
  let aire = 0;
  let cx = 0;
  let cy = 0;
  for (let i = 0; i < anneau.length - 1; i++) {
    const [x1, y1] = anneau[i];
    const [x2, y2] = anneau[i + 1];
    const f = x1 * y2 - x2 * y1;
    aire += f;
    cx += (x1 + x2) * f;
    cy += (y1 + y2) * f;
  }
  aire /= 2;
  return { aire: Math.abs(aire), x: cx / (6 * aire), y: cy / (6 * aire) };
}

const arrondi = (n) => Math.round(n);
const dansCadre = ([x, y]) => x > -60 && x < LARGEUR + 60 && y > -60 && y < hauteur + 60;

const principalesSortie = [];
const voisinesTracés = [];
const etiquettesVoisines = [];

for (const c of communes) {
  const estPrincipale = PRINCIPALES.includes(c.code);
  const tol = estPrincipale ? TOLERANCE.principale : TOLERANCE.voisine;
  const tracés = [];
  let plusGrand = null;
  for (const anneau of anneaux(c)) {
    const proj = anneau.map(projeter);
    if (!proj.some(dansCadre)) continue; // cette commune (ou cette partie) est hors du cadre
    const simple = simplifierBoucle(proj, tol);
    if (simple.length < 4) continue;
    tracés.push('M' + simple.map(([x, y]) => `${arrondi(x)} ${arrondi(y)}`).join('L') + 'Z');
    const ctr = centre(proj);
    if (!plusGrand || ctr.aire > plusGrand.aire) plusGrand = ctr;
  }
  if (tracés.length === 0) continue;

  if (estPrincipale) {
    principalesSortie.push({
      code: c.code,
      nom: c.nom,
      d: tracés.join(''),
      x: arrondi(plusGrand.x),
      y: arrondi(plusGrand.y),
    });
  } else {
    voisinesTracés.push(...tracés);
    // On n'écrit le nom d'une voisine que si son centre est bien dans le cadre (sinon il serait coupé)
    if (!SANS_NOM.includes(c.code) && plusGrand.x > 50 && plusGrand.x < LARGEUR - 50 && plusGrand.y > 30 && plusGrand.y < hauteur - 30) {
      etiquettesVoisines.push({ nom: c.nom, x: arrondi(plusGrand.x), y: arrondi(plusGrand.y) });
    }
  }
}

const date = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Paris' }).format(new Date());
const sortie = {
  source: 'IGN (Admin Express), via geo.api.gouv.fr, Licence Ouverte 2.0',
  recupereLe: date,
  largeur: LARGEUR,
  hauteur,
  // Pour placer un point (latitude, longitude) : x = (lon - lonMin) * cosLat * k ; y = (latMax - lat) * k
  projection: { lonMin, latMax, cosLat, k },
  voisines: voisinesTracés.join(''),
  etiquettesVoisines,
  principales: principalesSortie,
};

const contenu = `// FICHIER PRODUIT PAR scripts/construire-fond-carte.mjs : ne pas modifier à la main.
// Fond de carte de l'Ouest lyonnais : contours simplifiés des communes.
// Source : IGN (Admin Express), via l'API Découpage administratif (geo.api.gouv.fr), Licence Ouverte 2.0.
// Récupéré le ${date}.

export const fondCarte = ${JSON.stringify(sortie, null, 1)};
`;
await writeFile('src/data/fond-carte.js', contenu);

const octets = Buffer.byteLength(contenu);
console.log(`fond-carte.js : ${principalesSortie.length} communes principales, ${etiquettesVoisines.length} noms de voisines, ${(octets / 1024).toFixed(1)} Ko, cadre ${LARGEUR} x ${hauteur}`);
console.log('principales :', principalesSortie.map((c) => c.nom).join(', '));
console.log('voisines nommées :', etiquettesVoisines.map((c) => c.nom).join(', '));
