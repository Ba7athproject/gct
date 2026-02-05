import { Leaf, Construction } from 'lucide-react';

export default function EcologyPlaceholder() {
    return (
        <div className="max-w-4xl mx-auto py-24 text-center">
            <div className="w-24 h-24 bg-slate-900 text-emerald-500 rounded-[2rem] flex items-center justify-center mx-auto mb-10 shadow-2xl border border-slate-800 animate-pulse">
                <Leaf size={40} />
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-emerald-500/20">
                <Construction size={14} />
                Module Investigation : Écologie
            </div>
            <h2 className="text-4xl font-black text-slate-900 mb-6 tracking-tighter uppercase">Données en cours d'audit</h2>
            <p className="text-slate-500 mb-12 max-w-lg mx-auto leading-relaxed font-medium">
                Cette section regroupera les analyses indépendantes sur les émissions,
                la pollution locale et l'impact environnemental du GCT.
                Le corpus de données est en phase de vérification finale.
            </p>
            <div className="p-8 bg-white rounded-2xl border border-slate-200 shadow-sm max-w-md mx-auto">
                <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                    <span>État de l'audit</span>
                    <span className="text-amber-500">65% Terminé</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="w-[65%] h-full bg-emerald-500" />
                </div>
            </div>
        </div>
    );
}
