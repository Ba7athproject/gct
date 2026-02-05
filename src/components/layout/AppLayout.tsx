import type { ReactNode } from 'react';
import Navbar from './Navbar';
import SEOHead from '../seo/SEOHead';

interface AppLayoutProps {
    children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <SEOHead />
            <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50">
                Aller au contenu principal
            </a>

            <header className="sticky top-0 z-40">
                <Navbar />
            </header>

            <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>

            <footer className="bg-slate-800 text-slate-400 py-12 mt-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <h3 className="text-white font-bold text-lg mb-4">GCT Data Reports</h3>
                            <p className="text-sm">
                                Plateforme de visualisation des données financières du Groupe Chimique Tunisien.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-3">Liens Utiles</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="https://github.com/Ba7athproject/gct" className="hover:text-white transition-colors">Code Source (GitHub)</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Méthodologie</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-3">Contact</h4>
                            <p className="text-sm">
                                Développé par le Ba7ath Lab.
                                <br />
                                contact@ba7ath.tn
                            </p>
                        </div>
                    </div>
                    <div className="border-t border-slate-700 mt-8 pt-8 text-xs text-center">
                        &copy; 2026 Ba7ath Project. Open Data.
                    </div>
                </div>
            </footer>
        </div>
    );
}
