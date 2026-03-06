const fs = require('fs');
const { countries, useCases } = require('./seoData.js');

let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://temporaryemails.netlify.app/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
`;

countries.forEach(c => {
    useCases.forEach(u => {
        sitemap += `  <url>
    <loc>https://temporaryemails.netlify.app/topic/temp-mail-${c.slug}${u.suffix}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>\n`;
    });
});

sitemap += `</urlset>`;

fs.writeFileSync('public/sitemap.xml', sitemap);
console.log('Sitemap generated successfully.');
