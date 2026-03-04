import React from 'react';
import { MessageDetail } from '../types.ts';
import { Icons } from './Icons.tsx';
import { useTranslation } from '../LanguageContext.tsx';

interface EmailDetailProps {
  message: MessageDetail;
  onClose: () => void;
}

const EmailDetail: React.FC<EmailDetailProps> = ({ message, onClose }) => {
  const { t } = useTranslation();

  const createSafeHtml = (htmlContent: string[]) => {
    return htmlContent.join('');
  };
  
  const srcDoc = `
    <html>
      <head>
        <style>
          body { 
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"; 
            margin: 0; 
            padding: 1.5rem; 
            color: #111827; 
            background-color: #ffffff;
            word-wrap: break-word;
            font-size: 16px;
            line-height: 1.6;
          }
          a { color: #4f46e5; text-decoration: none; }
          a:hover { text-decoration: underline; }
          img { max-width: 100%; height: auto; }
        </style>
      </head>
      <body>${createSafeHtml(message.html && message.html.length > 0 ? message.html : [`<pre style="white-space: pre-wrap; word-wrap: break-word;">${message.text}</pre>`])}</body>
    </html>
  `;

  return (
    <div className="h-full flex flex-col bg-white text-gray-800 max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex-shrink-0 mb-4">
        <button onClick={onClose} className="flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-800 transition-transform duration-200 ease-in-out hover:scale-105 active:scale-100">
            <Icons.Back className="w-5 h-5" />
            <span>{t('backToInbox')}</span>
        </button>
      </div>
      
      <header className="flex-shrink-0 bg-gray-50 p-3 flex items-center justify-between border border-gray-200 rounded-t-lg">
        <h2 className="font-semibold text-lg truncate">{message.subject || t('noSubject')}</h2>
      </header>
      
      <div className="flex-grow overflow-y-auto no-scrollbar">
          <div className="bg-white rounded-b-lg shadow-md overflow-hidden h-full flex flex-col border-x border-b border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600 mr-4 flex-shrink-0">
                    {message.from.address[0].toUpperCase()}
                  </div>
                  <div className="flex-grow overflow-hidden">
                      <p className="font-semibold text-lg truncate text-gray-800">{message.from.name || message.from.address}</p>
                      <p className="text-sm text-gray-500">{t('to')}: {message.address || t('me')}</p>
                  </div>
                   <p className="text-xs text-gray-500 mt-1 flex-shrink-0">{new Date(message.createdAt).toLocaleString()}</p>
                </div>
              </div>

              <div className="flex-grow overflow-hidden bg-white min-h-[50vh]">
                 <iframe
                    title="email-content"
                    srcDoc={srcDoc}
                    sandbox="allow-popups-to-escape-sandbox"
                    className="w-full h-full border-0"
                />
              </div>
          </div>
      </div>
    </div>
  );
};

export default EmailDetail;