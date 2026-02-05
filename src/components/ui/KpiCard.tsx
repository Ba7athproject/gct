import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import type { ElementType } from 'react';

interface KpiCardProps {
    title: string;
    value: string | number;
    subtext?: string;
    icon?: ElementType;
    trend?: 'up' | 'down' | 'neutral';
    trendValue?: string;
    className?: string;
}

export default function KpiCard({ title, value, subtext, icon: Icon, trend, trendValue, className = '' }: KpiCardProps) {
    return (
        <div className={`card flex flex-col justify-between h-full bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow ${className}`}>
            <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-slate-50 text-slate-600 rounded-lg">
                    {Icon ? <Icon size={24} strokeWidth={1.5} /> : <Minus size={24} />}
                </div>
                {trend && (
                    <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${trend === 'up' ? 'bg-emerald-50 text-emerald-700' :
                        trend === 'down' ? 'bg-rose-50 text-rose-700' :
                            'bg-slate-50 text-slate-600'
                        }`}>
                        {trend === 'up' && <ArrowUpRight size={14} />}
                        {trend === 'down' && <ArrowDownRight size={14} />}
                        {trend === 'neutral' && <Minus size={14} />}
                        {trendValue && <span>{trendValue}</span>}
                    </div>
                )}
            </div>

            <div>
                <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{value}</h3>
                {subtext && <p className="text-xs text-slate-400 mt-2">{subtext}</p>}
            </div>
        </div>
    );
}
