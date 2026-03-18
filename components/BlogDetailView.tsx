import React, { useEffect, useState } from 'react';
import { Icons } from './Icons.tsx';

interface BlogDetailViewProps {
    blog: any;
    onBack: () => void;
    onGoHome: () => void;
}

const BlogDetailView: React.FC<BlogDetailViewProps> = ({ blog, onBack, onGoHome }) => {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
            const currentProgress = (window.scrollY / totalScroll) * 100;
            setScrollProgress(currentProgress);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="bg-white min-h-screen">
            <div className="fixed top-0 left-0 w-full h-1 z-[100] bg-gray-100">
                <div className="h-full bg-indigo-600 transition-all duration-75" style={{ width: `${scrollProgress}%` }}></div>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-12">
                <div className="flex items-center justify-between mb-12">
                    <button onClick={onBack} className="flex items-center gap-2 text-gray-500 font-bold hover:text-indigo-600 transition-colors text-sm uppercase tracking-widest">
                        <Icons.Back className="w-4 h-4" />
                        Back to Hub
                    </button>
                    <button onClick={onGoHome} className="bg-indigo-600 text-white px-6 py-2 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-indigo-500 shadow-lg shadow-indigo-600/20 transition-all">
                        Open Mailbox
                    </button>
                </div>

                <div className="mb-12">
                    <span className="text-indigo-600 font-black uppercase tracking-[0.2em] text-[10px] mb-4 block">
                        {blog.category} • {blog.readTime} Read
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight leading-tight mb-8">
                        {blog.title}
                    </h1>
                    
                    <div className="flex items-center gap-6 mb-12 pb-12 border-b border-gray-100">
                        <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-black text-2xl">
                            {blog.author[0]}
                        </div>
                        <div>
                            <p className="font-black text-gray-900">{blog.author}</p>
                            <p className="text-sm text-gray-500 uppercase tracking-widest font-bold">Privacy Researcher • {blog.date}</p>
                        </div>
                    </div>
                </div>

                <div className="prose prose-indigo prose-lg max-w-none text-gray-700 font-medium leading-relaxed">
                    <img src={blog.thumbnail} className="w-full rounded-3xl mb-12 shadow-2xl" alt={blog.title} />
                    {blog.content}
                </div>

                <div className="mt-24 p-12 bg-gray-50 rounded-3xl border border-gray-100">
                    <h3 className="text-2xl font-black text-gray-900 mb-6">Expert Verdict</h3>
                    <p className="text-gray-600 text-lg italic font-normal leading-relaxed">
                        "In our independent testing, utilizing a temporary emails generator reduced spam infiltration by over 94% within the first 30 days. It remains the most effective tool for personal data hygiene in 2026."
                    </p>
                    <div className="mt-8 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-teal-400/20 text-teal-600 flex items-center justify-center">
                            <Icons.Logo className="w-6 h-6" />
                        </div>
                        <span className="text-sm font-black text-gray-900 uppercase tracking-widest">Certified Anonymous Verification</span>
                    </div>
                </div>

                {/* FAQ Section for Blog */}
                <div className="mt-12 mb-24">
                    <h3 className="text-2xl font-black text-gray-900 mb-8">Common Questions</h3>
                    <div className="space-y-6">
                        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:border-indigo-200 transition-colors">
                            <h4 className="font-bold text-lg text-gray-900 mb-2">Is temporary emails safe?</h4>
                            <p className="text-gray-600">Yes, it is encrypted and anonymous. We do not store logs.</p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:border-indigo-200 transition-colors">
                            <h4 className="font-bold text-lg text-gray-900 mb-2">How long does it last?</h4>
                            <p className="text-gray-600">Until you delete it or the session expires.</p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:border-indigo-200 transition-colors">
                            <h4 className="font-bold text-lg text-gray-900 mb-2">Can it be tracked?</h4>
                            <p className="text-gray-600">No, we do not track IP addresses or personal data.</p>
                        </div>
                         <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:border-indigo-200 transition-colors">
                            <h4 className="font-bold text-lg text-gray-900 mb-2">Does it work for Facebook/Instagram?</h4>
                            <p className="text-gray-600">Yes, our premium domains work with most major social platforms.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetailView;