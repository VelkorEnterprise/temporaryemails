import React from 'react';
import { articles } from '../data/articles.tsx';
import { Article } from '../types.ts';

interface InfoSectionProps {
    onSelectArticle: (article: Article) => void;
}

const InfoSection: React.FC<InfoSectionProps> = ({ onSelectArticle }) => {
    return (
        <div className="bg-white py-12 sm:py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 text-center mb-10">
                    Popular Articles
                </h2>
                <div className="space-y-6">
                    {articles.map((article) => (
                        <div 
                            key={article.slug} 
                            onClick={() => onSelectArticle(article)}
                            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border border-gray-200 rounded-lg cursor-pointer hover:shadow-md hover:bg-gray-50 transition-all duration-200"
                        >
                            <div className="flex-grow w-full sm:w-auto sm:pr-4">
                                <h3 className="text-lg font-semibold text-gray-800 hover:text-indigo-600">{article.title}</h3>
                            </div>
                            <div className="flex-shrink-0">
                                <img className="h-20 w-32 object-cover rounded-md" src={article.thumbnail} alt={article.title} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default InfoSection;