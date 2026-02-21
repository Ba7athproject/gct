// src/pages/FinanceReport.tsx

import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useTranslation } from 'react-i18next';
import {
    ResponsiveContainer,
    LineChart,
    BarChart,
    Line,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    PieChart,
    Pie,
    Cell
} from 'recharts';

// Data will be loaded dynamically based on language
// import reportData from '../data/reportData.json';
// import financingTimeseries from '../data/financing_timeseries.json';
import reportMarkdownFr from '../content/finance_report.md?raw';
import reportMarkdownAr from '../content/finance_report_ar.md?raw';

const handlePrint = () => {
    setTimeout(() => {
        window.print();
    }, 300);
};

// Composant figure avec styles inline pour forcer les dimensions
function FigureBlock({ id, reportData, financingTimeseries }: { id: string, reportData: any, financingTimeseries: any }) {
    const { t } = useTranslation();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setMounted(true), 100);
        return () => clearTimeout(timer);
    }, []);

    if (!mounted) {
        return (
            <div className="mt-6 mb-4 card bg-slate-800/80 p-4" style={{ height: '450px' }}>
                <div className="animate-pulse bg-slate-700/30" style={{ height: '100%', width: '100%' }}></div>
            </div>
        );
    }

    // Figure 1 - Timeline financing
    if (id === 'financing_total_2016_2026' && financingTimeseries.charts?.[0]) {
        const chart = financingTimeseries.charts[0];
        return (
            <div className="mt-6 mb-4 card bg-slate-800/80 p-4">
                <h3 className="text-sm font-semibold text-slate-200 mb-4 uppercase text-start">{t('report.fig1_title')}</h3>
                <div style={{ height: '400px', width: '100%', minWidth: 0 }}>
                    <ResponsiveContainer width="100%" height={400} minWidth={0}>
                        <LineChart data={chart.data} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#ffffff08" />
                            <XAxis dataKey="annee" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                            <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #4b5563' }} />
                            <Line type="monotone" dataKey="total_ME" stroke="#0ea5e9" strokeWidth={2} isAnimationActive={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        );
    }

    // Figure 2 - By bailleur
    if (id === 'financing_by_bailleur' && financingTimeseries.charts?.[1]) {
        const chart = financingTimeseries.charts[1];
        return (
            <div className="mt-6 mb-4 card bg-slate-800/80 p-4">
                <h3 className="text-sm font-semibold text-slate-200 mb-4 uppercase text-start">{t('report.fig2_title')}</h3>
                <div style={{ height: '400px', width: '100%', minWidth: 0 }}>
                    <ResponsiveContainer width="100%" height={400} minWidth={0}>
                        <BarChart data={chart.data} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#ffffff08" />
                            <XAxis dataKey="annee" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                            <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #4b5563' }} />
                            <Bar dataKey="montant_ME" fill="#8b5cf6" isAnimationActive={false} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        );
    }

    // Figure 7 - Transfers (AUCUN transfert direct)
    if (id === 'transfers_timeline') {
        return (
            <div className="mt-6 mb-4 card bg-slate-800/80 p-6 border-s-4 border-amber-500">
                <h3 className="text-sm font-semibold text-slate-200 mb-4 uppercase text-start">{t('report.fig7_title')}</h3>
                <div className="bg-amber-500/10 border border-amber-500/20 p-6 rounded-none">
                    <div className="flex items-start gap-4">
                        <div className="text-6xl font-black text-amber-500/30">0</div>
                        <div className="flex-1 text-start">
                            <h4 className="text-base font-black text-amber-400 uppercase tracking-wider mb-2">
                                {t('report.fig7_no_transfer')}
                            </h4>
                            <div className="text-sm text-slate-300 leading-relaxed">
                                <ReactMarkdown allowedElements={['strong', 'p']} unwrapDisallowed={true}>
                                    {t('report.fig7_desc')}
                                </ReactMarkdown>
                            </div>
                            <div className="text-sm text-slate-400 mt-3 leading-relaxed">
                                <ReactMarkdown allowedElements={['strong', 'p']} unwrapDisallowed={true}>
                                    {t('report.fig7_impact')}
                                </ReactMarkdown>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Figure 8 - Results
    if (id === 'gct_results_trend' && reportData.charts?.[0]) {
        const chart = reportData.charts[0];
        return (
            <div className="mt-6 mb-4 card bg-slate-800/80 p-4">
                <h3 className="text-sm font-semibold text-slate-200 mb-4 uppercase text-start">{t('report.fig8_title')}</h3>
                <div style={{ height: '400px', width: '100%', minWidth: 0 }}>
                    <ResponsiveContainer width="100%" height={400} minWidth={0}>
                        <LineChart data={chart.data} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#ffffff08" />
                            <XAxis dataKey="annee" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                            <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #4b5563' }} />
                            <Line type="monotone" dataKey="resultat_net" stroke="#10b981" strokeWidth={2} isAnimationActive={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        );
    }

    // Figure 9 - Debt structure
    if (id === 'gct_debt_structure' && reportData.charts?.[1]) {
        const chart = reportData.charts[1];
        return (
            <div className="mt-6 mb-4 card bg-slate-800/80 p-4">
                <h3 className="text-sm font-semibold text-slate-200 mb-4 uppercase text-start">{t('report.fig9_title')}</h3>
                <div style={{ height: '400px', width: '100%', minWidth: 0 }}>
                    <ResponsiveContainer width="100%" height={400} minWidth={0}>
                        <PieChart>
                            <Pie
                                data={chart.data}
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                                label={({ name, value }: any) => {
                                    // Localize the name if it's a known debt type
                                    const localizedName = name.toLowerCase().includes('banques') ? t('report.banks') :
                                        name.toLowerCase().includes('étatiques') ? t('report.eep_cpg') :
                                            name.toLowerCase().includes('état') ? t('report.state') : name;
                                    return `${localizedName}: ${value} MD`;
                                }}
                                isAnimationActive={false}
                            >
                                {chart.data.map((entry: any, index: number) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #4b5563' }} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        );
    }

    // Figure 10 - Production
    if (id === 'gct_production_capacity' && reportData.charts?.[2]) {
        const chart = reportData.charts[2];
        return (
            <div className="mt-6 mb-4 card bg-slate-800/80 p-4">
                <h3 className="text-sm font-semibold text-slate-200 mb-4 uppercase text-start">{t('report.fig10_title')}</h3>
                <div style={{ height: '400px', width: '100%', minWidth: 0 }}>
                    <ResponsiveContainer width="100%" height={400} minWidth={0}>
                        <BarChart data={chart.data} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#ffffff08" />
                            <XAxis dataKey="annee" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                            <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #4b5563' }} />
                            <Bar dataKey="production" fill="#10b981" isAnimationActive={false} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        );
    }

    // Figure 11 - Debt breakdown 2017-2019
    if (id === 'gct_debt_breakdown' && reportData.charts?.[3]) {
        const chart = reportData.charts[3];
        return (
            <div className="mt-6 mb-4 card bg-slate-800/80 p-4">
                <h3 className="text-sm font-semibold text-slate-200 mb-4 uppercase text-start">
                    {t('report.fig11_title')}
                </h3>
                <div style={{ height: '400px', width: '100%', minWidth: 0 }}>
                    <ResponsiveContainer width="100%" height={400} minWidth={0}>
                        <BarChart data={chart.data} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#ffffff08" />
                            <XAxis dataKey="annee" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#1f2937',
                                    border: '1px solid #4b5563',
                                    borderRadius: '0px',
                                    padding: '12px'
                                }}
                                itemStyle={{ fontSize: '13px', fontWeight: '600' }}
                                labelStyle={{
                                    fontSize: '13px',
                                    color: '#94a3b8',
                                    fontWeight: 'bold',
                                    marginBottom: '8px',
                                    borderBottom: '1px solid #374151',
                                    paddingBottom: '6px'
                                }}
                            />
                            <Legend
                                wrapperStyle={{ paddingTop: '20px' }}
                                iconType="square"
                                iconSize={10}
                            />
                            <Bar dataKey="dettes_etat" stackId="a" fill="#ef4444" name={t('report.debt_state')} isAnimationActive={false} />
                            <Bar dataKey="dettes_banques" stackId="a" fill="#3b82f6" name={t('report.debt_banks')} isAnimationActive={false} />
                            <Bar dataKey="dettes_eep" stackId="a" fill="#f59e0b" name={t('report.debt_eep')} isAnimationActive={false} />
                            <Bar dataKey="dettes_fournisseurs" stackId="a" fill="#8b5cf6" name={t('report.suppliers')} isAnimationActive={false} />
                            <Bar dataKey="dettes_caisses_sociales" stackId="a" fill="#ec4899" name={t('report.social_funds')} isAnimationActive={false} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <p className="text-xs text-slate-500 mt-4 italic text-start">
                    {t(`data.chart_${chart.id}_note`)}
                </p>

                {/* Légende explicative des couleurs */}
                <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-3 pt-4 border-t border-slate-700">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-none" style={{ backgroundColor: '#ef4444' }}></div>
                        <span className="text-xs text-slate-400 font-semibold uppercase">{t('report.state')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-none" style={{ backgroundColor: '#3b82f6' }}></div>
                        <span className="text-xs text-slate-400 font-semibold uppercase">{t('report.banks')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-none" style={{ backgroundColor: '#f59e0b' }}></div>
                        <span className="text-xs text-slate-400 font-semibold uppercase">{t('report.eep_cpg')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-none" style={{ backgroundColor: '#8b5cf6' }}></div>
                        <span className="text-xs text-slate-400 font-semibold uppercase">{t('report.suppliers_short')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-none" style={{ backgroundColor: '#ec4899' }}></div>
                        <span className="text-xs text-slate-400 font-semibold uppercase">{t('report.social_funds_short')}</span>
                    </div>
                </div>
            </div>
        );
    }

    return null;
}

export default function FinanceReport() {
    const { t, i18n } = useTranslation();
    const currentLang = i18n.language;
    const isAr = currentLang === 'ar';

    const [data, setData] = useState<any>(null);
    const [timeseries, setTimeseries] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const suffix = isAr ? '_ar' : '';
                const dataModule = await import(`../data/reportData${suffix}.json`);
                const tsModule = await import(`../data/financing_timeseries${suffix}.json`);
                setData(dataModule.default);
                setTimeseries(tsModule.default);
            } catch (error) {
                console.error("Error loading finance report data:", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [isAr]);

    if (loading || !data || !timeseries) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
            </div>
        );
    }

    const reportMarkdown = isAr ? reportMarkdownAr : reportMarkdownFr;

    const lines = reportMarkdown.split('\n');
    const blocks: { type: 'md' | 'fig'; content: string }[] = [];
    let buffer: string[] = [];

    const flushBuffer = () => {
        if (buffer.length) {
            blocks.push({ type: 'md', content: buffer.join('\n') });
            buffer = [];
        }
    };

    const figureRegex = /^\s*\{\{\s*FIGURE:([a-zA-Z0-9_]+)\s*\}\}\s*$/;

    for (const line of lines) {
        const match = line.match(figureRegex);
        if (match) {
            flushBuffer();
            blocks.push({ type: 'fig', content: match[1] });
        } else {
            buffer.push(line);
        }
    }
    flushBuffer();

    return (
        <div className="max-w-5xl mx-auto py-10 px-4 print:px-0 print:py-0">
            <section className="mb-8 flex flex-col gap-4 print:gap-2 print:mb-4">
                <div className="flex items-start justify-between gap-4">
                    <div className="text-start">
                        <h1 className="text-3xl font-black tracking-tight uppercase">
                            {t('report.title')}
                        </h1>
                        <h2 className="text-lg font-black tracking-tight uppercase text-slate-400 mt-2">
                            {t('report.subtitle')}
                        </h2>
                        <p className="mt-2 text-sm text-slate-300 uppercase tracking-widest">
                            {t('report.summary')}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handlePrint}
                        className="hidden print:hidden md:inline-flex px-4 py-2 text-xs font-black uppercase tracking-widest border border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800 transition-colors"
                    >
                        {t('report.export_pdf')}
                    </button>
                </div>

                <div className="text-xs text-slate-400 uppercase tracking-widest print:text-[10px] text-start">
                    <p className="font-semibold">
                        {t('report.authors')}
                    </p>
                    <p>{t('report.version')}</p>
                </div>
            </section>

            {blocks.map((block, idx) =>
                block.type === 'md' ? (
                    <section key={idx} className="mb-6">
                        <div className="prose prose-invert max-w-none prose-headings:uppercase prose-headings:tracking-[0.25em] prose-h1:text-3xl prose-h2:text-xl prose-h3:text-lg prose-h4:text-base prose-p:text-sm prose-p:text-slate-200 prose-p:leading-relaxed prose-strong:text-slate-100 prose-em:text-slate-300 prose-li:text-sm prose-li:text-slate-200 text-start">
                            <ReactMarkdown skipHtml={true}>
                                {block.content}
                            </ReactMarkdown>
                        </div>
                    </section>
                ) : (
                    <FigureBlock key={idx} id={block.content} reportData={data} financingTimeseries={timeseries} />
                )
            )}
        </div>
    );
}
