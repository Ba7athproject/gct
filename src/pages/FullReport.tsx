import {
    BookOpen,
    Database,
    ShieldCheck,
    Link as LinkIcon,
    ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ContextBlock from '../components/ui/ContextBlock';
import AnalyticalPanel from '../components/layout/right-panel/AnalyticalPanel';
import AnalyticalGates from '../components/layout/right-panel/AnalyticalGates';
import AuditGlossary from '../components/layout/right-panel/AuditGlossary';
import QuickNotes from '../components/layout/right-panel/QuickNotes';


export default function FullReport() {
    const { t, i18n } = useTranslation();
    const isRtl = i18n.dir() === 'rtl';

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-900 pb-4">
                <div className="text-start">
                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter">
                        {t('resources.title')}
                    </h2>
                    <p className="text-slate-500 text-sm font-semibold uppercase tracking-widest mt-1">
                        {t('resources.subtitle')}
                    </p>
                </div>
            </div>


            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5">
                {/* Main Content */}
                <div className="lg:col-span-9 space-y-6">
                    {/* Bloc rapport financier */}
                    <div className="card bg-slate-800/80 backdrop-blur-3xl p-12 rounded-none border border-slate-700 shadow-md text-center relative overflow-hidden">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-1 bg-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.8)]" />
                        <div className="bg-slate-800/80 w-24 h-24 rounded-none border border-slate-900 flex items-center justify-center mx-auto mb-10 text-white shadow-inner group hover:border-blue-500/50 transition-all">
                            <BookOpen size={48} className="group-hover:scale-110 transition-transform" />
                        </div>
                        <h3 className="text-3xl font-black text-white mb-6 uppercase tracking-tighter">
                            {t('resources.audit_finance_title')}
                        </h3>
                        <p className="text-slate-400 max-w-lg mx-auto mb-12 text-base font-semibold uppercase tracking-widest leading-relaxed">
                            {t('resources.audit_finance_desc')}
                        </p>


                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/finance/report-md"
                                className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-none hover:bg-blue-500 transition-colors font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-900/40"
                            >
                                <BookOpen size={18} />
                                {t('resources.open_finance_report')}
                            </Link>
                        </div>
                    </div>


                    {/* Bloc rapport écologique */}
                    <div className="card bg-slate-800/80 backdrop-blur-3xl p-10 rounded-none border border-emerald-700 shadow-md relative overflow-hidden">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-1 bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.8)]" />
                        <div className="bg-slate-800/80 w-20 h-20 rounded-none border border-slate-900 flex items-center justify-center mx-auto mb-8 text-emerald-400 shadow-inner group hover:border-emerald-500/50 transition-all">
                            <BookOpen size={40} className="group-hover:scale-110 transition-transform" />
                        </div>
                        <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tighter text-center">
                            {t('resources.env_report_title')}
                        </h3>
                        <p className="text-slate-400 max-w-xl mx-auto mb-8 text-xs font-semibold uppercase tracking-widest leading-relaxed text-center">
                            {t('resources.env_report_desc')}
                        </p>


                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/ecology/report"
                                className="inline-flex items-center gap-2 border border-emerald-500/60 text-emerald-400 px-8 py-3 rounded-none hover:bg-emerald-500/10 transition-colors font-black text-xs uppercase tracking-widest"
                            >
                                <BookOpen size={16} />
                                {t('resources.open_env_report')}
                            </Link>
                        </div>
                    </div>


                    {/* Deux cartes info finance (inchangées) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="card bg-slate-800/80 backdrop-blur-md p-4 rounded-none border border-slate-700 shadow-md">
                            <h3 className="text-sm font-semibold text-slate-200 mb-8 flex items-center gap-2 uppercase tracking-widest px-2 pt-2 text-start">
                                <Database size={14} className="text-blue-500" />
                                {t('resources.data_source_matrix')}
                            </h3>
                            <div className="space-y-6">
                                <div className="ps-4 border-s-2 border-slate-800 text-start">
                                    <h4 className="text-xs font-black text-white mb-1 uppercase tracking-wider">
                                        {t('resources.audit_2020_2023')}
                                    </h4>
                                    <p className="text-xs text-slate-500 leading-relaxed uppercase tracking-tighter font-medium">
                                        {t('resources.audit_2020_2023_desc')}
                                    </p>
                                </div>
                                <div className="ps-4 border-s-2 border-slate-800 text-start">
                                    <h4 className="text-xs font-black text-white mb-1 uppercase tracking-wider">
                                        {t('resources.projection_2024_2026')}
                                    </h4>
                                    <p className="text-xs text-slate-500 leading-relaxed uppercase tracking-tighter font-medium">
                                        {t('resources.projection_2024_2026_desc')}
                                    </p>
                                </div>
                            </div>
                        </div>


                        <div className="card bg-slate-800/80 backdrop-blur-md p-4 rounded-none border border-slate-700 shadow-md">
                            <h3 className="text-sm font-semibold text-slate-200 mb-8 flex items-center gap-2 uppercase tracking-widest px-2 pt-2 text-start">
                                <ShieldCheck size={14} className="text-emerald-500" />
                                {t('resources.reliability_calculations')}
                            </h3>
                            <div className="space-y-6">
                                <div className="ps-4 border-s-2 border-slate-800 text-start">
                                    <h4 className="text-xs font-black text-white mb-1 uppercase tracking-wider">
                                        {t('resources.currency_unit')}
                                    </h4>
                                    <p className="text-xs text-slate-500 leading-relaxed uppercase tracking-tighter font-medium">
                                        {t('resources.currency_unit_desc')}
                                    </p>
                                </div>
                                <div className="ps-4 border-s-2 border-slate-800 text-start">
                                    <h4 className="text-xs font-black text-white mb-1 uppercase tracking-wider">
                                        {t('resources.risk_indicators')}
                                    </h4>
                                    <p className="text-xs text-slate-500 leading-relaxed uppercase tracking-tighter font-medium">
                                        {t('resources.risk_indicators_desc')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>


                    <ContextBlock type="warning" title={t('resources.disclaimer_title')}>
                        <p className="text-sm uppercase tracking-tighter font-bold text-start">
                            {t('resources.disclaimer_desc')}
                        </p>
                    </ContextBlock>
                </div>


                {/* Right Analytical Panel */}
                <div className="lg:col-span-3">
                    <AnalyticalPanel>
                        <AnalyticalGates>
                            <p className="text-xs text-slate-500 font-bold uppercase tracking-tighter italic text-start">
                                {t('resources.no_filter')}
                            </p>
                        </AnalyticalGates>


                        <AuditGlossary
                            items={[
                                {
                                    term: t('resources.glossary_audit'),
                                    definition: t('resources.glossary_audit_def')
                                },
                                {
                                    term: t('resources.glossary_lab'),
                                    definition: t('resources.glossary_lab_def')
                                }
                            ]}
                        />


                        <QuickNotes />


                        <div className="card bg-slate-800/80 p-5 rounded-none border border-slate-700/50 shadow-sm transition-all duration-300">
                            <h3 className="text-xs font-black text-slate-400 mb-4 flex items-center gap-2 uppercase tracking-wider text-start">
                                <LinkIcon size={14} className="text-slate-600" />
                                {t('resources.shortcuts_audit')}
                            </h3>
                            <div className="space-y-2">
                                <Link
                                    to="/finance/evolution"
                                    className="flex items-center justify-between p-2 rounded-none hover:bg-slate-900 transition-colors group"
                                >
                                    <span className="text-xs text-slate-500 font-bold uppercase">{t('resources.time_series')}</span>
                                    <ExternalLink
                                        size={12}
                                        className={`text-slate-700 group-hover:text-blue-500 ${isRtl ? 'rotate-180' : ''}`}
                                    />
                                </Link>
                                <Link
                                    to="/finance/sources"
                                    className="flex items-center justify-between p-2 rounded-none hover:bg-slate-900 transition-colors group"
                                >
                                    <span className="text-xs text-slate-500 font-bold uppercase">
                                        {t('resources.backer_mapping')}
                                    </span>
                                    <ExternalLink
                                        size={12}
                                        className={`text-slate-700 group-hover:text-blue-500 ${isRtl ? 'rotate-180' : ''}`}
                                    />
                                </Link>
                                <Link
                                    to="/finance/report-md"
                                    className="flex items-center justify-between p-2 rounded-none hover:bg-slate-900 transition-colors group"
                                >
                                    <span className="text-xs text-slate-500 font-bold uppercase">
                                        {t('resources.full_report')}
                                    </span>
                                    <ExternalLink
                                        size={12}
                                        className={`text-slate-700 group-hover:text-blue-500 ${isRtl ? 'rotate-180' : ''}`}
                                    />
                                </Link>
                            </div>
                        </div>
                    </AnalyticalPanel>
                </div>
            </div>
        </div>
    );
}
