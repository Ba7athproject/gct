import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceArea } from 'recharts';
import financementData from '../data/financement_2020_2026.json';

const phases = [
    { x1: 2020, x2: 2021, label: "Stabilité", color: "#3b82f6", desc: "Croissance modérée (+8.9%)" },
    { x1: 2021, x2: 2022, label: "Boom", color: "#10b981", desc: "Explosion du financement (+58.5%)" },
    { x1: 2022, x2: 2023, label: "Krach", color: "#ef4444", desc: "Correction sévère (-15.0%)" },
    { x1: 2023, x2: 2026, label: "Stabilisation", color: "#f59e0b", desc: "Retour au calme (+2.6% cumulé)" },
];

export default function Evolution() {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-slate-800">Évolution Temporelle (2020-2026)</h2>
                <p className="text-slate-500">Analyse des 4 phases majeures du cycle de financement et des Créances.</p>
            </div>

            <div className="card">
                <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={financementData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                            <XAxis dataKey="year" padding={{ left: 30, right: 30 }} />
                            <YAxis unit="M" />
                            <Tooltip
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                            />

                            {/* Phase Backgrounds */}
                            {phases.map((phase, idx) => (
                                <ReferenceArea
                                    key={idx}
                                    x1={phase.x1}
                                    x2={phase.x2}
                                    strokeOpacity={0}
                                    fill={phase.color}
                                    fillOpacity={0.05}
                                />
                            ))}

                            <Line
                                type="monotone"
                                dataKey="montant"
                                stroke="#1e293b"
                                strokeWidth={3}
                                dot={{ r: 6, fill: '#1e293b', strokeWidth: 2, stroke: '#fff' }}
                                activeDot={{ r: 8 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Legend / Phase Details */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
                    {phases.map((phase, idx) => (
                        <div key={idx} className="p-4 rounded-lg bg-slate-50 border border-slate-100 flex flex-col h-full">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: phase.color }}></div>
                                <h4 className="font-bold text-slate-800">{phase.label}</h4>
                            </div>
                            <div className="text-xs font-mono text-slate-400 mb-1">{phase.x1 === phase.x2 ? phase.x1 : `${phase.x1}-${phase.x2}`}</div>
                            <p className="text-sm text-slate-600 mt-auto">{phase.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
