import { StickyNote, AlertTriangle } from 'lucide-react';

export default function QuickNotes() {
    return (
        <div className="card bg-slate-800/85 p-6 rounded-none border border-slate-700 shadow-sm transition-all duration-300">
            <h3 className="text-sm font-black text-slate-200 mb-5 flex items-center gap-2 uppercase tracking-[0.25em]">
                <StickyNote size={18} className="text-slate-400" />
                Intelligence Analytique
            </h3>
            <div className="space-y-4">
                <div className="p-4 bg-rose-500/5 border border-rose-500/20 group hover:border-rose-500/40 transition-colors">
                    <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle size={14} className="text-rose-400" />
                        <span className="text-xs font-black text-rose-400 uppercase tracking-widest">
                            Risk_Flag : BH_BANK
                        </span>
                    </div>
                    <p className="text-sm text-slate-100 leading-relaxed font-medium">
                        Exposition critique détectée sur le secteur bancaire local. Seuil de vigilance 2026 dépassé.
                    </p>
                </div>

                <div className="p-4 bg-blue-500/5 border border-blue-500/20 group hover:border-blue-500/40 transition-colors">
                    <div className="flex items-center gap-2 mb-2">
                        <StickyNote size={14} className="text-blue-400" />
                        <span className="text-xs font-black text-blue-400 uppercase tracking-widest">
                            Note : ITFC_IMPORT
                        </span>
                    </div>
                    <p className="text-sm text-slate-100 leading-relaxed font-medium">
                        Financement du commerce extérieur stable mais dépendant des cours mondiaux de l&apos;ammoniaque.
                    </p>
                </div>

                <div className="pt-2">
                    <p className="text-xs text-slate-400 uppercase font-black tracking-widest text-center italic">
                        -- Ajouter des indicateurs d'investigation manuels --
                    </p>
                </div>
            </div>
        </div>
    );
}
