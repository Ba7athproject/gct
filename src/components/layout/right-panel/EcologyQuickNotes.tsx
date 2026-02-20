import { StickyNote, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function EcologyQuickNotes() {
    const { t } = useTranslation();
    return (
        <div className="card bg-slate-800/85 p-6 rounded-none border border-slate-700 shadow-sm transition-all duration-300">
            <h3 className="text-sm font-black text-slate-200 mb-5 flex items-center gap-2 uppercase tracking-[0.25em]">
                <ShieldCheck size={18} className="text-emerald-400" />
                {t('quicknotes.eco_alert_title')}
            </h3>
            <div className="space-y-4">
                <div className="p-4 bg-rose-500/5 border border-rose-500/20 group hover:border-rose-500/40 transition-colors">
                    <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle size={14} className="text-rose-400" />
                        <span className="text-xs font-black text-rose-400 uppercase tracking-widest">
                            {t('quicknotes.eco_impact_flag')}
                        </span>
                    </div>
                    <p className="text-sm text-slate-100 leading-relaxed font-medium">
                        {t('quicknotes.eco_impact_desc')}
                    </p>
                </div>

                <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 group hover:border-emerald-500/40 transition-colors">
                    <div className="flex items-center gap-2 mb-2">
                        <StickyNote size={14} className="text-emerald-400" />
                        <span className="text-xs font-black text-emerald-400 uppercase tracking-widest">
                            {t('quicknotes.eco_note_water')}
                        </span>
                    </div>
                    <p className="text-sm text-slate-100 leading-relaxed font-medium">
                        {t('quicknotes.eco_note_water_desc')}
                    </p>
                </div>

                <div className="pt-2">
                    <p className="text-xs text-slate-400 uppercase font-black tracking-widest text-center italic">
                        {t('quicknotes.eco_sources')}
                    </p>
                </div>
            </div>
        </div>
    );
}
