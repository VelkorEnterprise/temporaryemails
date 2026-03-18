import React, { useState, useEffect, useCallback, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Header from './components/Header.tsx';
import Hero from './components/Hero.tsx';
import EmailList from './components/EmailList.tsx';
import EmailDetail from './components/EmailDetail.tsx';
import Footer from './components/Footer.tsx';
import InfoDump from './components/InfoDump.tsx';
import ArticleView from './components/ArticleView.tsx';
import BlogList from './components/BlogList.tsx';
import BlogDetailView from './components/BlogDetailView.tsx';
import { Icons } from './components/Icons.tsx';
import { useInterval } from './useInterval.ts';
import { useTranslation } from './LanguageContext.tsx';
import { 
    generateNewEmail, 
    fetchInbox, 
    fetchMessageDetail,
    refreshMailTmToken,
    deleteMailTmAccount
} from './services/emailService.ts';
import { EmailAccount, Message, MessageDetail, Article } from './types.ts';
import { blogArticles } from './data/blogArticles.tsx';
import { seoPages } from './data/seoPages.ts';

const POLLING_INTERVAL = 10000;

const TemporaryEmailsLogic: React.FC = () => {
    const [emailAccount, setEmailAccount] = useState<EmailAccount | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [selectedMessage, setSelectedMessage] = useState<MessageDetail | null>(null);
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
    const [selectedBlog, setSelectedBlog] = useState<typeof blogArticles[0] | null>(null);
    const [view, setView] = useState<'main' | 'emailDetail' | 'articleDetail' | 'blogList' | 'blogDetail'>('main');
    
    const [loading, setLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loadingMessage, setLoadingMessage] = useState<string>('');
    
    const tokenRefreshAttempted = useRef(false);
    const isRequestLocked = useRef(false);
    const loadingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const { t } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();

    // SEO Logic
    const match = location.pathname.match(/^\/topic\/([^\/]+)$/);
    const seoSlug = match ? match[1] : undefined;
    const currentSeoPage = seoSlug ? seoPages.find(p => p.slug === seoSlug) : undefined;
    
    const canonicalUrl = `https://temporaryemails.pages.dev${location.pathname === '/' ? '/' : location.pathname.replace(/\/$/, '')}`;

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
        if (!emailAccount) setLoading(true); 
        
        setError(null);
        setSelectedMessage(null);

        const messagesList = [
            t('loadingMsg1') || 'Scanning Secure Nodes...',
            t('loadingMsg2') || 'Bypassing Platform Filters...',
            t('loadingMsg3') || 'Initializing Temporary Inbox...',
            t('loadingMsg4') || 'Ready for Anonymous Reception...'
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
            setError(null); 
        } catch (err: any) {
            setError(err.message || 'Service busy. Please try again in a moment.');
        } finally {
            clearLoadingInterval();
            setLoadingMessage('');
            setLoading(false);
            setIsCreating(false);
            setTimeout(() => { isRequestLocked.current = false; }, 800);
        }
    }, [t, emailAccount]);

    useEffect(() => {
        handleGetNewEmail();
        return () => clearLoadingInterval();
    }, [handleGetNewEmail]);

    const handleApiCall = useCallback(async <T,>(apiCall: (account: EmailAccount) => Promise<T>, options: { isLoadInbox?: boolean } = {}): Promise<T | undefined> => {
        if (!emailAccount) return;
        try {
            return await apiCall(emailAccount);
        } catch (error: any) {
            const isAuthError = emailAccount.apiSource === 'mail.tm' && (error.message.includes('401') || error.message.includes('expired')) && emailAccount.refreshToken;
            if (isAuthError && !tokenRefreshAttempted.current) {
                tokenRefreshAttempted.current = true;
                try {
                    const { token, refreshToken } = await refreshMailTmToken(emailAccount.refreshToken!);
                    setEmailAccount(prev => prev ? { ...prev, token, refreshToken } : null);
                    return await apiCall({ ...emailAccount, token, refreshToken });
                } catch {
                    if (options.isLoadInbox) handleGetNewEmail();
                    else setError('Session timed out.');
                } finally {
                    setTimeout(() => { tokenRefreshAttempted.current = false; }, 2000);
                }
            } else if (!isAuthError) setError(error.message || 'Connection error.');
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

    useInterval(loadInbox, emailAccount ? POLLING_INTERVAL : null);

    const handleSelectMessage = useCallback(async (message: Message) => {
        setLoading(true);
        setView('emailDetail');
        setSelectedMessage(null);
        window.scrollTo(0, 0);
        const detail = await handleApiCall((account) => fetchMessageDetail(account.token, message.id, account.apiSource));
        if (detail) setSelectedMessage({...detail, address: emailAccount?.address});
        setLoading(false);
    }, [handleApiCall, emailAccount]);
    
    const handleSelectArticle = (article: Article) => {
        setSelectedArticle(article);
        setView('articleDetail');
        window.scrollTo(0, 0);
    };

    const handleSelectBlog = (blog: typeof blogArticles[0]) => {
        setSelectedBlog(blog);
        setView('blogDetail');
        window.scrollTo(0, 0);
    };

    const handleBackToMain = () => {
        navigate('/');
        setView('main');
        setSelectedMessage(null);
        setSelectedArticle(null);
        setSelectedBlog(null);
        window.scrollTo(0, 0);
    };

    const navigateToBlog = () => {
        navigate('/blog');
        setView('blogList');
        window.scrollTo(0, 0);
    };

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
        <div className="flex flex-col min-h-screen bg-[#0f172a]">
            <Helmet>
                <title>{currentSeoPage ? currentSeoPage.title : "Temporary Emails - Safe, Anonymous & Secure Disposable Email | Free Temporary Emails"}</title>
                <meta name="description" content={currentSeoPage ? currentSeoPage.description : "Get a free, safe, and secure anonymous temporary email address. Protect your privacy from spam, tracking, and hacking. Our legit temporary email service is 100% private and works for Facebook, Instagram, and Discord. No signup required."} />
                <link rel="canonical" href={canonicalUrl} />
                {currentSeoPage && <meta name="keywords" content={currentSeoPage.keywords.join(', ')} />}
                {currentSeoPage && (
                    <script type="application/ld+json">
                        {JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "WebPage",
                            "name": currentSeoPage.title,
                            "description": currentSeoPage.description,
                            "url": canonicalUrl,
                            "publisher": {
                                "@type": "Organization",
                                "name": "Temporary Emails"
                            }
                        })}
                    </script>
                )}
                {seoPages.filter(p => p.langCode && p.countryCode).map(p => (
                    <link key={p.slug} rel="alternate" hrefLang={`${p.langCode}-${p.countryCode}`} href={`https://temporaryemails.pages.dev/topic/${p.slug}`} />
                ))}
                <link rel="alternate" hrefLang="x-default" href="https://temporaryemails.pages.dev/" />
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
                                        <span className="tracking-widest uppercase">{isRefreshing ? 'Syncing...' : (t('refresh') || 'Refresh')}</span>
                                    </button>
                                </div>

                                <div className="bg-white rounded-[2.5rem] shadow-2xl p-6 sm:p-8 mb-8 border border-gray-100 overflow-hidden relative">
                                    {isRefreshing && (
                                        <div className="absolute top-0 left-0 w-full h-1 bg-indigo-100">
                                            <div className="h-full bg-indigo-500 animate-progress-loading"></div>
                                        </div>
                                    )}
                                    <h2 className="text-3xl font-black text-gray-900 mb-8 tracking-tight flex items-center gap-4">
                                        <span className="w-2 h-8 bg-indigo-600 rounded-full"></span>
                                        {t('inbox') || 'Inbox'}
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
                        <InfoDump onSelectArticle={handleSelectArticle} onNavigateBlog={navigateToBlog} seoData={currentSeoPage} />
                    </>
                )}

                {view === 'emailDetail' && selectedMessage && (
                    <EmailDetail message={selectedMessage} onClose={handleBackToMain} />
                )}

                {view === 'articleDetail' && selectedArticle && (
                    <ArticleView article={selectedArticle} onBack={handleBackToMain} />
                )}

                {view === 'blogList' && (
                    <BlogList onSelectBlog={handleSelectBlog} onBack={handleBackToMain} />
                )}

                {view === 'blogDetail' && selectedBlog && (
                    <BlogDetailView blog={selectedBlog} onBack={navigateToBlog} onGoHome={handleBackToMain} />
                )}
            </main>
            <Footer onNavigateBlog={navigateToBlog} onGoHome={handleBackToMain} />
            <style>{`
                @keyframes progress-loading {
                    0% { width: 0; left: 0; }
                    50% { width: 100%; left: 0; }
                    100% { width: 0; left: 100%; }
                }
                .animate-progress-loading {
                    animation: progress-loading 1.5s infinite linear;
                }
                .animate-spin-fast {
                    animation: spin 0.6s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

const App: React.FC = () => {
    return (
        <HelmetProvider>
            <Router>
                <Routes>
                    <Route path="*" element={<TemporaryEmailsLogic />} />
                </Routes>
            </Router>
        </HelmetProvider>
    );
};

export default App;