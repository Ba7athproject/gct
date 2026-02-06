import { Activity, Building2, Wallet, TrendingUp, AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import ContextBlock from '../components/ui/ContextBlock';
import KpiCard from '../components/ui/KpiCard';
import TimeSeriesChart from '../components/charts/TimeSeriesChart';
import AnalyticalPanel from '../components/layout/right-panel/AnalyticalPanel';
import AnalyticalGates from '../components/layout/right-panel/AnalyticalGates';
import AuditGlossary from '../components/layout/right-panel/AuditGlossary';
import QuickNotes from '../components/layout/right-panel/QuickNotes';
import AnalyticalLinks from '../components/layout/right-panel/AnalyticalLinks';
import financingData from '../data/financing_timeseries_dashboard.json';
import kpis from '../data/kpis.json';

export default function Dashboard() {
    const [period, setPeriod] = useState('all');

    const filteredData = financingData.filter(item => {
        if (period === 'all') return true;
        if (period === '2020-2023') return item.year >= 2020 && item.year <= 2023;
        if (period === '2024-2026') return item.year >= 2024 && item.year <= 2026;
        return true;
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-900 pb-4">
                <div>
                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Console d'Investigation</h2>
                    <p className="text-slate-500 text-sm font-semibold uppercase tracking-widest mt-1">Synthèse multidimensionnelle des flux financiers GCT (2020-2026)</p>
                </div>
                <div className="flex gap-2">
                    <span className="expert-tag bg-blue-500/10 text-blue-400 border-blue-500/20">
                        AUDIT_PRÊT
                    </span>
                    <span className="expert-tag border-slate-800 text-slate-600">
                        VERS_1.3.0
                    </span>
                </div>
            </div>

            {/* Data Scope Banner */}
            <div className="bg-blue-500/10 border border-blue-500/20 px-4 py-2.5 rounded-none flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                    <span className="text-sm font-black text-blue-400 uppercase tracking-[0.25em]">Portée des Données</span>
                </div>
                <p className="text-sm font-black text-slate-300 uppercase tracking-tight">
                    Arrêt des séries à Janvier 2026 (Annonce subvention BAD - 110M$)
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5">
                {/* Main Content Column (75%) */}
                <div className="lg:col-span-9 space-y-6">
                    <ContextBlock type="warning" title="Avertissement de Données">
                        <p className="text-sm">
                            Les agrégats ci-dessous incluent des <strong>crédits extérieurs (garantis par l'État)</strong> et des <strong>concours bancaires locales</strong>.
                            Données 2024-2026 projetées selon les lois de finances et budgets prévisionnels des Entreprises Publiques.
                        </p>
                    </ContextBlock>

                    {/* KPIs Grid - Higher Density */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <KpiCard
                            title={kpis.total_creances_7ans.label}
                            value={`${kpis.total_creances_7ans.value.toLocaleString()} MDT`}
                            subtext="Cumul consolidé (20-26)"
                            icon={Wallet}
                            trend={kpis.total_creances_7ans.trend as any}
                            className="p-4"
                        />
                        <KpiCard
                            title={kpis.pic_annuel.label}
                            value={`${kpis.pic_annuel.value.toLocaleString()} MDT`}
                            subtext={`Record atteint en ${kpis.pic_annuel.year}`}
                            icon={Activity}
                            trend={kpis.pic_annuel.trend as any}
                            className="p-4"
                        />
                        <KpiCard
                            title={kpis.moyenne_annuelle.label}
                            value={`${kpis.moyenne_annuelle.value.toLocaleString()} MDT`}
                            subtext="Exigence de liquidité moyenne"
                            icon={Building2}
                            className="p-4"
                        />
                        <KpiCard
                            title={kpis.part_budget_ep_2026.label}
                            value={`${kpis.part_budget_ep_2026.value}%`}
                            subtext="Consommation budget EP (2026)"
                            icon={AlertTriangle}
                            trend={kpis.part_budget_ep_2026.trend as any}
                            isCritical={true}
                            className="p-4"
                        />
                    </div>

                    {/* Integrated Analytics Area */}
                    <div className="grid grid-cols-1 gap-6">
                        <div className="card bg-slate-800/80 backdrop-blur-xl p-4 rounded-none border border-slate-700 shadow-md leading-normal">
                            <div className="flex justify-between items-center mb-8 px-2">
                                <h3 className="text-base font-semibold text-slate-200 uppercase tracking-widest border-l-2 border-blue-500 pl-3">Trajectoire des Créances GCT</h3>
                                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Source: DB_LOI_FINANCES</div>
                            </div>
                            <TimeSeriesChart
                                data={filteredData}
                                dataKey="amount"
                                unit=" MDT"
                                height={350}
                            />
                            <div className="mt-6 p-4 bg-blue-500/5 border border-blue-500/10 rounded-none relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-0.5 h-full bg-blue-500/40" />
                                <h4 className="text-sm font-bold text-blue-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                                    <Activity size={12} />
                                    Intelligence Analytique
                                </h4>
                                <p className="text-xs text-slate-400 leading-snug uppercase tracking-tight font-medium">
                                    {period === '2020-2023'
                                        ? "Période 2020-2023 : Anomalie détectée en 2022. Le pic d'exposition est corrélé aux fluctuations majeures des prix des intrants énergétiques, imposant une garantie souveraine critique."
                                        : "Projection 2024-2026 : Stabilisation relative du flux. Le point de vigilance reste la part structurelle occupée dans l'enveloppe globale des Entreprises Publiques."
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="card bg-slate-800/80 text-white p-5 rounded-none shadow-md border border-slate-700 leading-normal">
                            <h3 className="text-base font-semibold mb-6 flex items-center gap-2 uppercase tracking-widest text-blue-400 px-1">
                                <TrendingUp size={16} />
                                Pression Budgétaire (2026)
                            </h3>
                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between text-xs mb-2 text-slate-400 uppercase tracking-wider font-bold">
                                        <span>Part Budget Entreprises Publiques</span>
                                        <span className="text-blue-400 text-sm">{kpis.part_budget_ep_2026.value}%</span>
                                    </div>
                                    <div className="w-full bg-slate-800 rounded-full h-1">
                                        <div className="bg-blue-500 h-1 rounded-full" style={{ width: `${kpis.part_budget_ep_2026.value}%` }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-xs mb-2 text-slate-400 uppercase tracking-wider font-bold">
                                        <span>Part Budget National de l'État</span>
                                        <span className="text-emerald-400 text-sm">14.5%</span>
                                    </div>
                                    <div className="w-full bg-slate-800 rounded-full h-1">
                                        <div className="bg-emerald-500 h-1 rounded-full" style={{ width: '14.5%' }}></div>
                                    </div>
                                </div>
                            </div>

                            {/* Critical Impact Analysis Block */}
                            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-slate-700 pt-8">
                                <div className="md:col-span-2 space-y-4">
                                    <div className="flex items-center gap-3 text-amber-500 mb-2">
                                        <AlertTriangle size={20} />
                                        <h4 className="text-sm font-black uppercase tracking-[0.2em]">Alerte : Répercussions Budgétaires</h4>
                                    </div>
                                    <p className="text-base text-slate-300 font-bold leading-relaxed uppercase tracking-tight">
                                        Le GCT s'approprie <span className="text-amber-500 underline decoration-amber-500/50 underline-offset-4">55% du budget total</span> alloué aux Entreprises Publiques tunisiennes pour 2026.
                                    </p>
                                    <p className="text-sm text-slate-400 font-medium leading-relaxed">
                                        Cette concentration extrême génère un <span className="text-white font-black">effet d'éviction structurel</span>. Les secteurs vitaux (STEG, SONEDE, Transport) voient leur marge de manoeuvre se réduire au profit de la couverture des dettes et garanties du GCT.
                                    </p>
                                </div>
                                <div className="bg-amber-500/5 border border-amber-500/20 p-5 space-y-3 overflow-hidden">
                                    <h5 className="text-[10px] font-black text-amber-500 uppercase tracking-widest border-b border-amber-500/20 pb-2 mb-2">Facteurs de Risque</h5>
                                    <ul className="space-y-3 text-[11px] font-bold text-slate-400 uppercase tracking-tight leading-tight">
                                        <li className="flex items-start gap-2">
                                            <div className="w-1.5 h-1.5 bg-amber-500 mt-1 shrink-0 rounded-none" />
                                            <span>Dépendance totale à la garantie souveraine.</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <div className="w-1.5 h-1.5 bg-amber-500 mt-1 shrink-0 rounded-none" />
                                            <span>Fragilité face aux chocs des cours mondiaux.</span>
                                        </li>
                                        <li className="flex items-start gap-2 text-amber-200">
                                            <div className="w-1.5 h-1.5 bg-amber-500 mt-1 shrink-0 rounded-none" />
                                            <span>Incapacité de désendettement autonome.</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="card bg-slate-800/60 backdrop-blur-md p-5 rounded-none border border-slate-700 shadow-md flex flex-col justify-center leading-normal">
                            <h3 className="text-sm font-semibold text-white mb-6 uppercase tracking-widest border-b border-slate-700 pb-2 flex items-center justify-between">
                                Matrice des Risques
                                <div className="w-1.5 h-1.5 rounded-full bg-rose-500/80" />
                            </h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center py-2 border-b border-slate-900/50">
                                    <span className="text-xs text-slate-500 font-bold uppercase">Dette / PIB (est.)</span>
                                    <span className="data-value text-sm text-white">2.1%</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-slate-900/50">
                                    <span className="text-xs text-slate-500 font-bold uppercase">Garantie Souveraine</span>
                                    <span className="data-value text-sm text-white">88%</span>
                                </div>
                                <div className="flex justify-between items-center py-2">
                                    <span className="text-xs text-slate-500 font-bold uppercase">Seuil de Rentabilité</span>
                                    <span className="data-value text-sm text-blue-400">+12%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Analytical Panel (25%) */}
                <div className="lg:col-span-3">
                    <AnalyticalPanel>
                        <AnalyticalGates>
                            <div>
                                <label className="text-xs font-black text-slate-600 uppercase tracking-widest">Portée Temporelle</label>
                                <select
                                    value={period}
                                    onChange={(e) => setPeriod(e.target.value)}
                                    className="mt-2 block w-full text-xs font-black uppercase tracking-wider border border-slate-700 rounded-none bg-slate-800 p-2 text-slate-300 outline-none focus:border-blue-500 transition-all cursor-pointer"
                                >
                                    <option value="all">Suite Complète (2020-2026)</option>
                                    <option value="2020-2023">Audit Historique (20-23)</option>
                                    <option value="2024-2026">Flux Projeté (24-26)</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Paramètres d'Affichage</label>
                                <div className="mt-3 space-y-2">
                                    <div className="flex items-center gap-2 px-3 py-2 bg-blue-500/5 border border-blue-500/20">
                                        <input type="checkbox" checked readOnly className="rounded-none bg-slate-900 border-slate-800 text-blue-600" />
                                        <span className="text-xs font-black text-blue-400 uppercase tracking-widest">Montants (MDT)</span>
                                    </div>
                                    <div className="flex items-center gap-2 px-3 py-2 opacity-30 grayscale cursor-not-allowed">
                                        <input type="checkbox" disabled className="rounded-none bg-slate-900 border-slate-800" />
                                        <span className="text-xs font-black text-slate-600 uppercase tracking-widest">Devise (%)</span>
                                    </div>
                                </div>
                            </div>
                        </AnalyticalGates>

                        <AuditGlossary
                            items={[
                                { term: 'Dette_Garantie', definition: 'Prêts contractés par le GCT où l\'État agit comme garant principal en cas de défaut.' },
                                { term: 'Effet_d\'Éviction', definition: 'Absorption de la liquidité commerciale par l\'État réduisant l\'accès au crédit du secteur privé.' },
                                { term: 'Seuil_Rentabilité', definition: 'Le niveau de production précis requis pour neutraliser tous les coûts d\'audit fixes et financiers.' }
                            ]}
                        />

                        <QuickNotes />

                        <AnalyticalLinks
                            title="Suite d'Investigation"
                            links={[
                                { label: "Cartographie Bailleurs", path: "/finance/sources" },
                                { label: "Documents Sources", path: "/finance/report" },
                                { label: "Protocole d'Audit", path: "/finance/methodology" }
                            ]}
                        />
                    </AnalyticalPanel>
                </div>
            </div>
        </div>
    );
}
