import { Link } from 'react-router-dom';
import { ExternalLink, Link as LinkIcon } from 'lucide-react';

interface LinkItem {
    label: string;
    path: string;
}

interface AnalyticalLinksProps {
    title?: string;
    links: LinkItem[];
    className?: string;
}

export default function AnalyticalLinks({
    title = "Navigation Analytique",
    links,
    className = ""
}: AnalyticalLinksProps) {
    return (
        <div className={`card bg-slate-800/80 p-5 rounded-none border border-slate-700/50 shadow-sm ${className}`}>
            <h3 className="text-sm font-black text-slate-400 mb-5 flex items-center gap-2 uppercase tracking-[0.2em]">
                <LinkIcon size={14} className="text-slate-600" />
                {title}
            </h3>
            <div className="space-y-1">
                {links.map((link, index) => (
                    <Link
                        key={index}
                        to={link.path}
                        className="flex items-center justify-between p-2 rounded-none hover:bg-slate-900 transition-colors group"
                    >
                        <span className="text-base font-bold uppercase tracking-wider text-slate-500 group-hover:text-blue-400">
                            {link.label}
                        </span>
                        <ExternalLink size={12} className="text-slate-800 group-hover:text-blue-500" />
                    </Link>
                ))}
            </div>
        </div>
    );
}
