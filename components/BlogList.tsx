import React from 'react';
import { blogArticles } from '../data/blogArticles.tsx';
import { Icons } from './Icons.tsx';

interface BlogListProps {
    onSelectBlog: (blog: typeof blogArticles[0]) => void;
    onBack: () => void;
}

const BlogList: React.FC<BlogListProps> = ({ onSelectBlog, onBack }) => {
    return (
        <div className="bg-[#0f172a] min-h-screen py-20 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-start mb-10">
                   <button onClick={onBack} className="flex items-center gap-2 text-gray-500 font-bold hover:text-indigo-600 transition-colors text-sm uppercase tracking-widest">
                        <Icons.Back className="w-4 h-4" />
                        Back to Home
                    </button>
                </div>
                <div className="text-center mb-20">
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-tight">
                        Privacy <span className="text-indigo-500">Hub</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto font-medium">
                        Deep dives into anonymity, cybersecurity, and data protection. Expert-led research to keep your digital life secure.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogArticles.map((blog) => (
                        <div 
                            key={blog.slug}
                            onClick={() => onSelectBlog(blog)}
                            className="group glass-panel rounded-3xl overflow-hidden cursor-pointer flex flex-col hover:scale-[1.02] transition-all duration-500"
                        >
                            <div className="h-64 overflow-hidden relative">
                                <img 
                                    src={blog.thumbnail} 
                                    alt={blog.title} 
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/20 to-transparent"></div>
                                <div className="absolute top-4 left-4 flex gap-2">
                                    <span className="bg-indigo-600 text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest">
                                        {blog.category}
                                    </span>
                                </div>
                            </div>
                            <div className="p-8 flex flex-col flex-grow">
                                <h2 className="text-2xl font-black text-white mb-4 group-hover:text-indigo-400 transition-colors leading-tight">
                                    {blog.title}
                                </h2>
                                <p className="text-gray-500 text-sm mb-6 line-clamp-3 leading-relaxed">
                                    {blog.description}
                                </p>
                                <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-gray-600">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                                            {blog.author[0]}
                                        </div>
                                        <span>{blog.author}</span>
                                    </div>
                                    <span>{blog.date}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BlogList;