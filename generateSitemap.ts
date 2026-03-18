import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const seoPagesPath = path.join(__dirname, 'data', 'seoPages.ts');
let content = fs.readFileSync(seoPagesPath, 'utf8');
const slugs: string[] = [];
const regex = /slug:\s*'([^']+)'/g;
let match;
while ((match = regex.exec(content)) !== null) {
    slugs.push(match[1]);
}

let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://temporaryemails.pages.dev/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://temporaryemails.pages.dev/blog</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;

slugs.forEach(slug => {
    sitemap += `  <url>
    <loc>https://temporaryemails.pages.dev/topic/${slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>\n`;
});

sitemap += `</urlset>`;

fs.writeFileSync(path.join(__dirname, 'public', 'sitemap.xml'), sitemap);
