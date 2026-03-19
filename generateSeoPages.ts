import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { keywords } from './keywords.ts';

const seoPagesPath = path.join(__dirname, 'data', 'seoPages.ts');
let content = fs.readFileSync(seoPagesPath, 'utf8');

// Remove the closing bracket and semicolon
content = content.replace(/\];\s*$/, '');

keywords.forEach(kw => {
    const slug = kw.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    if (!content.includes(`slug: '${slug}'`)) {
        const title = kw.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        content += `    {
        slug: '${slug}',
        title: '${title} - Temporary Emails Guide',
        description: 'Learn everything about ${kw}. Read our comprehensive guide on disposable email services.',
        keywords: ['${kw}', 'temp mail', 'disposable email', 'anonymous email'],
        h1: '${title}',
        content: 'Find out the answer to ${kw}. Our temporary email service provides secure, anonymous, and fast disposable email addresses to help you protect your privacy online.'
    },\n`;
    }
});

content += "];\n";

fs.writeFileSync(seoPagesPath, content);
