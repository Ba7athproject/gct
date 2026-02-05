import { Info, AlertTriangle, AlertCircle } from 'lucide-react';
import React from 'react';

type ContextType = 'info' | 'warning' | 'error';

interface ContextBlockProps {
    type?: ContextType;
    title?: string;
    children: React.ReactNode;
}

const styles = {
    wrapper:
        'px-5 py-4 rounded-none text-base border flex gap-4 items-start bg-slate-800/80 border-slate-600 text-slate-50',
    info: 'border-l-4 border-l-blue-400',
    warning: 'border-l-4 border-l-amber-400',
    error: 'border-l-4 border-l-rose-400',
    icon: {
        info: 'text-blue-400',
        warning: 'text-amber-400',
        error: 'text-rose-400',
    },
};

const icons = {
    info: Info,
    warning: AlertTriangle,
    error: AlertCircle,
};

export default function ContextBlock({ type = 'info', title, children }: ContextBlockProps) {
    const Icon = icons[type];

    return (
        <div className={`${styles.wrapper} ${styles[type]}`}>
            <Icon className={`mt-1 shrink-0 ${styles.icon[type]}`} size={22} />
            <div className="flex-1">
                {title && (
                    <h4 className="font-bold mb-2 text-slate-50 text-lg tracking-tight">
                        {title}
                    </h4>
                )}
                <div className="leading-relaxed text-slate-200 text-base">
                    {children}
                </div>
            </div>
        </div>
    );
}
