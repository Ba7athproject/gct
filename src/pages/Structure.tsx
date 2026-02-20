import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useTranslation } from 'react-i18next';
import mixData from '../data/mix_transferts_garanties_autres.json';
import ContextBlock from '../components/ui/ContextBlock';
import AnalyticalPanel from '../components/layout/right-panel/AnalyticalPanel';
import AnalyticalGates from '../components/layout/right-panel/AnalyticalGates';
import AuditGlossary from '../components/layout/right-panel/AuditGlossary';
import QuickNotes from '../components/layout/right-panel/QuickNotes';
import AnalyticalLinks from '../components/layout/right-panel/AnalyticalLinks';

export default function Structure() {
    const { t, i18n } = useTranslation();
    const isRtl = i18n.dir() === 'rtl';

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                    <h2 className="text-3xl font-black text-white uppercase tracking-tight">
                        {t('structure.title')}
                    </h2>
                    <p className="text-slate-500 text-sm font-semibold uppercase tracking-widest mt-1">
                        {t('structure.subtitle')}
                    </p>
                </div>
            </div>

            <div className="space-y-8">
                <ContextBlock type="info" title={t('structure.analysis_title')}>
                    <p className="text-sm md:text-base uppercase tracking-tight font-bold leading-relaxed">
                        {t('structure.analysis_desc')}
                    </p>
                </ContextBlock>

                <div className="card bg-slate-800/80 backdrop-blur-xl p-4 rounded-none border border-slate-700 shadow-md leading-normal">
                    <div className="px-4 py-2">
                        <h3 className="text-sm md:text-base font-semibold text-slate-200 mb-6 flex items-center gap-3 uppercase tracking-widest">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500/60" />
                            {t('structure.chart_title')}
                        </h3>
                        <div className="h-[400px] w-full min-w-0 overflow-hidden">
                            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                                <BarChart data={mixData} margin={{ top: 10, right: 30, left: 10, bottom: 24 }}>
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
                                        cursor={{ fill: '#ffffff04' }}
                                        contentStyle={{
                                            backgroundColor: '#1f2937',
                                            border: '1px solid #4b5563',
                                            borderRadius: '0px',
                                            fontSize: '13px',
                                            textAlign: isRtl ? 'right' : 'left'
                                        }}
                                        itemStyle={{ color: '#fff', fontWeight: '600' }}
                                        formatter={(value: any, name: any) => [`${value?.toLocaleString(i18n.language === 'ar' ? 'ar-TN' : 'fr-TN')} MDT`, t(`structure.${name.toLowerCase().replace(' ', '_').replace('\'', '')}`)]}
                                    />
                                    <Legend
                                        iconType="rect"
                                        iconSize={10}
                                        wrapperStyle={{ paddingTop: '20px' }}
                                        formatter={(value) => {
                                            const key = value === "Garanties d'État" ? 'guarantees' : value === "Transferts Directs" ? 'transfers' : 'others';
                                            return (
                                                <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                                                    {t(`structure.${key}`)}
                                                </span>
                                            );
                                        }}
                                    />

                                    <Bar
                                        dataKey="garanties"
                                        name="Garanties d'État"
                                        stackId="a"
                                        fill="#3b82f6"
                                        radius={[0, 0, 0, 0]}
                                        barSize={28}
                                    />
                                    <Bar dataKey="transferts" name="Transferts Directs" stackId="a" fill="#10b981" barSize={28} />
                                    <Bar
                                        dataKey="autres"
                                        name="Autres Obligations"
                                        stackId="a"
                                        fill="#94a3b8"
                                        radius={[0, 0, 0, 0]}
                                        barSize={28}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {mixData.slice(-3).map((yearData) => {
                        const total = yearData.transferts + yearData.garanties + yearData.autres;
                        return (
                            <div
                                key={yearData.year}
                                className="card bg-slate-800/80 backdrop-blur-md p-6 rounded-none border border-slate-700 group hover:border-blue-500/40 transition-all"
                            >
                                <div className="flex items-center justify-between mb-4 border-b border-slate-700 pb-2 gap-2">
                                    <h4 className="text-base font-black text-white uppercase tracking-[0.2em]">
                                        {t('structure.audit')}_{yearData.year}
                                    </h4>
                                    <span className="text-sm font-black text-blue-400 uppercase">
                                        {t('structure.volume')}: {total.toLocaleString(i18n.language === 'ar' ? 'ar-TN' : 'fr-TN')} MDT
                                    </span>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between items-center text-sm mb-1.5 font-black uppercase tracking-widest gap-2">
                                            <span className="text-blue-400">{t('structure.sovereign_guarantee')}</span>
                                            <span className="text-white">
                                                {Math.round((yearData.garanties / total) * 100)}%
                                            </span>
                                        </div>
                                        <div className="w-full bg-slate-900 rounded-none h-1.5 overflow-hidden">
                                            <div
                                                className="bg-blue-500 h-full"
                                                style={{ width: `${(yearData.garanties / total) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between items-center text-sm mb-1.5 font-black uppercase tracking-widest gap-2">
                                            <span className="text-emerald-400">{t('structure.state_transfer')}</span>
                                            <span className="text-white">
                                                {Math.round((yearData.transferts / total) * 100)}%
                                            </span>
                                        </div>
                                        <div className="w-full bg-slate-900 rounded-none h-1.5 overflow-hidden">
                                            <div
                                                className="bg-emerald-500 h-full"
                                                style={{ width: `${(yearData.transferts / total) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between items-center text-sm mb-1.5 font-black uppercase tracking-widest text-slate-300 gap-2">
                                            <span>{t('structure.other_oblig')}</span>
                                            <span>{Math.round((yearData.autres / total) * 100)}%</span>
                                        </div>
                                        <div className="w-full bg-slate-900 rounded-none h-1.5 overflow-hidden">
                                            <div
                                                className="bg-slate-600 h-full"
                                                style={{ width: `${(yearData.autres / total) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <AnalyticalPanel>
                    <AnalyticalGates>
                        <div>
                            <label className="text-xs font-black text-slate-500 uppercase tracking-widest">
                                {t('structure.cumul_mode')}
                            </label>
                            <select
                                className="mt-2 block w-full text-xs font-black border-slate-700 rounded-none bg-slate-800 text-slate-200 p-2"
                                disabled
                            >
                                <option>{t('structure.stack')}</option>
                                <option>{t('structure.grouped')}</option>
                            </select>
                        </div>
                    </AnalyticalGates>

                    <AuditGlossary
                        items={[
                            {
                                term: t('structure.transfers'),
                                definition: t('structure.transfer_def'),
                            },
                            {
                                term: t('dashboard.glossary_debt_term'),
                                definition: t('dashboard.glossary_debt_def'),
                            },
                        ]}
                    />

                    <QuickNotes />

                    <AnalyticalLinks
                        title={t('structure.exploration')}
                        links={[
                            { label: t('structure.lender_details'), path: "/finance/sources" }
                        ]}
                    />
                </AnalyticalPanel>
            </div>
        </div>
    );
}
