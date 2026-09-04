/**
 * Gera o sitemap.xml deste projeto (site principal + blog).
 * Fonte dos artigos: data/blog.json (índice dos posts publicados).
 * Rodar: node generate-sitemap.mjs
 *
 * Obs.: o sitemap é mantido AQUI (não pelo projeto do blog).
 */
import { readFileSync, writeFileSync } from 'fs';

const BASE = 'https://agenciademarketingdigital.com.br';
const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

// Páginas fixas do site (premium é noindex e fica fora; share é utilitário)
const pages = [
  { path: '/',                    priority: '1.0', changefreq: 'monthly', lastmod: today },
  { path: '/ferramentas.html',    priority: '0.8', changefreq: 'monthly', lastmod: today },
  { path: '/calculadora',         priority: '0.7', changefreq: 'monthly', lastmod: today },
  { path: '/gerador-plano-midia', priority: '0.7', changefreq: 'monthly', lastmod: today },
  { path: '/blog',                priority: '0.8', changefreq: 'weekly',  lastmod: today },
];

// Artigos publicados (do índice do blog)
const posts = JSON.parse(readFileSync('data/blog.json', 'utf8'));
const postEntries = posts.map(p => ({
  path: p.url,
  priority: '0.7',
  changefreq: 'monthly',
  lastmod: (p.updated_at || p.published_at || today).slice(0, 10),
}));

const all = [...pages, ...postEntries];

const xml =
`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${all.map(u => `  <url>
    <loc>${BASE}${u.path === '/' ? '/' : u.path}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;

writeFileSync('sitemap.xml', xml);
console.log(`sitemap.xml gerado com ${all.length} URLs (${pages.length} páginas + ${postEntries.length} artigos).`);
