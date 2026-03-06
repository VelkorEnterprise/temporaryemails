import React from 'react';
const { useState, useEffect, useCallback, useRef } = React;
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route, useLocation, useNavigate, Link } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { 
  RefreshCw, Copy, Trash2, Mail, Loader2, Menu, X, Globe, Shield, Lock, 
  Zap, Clock, CheckCircle, AlertTriangle, ArrowLeft, ArrowRight, ChevronRight,
  Facebook, Instagram, Twitter, MessageCircle, Gamepad2, Video, ShoppingCart,
  FileText, File, Download, UserPlus, Eye, EyeOff, Share2, Printer, Search
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// --- Icons Component ---
const Icons = {
  Refresh: RefreshCw,
  Copy: Copy,
  Trash: Trash2,
  Mail: Mail,
  Spinner: Loader2,
  Menu: Menu,
  Close: X,
  Globe: Globe,
  Shield: Shield,
  Lock: Lock,
  Zap: Zap,
  Clock: Clock,
  Check: CheckCircle,
  Alert: AlertTriangle,
  ArrowLeft: ArrowLeft,
  ArrowRight: ArrowRight,
  ChevronRight: ChevronRight,
  Facebook: Facebook,
  Instagram: Instagram,
  Twitter: Twitter,
  Discord: MessageCircle,
  Gaming: Gamepad2,
  Video: Video,
  Shopping: ShoppingCart,
  FileText: FileText,
  File: File,
  Download: Download,
  UserPlus: UserPlus,
  Eye: Eye,
  EyeOff: EyeOff,
  Share: Share2,
  Print: Printer,
  Search: Search
};

// --- Data: Keywords & SEO ---
const RAW_KEYWORDS = [
  "temp mail", "are temp mail safe", "what are temp mail", "is it safe to use temp mail", "does temp mail work",
  "how long does temp mail last", "are temp mail emails reused", "are temp emails legal", "are temp email safe",
  "are temp emails illegal", "can temp mail send emails", "can i use temp mail for facebook", "can i use temp mail for chatgpt",
  "can i use temp mail for instagram", "can you use temp mail for discord", "how can i use temp mail", "did temp",
  "does temp mail expire", "does temp mail get deleted", "does temp mail delete the email", "do temp emails get deleted",
  "how long do temp mail emails last", "how long do temp emails last", "how do temp emails work", "how do i access my temp mail",
  "how do i find my temp mail", "what does temp mail do", "how do i get my temp mail back", "does temp mail reuse email",
  "does temp mail work on discord", "does temp mail work on instagram", "does temp mail have password", "does temp mail delete emails",
  "does temp mail delete itself", "does temp mail work with chatgpt", "is temp mail safe", "what is temp mail", "is temp mail dangerous",
  "is temp mail a virus", "is temp mail trackable", "is temp mail illegal", "how many temp mail do we have", "have temp",
  "how temp mail works", "how to use temp mail", "how to recover temp mail", "how to access old temp mail", "how to create temp mail",
  "how to login temp mail", "how to get temp mail password", "how to send email from temp mail", "is temp mail legit",
  "is temp mail legal", "is temp mail org safe", "is temp mail down", "is temp mail free", "is temp mail secure", "should temp",
  "is temp mail real", "what temp maillard reaction", "what temp mail works for discord", "what is temp mail used for",
  "what is the password for temp mail", "what is temp mail app", "what is the best temp mail", "what is the best temp mail for facebook",
  "what is the meaning of temp mail", "what is the work of temp mail", "when does temp mail expire", "when temps", "when do temp",
  "when temp is a fever", "where is temp mail password", "where to login temp mail", "where is temp folder on mac",
  "where are my temp files on mac", "which temp mail is the best for facebook", "which temp mail is the best",
  "which temp mail is the strongest", "who owns temp mail org", "who made temp mail", "who to report mail tampering",
  "who to contact about mail tampering", "why temp mail is not working", "why does temp mail not work", "why temps",
  "why temp is medium rare", "how long will temp mail last", "what will be the password for temp mail", "will temp", "would temp",
  "can temp mail be tracked", "temp mail for facebook", "temp mail for discord", "temp mail for instagram", "temp mail for social media",
  "temp mail for student", "temp mail for facebook 2025", "temp mail for gmail", "temp mail for facebook android",
  "temp mail for facebook 2024", "temp mail along with password", "temp mail on desk", "temp mail on duck", "temp mail on telegram",
  "temp mail on dev", "temp mail on gmail", "temp mail on iphone", "temp mail on google", "temp mail with password",
  "temp mail with inbox", "temp mail with otp", "temp mail with gmail com", "temp mail with custom domain", "temp mail with code",
  "temp mail with recovery key", "temp mail with reply", "temp mail with attachment", "temp mail with verification code",
  "temp mail near me", "temp mail as gmail", "temp mail to send", "temp mail to plus", "temp mail from google", "temp mail to login",
  "temp mail to download", "temp mail to use", "temp mail from usa", "temp mail to send and receive", "temp mail at gmail",
  "temp mail by tmailor com", "temp mail by blink in extension", "temp mail by luxusmail", "temp mail by blink in",
  "temp mail by tmp al", "temp mail by mailrush", "temp mail by smailpro", "temp mail by smailpro apk", "temp mail by tempamail com",
  "temp mail from gmail", "temp mail ready to use", "temp mail but real", "temp mail but permanent", "temp mail but gmail",
  "temp mail but for phone numbers", "temp mail but not disposable", "temp mail but valid", "temp mail but not temp",
  "temp mail by tmailor.com", "temp mail by temp-mail.io", "temp mail by express mail", "temp mail by tempmail.fish",
  "temp mail by ghostmail", "temp mail by tmp.al", "temp mail by ghostmail.one", "temp mail by google", "temp mail come funziona",
  "temp mail run for facebook", "send mail from temp mail", "temp mail in gmail", "temp mail in box", "temp mail in india",
  "temp mail in usa", "temp mail in germany", "temp mail in canada", "temp mail in gmail format", "temp mail in the world",
  "temp mail in japan", "temp mail for tiktok", "temp mail for epic games", "temp mail for steam", "temp mail for fortnite",
  "temp mail for facebook verification", "temp mail in telegram", "temp mail in 2026", "temp mail like real", "temp mail like google",
  "temp mail like yopmail", "temp mail like website", "temp mail like email", "temp mail like yahoo", "temp mail like original",
  "temp mail like sites", "temp mail like hotmail", "temp mail to send mail", "temp mail of gmail", "temp mail of yahoo",
  "temp mail of google", "temp mail of gmail domain", "temp mail of facebook", "temp mail of hotmail", "temp mail of my choice",
  "temp mail of usa", "temp mail of gmail or yahoo", "temp mail on facebook", "temp mail on discord", "is it safe to use temp mail",
  "temp mail plus apk", "temp mail plus for facebook", "temp mail plus free", "temp mail plus apk download", "temp mail plus login",
  "temp mail plus download", "temp mail plus mod apk", "temp mail plus generate email", "temp mail plus plus", "temp mail plus app",
  "temporary mail forwarding post office", "temp mail pro apk", "temp mail pro free", "temp mail pro apk download",
  "temp mail pro mod apk", "temp mail pro download", "temp mail pro app", "temp mail pro for android", "temp mail pro mod apk download",
  "temp mail pro io", "temp mail pro - multiple email", "temp mail to send email", "temp mail to open facebook", "temp mail to gmail",
  "temp mail to send file", "temp mail to android", "temp mail to com", "temp mail to compose", "temp mail for instagram sign up",
  "temp mail essential for sign up", "temp mail for facebook sign up", "temp up email", "temp mail with gmail",
  "temp mail with valid domain", "temp mail with password for login", "temp mail without disposable", "temp mail without spam",
  "temp mail without .com", "temp mail without ads", "temp mail without domain", "temp mail without number",
  "temp mail without password", "temp mail without login", "temp mail without captcha",
  "email jetable", "correo temporal", "linshi youxiang", "sute meado", "tan-i henkan", "einweg e-mail", "einheitenrechner", 
  "email temporanea", "tijdelijke e-mail", "tillfällig e-post", "midlertidig e-post", "midlertidig e-mail", 
  "väliaikainen sähköposti", "email temporário", "prosorinó email", "tymczasowy e-mail", "dočasný e-mail", 
  "tímabundið netfang", "ideiglenes e-mail", "email temporar", "vremenno imeyl", "privremeni e-mail", 
  "začasni e-mail", "ajutine e-post", "pagaidu e-pasts", "laikinas el. paštas", "vremennaya pochta", 
  "geçici e-posta", "ilhoeyong imeil", "barid muwaqqat", "e-mel sementara", "ximel chawkraw", "email sementara"
];

// --- Data: SEO Pages (Expanded to 365+) ---
const baseSeoPages = [
    {
        slug: 'temp-mail-for-facebook',
        title: 'Temp Mail for Facebook - Verify Account Instantly',
        description: 'Get a free temp mail for facebook. Bypass phone number requirements and protect your privacy with our secure disposable email service.',
        keywords: ['temp mail for facebook', 'fake email', 'disposable email', 'anonymous email'],
        h1: 'Temp Mail for Facebook - Verify Account Instantly',
        content: 'Use our temp mail for facebook to create accounts without using your personal email. Our service provides instant verification codes and keeps your identity anonymous.'
    },
    {
        slug: 'temp-mail-for-instagram',
        title: 'Temp Mail for Instagram - Anonymous Sign Up',
        description: 'Get a free temp mail for instagram. Bypass phone number requirements and protect your privacy with our secure disposable email service.',
        keywords: ['temp mail for instagram', 'fake email', 'disposable email', 'anonymous email'],
        h1: 'Temp Mail for Instagram - Anonymous Sign Up',
        content: 'Use our temp mail for instagram to create accounts without using your personal email. Our service provides instant verification codes and keeps your identity anonymous.'
    },
];

const countries = [
  { slug: 'uk', name: 'UK', code: 'GB', lang: 'en', term: 'Temp mail' },
  { slug: 'germany', name: 'Germany', code: 'DE', lang: 'de', term: 'Einweg e-mail' },
  { slug: 'france', name: 'France', code: 'FR', lang: 'fr', term: 'Email jetable' },
  { slug: 'italy', name: 'Italy', code: 'IT', lang: 'it', term: 'Email temporanea' },
  { slug: 'spain', name: 'Spain', code: 'ES', lang: 'es', term: 'Correo temporal' },
  { slug: 'netherlands', name: 'Netherlands', code: 'NL', lang: 'nl', term: 'Tijdelijke e-mail' },
  { slug: 'switzerland', name: 'Switzerland', code: 'CH', lang: 'de', term: 'Einweg e-mail' },
  { slug: 'sweden', name: 'Sweden', code: 'SE', lang: 'sv', term: 'Tillfällig e-post' },
  { slug: 'norway', name: 'Norway', code: 'NO', lang: 'no', term: 'Midlertidig e-post' },
  { slug: 'denmark', name: 'Denmark', code: 'DK', lang: 'da', term: 'Midlertidig e-mail' },
  { slug: 'finland', name: 'Finland', code: 'FI', lang: 'fi', term: 'Väliaikainen sähköposti' },
  { slug: 'ireland', name: 'Ireland', code: 'IE', lang: 'en', term: 'Temp mail' },
  { slug: 'belgium', name: 'Belgium', code: 'BE', lang: 'nl', term: 'Tijdelijke e-mail' },
  { slug: 'austria', name: 'Austria', code: 'AT', lang: 'de', term: 'Einweg e-mail' },
  { slug: 'portugal', name: 'Portugal', code: 'PT', lang: 'pt', term: 'Email temporário' },
  { slug: 'greece', name: 'Greece', code: 'GR', lang: 'el', term: 'Prosorinó email' },
  { slug: 'poland', name: 'Poland', code: 'PL', lang: 'pl', term: 'Tymczasowy e-mail' },
  { slug: 'czech-republic', name: 'Czech Republic', code: 'CZ', lang: 'cs', term: 'Dočasný e-mail' },
  { slug: 'luxembourg', name: 'Luxembourg', code: 'LU', lang: 'fr', term: 'Email jetable' },
  { slug: 'monaco', name: 'Monaco', code: 'MC', lang: 'fr', term: 'Email jetable' },
  { slug: 'iceland', name: 'Iceland', code: 'IS', lang: 'is', term: 'Tímabundið netfang' },
  { slug: 'hungary', name: 'Hungary', code: 'HU', lang: 'hu', term: 'Ideiglenes e-mail' },
  { slug: 'slovakia', name: 'Slovakia', code: 'SK', lang: 'sk', term: 'Dočasný e-mail' },
  { slug: 'romania', name: 'Romania', code: 'RO', lang: 'ro', term: 'Email temporar' },
  { slug: 'bulgaria', name: 'Bulgaria', code: 'BG', lang: 'bg', term: 'Vremenno imeyl' },
  { slug: 'croatia', name: 'Croatia', code: 'HR', lang: 'hr', term: 'Privremeni e-mail' },
  { slug: 'slovenia', name: 'Slovenia', code: 'SI', lang: 'sl', term: 'Začasni e-mail' },
  { slug: 'estonia', name: 'Estonia', code: 'EE', lang: 'et', term: 'Ajutine e-post' },
  { slug: 'latvia', name: 'Latvia', code: 'LV', lang: 'lv', term: 'Pagaidu e-pasts' },
  { slug: 'lithuania', name: 'Lithuania', code: 'LT', lang: 'lt', term: 'Laikinas el. paštas' },
  { slug: 'bosnia', name: 'Bosnia', code: 'BA', lang: 'bs', term: 'Privremeni e-mail' },
  { slug: 'russia', name: 'Russia', code: 'RU', lang: 'ru', term: 'Vremennaya pochta' },
  { slug: 'turkey', name: 'Turkey', code: 'TR', lang: 'tr', term: 'Geçici e-posta' },
  { slug: 'usa', name: 'USA', code: 'US', lang: 'en', term: 'Temp mail' },
  { slug: 'canada', name: 'Canada', code: 'CA', lang: 'en', term: 'Temp mail' },
  { slug: 'mexico', name: 'Mexico', code: 'MX', lang: 'es', term: 'Correo temporal' },
  { slug: 'brazil', name: 'Brazil', code: 'BR', lang: 'pt', term: 'Email temporário' },
  { slug: 'argentina', name: 'Argentina', code: 'AR', lang: 'es', term: 'Correo temporal' },
  { slug: 'chile', name: 'Chile', code: 'CL', lang: 'es', term: 'Correo temporal' },
  { slug: 'colombia', name: 'Colombia', code: 'CO', lang: 'es', term: 'Correo temporal' },
  { slug: 'peru', name: 'Peru', code: 'PE', lang: 'es', term: 'Correo temporal' },
  { slug: 'uruguay', name: 'Uruguay', code: 'UY', lang: 'es', term: 'Correo temporal' },
  { slug: 'ecuador', name: 'Ecuador', code: 'EC', lang: 'es', term: 'Correo temporal' },
  { slug: 'costa-rica', name: 'Costa Rica', code: 'CR', lang: 'es', term: 'Correo temporal' },
  { slug: 'panama', name: 'Panama', code: 'PA', lang: 'es', term: 'Correo temporal' },
  { slug: 'japan', name: 'Japan', code: 'JP', lang: 'ja', term: 'Sute meado' },
  { slug: 'south-korea', name: 'South Korea', code: 'KR', lang: 'ko', term: 'Ilhoeyong imeil' },
  { slug: 'china', name: 'China', code: 'CN', lang: 'zh', term: 'Linshi youxiang' },
  { slug: 'taiwan', name: 'Taiwan', code: 'TW', lang: 'zh', term: 'Linshi youxiang' },
  { slug: 'hong-kong', name: 'Hong Kong', code: 'HK', lang: 'zh', term: 'Linshi youxiang' },
  { slug: 'singapore', name: 'Singapore', code: 'SG', lang: 'en', term: 'Temp mail' },
  { slug: 'australia', name: 'Australia', code: 'AU', lang: 'en', term: 'Temp mail' },
  { slug: 'new-zealand', name: 'New Zealand', code: 'NZ', lang: 'en', term: 'Temp mail' },
  { slug: 'uae', name: 'UAE', code: 'AE', lang: 'ar', term: 'Barid muwaqqat' },
  { slug: 'saudi-arabia', name: 'Saudi Arabia', code: 'SA', lang: 'ar', term: 'Barid muwaqqat' },
  { slug: 'qatar', name: 'Qatar', code: 'QA', lang: 'ar', term: 'Barid muwaqqat' },
  { slug: 'kuwait', name: 'Kuwait', code: 'KW', lang: 'ar', term: 'Barid muwaqqat' },
  { slug: 'oman', name: 'Oman', code: 'OM', lang: 'ar', term: 'Barid muwaqqat' },
  { slug: 'malaysia', name: 'Malaysia', code: 'MY', lang: 'ms', term: 'E-mel sementara' },
  { slug: 'thailand', name: 'Thailand', code: 'TH', lang: 'th', term: 'Ximel chawkraw' },
  { slug: 'indonesia', name: 'Indonesia', code: 'ID', lang: 'id', term: 'Email sementara' },
  { slug: 'philippines', name: 'Philippines', code: 'PH', lang: 'en', term: 'Temp mail' },
  { slug: 'south-africa', name: 'South Africa', code: 'ZA', lang: 'en', term: 'Temp mail' },
  { slug: 'nigeria', name: 'Nigeria', code: 'NG', lang: 'en', term: 'Temp mail' },
  { slug: 'egypt', name: 'Egypt', code: 'EG', lang: 'ar', term: 'Barid muwaqqat' },
  { slug: 'kenya', name: 'Kenya', code: 'KE', lang: 'en', term: 'Temp mail' },
  { slug: 'morocco', name: 'Morocco', code: 'MA', lang: 'ar', term: 'Barid muwaqqat' },
  { slug: 'namibia', name: 'Namibia', code: 'NA', lang: 'en', term: 'Temp mail' },
  { slug: 'algeria', name: 'Algeria', code: 'DZ', lang: 'ar', term: 'Barid muwaqqat' },
  { slug: 'tunisia', name: 'Tunisia', code: 'TN', lang: 'ar', term: 'Barid muwaqqat' }
];

// Generate 365+ Pages by combining Countries with Top Use Cases
const useCases = [
    { suffix: '', titleSuffix: '' }, // Generic country page
    { suffix: '-for-facebook', titleSuffix: 'for Facebook' },
    { suffix: '-for-instagram', titleSuffix: 'for Instagram' },
    { suffix: '-for-discord', titleSuffix: 'for Discord' },
    { suffix: '-for-verification', titleSuffix: 'for Verification' },
    { suffix: '-for-gaming', titleSuffix: 'for Gaming' },
    { suffix: '-for-business', titleSuffix: 'for Business' },
    { suffix: '-for-dating', titleSuffix: 'for Dating' },
    { suffix: '-for-students', titleSuffix: 'for Students' },
    { suffix: '-for-steam', titleSuffix: 'for Steam' },
    { suffix: '-for-fortnite', titleSuffix: 'for Fortnite' },
    { suffix: '-for-gmail', titleSuffix: 'for Gmail' },
    { suffix: '-for-tiktok', titleSuffix: 'for TikTok' },
    { suffix: '-for-twitter', titleSuffix: 'for Twitter' },
    { suffix: '-for-reddit', titleSuffix: 'for Reddit' },
    { suffix: '-for-spotify', titleSuffix: 'for Spotify' },
    { suffix: '-for-netflix', titleSuffix: 'for Netflix' },
    { suffix: '-for-amazon', titleSuffix: 'for Amazon' },
    { suffix: '-for-ebay', titleSuffix: 'for eBay' },
    { suffix: '-for-paypal', titleSuffix: 'for PayPal' },
    { suffix: '-for-crypto', titleSuffix: 'for Crypto' },
    { suffix: '-for-trading', titleSuffix: 'for Trading' },
    { suffix: '-for-education', titleSuffix: 'for Education' },
    { suffix: '-for-jobs', titleSuffix: 'for Jobs' }
];

// --- Translations for SEO Pages ---
const translations = {
  en: {
    title: "Temp Mail {country} {suffix} - {term}",
    desc: "Get a free temp mail in {country} {suffix}. Secure disposable email ({term}) for users and services in {country}. Protect your privacy.",
    h1: "Temp Mail for {country} {suffix} ({term})",
    content: "Welcome to our temp mail service for {country}. We provide fast and secure disposable email addresses ({term}) optimized for users in {country}. Protect your privacy, avoid spam, and sign up for local services anonymously.",
    faq: [
      { q: "Is temp mail legal in {country}?", a: "Yes, using a disposable email address in {country} is completely legal for personal privacy." },
      { q: "Can I use this for Facebook in {country}?", a: "Absolutely. Our {term} service works perfectly for Facebook verification in {country}." },
      { q: "How long does the email last?", a: "Your {term} address is valid until you delete it or the session expires." }
    ]
  },
  es: {
    title: "Correo Temporal {country} {suffix} - {term}",
    desc: "Obtenga un correo temporal gratis en {country} {suffix}. Email desechable seguro ({term}) para usuarios y servicios en {country}. Proteja su privacidad.",
    h1: "Correo Temporal para {country} {suffix} ({term})",
    content: "Bienvenido a nuestro servicio de correo temporal para {country}. Ofrecemos direcciones de correo desechables rápidas y seguras ({term}) optimizadas para usuarios en {country}. Proteja su privacidad, evite el spam y regístrese en servicios locales de forma anónima.",
    faq: [
      { q: "¿Es legal el correo temporal en {country}?", a: "Sí, usar una dirección de correo desechable en {country} es completamente legal para la privacidad personal." },
      { q: "¿Puedo usar esto para Facebook en {country}?", a: "Absolutamente. Nuestro servicio de {term} funciona perfectamente para la verificación de Facebook en {country}." },
      { q: "¿Cuánto dura el correo electrónico?", a: "Su dirección de {term} es válida hasta que la elimine o expire la sesión." }
    ]
  },
  fr: {
    title: "Email Temporaire {country} {suffix} - {term}",
    desc: "Obtenez un email temporaire gratuit en {country} {suffix}. Email jetable sécurisé ({term}) pour les utilisateurs et services en {country}. Protégez votre vie privée.",
    h1: "Email Temporaire pour {country} {suffix} ({term})",
    content: "Bienvenue sur notre service d'email temporaire pour {country}. Nous fournissons des adresses email jetables rapides et sécurisées ({term}) optimisées pour les utilisateurs en {country}. Protégez votre vie privée, évitez les spams et inscrivez-vous anonymement aux services locaux.",
    faq: [
      { q: "L'email temporaire est-il légal en {country}?", a: "Oui, l'utilisation d'une adresse email jetable en {country} est tout à fait légale pour la confidentialité personnelle." },
      { q: "Puis-je l'utiliser pour Facebook en {country}?", a: "Absolument. Notre service {term} fonctionne parfaitement pour la vérification Facebook en {country}." },
      { q: "Combien de temps dure l'email?", a: "Votre adresse {term} est valide jusqu'à ce que vous la supprimiez ou que la session expire." }
    ]
  },
  de: {
    title: "Temp Mail {country} {suffix} - {term}",
    desc: "Holen Sie sich eine kostenlose Wegwerf-E-Mail in {country} {suffix}. Sichere Einweg-E-Mail ({term}) für Benutzer und Dienste in {country}. Schützen Sie Ihre Privatsphäre.",
    h1: "Temp Mail für {country} {suffix} ({term})",
    content: "Willkommen bei unserem Temp-Mail-Service für {country}. Wir bieten schnelle und sichere Wegwerf-E-Mail-Adressen ({term}), die für Benutzer in {country} optimiert sind. Schützen Sie Ihre Privatsphäre, vermeiden Sie Spam und melden Sie sich anonym bei lokalen Diensten an.",
    faq: [
      { q: "Ist Temp Mail in {country} legal?", a: "Ja, die Verwendung einer Wegwerf-E-Mail-Adresse in {country} ist für die persönliche Privatsphäre völlig legal." },
      { q: "Kann ich das für Facebook in {country} verwenden?", a: "Absolut. Unser {term}-Service funktioniert perfekt für die Facebook-Verifizierung in {country}." },
      { q: "Wie lange hält die E-Mail?", a: "Ihre {term}-Adresse ist gültig, bis Sie sie löschen oder die Sitzung abläuft." }
    ]
  },
  it: {
    title: "Email Temporanea {country} {suffix} - {term}",
    desc: "Ottieni un'email temporanea gratuita in {country} {suffix}. Email usa e getta sicura ({term}) per utenti e servizi in {country}. Proteggi la tua privacy.",
    h1: "Email Temporanea per {country} {suffix} ({term})",
    content: "Benvenuto nel nostro servizio di email temporanea per {country}. Forniamo indirizzi email usa e getta veloci e sicuri ({term}) ottimizzati per gli utenti in {country}. Proteggi la tua privacy, evita lo spam e registrati ai servizi locali in modo anonimo.",
    faq: [
      { q: "L'email temporanea è legale in {country}?", a: "Sì, l'utilizzo di un indirizzo email usa e getta in {country} è completamente legale per la privacy personale." },
      { q: "Posso usarlo per Facebook in {country}?", a: "Assolutamente. Il nostro servizio {term} funziona perfettamente per la verifica di Facebook in {country}." },
      { q: "Quanto dura l'email?", a: "Il tuo indirizzo {term} è valido finché non lo elimini o la sessione scade." }
    ]
  },
  pt: {
    title: "Email Temporário {country} {suffix} - {term}",
    desc: "Obtenha um email temporário grátis em {country} {suffix}. Email descartável seguro ({term}) para usuários e serviços em {country}. Proteja sua privacidade.",
    h1: "Email Temporário para {country} {suffix} ({term})",
    content: "Bem-vindo ao nosso serviço de email temporário para {country}. Fornecemos endereços de email descartáveis rápidos e seguros ({term}) otimizados para usuários em {country}. Proteja sua privacidade, evite spam e inscreva-se em serviços locais anonimamente.",
    faq: [
      { q: "O email temporário é legal em {country}?", a: "Sim, usar um endereço de email descartável em {country} é totalmente legal para privacidade pessoal." },
      { q: "Posso usar isso para o Facebook em {country}?", a: "Absolutamente. Nosso serviço {term} funciona perfeitamente para verificação do Facebook em {country}." },
      { q: "Quanto tempo dura o email?", a: "Seu endereço {term} é válido até que você o exclua ou a sessão expire." }
    ]
  },
  nl: {
    title: "Tijdelijke E-mail {country} {suffix} - {term}",
    desc: "Krijg een gratis tijdelijke e-mail in {country} {suffix}. Veilige wegwerp e-mail ({term}) voor gebruikers en diensten in {country}. Bescherm uw privacy.",
    h1: "Tijdelijke E-mail voor {country} {suffix} ({term})",
    content: "Welkom bij onze tijdelijke e-mailservice voor {country}. Wij bieden snelle en veilige wegwerp e-mailadressen ({term}) geoptimaliseerd voor gebruikers in {country}. Bescherm uw privacy, vermijd spam en meld u anoniem aan voor lokale diensten.",
    faq: [
      { q: "Is tijdelijke e-mail legaal in {country}?", a: "Ja, het gebruik van een wegwerp e-mailadres in {country} is volledig legaal voor persoonlijke privacy." },
      { q: "Kan ik dit gebruiken voor Facebook in {country}?", a: "Absoluut. Onze {term} service werkt perfect voor Facebook verificatie in {country}." },
      { q: "Hoe lang blijft de e-mail geldig?", a: "Uw {term} adres is geldig totdat u het verwijdert of de sessie verloopt." }
    ]
  },
  ru: {
    title: "Временная почта {country} {suffix} - {term}",
    desc: "Получите бесплатную временную почту в {country} {suffix}. Безопасная одноразовая почта ({term}) для пользователей и сервисов в {country}. Защитите свою конфиденциальность.",
    h1: "Временная почта для {country} {suffix} ({term})",
    content: "Добро пожаловать в наш сервис временной почты для {country}. Мы предоставляем быстрые и безопасные одноразовые адреса электронной почты ({term}), оптимизированные для пользователей в {country}. Защитите свою конфиденциальность, избегайте спама и регистрируйтесь в местных сервисах анонимно.",
    faq: [
      { q: "Законна ли временная почта в {country}?", a: "Да, использование одноразового адреса электронной почты в {country} полностью законно для личной конфиденциальности." },
      { q: "Могу ли я использовать это для Facebook в {country}?", a: "Безусловно. Наш сервис {term} отлично работает для верификации Facebook в {country}." },
      { q: "Как долго живет почта?", a: "Ваш адрес {term} действителен, пока вы его не удалите или не истечет сессия." }
    ]
  },
  ja: {
    title: "捨てアド {country} {suffix} - {term}",
    desc: "{country} {suffix}で無料の捨てアドを取得。{country}のユーザーとサービスのための安全な使い捨てメール（{term}）。プライバシーを保護します。",
    h1: "{country} {suffix}のための捨てアド ({term})",
    content: "{country}のための捨てアドサービスへようこそ。{country}のユーザー向けに最適化された高速で安全な使い捨てメールアドレス（{term}）を提供します。プライバシーを保護し、スパムを回避し、匿名のままローカルサービスに登録しましょう。",
    faq: [
      { q: "{country}で捨てアドは合法ですか？", a: "はい、{country}で個人のプライバシーのために使い捨てメールアドレスを使用することは完全に合法です。" },
      { q: "{country}でFacebookにこれを使用できますか？", a: "もちろんです。当社の{term}サービスは、{country}でのFacebook認証に完全に機能します。" },
      { q: "メールはどのくらい持ちますか？", a: "あなたの{term}アドレスは、削除するかセッションが期限切れになるまで有効です。" }
    ]
  },
  zh: {
    title: "临时邮箱 {country} {suffix} - {term}",
    desc: "在{country} {suffix}获取免费临时邮箱。为{country}的用户和服务提供的安全一次性电子邮件（{term}）。保护您的隐私。",
    h1: "{country} {suffix}的临时邮箱 ({term})",
    content: "欢迎来到我们为{country}提供的临时邮箱服务。我们提供专为{country}用户优化的快速安全的一次性电子邮件地址（{term}）。保护您的隐私，避免垃圾邮件，并匿名注册本地服务。",
    faq: [
      { q: "在{country}使用临时邮箱合法吗？", a: "是的，在{country}为了个人隐私使用一次性电子邮件地址是完全合法的。" },
      { q: "我可以在{country}将其用于Facebook吗？", a: "当然。我们的{term}服务在{country}完美支持Facebook验证。" },
      { q: "邮箱能持续多久？", a: "您的{term}地址在您删除它或会话过期之前一直有效。" }
    ]
  },
  ko: {
    title: "일회용 이메일 {country} {suffix} - {term}",
    desc: "{country} {suffix}에서 무료 일회용 이메일을 받으세요. {country} 사용자와 서비스를 위한 안전한 임시 이메일 ({term}). 개인 정보를 보호하세요.",
    h1: "{country} {suffix}용 일회용 이메일 ({term})",
    content: "{country}용 일회용 이메일 서비스에 오신 것을 환영합니다. {country} 사용자에게 최적화된 빠르고 안전한 일회용 이메일 주소 ({term})를 제공합니다. 개인 정보를 보호하고 스팸을 피하며 익명으로 로컬 서비스에 가입하세요.",
    faq: [
      { q: "{country}에서 일회용 이메일은 합법인가요?", a: "네, {country}에서 개인 정보 보호를 위해 일회용 이메일 주소를 사용하는 것은 완전히 합법입니다." },
      { q: "{country}에서 Facebook에 사용할 수 있나요?", a: "물론입니다. 저희 {term} 서비스는 {country}에서 Facebook 인증에 완벽하게 작동합니다." },
      { q: "이메일은 얼마나 오래 유지되나요?", a: "귀하의 {term} 주소는 삭제하거나 세션이 만료될 때까지 유효합니다." }
    ]
  },
  ar: {
    title: "بريد مؤقت {country} {suffix} - {term}",
    desc: "احصل على بريد مؤقت مجاني في {country} {suffix}. بريد إلكتروني آمن يمكن التخلص منه ({term}) للمستخدمين والخدمات في {country}. حماية خصوصيتك.",
    h1: "بريد مؤقت لـ {country} {suffix} ({term})",
    content: "مرحبًا بك في خدمة البريد المؤقت لـ {country}. نحن نقدم عناوين بريد إلكتروني سريعة وآمنة يمكن التخلص منها ({term}) ومحسنة للمستخدمين في {country}. احمِ خصوصيتك وتجنب الرسائل غير المرغوب فيها واشترك في الخدمات المحلية دون الكشف عن هويتك.",
    faq: [
      { q: "هل البريد المؤقت قانوني في {country}؟", a: "نعم، استخدام عنوان بريد إلكتروني يمكن التخلص منه في {country} قانوني تمامًا للخصوصية الشخصية." },
      { q: "هل يمكنني استخدامه لفيسبوك في {country}؟", a: "بالتأكيد. تعمل خدمة {term} الخاصة بنا بشكل مثالي للتحقق من فيسبوك في {country}." },
      { q: "كم مدة بقاء البريد الإلكتروني؟", a: "عنوان {term} الخاص بك صالح حتى تقوم بحذفه أو تنتهي الجلسة." }
    ]
  }
};

const getLocalizedContent = (lang, countryName, term, suffix, titleSuffix) => {
    const t = translations[lang] || translations['en'];
    const replace = (str) => str.replace(/{country}/g, countryName).replace(/{term}/g, term).replace(/{suffix}/g, suffix || '').replace(/{titleSuffix}/g, titleSuffix || '');
    
    return {
        title: replace(t.title),
        description: replace(t.desc),
        h1: replace(t.h1),
        content: replace(t.content),
        faq: t.faq.map(f => ({ q: replace(f.q), a: replace(f.a) }))
    };
};

const generatedSeoPages = countries.flatMap(c => 
    useCases.map(useCase => {
        const localized = getLocalizedContent(c.lang, c.name, c.term, useCase.suffix.replace(/-/g, ' '), useCase.titleSuffix);
        return {
            slug: `temp-mail-${c.slug}${useCase.suffix}`,
            title: localized.title,
            description: localized.description,
            keywords: [`temp mail ${c.slug}`, c.term.toLowerCase(), `${c.slug} temp mail`, `disposable email ${c.slug}`, `fake email ${c.name}`],
            h1: localized.h1,
            content: localized.content,
            langCode: c.lang,
            countryCode: c.code,
            faq: localized.faq
        };
    })
);

const seoPages = [...baseSeoPages, ...generatedSeoPages].map(page => ({
    ...page,
    url: `/topic/${page.slug}`
}));

// --- Data: Blog Articles (20 Long-Form Posts) ---
const generateBlogContent = (topic, keyword) => {
    return (
        <>
            <p className="lead text-xl text-gray-300 mb-8 leading-relaxed">
                In the rapidly evolving digital landscape of 2026, maintaining online privacy has transitioned from a luxury to an absolute necessity. With <strong>{keyword}</strong> emerging as a critical tool for digital hygiene, understanding the nuances of disposable email services is more important than ever. This comprehensive, deep-dive guide will explore every aspect of {topic}, explaining why it is the ultimate shield for your digital identity against the growing threats of spam, phishing, and data breaches.
            </p>

            <h2 className="text-3xl font-bold text-white mt-12 mb-6">The Rising Need for {topic} in a Data-Hungry World</h2>
            <p className="text-gray-400 mb-6 leading-relaxed">
                Every single day, we interact with dozens of online services. From reading a news article to buying groceries, almost every interaction requires an email address. This "email-first" authentication method has turned your primary email address into a unique digital identifier, much like a social security number for the internet. Marketers, data brokers, and cybercriminals know this. They relentlessly harvest email addresses to build detailed profiles of user behavior, preferences, and identity.
            </p>
            <p className="text-gray-400 mb-6 leading-relaxed">
                By utilizing <strong>{keyword}</strong> solutions, you effectively sever the link between your real identity and your online activities. You create a secure buffer zone. When a website demands your email address for a one-time download or a quick verification, handing over your primary email is akin to handing over the keys to your house. A disposable email is like a guest pass—valid for a short time, specific in its purpose, and completely revoked once used.
            </p>
            <p className="text-gray-400 mb-6 leading-relaxed">
                Recent cybersecurity reports indicate that over 45% of global email traffic is spam. Furthermore, phishing attacks have become increasingly sophisticated, often bypassing traditional spam filters. By using a temporary email address, you significantly reduce the attack surface of your personal digital life. If a disposable address receives a phishing link, it doesn't matter—you never click it, and the address self-destructs anyway.
            </p>

            <h2 className="text-3xl font-bold text-white mt-12 mb-6">Deep Dive: How {topic} Technology Works</h2>
            <p className="text-gray-400 mb-6 leading-relaxed">
                To understand the power of <strong>{keyword}</strong>, we must look under the hood. Unlike traditional email providers (like Gmail or Outlook) that store your data indefinitely on redundant servers, disposable email services are designed with "data minimization" as a core principle.
            </p>
            <ul className="list-disc list-inside text-gray-400 mb-8 space-y-4 pl-4">
                <li><strong>Ephemeral Storage:</strong> Emails received by our system are stored in temporary memory (RAM) or highly volatile storage. They are not written to long-term hard drives. This means that once the session expires, the data is forensically unrecoverable.</li>
                <li><strong>Instant Domain Rotation:</strong> We constantly rotate our domain names. When a service bans one domain, we have dozens more ready to go. This ensures that your <strong>{keyword}</strong> always works, even on picky websites.</li>
                <li><strong>No Personal Identifiable Information (PII):</strong> We do not ask for your name, phone number, or backup email. There is no registration database. This architecture ensures that even in the unlikely event of a server seizure, there is no user data to connect back to you.</li>
                <li><strong>TLS/SSL Encryption:</strong> All data transmitted between your browser and our servers is encrypted using modern cryptographic standards. This prevents eavesdropping by ISPs or malicious actors on public Wi-Fi networks.</li>
            </ul>

            <h2 className="text-3xl font-bold text-white mt-12 mb-6">Step-by-Step Masterclass: Using {topic} Effectively</h2>
            <p className="text-gray-400 mb-6 leading-relaxed">
                While the concept is simple, mastering the use of disposable email can unlock new levels of productivity and privacy. Here is an advanced workflow for power users:
            </p>
            <div className="space-y-6 mb-8">
                <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                    <h4 className="text-xl font-bold text-indigo-400 mb-2">Phase 1: Generation</h4>
                    <p className="text-gray-400">Navigate to our homepage. The system automatically negotiates with our mail servers to assign you a unique, clean email address. No clicks needed—it's ready the moment the page loads.</p>
                </div>
                <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                    <h4 className="text-xl font-bold text-indigo-400 mb-2">Phase 2: Deployment</h4>
                    <p className="text-gray-400">Copy the address. Use it for the intended service (e.g., signing up for a newsletter, accessing a gated whitepaper, or verifying a game account). Keep the tab open.</p>
                </div>
                <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                    <h4 className="text-xl font-bold text-indigo-400 mb-2">Phase 3: Reception & Verification</h4>
                    <p className="text-gray-400">Our AJAX-powered frontend polls the server every few seconds. As soon as the email hits our SMTP server, it is pushed to your browser. Click the email to read the verification code or click the confirmation link.</p>
                </div>
                <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                    <h4 className="text-xl font-bold text-indigo-400 mb-2">Phase 4: Destruction</h4>
                    <p className="text-gray-400">Once you have what you need, you can either close the tab (the email will expire automatically) or click the "Delete" button to instantly purge the address and all associated messages from our system.</p>
                </div>
            </div>

            <h2 className="text-3xl font-bold text-white mt-12 mb-6">Advanced Use Cases: Beyond Basic Privacy</h2>
            <p className="text-gray-400 mb-6 leading-relaxed">
                <strong>{keyword}</strong> isn't just for avoiding spam. It's a versatile tool for professionals and developers:
            </p>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                    <h3 className="font-bold text-indigo-400 mb-3 text-lg">QA & Software Testing</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">Developers can use our service to test user registration flows, password reset functionality, and transactional email delivery without cluttering their corporate mail servers or creating infinite Gmail aliases.</p>
                </div>
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                    <h3 className="font-bold text-indigo-400 mb-3 text-lg">Competitor Analysis</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">Marketers can sign up for competitor newsletters and onboarding flows to analyze their strategies without revealing their identity or corporate affiliation.</p>
                </div>
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                    <h3 className="font-bold text-indigo-400 mb-3 text-lg">Protecting Secondary Devices</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">Setting up a smart TV or IoT device often requires an email account. Using a disposable email prevents these insecure devices from being linked to your main digital identity.</p>
                </div>
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                    <h3 className="font-bold text-indigo-400 mb-3 text-lg">Safe Online Shopping</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">When buying from a new or unknown e-commerce site, use a temp mail to receive the receipt and shipping info. If the site turns out to be spammy, your main inbox remains safe.</p>
                </div>
            </div>

            <h2 className="text-3xl font-bold text-white mt-12 mb-6">Legal and Ethical Considerations of {topic}</h2>
            <p className="text-gray-400 mb-6 leading-relaxed">
                A common question we receive is: <em>Is using {keyword} legal?</em> The answer is unequivocally yes. Using a disposable email address is a legitimate way to protect your personal privacy. It is not illegal to use a pseudonym or a temporary contact method for online services, provided you are not engaging in fraud or criminal activity.
            </p>
            <p className="text-gray-400 mb-6 leading-relaxed">
                In fact, with regulations like GDPR in Europe and CCPA in California emphasizing user privacy and data minimization, using tools that limit the data you share is in line with the spirit of modern privacy laws. You have a right to control your digital footprint, and <strong>{keyword}</strong> is a tool that empowers you to exercise that right.
            </p>

            <h2 className="text-3xl font-bold text-white mt-12 mb-6">The Future of Email Privacy</h2>
            <p className="text-gray-400 mb-6 leading-relaxed">
                As AI and machine learning become better at tracking users across the web, the "cat and mouse" game of privacy will intensify. We predict that in the coming years, disposable identities will become a standard feature of web browsers and operating systems. Until then, standalone services like ours provide the most robust defense.
            </p>
            <p className="text-gray-400 mb-6 leading-relaxed">
                We are constantly upgrading our infrastructure to support new standards, improve delivery speeds, and add more domains to our rotation. Our commitment is to ensure that <strong>{keyword}</strong> remains a viable and effective strategy for years to come.
            </p>

            <h2 className="text-3xl font-bold text-white mt-12 mb-6">Conclusion</h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
                In conclusion, <strong>{topic}</strong> is more than just a convenience; it is a necessity for modern digital hygiene. By incorporating disposable emails into your daily browsing habits, you reclaim control over your personal data. You stop being a product to be sold and start being a user who commands respect. Stay safe, stay anonymous, and keep your inbox clean.
            </p>

            <div className="bg-indigo-900/20 border border-indigo-500/20 rounded-3xl p-8 mt-12">
                <h3 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions about {topic}</h3>
                <div className="space-y-6">
                    <div>
                        <h4 className="font-bold text-indigo-300 text-lg mb-2">Is {keyword} free to use forever?</h4>
                        <p className="text-gray-400">Yes, our service is 100% free. We are supported by non-intrusive advertising and premium donations. You can generate as many addresses as you need without ever pulling out a credit card.</p>
                    </div>
                    <div>
                        <h4 className="font-bold text-indigo-300 text-lg mb-2">Can I receive file attachments?</h4>
                        <p className="text-gray-400">Yes, our secure inbox supports receiving standard email attachments, images, and documents. However, for security reasons, we scan all attachments for malware before allowing you to download them.</p>
                    </div>
                    <div>
                        <h4 className="font-bold text-indigo-300 text-lg mb-2">How long does the email address last?</h4>
                        <p className="text-gray-400">The email address is yours until you delete it or your browser session expires. Messages are kept for a limited time (typically 2-24 hours) to ensure privacy and free up server resources.</p>
                    </div>
                    <div>
                        <h4 className="font-bold text-indigo-300 text-lg mb-2">Is it legal to use {keyword} for Facebook or Instagram?</h4>
                        <p className="text-gray-400">Absolutely. Using a disposable email is a legal way to protect your privacy online. It works perfectly for verifying social media accounts without linking them to your real identity.</p>
                    </div>
                    <div>
                        <h4 className="font-bold text-indigo-300 text-lg mb-2">Can I use this for Two-Factor Authentication (2FA)?</h4>
                        <p className="text-gray-400">Yes, our fast inbox refresh rate makes it perfect for receiving 2FA codes and OTPs instantly. The low latency ensures you get the code before the timer runs out.</p>
                    </div>
                    <div>
                        <h4 className="font-bold text-indigo-300 text-lg mb-2">Can I send emails from this address?</h4>
                        <p className="text-gray-400">Currently, our service is receive-only to prevent abuse by spammers. This ensures our domains remain clean and trusted by major email providers, guaranteeing you receive your important verification emails.</p>
                    </div>
                </div>
            </div>
        </>
    );
};

const blogArticles = RAW_KEYWORDS.slice(0, 20).map((keyword, index) => ({
    slug: keyword.replace(/\s+/g, '-').toLowerCase() + '-guide',
    title: `The Ultimate Guide to ${keyword.charAt(0).toUpperCase() + keyword.slice(1)} (2026 Update)`,
    category: index % 3 === 0 ? 'Security' : (index % 3 === 1 ? 'Privacy' : 'Tech Tips'),
    author: 'Privacy Expert',
    date: new Date(Date.now() - index * 86400000).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
    readTime: '15 min read',
    thumbnail: `https://picsum.photos/seed/${keyword.replace(/\s/g, '')}/800/400`,
    description: `Everything you need to know about ${keyword}. A comprehensive 1500+ word guide on how to use ${keyword} to protect your online identity and avoid spam.`,
    content: generateBlogContent(keyword.charAt(0).toUpperCase() + keyword.slice(1), keyword)
}));

// --- Service: Email Logic ---
const MAIL_TM_API = 'https://api.mail.tm';

const fetchWithTimeout = async (resource, options = {}) => {
  const { timeout = 8000 } = options;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  const response = await fetch(resource, {
    ...options,
    signal: controller.signal,
  });
  clearTimeout(id);
  return response;
};

const createMailTmAccount = async () => {
  try {
    const domainsRes = await fetchWithTimeout(`${MAIL_TM_API}/domains`);
    if (!domainsRes.ok) throw new Error('Failed to fetch domains from Mail.tm');
    const domains = await domainsRes.json();
    const domainList = domains['hydra:member'];
    
    if (!domainList || domainList.length === 0) throw new Error('No domains available');
    
    // Pick a random domain to avoid potential single-domain issues
    const domain = domainList[Math.floor(Math.random() * domainList.length)].domain;

    const address = `${Math.random().toString(36).substring(2, 11)}@${domain}`;
    const password = Math.random().toString(36).substring(2, 14);

    const createAccRes = await fetchWithTimeout(`${MAIL_TM_API}/accounts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address, password }),
    });
    
    if (!createAccRes.ok) {
        const errData = await createAccRes.json().catch(() => ({}));
        throw new Error(errData.detail || 'Failed to create account with Mail.tm');
    }
    const accountData = await createAccRes.json();
    
    const tokenRes = await fetchWithTimeout(`${MAIL_TM_API}/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address, password }),
    });
    if (!tokenRes.ok) throw new Error('Failed to get token from Mail.tm');
    const tokenData = await tokenRes.json();

    return { address: accountData.address, token: tokenData.token, id: accountData.id, apiSource: 'mail.tm', password, refreshToken: tokenData.refreshToken };
  } catch (error) {
    console.error("Account creation error:", error);
    throw error;
  }
};

const refreshMailTmToken = async (refreshToken) => {
    const tokenRes = await fetchWithTimeout(`${MAIL_TM_API}/token/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
    });
    if (!tokenRes.ok) {
        throw new Error('Failed to refresh token from Mail.tm');
    }
    const tokenData = await tokenRes.json();
    return { 
      token: tokenData.token, 
      refreshToken: tokenData.refreshToken 
    };
}

const generateNewEmail = async () => {
  // Simple retry logic
  for (let i = 0; i < 3; i++) {
      try {
        return await createMailTmAccount();
      } catch (error) {
        console.warn(`Attempt ${i+1} failed:`, error);
        if (i === 2) throw new Error('Email service unavailable. Please try again later.');
        await new Promise(r => setTimeout(r, 1000)); // Wait 1s before retry
      }
  }
};

const fetchInbox = async (token, apiSource) => {
    if (apiSource === 'mail.tm') {
        const res = await fetchWithTimeout(`${MAIL_TM_API}/messages`, {
            headers: { 'Authorization': `Bearer ${token}` },
        });
        if (res.status === 401) throw new Error('Mail.tm session expired.');
        if (!res.ok) return [];
        const data = await res.json();
        return data['hydra:member'] || [];
    }
    return [];
};

const fetchMessageDetail = async (token, messageId, apiSource) => {
    if (apiSource === 'mail.tm') {
        const res = await fetchWithTimeout(`${MAIL_TM_API}/messages/${messageId}`, {
            headers: { 'Authorization': `Bearer ${token}` },
        });
        if (res.status === 401) throw new Error('Mail.tm session expired.');
        if (!res.ok) throw new Error('Could not fetch message details.');
        return res.json();
    }
    return null;
};

const deleteMailTmAccount = async (token, accountId) => {
  const res = await fetchWithTimeout(`${MAIL_TM_API}/accounts/${accountId}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` },
  });
  return res.ok;
}

// --- Components ---

const Header = ({ onNavigateBlog, onGoHome }) => (
  <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/90 backdrop-blur-xl supports-[backdrop-filter]:bg-black/60">
    <div className="container mx-auto flex h-16 items-center justify-between px-4">
      <div className="flex items-center gap-2 cursor-pointer" onClick={onGoHome}>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-black shadow-lg shadow-white/20">
          <Icons.Mail className="h-5 w-5" />
        </div>
        <span className="text-lg font-bold tracking-tight text-white">TempMail<span className="text-indigo-400">Pro</span></span>
      </div>
      <nav className="hidden md:flex items-center gap-8">
        <button onClick={onNavigateBlog} className="text-sm font-medium text-gray-300 hover:text-white transition-colors flex items-center gap-2">
            <Icons.File className="h-4 w-4" />
            Blog
        </button>
        <a href="#features" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Features</a>
        <a href="#faq" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">FAQ</a>
      </nav>
      <div className="flex items-center gap-4">
        <button onClick={onNavigateBlog} className="md:hidden text-gray-300 hover:text-white">
            <Icons.File className="h-5 w-5" />
        </button>
        <div className="hidden md:flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 border border-white/10">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-xs font-medium text-emerald-400">System Online</span>
        </div>
      </div>
    </div>
  </header>
);

const Hero = ({ emailAccount, onDeleteEmail, onNewEmail, isCreating, isDeleting, loadingMessage, seoData, errorMessage }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!emailAccount?.address) return;
    
    const text = emailAccount.address;
    let success = false;

    try {
        await navigator.clipboard.writeText(text);
        success = true;
    } catch (err) {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand('copy');
            success = true;
        } catch (e) {
            console.error("Copy failed", e);
        }
        document.body.removeChild(textArea);
    }

    if (success) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative overflow-hidden pt-12 pb-24 bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-black to-black"></div>
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-indigo-300 mb-8 border border-white/10 backdrop-blur-md">
          <Icons.Shield className="h-4 w-4" />
          <span>{seoData ? seoData.h1 : "Anonymous & Secure Temporary Email"}</span>
        </div>
        
        <h1 className="mx-auto max-w-4xl text-5xl font-black tracking-tight text-white sm:text-7xl mb-8 leading-tight">
          Your Privacy, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Protected.</span>
        </h1>
        
        <p className="mx-auto max-w-2xl text-lg text-gray-400 mb-12 leading-relaxed">
          {seoData ? seoData.description : "Forget about spam, advertising mailings, hacking and attacking robots. Keep your real mailbox clean and secure."}
        </p>

        <div className="mx-auto max-w-3xl">
          <div className="glass-panel rounded-2xl p-2 sm:p-3 flex flex-col sm:flex-row items-center gap-3 shadow-2xl shadow-indigo-500/10 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative flex-1 w-full bg-[#0f172a]/50 rounded-xl border border-white/5 px-6 py-5 flex items-center justify-center sm:justify-start min-h-[80px]">
              {isCreating ? (
                 <div className="flex items-center gap-3 text-indigo-400 animate-pulse">
                   <Icons.Spinner className="h-5 w-5 animate-spin" />
                   <span className="font-mono text-sm tracking-wider">{loadingMessage || "Generating Secure ID..."}</span>
                 </div>
              ) : errorMessage ? (
                 <div className="flex items-center gap-3 text-rose-400">
                   <Icons.Alert className="h-5 w-5" />
                   <span className="font-mono text-sm tracking-wider">{errorMessage}</span>
                 </div>
              ) : (
                <span className="font-mono text-xl sm:text-2xl text-white tracking-wide break-all">
                  {emailAccount ? emailAccount.address : "No Active Session"}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button 
                onClick={handleCopy}
                disabled={!emailAccount || isCreating || !!errorMessage}
                className="flex-1 sm:flex-none h-14 px-6 rounded-xl bg-white text-slate-900 font-bold hover:bg-indigo-50 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-white/5"
              >
                {copied ? <Icons.Check className="h-5 w-5 text-emerald-600" /> : <Icons.Copy className="h-5 w-5" />}
                <span className="uppercase tracking-wider text-sm">{copied ? "Copied" : "Copy"}</span>
              </button>
              
              <button 
                onClick={onNewEmail}
                disabled={isCreating}
                className="h-14 px-6 rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20"
                title="Generate New Email"
              >
                <Icons.Refresh className={`h-5 w-5 ${isCreating ? 'animate-spin' : ''}`} />
                <span className="uppercase tracking-wider text-sm">Change</span>
              </button>

              <button 
                onClick={onDeleteEmail}
                disabled={!emailAccount || isDeleting || isCreating || !!errorMessage}
                className="h-14 w-14 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white border border-rose-500/20 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center"
                title="Delete Address"
              >
                {isDeleting ? <Icons.Spinner className="h-5 w-5 animate-spin" /> : <Icons.Trash className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const EmailList = ({ messages, onSelectMessage }) => {
  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-gray-400">
        <div className="h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center mb-6">
          <Icons.Mail className="h-10 w-10 text-gray-300" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Your inbox is empty</h3>
        <p className="max-w-xs text-center text-gray-500">Waiting for incoming messages. They will appear here automatically.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {messages.map((msg) => (
        <div 
          key={msg.id} 
          onClick={() => onSelectMessage(msg)}
          className="group bg-white hover:bg-indigo-50 border border-gray-100 hover:border-indigo-100 rounded-2xl p-5 cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md flex items-start gap-4"
        >
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center flex-shrink-0 font-bold text-lg shadow-lg shadow-indigo-500/20">
            {msg.from.name ? msg.from.name.charAt(0).toUpperCase() : '?'}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-1">
              <h4 className="font-bold text-gray-900 truncate pr-2 group-hover:text-indigo-700 transition-colors">
                {msg.from.name || msg.from.address}
              </h4>
              <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2 py-1 rounded-full whitespace-nowrap">
                {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            <p className="text-sm font-medium text-gray-800 mb-1 truncate">{msg.subject || '(No Subject)'}</p>
            <p className="text-sm text-gray-500 truncate">{msg.intro || 'No preview available...'}</p>
          </div>
          <div className="self-center opacity-0 group-hover:opacity-100 transition-opacity -ml-2">
            <Icons.ChevronRight className="h-5 w-5 text-indigo-400" />
          </div>
        </div>
      ))}
    </div>
  );
};

const EmailDetail = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <button onClick={onClose} className="mb-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
        <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-indigo-600 transition-colors">
            <Icons.ArrowLeft className="h-4 w-4" />
        </div>
        <span className="font-medium">Back to Inbox</span>
      </button>

      <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden">
        <div className="bg-gray-50 border-b border-gray-100 p-8">
          <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-6 leading-tight">{message.subject}</h1>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xl">
                {message.from.name ? message.from.name.charAt(0).toUpperCase() : '?'}
              </div>
              <div>
                <p className="font-bold text-gray-900">{message.from.name} <span className="font-normal text-gray-500 text-sm">&lt;{message.from.address}&gt;</span></p>
                <p className="text-sm text-gray-500">To: <span className="text-gray-700 font-medium">{message.address}</span></p>
              </div>
            </div>
            <div className="text-sm font-medium text-gray-500 bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm">
              {new Date(message.createdAt).toLocaleString()}
            </div>
          </div>
        </div>
        
        <div className="p-8 md:p-12 bg-white min-h-[400px]">
           {message.html ? (
             <div className="prose max-w-none prose-indigo" dangerouslySetInnerHTML={{ __html: message.html }} />
           ) : (
             <p className="whitespace-pre-wrap text-gray-700 leading-relaxed">{message.text}</p>
           )}
        </div>
      </div>
    </div>
  );
};

const Footer = ({ onNavigateBlog, onGoHome }) => (
    <footer className="border-t border-gray-200 bg-gray-50 pt-16 pb-8 mt-auto">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                <div className="col-span-1 md:col-span-1">
                    <div className="flex items-center gap-2 mb-6 cursor-pointer" onClick={onGoHome}>
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
                            <Icons.Mail className="h-5 w-5" />
                        </div>
                        <span className="text-xl font-bold text-gray-900">TempMail<span className="text-indigo-600">Pro</span></span>
                    </div>
                    <p className="text-gray-500 leading-relaxed max-w-sm mb-6 text-sm">
                        The world's most advanced disposable email service. Protect your personal identity with military-grade encryption and instant anonymity.
                    </p>
                </div>
                <div>
                     <h3 className="font-bold text-gray-900 mb-6 tracking-wide uppercase text-sm">Global Locations</h3>
                     <ul className="space-y-3 text-sm">
                        <li><Link to="/topic/temp-mail-usa" className="text-gray-500 hover:text-indigo-600 transition-colors">Temp Mail USA</Link></li>
                        <li><Link to="/topic/temp-mail-uk" className="text-gray-500 hover:text-indigo-600 transition-colors">Temp Mail UK</Link></li>
                        <li><Link to="/topic/temp-mail-canada" className="text-gray-500 hover:text-indigo-600 transition-colors">Temp Mail Canada</Link></li>
                        <li><Link to="/topic/temp-mail-australia" className="text-gray-500 hover:text-indigo-600 transition-colors">Temp Mail Australia</Link></li>
                        <li><Link to="/topic/temp-mail-germany" className="text-gray-500 hover:text-indigo-600 transition-colors">Temp Mail Germany</Link></li>
                        <li><Link to="/topic/temp-mail-france" className="text-gray-500 hover:text-indigo-600 transition-colors">Temp Mail France</Link></li>
                        <li><Link to="/topic/temp-mail-japan" className="text-gray-500 hover:text-indigo-600 transition-colors">Temp Mail Japan</Link></li>
                        <li><Link to="/topic/temp-mail-switzerland" className="text-gray-500 hover:text-indigo-600 transition-colors">Temp Mail Switzerland</Link></li>
                        <li><Link to="/topic/temp-mail-singapore" className="text-gray-500 hover:text-indigo-600 transition-colors">Temp Mail Singapore</Link></li>
                        <li><Link to="/topic/temp-mail-netherlands" className="text-gray-500 hover:text-indigo-600 transition-colors">Temp Mail Netherlands</Link></li>
                     </ul>
                </div>
                <div>
                    <h3 className="font-bold text-gray-900 mb-6 tracking-wide uppercase text-sm">Platform</h3>
                    <ul className="space-y-3 text-sm">
                        <li><button onClick={onNavigateBlog} className="text-gray-500 hover:text-indigo-600 transition-colors">Security Blog</button></li>
                        <li><a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors">API Access</a></li>
                        <li><a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors">Chrome Extension</a></li>
                        <li><a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors">iOS App</a></li>
                        <li><a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors">Android App</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-bold text-gray-900 mb-6 tracking-wide uppercase text-sm">Legal</h3>
                    <ul className="space-y-3 text-sm">
                        <li><a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors">Privacy Policy</a></li>
                        <li><a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors">Terms of Service</a></li>
                        <li><a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors">Cookie Policy</a></li>
                        <li><a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors">GDPR Compliance</a></li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-gray-500 text-sm">© 2026 TempMail Pro. All rights reserved.</p>
                <div className="flex gap-6">
                    <Icons.Facebook className="h-5 w-5 text-gray-400 hover:text-indigo-600 cursor-pointer transition-colors" />
                    <Icons.Twitter className="h-5 w-5 text-gray-400 hover:text-indigo-600 cursor-pointer transition-colors" />
                    <Icons.Instagram className="h-5 w-5 text-gray-400 hover:text-indigo-600 cursor-pointer transition-colors" />
                </div>
            </div>
        </div>
    </footer>
);

const StarRating = () => (
    <div className="flex items-center justify-center gap-1 mb-6 animate-fade-in">
        <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className="w-6 h-6 text-yellow-400 fill-current drop-shadow-sm" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
            ))}
        </div>
        <div className="flex flex-col items-start ml-3">
            <span className="text-gray-900 font-bold text-lg leading-none">4.9/5</span>
            <span className="text-indigo-600 text-xs font-medium uppercase tracking-wider">From 1M+ Users</span>
        </div>
    </div>
);

const SeoChart = () => {
    const data = [
        { name: 'Jan', spam: 4000, clean: 2400 },
        { name: 'Feb', spam: 3000, clean: 1398 },
        { name: 'Mar', spam: 2000, clean: 9800 },
        { name: 'Apr', spam: 2780, clean: 3908 },
        { name: 'May', spam: 1890, clean: 4800 },
        { name: 'Jun', spam: 2390, clean: 3800 },
        { name: 'Jul', spam: 3490, clean: 4300 },
    ];

    return (
        <div className="w-full bg-white p-6 rounded-3xl border border-gray-100 shadow-xl mt-12">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">Spam Protection Analysis</h3>
                    <p className="text-gray-500 text-sm">Real-time threat mitigation statistics</p>
                </div>
                <div className="flex gap-4 text-xs font-bold uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                        <span className="text-gray-500">Threats Blocked</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                        <span className="text-gray-500">Clean Inbox</span>
                    </div>
                </div>
            </div>
            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                        <XAxis 
                            dataKey="name" 
                            stroke="#64748b" 
                            tick={{fill: '#64748b', fontSize: 12}} 
                            axisLine={false}
                            tickLine={false}
                            dy={10}
                        />
                        <YAxis 
                            stroke="#64748b" 
                            tick={{fill: '#64748b', fontSize: 12}} 
                            axisLine={false}
                            tickLine={false}
                            dx={-10}
                        />
                        <Tooltip 
                            contentStyle={{ 
                                backgroundColor: '#ffffff', 
                                border: '1px solid #e2e8f0', 
                                borderRadius: '12px',
                                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                                color: '#1e293b'
                            }} 
                            itemStyle={{ color: '#1e293b' }}
                            cursor={{stroke: '#cbd5e1', strokeWidth: 2}}
                        />
                        <Line 
                            type="monotone" 
                            dataKey="spam" 
                            stroke="#f43f5e" 
                            strokeWidth={3}
                            dot={{r: 4, fill: '#f43f5e', strokeWidth: 0}}
                            activeDot={{ r: 8, strokeWidth: 0 }} 
                        />
                        <Line 
                            type="monotone" 
                            dataKey="clean" 
                            stroke="#10b981" 
                            strokeWidth={3}
                            dot={{r: 4, fill: '#10b981', strokeWidth: 0}}
                            activeDot={{ r: 8, strokeWidth: 0 }} 
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

const GlobalUsageChart = () => {
    const data = [
        { name: 'USA', users: 4500 },
        { name: 'UK', users: 3200 },
        { name: 'DE', users: 2800 },
        { name: 'FR', users: 2400 },
        { name: 'JP', users: 1900 },
        { name: 'BR', users: 2100 },
    ];

    return (
        <div className="w-full bg-white p-6 rounded-3xl border border-gray-100 shadow-xl mt-8">
             <h3 className="text-2xl font-bold text-gray-900 mb-6">Global User Distribution</h3>
             <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                        <XAxis dataKey="name" stroke="#64748b" tick={{fill: '#64748b'}} axisLine={false} tickLine={false} />
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#1e293b' }}
                            cursor={{fill: '#f1f5f9'}}
                        />
                        <Bar dataKey="users" fill="#6366f1" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
             </div>
        </div>
    );
};

const InternalLinks = ({ currentSlug }) => {
    const links = [
        ...seoPages.filter(p => p.slug !== currentSlug).slice(0, 6),
        ...blogArticles.filter(b => b.slug !== currentSlug).slice(0, 6)
    ];

    return (
        <section className="border-t border-gray-200 pt-16 mt-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Explore More Topics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {links.map((link, i) => (
                    <Link key={i} to={link.h1 ? `/topic/${link.slug}` : `/blog/${link.slug}`} className="text-gray-600 hover:text-indigo-600 transition-colors text-sm flex items-center gap-2 group">
                        <div className="w-1 h-1 rounded-full bg-indigo-500 group-hover:w-2 transition-all"></div>
                        {link.h1 || link.title}
                    </Link>
                ))}
            </div>
        </section>
    );
};

const FrontPageContent = () => (
  <div className="container mx-auto px-4 py-16 text-gray-600">
    <div className="max-w-4xl mx-auto space-y-24">
      
      {/* Intro */}
      <section className="text-center space-y-6">
        <StarRating />
        <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">
          Forget about spam, advertising mailings, hacking and attacking robots.
        </h2>
        <p className="text-xl text-gray-500 leading-relaxed max-w-2xl mx-auto">
          Keep your real mailbox clean and secure. Temp Mail provides temporary, secure, anonymous, free, disposable email address.
        </p>
      </section>

      {/* What is Disposable Email */}
      <section className="space-y-8">
        <div className="flex items-center gap-4 mb-4">
            <div className="h-12 w-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-sm">
                <Icons.Shield className="h-6 w-6" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900">What is Disposable Temporary E-mail?</h3>
        </div>
        <div className="prose prose-lg prose-slate max-w-none text-gray-600 leading-relaxed">
            <p>
            Disposable email - is a free email service that allows to receive email at a temporary address that self-destructed after a certain time elapses. It is also known by names like : tempmail, 10minutemail, 10minmail, throwaway email, fake-mail , fake email generator, burner mail or trash-mail. Many forums, Wi-Fi owners, websites and blogs ask visitors to register before they can view content, post comments or download something. Temp-Mail - is most advanced throwaway email service that helps you avoid spam and stay safe.
            </p>
        </div>
      </section>

      {/* The Tech Behind */}
      <section className="space-y-8">
        <div className="flex items-center gap-4 mb-4">
            <div className="h-12 w-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 shadow-sm">
                <Icons.Zap className="h-6 w-6" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900">The Tech behind Disposable Email Addresses</h3>
        </div>
        <div className="prose prose-lg prose-slate max-w-none text-gray-600 leading-relaxed space-y-4">
            <p>
            Everyone owns an email address each and every hour, for everything from connecting at work, with business prospects, reaching out to friends and colleagues using the email address as an online passport. Nearly 99% of all apps and services we sign-up today required an email address, likewise to most shoppers loyalty cards, contest and offer entries, and more.
            </p>
            <p>
            We all enjoy having an email address, but getting tons of spam emails each day doesn’t feel comfortable. Furthermore, it’s entirely common for stores to have their databases hacked, leaving your business email address at risk and more likely to end up on spam lists. Still, nothing done online is 100% private. Thus you need to protect your email contact identity and best done using disposable emails address.
            </p>
        </div>
        <SeoChart />
      </section>

      {/* So What Is It */}
      <section className="space-y-8">
        <h3 className="text-3xl font-bold text-gray-900">So, What Is A Disposable Email Address?</h3>
        <div className="prose prose-lg prose-slate max-w-none text-gray-600 leading-relaxed space-y-4">
            <p>
            Recently, I found a bounce rate complex than usual on my latest email blast! I later realized the surge of users (or bots) signing up for my services hiding their real identity using disposable mail addresses.
            </p>
            <p>
            Disposable email address (DEA) technically means an approach where a user’s with a unique email address gets a temporary email address for your current contact. The DEA allow the creation of an email address that passes validity need to sign-up for services and website without having to show your true identity.
            </p>
            <p>
            Disposable emails address if compromised or used in connection with email abuse online, the owner can’t be tied to the abuse and quickly cancel its application without affecting other contacts. With temporary mail, you can you receive your emails from the fake emails in your genuine emails address for a specified time set. The fake email address is simply a through-away email, temporary email set and self-destructs email.
            </p>
        </div>
      </section>

      {/* Why Need Fake Email */}
      <section className="space-y-8">
        <div className="flex items-center gap-4 mb-4">
            <div className="h-12 w-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shadow-sm">
                <Icons.Lock className="h-6 w-6" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900">Why would you need a fake email address?</h3>
        </div>
        <div className="prose prose-lg prose-slate max-w-none text-gray-600 leading-relaxed space-y-4">
            <p>
            You must have noted services such as Amazon Prime, Hulu and Netflix allow limited-time test runs(trials), however, if still determined to use the services all you need is a disposable email address. Technically, you can extend your trial usage using a different email address linked to your original (genuine) after the trial period expires.
            </p>
            <p>
            An offline or online retailer tend to demand an email address to take advantage of their offers, however, this result in an unwanted deluge of spam promotional emails that you could avoid. Temporary email address makes it easy to cut out those irritating messages you are still receiving.
            </p>
            <p>
            Technically, the idea of a temporary email address conjures up with black hat hackers and underworld internet, but there are convincing reason to us fake email services.
            </p>
        </div>
        
        <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 mt-8">
          <h4 className="font-bold text-gray-900 mb-6 text-xl">Legitimate reasons to use a disposable email address:</h4>
          <ul className="space-y-6">
            <li className="flex gap-4">
              <div className="mt-1 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                  <Icons.Check className="h-3 w-3 text-indigo-600" />
              </div>
              <div>
                <strong className="text-gray-900 block text-lg mb-1">Sign-Up For Store Loyalty Card:</strong>
                <span className="text-gray-600">If you don’t want to get promotional emails from the store adverting new products, use a disposable email address instead of your business email address, and you rule out spam emails. If the store gets hacked for email, you real email address won’t get stolen.</span>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="mt-1 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                  <Icons.Check className="h-3 w-3 text-indigo-600" />
              </div>
              <div>
                <strong className="text-gray-900 block text-lg mb-1">Test Your App:</strong>
                <span className="text-gray-600">You just completed coding a web app, and you want to test it comprehensively before releasing it for sale, you can easily get 100 disposable emails, create dummy accounts and test it yourself other than hiring unreliable users online to test the app.</span>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="mt-1 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                  <Icons.Check className="h-3 w-3 text-indigo-600" />
              </div>
              <div>
                <strong className="text-gray-900 block text-lg mb-1">Sign-Up For Double Account With A Web App:</strong>
                <span className="text-gray-600">You need another IFTTT account to program a second Twitter account run for your marketing site. A new account needs a different mail from your default, to rule out managing a new email inbox, get a new disposable email address at temp-mail.org</span>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="mt-1 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                  <Icons.Check className="h-3 w-3 text-indigo-600" />
              </div>
              <div>
                <strong className="text-gray-900 block text-lg mb-1">Eliminate Spam:</strong>
                <span className="text-gray-600">A Disposable email address is a very useful tool against spam, especially, for users who consistently access web forms, forums and discussion groups you can curb spam to an absolute minimum with a disposable email address.</span>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* How to Choose */}
      <section className="space-y-8">
        <h3 className="text-3xl font-bold text-gray-900">How to Choose a Disposable Email?</h3>
        <p className="text-gray-600">The best fake email provider should:</p>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            "Allow users create temporary emails address at the click of a button.",
            "No registration is registration or identity information about the user.",
            "The email address should remain anonymous.",
            "Offer more than one email address (as many as you may want).",
            "Offers temporarily email stored (temporal email inbox at user's disposal).",
            "Straightforward and functional design to get a mundane email.",
            "Provider random account and users can choose an address of choice."
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
              <div className="h-2 w-2 rounded-full bg-indigo-500 mt-2 shrink-0"></div>
              <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
            </div>
          ))}
        </div>
        <p className="mt-4 font-bold text-indigo-600 text-lg">Thus stay spam free and save time with temp-mail.org your favorite email service.</p>
        <GlobalUsageChart />
      </section>

      {/* How to Use */}
      <section className="space-y-8">
        <h3 className="text-3xl font-bold text-gray-900">How to Use Disposable Email Address?</h3>
        <div className="prose prose-lg prose-slate max-w-none text-gray-600 leading-relaxed space-y-4">
            <p>
            Users choose to get disposable email address by creating a new email account with their current email provider’s such as Gmail, but the account comes with many challenges such as you will have to manage emails new account. Users, who opt for free mail services by creating a new account, put up with a new email address.
            </p>
            <p>
            It’d work if you had one email address and a few disposable emails from temp-mail.org and managed one account inbox.
            </p>
            <p>
            The amazing thing about a disposable email address is you can forward directly to your real email account. In case the disposable email address is compromised, and you are suspicious of one of your contacts you can have those emails sent directly to your trash, and for those necessary connections have them sent directly to your real email address inbox.
            </p>
        </div>
      </section>

      {/* Conclusion */}
      <section className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-3xl p-10 shadow-2xl text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]"></div>
        <div className="relative z-10">
            <h3 className="text-3xl font-black text-white mb-6">To Conclude:</h3>
            <p className="leading-relaxed text-indigo-100 text-lg max-w-3xl mx-auto">
            Have a disposable mail address system set up in a fantastic way to make sure when you participate in online wikis, chat rooms, and file sharing services and bulletin boards forums your real identity is never disclosed and never sold to anyone to avoid mail spam with Temp-mail
            </p>
        </div>
      </section>

      {/* Popular Articles List - Dynamic */}
      <section className="border-t border-gray-200 pt-16">
        <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <Icons.File className="text-indigo-600" />
                Popular Articles
            </h3>
            <Link to="/blog" className="text-indigo-600 font-bold hover:underline flex items-center gap-1">
                View All <Icons.ArrowRight className="h-4 w-4" />
            </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogArticles.slice(0, 6).map((article, i) => (
            <Link key={i} to={`/blog/${article.slug}`} className="flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group overflow-hidden h-full">
              <div className="h-40 overflow-hidden relative">
                 <img src={article.thumbnail} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                 <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-gray-900 shadow-sm">
                    {article.category}
                 </div>
              </div>
              <div className="p-5 flex flex-col flex-grow">
                  <h4 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors leading-tight mb-3 line-clamp-2">{article.title}</h4>
                  <p className="text-gray-500 text-sm line-clamp-2 mb-4 flex-grow">{article.description}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-400 mt-auto pt-4 border-t border-gray-50">
                    <Icons.Clock className="h-3 w-3" />
                    <span>{article.readTime}</span>
                  </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Front Page FAQ - Updated */}
      <section className="border-t border-gray-200 pt-16">
        <h3 className="text-3xl font-bold text-gray-900 mb-12 text-center">Frequently Asked Questions</h3>
        <div className="grid md:grid-cols-2 gap-6">
            {[
                { q: "Is temp mail safe to use?", a: "Yes, our temp mail service is highly secure. We use SSL encryption and automatically delete emails to protect your privacy." },
                { q: "How long does a temp email last?", a: "The email address itself is valid until you delete it. Messages are retained for a limited time." },
                { q: "Can I use temp mail for Facebook?", a: "Yes, our service is optimized for social media verification including Facebook, Instagram, and Discord." },
                { q: "Do you sell my data?", a: "Never. We are a privacy-first service. We do not store logs or personal data." },
                { q: "Is it free?", a: "Yes, our standard disposable email service is 100% free to use forever." },
                { q: "Can I recover a deleted email?", a: "No. Once an email address is deleted, it is gone forever to ensure total anonymity." },
                { q: "Do you support file attachments?", a: "Yes, you can receive standard attachments securely. We scan them for malware before you download." },
                { q: "Can I send emails from this address?", a: "To prevent abuse and spam, our service is currently receive-only." },
                { q: "Does it work on mobile?", a: "Absolutely. Our website is fully responsive and works perfectly on all iOS and Android devices." },
                { q: "How do I refresh my inbox?", a: "The inbox refreshes automatically every 10 seconds, or you can click the 'Refresh' button for an instant update." }
            ].map((faq, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-lg">
                        <div className="h-6 w-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                            <Icons.Check className="h-3 w-3 text-emerald-600" />
                        </div>
                        {faq.q}
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed pl-8">{faq.a}</p>
                </div>
            ))}
        </div>
      </section>

      <InternalLinks currentSlug="home" />

    </div>
  </div>
);

// --- Main App Logic ---

const POLLING_INTERVAL = 10000;

const TempMailLogic = () => {
    const [emailAccount, setEmailAccount] = useState(null);
    const [messages, setMessages] = useState([]);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [view, setView] = useState('main'); // main, emailDetail, blogList, blogDetail
    const [loading, setLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    
    const tokenRefreshAttempted = useRef(false);
    const isRequestLocked = useRef(false);
    const loadingIntervalRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();

    // SEO Logic
    const match = location.pathname.match(/^\/topic\/([^\/]+)$/);
    const seoSlug = match ? match[1] : undefined;
    const currentSeoPage = seoSlug ? seoPages.find(p => p.slug === seoSlug) : undefined;
    
    const canonicalUrl = `https://temporaryemails.netlify.app${location.pathname === '/' ? '/' : location.pathname.replace(/\/$/, '')}`;

    useEffect(() => {
        if (location.pathname === '/blog') {
            setView('blogList');
        } else if (location.pathname.startsWith('/topic/') || location.pathname === '/') {
            setView('main');
        }
    }, [location.pathname]);

    const clearLoadingInterval = () => {
        if (loadingIntervalRef.current) {
            clearInterval(loadingIntervalRef.current);
            loadingIntervalRef.current = null;
        }
    };

    const handleGetNewEmail = useCallback(async () => {
        if (isRequestLocked.current) return;
        isRequestLocked.current = true;
        
        clearLoadingInterval();
        setIsCreating(true);
        setErrorMessage('');
        if (!emailAccount) setLoading(true); 
        
        setSelectedMessage(null);

        const messagesList = [
            'Scanning Secure Nodes...',
            'Bypassing Platform Filters...',
            'Initializing Temporary Inbox...',
            'Ready for Anonymous Reception...'
        ];
        let messageIndex = 0;
        setLoadingMessage(messagesList[messageIndex]);
        
        loadingIntervalRef.current = setInterval(() => {
            messageIndex = (messageIndex + 1) % messagesList.length;
            setLoadingMessage(messagesList[messageIndex]);
        }, 1200);

        try {
            const newAccount = await generateNewEmail();
            setEmailAccount(newAccount);
            setMessages([]);
        } catch (err) {
            console.error(err);
            setErrorMessage('Service Unavailable. Retrying...');
            // If it fails, we might want to keep the old account if it exists, or show error
        } finally {
            clearLoadingInterval();
            setLoadingMessage('');
            setLoading(false);
            setIsCreating(false);
            setTimeout(() => { isRequestLocked.current = false; }, 800);
        }
    }, [emailAccount]);

    useEffect(() => {
        handleGetNewEmail();
        return () => clearLoadingInterval();
    }, []);

    const handleApiCall = useCallback(async (apiCall, options = {}) => {
        if (!emailAccount) return;
        try {
            return await apiCall(emailAccount);
        } catch (error) {
            const isAuthError = emailAccount.apiSource === 'mail.tm' && (error.message.includes('401') || error.message.includes('expired')) && emailAccount.refreshToken;
            if (isAuthError && !tokenRefreshAttempted.current) {
                tokenRefreshAttempted.current = true;
                try {
                    const { token, refreshToken } = await refreshMailTmToken(emailAccount.refreshToken);
                    setEmailAccount(prev => prev ? { ...prev, token, refreshToken } : null);
                    return await apiCall({ ...emailAccount, token, refreshToken });
                } catch {
                    if (options.isLoadInbox) handleGetNewEmail();
                } finally {
                    setTimeout(() => { tokenRefreshAttempted.current = false; }, 2000);
                }
            }
        }
    }, [emailAccount, handleGetNewEmail]);
    
    const loadInbox = useCallback(async () => {
        if (!emailAccount || isRefreshing) return;
        setIsRefreshing(true);
        const minLoadTime = new Promise(resolve => setTimeout(resolve, 800));
        const [inboxMessages] = await Promise.all([
            handleApiCall((account) => fetchInbox(account.token, account.apiSource), { isLoadInbox: true }),
            minLoadTime
        ]);
        
        if (inboxMessages) setMessages(inboxMessages);
        setIsRefreshing(false);
    }, [handleApiCall, emailAccount, isRefreshing]);

    useEffect(() => {
        if (emailAccount) {
            const interval = setInterval(loadInbox, POLLING_INTERVAL);
            return () => clearInterval(interval);
        }
    }, [emailAccount, loadInbox]);

    const handleSelectMessage = useCallback(async (message) => {
        setLoading(true);
        setView('emailDetail');
        setSelectedMessage(null);
        const detail = await handleApiCall((account) => fetchMessageDetail(account.token, message.id, account.apiSource));
        if (detail) setSelectedMessage({...detail, address: emailAccount?.address});
        setLoading(false);
    }, [handleApiCall, emailAccount]);
    
    const handleBackToMain = () => {
        navigate('/');
        setView('main');
        setSelectedMessage(null);
        window.scrollTo(0, 0);
    };

    const navigateToBlog = () => {
        navigate('/blog');
        setView('blogList');
        window.scrollTo(0, 0);
    };
    
    const handleBlogClick = (slug) => {
        navigate(`/blog/${slug}`);
        setView('blogDetail');
        window.scrollTo(0, 0);
    };

    // Check for blog detail route
    useEffect(() => {
        const blogMatch = location.pathname.match(/^\/blog\/([^\/]+)$/);
        if (blogMatch) {
            setView('blogDetail');
        } else if (location.pathname === '/blog') {
            setView('blogList');
        } else if (location.pathname.startsWith('/topic/') || location.pathname === '/') {
            setView('main');
        }
    }, [location.pathname]);

    const currentBlogSlug = location.pathname.match(/^\/blog\/([^\/]+)$/)?.[1];
    const currentBlog = currentBlogSlug ? blogArticles.find(b => b.slug === currentBlogSlug) : null;

    const handleDeleteEmail = useCallback(async () => {
        if (!emailAccount || emailAccount.apiSource !== 'mail.tm' || isDeleting || isCreating) return;
        setIsDeleting(true);
        try {
            const success = await handleApiCall((account) => deleteMailTmAccount(account.token, account.id));
            if (success) handleGetNewEmail();
        } finally {
            setIsDeleting(false);
        }
    }, [emailAccount, handleApiCall, handleGetNewEmail, isDeleting, isCreating]);

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Helmet>
                <title>{currentSeoPage ? currentSeoPage.title : "Temp Mail - Safe, Anonymous & Secure Disposable Email | Free Temp Mail"}</title>
                <meta name="description" content={currentSeoPage ? currentSeoPage.description : "Get a free, safe, and secure anonymous temporary email address. Protect your privacy from spam, tracking, and hacking. Our legit temp mail service is 100% private and works for Facebook, Instagram, and Discord. No signup required."} />
                <link rel="canonical" href={canonicalUrl} />
                <meta name="keywords" content={currentSeoPage ? currentSeoPage.keywords.join(', ') : RAW_KEYWORDS.slice(0, 20).join(', ')} />
                {seoPages.filter(p => p.langCode && p.countryCode).map(p => (
                    <link key={p.slug} rel="alternate" hrefLang={`${p.langCode}-${p.countryCode}`} href={`https://temporaryemails.netlify.app/topic/${p.slug}`} />
                ))}
                <link rel="alternate" hrefLang="x-default" href="https://temporaryemails.netlify.app/" />
            </Helmet>
            <Header onNavigateBlog={navigateToBlog} onGoHome={handleBackToMain} />
            <main className="flex-grow">
                {view === 'main' && (
                    <>
                        <Hero 
                            emailAccount={emailAccount}
                            onDeleteEmail={handleDeleteEmail}
                            onNewEmail={handleGetNewEmail}
                            onNavigateBlog={navigateToBlog}
                            isCreating={isCreating}
                            isDeleting={isDeleting}
                            loadingMessage={loadingMessage}
                            seoData={currentSeoPage}
                            errorMessage={errorMessage}
                        />
                        <div className="bg-[#f8f9fa] py-16">
                            <div className="max-w-4xl mx-auto px-4 w-full">
                                <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
                                    <button 
                                        onClick={loadInbox} 
                                        disabled={isRefreshing || isCreating} 
                                        className={`group flex items-center gap-3 px-8 py-4 text-sm font-black text-white bg-indigo-600 rounded-2xl hover:bg-indigo-500 shadow-xl shadow-indigo-600/20 transition-all active:scale-95 disabled:opacity-70`}
                                    >
                                        <Icons.Refresh className={`w-5 h-5 ${isRefreshing ? 'animate-spin-fast text-teal-300' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
                                        <span className="tracking-widest uppercase">{isRefreshing ? 'Syncing...' : 'Refresh'}</span>
                                    </button>
                                </div>

                                <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 mb-8 border border-gray-100 overflow-hidden relative">
                                    {isRefreshing && (
                                        <div className="absolute top-0 left-0 w-full h-1 bg-indigo-100">
                                            <div className="h-full bg-indigo-500 animate-progress-loading"></div>
                                        </div>
                                    )}
                                    <h2 className="text-3xl font-black text-gray-900 mb-8 tracking-tight flex items-center gap-4">
                                        <span className="w-2 h-8 bg-indigo-600 rounded-full"></span>
                                        Inbox
                                    </h2>

                                    <div className="min-h-[450px]">
                                        {loading && !emailAccount ? (
                                            <div className="flex flex-col items-center justify-center h-48 text-center animate-pulse">
                                                <Icons.Spinner className="w-12 h-12 animate-spin text-indigo-500 mb-6" />
                                                <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">{loadingMessage}</p>
                                            </div>
                                        ) : (
                                            <EmailList messages={messages} onSelectMessage={handleSelectMessage} />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <FrontPageContent />

                        <div className="container mx-auto px-4 py-16 border-t border-gray-200">
                            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Global Topics</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {seoPages.slice(0, 12).map(page => (
                                    <Link key={page.slug} to={`/topic/${page.slug}`} className="block p-4 rounded-xl bg-white border border-gray-100 hover:border-indigo-200 hover:shadow-md transition-all group">
                                        <h3 className="text-indigo-600 font-bold text-sm mb-1 group-hover:underline">{page.h1}</h3>
                                        <p className="text-gray-500 text-xs truncate">{page.description}</p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </>
                )}

                {/* SEO Topic Page View - Reusing Main Layout but replacing Hero content */}
                {view === 'main' && currentSeoPage && location.pathname !== '/' && (
                    <div className="container mx-auto px-4 py-16 max-w-4xl">
                        <button onClick={handleBackToMain} className="mb-8 flex items-center gap-2 text-gray-500 hover:text-indigo-600 transition-colors">
                            <Icons.ArrowLeft className="h-4 w-4" />
                            <span>Back to Home</span>
                        </button>
                        
                        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl">
                            <h1 className="text-4xl font-black text-gray-900 mb-6">{currentSeoPage.h1}</h1>
                            <p className="text-xl text-gray-600 mb-8 leading-relaxed">{currentSeoPage.content}</p>
                            
                            {currentSeoPage.faq && (
                                <div className="mt-12">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
                                    <div className="space-y-4">
                                        {currentSeoPage.faq.map((item, idx) => (
                                            <div key={idx} className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                                                <h3 className="font-bold text-indigo-600 mb-2">{item.q}</h3>
                                                <p className="text-gray-600">{item.a}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            <InternalLinks currentSlug={currentSeoPage.slug} />
                        </div>
                    </div>
                )}

                {view === 'emailDetail' && selectedMessage && (
                    <EmailDetail message={selectedMessage} onClose={handleBackToMain} />
                )}

                {view === 'blogList' && (
                    <div className="container mx-auto px-4 py-16">
                        <h1 className="text-4xl font-black text-gray-900 mb-8">Latest Security Insights</h1>
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {blogArticles.map(article => (
                                <div key={article.slug} onClick={() => handleBlogClick(article.slug)} className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group shadow-sm">
                                    <div className="relative h-48 overflow-hidden">
                                        <img src={article.thumbnail} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        <div className="absolute top-4 left-4 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                                            {article.category}
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h2 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-indigo-600 transition-colors">{article.title}</h2>
                                        <p className="text-gray-500 text-sm line-clamp-3 mb-4">{article.description}</p>
                                        <div className="flex items-center justify-between text-xs text-gray-400 border-t border-gray-100 pt-4">
                                            <span>{article.date}</span>
                                            <span className="flex items-center gap-1"><Icons.Clock className="h-3 w-3" /> {article.readTime}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {view === 'blogDetail' && currentBlog && (
                    <div className="container mx-auto px-4 py-16 max-w-4xl">
                        <button onClick={navigateToBlog} className="mb-8 flex items-center gap-2 text-gray-500 hover:text-indigo-600 transition-colors">
                            <Icons.ArrowLeft className="h-4 w-4" />
                            <span>Back to Blog</span>
                        </button>
                        
                        <article className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12">
                            <header className="mb-10 text-center">
                                <div className="flex justify-center mb-6">
                                    <StarRating />
                                </div>
                                <span className="inline-block px-4 py-1 rounded-full bg-indigo-50 text-indigo-600 text-sm font-bold uppercase tracking-wider mb-4 border border-indigo-100">
                                    {currentBlog.category}
                                </span>
                                <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">{currentBlog.title}</h1>
                                <div className="flex items-center justify-center gap-6 text-gray-500 text-sm">
                                    <span className="flex items-center gap-2"><Icons.UserPlus className="h-4 w-4" /> {currentBlog.author}</span>
                                    <span>{currentBlog.date}</span>
                                    <span className="flex items-center gap-2"><Icons.Clock className="h-4 w-4" /> {currentBlog.readTime}</span>
                                </div>
                            </header>

                            <img src={currentBlog.thumbnail} alt={currentBlog.title} className="w-full h-[400px] object-cover rounded-3xl mb-12 shadow-2xl shadow-indigo-500/10" />

                            <div className="prose prose-lg max-w-none prose-indigo text-gray-600">
                                {currentBlog.content}
                            </div>
                            <InternalLinks currentSlug={currentBlog.slug} />
                        </article>
                    </div>
                )}
            </main>
            <Footer onNavigateBlog={navigateToBlog} onGoHome={handleBackToMain} />
        </div>
    );
};

const App = () => {
    return (
        <HelmetProvider>
            <HashRouter>
                <Routes>
                    <Route path="*" element={<TempMailLogic />} />
                </Routes>
            </HashRouter>
        </HelmetProvider>
    );
};

const container = document.getElementById('root');
const root = createRoot(container);

try {
  root.render(<App />);
} catch (error) {
  console.error("React Render Error:", error);
  document.body.innerHTML = `<div style="color:white;padding:20px;background:#ef4444;">
    <h1>React Render Error</h1>
    <pre>${error.toString()}</pre>
    <pre>${error.stack}</pre>
  </div>`;
}
