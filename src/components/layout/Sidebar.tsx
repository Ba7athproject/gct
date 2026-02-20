import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LayoutDashboard, TrendingUp, Network, PieChart, FileText, History, BookOpen, Leaf, ShieldCheck, Info, Waves, TreePine, Wind, Droplets } from 'lucide-react';

type ViewKey = 'finance' | 'ecology' | 'governance';

interface NavItem {
    labelKey: string;
    path: string;
    icon: any;
    code?: string;
}

interface ViewConfig {
    labelKey: string;
    icon: any;
    basePath: string;
    items: NavItem[];
}

const VIEWS_CONFIG: Record<ViewKey, ViewConfig> = {
    finance: {
        labelKey: 'nav.finance',
        icon: TrendingUp,
        basePath: '/finance',
        items: [
            { labelKey: 'sidebar.dashboard', path: '/finance', icon: LayoutDashboard, code: 'DB' },
            { labelKey: 'sidebar.temporal_evolution', path: '/finance/evolution', icon: TrendingUp, code: 'EV' },
            { labelKey: 'sidebar.loan_structure', path: '/finance/structure', icon: Network, code: 'ST' },
            { labelKey: 'sidebar.sources_backers', path: '/finance/sources', icon: PieChart, code: 'SO' },
            { labelKey: 'sidebar.historical_approach', path: '/finance/historical', icon: History, code: 'HI' },
            { labelKey: 'sidebar.full_report', path: '/finance/report', icon: FileText, code: 'RP' },
            { labelKey: 'sidebar.methodology', path: '/finance/methodology', icon: BookOpen, code: 'MT' },
        ]
    },
    ecology: {
        labelKey: 'nav.ecology',
        icon: Leaf,
        basePath: '/ecology',
        items: [
            { labelKey: 'sidebar.sea_fishing', path: '/ecology?tab=mer', icon: Waves, code: 'ME' },
            { labelKey: 'sidebar.soil_vegetation', path: '/ecology?tab=sols', icon: TreePine, code: 'SO' },
            { labelKey: 'sidebar.air_dust', path: '/ecology?tab=air', icon: Wind, code: 'AI' },
            { labelKey: 'sidebar.groundwater', path: '/ecology?tab=eau', icon: Droplets, code: 'EA' },
        ]
    },
    governance: {
        labelKey: 'nav.governance',
        icon: ShieldCheck,
        basePath: '/governance',
        items: [
            { labelKey: 'sidebar.governance_module', path: '/governance', icon: LayoutDashboard },
        ]
    }
};

export default function Sidebar() {
    const { t } = useTranslation();
    const location = useLocation();

    const activeViewKey = (Object.keys(VIEWS_CONFIG).find(key =>
        location.pathname.startsWith(VIEWS_CONFIG[key as ViewKey].basePath)
    ) as ViewKey) || 'finance';

    const currentView = VIEWS_CONFIG[activeViewKey];

    return (
        <aside className="hidden lg:block w-80 xl:w-[320px] h-[calc(100vh-4rem)] sticky top-16 border-e border-slate-800 bg-slate-900/80 backdrop-blur-md overflow-y-auto overflow-x-hidden transition-all duration-300">
            <div className="p-3 space-y-6 text-slate-300">
                {/* View Switcher Section */}
                <div className="space-y-2">
                    <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] px-2 mb-2">{t('sidebar.investigation_views')}</h3>
                    <div className="space-y-0.5">
                        {Object.entries(VIEWS_CONFIG).map(([key, config]) => {
                            const Icon = config.icon;
                            const isActive = activeViewKey === key;
                            const isDraft = key !== 'finance';

                            return (
                                <Link
                                    key={key}
                                    to={config.basePath}
                                    className={`flex items-center justify-between px-3 py-2 rounded-none text-sm transition-all duration-200 group relative ${isActive
                                        ? 'bg-blue-500/10 text-white'
                                        : 'text-slate-500 hover:bg-slate-800 hover:text-slate-300'
                                        }`}
                                >
                                    {isActive && <div className="absolute inset-s-0 top-0 bottom-0 w-0.5 bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />}
                                    <div className="flex items-center gap-3">
                                        <Icon size={16} className={isActive ? 'text-blue-400' : 'text-slate-600 group-hover:text-slate-400'} />
                                        <span className={`font-bold ${isActive ? 'tracking-tight' : 'tracking-tighter'}`}>{t(config.labelKey)}</span>
                                    </div>
                                    {isDraft && !isActive && (
                                        <span className="text-[10px] font-black text-slate-600 bg-slate-900 border border-slate-800 px-1.5 py-0.5 rounded-none uppercase tracking-tighter">{t('common.prep')}</span>
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* Sub-navigation for Active View */}
                <div className="space-y-2">
                    <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] px-2 mb-2">{t('sidebar.investigation')} : {t(currentView.labelKey)}</h3>
                    <nav className="space-y-0.5">
                        {currentView.items.map((item) => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.path ||
                                (item.path !== '/finance' && location.pathname.startsWith(item.path));

                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`flex items-center gap-3 px-3 py-2 rounded-none text-xs font-bold transition-all duration-200 group relative ${isActive
                                        ? 'text-blue-400 bg-blue-500/5'
                                        : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'
                                        }`}
                                >
                                    {isActive && <div className="absolute inset-s-0 top-0 bottom-0 w-0.5 bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />}
                                    <div className="flex items-center gap-2">
                                        <span className={`text-[10px] px-1.5 py-0.5 font-black border transition-colors ${isActive ? 'bg-blue-500/20 border-blue-500/40 text-blue-400' : 'bg-slate-800 border-slate-700 text-slate-700 group-hover:border-slate-600'}`}>
                                            {item.code || '??'}
                                        </span>
                                        <Icon size={14} className={isActive ? 'text-blue-400' : 'text-slate-600 group-hover:text-slate-500'} />
                                        <span className="uppercase tracking-wide">{t(item.labelKey)}</span>
                                    </div>
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Definitions Block */}
                <div className="pt-4 border-t border-slate-800">
                    <div className="bg-slate-800/50 rounded-none p-3 border border-slate-800">
                        <div className="flex items-center gap-2 mb-3 text-slate-400">
                            <Info size={14} className="text-blue-500" />
                            <h4 className="text-sm font-black uppercase tracking-[0.25em]">{t('sidebar.definitions')}</h4>
                        </div>
                        <div className="space-y-2">
                            <div>
                                <h5 className="text-sm font-black text-slate-500 uppercase tracking-widest">GCT</h5>
                                <p className="text-sm text-slate-600 leading-relaxed italic font-medium">{t('sidebar.gct_desc')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}
