import { Activity, Building2, Wallet, TrendingUp, AlertTriangle } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import ContextBlock from '../components/ui/ContextBlock';
import KpiCard from '../components/ui/KpiCard';
import TimeSeriesChart from '../components/charts/TimeSeriesChart';
import AnalyticalPanel from '../components/layout/right-panel/AnalyticalPanel';
import AnalyticalGates from '../components/layout/right-panel/AnalyticalGates';
import AuditGlossary from '../components/layout/right-panel/AuditGlossary';
import QuickNotes from '../components/layout/right-panel/QuickNotes';
import AnalyticalLinks from '../components/layout/right-panel/AnalyticalLinks';

export default function Dashboard() {
    const { t, i18n } = useTranslation();
    const isAr = i18n.language === 'ar';
    const [period, setPeriod] = useState('all');

    const [financingData, setFinancingData] = useState<any[]>([]);
    const [kpis, setKpis] = useState<any>(null);

    useEffect(() => {
        const loadData = async () => {
            const suffix = isAr ? '_ar' : '';
            try {
                const [finModule, kpiModule] = await Promise.all([
                    import(`../data/financing_timeseries_dashboard${suffix}.json`),
                    import(`../data/kpis${suffix}.json`)
                ]);
                setFinancingData(finModule.default);
                setKpis(kpiModule.default);
            } catch (e) {
                console.error("Failed to load dashboard data", e);
            }
        };
        loadData();
    }, [isAr]);

    const filteredData = useMemo(() => {
        return financingData.filter(item => {
            if (period === 'all') return true;
            if (period === '2020-2023') return item.year >= 2020 && item.year <= 2023;
            if (period === '2024-2026') return item.year >= 2024 && item.year <= 2026;
            return true;
        });
    }, [financingData, period]);

    const dynamicStats = useMemo(() => {
        if (filteredData.length === 0) return { total: 0, peak: 0, peakYear: '-', average: 0, latestBudgetEp: 0, latestBudgetState: 0, guaranteeRate: 0 };

        const total = filteredData.reduce((acc, curr) => acc + curr.amount, 0);
        const peakItem = [...filteredData].sort((a, b) => b.amount - a.amount)[0];
        const average = total / filteredData.length;

        const latestItem = [...filteredData].sort((a, b) => b.year - a.year)[0];

        const guaranteedAmount = filteredData.filter(d => d.is_ep_guaranteed).reduce((acc, curr) => acc + curr.amount, 0);
        const guaranteeRate = total > 0 ? (guaranteedAmount / total) * 100 : 0;

        return {
            total,
            peak: peakItem.amount,
            peakYear: peakItem.year,
            average,
            latestBudgetEp: latestItem.share_of_ep_budget_pct,
            latestBudgetState: latestItem.share_of_state_budget_pct,
            guaranteeRate
        };
    }, [filteredData]);

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-900 pb-4">
                <div>
                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter">{t('dashboard.title')}</h2>
                    <p className="text-slate-500 text-sm font-semibold uppercase tracking-widest mt-1">{t('dashboard.subtitle')}</p>
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
                    <span className="text-sm font-black text-blue-400 uppercase tracking-[0.25em]">{t('dashboard.data_scope')}</span>
                </div>
                <p className="text-sm font-black text-slate-300 uppercase tracking-tight">
                    {t('dashboard.data_scope_desc')}
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5">
                {/* Main Content Column (75%) */}
                <div className="lg:col-span-9 space-y-6">
                    <ContextBlock type="warning" title={t('dashboard.data_warning_title')}>
                        <p className="text-sm">
                            {t('dashboard.data_warning_desc')}
                        </p>
                    </ContextBlock>

                    {/* KPIs Grid - Higher Density */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <KpiCard
                            title={t('kpi.total_creances.label')}
                            value={`${dynamicStats.total.toLocaleString()} MDT`}
                            subtext={period === 'all' ? t('dashboard.kpi_total_desc') : t('dashboard.temporal_scope') + ': ' + (period === '2020-2023' ? '2020-2023' : '2024-2026')}
                            icon={Wallet}
                            trend={kpis?.total_creances_7ans?.trend as any}
                            className="p-4"
                        />
                        <KpiCard
                            title={t('kpi.pic_annuel.label')}
                            value={`${dynamicStats.peak.toLocaleString()} MDT`}
                            subtext={t('dashboard.kpi_peak_desc', { year: dynamicStats.peakYear })}
                            icon={Activity}
                            trend={kpis?.pic_annuel?.trend as any}
                            className="p-4"
                        />
                        <KpiCard
                            title={t('kpi.moyenne_annuelle.label')}
                            value={`${Math.round(dynamicStats.average).toLocaleString()} MDT`}
                            subtext={t('dashboard.kpi_average_desc')}
                            icon={Building2}
                            className="p-4"
                        />
                        <KpiCard
                            title={t('kpi.part_budget.label')}
                            value={`${dynamicStats.latestBudgetEp}%`}
                            subtext={t('dashboard.kpi_budget_desc')}
                            icon={AlertTriangle}
                            trend={kpis?.part_budget_ep_2026?.trend as any}
                            isCritical={true}
                            className="p-4"
                        />
                    </div>

                    {/* Integrated Analytics Area */}
                    <div className="grid grid-cols-1 gap-6">
                        <div className="card bg-slate-800/80 backdrop-blur-xl p-4 rounded-none border border-slate-700 shadow-md leading-normal">
                            <div className="flex justify-between items-center mb-8 px-2">
                                <h3 className="text-base font-semibold text-slate-200 uppercase tracking-widest border-s-2 border-blue-500 ps-3">{t('dashboard.chart_title')}</h3>
                                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t('dashboard.source_label')}</div>
                            </div>
                            <TimeSeriesChart
                                data={filteredData}
                                dataKey="amount"
                                unit=" MDT"
                                height={350}
                            />
                            <div className="mt-6 p-4 bg-blue-500/5 border border-blue-500/10 rounded-none relative overflow-hidden">
                                <div className="absolute top-0 inset-s-0 w-0.5 h-full bg-blue-500/40" />
                                <h4 className="text-sm font-bold text-blue-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                                    <Activity size={12} />
                                    {t('dashboard.analytic_intelligence')}
                                </h4>
                                <p className="text-xs text-slate-400 leading-snug uppercase tracking-tight font-medium">
                                    {period === '2020-2023'
                                        ? t('dashboard.intelligence_2023')
                                        : t('dashboard.intelligence_2026')
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="card bg-slate-800/80 text-white p-5 rounded-none shadow-md border border-slate-700 leading-normal">
                            <h3 className="text-base font-semibold mb-6 flex items-center gap-2 uppercase tracking-widest text-blue-400 px-1">
                                <TrendingUp size={16} />
                                {t('dashboard.budget_pressure_title')}
                            </h3>
                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between text-xs mb-2 text-slate-400 uppercase tracking-wider font-bold">
                                        <span>{t('dashboard.ep_budget_share')}</span>
                                        <span className="text-blue-400 text-sm">{dynamicStats.latestBudgetEp}%</span>
                                    </div>
                                    <div className="w-full bg-slate-800 rounded-full h-1">
                                        <div className="bg-blue-500 h-1 rounded-full" style={{ width: `${dynamicStats.latestBudgetEp}%` }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-xs mb-2 text-slate-400 uppercase tracking-wider font-bold">
                                        <span>{t('dashboard.state_budget_share')}</span>
                                        <span className="text-emerald-400 text-sm">{dynamicStats.latestBudgetState}%</span>
                                    </div>
                                    <div className="w-full bg-slate-800 rounded-full h-1">
                                        <div className="bg-emerald-500 h-1 rounded-full" style={{ width: `${dynamicStats.latestBudgetState}%` }}></div>
                                    </div>
                                </div>
                            </div>

                            {/* Critical Impact Analysis Block */}
                            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-slate-700 pt-8">
                                <div className="md:col-span-2 space-y-4">
                                    <div className="flex items-center gap-3 text-amber-500 mb-2">
                                        <AlertTriangle size={20} />
                                        <h4 className="text-sm font-black uppercase tracking-[0.2em]">{t('dashboard.budget_alert_title')}</h4>
                                    </div>
                                    <p className="text-base text-slate-300 font-bold leading-relaxed uppercase tracking-tight">
                                        {t('dashboard.budget_alert_desc', { percentage: dynamicStats.latestBudgetEp })}
                                    </p>
                                    <p className="text-sm text-slate-400 font-medium leading-relaxed">
                                        {t('dashboard.budget_alert_impact')}
                                    </p>
                                </div>
                                <div className="bg-amber-500/5 border border-amber-500/20 p-5 space-y-3 overflow-hidden">
                                    <h5 className="text-[10px] font-black text-amber-500 uppercase tracking-widest border-b border-amber-500/20 pb-2 mb-2">{t('dashboard.risk_factors_title')}</h5>
                                    <ul className="space-y-3 text-[11px] font-bold text-slate-400 uppercase tracking-tight leading-tight">
                                        <li className="flex items-start gap-2">
                                            <div className="w-1.5 h-1.5 bg-amber-500 mt-1 shrink-0 rounded-none" />
                                            <span>{t('dashboard.risk_factor_1')}</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <div className="w-1.5 h-1.5 bg-amber-500 mt-1 shrink-0 rounded-none" />
                                            <span>{t('dashboard.risk_factor_2')}</span>
                                        </li>
                                        <li className="flex items-start gap-2 text-amber-200">
                                            <div className="w-1.5 h-1.5 bg-amber-500 mt-1 shrink-0 rounded-none" />
                                            <span>{t('dashboard.risk_factor_3')}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="card bg-slate-800/60 backdrop-blur-md p-5 rounded-none border border-slate-700 shadow-md flex flex-col justify-center leading-normal">
                            <h3 className="text-sm font-semibold text-white mb-6 uppercase tracking-widest border-b border-slate-700 pb-2 flex items-center justify-between">
                                {t('dashboard.risk_matrix_title')}
                                <div className="w-1.5 h-1.5 rounded-full bg-rose-500/80" />
                            </h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center py-2 border-b border-slate-900/50">
                                    <span className="text-xs text-slate-500 font-bold uppercase">{t('dashboard.debt_pib')}</span>
                                    <span className="data-value text-sm text-white">2.1%</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-slate-900/50">
                                    <span className="text-xs text-slate-500 font-bold uppercase">{t('dashboard.sov_guarantee')}</span>
                                    <span className="data-value text-sm text-white">{Math.round(dynamicStats.guaranteeRate)}%</span>
                                </div>
                                <div className="flex justify-between items-center py-2">
                                    <span className="text-xs text-slate-500 font-bold uppercase">{t('dashboard.break_even')}</span>
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
                                <label className="text-xs font-black text-slate-600 uppercase tracking-widest">{t('dashboard.temporal_scope')}</label>
                                <select
                                    value={period}
                                    onChange={(e) => setPeriod(e.target.value)}
                                    className="mt-2 block w-full text-xs font-black uppercase tracking-wider border border-slate-700 rounded-none bg-slate-800 p-2 text-slate-300 outline-none focus:border-blue-500 transition-all cursor-pointer"
                                >
                                    <option value="all">{t('dashboard.scope_all')}</option>
                                    <option value="2020-2023">{t('dashboard.scope_audit')}</option>
                                    <option value="2024-2026">{t('dashboard.scope_projected')}</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest">{t('dashboard.display_settings')}</label>
                                <div className="mt-3 space-y-2">
                                    <div className="flex items-center gap-2 px-3 py-2 bg-blue-500/5 border border-blue-500/20">
                                        <input type="checkbox" checked readOnly className="rounded-none bg-slate-900 border-slate-800 text-blue-600" />
                                        <span className="text-xs font-black text-blue-400 uppercase tracking-widest">{t('dashboard.amounts_mdt')}</span>
                                    </div>
                                    <div className="flex items-center gap-2 px-3 py-2 opacity-30 grayscale cursor-not-allowed">
                                        <input type="checkbox" disabled className="rounded-none bg-slate-900 border-slate-800" />
                                        <span className="text-xs font-black text-slate-600 uppercase tracking-widest">{t('dashboard.currency_percent')}</span>
                                    </div>
                                </div>
                            </div>
                        </AnalyticalGates>

                        <AuditGlossary
                            items={[
                                { term: t('dashboard.glossary_debt_term'), definition: t('dashboard.glossary_debt_def') },
                                { term: t('dashboard.glossary_eviction_term'), definition: t('dashboard.glossary_eviction_def') },
                                { term: t('dashboard.glossary_breakeven_term'), definition: t('dashboard.glossary_breakeven_def') }
                            ]}
                        />

                        <QuickNotes />

                        <AnalyticalLinks
                            title={t('dashboard.investigation_suite')}
                            links={[
                                { label: t('dashboard.map_backers'), path: "/finance/sources" },
                                { label: t('dashboard.source_docs'), path: "/finance/report" },
                                { label: t('dashboard.audit_protocol'), path: "/finance/methodology" }
                            ]}
                        />
                    </AnalyticalPanel>
                </div>
            </div>
        </div>
    );
}
