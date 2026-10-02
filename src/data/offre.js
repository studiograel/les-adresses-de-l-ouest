// Offre vidéo de lancement. Source : texte-plaquette-corrige.md, section 3.
// Prix confirmé par téléphone le 02/10/2026 (la plaquette indique encore 150 €, périmé).
// RAPPEL : mettre à jour ce fichier le 1er novembre 2026.

export const offre = {
  titre: 'Notre offre pour démarrer',
  accroche:
    'Une vidéo authentique pour présenter votre activité et développer votre visibilité locale.',

  // Chiffres de l'offre : ne jamais les écrire en dur dans les pages.
  inclus: [
    { valeur: '1 h 30', texte: 'de shooting vidéo' },
    { valeur: 'Environ 1 minute', texte: 'de vidéo authentique et dynamique' },
  ],
  note: 'Le contenu est pensé pour mettre en valeur votre personnalité, votre activité et ce qui vous différencie.',

  prix: 180, // en euros
  libellePrix: 'pour la prestation complète',
  libelleOffre: 'Offre de lancement',
  // Dernier jour de l'offre (inclus), fuseau Europe/Paris, fin de journée.
  finOffre: '2026-10-31',
  tva: 'TVA non applicable, art. 293 B du CGI',

  // Affiché à la place du prix une fois la date dépassée.
  apresOffre: 'Tarif sur demande',
};
