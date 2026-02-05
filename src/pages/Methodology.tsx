import { FileText, Database, Info, ExternalLink, Link as LinkIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import ContextBlock from '../components/ui/ContextBlock';
import AnalyticalPanel from '../components/layout/right-panel/AnalyticalPanel';
import AnalyticalGates from '../components/layout/right-panel/AnalyticalGates';
import AuditGlossary from '../components/layout/right-panel/AuditGlossary';
import QuickNotes from '../components/layout/right-panel/QuickNotes';

export default function Methodology() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-900 pb-4">
                <div>
                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Données & Méthodologie</h2>
                    <p className="text-slate-500 text-sm font-semibold uppercase tracking-widest mt-1">Protocole d'audit, sources et validité des projections (2020-2026)</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5">
                {/* Main Content Column */}
                <div className="lg:col-span-9 space-y-6">
                    <ContextBlock type="info" title="Note sur la Fiabilité">
                        <p className="text-sm uppercase tracking-tighter font-bold">
                            La méthodologie repose sur le croisement de rapports officiels et de communiqués institutionnels.
                            Les chiffres sont normalisés en <strong>Dinars Tunisiens (MDT)</strong> pour assurer une comparabilité temporelle.
                        </p>
                    </ContextBlock>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Data Sources */}
                        <div className="card bg-slate-800/80 backdrop-blur-xl p-4 rounded-none border border-slate-700 shadow-md">
                            <div className="flex items-center gap-3 mb-6 text-blue-500 px-2 pt-2">
                                <Database size={18} />
                                <h3 className="text-sm font-semibold uppercase tracking-widest">Sources de Données</h3>
                            </div>
                            <ul className="space-y-4 text-xs text-slate-400 font-bold uppercase tracking-tight">
                                <li className="flex items-start gap-2 border-l-2 border-blue-900 pl-3 py-1 bg-blue-900/10">
                                    [MF] RAPPORTS SUR LES ÉTABLISSEMENTS PUBLICS (MINISTÈRE DES FINANCES).
                                </li>
                                <li className="flex items-start gap-2 border-l-2 border-blue-900 pl-3 py-1 bg-blue-900/10">
                                    [LF] LOIS DE FINANCES CONSOLIDÉES (2020-2024).
                                </li>
                                <li className="flex items-start gap-2 border-l-2 border-blue-900 pl-3 py-1">
                                    [GCT] ÉTATS FINANCIERS PUBLIÉS PAR LE GROUPE CHIMIQUE TUNISIEN.
                                </li>
                                <li className="flex items-start gap-2 border-l-2 border-blue-900 pl-3 py-1">
                                    [INT] RAPPORTS ANNUELS DES BAILLEURS (ITFC, BEI, BERD).
                                </li>
                            </ul>
                        </div>

                        {/* Terminology */}
                        <div className="card bg-slate-800/80 backdrop-blur-xl p-4 rounded-none border border-slate-700 shadow-md">
                            <div className="flex items-center gap-3 mb-6 text-emerald-500 px-2 pt-2">
                                <Info size={18} />
                                <h3 className="text-sm font-semibold uppercase tracking-widest">Sémantique Financière</h3>
                            </div>
                            <div className="space-y-4 text-xs text-slate-500 leading-relaxed font-bold uppercase tracking-tighter">
                                <p>
                                    Le terme <strong>"FINANCEMENT"</strong> désignant l'ensemble des ressources externes mobilisées.
                                </p>
                                <p className="p-3 bg-emerald-950/20 border border-emerald-900/50">
                                    OBSERVATION: Majorité relative de <strong>DETTES</strong> (BANCAIRES, LIGNES DE CRÉDIT) GARANTIES PAR L'ÉTAT, PAR OPPOSITION AUX SUBVENTIONS.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Methodology & Estimates */}
                    <div className="card bg-slate-800/60 backdrop-blur-md p-4 rounded-none border border-slate-700 shadow-md">
                        <div className="flex items-center gap-3 mb-6 text-purple-500 px-2 pt-2">
                            <FileText size={18} />
                            <h3 className="text-sm font-semibold uppercase tracking-widest">Algorithme de Projection (2024-2026)</h3>
                        </div>
                        <div className="space-y-6">
                            <div className="p-4 bg-slate-800/80 border-l-4 border-purple-500">
                                <h4 className="text-xs font-black text-white mb-2 uppercase tracking-widest">Phase_Audit (2020-2023)</h4>
                                <p className="text-xs text-slate-500 font-bold uppercase tracking-tighter">BASÉE SUR LES CHIFFRES RÉALISÉS ET AUDITÉS DES RAPPORTS OFFICIELS ET DES LOIS DE RÉGLEMENT.</p>
                            </div>

                            <div className="p-4 bg-slate-800/80 border-l-4 border-slate-800">
                                <h4 className="text-xs font-black text-white mb-2 uppercase tracking-widest">Phase_Estimations (2024-2026)</h4>
                                <p className="text-xs text-slate-500 font-bold uppercase tracking-tighter mb-4">MODÈLES PROSPECTIFS BASÉS SUR :</p>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-600 font-black uppercase tracking-widest">
                                    <li className="flex items-center gap-2">
                                        <div className="w-1 h-1 bg-purple-500" /> TENDANCES HISTORIQUES (REG_LINÉAIRE)
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="w-1 h-1 bg-purple-500" /> ACCORDS TRIENNAUX (EX: ITFC)
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="w-1 h-1 bg-purple-500" /> PRÉVISIONS D'IMPORTATION SOUFRE
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="w-1 h-1 bg-purple-500" /> BESOINS EN FONDS DE ROULEMENT
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Limitations */}
                    <div className="card bg-amber-950/10 p-6 rounded-none border border-amber-900/30">
                        <h3 className="text-xs font-black text-amber-600 mb-3 uppercase tracking-widest flex items-center gap-2">
                            <Info size={14} /> Clause_Non_Responsabilité
                        </h3>
                        <p className="text-xs text-amber-700 font-bold uppercase tracking-tighter leading-relaxed">
                            Ce site est un outil de visualisation d'aide à l'audit. Bien que nous nous efforcions d'assurer l'exactitude, des divergences peuvent exister entre les chiffres présentés et la situation comptable en temps réel, notamment en raison des taux de change volatils et des délais de consolidation des rapports étatiques.
                        </p>
                    </div>
                </div>

                {/* Right Analytical Panel */}
                <div className="lg:col-span-3">
                    <AnalyticalPanel>
                        <AnalyticalGates>
                            <p className="text-xs text-slate-500 font-bold uppercase tracking-tighter italic">Aucun filtre actif pour la méthodologie.</p>
                        </AnalyticalGates>

                        <AuditGlossary
                            items={[
                                { term: 'Projection (24-26)', definition: 'Estimations basées sur les engagements contractuels et les flux historiques.' },
                                { term: 'Dinar Tunisien (MDT)', definition: 'Unité monétaire de référence pour la consolidation financière.' }
                            ]}
                        />

                        <QuickNotes />

                        <div className="card bg-slate-800/80 p-5 rounded-none border border-slate-700/50 shadow-sm transition-all duration-300">
                            <h3 className="text-xs font-black text-slate-400 mb-4 flex items-center gap-2 uppercase tracking-wider">
                                <LinkIcon size={14} className="text-slate-600" />
                                Suite_Investigation
                            </h3>
                            <div className="space-y-2">
                                <Link to="/finance" className="flex items-center justify-between p-2 rounded-none hover:bg-slate-900 transition-colors group">
                                    <span className="text-xs text-slate-500 font-bold uppercase">Dashboard Principal</span>
                                    <ExternalLink size={12} className="text-slate-700 group-hover:text-blue-500" />
                                </Link>
                                <Link to="/finance/report" className="flex items-center justify-between p-2 rounded-none hover:bg-slate-900 transition-colors group">
                                    <span className="text-xs text-slate-500 font-bold uppercase">Consulter le Rapport</span>
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
