// src/pages/EcologyReport.tsx

import ReactMarkdown from 'react-markdown';
import EcologyChart from '../components/charts/EcologyChart';
import ContextBlock from '../components/ui/ContextBlock';

import envMer from '../data/env_mer.json';
import envSols from '../data/env_sols.json';
import envAir from '../data/env_air.json';
import envEau from '../data/env_eau.json';

// import du markdown comme string (grâce à Vite ?raw)
import reportMarkdown from '../content/env_report.md?raw';

interface EcologyChartData {
    id: string;
    type: 'line' | 'bar' | 'donut';
    title: string;
    xLabel: string;
    yLabel: string;
    data: any[];
    note?: string;
    color?: string;
}

const findChart = (dataset: any, chartId: string): EcologyChartData | undefined =>
    (dataset.charts as EcologyChartData[]).find(c => c.id === chartId);

// mapping entre nos FIGURE IDs et les charts JSON + titres
const figureConfig: Record<
    string,
    { dataset: any; chartId: string; title: string }
> = {
    mer_posidonia: {
        dataset: envMer,
        chartId: 'posidonia_area_trend',
        title: 'Figure 1 – Régression des herbiers de Posidonia dans le Golfe de Gabès'
    },
    mer_fisheries: {
        dataset: envMer,
        chartId: 'fisheries_losses_trend',
        title: 'Figure 2 – Pertes économiques liées à la régression des herbiers'
    },
    sols_fluor_comparison: {
        dataset: envSols,
        chartId: 'soil_fluoride_comparison',
        title: 'Figure 3 – Fluor dans les sols : zone industrielle vs site témoin'
    },
    sols_plants: {
        dataset: envSols,
        chartId: 'plant_fluoride_range',
        title: 'Figure 4 – Fluor dans les plantes locales (zone industrielle)'
    },
    air_dust: {
        dataset: envAir,
        chartId: 'dust_deposition_bar',
        title: 'Figure 5 – Retombées de poussières industrielles (ordres de grandeur)'
    },
    air_gas: {
        dataset: envAir,
        chartId: 'gas_exceedance',
        title: 'Figure 6 – Dépassements des normes pour quelques gaz (SO₂, HF, NO₂, poussières)'
    },
    eau_fluor: {
        dataset: envEau,
        chartId: 'agareb_fluoride_vs_standard',
        title: 'Figure 7 – Fluor dans l’eau : Agareb vs norme OMS'
    },
    eau_sulfates: {
        dataset: envEau,
        chartId: 'agareb_sulfate_vs_standard',
        title: 'Figure 8 – Sulfates dans l’eau : Agareb vs seuils usuels'
    },
    eau_drawdown: {
        dataset: envEau,
        chartId: 'hamma_drawdown_curve',
        title: 'Figure 9 – Baisse du niveau de la nappe à El Hamma (courbe de drawdown)'
    }
};

const handlePrint = () => {
    setTimeout(() => {
        window.print();
    }, 300);
};

// composant qui rend un marqueur {{FIGURE:xxx}}
function FigureBlock({ id }: { id: string }) {
    const config = figureConfig[id];
    if (!config) return null;

    const chart = findChart(config.dataset, config.chartId);
    if (!chart) return null;

    return (
        <div className="mt-6 mb-4 break-inside-avoid-page avoid-page-break">
            <ContextBlock type="info" title={config.title}>
                <div className="print-chart">
                    <EcologyChart {...chart} />
                </div>
            </ContextBlock>
        </div>
    );
}

export default function EcologyReport() {
    // on découpe le markdown en blocs texte / figures
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
            {/* Header + bouton PDF */}
            <section className="mb-8 flex flex-col gap-4 print:gap-2 print:mb-4">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-black tracking-tight uppercase">
                            COMPLEXE CHIMIQUE DE GABÈS–SFAX : UN DEMI-SIÈCLE DE POLLUTION INDUSTRIELLE
                        </h1>
                        <p className="mt-2 text-sm text-slate-300 uppercase tracking-widest">
                            Synthèse des données du module environnemental
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handlePrint}
                        className="hidden print:hidden md:inline-flex px-4 py-2 text-xs font-black uppercase tracking-widest border border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800 transition-colors"
                    >
                        Exporter en PDF
                    </button>
                </div>

                <div className="text-xs text-slate-400 uppercase tracking-widest print:text-[10px]">
                    <p className="font-semibold">
                        Rédaction&nbsp;: Moez Elbey – Hajer Ghammagui – Équipe Ba7ath
                    </p>
                    <p>Version : 1.0 – Date : 06/02/2026</p>
                </div>
            </section>

            {/* Rendu du markdown + figures */}
            {blocks.map((block, idx) =>
                block.type === 'md' ? (
                    <section key={idx} className="mb-6">
                        <div className="prose prose-invert max-w-none prose-headings:uppercase prose-headings:tracking-[0.25em] prose-p:text-sm prose-p:text-slate-200 prose-p:leading-relaxed">
                            <ReactMarkdown>
                                {block.content}
                            </ReactMarkdown>
                        </div>
                    </section>

                ) : (
                    <FigureBlock key={idx} id={block.content} />
                )
            )}
        </div>
    );
}
