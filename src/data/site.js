// Informations générales du site. Source : reference/texte-plaquette-corrige.md (section 9).
// Aucune clé secrète ici : uniquement des informations publiques.

export const site = {
  nom: "Les Adresses de l'Ouest",
  signature: "On vous emmène découvrir l'Ouest lyonnais",
  concept:
    "On teste, on rencontre, on raconte et on partage les adresses qui font vivre l'Ouest lyonnais.",

  // [À CONFIRMER : adresse définitive du site]
  // Valeur provisoire : sert aux balises canoniques, au plan du site, à robots.txt et à l'image de partage.
  // À remplacer par le vrai domaine avant la mise en ligne (une seule ligne à changer).
  url: 'https://demo-adresses-ouest.pages.dev',

  // Couleur de la barre du navigateur sur téléphone (balise meta) : le bleu marine du logo, voir src/styles/tokens.css
  couleurBarre: '#162996',

  email: 'lesadressesdelouest@gmail.com',
  telephone: { affiche: '07 86 53 95 46', lien: '+33786539546' },

  reseaux: {
    instagram: 'https://www.instagram.com/lesadressesdelouest/',
    facebook: 'https://www.facebook.com/people/Les-Adresses-de-lOuest/61593766175536/',
  },

  // Lien décodé du code QR de la plaquette. [À CONFIRMER : lien du formulaire à valider par Léane]
  formulaire:
    'https://docs.google.com/forms/d/e/1FAIpQLScDcuUWWADQvoicaulBSWMPOJlJaUFxYHGbK4zEq1o9gMtq4w/viewform',
  boutonFormulaire: 'Parlez-nous de votre projet',
  questionFormulaire: 'Quel accompagnement correspond à votre entreprise ?',
  dureeFormulaire: 'environ 10 minutes',

  conception: { nom: 'Studio Grael', url: 'https://studiograel.fr' },

  // Communes citées dans le texte de la plaquette (section 1).
  communes: ['Craponne', 'Francheville', 'Tassin', 'Brindas'],
};
