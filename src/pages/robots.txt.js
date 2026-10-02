// robots.txt : tout le site peut être exploré ; l'adresse du plan du site suit le domaine défini dans src/data/site.js.
export function GET({ site }) {
  const corps = `User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap.xml', site).href}\n`;
  return new Response(corps, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
