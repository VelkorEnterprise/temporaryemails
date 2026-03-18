import React, { useState } from 'react';
import { articles } from '../data/articles.tsx';
import { Article } from '../types.ts';
import { Icons } from './Icons.tsx';
import { useTranslation } from '../LanguageContext.tsx';
import AdBanner from './AdBanner.tsx';
import { SeoPageData } from '../data/seoPages.ts';
import StatsChart from './StatsChart.tsx';

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h2 className="text-3xl md:text-4xl font-black text-white mb-8 tracking-tighter leading-tight">{children}</h2>
);

const SubTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h3 className="text-2xl font-bold text-indigo-400 mb-4 mt-12 tracking-tight">{children}</h3>
);

const Paragraph: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <p className="text-gray-400 mb-6 leading-relaxed text-lg font-normal">{children}</p>
);

const ListItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <li className="flex items-start mb-6 group">
        <div className="mr-5 mt-1 bg-indigo-500/20 text-indigo-400 p-2 rounded-xl group-hover:bg-indigo-500 group-hover:text-white transition-all">
            <Icons.Logo className="w-4 h-4" />
        </div>
        <span className="text-gray-300 flex-1 text-lg leading-relaxed">{children}</span>
    </li>
);

interface InfoDumpProps {
    onSelectArticle: (article: Article) => void;
    onNavigateBlog: () => void;
    seoData?: SeoPageData;
}

const InfoDump: React.FC<InfoDumpProps> = ({ onSelectArticle, onNavigateBlog, seoData }) => {
    const { t } = useTranslation();
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

    const faqItems = [
        { 
            q: "Is temp mail safe and secure?", 
            a: "Yes, our temp mail service is 100% safe and secure. We use advanced encryption to protect your data and ensure your complete anonymity. Your temporary email address is generated randomly and is not linked to your personal identity." 
        },
        { 
            q: "How long does temp mail last?", 
            a: "Your temporary email address remains active until you choose to delete it or your session expires. Unlike standard 10 minute mail, we give you more time to receive your verification codes and important messages." 
        },
        { 
            q: "Can temp mail be tracked?", 
            a: "No, our disposable email service is designed to be completely untrackable. We do not log your IP address, location, or device information. Your privacy is our top priority." 
        },
        { 
            q: "Is using temp mail illegal?", 
            a: "No, using a temporary email address is completely legal. It is a legitimate tool for protecting your online privacy, avoiding spam, and testing websites without revealing your personal information." 
        },
        { 
            q: "Does temp mail work for Facebook, Instagram, and Discord?", 
            a: "Yes, our premium domains are optimized to work with most major platforms including Facebook, Instagram, Discord, Twitter, and ChatGPT. We regularly update our domains to ensure high deliverability." 
        },
        { 
            q: "How to recover a deleted temp mail?", 
            a: "For security reasons, once a temporary email address is deleted, it cannot be recovered. This ensures that no one else can ever access your private messages after you are done with them." 
        },
        { 
            q: "Can I send emails from a temp mail address?", 
            a: "Currently, our service is designed primarily for receiving emails to protect your identity. Sending emails is disabled to prevent abuse and ensure the reputation of our domains remains high." 
        },
        { 
            q: "What is the difference between temp mail and burner mail?", 
            a: "Temp mail, burner mail, disposable email, and 10 minute mail are all terms for the same service: a temporary email address used to protect your primary inbox from spam and tracking." 
        },
        {
            q: "Where is temp mail password?",
            a: "Our temp mail service is password-free for your convenience. Access is granted via your unique session token in the browser. If you need password protection, check our premium features."
        },
        {
            q: "Why is temp mail not working?",
            a: "If temp mail is not working, it may be due to a network issue or the domain being blocked by a specific service. Try refreshing the page to get a new email address with a different domain."
        },
        {
            q: "Can temp mail be traced?",
            a: "It is extremely difficult to trace a temp mail back to a specific user because we do not store personal logs. However, illegal activities should never be conducted using any email service."
        },
        {
            q: "How to create a temporary email account in Gmail?",
            a: "You cannot create a true 'temporary' account directly inside Gmail without phone verification. Our service provides a faster, anonymous alternative that works instantly without any signup."
        },
        {
            q: "What temp mail works for Discord?",
            a: "Our service is optimized for Discord verification. If one domain is blocked, simply click 'Change' or 'Refresh' to generate a new address that will work."
        },
        {
            q: "Is temp mail a virus?",
            a: "No, temp mail itself is not a virus. It is a website service. However, be cautious of opening attachments from unknown senders, just as you would with your regular email."
        },
        {
            q: "How do I find my temp mail?",
            a: "Your temp mail address is displayed prominently at the top of our homepage. If you navigate away, simply return to the home page to see your active inbox."
        }
    ];

    return (
        <div className="bg-[#0f172a] text-gray-400 py-24 border-t border-white/5 relative">
            <div className="max-w-6xl mx-auto px-6">
                
                {/* Introduction Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
                    <div className="lg:col-span-8">
                        {seoData ? (
                            <>
                                <SectionTitle>{seoData.h1}</SectionTitle>
                                <Paragraph>{seoData.content}</Paragraph>
                                <Paragraph>{seoData.description}</Paragraph>
                            </>
                        ) : (
                            <>
                                <SectionTitle>{t('whatIsDisposableEmail') || 'What is Safe & Secure Disposable Email?'}</SectionTitle>
                                
                                <Paragraph>
                                    {t('disposableEmailDefinition') || 'A disposable email (also known as temp mail, 10 minute mail, or burner mail) is a free, anonymous, and temporary email address that allows you to receive emails without revealing your real identity. It is the best way to protect your primary inbox from spam, advertising, and hackers.'}
                                </Paragraph>

                                <Paragraph>
                                    {t('advancedService') || 'Our advanced temp mail service provides you with a secure, untrackable, and legit email address that works for Facebook, Instagram, ChatGPT, and Discord. Whether you need a fake email for verification or a temporary gmail alternative, we have you covered.'}
                                </Paragraph>
                            </>
                        )}

                        <SubTitle>{t('techBehindTitle') || 'The Technology Behind Secure Temp Mail'}</SubTitle>
                        <Paragraph>{t('techBehindP1') || 'We use state-of-the-art encryption and secure cloud infrastructure to generate random, unique email addresses for every user. Our system automatically deletes emails after a set period to ensure your data remains private and cannot be accessed by anyone else.'}</Paragraph>
                        <Paragraph>{t('techBehindP2') || 'Unlike other services, our temp mail is designed to be undetectable and reliable. We constantly monitor our domains to ensure they are not blacklisted, allowing you to sign up for services that typically block disposable email addresses.'}</Paragraph>

                        {/* Banner moved here from after "What is Disposable..." Title */}
                        <AdBanner scriptSrc="https://grotesquephilosophy.com/bZX.V/sadoGflN0FYNWdcP/-eYm-9/uNZAUElakWPmTaY/3/MlzuUh0/MvjjMFtINnjtcjz/N_T/QRyUNbAh" />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                            {[
                                t('noSignupRequired') || "No Signup Required",
                                "100% Anonymous & Safe",
                                "Works for Facebook & Discord",
                                "Instant Email Delivery",
                                "Secure & Untrackable",
                                "Free Forever"
                            ].map((text, i) => (
                                <div key={i} className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/10 hover:border-indigo-500/30 transition-colors">
                                    <div className="w-2 h-2 rounded-full bg-teal-400"></div>
                                    <span className="text-sm font-bold text-gray-300">{text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-4">
                        <div className="sticky top-28 space-y-8">
                            <StatsChart />

                            <div className="glass-panel p-8 rounded-3xl border border-white/10 glow-shadow bg-gradient-to-br from-indigo-600/10 to-transparent">
                                <h4 className="text-white font-black uppercase tracking-widest text-xs mb-6">{t('expertVerdict')}</h4>
                                <Paragraph>
                                    "Have a disposable mail address system set up in a fantastic way to make sure when you participate in online services your real identity is never disclosed."
                                </Paragraph>
                                <div className="mt-8 pt-8 border-t border-white/10">
                                    <h5 className="text-white font-bold mb-2">{t('conclusion')}</h5>
                                    <p className="text-sm text-gray-500">{t('conclusionText')}</p>
                                </div>
                            </div>
                            
                            <div className="p-6 bg-teal-500/5 border border-teal-500/10 rounded-2xl">
                                <h4 className="text-teal-400 font-bold mb-4">{t('trendingNow')}</h4>
                                <div className="flex flex-wrap gap-2">
                                    {["#BurnerEmail", "#AntiSpam", "#DevTools", "#PrivacyFirst"].map(tag => (
                                        <span key={tag} className="text-[10px] font-black text-teal-400/60 uppercase tracking-widest">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Popular Articles Grid */}
                <div className="mb-24">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                        <div>
                            <h2 className="text-4xl font-black text-white tracking-tight mb-2">{t('popularArticles')}</h2>
                            <p className="text-gray-500">Master your digital privacy with our deep-dive guides.</p>
                        </div>
                        <button onClick={onNavigateBlog} className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors flex items-center gap-2">
                            {t('viewAllKnowledgeBase')} <Icons.Logo className="w-4 h-4 rotate-90" />
                        </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {articles.slice(0, 6).map((article) => (
                            <div
                                key={article.slug}
                                onClick={() => onSelectArticle(article)}
                                className="group glass-panel rounded-3xl overflow-hidden cursor-pointer flex flex-col hover:scale-[1.02] transition-transform duration-500"
                            >
                                <div className="h-56 overflow-hidden relative">
                                    <img 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                        src={article.thumbnail} 
                                        alt={article.title} 
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/20 to-transparent opacity-90"></div>
                                    <span className="absolute bottom-4 left-4 bg-indigo-600 text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest">
                                        Privacy
                                    </span>
                                </div>
                                <div className="p-8">
                                    <h3 className="text-xl font-black text-white mb-4 group-hover:text-indigo-400 transition-colors leading-tight line-clamp-2">
                                        {article.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 line-clamp-2 mb-6 leading-relaxed">{article.description}</p>
                                    <div className="flex items-center text-[10px] font-black text-gray-600 uppercase tracking-widest gap-4 mt-auto">
                                        <span>{article.date}</span>
                                        <div className="w-1 h-1 rounded-full bg-gray-700"></div>
                                        <span>{article.author}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Extended Information Section */}
                <div className="max-w-4xl mx-auto space-y-16 mb-24 border-t border-white/5 pt-16">
                    <section>
                        <SectionTitle>{t('whatIsDeaTitle') || 'Why Use a Safe Temp Mail Service?'}</SectionTitle>
                        <Paragraph>{t('whatIsDeaP1') || 'Using a safe temp mail service is crucial for maintaining your online privacy. Unlike a standard email address, a disposable email (DEA) allows you to sign up for websites, apps, and newsletters without exposing your real identity or risking your personal data.'}</Paragraph>
                        <Paragraph>{t('whatIsDeaP2') || 'Our secure temp mail generator creates a unique, anonymous email address that is valid for a specific period. This "burner mail" receives emails just like a regular inbox but is completely isolated from your personal life, ensuring that spam, phishing attempts, and tracking pixels never reach your primary inbox.'}</Paragraph>
                        <Paragraph>{t('whatIsDeaP3') || 'Whether you are looking for a "10 minute mail" solution or a longer-lasting temporary email, our service offers the perfect balance of convenience and security. We support attachments, verification links, and HTML emails, making it the best temp mail for Facebook, Instagram, and other social media platforms.'}</Paragraph>
                    </section>

                    <section>
                        <SubTitle>{t('whyFakeEmailTitle') || 'Is Temp Mail Legit & Legal?'}</SubTitle>
                        
                        <Paragraph>{t('whyFakeEmailP1') || 'Yes, using a temporary email address is completely legal and legitimate. It is a smart way to protect your digital footprint. Many users ask, "Is temp mail safe?" The answer is yes, provided you use a reputable service like ours that uses SSL encryption and does not log your activity.'}</Paragraph>
                        <Paragraph>{t('whyFakeEmailP2') || 'You might need a fake email generator for various reasons: testing software, downloading a whitepaper, or accessing a service that requires registration but you do not want to use your real email. In these cases, a disposable email is the ethical and safe choice.'}</Paragraph>
                        <Paragraph>{t('whyFakeEmailP3') || 'However, we strictly prohibit the use of our temp mail service for illegal activities. Our system is designed to protect privacy, not to facilitate crime. We cooperate with law enforcement when necessary to prevent abuse.'}</Paragraph>
                        
                        <div className="mt-8">
                            <h4 className="text-xl font-bold text-teal-400 mb-6">{t('legitimateReasonsTitle') || 'Top Reasons to Use Anonymous Email'}</h4>
                            
                            {/* Ad Banner for 'Legitimate reasons' section */}
                            <AdBanner scriptSrc="https://grotesquephilosophy.com/bxXxV/s.dMGKlq0/YUWIcH/aeAm/9Mu/ZqUDlqkKPNTeY/3hMYzTcJ4UOLDRE/toN_jfcnzsNPz/gP4AMzgt" />

                            <ul className="space-y-4">
                                <ListItem><strong>{t('reason1Title') || 'Avoid Spam & Marketing Emails:'}</strong> {t('reason1Body') || 'Keep your real inbox clean by using a burner mail for one-time signups.'}</ListItem>
                                <ListItem><strong>{t('reason2Title') || 'Protect Your Privacy:'}</strong> {t('reason2Body') || 'Prevent companies from tracking your online behavior and selling your data.'}</ListItem>
                                <ListItem><strong>{t('reason3Title') || 'Test New Apps Safely:'}</strong> {t('reason3Body') || 'Developers can use temp mail to test registration flows without creating multiple real accounts.'}</ListItem>
                                <ListItem><strong>{t('reason4Title') || 'Secure Online Shopping:'}</strong> {t('reason4Body') || 'Use a disposable email for one-time purchases to avoid future marketing spam.'}</ListItem>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <SubTitle>{t('howToChooseTitle') || 'How to Choose the Best Temp Mail?'}</SubTitle>
                        <Paragraph>{t('howToChooseIntro') || 'Not all temporary email services are created equal. When asking "what is the best temp mail", look for these key features:'}</Paragraph>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                            {[
                                t('howToChooseL1') || "High Reputation Domains", 
                                t('howToChooseL2') || "SSL/TLS Encryption", 
                                t('howToChooseL3') || "No Personal Data Required", 
                                t('howToChooseL4') || "Fast Email Delivery", 
                                t('howToChooseL5') || "Mobile Friendly Interface", 
                                t('howToChooseL6') || "Works with Major Sites", 
                                t('howToChooseL7') || "100% Free Service"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                                    <span className="text-indigo-400 font-black">#0{i+1}</span>
                                    <span className="text-sm text-gray-400">{item}</span>
                                </div>
                            ))}
                        </ul>
                        <Paragraph>{t('howToChooseOutro') || 'Our service ticks all these boxes, making it the premier choice for anyone asking "is temp mail safe" or looking for a reliable "10 minute mail" alternative.'}</Paragraph>
                    </section>

                    <section>
                        <SubTitle>{t('howToUseTitle')}</SubTitle>
                        <Paragraph>{t('howToUseP1')}</Paragraph>
                        <Paragraph>{t('howToUseP2')}</Paragraph>
                    </section>

                    {/* Ad Banner for 'Why fake email' moved here before the conclusion section as requested */}
                    <AdBanner scriptSrc="https://grotesquephilosophy.com/b.XOV/sCd_GqlP0UYeWAcm/jeRmZ9Mu/ZIU/lskMPlTOYm3SMvzPcH4QN-j/cKtFN/jFcZz/NYzfgJ2_OmAF" />

                    <section className="bg-indigo-600/10 p-10 rounded-[3rem] border border-indigo-500/20">
                        <h3 className="text-3xl font-black text-white mb-6 tracking-tight">{t('conclusionTitle')}</h3>
                        <Paragraph>{t('conclusionBody')}</Paragraph>
                    </section>
                </div>

                {/* FAQ Section */}
                <div className="max-w-4xl mx-auto">
                    <SectionTitle>{t('faqTitle')}</SectionTitle>
                    <div className="space-y-4">
                        {faqItems.map((item, index) => (
                            <div key={index} className="glass-panel rounded-2xl overflow-hidden transition-all">
                                <button
                                    onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                                    className="w-full flex justify-between items-center text-left p-6 md:p-8 focus:outline-none"
                                >
                                    <h3 className="font-black text-lg text-white pr-8 tracking-tight">{item.q}</h3>
                                    <div className={`p-2 rounded-full border border-white/10 transition-transform duration-500 ${openFaqIndex === index ? 'rotate-180 bg-indigo-500/20 text-indigo-400' : 'text-gray-500'}`}>
                                        <Icons.ChevronDown className="w-5 h-5" />
                                    </div>
                                </button>
                                <div
                                    className={`transition-all duration-500 ease-in-out overflow-hidden ${openFaqIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                                >
                                    <div className="px-8 pb-8 text-gray-400 leading-relaxed text-lg">
                                        {item.a}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InfoDump;