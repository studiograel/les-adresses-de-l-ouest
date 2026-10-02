// Fonctions de mise en forme. Elles servent à écrire les dates, nombres et prix À PARTIR des données
// de src/data/ : aucun chiffre n'est écrit en dur dans les pages.

const ESPACE_INSECABLE = '\u00a0';

/** '2026-10-02' -> '2 octobre 2026' (espaces insécables : la date ne se coupe jamais en fin de ligne) */
export function dateLongue(iso) {
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
    .format(new Date(`${iso}T12:00:00Z`))
    .replace(/ /g, ESPACE_INSECABLE);
}

/** 1695 -> '1 695' (espace insécable : le nombre ne se coupe jamais en fin de ligne) */
export function nombre(n) {
  return new Intl.NumberFormat('fr-FR').format(n).replace(/[\u202f\u00a0]/g, ESPACE_INSECABLE);
}

/** 180 -> '180 €' */
export function euros(n) {
  return `${nombre(n)}${ESPACE_INSECABLE}€`;
}

/**
 * Typographie française : espace insécable avant « : ; ! ? % € » » et après « « ».
 * Évite qu'un deux-points ou un point d'interrogation se retrouve seul au début d'une ligne.
 * Ne touche que le texte des pages (jamais les balises, ni le contenu des scripts).
 */
export function typographieFrancaise(html) {
  let protege = false;
  return html
    .split(/(<[^>]*>)/)
    .map((morceau) => {
      if (morceau.startsWith('<')) {
        const balise = /^<(\/?)(script|style|pre|code|textarea)\b/i.exec(morceau);
        if (balise) protege = !balise[1];
        return morceau;
      }
      if (protege) return morceau;
      return morceau.replace(/ ([:;!?»%€])/g, `${ESPACE_INSECABLE}$1`).replace(/(«) /g, `$1${ESPACE_INSECABLE}`);
    })
    .join('');
}

/** Date du jour à Paris, au format AAAA-MM-JJ (comparable avec une date de fin d'offre). */
export function aujourdhuiParis(maintenant = new Date()) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Paris' }).format(maintenant);
}

/** L'offre est valable jusqu'à la fin du dernier jour (heure de Paris), ce jour inclus. */
export function offreEnCours(finISO, maintenant = new Date()) {
  return aujourdhuiParis(maintenant) <= finISO;
}
