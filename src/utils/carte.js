// Calculs de la carte, faits à la construction du site (rien n'est calculé chez le visiteur).

/**
 * Regroupe les pins trop proches pour que leurs zones tactiles ne se chevauchent pas.
 * `points` : des lieux avec x et y en POURCENTAGES de l'image de la carte.
 * `largeur` et `hauteur` : taille de la carte en pixels sur un petit téléphone (sert à mesurer les distances).
 * `seuil` : distance minimale entre deux pins, en pixels (44 px = une zone tactile).
 * Deux pins plus proches que le seuil deviennent un seul pin (une fiche listant tous les lieux).
 */
export function regrouper(points, seuil, largeur, hauteur) {
  const distance = (a, b) => Math.hypot(((a.x - b.x) * largeur) / 100, ((a.y - b.y) * hauteur) / 100);
  let groupes = points.map((p) => ({ x: p.x, y: p.y, lieux: [p] }));
  let fusion = true;
  while (fusion) {
    fusion = false;
    chercher: for (let i = 0; i < groupes.length; i++) {
      for (let j = i + 1; j < groupes.length; j++) {
        if (distance(groupes[i], groupes[j]) < seuil) {
          const lieux = [...groupes[i].lieux, ...groupes[j].lieux];
          const x = lieux.reduce((s, l) => s + l.x, 0) / lieux.length;
          const y = lieux.reduce((s, l) => s + l.y, 0) / lieux.length;
          groupes = groupes.filter((_, n) => n !== i && n !== j);
          groupes.push({ x, y, lieux });
          fusion = true;
          break chercher;
        }
      }
    }
  }
  return groupes;
}
