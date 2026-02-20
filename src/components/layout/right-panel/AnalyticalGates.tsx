import { Filter } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { ReactNode } from 'react';

interface AnalyticalGatesProps {
    children: ReactNode;
}

export default function AnalyticalGates({ children }: AnalyticalGatesProps) {
    const { t } = useTranslation();
    return (
        <div className="card bg-slate-800/85 p-6 rounded-none border border-slate-700 shadow-sm transition-all duration-300">
            <h3 className="text-sm font-black text-slate-100 mb-5 flex items-center gap-2 uppercase tracking-[0.25em]">
                <Filter size={18} className="text-blue-400" />
                {t('dashboard.analytical_gates')}
            </h3>
            <div className="space-y-5 text-sm text-slate-100">
                {children}
            </div>
        </div>
    );
}
