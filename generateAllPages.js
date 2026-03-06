const fs = require('fs');
const { countries, useCases } = require('./seoData.js');

const template = fs.readFileSync('template.html', 'utf8');

// Generate all URLs for hreflang
const allUrls = [];
countries.forEach(c => {
    useCases.forEach(u => {
        allUrls.push({
            lang: c.lang,
            url: `https://temporaryemails.netlify.app/topic/temp-mail-${c.slug}${u.suffix}`,
            slug: `temp-mail-${c.slug}${u.suffix}`
        });
    });
});

// Generate hreflang tags for a given use case (all countries)
const getHreflangTags = (currentSlug) => {
    // This is a simplification: linking all pages together might be too much.
    // Let's link pages with the same use case suffix.
    const suffix = currentSlug.substring(currentSlug.indexOf('-for-') !== -1 ? currentSlug.indexOf('-for-') : currentSlug.length);
    const relatedPages = allUrls.filter(u => u.slug.endsWith(suffix));
    
    return relatedPages.map(u => `    <link rel="alternate" hreflang="${u.lang}" href="${u.url}" />`).join('\n');
};

countries.forEach(c => {
    useCases.forEach(u => {
        const slug = `temp-mail-${c.slug}${u.suffix}`;
        const url = `https://temporaryemails.netlify.app/topic/${slug}`;
        
        let content = template
            .replace('{{TITLE}}', `Temp Mail ${c.name} ${u.suffix.replace(/-/g, ' ')}`)
            .replace('{{DESCRIPTION}}', `Get a free temp mail in ${c.name}. Secure disposable email for users and services in ${c.name}.`)
            .replace('{{KEYWORDS}}', `temp mail ${c.slug}, disposable email ${c.slug}`)
            .replace('{{FILENAME}}', `topic/${slug}`)
            .replace('{{H1}}', `Temp Mail ${c.name} ${u.suffix.replace(/-/g, ' ')}`)
            .replace('{{CONTENT}}', `Welcome to our temp mail service for ${c.name}.`)
            .replace('{{FAQ}}', `<p><strong>Q: Is temp mail legal in ${c.name}?</strong> A: Yes.</p>`);

        // Inject hreflang tags
        const hreflangTags = getHreflangTags(slug);
        content = content.replace('</head>', `${hreflangTags}\n</head>`);

        if (!fs.existsSync('public/topic')) {
            fs.mkdirSync('public/topic', { recursive: true });
        }
        fs.writeFileSync(`public/topic/${slug}.html`, content);
    });
});

console.log('All pages generated successfully.');
