import fs from 'fs';
import { keywords } from './keywords.ts';

let content = fs.readFileSync('data/seoPages.ts', 'utf8');

// Remove the closing bracket and semicolon
content = content.replace(/\];\s*$/, '');

keywords.forEach(kw => {
    const slug = kw.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    if (!content.includes(`slug: '${slug}'`)) {
        const title = kw.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        content += `    {
        slug: '${slug}',
        title: '${title} - Temp Mail Guide',
        description: 'Learn everything about ${kw}. Read our comprehensive guide on disposable email services.',
        keywords: ['${kw}', 'temp mail', 'disposable email', 'anonymous email'],
        h1: '${title}',
        content: 'Find out the answer to ${kw}. Our temporary email service provides secure, anonymous, and fast disposable email addresses to help you protect your privacy online.'
    },\n`;
    }
});

const services = ["snapchat", "telegram", "whatsapp", "pinterest", "linkedin", "github", "spotify", "netflix", "amazon", "ebay", "paypal", "stripe", "shopify", "wordpress", "wix", "squarespace", "medium", "quora", "reddit", "tumblr", "flickr", "vimeo", "twitch", "mixer", "slack", "trello", "asana", "jira", "confluence", "bitbucket", "gitlab", "docker", "kubernetes", "aws", "azure", "gcp", "heroku", "vercel", "netlify", "firebase", "supabase", "mongodb", "postgresql", "mysql", "redis", "elasticsearch", "kafka", "rabbitmq", "nginx", "apache", "tomcat", "jboss", "wildfly", "glassfish", "payara", "openliberty", "websphere", "weblogic", "oracle", "sqlserver", "db2", "informix", "sybase", "teradata", "snowflake", "redshift", "bigquery", "athena", "glue", "lambda", "fargate", "ec2", "s3", "rds", "dynamodb", "elasticache", "sqs", "sns", "ses", "route53", "cloudfront", "iam", "vpc", "cloudwatch", "cloudtrail", "config", "inspector", "shield", "waf", "kms", "acm", "cognito", "amplify", "appsync", "api-gateway", "step-functions", "sfn", "eventbridge", "zoom", "skype", "microsoft-teams", "google-meet", "webex", "bluejeans", "gotomeeting", "joinme", "appearin", "jitsi", "bigbluebutton", "mattermost", "rocket-chat", "zulip", "discord", "guilded", "steam", "epic-games", "origin", "uplay", "battlenet", "gog", "itchio", "humble-bundle", "greenmangaming", "fanatical", "instant-gaming", "cdkeys", "eneba", "kinguin", "g2a", "gamivo", "mmoga", "instant-gaming", "cdkeys", "eneba", "kinguin", "g2a", "gamivo", "mmoga", "playstation", "xbox", "nintendo", "ea", "ubisoft", "activision", "blizzard", "riot", "valve", "bethesda", "square-enix", "capcom", "konami", "sega", "bandai-namco", "ubisoft", "ea", "activision", "blizzard", "riot", "valve", "bethesda", "square-enix", "capcom", "konami", "sega", "bandai-namco", "hulu", "disneyplus", "hbomax", "peacock", "paramountplus", "apple-tv", "crunchyroll", "funimation", "roblox", "minecraft", "fortnite", "pubg", "apex-legends", "call-of-duty", "overwatch", "valorant", "counter-strike"];

services.forEach(service => {
    const slug = `temp-mail-for-${service}`;
    if (!content.includes(`slug: '${slug}'`)) {
        content += `    {
        slug: '${slug}',
        title: 'Temp Mail for ${service.charAt(0).toUpperCase() + service.slice(1)} - Anonymous Sign Up',
        description: 'Get a free temp mail for ${service}. Bypass phone number requirements and protect your privacy with our secure disposable email service.',
        keywords: ['temp mail for ${service}', 'fake email', 'disposable email', 'anonymous email'],
        h1: 'Temp Mail for ${service.charAt(0).toUpperCase() + service.slice(1)} - Anonymous Sign Up',
        content: 'Use our temp mail for ${service} to create accounts without using your personal email. Our service provides instant verification codes and keeps your identity anonymous.'
    },\n`;
    }
});

content += "];\n";

fs.writeFileSync('data/seoPages.ts', content);
