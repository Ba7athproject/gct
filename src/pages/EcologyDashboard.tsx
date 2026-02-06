import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
    Waves,
    TreePine,
    Wind,
    Droplets,
    Activity,
    ExternalLink,
    BookOpenCheck
} from 'lucide-react';
import ContextBlock from '../components/ui/ContextBlock';
import KpiCard from '../components/ui/KpiCard';
import EcologyChart from '../components/charts/EcologyChart';
import AnalyticalPanel from '../components/layout/right-panel/AnalyticalPanel';
import AnalyticalGates from '../components/layout/right-panel/AnalyticalGates';
import AuditGlossary from '../components/layout/right-panel/AuditGlossary';
import EcologyQuickNotes from '../components/layout/right-panel/EcologyQuickNotes';
import AnalyticalLinks from '../components/layout/right-panel/AnalyticalLinks';

// --- Types core datasets ---

interface EcologyIndicator {
    id: string;
    label: string;
    value: string;
    unit: string;
    period: string;
    note?: string;
    sources?: string[];
}

interface EcologyChartData {
    id: string;
    type: 'line' | 'bar' | 'donut';
    title: string;
    xLabel: string;
    yLabel: string;
    data: any[];
    sources?: string[];
    note?: string;
    color?: string;
}

interface EcologyTextBlock {
    id: string;
    title: string;
    body: string;
}

interface EcologyDataset {
    id: string;
    title: string;
    description: string;
    indicators: EcologyIndicator[];
    charts: EcologyChartData[];
    text_blocks: EcologyTextBlock[];
}

// --- Types meta pages ---

interface MethodologieSection {
    id: string;
    title: string;
    body?: string[];
    items?: { term: string; definition: string }[];
}

interface MethodologieDataset {
    id: string;
    title: string;
    description: string;
    sections: MethodologieSection[];
}

interface BiblioEntry {
    label: string;
    citation: string;
    url: string;
}

interface BiblioGroup {
    id: string;
    title: string;
    entries: BiblioEntry[];
}

interface BibliographieDataset {
    id: string;
    title: string;
    description: string;
    groups: BiblioGroup[];
}

interface ThematicArticle {
    id: string;
    title: string;
    link_env_id?: string;
    body: string[];
}

interface ArticlesDataset {
    id: string;
    title: string;
    description: string;
    articles: ThematicArticle[];
}

// --- Tabs config ---

const TABS = [
    {
        id: 'articles',
        label: 'Articles thématiques',
        icon: BookOpenCheck,
        file: 'meta_articles',
        type: 'meta_articles' as const
    },
    { id: 'mer', label: 'Mer & Pêche', icon: Waves, file: 'env_mer', type: 'env' as const },
    { id: 'sols', label: 'Sols & Végétation', icon: TreePine, file: 'env_sols', type: 'env' as const },
    { id: 'air', label: 'Air & Poussières', icon: Wind, file: 'env_air', type: 'env' as const },
    { id: 'eau', label: 'Eaux Souterraines', icon: Droplets, file: 'env_eau', type: 'env' as const },
    {
        id: 'methodologie',
        label: 'Méthodologie & Lexique',
        icon: BookOpenCheck,
        file: 'meta_methodologie',
        type: 'meta_methodo' as const
    },
    {
        id: 'bibliographie',
        label: 'Bibliographie',
        icon: BookOpenCheck,
        file: 'meta_bibliographie',
        type: 'meta_biblio' as const
    }
];

type TabType = (typeof TABS)[number]['type'];

export default function EcologyDashboard() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const tabParam = queryParams.get('tab');

    const [activeTab, setActiveTab] = useState<string>(
        tabParam && TABS.find(t => t.id === tabParam) ? tabParam : TABS[0].id
    );
    const [tabType, setTabType] = useState<TabType>('env');
    const [envData, setEnvData] = useState<EcologyDataset | null>(null);
    const [methodoData, setMethodoData] = useState<MethodologieDataset | null>(null);
    const [biblioData, setBiblioData] = useState<BibliographieDataset | null>(null);
    const [articlesData, setArticlesData] = useState<ArticlesDataset | null>(null);
    const [loading, setLoading] = useState(true);

    // Sync tab from URL
    useEffect(() => {
        if (tabParam && TABS.find(t => t.id === tabParam)) {
            setActiveTab(tabParam);
        }
    }, [tabParam]);

    // Load data depending on tab
    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            setEnvData(null);
            setMethodoData(null);
            setBiblioData(null);
            setArticlesData(null);

            try {
                const tab = TABS.find(t => t.id === activeTab);
                if (!tab) return;

                setTabType(tab.type);

                if (tab.type === 'env') {
                    const module = await import(`../data/${tab.file}.json`);
                    setEnvData(module.default as EcologyDataset);
                } else if (tab.type === 'meta_methodo') {
                    const module = await import(`../data/${tab.file}.json`);
                    setMethodoData(module.default as MethodologieDataset);
                } else if (tab.type === 'meta_biblio') {
                    const module = await import(`../data/${tab.file}.json`);
                    setBiblioData(module.default as BibliographieDataset);
                } else if (tab.type === 'meta_articles') {
                    const module = await import(`../data/${tab.file}.json`);
                    setArticlesData(module.default as ArticlesDataset);
                }
            } catch (error) {
                console.error('Failed to load ecology data:', error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [activeTab]);

    // Helper to switch env tab from articles
    const handleOpenEnvFromArticle = (envId: string | undefined) => {
        if (!envId) return;
        const tab = TABS.find(t => t.file === envId || t.id === envId);
        if (!tab) return;
        setActiveTab(tab.id);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-900 pb-4">
                <div>
                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter">
                        Module Environnemental
                    </h2>
                    <p className="text-slate-500 text-sm font-semibold uppercase tracking-widest mt-1">
                        Audit des impacts écologiques du Complexe Chimique
                    </p>
                </div>
                <div className="flex gap-2">
                    <span className="expert-tag bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                        ENV_AUDIT
                    </span>
                    <span className="expert-tag border-slate-800 text-slate-600">VERS_1.0.0</span>
                </div>
            </div>

            {/* Tab Selector */}
            <div className="flex items-center gap-2 bg-slate-800/80 p-1.5 rounded-none border border-slate-900 shadow-xl overflow-x-auto pr-4">
                <span className="text-xs font-black text-slate-600 uppercase ml-3 tracking-[0.2em] whitespace-nowrap">
                    Source_Impact :
                </span>
                <div className="flex gap-1 min-w-max">
                    {TABS.map(tab => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-none text-xs font-black transition-all uppercase tracking-widest border ${isActive
                                    ? 'bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)] border-emerald-400'
                                    : 'text-slate-600 border-transparent hover:text-slate-400 hover:bg-slate-900'
                                    }`}
                            >
                                <Icon size={14} />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5">
                {/* Main Content Column */}
                <div className="lg:col-span-9 space-y-6">
                    {loading ? (
                        <div className="h-64 flex items-center justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
                        </div>
                    ) : tabType === 'env' && envData ? (
                        <>
                            <ContextBlock type="info" title={envData.title}>
                                <p className="text-sm font-bold uppercase tracking-tight text-slate-300">
                                    {envData.description}
                                </p>
                            </ContextBlock>

                            {/* Indicators Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {envData.indicators.map(indicator => (
                                    <div key={indicator.id} className="group relative flex flex-col">
                                        <KpiCard
                                            title={indicator.label}
                                            value={indicator.value}
                                            subtext={`${indicator.unit} (${indicator.period})`}
                                            icon={Activity}
                                            className="p-4"
                                        />
                                        {(indicator.note ||
                                            (indicator.sources && indicator.sources.length > 0)) && (
                                                <div className="mt-2 px-1 flex flex-wrap items-center justify-between gap-2">
                                                    {indicator.note && (
                                                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tight italic">
                                                            {indicator.note}
                                                        </span>
                                                    )}
                                                    {indicator.sources && indicator.sources.length > 0 && (
                                                        <div className="flex gap-1 items-center">
                                                            <span className="text-[10px] text-slate-600 font-black uppercase tracking-tighter mr-1">
                                                                Sources:
                                                            </span>
                                                            {indicator.sources.map((src, i) => (
                                                                <a
                                                                    key={i}
                                                                    href={src}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-blue-500 hover:text-blue-400 transition-colors"
                                                                >
                                                                    <ExternalLink size={10} />
                                                                </a>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                    </div>
                                ))}
                            </div>

                            {/* Charts Section */}
                            <div className="grid grid-cols-1 gap-8">
                                {envData.charts.map(chart => (
                                    <EcologyChart key={chart.id} {...chart} />
                                ))}
                            </div>

                            {/* Text Blocks Section */}
                            {envData.text_blocks && envData.text_blocks.length > 0 && (
                                <div className="space-y-6">
                                    <h4 className="text-[11px] font-black text-slate-600 uppercase tracking-[0.3em] pl-2 border-l-2 border-emerald-500">
                                        Contexte investigation
                                    </h4>
                                    <div className="grid grid-cols-1 gap-4">
                                        {envData.text_blocks.map(block => (
                                            <ContextBlock key={block.id} type="info" title={block.title}>
                                                <p className="text-sm font-medium whitespace-pre-line uppercase tracking-tight">
                                                    {block.body}
                                                </p>
                                            </ContextBlock>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    ) : tabType === 'meta_methodo' && methodoData ? (
                        <>
                            <ContextBlock type="info" title={methodoData.title}>
                                <p className="text-sm font-bold uppercase tracking-tight text-slate-300">
                                    {methodoData.description}
                                </p>
                            </ContextBlock>

                            {methodoData.sections.map(section => (
                                <div key={section.id} className="space-y-3">
                                    <h3 className="text-sm font-black text-slate-200 uppercase tracking-[0.25em] border-l-2 border-emerald-500 pl-3">
                                        {section.title}
                                    </h3>
                                    {section.body &&
                                        section.body.map((para, i) => (
                                            <p
                                                key={i}
                                                className="text-sm text-slate-300 font-medium leading-relaxed"
                                            >
                                                {para}
                                            </p>
                                        ))}
                                    {section.items && (
                                        <div className="space-y-2">
                                            {section.items.map(item => (
                                                <div key={item.term}>
                                                    <span className="text-xs font-black uppercase tracking-widest text-emerald-400">
                                                        {item.term}
                                                    </span>
                                                    <p className="text-sm text-slate-300 leading-relaxed">
                                                        {item.definition}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </>
                    ) : tabType === 'meta_biblio' && biblioData ? (
                        <>
                            <ContextBlock type="info" title={biblioData.title}>
                                <p className="text-sm font-bold uppercase tracking-tight text-slate-300">
                                    {biblioData.description}
                                </p>
                            </ContextBlock>

                            <div className="space-y-6">
                                {biblioData.groups.map(group => (
                                    <div key={group.id} className="space-y-3">
                                        <h3 className="text-sm font-black text-slate-200 uppercase tracking-[0.25em] border-l-2 border-emerald-500 pl-3">
                                            {group.title}
                                        </h3>
                                        <ul className="space-y-2">
                                            {group.entries.map(entry => (
                                                <li key={entry.url} className="text-sm text-slate-300 leading-relaxed">
                                                    <p className="font-semibold">{entry.label}</p>
                                                    <p className="text-xs text-slate-400">{entry.citation}</p>
                                                    <a
                                                        href={entry.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-widest text-blue-400 mt-1 hover:text-blue-300"
                                                    >
                                                        <ExternalLink size={10} />
                                                        Consulter la source
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : tabType === 'meta_articles' && articlesData ? (
                        <>
                            <ContextBlock type="info" title={articlesData.title}>
                                <p className="text-sm font-bold uppercase tracking-tight text-slate-300">
                                    {articlesData.description}
                                </p>
                            </ContextBlock>

                            <div className="space-y-8">
                                {articlesData.articles.map(article => (
                                    <div
                                        key={article.id}
                                        className="border border-slate-800 bg-slate-900/60 p-4 space-y-3"
                                    >
                                        <div className="flex justify-between items-start gap-4">
                                            <h3 className="text-sm font-black text-slate-200 uppercase tracking-[0.25em]">
                                                {article.title}
                                            </h3>
                                            {article.link_env_id && (
                                                <button
                                                    onClick={() => handleOpenEnvFromArticle(article.link_env_id!)}
                                                    className="text-[10px] font-black uppercase tracking-widest text-emerald-400 border border-emerald-500/40 px-2 py-1 hover:bg-emerald-500/10 transition-colors"
                                                >
                                                    Voir les données
                                                </button>
                                            )}
                                        </div>
                                        {article.body.map((para, i) => (
                                            <p key={i} className="text-sm text-slate-300 leading-relaxed">
                                                {para}
                                            </p>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-20">
                            <p className="text-slate-500 font-bold uppercase tracking-widest">
                                Échec du chargement des données d&apos;audit.
                            </p>
                        </div>
                    )}
                </div>

                {/* Right Analytical Panel */}
                <div className="lg:col-span-3">
                    <AnalyticalPanel>
                        <AnalyticalGates>
                            <div>
                                <label className="text-xs font-black text-slate-600 uppercase tracking-widest">
                                    Filtre d&apos;Affichage
                                </label>
                                <select className="mt-2 block w-full text-xs font-black uppercase tracking-wider border border-slate-700 rounded-none bg-slate-800 p-2 text-slate-300 outline-none focus:border-emerald-500 transition-all cursor-pointer">
                                    <option>Vue Consolidée</option>
                                    <option>Séries Brutes</option>
                                </select>
                            </div>
                        </AnalyticalGates>

                        <AuditGlossary
                            items={[
                                {
                                    term: 'Posidonia oceanica',
                                    definition:
                                        'Forêt sous-marine protégeant les côtes et nourrissant la pêche, en recul massif (déserts biologiques).'
                                },
                                {
                                    term: 'Phosphogypse',
                                    definition:
                                        'Sous-produit du traitement des phosphates, déversé massivement depuis les années 1970.'
                                },
                                {
                                    term: 'Eaux gypseuses acides',
                                    definition:
                                        'Rejets acides chargés en fluor, métaux lourds et radionucléides déversés en mer ou dans l’environnement.'
                                },
                                {
                                    term: 'Lixiviation acide',
                                    definition:
                                        "Liquides toxiques (pH très bas) s'infiltrant dans les nappes phréatiques depuis les décharges."
                                }
                            ]}
                        />

                        <EcologyQuickNotes />

                        <AnalyticalLinks
                            title="Navigation Pivot"
                            links={[
                                { label: 'Mer & Pêche', path: '/ecology?tab=mer' },
                                { label: 'Sols & Végétation', path: '/ecology?tab=sols' },
                                { label: 'Air & Poussières', path: '/ecology?tab=air' },
                                { label: 'Eaux Souterraines', path: '/ecology?tab=eau' },
                                { label: 'Méthodologie & Lexique', path: '/ecology?tab=methodologie' },
                                { label: 'Bibliographie', path: '/ecology?tab=bibliographie' },
                                { label: 'Articles thématiques', path: '/ecology?tab=articles' }
                            ]}
                        />
                    </AnalyticalPanel>
                </div>
            </div>
        </div>
    );
}
