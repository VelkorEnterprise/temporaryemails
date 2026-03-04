import React, { useState } from 'react';
import { EmailAccount } from '../types.ts';
import { Icons } from './Icons.tsx';
import { useTranslation } from '../LanguageContext.tsx';
import { SeoPageData } from '../data/seoPages.ts';

interface HeroProps {
    emailAccount: EmailAccount | null;
    onDeleteEmail: () => void;
    onNewEmail?: () => void;
    onNavigateBlog?: () => void;
    isCreating: boolean;
    isDeleting: boolean;
    loadingMessage: string;
    seoData?: SeoPageData;
}

const Hero: React.FC<HeroProps> = ({ emailAccount, onDeleteEmail, onNewEmail, onNavigateBlog, isCreating, isDeleting, loadingMessage, seoData }) => {
    const [copySuccess, setCopySuccess] = useState('');
    const { t } = useTranslation();

    const handleCopyEmail = () => {
        if (emailAccount) {
            navigator.clipboard.writeText(emailAccount.address);
            setCopySuccess(t('copied'));
            setTimeout(() => setCopySuccess(''), 2000);
        }
    };

    return (
        <div className="relative overflow-hidden pt-12 pb-10 px-4">
            <div className="max-w-4xl mx-auto text-center relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-[9px] font-black uppercase tracking-[0.2em] mb-6">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                    </span>
                    {t('liveAnonymitySystem') || '100% Safe & Secure Temp Mail'}
                </div>

                <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-8 tracking-tighter leading-[1.1]">
                    {seoData ? (
                        <>
                            <span className="block mb-2">{seoData.h1}</span>
                        </>
                    ) : (
                        <>
                            {t('yourTemporary') || 'Your Secure & Anonymous'} <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-indigo-400 to-indigo-600">
                                {t('emailAddress') || 'Temporary Email Address'}
                            </span>
                        </>
                    )}
                </h1>

                <div className="glass-panel rounded-[2rem] p-4 md:p-8 glow-shadow mb-8 relative group border border-white/10 max-w-2xl mx-auto">
                    <div className="relative bg-[#0f172a]/60 rounded-[1.5rem] p-6 md:p-10 flex flex-col items-center justify-center gap-6 border border-white/5 overflow-hidden">
                        {/* Decorative background glow */}
                        <div className="absolute -top-24 -left-24 w-48 h-48 bg-indigo-600/10 blur-[80px] pointer-events-none"></div>
                        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-teal-600/10 blur-[80px] pointer-events-none"></div>

                        <div className="text-center w-full relative z-10">
                            <label className="text-[9px] uppercase tracking-[0.4em] text-indigo-400/60 font-black mb-4 block">{t('activeBurnerId') || 'Your Safe & Untrackable Email ID'}</label>
                            <div className="flex items-center justify-center min-h-[3rem] px-2">
                                <span className={`text-xl md:text-2xl lg:text-3xl font-mono font-bold break-all tracking-tight transition-all duration-300 ${isCreating ? 'text-indigo-400/40 animate-pulse' : 'text-white'}`}>
                                    {isCreating ? (loadingMessage || t('loading')) : (emailAccount?.address || t('loading'))}
                                </span>
                            </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md relative z-10">
                            <button 
                                onClick={handleCopyEmail} 
                                disabled={!emailAccount || isCreating}
                                className="flex-1 bg-indigo-600 hover:bg-indigo-500 transition-all duration-300 text-white font-black py-4 px-6 rounded-xl flex items-center justify-center gap-3 transform active:scale-95 disabled:opacity-30 shadow-lg shadow-indigo-600/20 border border-white/10"
                            >
                                <Icons.Copy className="w-4 h-4"/>
                                <span className="uppercase tracking-widest text-[10px]">{copySuccess || t('copy')}</span>
                            </button>
                            {onNewEmail && (
                                <button 
                                    onClick={onNewEmail} 
                                    disabled={isCreating || isDeleting}
                                    className="flex-1 bg-white/5 hover:bg-white/10 text-white font-black py-4 px-6 rounded-xl flex items-center justify-center gap-3 transition-all transform active:scale-95 disabled:opacity-50 border border-white/10 backdrop-blur-sm"
                                >
                                    {isCreating ? <Icons.Spinner className="w-4 h-4 animate-spin"/> : <Icons.Change className="w-4 h-4"/>}
                                    <span className="uppercase tracking-widest text-[10px]">{t('change')}</span>
                                </button>
                            )}
                        </div>
                    </div>
                    
                    <div className="mt-8 text-gray-500 text-xs md:text-sm leading-relaxed max-w-xl mx-auto italic font-medium opacity-60 px-2">
                        "{t('heroQuote')}"
                    </div>
                </div>

                <div className="flex flex-wrap justify-center gap-4 mb-10">
                    <div className="flex items-center gap-2 bg-teal-500/5 border border-teal-500/10 px-4 py-2 rounded-full">
                        <span className="text-teal-400 text-xs">📲</span>
                        <span className="text-[9px] font-black text-teal-400/80 uppercase tracking-widest">{t('tempNumberPlus')}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/5 border border-white/5 px-4 py-2 rounded-full">
                        <span className="text-indigo-400 text-xs">✓</span>
                        <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">{t('noSignupRequired')}</span>
                    </div>
                </div>

                <button 
                    onClick={onNavigateBlog}
                    className="inline-flex items-center gap-3 px-8 py-4 bg-indigo-600/5 hover:bg-indigo-600/10 text-indigo-400 border border-indigo-600/20 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all group"
                >
                    <Icons.Inbox className="w-4 h-4" />
                    {t('explorePrivacyHub')}
                    <Icons.Back className="w-3 h-3 rotate-180 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
    );
};

export default Hero;