import {
    ResponsiveContainer,
    AreaChart,
    Area,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    PieChart,
    Pie,
    Cell
} from 'recharts';
import { ExternalLink } from 'lucide-react';

interface EcologyChartProps {
    data: any[];
    type: 'line' | 'bar' | 'donut';
    title: string;
    xLabel: string;
    yLabel: string;
    note?: string;
    sources?: string[];
    height?: number;
    color?: string; // couleur dominante optionnelle
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        const point = payload[0];
        const category = point && point.name ? point.name : label;

        return (
            <div className="bg-slate-800/95 backdrop-blur-xl text-slate-100 p-4 border border-slate-700/50 shadow-lg rounded-none text-[10px] min-w-[200px] leading-normal font-bold uppercase tracking-tight">
                <p className="font-bold text-white mb-3 pb-2 border-b border-slate-700/50 flex justify-between items-center tracking-wider uppercase">
                    <span>{category}</span>
                </p>
                <div className="flex justify-between items-center bg-slate-900/50 p-1.5 border border-slate-700/30">
                    <span className="text-slate-500 font-semibold uppercase tracking-wider">
                        Valeur:
                    </span>
                    <span className="data-value text-blue-400 text-[11px]">
                        {point.value != null
                            ? Number(point.value).toLocaleString('fr-TN')
                            : ''}
                    </span>
                </div>
            </div>
        );
    }
    return null;
};

// petite palette par défaut pour les donuts (tu peux adapter)
const DONUT_COLORS = ['#e11d48', '#f97316', '#eab308', '#22c55e', '#0ea5e9', '#6366f1'];

export default function EcologyChart({
    data,
    type,
    title,
    xLabel,
    yLabel,
    note,
    sources,
    height = 350,
    color
}: EcologyChartProps) {
    const first = data && data.length > 0 ? data[0] : null;

    let xKey = 'annee';
    let dataKey = 'value';

    if (first) {
        const keys = Object.keys(first);

        if (type === 'donut') {
            // Pour les donuts, on force une logique "catégorie / valeur"
            const categoricalKey =
                keys.find(k => typeof first[k] === 'string') || keys[0];
            const numericKey =
                keys.find(k => k !== categoricalKey && typeof first[k] === 'number') ||
                keys.find(k => k !== categoricalKey);
            xKey = categoricalKey;
            if (numericKey) dataKey = numericKey;
        } else if (keys.includes('annee')) {
            xKey = 'annee';
            const numericKey =
                keys.find(k => k !== 'annee' && typeof first[k] === 'number') ||
                keys.find(k => k !== 'annee');
            if (numericKey) dataKey = numericKey;
        } else {
            const categoricalKey =
                keys.find(k => typeof first[k] === 'string') || keys[0];
            const numericKey =
                keys.find(k => k !== categoricalKey && typeof first[k] === 'number') ||
                keys.find(k => k !== categoricalKey);
            xKey = categoricalKey;
            if (numericKey) dataKey = numericKey;
        }
    }

    const resolvedColor = color || (type === 'line' ? '#0ea5e9' : '#10b981');

    return (
        <div className="card bg-slate-800/80 backdrop-blur-xl p-4 rounded-none border border-slate-700 shadow-md leading-normal">
            <div className="flex justify-between items-start mb-8 px-2">
                <div>
                    <h3 className="text-base font-semibold text-slate-200 uppercase tracking-widest border-l-2 border-blue-500 pl-3">
                        {title}
                    </h3>
                    {sources && sources.length > 0 && (
                        <div className="mt-2 flex gap-2">
                            {sources.map((source, i) => (
                                <a
                                    key={i}
                                    href={source}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[9px] font-black text-slate-500 hover:text-blue-400 flex items-center gap-1 uppercase tracking-tighter transition-colors"
                                >
                                    <ExternalLink size={10} />
                                    Source [{i + 1}]
                                </a>
                            ))}
                        </div>
                    )}
                </div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Type: {type.toUpperCase()}
                </div>
            </div>

            <div
                style={{ height: height, width: '100%', minWidth: 0 }}
                className="relative leading-normal overflow-hidden"
            >
                <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                    {type === 'line' ? (
                        <AreaChart
                            data={data}
                            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                        >
                            <defs>
                                <linearGradient
                                    id={`grad-${title.replace(/\s+/g, '-')}`}
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop
                                        offset="5%"
                                        stopColor={resolvedColor}
                                        stopOpacity={0.4}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor={resolvedColor}
                                        stopOpacity={0}
                                    />
                                </linearGradient>
                            </defs>
                            <CartesianGrid
                                strokeDasharray="4 4"
                                vertical={false}
                                stroke="#ffffff08"
                            />
                            <XAxis
                                dataKey={xKey}
                                axisLine={false}
                                tickLine={false}
                                tick={{
                                    fill: '#64748b',
                                    fontSize: 11,
                                    fontWeight: 500
                                }}
                                dy={8}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{
                                    fill: '#64748b',
                                    fontSize: 11,
                                    fontWeight: 500
                                }}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Area
                                type="monotone"
                                dataKey={dataKey}
                                stroke={resolvedColor}
                                strokeWidth={2}
                                fill={`url(#grad-${title.replace(/\s+/g, '-')})`}
                                dot={{
                                    r: 2.5,
                                    fill: '#1e293b',
                                    stroke: resolvedColor,
                                    strokeWidth: 1.5
                                }}
                                activeDot={{
                                    r: 4,
                                    fill: resolvedColor,
                                    stroke: '#1e293b',
                                    strokeWidth: 1.5
                                }}
                            />
                        </AreaChart>
                    ) : type === 'bar' ? (
                        <BarChart
                            data={data}
                            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                        >
                            <CartesianGrid
                                strokeDasharray="4 4"
                                vertical={false}
                                stroke="#ffffff08"
                            />
                            <XAxis
                                dataKey={xKey}
                                axisLine={false}
                                tickLine={false}
                                tick={{
                                    fill: '#64748b',
                                    fontSize: 11,
                                    fontWeight: 500
                                }}
                                dy={8}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{
                                    fill: '#64748b',
                                    fontSize: 11,
                                    fontWeight: 500
                                }}
                            />
                            <Tooltip
                                content={<CustomTooltip />}
                                cursor={{ fill: '#ffffff04' }}
                            />
                            <Bar
                                dataKey={dataKey}
                                fill={resolvedColor}
                                radius={[2, 2, 0, 0]}
                                barSize={32}
                            />
                        </BarChart>
                    ) : (
                        // DONUT
                        <PieChart>
                            <Tooltip content={<CustomTooltip />} />
                            <Pie
                                data={data}
                                dataKey={dataKey}
                                nameKey={xKey}
                                innerRadius="55%"
                                outerRadius="80%"
                                paddingAngle={2}
                                stroke="#020617"
                                strokeWidth={1}
                            >
                                {data.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={
                                            entry.color ||
                                            DONUT_COLORS[index % DONUT_COLORS.length] ||
                                            resolvedColor
                                        }
                                    />
                                ))}
                            </Pie>
                        </PieChart>
                    )}
                </ResponsiveContainer>
            </div>

            <div className="mt-4 flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-500 px-2">
                <span>{xLabel}</span>
                <span>{yLabel}</span>
            </div>

            {note && (
                <p className="mt-6 text-[11px] text-slate-500 font-bold uppercase tracking-tight leading-relaxed italic border-t border-slate-700/40 pt-4">
                    NOTE: {note}
                </p>
            )}
        </div>
    );
}
