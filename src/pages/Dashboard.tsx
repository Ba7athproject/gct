import { useMemo } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { ArrowUpRight, ArrowDownRight, Activity, Wallet, Building2 } from 'lucide-react';
import financementData from '../data/financement_2020_2026.json';
import budgetData from '../data/budget_ep_2024_2026.json';

const KPICard = ({ title, value, subtext, icon: Icon, trend }: any) => (
    <div className="card flex items-start justify-between">
        <div>
            <p className="text-sm font-medium text-slate-500">{title}</p>
            <h3 className="text-2xl font-bold mt-1 text-slate-900">{value}</h3>
            <p className={`text-xs mt-1 flex items-center gap-1 ${trend === 'up' ? 'text-emerald-600' : trend === 'down' ? 'text-rose-600' : 'text-slate-500'}`}>
                {trend === 'up' && <ArrowUpRight size={14} />}
                {trend === 'down' && <ArrowDownRight size={14} />}
                {subtext}
            </p>
        </div>
        <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
            <Icon size={20} />
        </div>
    </div>
);

export default function Dashboard() {
    const stats = useMemo(() => {
        const total7Years = financementData.reduce((acc, curr) => acc + curr.montant, 0);
        const avg = total7Years / financementData.length;
        const peak = financementData.reduce((prev, current) => (prev.montant > current.montant) ? prev : current);

        // Growth calculation (2020 to 2026)
        const start = financementData.find(d => d.year === 2020)?.montant || 1;
        const end = financementData.find(d => d.year === 2026)?.montant || 1;
        const growth = ((end - start) / start) * 100;

        return {
            total: total7Years.toLocaleString('fr-TN', { maximumFractionDigits: 0 }) + ' MDT',
            average: avg.toLocaleString('fr-TN', { maximumFractionDigits: 0 }) + ' MDT',
            peak: `${peak.montant.toLocaleString('fr-TN')} MDT (${peak.year})`,
            growth: `+${growth.toFixed(1)}% (cumulé)`
        };
    }, []);

    const latestBudget = budgetData[budgetData.length - 1]; // 2026

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Tableau de Bord</h2>
                    <p className="text-slate-500">Synthèse Financière et Créances GCT (2020-2026)</p>
                </div>
                <div className="bg-amber-50 text-amber-800 px-4 py-2 rounded-lg text-sm border border-amber-200">
                    ⚠️ Données 2024-2026 sont des estimations/prévisions.
                </div>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <KPICard
                    title="Total Créances (7 ans)"
                    value={stats.total}
                    subtext="Volume cumulé 2020-2026"
                    icon={Wallet}
                    trend="up"
                />
                <KPICard
                    title="Pic Annuel"
                    value={stats.peak}
                    subtext="Année de crise/boom"
                    icon={Activity}
                    trend="down"
                />
                <KPICard
                    title="Moyenne Annuelle"
                    value={stats.average}
                    subtext="Besoin structurel moyen"
                    icon={Building2}
                />
                <KPICard
                    title="Part Budget EP (2026)"
                    value={`${latestBudget.gct_percent_of_ep}%`}
                    subtext="du budget total des entreprises publiques"
                    icon={Activity}
                    trend="up"
                />
            </div>

            {/* Main Chart Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 card">
                    <h3 className="text-lg font-semibold mb-6">Trajectoire Globale de Financement</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={financementData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorMontant" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="year" />
                                <YAxis unit="M" />
                                <Tooltip
                                    formatter={(value: any) => [`${Number(value).toLocaleString()} MDT`, 'Montant']}
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="montant"
                                    stroke="#2563eb"
                                    fillOpacity={1}
                                    fill="url(#colorMontant)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="card bg-slate-800 text-white border-slate-700">
                    <h3 className="text-lg font-semibold mb-4 text-white">Contexte Budgétaire 2026</h3>
                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between text-sm mb-1 text-slate-300">
                                <span>Poids dans le Budget EP</span>
                                <span>{latestBudget.gct_percent_of_ep}%</span>
                            </div>
                            <div className="w-full bg-slate-700 rounded-full h-2">
                                <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${latestBudget.gct_percent_of_ep}%` }}></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between text-sm mb-1 text-slate-300">
                                <span>Poids dans le Budget National</span>
                                <span>{latestBudget.gct_percent_of_national}%</span>
                            </div>
                            <div className="w-full bg-slate-700 rounded-full h-2">
                                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${latestBudget.gct_percent_of_national}%` }}></div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-slate-700">
                            <p className="text-sm text-slate-400">
                                Le GCT siphonne plus de la moitié du budget alloué aux entreprises publiques, limitant les capacités d'investissement ailleurs.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
