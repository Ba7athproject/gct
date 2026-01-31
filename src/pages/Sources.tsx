import { useState } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import bailleursData from '../data/bailleurs_par_annee.json';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658'];

export default function Sources() {
    const [selectedYear, setSelectedYear] = useState(2023);
    const yearData = bailleursData.find(d => d.year === selectedYear) || bailleursData[0];

    // Helper to extract top donors trend
    const bhBankTrend = bailleursData.map(d => ({
        year: d.year,
        amount: d.sources.find(s => s.name === 'BH BANK')?.amount || 0
    }));

    const itfcTrend = bailleursData.map(d => ({
        year: d.year,
        amount: d.sources.find(s => s.name === 'ITFC')?.amount || 0
    }));

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-slate-800">Sources de Financement</h2>
                <p className="text-slate-500">Répartition par bailleur de fonds (Locaux vs Internationaux).</p>
            </div>

            {/* Year Selector */}
            <div className="flex gap-2 overflow-x-auto pb-2">
                {bailleursData.map(d => (
                    <button
                        key={d.year}
                        onClick={() => setSelectedYear(d.year)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${selectedYear === d.year
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                            }`}
                    >
                        {d.year}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Pie Chart for Selected Year */}
                <div className="card">
                    <h3 className="text-lg font-semibold mb-4 text-center">Répartition {selectedYear}</h3>
                    <div className="h-[350px] w-full relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={yearData.sources}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
                                        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                                        const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                                        const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
                                        return percent > 0.05 ? (
                                            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize={12}>
                                                {`${(percent * 100).toFixed(0)}%`}
                                            </text>
                                        ) : null;
                                    }}
                                    outerRadius={120}
                                    fill="#8884d8"
                                    dataKey="amount"
                                >
                                    {yearData.sources.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(val: any) => `${val} MDT`} />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-4 space-y-2">
                        {yearData.sources.map((source, idx) => (
                            <div key={idx} className="flex justify-between items-center text-sm border-b border-slate-50 last:border-0 py-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></div>
                                    <span className="text-slate-700 font-medium">{source.name}</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-slate-500">{source.amount} MDT</span>
                                    <span className="text-slate-900 font-bold w-12 text-right">{source.percent}%</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top Donors Trend */}
                <div className="card">
                    <h3 className="text-lg font-semibold mb-6">Évolution des Bailleurs Clés</h3>

                    <div className="h-[300px] mb-8">
                        <h4 className="text-sm font-medium text-slate-500 mb-2">BH BANK (Prêteur Historique)</h4>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={bhBankTrend}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="year" />
                                <YAxis />
                                <Tooltip cursor={{ fill: '#f8fafc' }} />
                                <Bar dataKey="amount" fill="#0088FE" radius={[4, 4, 0, 0]} name="BH Bank" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="h-[300px]">
                        <h4 className="text-sm font-medium text-slate-500 mb-2">ITFC (International Islamic Trade Finance Corporation)</h4>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={itfcTrend}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="year" />
                                <YAxis />
                                <Tooltip cursor={{ fill: '#f8fafc' }} />
                                <Bar dataKey="amount" fill="#00C49F" radius={[4, 4, 0, 0]} name="ITFC" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
