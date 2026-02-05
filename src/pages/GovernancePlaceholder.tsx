import { ShieldCheck, Construction } from 'lucide-react';

export default function GovernancePlaceholder() {
    return (
        <div className="max-w-4xl mx-auto py-24 text-center">
            <div className="w-24 h-24 bg-slate-900 text-blue-400 rounded-[2rem] flex items-center justify-center mx-auto mb-10 shadow-2xl border border-slate-800 animate-pulse">
                <ShieldCheck size={40} />
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-blue-500/20">
                <Construction size={14} />
                Module Investigation : Gouvernance
            </div>
            <h2 className="text-4xl font-black text-slate-900 mb-6 tracking-tighter uppercase">Audit Gouvernance en cours</h2>
            <p className="text-slate-500 mb-12 max-w-lg mx-auto leading-relaxed font-medium">
                Cette section détaillera l'actionnariat, les processus de décision souveraine
                et la gestion administrative du GCT. Les documents d'audit interne
                sont en cours de traitement OCR.
            </p>
            <div className="p-8 bg-white rounded-2xl border border-slate-200 shadow-sm max-w-md mx-auto">
                <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                    <span>État de l'audit</span>
                    <span className="text-amber-500">40% Terminé</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="w-[40%] h-full bg-blue-500" />
                </div>
            </div>
        </div>
    );
}
