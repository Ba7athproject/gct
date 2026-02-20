import { FileText, Database, Info, ExternalLink, Link as LinkIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ContextBlock from '../components/ui/ContextBlock';
import AnalyticalPanel from '../components/layout/right-panel/AnalyticalPanel';
import AnalyticalGates from '../components/layout/right-panel/AnalyticalGates';
import AuditGlossary from '../components/layout/right-panel/AuditGlossary';
import QuickNotes from '../components/layout/right-panel/QuickNotes';

export default function Methodology() {
    const { t, i18n } = useTranslation();
    const isRtl = i18n.dir() === 'rtl';

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-900 pb-4">
                <div>
                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter">{t('methodology.title')}</h2>
                    <p className="text-slate-500 text-sm font-semibold uppercase tracking-widest mt-1">{t('methodology.subtitle')}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5">
                {/* Main Content Column */}
                <div className="lg:col-span-9 space-y-6">
                    <ContextBlock type="info" title={t('methodology.reliability_title')}>
                        <p className="text-sm uppercase tracking-tighter font-bold text-start">
                            {t('methodology.reliability_desc')}
                        </p>
                    </ContextBlock>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Data Sources */}
                        <div className="card bg-slate-800/80 backdrop-blur-xl p-4 rounded-none border border-slate-700 shadow-md">
                            <div className="flex items-center gap-3 mb-6 text-blue-500 px-2 pt-2">
                                <Database size={18} />
                                <h3 className="text-sm font-semibold uppercase tracking-widest">{t('methodology.data_sources')}</h3>
                            </div>
                            <ul className="space-y-4 text-xs text-slate-400 font-bold uppercase tracking-tight">
                                <li className="flex items-start gap-2 border-s-2 border-blue-900 ps-3 py-1 bg-blue-900/10 text-start">
                                    {t('methodology.source_mf')}
                                </li>
                                <li className="flex items-start gap-2 border-s-2 border-blue-900 ps-3 py-1 bg-blue-900/10 text-start">
                                    {t('methodology.source_lf')}
                                </li>
                                <li className="flex items-start gap-2 border-s-2 border-blue-900 ps-3 py-1 text-start">
                                    {t('methodology.source_gct')}
                                </li>
                                <li className="flex items-start gap-2 border-s-2 border-blue-900 ps-3 py-1 text-start">
                                    {t('methodology.source_int')}
                                </li>
                            </ul>
                        </div>

                        {/* Terminology */}
                        <div className="card bg-slate-800/80 backdrop-blur-xl p-4 rounded-none border border-slate-700 shadow-md">
                            <div className="flex items-center gap-3 mb-6 text-emerald-500 px-2 pt-2">
                                <Info size={18} />
                                <h3 className="text-sm font-semibold uppercase tracking-widest">{t('methodology.semantics')}</h3>
                            </div>
                            <div className="space-y-4 text-xs text-slate-500 leading-relaxed font-bold uppercase tracking-tighter text-start">
                                <p>
                                    {t('methodology.semantics_desc')}
                                </p>
                                <p className="p-3 bg-emerald-950/20 border border-emerald-900/50">
                                    {t('methodology.semantics_obs')}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Methodology & Estimates */}
                    <div className="card bg-slate-800/60 backdrop-blur-md p-4 rounded-none border border-slate-700 shadow-md">
                        <div className="flex items-center gap-3 mb-6 text-purple-500 px-2 pt-2">
                            <FileText size={18} />
                            <h3 className="text-sm font-semibold uppercase tracking-widest">{t('methodology.projection_algo')}</h3>
                        </div>
                        <div className="space-y-6">
                            <div className="p-4 bg-slate-800/80 border-s-4 border-purple-500 text-start">
                                <h4 className="text-xs font-black text-white mb-2 uppercase tracking-widest">{t('methodology.audit_phase')}</h4>
                                <p className="text-xs text-slate-500 font-bold uppercase tracking-tighter">{t('methodology.audit_phase_desc')}</p>
                            </div>

                            <div className="p-4 bg-slate-800/80 border-s-4 border-slate-800 text-start">
                                <h4 className="text-xs font-black text-white mb-2 uppercase tracking-widest">{t('methodology.estimate_phase')}</h4>
                                <p className="text-xs text-slate-500 font-bold uppercase tracking-tighter mb-4">{t('methodology.estimate_phase_desc')}</p>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-600 font-black uppercase tracking-widest">
                                    <li className="flex items-center gap-2">
                                        <div className="w-1 h-1 bg-purple-500" /> {t('methodology.historical_trends')}
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="w-1 h-1 bg-purple-500" /> {t('methodology.triennial_agreements')}
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="w-1 h-1 bg-purple-500" /> {t('methodology.import_forecasts')}
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="w-1 h-1 bg-purple-500" /> {t('methodology.working_capital')}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Limitations */}
                    <div className="card bg-amber-950/10 p-6 rounded-none border border-amber-900/30 text-start">
                        <h3 className="text-xs font-black text-amber-600 mb-3 uppercase tracking-widest flex items-center gap-2">
                            <Info size={14} /> {t('methodology.disclaimer_title')}
                        </h3>
                        <p className="text-xs text-amber-700 font-bold uppercase tracking-tighter leading-relaxed">
                            {t('methodology.disclaimer_desc')}
                        </p>
                    </div>
                </div>

                {/* Right Analytical Panel */}
                <div className="lg:col-span-3">
                    <AnalyticalPanel>
                        <AnalyticalGates>
                            <p className="text-xs text-slate-500 font-bold uppercase tracking-tighter italic text-start">{t('methodology.no_filter')}</p>
                        </AnalyticalGates>

                        <AuditGlossary
                            items={[
                                { term: t('methodology.glossary_proj'), definition: t('methodology.glossary_proj_def') },
                                { term: t('methodology.glossary_mdt'), definition: t('methodology.glossary_mdt_def') }
                            ]}
                        />

                        <QuickNotes />

                        <div className="card bg-slate-800/80 p-5 rounded-none border border-slate-700/50 shadow-sm transition-all duration-300">
                            <h3 className="text-xs font-black text-slate-400 mb-4 flex items-center gap-2 uppercase tracking-wider">
                                <LinkIcon size={14} className="text-slate-600" />
                                {t('methodology.investigation_suite')}
                            </h3>
                            <div className="space-y-2">
                                <Link to="/finance" className="flex items-center justify-between p-2 rounded-none hover:bg-slate-900 transition-colors group">
                                    <span className="text-xs text-slate-500 font-bold uppercase">{t('methodology.main_dashboard')}</span>
                                    <ExternalLink size={12} className={`text-slate-700 group-hover:text-blue-500 ${isRtl ? 'rotate-180' : ''}`} />
                                </Link>
                                <Link to="/finance/report" className="flex items-center justify-between p-2 rounded-none hover:bg-slate-900 transition-colors group">
                                    <span className="text-xs text-slate-500 font-bold uppercase">{t('methodology.consult_report')}</span>
                                    <ExternalLink size={12} className={`text-slate-700 group-hover:text-blue-500 ${isRtl ? 'rotate-180' : ''}`} />
                                </Link>
                            </div>
                        </div>
                    </AnalyticalPanel>
                </div>
            </div>
        </div>
    );
}
