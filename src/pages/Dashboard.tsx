import { Activity, Building2, Wallet } from 'lucide-react';
import ContextBlock from '../components/ui/ContextBlock';
import KpiCard from '../components/ui/KpiCard';
import TimeSeriesChart from '../components/charts/TimeSeriesChart';
import financingData from '../data/financing_timeseries.json';
import kpis from '../data/kpis.json';

export default function Dashboard() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Tableau de Bord</h2>
                    <p className="text-slate-500">Synthèse Financière et Créances GCT (2020-2026)</p>
                </div>
            </div>

            <ContextBlock type="warning" title="Note importante">
                <p>
                    <strong>Dans ce site, le terme "financement" désigne principalement les prêts et crédits</strong> accordés au Groupe Chimique Tunisien, souvent avec la garantie de l'État.
                    Ces montants correspondent donc à des <strong>dettes</strong> que l'entreprise devra rembourser, avec des conditions spécifiques selon chaque bailleur (banques locales, institutions internationales, etc.).
                </p>
                <p className="mt-2 text-xs opacity-80">⚠️ Les données 2024-2026 sont des estimations/prévisions.</p>
            </ContextBlock>

            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <KpiCard
                    title={kpis.total_creances_7ans.label}
                    value={`${kpis.total_creances_7ans.value.toLocaleString()} ${kpis.total_creances_7ans.unit}`}
                    subtext={kpis.total_creances_7ans.subtext}
                    icon={Wallet}
                    trend={kpis.total_creances_7ans.trend as any}
                />
                <KpiCard
                    title={kpis.pic_annuel.label}
                    value={`${kpis.pic_annuel.value.toLocaleString()} ${kpis.pic_annuel.unit}`}
                    subtext={`${kpis.pic_annuel.subtext} (${kpis.pic_annuel.year})`}
                    icon={Activity}
                    trend={kpis.pic_annuel.trend as any}
                />
                <KpiCard
                    title={kpis.moyenne_annuelle.label}
                    value={`${kpis.moyenne_annuelle.value.toLocaleString()} ${kpis.moyenne_annuelle.unit}`}
                    subtext={kpis.moyenne_annuelle.subtext}
                    icon={Building2}
                />
                <KpiCard
                    title={kpis.part_budget_ep_2026.label}
                    value={`${kpis.part_budget_ep_2026.value}${kpis.part_budget_ep_2026.unit}`}
                    subtext={kpis.part_budget_ep_2026.subtext}
                    icon={Activity}
                    trend={kpis.part_budget_ep_2026.trend as any}
                />
            </div>

            {/* Main Chart Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 card bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                    <h3 className="text-lg font-semibold mb-6">Trajectoire Globale de Financement</h3>
                    <TimeSeriesChart
                        data={financingData}
                        dataKey="amount"
                        unit=" MDT"
                    />
                </div>

                <div className="card bg-slate-800 text-white border-slate-700 p-6 rounded-xl shadow-sm">
                    <h3 className="text-lg font-semibold mb-4 text-white">Contexte Budgétaire 2026</h3>
                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between text-sm mb-1 text-slate-300">
                                <span>Poids dans le Budget EP</span>
                                <span>{kpis.part_budget_ep_2026.value}%</span>
                            </div>
                            <div className="w-full bg-slate-700 rounded-full h-2">
                                <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${kpis.part_budget_ep_2026.value}%` }}></div>
                            </div>
                        </div>

                        {/* Note: I'm temporarily handling the 2nd progress bar with static data until I extract budgetData fully if needed, 
                            or I can calculate it if I had the full budget json. For now, assuming standard static value or reusing logic if I had it.
                            I will assume the budget context logic is specific enough to keep somewhat static here or move to a component later.
                        */}
                        <div>
                            <div className="flex justify-between text-sm mb-1 text-slate-300">
                                <span>Poids dans le Budget National</span>
                                <span>14.5%</span>
                            </div>
                            <div className="w-full bg-slate-700 rounded-full h-2">
                                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '14.5%' }}></div>
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
