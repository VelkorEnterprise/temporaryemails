import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation, languages } from '../LanguageContext.tsx';
import { Icons } from './Icons.tsx';

interface FooterProps {
    onNavigateBlog?: () => void;
    onGoHome?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigateBlog, onGoHome }) => {
    const { language, setLanguage, t } = useTranslation();
    const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
    const navigate = useNavigate();

    const linkClasses = "hover:text-indigo-400 transition-colors uppercase font-black tracking-widest text-[10px] cursor-pointer text-left py-1";

    const handleLanguageChange = (langKey: string) => {
        setLanguage(langKey);
        setIsLangMenuOpen(false);
    };

    const handleActionLink = (e: React.MouseEvent) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleTopicClick = (slug: string) => {
        navigate(`/topic/${slug}`);
        window.scrollTo(0, 0);
    };

    return (
        <footer className="bg-[#0f172a] border-t border-white/5">
            <div className="py-12 px-6 border-t border-white/5">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-16 text-gray-500">
                        <div className="flex flex-col gap-2">
                            <h4 className="text-white text-[10px] font-black uppercase tracking-widest mb-4">Service</h4>
                            <button onClick={handleActionLink} className={linkClasses}>PREMIUM</button>
                            <button onClick={handleActionLink} className={linkClasses}>API ACCESS</button>
                            <button onClick={handleActionLink} className={linkClasses}>10 MINUTE MAIL</button>
                            <button onClick={handleActionLink} className={linkClasses}>EMAIL GENERATOR</button>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h4 className="text-white text-[10px] font-black uppercase tracking-widest mb-4">Resources</h4>
                            <button onClick={onNavigateBlog} className={linkClasses}>PRIVACY HUB</button>
                            <button onClick={handleActionLink} className={linkClasses}>KNOWLEDGE BASE</button>
                            <button onClick={handleActionLink} className={linkClasses}>FAQ</button>
                            <button onClick={handleActionLink} className={linkClasses}>BLOG</button>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h4 className="text-white text-[10px] font-black uppercase tracking-widest mb-4">Security</h4>
                            <button onClick={handleActionLink} className={linkClasses}>PRIVACY POLICY</button>
                            <button onClick={handleActionLink} className={linkClasses}>TERMS OF USE</button>
                            <button onClick={handleActionLink} className={linkClasses}>COOKIES</button>
                            <button onClick={handleActionLink} className={linkClasses}>SECURITY AUDIT</button>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h4 className="text-white text-[10px] font-black uppercase tracking-widest mb-4">Company</h4>
                            <button onClick={handleActionLink} className={linkClasses}>CONTACTS</button>
                            <button onClick={handleActionLink} className={linkClasses}>ADVERTISING</button>
                            <button onClick={handleActionLink} className={linkClasses}>ABOUT US</button>
                            <button onClick={handleActionLink} className={linkClasses}>PRESS</button>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h4 className="text-white text-[10px] font-black uppercase tracking-widest mb-4">Mobile</h4>
                            <button onClick={handleActionLink} className={linkClasses}>ANDROID APP</button>
                            <button onClick={handleActionLink} className={linkClasses}>IOS APP</button>
                            <button onClick={handleActionLink} className={linkClasses}>CHROME EXTENSION</button>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h4 className="text-white text-[10px] font-black uppercase tracking-widest mb-4">Global Locations</h4>
                            <button onClick={() => handleTopicClick('temp-mail-usa')} className={linkClasses}>USA</button>
                            <button onClick={() => handleTopicClick('temp-mail-uk')} className={linkClasses}>United Kingdom</button>
                            <button onClick={() => handleTopicClick('temp-mail-canada')} className={linkClasses}>Canada</button>
                            <button onClick={() => handleTopicClick('temp-mail-australia')} className={linkClasses}>Australia</button>
                            <button onClick={() => handleTopicClick('temp-mail-germany')} className={linkClasses}>Germany</button>
                            <button onClick={() => handleTopicClick('temp-mail-japan')} className={linkClasses}>Japan</button>
                            <button onClick={() => handleTopicClick('temp-mail-switzerland')} className={linkClasses}>Switzerland</button>
                            <button onClick={() => handleTopicClick('temp-mail-france')} className={linkClasses}>France</button>
                            <button onClick={() => handleTopicClick('temp-mail-singapore')} className={linkClasses}>Singapore</button>
                            <button onClick={() => handleTopicClick('temp-mail-netherlands')} className={linkClasses}>Netherlands</button>
                        </div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-8 border-t border-white/5">
                        <div className="flex flex-wrap justify-center md:justify-start items-center gap-6 text-[10px] font-black text-gray-600 uppercase tracking-widest">
                            <button onClick={handleActionLink} className="hover:text-teal-400 transition-colors">Temp Number</button>
                            <div className="w-1 h-1 rounded-full bg-gray-800 hidden md:block"></div>
                            <button onClick={handleActionLink} className="hover:text-teal-400 transition-colors">10MinuteMail</button>
                            <div className="w-1 h-1 rounded-full bg-gray-800 hidden md:block"></div>
                            <button onClick={handleActionLink} className="hover:text-teal-400 transition-colors">My Phone Number</button>
                            <div className="w-1 h-1 rounded-full bg-gray-800 hidden md:block"></div>
                            <button onClick={handleActionLink} className="hover:text-teal-400 transition-colors">Burner Identity</button>
                        </div>

                        <div className="relative">
                            <button 
                                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)} 
                                className="bg-white/5 border border-white/10 rounded-xl px-5 py-2 hover:bg-white/10 text-white flex items-center gap-3 uppercase text-[10px] font-black tracking-widest transition-all"
                            >
                                <span className="opacity-60">{String(languages[language] || language)}</span>
                                <Icons.ChevronDown className={`w-3 h-3 transition-transform duration-500 ${isLangMenuOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {isLangMenuOpen && (
                                <div className="absolute bottom-full mb-3 right-0 w-48 bg-[#1a1c23] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-[100]">
                                    <div className="max-h-60 overflow-y-auto no-scrollbar">
                                        {Object.entries(languages).map(([key, name]) => (
                                            <button 
                                                key={key}
                                                onClick={() => handleLanguageChange(key)}
                                                className="block w-full text-left px-5 py-3 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:bg-indigo-600 hover:text-white transition-colors"
                                            >
                                                {String(name)}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    <div className="mt-12 text-center text-[8px] font-black text-gray-700 uppercase tracking-[0.4em]">
                        &copy; 2026 Temp Mail Pro — The World's No.1 Privacy & Anonymity Service — Protected by AES-256 Encryption
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;