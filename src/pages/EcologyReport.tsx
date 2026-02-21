import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { FileDown, ChevronLeft } from 'lucide-react';

import ContextBlock from '../components/ui/ContextBlock';
import EcologyChart from '../components/charts/EcologyChart';

import reportMarkdownFr from '../content/env_report.md?raw';
import reportMarkdownAr from '../content/env_report_ar.md?raw';

const handlePrint = () => {
    setTimeout(() => {
        window.print();
    }, 300);
};

const findChart = (dataset: any, chartId: string) => {
    if (!dataset || !dataset.charts) return null;
    return dataset.charts.find((c: any) => c.id === chartId);
};

function FigureBlock({ id, datasets }: { id: string, datasets: Record<string, any> }) {
    const { t } = useTranslation();

    const figureConfig: Record<
        string,
        { datasetKey: string; chartId: string; titleKey: string }
    > = {
        mer_posidonia: {
            datasetKey: 'envMer',
            chartId: 'posidonia_area_trend',
            titleKey: 'report.eco_fig1_title'
        },
        mer_fisheries: {
            datasetKey: 'envMer',
            chartId: 'fisheries_losses_trend',
            titleKey: 'report.eco_fig2_title'
        },
        sols_fluor_comparison: {
            datasetKey: 'envSols',
            chartId: 'soil_fluoride_comparison',
            titleKey: 'report.eco_fig3_title'
        },
        sols_plants: {
            datasetKey: 'envSols',
            chartId: 'plant_fluoride_range',
            titleKey: 'report.eco_fig4_title'
        },
        air_dust: {
            datasetKey: 'envAir',
            chartId: 'dust_deposition_bar',
            titleKey: 'report.eco_fig5_title'
        },
        air_gas: {
            datasetKey: 'envAir',
            chartId: 'gas_exceedance',
            titleKey: 'report.eco_fig6_title'
        },
        eau_fluor: {
            datasetKey: 'envEau',
            chartId: 'agareb_fluoride_vs_standard',
            titleKey: 'report.eco_fig7_title'
        },
        eau_sulfates: {
            datasetKey: 'envEau',
            chartId: 'agareb_sulfate_vs_standard',
            titleKey: 'report.eco_fig8_title'
        },
        eau_drawdown: {
            datasetKey: 'envEau',
            chartId: 'hamma_drawdown_curve',
            titleKey: 'report.eco_fig9_title'
        }
    };

    const config = figureConfig[id];
    if (!config || !datasets[config.datasetKey]) return null;

    const chart = findChart(datasets[config.datasetKey], config.chartId);
    if (!chart) return null;

    return (
        <div className="mt-6 mb-4 break-inside-avoid-page avoid-page-break">
            <ContextBlock type="info" title={t(config.titleKey)}>
                <div className="print-chart">
                    <EcologyChart {...chart} />
                </div>
            </ContextBlock>
        </div>
    );
}

export default function EcologyReport() {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const isAr = i18n.language === 'ar';
    const reportMarkdown = isAr ? reportMarkdownAr : reportMarkdownFr;

    const [datasets, setDatasets] = useState<Record<string, any>>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadDatasets = async () => {
            setLoading(true);
            const suffix = isAr ? '_ar' : '';
            try {
                const [mer, sols, air, eau] = await Promise.all([
                    import(`../data/env_mer${suffix}.json`),
                    import(`../data/env_sols${suffix}.json`),
                    import(`../data/env_air${suffix}.json`),
                    import(`../data/env_eau${suffix}.json`)
                ]);
                setDatasets({
                    envMer: mer.default,
                    envSols: sols.default,
                    envAir: air.default,
                    envEau: eau.default
                });
            } catch (e) {
                console.error("Failed to load ecology report datasets", e);
            } finally {
                setLoading(false);
            }
        };
        loadDatasets();
    }, [isAr]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin h-8 w-8 border-4 border-emerald-500 border-t-transparent rounded-full"></div>
            </div>
        );
    }

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
            {/* Header Control */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 print:hidden">
                <button
                    onClick={() => navigate('/ecology')}
                    className="flex items-center gap-2 text-xs font-black text-slate-500 hover:text-blue-400 uppercase tracking-widest transition-colors"
                >
                    <ChevronLeft size={16} />
                    {t('report.back_to_dashboard')}
                </button>

                <div className="flex gap-2">
                    <button
                        onClick={handlePrint}
                        className="flex items-center gap-2 px-4 py-2 text-xs font-black bg-blue-600 text-white uppercase tracking-widest hover:bg-blue-500 transition-colors shadow-lg shadow-blue-900/40"
                    >
                        <FileDown size={14} />
                        {t('report.export_pdf')}
                    </button>
                </div>
            </div>

            <section className="mb-12 text-start">
                <h1 className="text-4xl font-black tracking-tighter uppercase mb-4 border-l-4 border-emerald-500 pl-6">
                    {t('report.eco_title')}
                </h1>
                <p className="text-lg font-black text-slate-400 uppercase tracking-widest max-w-3xl">
                    {t('report.eco_subtitle')}
                </p>
            </section>

            {blocks.map((block, idx) =>
                block.type === 'md' ? (
                    <section key={idx} className="mb-8 last:mb-0 text-start">
                        <div className="prose prose-invert max-w-none prose-headings:uppercase prose-headings:tracking-[0.25em] prose-p:text-sm prose-p:text-slate-200 prose-p:leading-relaxed">
                            <ReactMarkdown>
                                {block.content}
                            </ReactMarkdown>
                        </div>
                    </section>
                ) : (
                    <FigureBlock key={idx} id={block.content} datasets={datasets} />
                )
            )}
        </div>
    );
}
