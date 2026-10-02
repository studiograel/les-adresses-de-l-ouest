// Calculs de la carte, faits à la construction du site (rien n'est calculé chez le visiteur).

/** Place un point (latitude, longitude) sur le fond de carte : renvoie x et y dans le dessin. */
export function projeter(fond, latitude, longitude) {
  const { lonMin, latMax, cosLat, k } = fond.projection;
  return { x: (longitude - lonMin) * cosLat * k, y: (latMax - latitude) * k };
}

/**
 * Regroupe les pins trop proches pour que leurs zones tactiles ne se chevauchent pas.
 * `seuil` : distance minimale entre deux pins, en unités du dessin.
 * Deux pins plus proches que le seuil deviennent un seul pin (une fiche listant tous les lieux).
 */
export function regrouper(points, seuil) {
  let groupes = points.map((p) => ({ x: p.x, y: p.y, lieux: [p] }));
  let fusion = true;
  while (fusion) {
    fusion = false;
    chercher: for (let i = 0; i < groupes.length; i++) {
      for (let j = i + 1; j < groupes.length; j++) {
        if (Math.hypot(groupes[i].x - groupes[j].x, groupes[i].y - groupes[j].y) < seuil) {
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
