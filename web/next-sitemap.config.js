/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://elecciones2026.lat',
  generateRobotsTxt: true,
  outDir: 'out',
}
