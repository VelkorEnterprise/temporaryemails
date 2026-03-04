import fs from 'fs';

let content = fs.readFileSync('data/seoPages.ts', 'utf8');
const slugs: string[] = [];
const regex = /slug:\s*'([^']+)'/g;
let match;
while ((match = regex.exec(content)) !== null) {
    slugs.push(match[1]);
}

let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://temporaryemails.netlify.app/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://temporaryemails.netlify.app/blog</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;

slugs.forEach(slug => {
    sitemap += `  <url>
    <loc>https://temporaryemails.netlify.app/topic/${slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>\n`;
});

sitemap += `</urlset>`;

fs.writeFileSync('public/sitemap.xml', sitemap);
