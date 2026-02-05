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
        return (
            <div className="bg-white p-3 border border-slate-100 shadow-xl rounded-lg text-sm">
                <p className="font-semibold text-slate-800 mb-1">{label}</p>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span className="text-slate-500">{payload[0].name}:</span>
                    <span className="font-bold text-slate-900">
                        {payload[0].value?.toLocaleString('fr-TN')} {unit}
                    </span>
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
    color = '#3b82f6',
    gradientId = 'chartGradient'
}: TimeSeriesChartProps) {
    return (
        <div style={{ height: height, width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                            <stop offset="95%" stopColor={color} stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis
                        dataKey={xAxisKey}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#64748b', fontSize: 12 }}
                        dy={10}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#64748b', fontSize: 12 }}
                        unit={unit}
                    />
                    <Tooltip content={<CustomTooltip unit={unit} />} cursor={{ stroke: '#cbd5e1', strokeDasharray: '4 4' }} />
                    <Area
                        type="monotone"
                        dataKey={dataKey}
                        stroke={color}
                        strokeWidth={2}
                        fill={`url(#${gradientId})`}
                        animationDuration={1500}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
