// src/components/charts/FinanceChart.tsx

import {
    LineChart,
    BarChart,
    Line,
    Bar,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    AreaChart,
    Area,
} from 'recharts';

interface FinanceChartProps {
    id: string;
    type: 'line' | 'bar' | 'donut' | 'area';
    title?: string;
    xLabel: string;
    yLabel: string;
    data: any[];
    note?: string;
    color?: string;
}

export default function FinanceChart({
    type,
    xLabel,
    yLabel,
    data,
    color = '#0ea5e9',
}: FinanceChartProps) {
    const commonProps = {
        data,
        margin: { top: 5, right: 30, left: 0, bottom: 5 },
    };

    if (type === 'line') {
        return (
            <div className="w-full h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart {...commonProps}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
                        <XAxis dataKey={xLabel} stroke="#94a3b8" />
                        <YAxis stroke="#94a3b8" />
                        <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey={yLabel}
                            stroke={color}
                            strokeWidth={2}
                            dot={{ fill: color, r: 4 }}
                            activeDot={{ r: 6 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        );
    }

    if (type === 'bar') {
        return (
            <div className="w-full h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart {...commonProps}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
                        <XAxis dataKey={xLabel} stroke="#94a3b8" />
                        <YAxis stroke="#94a3b8" />
                        <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
                        <Legend />
                        <Bar dataKey={yLabel} fill={color} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        );
    }

    if (type === 'donut') {
        return (
            <div className="w-full h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, value }: any) => `${name}: ${value}`}
                            outerRadius={80}
                            fill={color}
                            dataKey={yLabel}
                        >
                            {data.map((entry: any, index: number) => (
                                <Cell key={`cell-${index}`} fill={entry.color || color} />
                            ))}
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        );
    }

    if (type === 'area') {
        return (
            <div className="w-full h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart {...commonProps}>
                        <defs>
                            <linearGradient id="colorArea" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                                <stop offset="95%" stopColor={color} stopOpacity={0.1} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
                        <XAxis dataKey={xLabel} stroke="#94a3b8" />
                        <YAxis stroke="#94a3b8" />
                        <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
                        <Area
                            type="monotone"
                            dataKey={yLabel}
                            stroke={color}
                            fillOpacity={1}
                            fill="url(#colorArea)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        );
    }

    return <div className="text-slate-500 text-sm">Type de graphique non reconnu : {type}</div>;
}
