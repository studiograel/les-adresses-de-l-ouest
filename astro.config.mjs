// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import { site } from './src/data/site.js';

// https://astro.build/config
export default defineConfig({
  // Adresse du site : une seule ligne à changer, dans src/data/site.js.
  site: site.url,

  // Le CSS est petit : on l'écrit directement dans la page, ce qui évite une requête de plus au chargement.
  build: { inlineStylesheets: 'always' },

  // Polices hébergées par nous (fichiers woff2 dans src/assets/fonts, sous-ensemble latin).
  // Rien n'est chargé depuis Google : aucune donnée du visiteur n'est transmise à un tiers.
  fonts: [
    {
      // Titres, chapeaux et chiffres : Playfair Display, la police serif de la plaquette (police variable 400 à 900).
      provider: fontProviders.local(),
      name: 'Playfair Display',
      cssVariable: '--police-titre',
      weights: ['400 900'],
      styles: ['normal', 'italic'],
      display: 'swap',
      fallbacks: ['Georgia', 'Times New Roman', 'serif'],
      options: {
        variants: [
          { src: ['./src/assets/fonts/PlayfairDisplay-latin-wght.woff2'], weight: '400 900', style: 'normal' },
          { src: ['./src/assets/fonts/PlayfairDisplay-Italic-latin-wght.woff2'], weight: '400 900', style: 'italic' },
        ],
      },
    },
    {
      // Texte courant, petites capitales et menus : Libre Franklin, une sans empattement de presse très lisible.
      provider: fontProviders.local(),
      name: 'Libre Franklin',
      cssVariable: '--police-texte',
      weights: ['400 800'],
      styles: ['normal'],
      display: 'swap',
      fallbacks: ['Arial', 'Helvetica', 'sans-serif'],
      options: {
        variants: [{ src: ['./src/assets/fonts/LibreFranklin-latin-wght.woff2'], weight: '400 800', style: 'normal' }],
      },
    },
  ],
});
