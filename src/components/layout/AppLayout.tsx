import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, TrendingUp, PieChart, Users, FileText, Clock } from 'lucide-react';
import { clsx } from 'clsx';

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const location = useLocation();

    const navItems = [
        { path: '/', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/evolution', label: 'Évolution (TimeSeries)', icon: TrendingUp },
        { path: '/structure', label: 'Structure & Dettes', icon: PieChart },
        { path: '/sources', label: 'Sources de Financement', icon: Users },
        { path: '/historical', label: 'Approche Historique', icon: Clock },
        { path: '/report', label: 'Rapport Complet', icon: FileText },
        { path: '/methodology', label: 'Données & Méthodologie', icon: FileText },
    ];

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 flex font-sans">
            {/* Sidebar - Desktop */}
            <aside className="w-64 bg-slate-900 text-white fixed h-full hidden md:flex flex-col shadow-xl z-10">
                <div className="p-6 border-b border-slate-800 flex flex-col items-center text-center">
                    <div className="bg-white p-1 rounded-full mb-4">
                        <img src="/gct/logo_ba7ath.jpg" alt="Ba7ath Lab Logo" className="w-24 h-24 rounded-full object-cover" />
                    </div>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                        GCT Data Reports
                    </h1>
                    <p className="text-xs text-slate-400 mt-1">Analyse Financière 2020-2026</p>
                </div>

                <nav className="flex-1 py-6 px-3 space-y-1">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={clsx(
                                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group",
                                    isActive
                                        ? "bg-blue-600/20 text-blue-400 border-l-4 border-blue-500"
                                        : "hover:bg-slate-800 text-slate-300 hover:text-white"
                                )}
                            >
                                <Icon size={20} className={clsx(isActive ? "text-blue-400" : "text-slate-400 group-hover:text-white")} />
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>


            </aside>

            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 right-0 bg-slate-900 text-white z-20 p-4 shadow-md flex justify-between items-center">
                <span className="font-bold">GCT Report</span>
                {/* Simple Hamburger placeholder - typically would state toggle */}
                <div className="text-xs text-slate-400">Menu via Bottom Nav</div>
            </div>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-6 md:p-10 pt-20 md:pt-10 overflow-x-hidden flex flex-col min-h-screen">
                <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 flex-1 w-full">
                    {children}
                </div>

                <footer className="mt-12 pt-6 border-t border-slate-200 text-center text-sm text-slate-500">
                    <p>Préparé & Développé par <span className="font-bold text-slate-700">Ba7ath Lab</span></p>
                </footer>
            </main>

            {/* Mobile Bottom Nav */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-20 flex justify-around p-3 safe-area-bottom">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={clsx(
                                "flex flex-col items-center gap-1 text-[10px]",
                                isActive ? "text-blue-600" : "text-slate-500"
                            )}
                        >
                            <Icon size={20} />
                            <span>{item.label.split(' ')[0]}</span>
                        </Link>
                    )
                })}
            </nav>
        </div>
    );
}
