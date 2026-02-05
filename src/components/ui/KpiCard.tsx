import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import type { ElementType } from 'react';

interface KpiCardProps {
    title: string;
    value: string | number;
    subtext?: string;
    icon?: ElementType;
    trend?: 'up' | 'down' | 'neutral';
    trendValue?: string;
    isCritical?: boolean;
    className?: string;
}

export default function KpiCard({
    title,
    value,
    subtext,
    icon: Icon,
    trend,
    trendValue,
    isCritical = false,
    className = '',
}: KpiCardProps) {
    return (
        <div
            className={`card flex flex-col justify-between h-full bg-slate-800/80 backdrop-blur-md rounded-none border transition-all group ${isCritical
                ? 'border-amber-500/60 shadow-[0_0_15px_rgba(245,158,11,0.2)] ring-1 ring-amber-500/20'
                : 'border-slate-700 hover:border-blue-500/50'
                } ${className}`}
        >
            <div className="flex justify-between items-start mb-5">
                <div className={`p-3 bg-slate-900 rounded-none border transition-colors ${isCritical ? 'text-amber-500 border-amber-500/40 shadow-[0_0_8px_rgba(245,158,11,0.3)]' : 'text-blue-400 border-slate-800 group-hover:border-blue-500/40'
                    }`}>
                    {Icon ? <Icon size={22} strokeWidth={2} /> : <Minus size={22} />}
                </div>
                {trend && (
                    <div
                        className={`flex items-center gap-1 text-sm font-black px-3 py-1 rounded-none border uppercase tracking-wider ${trend === 'up'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                            : trend === 'down'
                                ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                                : 'bg-slate-800 text-slate-200 border-slate-700'
                            }`}
                    >
                        {trend === 'up' && <ArrowUpRight size={14} />}
                        {trend === 'down' && <ArrowDownRight size={14} />}
                        {trend === 'neutral' && <Minus size={14} />}
                        {trendValue && <span>{trendValue}</span>}
                    </div>
                )}
            </div>

            <div>
                <p className="text-sm font-black text-slate-400 mb-2 uppercase tracking-[0.18em]">
                    {title}
                </p>
                <h3 className="text-4xl font-black text-white tracking-tight data-value leading-tight">
                    {value}
                </h3>
                {subtext && (
                    <div className={`flex items-center gap-2 mt-4 pt-3 border-t ${isCritical ? 'border-amber-500/30' : 'border-slate-700/60'}`}>
                        <div className={`w-1.5 h-1.5 rounded-full shadow-[0_0_4px_rgba(59,130,246,0.6)] ${isCritical ? 'bg-amber-500 shadow-[0_0_4px_rgba(245,158,11,0.6)]' : 'bg-blue-500'}`} />
                        <p className={`text-sm font-semibold uppercase tracking-widest ${isCritical ? 'text-amber-200' : 'text-slate-200'}`}>
                            {subtext}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
