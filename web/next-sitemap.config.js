/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://elecciones2026.lat',
  // false: conserva public/robots.txt (reglas por bot, crawl-delay) tal cual
  // fue escrito a mano; con true, next-sitemap lo pisa por una version generica.
  generateRobotsTxt: false,
  outDir: 'out',
  // /quiz canonicaliza al home (ver src/app/quiz/page.tsx): no tiene sentido
  // gastarle crawl budget a una URL que le dice a Google "el contenido real esta en otro lado".
  exclude: ['/quiz'],
  transform: async (config, path) => {
    let priority = 0.7;
    let changefreq = 'weekly';

    if (path === '/') {
      priority = 1.0;
      changefreq = 'daily';
    } else if (path === '/resultados') {
      priority = 0.9;
      changefreq = 'weekly';
    } else if (path === '/candidatos') {
      priority = 0.9;
      changefreq = 'daily';
    } else if (path.startsWith('/candidatos/')) {
      priority = 0.8;
      changefreq = 'weekly';
    } else if (path === '/privacidad' || path === '/terminos') {
      priority = 0.3;
      changefreq = 'yearly';
    }

    return {
      loc: path,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      changefreq,
      priority,
    };
  },
}
