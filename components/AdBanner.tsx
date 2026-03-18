import React, { useEffect, useRef } from 'react';

interface AdBannerProps {
    scriptSrc: string;
}

const AdBanner: React.FC<AdBannerProps> = ({ scriptSrc }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        
        // Clean up any existing content
        container.innerHTML = '';
        
        try {
            // Create the script element directly
            const script = document.createElement('script');
            script.src = scriptSrc;
            script.async = true;
            script.referrerPolicy = 'no-referrer-when-downgrade';
            
            // Assign settings object as required by the ad provider
            (script as any).settings = {};
            
            // Add error handling to prevent "Script error" from crashing the app or showing in console
            script.onerror = () => {
                // Silently handle the error as ad blockers often cause this
                if (container) container.style.display = 'none';
            };

            // Append the script to the container
            container.appendChild(script);
        } catch (e) {
            console.warn('Error injecting ad script:', e);
        }

        return () => {
            if (container) {
                container.innerHTML = '';
                container.style.display = ''; // Reset display style
            }
        };
    }, [scriptSrc]);

    return (
        <div className="flex justify-center w-full my-6 min-h-[90px] overflow-visible">
            <div ref={containerRef} className="ad-slot-wrapper w-full flex justify-center items-center" />
        </div>
    );
};

export default AdBanner;