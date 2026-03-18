import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const keywords = [
  "are temp email safe",
  "is temp email legit",
  "is temporary email",
  "temporary email address",
  "how does temp email work",
  "is it safe to use temp mail",
  "are temporary emails safe",
  "are temporary emails legal",
  "can temp email be tracked",
  "can i use temporary email for instagram",
  "can i use temporary email for chatgpt",
  "can temporary email be traced",
  "can i access a temp email",
  "can i recover a temp email",
  "can i create a temporary email account",
  "can i get a temporary email address",
  "can i make a temporary email",
  "can i create a temporary email account in gmail",
  "can i use a temporary email for discord",
  "does temp email work",
  "do temp emails get deleted",
  "do temp email have password",
  "can you use temp email for twitter",
  "can you recover a temp email",
  "can you use a temp email for discord",
  "can you use a temp email for reddit",
  "how to get temp email",
  "can temp mail be tracked",
  "can temp files be deleted",
  "how do temporary email generator work",
  "how do temporary email addresses work",
  "how to temp email",
  "how do disposable emails work",
  "how long do temp email last",
  "how to create temp email",
  "how to use temp email",
  "how to recover temp email",
  "how to get temp email back",
  "how to access temp email",
  "how to access temp email again",
  "how to check temp email",
  "how to generate temp email",
  "send email from temp",
  "should temporary files be deleted",
  "should tempeh be cooked",
  "should i delete temp files in windows 10",
  "should you put temp jobs on resume",
  "how temp email works",
  "what temp emails work for discord",
  "how create temporary email",
  "how to create temp email id",
  "how to send temp email",
  "how to login temp email",
  "how to create temp email address",
  "how to get temp email address",
  "what's disposable email address",
  "what is temp email",
  "what is temporary email",
  "what is temporary email address",
  "how do i find my temp mail",
  "does temp mail work",
  "what temp emergency room",
  "what temp er",
  "what temp for emergency heat",
  "where are email templates stored",
  "where are email templates saved",
  "where are email templates in salesforce",
  "where are email templates stored in outlook",
  "temp email where you can send",
  "how do i access my temp mail",
  "send temp email",
  "where is email template used salesforce",
  "temp.email address",
  "which temp email is best",
  "what is a temp email",
  "temp email with name",
  "which temp is a fever",
  "which temp is most accurate",
  "which temp files are safe to delete",
  "which temp is more accurate",
  "which temp mail is the best",
  "temp email creator",
  "temp company email",
  "who to email",
  "who is the email",
  "best temp mail for usa",
  "uk disposable email address",
  "australian temp email",
  "canadian temp mail service",
];

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
