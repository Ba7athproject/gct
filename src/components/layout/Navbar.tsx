import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, TrendingUp, Network, PieChart, FileText, History, BookOpen } from 'lucide-react';

const NAV_ITEMS = [
    { label: 'Dashboard', path: '/', icon: LayoutDashboard },
    { label: 'Évolution', path: '/evolution', icon: TrendingUp },
    { label: 'Structure', path: '/structure', icon: Network },
    { label: 'Sources', path: '/sources', icon: PieChart },
    { label: 'Historique', path: '/historical', icon: History },
    { label: 'Rapport', path: '/report', icon: FileText },
    { label: 'Métho', path: '/methodology', icon: BookOpen },
];

export default function Navbar() {
    const location = useLocation();

    return (
        <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center text-white font-bold">
                                G
                            </div>
                            <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600 hidden sm:block">
                                GCT Reports
                            </span>
                        </div>
                        <div className="hidden md:ml-8 md:flex md:space-x-1">
                            {NAV_ITEMS.map((item) => {
                                const Icon = item.icon;
                                const isActive = location.pathname === item.path;
                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className={`inline-flex items-center px-4 pt-1 border-b-2 text-sm font-medium transition-colors h-full ${isActive
                                                ? 'border-blue-500 text-blue-600'
                                                : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'
                                            }`}
                                    >
                                        <Icon size={16} className="mr-2 mb-0.5" />
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation (simplified for now) */}
            <div className="md:hidden overflow-x-auto">
                <div className="flex px-2 pt-2 pb-3 space-x-1">
                    {NAV_ITEMS.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex-shrink-0 flex items-center px-3 py-2 rounded-md text-sm font-medium ${isActive
                                        ? 'bg-blue-50 text-blue-700'
                                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                    }`}
                            >
                                <Icon size={16} className="mr-2" />
                                {item.label}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}
