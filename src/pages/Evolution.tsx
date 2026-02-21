import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceArea } from 'recharts';
import { Info } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ContextBlock from '../components/ui/ContextBlock';
import AnalyticalPanel from '../components/layout/right-panel/AnalyticalPanel';
import AnalyticalGates from '../components/layout/right-panel/AnalyticalGates';
import AuditGlossary from '../components/layout/right-panel/AuditGlossary';
import QuickNotes from '../components/layout/right-panel/QuickNotes';
import AnalyticalLinks from '../components/layout/right-panel/AnalyticalLinks';
import { useState, useEffect } from 'react';

export default function Evolution() {
    const { t, i18n } = useTranslation();
    const isRtl = i18n.dir() === 'rtl';
    const isAr = i18n.language === 'ar';

    const [financementData, setFinancementData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            const suffix = isAr ? '_ar' : '';
            try {
                const module = await import(`../data/financement_2020_2026${suffix}.json`);
                setFinancementData(module.default);
            } catch (e) {
                console.error("Failed to load financing data", e);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [isAr]);

    const phases = [
        { x1: 2020, x2: 2021, label: t('evolution.phases.stability.label'), color: "#3b82f6", desc: t('evolution.phases.stability.desc') },
        { x1: 2021, x2: 2022, label: t('evolution.phases.expansion.label'), color: "#10b981", desc: t('evolution.phases.expansion.desc') },
        { x1: 2022, x2: 2023, label: t('evolution.phases.contraction.label'), color: "#ef4444", desc: t('evolution.phases.contraction.desc') },
        { x1: 2023, x2: 2026, label: t('evolution.phases.plateau.label'), color: "#f59e0b", desc: t('evolution.phases.plateau.desc') },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-900 pb-4">
                <div>
                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter">{t('evolution.title')}</h2>
                    <p className="text-slate-400 text-sm font-semibold uppercase tracking-widest mt-1">{t('evolution.subtitle')}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5">
                {/* Main Content Column */}
                <div className="lg:col-span-9 space-y-6">
                    {loading ? (
                        <div className="h-64 flex items-center justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                        </div>
                    ) : (
                        <>
                            <ContextBlock type="info" title={t('evolution.methodology_title')}>
                                <p className="text-sm uppercase tracking-tighter font-bold">
                                    {t('evolution.methodology_desc')}
                                </p>
                            </ContextBlock>

                            <div className="card bg-slate-800/80 backdrop-blur-xl p-4 rounded-none border border-slate-700 shadow-md leading-normal">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 px-2 gap-4">
                                    <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-widest flex items-center gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500/60" />
                                        {t('evolution.chart_title')}
                                    </h3>
                                    <div className="flex flex-wrap gap-4">
                                        {phases.map((p, i) => (
                                            <div key={i} className="flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-none" style={{ backgroundColor: p.color, opacity: 0.6 }}></div>
                                                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{p.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="h-[400px] w-full min-w-0 overflow-hidden">
                                    <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                                        <LineChart data={financementData} margin={{ top: 10, right: 30, left: 10, bottom: 20 }}>
                                            <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#ffffff08" />
                                            <XAxis
                                                dataKey="year"
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fill: '#64748b', fontSize: 13, fontWeight: 500 }}
                                                dy={8}
                                            />
                                            <YAxis
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fill: '#64748b', fontSize: 13, fontWeight: 500 }}
                                                unit=" MDT"
                                            />
                                            <Tooltip
                                                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #4b5563', borderRadius: '0px', padding: '10px', textAlign: isRtl ? 'right' : 'left' }}
                                                itemStyle={{ fontSize: '13px', color: '#fff', fontWeight: '600' }}
                                                labelStyle={{ fontSize: '13px', color: '#94a3b8', fontWeight: 'bold', marginBottom: '6px', borderBottom: '1px solid #374151', paddingBottom: '4px' }}
                                                formatter={(value: any) => [`${value?.toLocaleString(i18n.language === 'ar' ? 'ar-TN' : 'fr-TN')} MDT`, t('evolution.volume_audited')]}
                                            />

                                            {/* Phase Backgrounds */}
                                            {phases.map((phase, idx) => (
                                                <ReferenceArea
                                                    key={idx}
                                                    x1={phase.x1}
                                                    x2={phase.x2}
                                                    strokeOpacity={0}
                                                    fill={phase.color}
                                                    fillOpacity={0.03}
                                                />
                                            ))}

                                            <Line
                                                type="monotone"
                                                dataKey="montant"
                                                name={t('evolution.volume_audited')}
                                                stroke="#3b82f6"
                                                strokeWidth={2}
                                                dot={{ r: 2.5, fill: '#1f2937', strokeWidth: 1.5, stroke: '#3b82f6' }}
                                                activeDot={{ r: 4, fill: '#3b82f6', strokeWidth: 1.5, stroke: '#fff' }}
                                                animationDuration={1500}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {phases.map((phase, idx) => (
                                    <div key={idx} className="card bg-slate-900/40 backdrop-blur-md p-4 rounded-none border border-slate-900 flex gap-4 items-start group hover:border-blue-500/30 transition-all text-start">
                                        <div className="p-2 rounded-none border border-slate-800 group-hover:border-blue-500/20" style={{ color: phase.color }}>
                                            <Info size={16} />
                                        </div>
                                        <div className="space-y-1">
                                            <h4 className="text-xs font-black text-white uppercase tracking-wider">{phase.label}</h4>
                                            <div className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{phase.x1} ➔ {phase.x2}</div>
                                            <p className="text-xs text-slate-500 leading-relaxed uppercase tracking-tighter font-medium underline decoration-slate-900/50">{phase.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {/* Right Analytical Panel */}
                <div className="lg:col-span-3">
                    <AnalyticalPanel>
                        <AnalyticalGates>
                            <div>
                                <label className="text-xs font-black text-slate-600 uppercase tracking-widest">{t('evolution.main_indicator')}</label>
                                <select className="mt-1 block w-full text-xs font-black border-slate-700 rounded-none bg-slate-800 text-slate-300 p-2" disabled>
                                    <option>{t('evolution.finance_volume')}</option>
                                    <option>{t('evolution.debt_service')}</option>
                                </select>
                            </div>
                            <div className="flex items-center gap-2 pt-2">
                                <input type="checkbox" checked readOnly className="rounded-none bg-slate-800/80 border-slate-800 text-blue-600" />
                                <span className="text-xs font-black text-slate-500 uppercase">{t('evolution.phase_overlay')}</span>
                            </div>
                        </AnalyticalGates>

                        <AuditGlossary
                            items={[
                                { term: t('evolution.glossary_shock'), definition: t('evolution.glossary_shock_def') },
                                { term: t('dashboard.sov_guarantee'), definition: t('evolution.glossary_shock_def') }
                            ]}
                        />

                        <QuickNotes />

                        <AnalyticalLinks
                            title={t('evolution.pivot_links')}
                            links={[
                                { label: t('nav.dashboard'), path: "/finance" },
                                { label: t('nav.structure'), path: "/finance/structure" }
                            ]}
                        />
                    </AnalyticalPanel>
                </div>
            </div>
        </div>
    );
}
