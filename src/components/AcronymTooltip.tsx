import { useState } from 'react';

interface AcronymTooltipProps {
    term: string;
    definition: string;
}

export default function AcronymTooltip({ term, definition }: AcronymTooltipProps) {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <span
            className="relative cursor-help inline-block border-b border-dotted border-slate-400 group"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
            onClick={() => setIsVisible(!isVisible)}
        >
            {term}
            {isVisible && (
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-slate-800 text-white text-xs rounded shadow-lg z-50 text-center pointer-events-none">
                    {definition}
                    <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800"></span>
                </span>
            )}
        </span>
    );
}
