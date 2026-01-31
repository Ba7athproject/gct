import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import mixData from '../data/mix_transferts_garanties_autres.json';

export default function Structure() {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-slate-800">Structure du Financement</h2>
                <p className="text-slate-500">Répartition entre Transferts, Garanties et Autres obligations.</p>
            </div>

            <div className="card">
                <h3 className="text-lg font-semibold mb-6">Évolution de la Composition (2020-2026)</h3>
                <div className="h-[500px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={mixData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                            <XAxis dataKey="year" />
                            <YAxis unit="M" />
                            <Tooltip
                                cursor={{ fill: '#f1f5f9' }}
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                            />
                            <Legend />

                            <Bar dataKey="garanties" name="Garanties" stackId="a" fill="#3b82f6" radius={[0, 0, 4, 4]} />
                            <Bar dataKey="transferts" name="Transferts" stackId="a" fill="#10b981" />
                            <Bar dataKey="autres" name="Autres Ob." stackId="a" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {mixData.slice(-3).map((yearData) => {
                    const total = yearData.transferts + yearData.garanties + yearData.autres;
                    return (
                        <div key={yearData.year} className="card bg-white">
                            <h4 className="font-bold text-slate-800 mb-4 text-center">{yearData.year}</h4>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500"></div> Garanties</span>
                                    <span className="font-medium">{Math.round((yearData.garanties / total) * 100)}%</span>
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-2">
                                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${(yearData.garanties / total) * 100}%` }}></div>
                                </div>

                                <div className="flex justify-between items-center text-sm">
                                    <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Transferts</span>
                                    <span className="font-medium">{Math.round((yearData.transferts / total) * 100)}%</span>
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-2">
                                    <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${(yearData.transferts / total) * 100}%` }}></div>
                                </div>

                                <div className="flex justify-between items-center text-sm">
                                    <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-slate-400"></div> Autres</span>
                                    <span className="font-medium">{Math.round((yearData.autres / total) * 100)}%</span>
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-2">
                                    <div className="bg-slate-400 h-2 rounded-full" style={{ width: `${(yearData.autres / total) * 100}%` }}></div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
