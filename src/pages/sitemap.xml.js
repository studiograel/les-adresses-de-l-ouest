// Plan du site (sitemap.xml) : une ligne par page, déduite des fichiers de src/pages (rien à tenir à jour à la main).
const pages = import.meta.glob('./*.astro');

export function GET({ site }) {
  const chemins = Object.keys(pages)
    .map((fichier) => fichier.replace('./', '').replace('.astro', ''))
    .map((nom) => (nom === 'index' ? '/' : `/${nom}/`))
    .sort();

  const lignes = chemins.map((chemin) => `  <url><loc>${new URL(chemin, site).href}</loc></url>`).join('\n');
  const corps = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${lignes}\n</urlset>\n`;
  return new Response(corps, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
