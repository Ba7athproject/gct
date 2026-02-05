import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface TimeSeriesChartProps {
    data: any[];
    dataKey: string;
    xAxisKey?: string;
    height?: number;
    unit?: string;
    color?: string;
    gradientId?: string;
}

const CustomTooltip = ({ active, payload, label, unit }: any) => {
    if (active && payload && payload.length) {
        const item = payload[0].payload;
        return (
            <div className="bg-slate-800/95 backdrop-blur-xl text-slate-100 p-4 border border-slate-700/50 shadow-lg rounded-none text-[10px] min-w-[200px] leading-normal">
                <p className="font-bold text-white mb-3 pb-2 border-b border-slate-700/50 flex justify-between items-center tracking-wider uppercase">
                    <span>Audit {label}</span>
                    <span className="expert-tag bg-blue-500/10 text-blue-400 border-blue-500/20">RECAPT_STREAM</span>
                </p>
                <div className="space-y-3">
                    <div className="flex justify-between items-center bg-slate-900/50 p-1.5 border border-slate-700/30">
                        <span className="text-slate-500 font-semibold uppercase tracking-wider">Montant:</span>
                        <span className="data-value text-blue-400 text-[11px]">{payload[0].value?.toLocaleString('fr-TN')} {unit}</span>
                    </div>
                    {item.lender_category && (
                        <div className="flex justify-between items-center px-1">
                            <span className="text-slate-500 font-semibold uppercase tracking-wider">Bailleur Principal:</span>
                            <span className="font-bold text-white text-[9px] uppercase tracking-tighter">{item.lender_category}</span>
                        </div>
                    )}
                    {item.instrument && (
                        <div className="flex justify-between items-center px-1">
                            <span className="text-slate-500 font-semibold uppercase tracking-wider">Instrument:</span>
                            <span className="font-bold text-slate-400 uppercase tracking-tighter text-[9px]">{item.instrument.replace('_', ' ')}</span>
                        </div>
                    )}
                    {item.share_of_ep_budget_pct && (
                        <div className="flex justify-between items-center pt-2 mt-2 border-t border-slate-700/40 px-1">
                            <span className="text-slate-500 font-semibold uppercase tracking-wider">Poids Budget EP:</span>
                            <span className="data-value text-lime-400">{item.share_of_ep_budget_pct}%</span>
                        </div>
                    )}
                </div>
            </div>
        );
    }
    return null;
};

export default function TimeSeriesChart({
    data,
    dataKey,
    xAxisKey = 'year',
    height = 300,
    unit = '',
    color = '#0ea5e9',
    gradientId = 'chartGradient'
}: TimeSeriesChartProps) {
    return (
        <div style={{ height: height, width: '100%', minWidth: 0 }} className="relative leading-normal overflow-hidden">
            {/* Subtle glow effect behind the chart */}
            <div className="absolute inset-0 bg-blue-500/2 blur-[60px] rounded-full pointer-events-none" />

            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={color} stopOpacity={0.4} />
                            <stop offset="95%" stopColor={color} stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#ffffff08" />
                    <XAxis
                        dataKey={xAxisKey}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#64748b', fontSize: 11, fontWeight: 500 }}
                        dy={8}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#64748b', fontSize: 11, fontWeight: 500 }}
                        unit={unit}
                    />
                    <Tooltip
                        content={<CustomTooltip unit={unit} />}
                        cursor={{ stroke: '#334155', strokeWidth: 1, strokeDasharray: '4 4' }}
                    />
                    <Area
                        type="monotone"
                        dataKey={dataKey}
                        stroke={color}
                        strokeWidth={2}
                        fill={`url(#${gradientId})`}
                        animationDuration={1500}
                        dot={{ r: 2.5, fill: '#1e293b', stroke: color, strokeWidth: 1.5 }}
                        activeDot={{ r: 4, fill: color, stroke: '#1e293b', strokeWidth: 1.5 }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
