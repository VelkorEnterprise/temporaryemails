import React, { useMemo } from 'react';
import { Message } from '../types.ts';
import { Icons } from './Icons.tsx';
import { keywords } from '../keywords.ts';
import { useTranslation } from '../LanguageContext.tsx';

interface EmailListProps {
  messages: Message[];
  onSelectMessage: (message: Message) => void;
}

const getRandomItem = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];

function formatDate(dateString: string) {
    const date = new Date(dateString);
    const now = new Date();
    const diffSeconds = Math.round((now.getTime() - date.getTime()) / 1000);
    const diffMinutes = Math.round(diffSeconds / 60);
    const diffHours = Math.round(diffMinutes / 60);

    if (diffSeconds < 60) return "Just now";
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString();
}

const EmailList: React.FC<EmailListProps> = ({ messages, onSelectMessage }) => {
  const { t, language } = useTranslation();
  
  const emptyInboxTip = useMemo(() => getRandomItem(keywords), [language]);

  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[450px] text-center text-gray-500 p-8 border-2 border-dashed border-gray-100 rounded-[2.5rem] bg-gray-50/50 relative overflow-hidden group">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500 to-transparent h-[40%] w-full animate-scan-slow"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center w-full">
            <div className="bg-white p-8 rounded-[2rem] shadow-xl mb-10 group-hover:scale-110 transition-transform duration-700 shadow-indigo-500/5">
                <Icons.Inbox className="w-20 h-20 text-indigo-500" />
            </div>
            
            <h3 className="font-black text-3xl text-gray-900 mb-3 tracking-tight">{t('inboxEmpty')}</h3>
            <p className="text-gray-500 font-medium mb-10 max-w-sm text-lg">{t('waitingForEmails')}</p>
            
            <div className="flex items-center gap-3 px-8 py-4 bg-white border border-gray-100 rounded-full shadow-sm text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse"></span>
                DECRYPTING INCOMING TRAFFIC
            </div>

            {emptyInboxTip && (
                <div className="mt-16 p-8 bg-white/80 backdrop-blur-md border border-gray-100 rounded-3xl max-w-md shadow-lg shadow-indigo-500/5">
                    <p className="text-xs text-gray-400 italic leading-relaxed font-medium">
                        <span className="font-black text-indigo-600 uppercase tracking-widest mr-2">{t('inboxTip')}</span> 
                        "{emptyInboxTip}"? <button onClick={(e) => e.preventDefault()} className="text-indigo-600 font-black hover:underline uppercase tracking-widest ml-1">{t('checkArticles')}</button>
                    </p>
                </div>
            )}
        </div>
        
        <style>{`
            @keyframes scan-slow {
                0% { transform: translateY(-100%); }
                100% { transform: translateY(300%); }
            }
            .animate-scan-slow {
                animation: scan-slow 5s linear infinite;
            }
        `}</style>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          onClick={() => onSelectMessage(message)}
          className="group p-6 cursor-pointer rounded-[1.5rem] border border-gray-100 hover:border-indigo-300 bg-white hover:bg-indigo-50/30 transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-indigo-500/10"
        >
          <div className="flex justify-between items-start gap-5">
            <div className="flex-shrink-0">
                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center font-black text-xl text-gray-300 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 transform group-hover:rotate-6">
                    {message.from.name ? message.from.name[0].toUpperCase() : (message.from.address[0].toUpperCase())}
                </div>
            </div>
            <div className="flex-grow overflow-hidden">
                <div className="flex items-center justify-between mb-2">
                    <p className="font-black text-gray-900 truncate text-lg group-hover:text-indigo-600 transition-colors tracking-tight">{message.from.name || message.from.address}</p>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex-shrink-0 bg-gray-50 px-3 py-1 rounded-full">{formatDate(message.createdAt)}</span>
                </div>
                <p className="text-gray-800 font-bold truncate text-base mb-2">{message.subject || '(no subject)'}</p>
                <p className="text-gray-500 text-sm truncate leading-relaxed font-medium">{message.intro}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmailList;