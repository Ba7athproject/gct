import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, TrendingUp, Network, PieChart, FileText, History, BookOpen, Leaf, ShieldCheck, ChevronDown } from 'lucide-react';
import { useState } from 'react';

type ViewKey = 'finance' | 'ecology' | 'governance';

interface NavItem {
    label: string;
    path: string;
    icon: any;
}

interface ViewConfig {
    label: string;
    icon: any;
    basePath: string;
    items: NavItem[];
}

const VIEWS_CONFIG: Record<ViewKey, ViewConfig> = {
    finance: {
        label: 'Finances',
        icon: TrendingUp,
        basePath: '/finance',
        items: [
            { label: 'Dashboard', path: '/finance', icon: LayoutDashboard },
            { label: 'Évolution', path: '/finance/evolution', icon: TrendingUp },
            { label: 'Structure', path: '/finance/structure', icon: Network },
            { label: 'Sources', path: '/finance/sources', icon: PieChart },
            { label: 'Historique', path: '/finance/historical', icon: History },
            { label: 'Rapport', path: '/finance/report', icon: FileText },
            { label: 'Métho', path: '/finance/methodology', icon: BookOpen },
        ]
    },
    ecology: {
        label: 'Écologie',
        icon: Leaf,
        basePath: '/ecology',
        items: [
            { label: 'Indicateurs', path: '/ecology', icon: LayoutDashboard },
            { label: 'Pollution', path: '/ecology/pollution', icon: TrendingUp },
            { label: 'Sources', path: '/ecology/sources', icon: PieChart },
            { label: 'Métho', path: '/ecology/methodology', icon: BookOpen },
        ]
    },
    governance: {
        label: 'Gouvernance',
        icon: ShieldCheck,
        basePath: '/governance',
        items: [
            { label: 'Structure', path: '/governance', icon: LayoutDashboard },
            { label: 'Décisions', path: '/governance/decisions', icon: TrendingUp },
            { label: 'Sources', path: '/governance/sources', icon: PieChart },
            { label: 'Métho', path: '/governance/methodology', icon: BookOpen },
        ]
    }
};

export default function Navbar() {
    const location = useLocation();
    const [isViewOpen, setIsViewOpen] = useState(false);

    // Identify current view from path
    const activeViewKey = (Object.keys(VIEWS_CONFIG).find(key =>
        location.pathname.startsWith(VIEWS_CONFIG[key as ViewKey].basePath)
    ) as ViewKey) || 'finance';

    const currentView = VIEWS_CONFIG[activeViewKey];

    return (
        <nav className="bg-slate-900/90 backdrop-blur-xl border-b border-slate-800 sticky top-0 z-50">
            <div className="max-w-full mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link to="/finance" className="flex items-center gap-3 group">
                        <img
                            src="./logo_ba7ath.jpg"
                            alt="Ba7ath – GCT Data Reports"
                            className="w-9 h-9 rounded-none border border-slate-800 transition-all group-hover:border-blue-500 grayscale brightness-125 contrast-125"
                        />
                        <div className="flex flex-col">
                            <span className="font-black text-base text-white border-b-2 border-blue-500 leading-none pb-1 tracking-tighter uppercase whitespace-nowrap">
                                Lab d'Investigation
                            </span>
                            <span className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mt-1 shadow-black text-shadow-sm">
                                Explorateur de Données GCT
                            </span>
                        </div>
                    </Link>

                    {/* View Name (Mobile/Small screens) */}
                    <div className="lg:hidden ml-4 border-l border-slate-800 pl-4">
                        <span className="text-[10px] font-black text-slate-400 uppercase flex items-center gap-2">
                            <currentView.icon size={14} className="text-blue-500" />
                            {currentView.label}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {/* Simplified mobile view switcher */}
                    <div className="lg:hidden relative">
                        <button
                            onClick={() => setIsViewOpen(!isViewOpen)}
                            className="p-2 rounded-none bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors"
                        >
                            <ChevronDown size={18} className={`text-slate-400 transition-transform ${isViewOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {isViewOpen && (
                            <div className="absolute top-full right-0 mt-1 w-48 bg-slate-800 border border-slate-800 rounded-none shadow-2xl py-2 z-50">
                                {Object.entries(VIEWS_CONFIG).map(([key, config]) => (
                                    <Link
                                        key={key}
                                        to={config.basePath}
                                        onClick={() => setIsViewOpen(false)}
                                        className={`flex items-center gap-3 px-4 py-2 text-xs font-black uppercase tracking-widest transition-colors ${activeViewKey === key ? 'text-blue-400 bg-blue-500/10' : 'text-slate-500 hover:bg-slate-900'}`}
                                    >
                                        <config.icon size={14} className={activeViewKey === key ? 'text-blue-400' : 'text-slate-600'} />
                                        {config.label}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="hidden md:flex items-center gap-4">
                        <span className="expert-tag">Projet Ba7ath</span>
                        <div className="h-4 w-px bg-slate-800 mx-1" />
                        <span className="text-xs font-black text-slate-500 uppercase tracking-[0.2em]">
                            {new Date().toLocaleDateString('fr-TN')}
                        </span>
                    </div>
                </div>
            </div>

            {/* Mobile Sub-items (Swipeable or stacked) */}
            <div className="lg:hidden overflow-x-auto border-t border-slate-900 bg-slate-800/50">
                <div className="flex px-4 py-2 space-x-4">
                    {currentView.items.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex-shrink-0 flex items-center gap-2 py-1.5 text-xs font-black uppercase tracking-[0.1em] transition-colors ${isActive
                                    ? 'text-blue-400'
                                    : 'text-slate-500 hover:text-slate-300'
                                    }`}
                            >
                                <Icon size={14} />
                                {item.label}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}
