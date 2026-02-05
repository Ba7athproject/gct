import { FileDown, BookOpen, Database, ShieldCheck, Link as LinkIcon, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import ContextBlock from '../components/ui/ContextBlock';
import AnalyticalPanel from '../components/layout/right-panel/AnalyticalPanel';
import AnalyticalGates from '../components/layout/right-panel/AnalyticalGates';
import AuditGlossary from '../components/layout/right-panel/AuditGlossary';
import QuickNotes from '../components/layout/right-panel/QuickNotes';

export default function FullReport() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-900 pb-4">
                <div>
                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Ressources & Documentation</h2>
                    <p className="text-slate-500 text-sm font-semibold uppercase tracking-widest mt-1">Accès aux corpus de données, méthodologie de calcul et rapports officiels.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5">
                {/* Main Content */}
                <div className="lg:col-span-9 space-y-6">
                    <div className="card bg-slate-800/80 backdrop-blur-3xl p-12 rounded-none border border-slate-700 shadow-md text-center relative overflow-hidden">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-1 bg-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.8)]" />
                        <div className="bg-slate-800/80 w-24 h-24 rounded-none border border-slate-900 flex items-center justify-center mx-auto mb-10 text-white shadow-inner group hover:border-blue-500/50 transition-all">
                            <BookOpen size={48} className="group-hover:scale-110 transition-transform" />
                        </div>
                        <h3 className="text-3xl font-black text-white mb-6 uppercase tracking-tighter">
                            Rapport de Synthèse GCT
                        </h3>
                        <p className="text-slate-400 max-w-lg mx-auto mb-12 text-base font-semibold uppercase tracking-widest leading-relaxed">
                            Analyse technique consolidée des transferts étatiques, des garanties souveraines et de l'encours de la dette du Groupe Chimique Tunisien. Archive disponible pour audit indépendant.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href={`${import.meta.env.BASE_URL}rapport_complet.pdf`}
                                download="rapport_complet.pdf"
                                className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-none hover:bg-blue-500 transition-colors font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-900/40"
                            >
                                <FileDown size={18} />
                                TÉLÉCHARGER_DOC_AUDIT_V1.3
                            </a>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="card bg-slate-800/80 backdrop-blur-md p-4 rounded-none border border-slate-700 shadow-md">
                            <h3 className="text-sm font-semibold text-slate-200 mb-8 flex items-center gap-2 uppercase tracking-widest px-2 pt-2">
                                <Database size={14} className="text-blue-500" />
                                Data Source Matrix
                            </h3>
                            <div className="space-y-6">
                                <div className="pl-4 border-l-2 border-slate-800">
                                    <h4 className="text-xs font-black text-white mb-1 uppercase tracking-wider">Audit_2020_2023</h4>
                                    <p className="text-xs text-slate-500 leading-relaxed uppercase tracking-tighter font-medium">
                                        Certified data extracted from annual SOE reports annexed to official Finance Laws.
                                    </p>
                                </div>
                                <div className="pl-4 border-l-2 border-slate-800">
                                    <h4 className="text-xs font-black text-white mb-1 uppercase tracking-wider">Projection_2024_2026</h4>
                                    <p className="text-xs text-slate-500 leading-relaxed uppercase tracking-tighter font-medium">
                                        Forecast models based on valid industrial budgets and LF sovereign guarantee ceilings.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="card bg-slate-800/80 backdrop-blur-md p-4 rounded-none border border-slate-700 shadow-md">
                            <h3 className="text-sm font-semibold text-slate-200 mb-8 flex items-center gap-2 uppercase tracking-widest px-2 pt-2">
                                <ShieldCheck size={14} className="text-emerald-500" />
                                Fiabilité et Calculs
                            </h3>
                            <div className="space-y-6">
                                <div className="pl-4 border-l-2 border-slate-800">
                                    <h4 className="text-xs font-black text-white mb-1 uppercase tracking-wider">Unité Monétaire</h4>
                                    <p className="text-xs text-slate-500 leading-relaxed uppercase tracking-tighter font-medium">
                                        Standardisation en MDT (Millions de Dinars Tunisiens). Conversions de devises au taux moyen de l'année d'émission.
                                    </p>
                                </div>
                                <div className="pl-4 border-l-2 border-slate-800">
                                    <h4 className="text-xs font-black text-white mb-1 uppercase tracking-wider">Indicateurs de Risque</h4>
                                    <p className="text-xs text-slate-500 leading-relaxed uppercase tracking-tighter font-medium">
                                        Ratios calculés selon la méthodologie du Ba7ath Lab pour l'évaluation de la pression sur les finances publiques.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <ContextBlock type="warning" title="Limitation de Responsabilité">
                        <p className="text-sm uppercase tracking-tighter font-bold">
                            Cette plateforme est un outil de visualisation indépendant. Bien que les données proviennent de sources officielles, les analyses et interprétations fournies ici n'engagent que le Ba7ath Lab.
                        </p>
                    </ContextBlock>
                </div>

                {/* Right Analytical Panel */}
                <div className="lg:col-span-3">
                    <AnalyticalPanel>
                        <AnalyticalGates>
                            <p className="text-xs text-slate-500 font-bold uppercase tracking-tighter italic">Pas de filtres pour cette section.</p>
                        </AnalyticalGates>

                        <AuditGlossary
                            items={[
                                { term: 'Archive PDF', definition: 'Document complet contenant les états financiers détaillés et les rapports de commissaires aux comptes.' },
                                { term: 'Ba7ath Lab', definition: 'Entité de recherche en transparence financière et gouvernance.' }
                            ]}
                        />

                        <QuickNotes />

                        <div className="card bg-slate-800/80 p-5 rounded-none border border-slate-700/50 shadow-sm transition-all duration-300">
                            <h3 className="text-xs font-black text-slate-400 mb-4 flex items-center gap-2 uppercase tracking-wider">
                                <LinkIcon size={14} className="text-slate-600" />
                                Raccourcis_Audit
                            </h3>
                            <div className="space-y-2">
                                <Link to="/finance/evolution" className="flex items-center justify-between p-2 rounded-none hover:bg-slate-900 transition-colors group">
                                    <span className="text-xs text-slate-500 font-bold uppercase">Séries temporelles</span>
                                    <ExternalLink size={12} className="text-slate-700 group-hover:text-blue-500" />
                                </Link>
                                <Link to="/finance/sources" className="flex items-center justify-between p-2 rounded-none hover:bg-slate-900 transition-colors group">
                                    <span className="text-xs text-slate-500 font-bold uppercase">Cartographie bailleurs</span>
                                    <ExternalLink size={12} className="text-slate-700 group-hover:text-blue-500" />
                                </Link>
                            </div>
                        </div>
                    </AnalyticalPanel>
                </div>
            </div>
        </div>
    );
}
