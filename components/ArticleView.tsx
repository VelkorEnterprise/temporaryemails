import React from 'react';
import { Article } from '../types.ts';
import { Icons } from './Icons.tsx';
import { useTranslation } from '../LanguageContext.tsx';

interface ArticleViewProps {
    article: Article;
    onBack: () => void;
}

const ArticleView: React.FC<ArticleViewProps> = ({ article, onBack }) => {
    const { t } = useTranslation();
    return (
        <div className="flex-grow w-full bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
                <button
                    onClick={onBack}
                    className="mb-6 flex items-center space-x-2 text-gray-600 hover:text-indigo-700 font-semibold transition-colors duration-200"
                >
                    <Icons.Back className="w-5 h-5" />
                    <span>{t('backToMain')}</span>
                </button>
                <img src={article.thumbnail} alt={article.title} className="w-full h-auto max-h-96 object-cover rounded-lg mb-8 shadow-lg" />
                <div className="mb-4">
                    <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
                        {t('knowledgeBase')}
                    </p>
                </div>
                <article className="prose prose-indigo max-w-none prose-h1:text-3xl sm:prose-h1:text-4xl prose-h1:font-bold prose-h1:text-gray-900 prose-p:text-slate-800 prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-4 prose-strong:text-slate-900">
                    <h1>{article.title}</h1>
                    <div className="text-sm text-gray-500 mb-6">
                        <span>{t('by')} {article.author}</span>
                        <span className="mx-2">|</span>
                        <span>{article.date}</span>
                    </div>
                    <div>
                        {article.content}
                    </div>
                </article>
            </div>
        </div>
    );
};

export default ArticleView;