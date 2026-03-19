import React, { useState } from 'react';
import { articles } from '../data/articles.tsx';
import { Article } from '../types.ts';
import { Icons } from './Icons.tsx';
import { useTranslation } from '../LanguageContext.tsx';
import AdBanner from './AdBanner.tsx';
import { SeoPageData } from '../data/seoPages.ts';
import StatsChart from './StatsChart.tsx';

const H1: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h1 className="text-4xl md:text-6xl font-black text-white mb-12 tracking-tighter leading-tight text-center">{children}</h1>
);

const H2: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h2 className="text-3xl md:text-4xl font-black text-white mb-8 mt-16 tracking-tighter leading-tight border-l-4 border-indigo-500 pl-6">{children}</h2>
);

const H3: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h3 className="text-2xl font-bold text-indigo-400 mb-4 mt-12 tracking-tight">{children}</h3>
);

const H4: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h4 className="text-xl font-bold text-teal-400 mb-4 mt-10 tracking-tight">{children}</h4>
);

const H5: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h5 className="text-lg font-bold text-gray-200 mb-3 mt-8 tracking-tight uppercase">{children}</h5>
);

const H6: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h6 className="text-base font-bold text-gray-400 mb-2 mt-6 tracking-widest uppercase">{children}</h6>
);

const H7: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="text-sm font-black text-indigo-500/60 mb-2 mt-4 tracking-[0.2em] uppercase">{children}</div>
);

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <H2>{children}</H2>
);

const SubTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <H3>{children}</H3>
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
            q: "Are temp email safe and secure for private use?", 
            a: "Yes, our temporary emails service is 100% safe and secure. We use advanced encryption to protect your data and ensure your complete anonymity. Your temporary email address is generated randomly and is not linked to your personal identity, making it the best disposable email choice." 
        },
        { 
            q: "Is temp email legit for official verifications?", 
            a: "Absolutely. Our temporary email address generator is a legit tool used by millions to protect their privacy. It works perfectly for receiving verification codes from platforms like Facebook, Instagram, and Discord." 
        },
        { 
            q: "How long do temp email last on this platform?", 
            a: "Your temporary email address remains active as long as your session is open. Unlike standard 10 minute mail, we provide more flexibility, allowing you to receive multiple emails without the address expiring prematurely." 
        },
        { 
            q: "Can temp email be tracked by hackers or trackers?", 
            a: "No, our disposable email service is designed to be completely untrackable. We do not log your IP address or any personal information. Your temporary email address is a secure shield for your real identity." 
        },
        { 
            q: "Can I use temporary email for Instagram and TikTok?", 
            a: "Yes, our service is optimized for social media. You can use a temporary email for Instagram, TikTok, Facebook, and Twitter to create accounts without exposing your primary Gmail account." 
        },
        { 
            q: "Can I use temporary email for ChatGPT and AI tools?", 
            a: "Yes, our temporary email addresses work perfectly for ChatGPT, OpenAI, and other AI platforms. It is the best way to test AI tools anonymously." 
        },
        { 
            q: "Can temporary email be traced back to my location?", 
            a: "It is virtually impossible to trace our temporary emails because we use a multi-layered anonymity system. We do not store any logs that could link a temporary email address to your real-world location." 
        },
        { 
            q: "Can I recover a temp email after it is deleted?", 
            a: "For your security, once a temporary email address is deleted, it is gone forever. This ensures that your private messages remain private and cannot be recovered by anyone else." 
        },
        { 
            q: "Can I create a temporary email account in Gmail?", 
            a: "Gmail does not offer a true temporary email service. Our platform provides a superior alternative to a temporary Gmail account, offering instant, no-signup disposable email addresses." 
        },
        { 
            q: "Do temp emails get deleted automatically?", 
            a: "Yes, all temporary emails and their contents are automatically deleted from our secure servers after a short period of inactivity, ensuring your digital footprint remains clean." 
        },
        { 
            q: "Do temp email have password protection?", 
            a: "Our standard temporary email service is password-free for ease of use. Your access is tied to your browser session. For password-protected temporary emails, check our premium options." 
        },
        { 
            q: "How to get temp email instantly?", 
            a: "Simply visit temporaryemails.pages.dev and your new temporary email address will be ready for use immediately. No registration or signup is required." 
        },
        { 
            q: "How do temporary email generator work?", 
            a: "Our generator uses a complex algorithm to create unique, randomized email addresses on high-authority domains. These addresses can receive emails just like a regular inbox but are temporary and anonymous." 
        },
        { 
            q: "How to use temp email for online trials?", 
            a: "When signing up for a trial (like Amazon Prime or Netflix), use a temporary email address instead of your real one. This prevents the service from charging your main account or sending spam after the trial ends." 
        },
        { 
            q: "What is the best temporary email for Discord?", 
            a: "Our service is widely considered the best for Discord because our domains are frequently updated to bypass Discord's disposable email filters." 
        },
        { 
            q: "Is using temporary email illegal in any country?", 
            a: "No, using a temporary email address is a legal and legitimate way to protect your online privacy. It is a standard tool for cybersecurity and anti-spam protection." 
        },
        { 
            q: "Can I send email from temp address?", 
            a: "Currently, our service is optimized for receiving emails to ensure maximum domain reputation and deliverability. Sending emails is restricted to prevent spam abuse." 
        },
        { 
            q: "What is the difference between 10 minute mail and burner mail?", 
            a: "They are essentially the same. 10 minute mail, burner mail, and disposable email all refer to temporary email addresses used for short-term privacy protection." 
        },
        { 
            q: "How to access temp email again after closing the tab?", 
            a: "If you haven't cleared your browser cache, you can often access the same temporary email address by returning to our site. However, we recommend keeping the tab open until you receive your important messages." 
        },
        { 
            q: "Why is my temporary email not working on some sites?", 
            a: "Some websites block known disposable email domains. If one doesn't work, simply click 'Change' to get a new temporary email address with a different domain." 
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
                                <H1>{seoData.h1}</H1>
                                <Paragraph>{seoData.content}</Paragraph>
                                <Paragraph>{seoData.description}</Paragraph>
                            </>
                        ) : (
                            <>
                                <H1>{t('whatIsDisposableEmail') || 'What is the No.1 Safe & Secure Temporary Email Service?'}</H1>
                                
                                <H2>The Ultimate Guide to Disposable Email Addresses</H2>
                                <Paragraph>
                                    {t('disposableEmailDefinition') || 'A disposable email (also known as temporary emails, 10 minute mail, or burner mail) is a free, anonymous, and temporary email address that allows you to receive emails without revealing your real identity. It is the best way to protect your primary inbox from spam, advertising, and hackers.'}
                                </Paragraph>

                                <H3>Why You Need a Legit Temporary Email Generator</H3>
                                <Paragraph>
                                    {t('advancedService') || 'Our advanced temporary emails service provides you with a secure, untrackable, and legit email address that works for Facebook, Instagram, ChatGPT, and Discord. Whether you need a fake email for verification or a temporary gmail alternative, we have you covered.'}
                                </Paragraph>
                            </>
                        )}

                        <H4>{t('techBehindTitle') || 'The Technology Behind Secure Temporary Emails'}</H4>
                        <Paragraph>{t('techBehindP1') || 'We use state-of-the-art encryption and secure cloud infrastructure to generate random, unique email addresses for every user. Our system automatically deletes emails after a set period to ensure your data remains private and cannot be accessed by anyone else.'}</Paragraph>
                        
                        <H5>Advanced Privacy Protocols</H5>
                        <Paragraph>{t('techBehindP2') || 'Unlike other services, our temporary emails is designed to be undetectable and reliable. We constantly monitor our domains to ensure they are not blacklisted, allowing you to sign up for services that typically block disposable email addresses.'}</Paragraph>

                        <H6>Global Infrastructure for Instant Delivery</H6>
                        <Paragraph>Our servers are distributed globally to ensure that your temporary email address receives messages instantly, no matter where you are located. We prioritize speed and reliability for all our users.</Paragraph>

                        <H7>100% Private & Secure Anonymity System</H7>
                        <Paragraph>Every temporary email address generated on our platform is backed by a robust anonymity system that strips away tracking pixels and malicious scripts, keeping your real inbox clean and safe.</Paragraph>

                        {/* Banner moved here from after "What is Disposable..." Title */}
                        <AdBanner scriptSrc="https://grotesquephilosophy.com/bZX.V/sadoGflN0FYNWdcP/-eYm-9/uNZAUElakWPmTaY/3/MlzuUh0/MvjjMFtINnjtcjz/N_T/QRyUNbAh" />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                            {[
                                t('noSignupRequired') || "No Signup Required",
                                "100% Anonymous & Safe",
                                "Works for Facebook & Discord",
                                "Instant Email Delivery",
                                "Secure & Untrackable",
                                "Free Forever",
                                "No.1 Temp Mail Service",
                                "Bypass Verification Instantly"
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
                                    "Using a temporary email address is the single most effective way to prevent spam and protect your digital identity in 2026."
                                </Paragraph>
                                <div className="mt-8 pt-8 border-t border-white/10">
                                    <h5 className="text-white font-bold mb-2">{t('conclusion')}</h5>
                                    <p className="text-sm text-gray-500">{t('conclusionText')}</p>
                                </div>
                            </div>
                            
                            <div className="p-6 bg-teal-500/5 border border-teal-500/10 rounded-2xl">
                                <h4 className="text-teal-400 font-bold mb-4">{t('trendingNow')}</h4>
                                <div className="flex flex-wrap gap-2">
                                    {["#BurnerEmail", "#AntiSpam", "#DevTools", "#PrivacyFirst", "#TempMail", "#DisposableEmail"].map(tag => (
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
                            <H2>{t('popularArticles')}</H2>
                            <p className="text-gray-500">Master your digital privacy with our deep-dive guides on temporary email addresses.</p>
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
                                        referrerPolicy="no-referrer"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/20 to-transparent opacity-90"></div>
                                    <span className="absolute bottom-4 left-4 bg-indigo-600 text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest">
                                        Privacy Expert
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
                        <H2>{t('whatIsDeaTitle') || 'Why Use a Safe Temporary Emails Service?'}</H2>
                        <Paragraph>{t('whatIsDeaP1') || 'Using a safe temporary emails service is crucial for maintaining your online privacy. Unlike a standard email address, a disposable email (DEA) allows you to sign up for websites, apps, and newsletters without exposing your real identity or risking your personal data.'}</Paragraph>
                        <Paragraph>{t('whatIsDeaP2') || 'Our secure temporary emails generator creates a unique, anonymous email address that is valid for a specific period. This "burner mail" receives emails just like a regular inbox but is completely isolated from your personal life, ensuring that spam, phishing attempts, and tracking pixels never reach your primary inbox.'}</Paragraph>
                        <Paragraph>{t('whatIsDeaP3') || 'Whether you are looking for a "10 minute mail" solution or a longer-lasting temporary email, our service offers the perfect balance of convenience and security. We support attachments, verification links, and HTML emails, making it the best temporary emails for Facebook, Instagram, and other social media platforms.'}</Paragraph>
                    </section>

                    <section>
                        <H3>{t('whyFakeEmailTitle') || 'Is Temporary Emails Legit & Legal?'}</H3>
                        
                        <Paragraph>{t('whyFakeEmailP1') || 'Yes, using a temporary email address is completely legal and legitimate. It is a smart way to protect your digital footprint. Many users ask, "Is temporary emails safe?" The answer is yes, provided you use a reputable service like ours that uses SSL encryption and does not log your activity.'}</Paragraph>
                        <Paragraph>{t('whyFakeEmailP2') || 'You might need a fake email generator for various reasons: testing software, downloading a whitepaper, or accessing a service that requires registration but you do not want to use your real email. In these cases, a disposable email is the ethical and safe choice.'}</Paragraph>
                        <Paragraph>{t('whyFakeEmailP3') || 'However, we strictly prohibit the use of our temporary emails service for illegal activities. Our system is designed to protect privacy, not to facilitate crime. We cooperate with law enforcement when necessary to prevent abuse.'}</Paragraph>
                        
                        <div className="mt-8">
                            <H4>{t('legitimateReasonsTitle') || 'Top Reasons to Use Anonymous Email'}</H4>
                            
                            {/* Ad Banner for 'Legitimate reasons' section */}
                            <AdBanner scriptSrc="https://grotesquephilosophy.com/bxXxV/s.dMGKlq0/YUWIcH/aeAm/9Mu/ZqUDlqkKPNTeY/3hMYzTcJ4UOLDRE/toN_jfcnzsNPz/gP4AMzgt" />

                            <ul className="space-y-4">
                                <ListItem><strong>{t('reason1Title') || 'Avoid Spam & Marketing Emails:'}</strong> {t('reason1Body') || 'Keep your real inbox clean by using a burner mail for one-time signups.'}</ListItem>
                                <ListItem><strong>{t('reason2Title') || 'Protect Your Privacy:'}</strong> {t('reason2Body') || 'Prevent companies from tracking your online behavior and selling your data.'}</ListItem>
                                <ListItem><strong>{t('reason3Title') || 'Test New Apps Safely:'}</strong> {t('reason3Body') || 'Developers can use temporary emails to test registration flows without creating multiple real accounts.'}</ListItem>
                                <ListItem><strong>{t('reason4Title') || 'Secure Online Shopping:'}</strong> {t('reason4Body') || 'Use a disposable email for one-time purchases to avoid future marketing spam.'}</ListItem>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <H3>{t('howToChooseTitle') || 'How to Choose the Best Temporary Emails?'}</H3>
                        <Paragraph>{t('howToChooseIntro') || 'Not all temporary email services are created equal. When asking "what is the best temporary emails", look for these key features:'}</Paragraph>
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
                        <Paragraph>{t('howToChooseOutro') || 'Our service ticks all these boxes, making it the premier choice for anyone asking "is temporary emails safe" or looking for a reliable "10 minute mail" alternative.'}</Paragraph>
                    </section>

                    <section>
                        <H3>{t('howToUseTitle')}</H3>
                        <Paragraph>{t('howToUseP1')}</Paragraph>
                        <Paragraph>{t('howToUseP2')}</Paragraph>
                    </section>

                    {/* Ad Banner for 'Why fake email' moved here before the conclusion section as requested */}
                    <AdBanner scriptSrc="https://grotesquephilosophy.com/b.XOV/sCd_GqlP0UYeWAcm/jeRmZ9Mu/ZIU/lskMPlTOYm3SMvzPcH4QN-j/cKtFN/jFcZz/NYzfgJ2_OmAF" />

                    <section className="bg-indigo-600/10 p-10 rounded-[3rem] border border-indigo-500/20">
                        <H2>{t('conclusionTitle')}</H2>
                        <Paragraph>{t('conclusionBody')}</Paragraph>
                    </section>
                </div>

                {/* Testimonials Section */}
                <div className="max-w-6xl mx-auto mb-24 border-t border-white/5 pt-16">
                    <div className="text-center mb-16">
                        <H2>Trusted by Millions Worldwide</H2>
                        <Paragraph>See what our users say about the No.1 temporary email service for privacy and security.</Paragraph>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                name: "Sarah J.",
                                role: "Cybersecurity Analyst",
                                text: "This is hands down the best temporary email service I've used. It's 100% private, requires no signup, and the emails arrive instantly. Perfect for testing apps without exposing my real inbox to spam.",
                                stars: 5
                            },
                            {
                                name: "Michael T.",
                                role: "Software Developer",
                                text: "I use this burner mail generator daily for QA testing. The fact that it bypasses verification filters on major platforms like Discord and Instagram makes it an invaluable tool for my workflow.",
                                stars: 5
                            },
                            {
                                name: "Elena R.",
                                role: "Privacy Advocate",
                                text: "In an age where data brokers sell everything, having a reliable disposable email is crucial. I love that they keep 0 logs and the interface is incredibly easy to use. Highly recommended for anyone who values anonymity.",
                                stars: 5
                            }
                        ].map((testimonial, idx) => (
                            <div key={idx} itemScope itemType="https://schema.org/Review" className="glass-panel p-8 rounded-3xl border border-white/10 hover:border-indigo-500/30 transition-all flex flex-col">
                                <div itemProp="itemReviewed" itemScope itemType="https://schema.org/SoftwareApplication">
                                    <meta itemProp="name" content="Temporary Emails" />
                                </div>
                                <div className="flex text-yellow-500 mb-6" itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
                                    <meta itemProp="ratingValue" content={testimonial.stars.toString()} />
                                    <meta itemProp="bestRating" content="5" />
                                    {[...Array(testimonial.stars)].map((_, i) => (
                                        <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-gray-300 italic mb-8 flex-1 text-lg" itemProp="reviewBody">"{testimonial.text}"</p>
                                <div className="flex items-center gap-4 mt-auto" itemProp="author" itemScope itemType="https://schema.org/Person">
                                    <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold text-xl border border-indigo-500/30">
                                        {testimonial.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="text-white font-bold" itemProp="name">{testimonial.name}</div>
                                        <div className="text-xs text-indigo-400 uppercase tracking-widest">{testimonial.role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="max-w-4xl mx-auto mb-24">
                    <H2>{t('faqTitle')}</H2>
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

                {/* Global Presence Section */}
                <div className="border-t border-white/5 pt-24">
                    <H2>Global Presence: No.1 Temporary Emails Worldwide</H2>
                    <Paragraph>We are committed to providing the <strong>best temporary email service</strong> in every corner of the globe. Our platform is localized for over 65 countries, ensuring that you can protect your privacy in your native language. <strong>No signup required</strong>, 100% private, and 100% secure.</Paragraph>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-12">
                        {[
                            "USA", "UK", "Canada", "Australia", "Germany", "France", "Japan", "South Korea", "India", "Brazil", "Mexico", "Italy", "Spain", "Russia", "China", "UAE", "Saudi Arabia", "South Africa", "Netherlands", "Switzerland", "Sweden", "Norway", "Denmark", "Finland", "Ireland", "Belgium", "Austria", "Portugal", "Greece", "Poland", "Turkey", "Singapore"
                        ].map(country => (
                            <div key={country} className="p-4 bg-white/5 rounded-xl border border-white/10 text-center hover:bg-indigo-500/10 transition-all cursor-pointer group">
                                <span className="text-sm font-bold text-gray-300 group-hover:text-white transition-colors">{country}</span>
                            </div>
                        ))}
                    </div>
                    
                    <div className="mt-12 text-center">
                        <H7>Helping Millions Stay Anonymous Daily</H7>
                        <div className="flex flex-wrap justify-center gap-8 mt-6">
                            <div className="text-center">
                                <div className="text-2xl font-black text-white">12M+</div>
                                <div className="text-[10px] text-gray-500 uppercase tracking-widest">Daily Users</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-black text-white">100%</div>
                                <div className="text-[10px] text-gray-500 uppercase tracking-widest">Private</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-black text-white">0</div>
                                <div className="text-[10px] text-gray-500 uppercase tracking-widest">Logs Kept</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-black text-white">100%</div>
                                <div className="text-[10px] text-gray-500 uppercase tracking-widest">No Signup Required</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InfoDump;