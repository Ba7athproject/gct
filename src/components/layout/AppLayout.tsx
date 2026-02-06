import type { ReactNode } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import SEOHead from '../seo/SEOHead';

interface AppLayoutProps {
    children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
    return (
        <div className="min-h-screen bg-slate-1000 font-sans text-slate-100 selection:bg-blue-500/30 selection:text-blue-200">
            <SEOHead />
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-none z-50 text-xs font-bold uppercase tracking-widest border border-blue-400"
            >
                Aller au contenu principal
            </a>

            <header className="sticky top-0 z-40">
                <Navbar />
            </header>

            {/* plus de colonne vide : seulement sidebar + main */}
            <div className="flex">
                <Sidebar />
                <main
                    id="main-content"
                    className="flex-1 w-full max-w-[1300px] mx-auto px-5 sm:px-8 lg:px-12 py-8 lg:py-12"
                >
                    {children}
                </main>
            </div>

            <footer className="bg-slate-1000 text-slate-500 py-16 mt-20 border-t border-slate-900">
                <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <img
                                    src={`${import.meta.env.BASE_URL}logo_ba7ath.jpg`}
                                    alt="Logo Ba7ath"
                                    className="w-9 h-9 rounded-none grayscale brightness-125 contrast-125"
                                />
                                <h3 className="text-white font-black text-sm uppercase tracking-tight">
                                    Ba7ath / Investigation
                                </h3>
                            </div>
                            <p className="text-xs leading-relaxed max-w-xs text-slate-500 font-medium uppercase tracking-tight">
                                Investigation indépendante des ressources souveraines.
                                Protocoles d&apos;analyse avancés sur le Groupe Chimique Tunisien.
                            </p>
                        </div>

                        <div>
                            <h4 className="text-slate-200 font-black text-xs uppercase tracking-[0.2em] mb-6">
                                Dossiers d&apos;audit
                            </h4>
                            <ul className="space-y-3 text-xs font-bold uppercase tracking-wider">
                                <li>
                                    <a
                                        href="#/finance/methodology"
                                        className="text-slate-500 hover:text-blue-400 transition-colors"
                                    >
                                        Extraction de données
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#/finance/report"
                                        className="text-slate-500 hover:text-blue-400 transition-colors"
                                    >
                                        Rapport d'AnalyseFinancière (Audit des Prêts)
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#/ecology/report"
                                        className="text-slate-500 hover:text-emerald-400 transition-colors"
                                    >
                                        Rapport environnemental (écologie)
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-slate-200 font-black text-xs uppercase tracking-[0.2em] mb-6">
                                Expertise &amp; Contact
                            </h4>
                            <p className="text-xs leading-relaxed text-slate-500 font-bold uppercase tracking-wider">
                                Support technique ou datasets bruts :
                                <br />
                                <a
                                    href="mailto:ba7ath@proton.me"
                                    className="text-blue-500 hover:text-white transition-colors mt-2 inline-block"
                                >
                                    ba7ath@proton.me
                                </a>
                            </p>
                        </div>
                    </div>

                    <div className="border-t border-slate-900 mt-12 pt-8 text-[11px] text-center font-black uppercase tracking-[0.25em] text-white">
                        &copy; 2026 Ba7ath Lab. Investigation de données souveraines.
                    </div>
                </div>
            </footer>
        </div>
    );
}
