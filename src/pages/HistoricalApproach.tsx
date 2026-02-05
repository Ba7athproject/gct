import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, Area, AreaChart } from 'recharts';
import { Link as LinkIcon, ExternalLink, ShieldCheck, Euro, DollarSign, Coins } from 'lucide-react';
import { Link } from 'react-router-dom';
import historicalLoans from '../data/historical_loans_2016_2028.json';
import historicalGuarantees from '../data/historical_guarantees.json';
import historicalSummary from '../data/historical_summary.json';
import ContextBlock from '../components/ui/ContextBlock';
import KpiCard from '../components/ui/KpiCard';
import AnalyticalPanel from '../components/layout/right-panel/AnalyticalPanel';
import AnalyticalGates from '../components/layout/right-panel/AnalyticalGates';
import AuditGlossary from '../components/layout/right-panel/AuditGlossary';
import QuickNotes from '../components/layout/right-panel/QuickNotes';

const TimelineItem = ({ loan }: any) => {
    const deviseColors: any = {
        'M€': 'border-blue-500 bg-blue-500/10',
        'M$': 'border-emerald-500 bg-emerald-500/10',
        'MD': 'border-amber-500 bg-amber-500/10'
    };

    return (
        <div className="relative pl-8 pb-10 border-l-2 border-slate-900 last:border-0">
            <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-none border-2 ${deviseColors[loan.devise] || 'border-slate-800 bg-slate-800/80'}`}></div>
            <div className="card hover:shadow-2xl transition-all p-5 bg-slate-1000/40 backdrop-blur-md border border-slate-900 rounded-none group hover:border-blue-500/50">
                <div className="flex items-start justify-between mb-4 border-b border-slate-900 pb-3">
                    <div>
                        <h4 className="text-sm font-black text-white uppercase tracking-wider">{loan.bailleur_full}</h4>
                        <p className="text-[10px] uppercase font-black text-slate-600 tracking-[0.2em]">{loan.date}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-base font-black text-white">{loan.montant} {loan.devise}</p>
                        {loan.montant_dt && <p className="text-[10px] text-blue-500 font-black tracking-widest mt-1">≈ {loan.montant_dt} MDT</p>}
                    </div>
                </div>
                <p className="text-xs text-slate-500 mb-5 leading-relaxed uppercase tracking-tight font-medium underline decoration-slate-900/50">{loan.objectif}</p>
                <div className="flex flex-wrap gap-2">
                    {loan.taux && <span className="px-2 py-1 bg-slate-800/80 text-[10px] font-black text-slate-400 border border-slate-900 tracking-tighter uppercase">T_RATE: {loan.taux}</span>}
                    {loan.duree && <span className="px-2 py-1 bg-slate-800/80 text-[10px] font-black text-slate-400 border border-slate-900 tracking-tighter uppercase">TERM: {loan.duree}</span>}
                    {loan.grace && <span className="px-2 py-1 bg-slate-800/80 text-[10px] font-black text-slate-400 border border-slate-900 tracking-tighter uppercase">GRACE: {loan.grace}</span>}
                </div>
            </div>
        </div>
    );
};

export default function HistoricalApproach() {
    const loansChartData = historicalLoans.map(loan => ({
        name: loan.bailleur,
        year: loan.year,
        montant_dt: loan.montant_dt || 0,
        montantOriginal: loan.montant,
        devise: loan.devise
    }));

    const currencyData = [
        { name: 'Euros', value: historicalSummary.totaux.euros.montant, color: '#3b82f6' },
        { name: 'Dollars', value: historicalSummary.totaux.dollars.montant, color: '#10b981' },
        { name: 'Dinars', value: historicalSummary.totaux.dinars.montant, color: '#f59e0b' }
    ];

    const timelineData = historicalLoans.map(loan => ({
        year: loan.year,
        montant_dt: loan.montant_dt || 0,
        bailleur: loan.bailleur
    }));

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-900 pb-4">
                <div>
                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Perspective Historique</h2>
                    <p className="text-slate-500 text-sm font-semibold uppercase tracking-widest mt-1">Rétrospective décennale des engagements et garanties (2016-2028)</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5">
                {/* Main Content */}
                <div className="lg:col-span-9 space-y-6">
                    <ContextBlock type="info" title="Note sur la Période d'Analyse">
                        <p className="text-sm uppercase tracking-tighter font-bold">
                            Cette vue couvre 12 ans de données consolidées, incluant les décrets de garantie souveraine et les accords de prêts bilatéraux/multilatéraux.
                            <strong> MDT = Million Dinars Tunisiens</strong>
                        </p>
                    </ContextBlock>

                    {/* KPIs - Currency Totals */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <KpiCard
                            title="Volume Euros"
                            value={`${historicalSummary.totaux.euros.montant} M€`}
                            subtext={historicalSummary.totaux.euros.detail}
                            icon={Euro}
                            className="p-4"
                        />
                        <KpiCard
                            title="Volume Dollars"
                            value={`${historicalSummary.totaux.dollars.montant} M$`}
                            subtext={historicalSummary.totaux.dollars.detail}
                            icon={DollarSign}
                            className="p-4"
                        />
                        <KpiCard
                            title="Volume Dinars"
                            value={`${historicalSummary.totaux.dinars.montant} MD`}
                            subtext={historicalSummary.totaux.dinars.detail}
                            icon={Coins}
                            className="p-4"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="card bg-slate-800/80 backdrop-blur-xl p-4 rounded-none border border-slate-700 shadow-md leading-normal">
                            <h3 className="text-sm font-semibold text-slate-200 mb-6 px-2 pt-2 flex items-center gap-3 uppercase tracking-widest">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500/60" />
                                Prêts par Bailleur (Normalisé MDT)
                            </h3>
                            <div className="h-[300px] w-full min-w-0 overflow-hidden">
                                <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                                    <BarChart data={loansChartData} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
                                        <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#ffffff08" />
                                        <XAxis dataKey="name" hide />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 13, fontWeight: 500 }} />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #4b5563', borderRadius: '0px', fontSize: '13px' }}
                                            itemStyle={{ color: '#fff', fontWeight: '600' }}
                                            formatter={(_v: any, _n: any, props: any) => [`${props.payload.montantOriginal} ${props.payload.devise} (≈ ${props.payload.montant_dt} MDT)`, 'Engagement']}
                                        />
                                        <Bar dataKey="montant_dt" fill="#3b82f6" radius={[2, 2, 0, 0]} barSize={28} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="card bg-slate-800/80 backdrop-blur-xl p-4 rounded-none border border-slate-700 shadow-md leading-normal">
                            <h3 className="text-sm font-semibold text-slate-200 mb-6 px-2 pt-2 flex items-center gap-3 uppercase tracking-widest">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/60" />
                                Exposition par Devise
                            </h3>
                            <div className="h-[250px] w-full min-w-0 overflow-hidden">
                                <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                                    <PieChart>
                                        <Pie
                                            data={currencyData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={70}
                                            outerRadius={100}
                                            paddingAngle={1}
                                            dataKey="value"
                                            stroke="#111827"
                                            strokeWidth={1}
                                        >
                                            {currencyData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #4b5563', borderRadius: '0px', fontSize: '13px' }}
                                            itemStyle={{ color: '#fff', fontWeight: '600' }}
                                        />
                                        <Legend
                                            verticalAlign="bottom"
                                            height={36}
                                            iconType="rect"
                                            iconSize={10}
                                            formatter={(value) => <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{value}</span>}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    <div className="card bg-slate-800/80 backdrop-blur-xl p-4 rounded-none border border-slate-700 shadow-md leading-normal">
                        <h3 className="text-sm font-semibold text-slate-200 mb-6 px-2 pt-2 flex items-center gap-3 uppercase tracking-widest">
                            <div className="w-1.5 h-1.5 rounded-full bg-purple-500/60" />
                            Évolution Temporelle des Flux (MDT)
                        </h3>
                        <div className="h-[300px] w-full min-w-0 overflow-hidden">
                            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                                <AreaChart data={timelineData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorMontant" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2} />
                                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#ffffff08" />
                                    <XAxis
                                        dataKey="year"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#64748b', fontSize: 13, fontWeight: 500 }}
                                        dy={8}
                                    />
                                    <YAxis hide />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #4b5563', borderRadius: '0px', fontSize: '13px' }}
                                        itemStyle={{ color: '#fff', fontWeight: '600' }}
                                    />
                                    <Area type="monotone" dataKey="montant_dt" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorMontant)" strokeWidth={2} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="card bg-slate-1000/40 backdrop-blur-md p-6 rounded-none border border-slate-900 shadow-2xl">
                        <h3 className="text-xs font-black text-slate-400 mb-10 flex items-center gap-3 uppercase tracking-[0.2em]">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                            Timeline Détaillée des Engagements
                        </h3>
                        <div className="space-y-0">
                            {historicalLoans.map((loan) => (
                                <TimelineItem key={loan.id} loan={loan} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Analytical Panel */}
                <div className="lg:col-span-3">
                    <AnalyticalPanel>
                        <AnalyticalGates>
                            <div>
                                <label className="text-xs font-black text-slate-600 uppercase tracking-widest">Nature du fond</label>
                                <select className="mt-1 block w-full text-xs font-black border-slate-700 rounded-none bg-slate-800 text-slate-300 p-2" disabled>
                                    <option>Tous les types</option>
                                    <option>Prêts Projets</option>
                                    <option>Crédits Commerciaux</option>
                                </select>
                            </div>
                        </AnalyticalGates>

                        <AuditGlossary
                            items={[
                                { term: 'Dette Souveraine', definition: 'Dette dont le remboursement est garanti par l\'État Tunisien.' },
                                { term: 'Effet de Change', definition: 'Risque lié à la dévaluation du Dinar face à l\'Euro/Dollar sur la dette extérieure.' }
                            ]}
                        />

                        <QuickNotes />

                        <div className="card bg-slate-900/80 backdrop-blur-xl p-5 rounded-none border border-blue-500/30 shadow-lg transition-all duration-300">
                            <h3 className="text-xs font-black text-white mb-4 flex items-center gap-2 uppercase tracking-wider">
                                <ShieldCheck size={14} className="text-emerald-400" />
                                Garanties État
                            </h3>
                            <div className="space-y-4">
                                {historicalGuarantees.slice(0, 3).map((g, i) => (
                                    <div key={i} className="border-b border-white/5 pb-3 last:border-0">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-[10px] font-black text-slate-500 uppercase">{g.year}</span>
                                            <span className="text-[10px] font-black text-emerald-400">{g.montant} {g.devise}</span>
                                        </div>
                                        <p className="text-[10px] text-slate-400 uppercase tracking-tighter line-clamp-2">{g.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="card bg-slate-800/80 p-5 rounded-none border border-slate-700/50 shadow-sm transition-all duration-300">
                            <h3 className="text-xs font-black text-slate-400 mb-4 flex items-center gap-2 uppercase tracking-wider">
                                <LinkIcon size={14} className="text-slate-600" />
                                Liens_Contexte
                            </h3>
                            <div className="space-y-2">
                                <Link to="/finance" className="flex items-center justify-between p-2 rounded-none hover:bg-slate-900 transition-colors group">
                                    <span className="text-xs text-slate-500 font-bold uppercase">Dashboard Principal</span>
                                    <ExternalLink size={12} className="text-slate-700 group-hover:text-blue-500" />
                                </Link>
                                <Link to="/finance/report" className="flex items-center justify-between p-2 rounded-none hover:bg-slate-900 transition-colors group">
                                    <span className="text-xs text-slate-500 font-bold uppercase">Rapport Full</span>
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
