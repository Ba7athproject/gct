import { useState } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Shield, Globe, BarChart3 } from 'lucide-react';
import bailleursData from '../data/bailleurs_par_annee.json';
import { formatPercentage } from '../utils/format';
import AcronymTooltip from '../components/AcronymTooltip';
import ContextBlock from '../components/ui/ContextBlock';
import AnalyticalPanel from '../components/layout/right-panel/AnalyticalPanel';
import AnalyticalGates from '../components/layout/right-panel/AnalyticalGates';
import AuditGlossary from '../components/layout/right-panel/AuditGlossary';
import QuickNotes from '../components/layout/right-panel/QuickNotes';
import AnalyticalLinks from '../components/layout/right-panel/AnalyticalLinks';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#6366f1', '#ec4899'];

const ACRONYMS: Record<string, string> = {
    'BH BANK': 'Banque de l\'Habitat (Banque publique tunisienne)',
    'ITFC': 'International Islamic Trade Finance Corporation',
    'BEI': 'Banque Européenne d\'Investissement',
    'BERD': 'Banque Européenne pour la Reconstruction et le Développement',
    'QNB': 'Qatar National Bank',
    'BIRD/BAD': 'Banque Mondiale / Banque Africaine de Développement'
};

export default function Sources() {
    const [selectedYear, setSelectedYear] = useState(2023);
    const yearData = bailleursData.find(d => d.year === selectedYear) || bailleursData[0];

    const bhBankTrend = bailleursData.map(d => ({
        year: d.year,
        amount: d.sources.find(s => s.name === 'BH BANK')?.amount || 0
    }));

    const itfcTrend = bailleursData.map(d => ({
        year: d.year,
        amount: d.sources.find(s => s.name === 'ITFC')?.amount || 0
    }));

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-900 pb-4">
                <div>
                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Origine des Fonds</h2>
                    <p className="text-slate-400 text-sm font-semibold uppercase tracking-widest mt-1">Cartographie des bailleurs et dépendances bancaires (2020-2026)</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5">
                {/* Main Content Column */}
                <div className="lg:col-span-9 space-y-5">
                    <ContextBlock type="info" title="Analyse de la Structure de Financement">
                        <p className="text-sm uppercase tracking-tighter font-bold">
                            La répartition met en évidence une dualité entre les <strong>banques de développement internationales</strong> (financement long terme) et les <strong>banques commerciales locales</strong> (besoin de liquidité immédiat).
                        </p>
                    </ContextBlock>

                    {/* Year Selector - Expert density */}
                    <div className="flex items-center gap-2 bg-slate-800/80 p-1.5 rounded-none border border-slate-900 shadow-xl overflow-x-auto no-scrollbar">
                        <span className="text-xs font-black text-slate-600 uppercase ml-3 tracking-[0.2em] whitespace-nowrap">Période_Audit :</span>
                        <div className="flex gap-1">
                            {bailleursData.map(d => (
                                <button
                                    key={d.year}
                                    onClick={() => setSelectedYear(d.year)}
                                    className={`px-3 py-1.5 rounded-none text-xs font-black transition-all uppercase tracking-widest ${selectedYear === d.year
                                        ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.3)] border border-blue-400'
                                        : 'text-slate-600 hover:text-slate-400 hover:bg-slate-900'
                                        }`}
                                >
                                    {d.year}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                        {/* Pie Chart - Expanded */}
                        <div className="xl:col-span-7 card bg-slate-800/80 backdrop-blur-xl p-4 rounded-none border border-slate-700 shadow-md leading-normal">
                            <h3 className="text-sm font-semibold text-slate-200 mb-8 pt-2 px-2 flex items-center gap-3 uppercase tracking-widest">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500/60" />
                                Mix des Bailleurs ({selectedYear})
                            </h3>
                            <div className="h-[350px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={yearData.sources}
                                            cx="50%"
                                            cy="45%"
                                            innerRadius={105}
                                            outerRadius={140}
                                            paddingAngle={1}
                                            cornerRadius={0}
                                            dataKey="percent"
                                            stroke="#111827"
                                            strokeWidth={1}
                                        >
                                            {yearData.sources.map((_, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            formatter={(_value: any, _name: any, props: any) => [`${props.payload.amount} MDT`, 'Engagement']}
                                            contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #4b5563', borderRadius: '0px', padding: '8px' }}
                                            itemStyle={{ fontSize: '13px', color: '#fff', fontWeight: '600' }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4 px-2 pb-2">
                                {yearData.sources.map((source, idx) => (
                                    <div key={idx} className="flex items-center gap-2 py-1.5 border-b border-slate-700/40">
                                        <div className="w-1.5 h-1.5 rounded-none shrink-0" style={{ backgroundColor: COLORS[idx % COLORS.length], opacity: 0.8 }}></div>
                                        <div className="text-xs font-semibold text-slate-500 truncate uppercase tracking-tight">
                                            {ACRONYMS[source.name] ? (
                                                <AcronymTooltip term={source.name} definition={ACRONYMS[source.name]} />
                                            ) : source.name}
                                        </div>
                                        <span className="text-xs font-bold text-slate-200 ml-auto">{formatPercentage(source.percent)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Top Donors Trends - Shifted for balance */}
                        <div className="xl:col-span-5 card bg-slate-800/60 backdrop-blur-md p-6 rounded-none border border-slate-700 shadow-md space-y-8 leading-normal">
                            <div>
                                <h3 className="text-xs font-semibold text-slate-300 mb-6 flex items-center gap-3 uppercase tracking-widest">
                                    <BarChart3 size={16} className="text-blue-400" />
                                    Focus BH BANK (Local)
                                </h3>
                                <div className="h-[140px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={bhBankTrend}>
                                            <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#ffffff08" />
                                            <XAxis dataKey="year" hide />
                                            <YAxis hide />
                                            <Tooltip
                                                cursor={{ fill: '#ffffff04' }}
                                                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #4b5563', borderRadius: '0px', fontSize: '11px' }}
                                                itemStyle={{ color: '#fff', fontWeight: '600' }}
                                            />
                                            <Bar dataKey="amount" fill="#3b82f6" radius={[2, 2, 0, 0]} barSize={24} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                                <p className="text-xs text-slate-500 mt-4 uppercase font-bold tracking-tighter leading-relaxed">
                                    L'exposition de la BH Bank suit une courbe ascendante, marquant le rôle stabilisateur mais risqué du secteur public bancaire.
                                </p>
                            </div>

                            <div className="pt-6 border-t border-slate-700/60">
                                <h3 className="text-xs font-semibold text-slate-300 mb-6 flex items-center gap-3 uppercase tracking-widest">
                                    <BarChart3 size={16} className="text-emerald-400" />
                                    Focus ITFC (Import)
                                </h3>
                                <div className="h-[140px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={itfcTrend}>
                                            <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#ffffff08" />
                                            <XAxis dataKey="year" hide />
                                            <YAxis hide />
                                            <Tooltip
                                                cursor={{ fill: '#ffffff04' }}
                                                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #4b5563', borderRadius: '0px', fontSize: '11px' }}
                                                itemStyle={{ color: '#fff', fontWeight: '600' }}
                                            />
                                            <Bar dataKey="amount" fill="#10b981" radius={[2, 2, 0, 0]} barSize={24} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                                <p className="text-xs text-slate-500 mt-4 uppercase font-bold tracking-tighter leading-relaxed">
                                    L'ITFC consolide son rôle dans le financement du commerce extérieur (import soufre/ammoniac).
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Analytical Panel */}
                <div className="lg:col-span-3">
                    <AnalyticalPanel>
                        <AnalyticalGates>
                            <div>
                                <label className="text-xs font-black text-slate-600 uppercase tracking-widest">Vue par entité</label>
                                <select className="mt-1 block w-full text-xs font-black border-slate-800 rounded-none bg-slate-800/80 text-slate-400 p-2" disabled>
                                    <option>Tous les bailleurs</option>
                                    <option>Bailleurs Étatiques</option>
                                    <option>Bailleurs Privés</option>
                                </select>
                            </div>
                        </AnalyticalGates>

                        <AuditGlossary
                            items={Object.entries(ACRONYMS).slice(0, 4).map(([term, definition]) => ({ term, definition }))}
                        />

                        <QuickNotes />

                        <AnalyticalLinks
                            title="Navigation Analytique"
                            links={[
                                { label: "Analyse temporelle", path: "/finance/evolution" },
                                { label: "Dettes & Garanties", path: "/finance/structure" }
                            ]}
                        />

                        <div className="grid grid-cols-2 gap-3 mt-4">
                            <div className="bg-slate-1000/40 p-3 border border-slate-900 text-center group hover:border-blue-500/30 transition-all">
                                <Globe size={18} className="mx-auto mb-2 text-blue-500 opacity-50 group-hover:opacity-100 transition-opacity" />
                                <span className="text-xs font-black text-slate-600 uppercase tracking-tighter">Portée_Globale</span>
                            </div>
                            <div className="bg-slate-1000/40 p-3 border border-slate-900 text-center group hover:border-emerald-500/30 transition-all">
                                <Shield size={18} className="mx-auto mb-2 text-emerald-500 opacity-50 group-hover:opacity-100 transition-opacity" />
                                <span className="text-xs font-black text-slate-600 uppercase tracking-tighter">Audit_Sécurisé</span>
                            </div>
                        </div>
                    </AnalyticalPanel>
                </div>
            </div>
        </div>
    );
}
