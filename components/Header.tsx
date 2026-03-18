import React from 'react';
import { Icons } from './Icons.tsx';
import { useTranslation } from '../LanguageContext.tsx';

interface HeaderProps {
    onNavigateBlog?: () => void;
    onGoHome?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigateBlog, onGoHome }) => {
    const { t } = useTranslation();
    
    const handleAction = (e: React.MouseEvent) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <header className="flex-shrink-0 z-50 sticky top-0 bg-[#0f172a]/90 backdrop-blur-xl border-b border-white/5">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <div 
                    className="flex items-center space-x-4 group cursor-pointer" 
                    onClick={onGoHome}
                >
                    <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-600/20 transform group-hover:rotate-12 transition-all duration-500">
                        <Icons.Logo className="w-8 h-8 text-white"/>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-black text-3xl tracking-tighter text-white leading-none">
                            TEMP<span className="text-indigo-500">MAIL</span>
                        </span>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-teal-400 font-black">Secure Burner ID</span>
                    </div>
                </div>
                
                <nav className="hidden lg:flex items-center space-x-8 text-xs font-black uppercase tracking-widest text-gray-500">
                    <button onClick={onNavigateBlog} className="hover:text-white transition-colors uppercase">{t('privacyHub')}</button>
                    <button onClick={handleAction} className="hover:text-white transition-colors uppercase">{t('premiumApi')}</button>
                    <button onClick={handleAction} className="hover:text-white transition-colors uppercase">{t('10MinuteMail')}</button>
                    <div onClick={handleAction} className="flex items-center gap-2 px-4 py-2 bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 rounded-full cursor-pointer hover:bg-indigo-600 hover:text-white transition-all">
                        <Icons.Logo className="w-3 h-3"/>
                        <span>{t('premium')}</span>
                    </div>
                </nav>
                
                <div className="lg:hidden text-white cursor-pointer" onClick={onNavigateBlog}>
                    <Icons.Logo className="w-6 h-6 rotate-90" />
                </div>
            </div>
            
            <div className="bg-indigo-600/5 border-y border-white/5 py-2 overflow-hidden">
                <div className="flex whitespace-nowrap animate-marquee items-center text-[10px] font-black text-indigo-300/60 uppercase tracking-[0.2em] gap-12 px-4">
                    <span className="flex items-center gap-2">✓ {t('helpedPeopleToday')}</span>
                    <span className="flex items-center gap-2">{t('noSignupRequired')}</span>
                    <span className="flex items-center gap-2">{t('freeToUseForever')}</span>
                    <span className="flex items-center gap-2">{t('gmailAlternative')}</span>
                    <span className="flex items-center gap-2">{t('burnerServiceNo1')}</span>
                </div>
            </div>
            <style>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    display: inline-flex;
                    animation: marquee 40s linear infinite;
                }
            `}</style>
        </header>
    );
};

export default Header;