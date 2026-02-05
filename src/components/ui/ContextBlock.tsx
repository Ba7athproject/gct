import { Info, AlertTriangle, AlertCircle } from 'lucide-react';
import React from 'react';

type ContextType = 'info' | 'warning' | 'error';

interface ContextBlockProps {
    type?: ContextType;
    title?: string;
    children: React.ReactNode;
}

const styles = {
    wrapper: "p-4 rounded-lg text-sm border flex gap-3 items-start",
    info: "bg-blue-50 text-slate-700 border-blue-100",
    warning: "bg-amber-50 text-amber-800 border-amber-200",
    error: "bg-rose-50 text-rose-800 border-rose-200",
    icon: {
        info: "text-blue-500",
        warning: "text-amber-500",
        error: "text-rose-500"
    }
};

const icons = {
    info: Info,
    warning: AlertTriangle,
    error: AlertCircle
};

export default function ContextBlock({ type = 'info', title, children }: ContextBlockProps) {
    const Icon = icons[type];

    return (
        <div className={`${styles.wrapper} ${styles[type]}`}>
            <Icon className={`mt-0.5 shrink-0 ${styles.icon[type]}`} size={18} />
            <div className="flex-1">
                {title && <h4 className="font-semibold mb-1">{title}</h4>}
                <div className="leading-relaxed opacity-90">
                    {children}
                </div>
            </div>
        </div>
    );
}
