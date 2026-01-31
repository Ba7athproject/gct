import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, Area, AreaChart } from 'recharts';
import { Euro, DollarSign, Coins, TrendingUp, Shield, Building2, Clock, BarChart3, PieChart as PieChartIcon } from 'lucide-react';
import historicalLoans from '../data/historical_loans_2016_2028.json';
import historicalGuarantees from '../data/historical_guarantees.json';
import historicalSummary from '../data/historical_summary.json';

const KPICard = ({ title, value, subtext, icon: Icon, color = 'blue' }: any) => {
    const colorClasses = {
        blue: 'bg-blue-50 text-blue-600',
        emerald: 'bg-emerald-50 text-emerald-600',
        amber: 'bg-amber-50 text-amber-600',
        purple: 'bg-purple-50 text-purple-600'
    };

    return (
        <div className="card flex items-start justify-between hover:shadow-lg transition-shadow">
            <div>
                <p className="text-sm font-medium text-slate-500">{title}</p>
                <h3 className="text-2xl font-bold mt-1 text-slate-900">{value}</h3>
                <p className="text-xs mt-1 text-slate-500">{subtext}</p>
            </div>
            <div className={`p-3 ${colorClasses[color as keyof typeof colorClasses]} rounded-lg`}>
                <Icon size={20} />
            </div>
        </div>
    );
};

const TimelineItem = ({ loan }: any) => {
    const deviseColors: any = {
        'M€': 'border-blue-500 bg-blue-50',
        'M$': 'border-emerald-500 bg-emerald-50',
        'MD': 'border-amber-500 bg-amber-50'
    };

    return (
        <div className="relative pl-8 pb-8 border-l-2 border-slate-200 last:border-0">
            <div className={`absolute -left-3 top-0 w-6 h-6 rounded-full border-4 ${deviseColors[loan.devise] || 'border-slate-300 bg-slate-50'}`}></div>
            <div className="card hover:shadow-lg transition-all hover:scale-[1.02]">
                <div className="flex items-start justify-between mb-2">
                    <div>
                        <h4 className="font-bold text-slate-800">{loan.bailleur_full}</h4>
                        <p className="text-sm text-slate-500">{loan.date}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-2xl font-bold text-slate-900">{loan.montant} {loan.devise}</p>
                        {loan.montant_dt && <p className="text-sm text-slate-500">≈ {loan.montant_dt} MD</p>}
                    </div>
                </div>
                <p className="text-sm text-slate-600 mb-3">{loan.objectif}</p>
                <div className="flex flex-wrap gap-2 text-xs">
                    {loan.taux && <span className="px-2 py-1 bg-slate-100 rounded">Taux: {loan.taux}</span>}
                    {loan.duree && <span className="px-2 py-1 bg-slate-100 rounded">Durée: {loan.duree}</span>}
                    {loan.grace && <span className="px-2 py-1 bg-slate-100 rounded">Grâce: {loan.grace}</span>}
                </div>
            </div>
        </div>
    );
};

export default function HistoricalApproach() {
    // Préparer les données pour le graphique en barres (en dinars pour comparaison)
    const loansChartData = historicalLoans.map(loan => ({
        name: loan.bailleur,
        year: loan.year,
        montant_dt: loan.montant_dt || 0,
        montantOriginal: loan.montant,
        devise: loan.devise
    }));

    // Données pour le graphique circulaire des devises
    const currencyData = [
        { name: 'Euros', value: historicalSummary.totaux.euros.montant, color: '#2563eb' },
        { name: 'Dollars', value: historicalSummary.totaux.dollars.montant, color: '#10b981' },
        { name: 'Dinars', value: historicalSummary.totaux.dinars.montant, color: '#f59e0b' }
    ];

    // Données pour l'évolution temporelle
    const timelineData = historicalLoans.map(loan => ({
        year: loan.year,
        montant_dt: loan.montant_dt || 0,
        bailleur: loan.bailleur
    }));

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Clock className="text-blue-600" size={28} />
                        <h2 className="text-2xl font-bold text-slate-800">Approche Historique</h2>
                    </div>
                    <p className="text-slate-500">Analyse des Prêts, Crédits et Garanties GCT (2016-2028)</p>
                </div>
                <div className="bg-blue-50 text-blue-800 px-4 py-2 rounded-lg text-sm border border-blue-200">
                    📊 Période étendue: 12 ans de financement
                </div>
            </div>

            {/* KPIs - Totaux par Devise */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <KPICard
                    title="Total Euros"
                    value={`${historicalSummary.totaux.euros.montant} M€`}
                    subtext={historicalSummary.totaux.euros.detail}
                    icon={Euro}
                    color="blue"
                />
                <KPICard
                    title="Total Dollars"
                    value={`${historicalSummary.totaux.dollars.montant} M$`}
                    subtext={historicalSummary.totaux.dollars.detail}
                    icon={DollarSign}
                    color="emerald"
                />
                <KPICard
                    title="Total Dinars"
                    value={`${historicalSummary.totaux.dinars.montant} MD`}
                    subtext={historicalSummary.totaux.dinars.detail}
                    icon={Coins}
                    color="amber"
                />
            </div>

            {/* Graphiques Dynamiques */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Graphique en Barres - Prêts par Bailleur */}
                <div className="card">
                    <div className="flex items-center gap-2 mb-6">
                        <BarChart3 className="text-blue-600" size={24} />
                        <h3 className="text-lg font-semibold">Prêts par Bailleur (en MD)</h3>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={loansChartData} margin={{ top: 10, right: 30, left: 0, bottom: 80 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis
                                    dataKey="name"
                                    angle={-45}
                                    textAnchor="end"
                                    height={80}
                                    interval={0}
                                />
                                <YAxis label={{ value: 'Montant (MD)', angle: -90, position: 'insideLeft' }} />
                                <Tooltip
                                    content={({ active, payload }) => {
                                        if (active && payload && payload.length) {
                                            const data = payload[0].payload;
                                            return (
                                                <div className="bg-white p-4 rounded-lg shadow-xl border border-slate-200">
                                                    <p className="font-bold text-slate-800 mb-2">{data.name}</p>
                                                    <div className="space-y-1">
                                                        <p className="text-sm text-slate-600">
                                                            <span className="font-semibold">Montant original:</span> {data.montantOriginal} {data.devise}
                                                        </p>
                                                        <p className="text-sm text-blue-600 font-semibold">
                                                            ≈ {data.montant_dt} MD
                                                        </p>
                                                        <p className="text-xs text-slate-500 mt-2">Année: {data.year}</p>
                                                    </div>
                                                </div>
                                            );
                                        }
                                        return null;
                                    }}
                                />
                                <Bar
                                    dataKey="montant_dt"
                                    fill="#2563eb"
                                    name="Montant"
                                    radius={[8, 8, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <p className="text-xs text-slate-500 mt-2 text-center">
                        * Montants convertis en dinars tunisiens pour comparaison
                    </p>
                </div>

                {/* Graphique Circulaire - Répartition par Devise */}
                <div className="card">
                    <div className="flex items-center gap-2 mb-6">
                        <PieChartIcon className="text-emerald-600" size={24} />
                        <h3 className="text-lg font-semibold">Répartition par Devise</h3>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={currencyData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, value }) => `${name}: ${value}`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {currencyData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Graphique d'Évolution Temporelle */}
            <div className="card">
                <div className="flex items-center gap-2 mb-6">
                    <TrendingUp className="text-purple-600" size={24} />
                    <h3 className="text-lg font-semibold">Évolution des Financements (en MD)</h3>
                </div>
                <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={timelineData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorMontant" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="year" />
                            <YAxis />
                            <Tooltip
                                content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                        const data = payload[0].payload;
                                        return (
                                            <div className="bg-white p-4 rounded-lg shadow-xl border border-slate-200">
                                                <p className="font-bold text-slate-800 mb-2">Année {data.year}</p>
                                                <div className="space-y-1">
                                                    <p className="text-sm text-slate-600">
                                                        <span className="font-semibold">Bailleur:</span> {data.bailleur}
                                                    </p>
                                                    <p className="text-lg font-semibold text-purple-600">
                                                        {data.montant_dt} MD
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                            />
                            <Area
                                type="monotone"
                                dataKey="montant_dt"
                                stroke="#8b5cf6"
                                fillOpacity={1}
                                fill="url(#colorMontant)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Timeline des Prêts */}
            <div className="card">
                <div className="flex items-center gap-2 mb-6">
                    <Clock className="text-blue-600" size={24} />
                    <h3 className="text-lg font-semibold">Timeline Détaillée des Prêts</h3>
                </div>
                <div className="space-y-0">
                    {historicalLoans.map((loan) => (
                        <TimelineItem key={loan.id} loan={loan} />
                    ))}
                </div>
            </div>

            {/* Garanties de l'État avec Graphique */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="card">
                    <div className="flex items-center gap-2 mb-6">
                        <Shield className="text-emerald-600" size={24} />
                        <h3 className="text-lg font-semibold">Garanties de l'État Tunisien</h3>
                    </div>
                    <div className="space-y-4">
                        {historicalGuarantees.map((guarantee, idx) => (
                            <div key={idx} className="p-4 bg-slate-50 rounded-lg border border-slate-200 hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <p className="font-semibold text-slate-800">{guarantee.type}</p>
                                        <p className="text-sm text-slate-500">{guarantee.beneficiaire}</p>
                                    </div>
                                    <span className="text-xs px-2 py-1 bg-slate-200 rounded">{guarantee.year}</span>
                                </div>
                                {guarantee.montant && (
                                    <p className="text-lg font-bold text-emerald-600">{guarantee.montant} {guarantee.devise}</p>
                                )}
                                <p className="text-sm text-slate-600 mt-2">{guarantee.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Dons et Subventions */}
                <div className="card">
                    <div className="flex items-center gap-2 mb-6">
                        <Building2 className="text-purple-600" size={24} />
                        <h3 className="text-lg font-semibold">Dons et Subventions</h3>
                    </div>
                    <div className="space-y-4">
                        {historicalSummary.dons_subventions.map((don, idx) => (
                            <div key={idx} className="p-4 bg-purple-50 rounded-lg border border-purple-200 hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <p className="font-semibold text-slate-800">{don.source}</p>
                                        <p className="text-sm text-slate-500">{don.annee}</p>
                                    </div>
                                    <p className="text-lg font-bold text-purple-600">
                                        {don.montant} {don.devise}
                                    </p>
                                </div>
                                <p className="text-sm text-slate-600">{don.objectif}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Engagements Indirects */}
            <div className="card bg-gradient-to-br from-slate-800 to-slate-900 text-white">
                <h3 className="text-lg font-semibold mb-4 text-white">Engagements Indirects (Chaîne Phosphate)</h3>
                <p className="text-sm text-slate-300 mb-6">
                    Financements accordés à d'autres entités mais bénéficiant directement à l'activité du GCT
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {historicalSummary.engagements_indirects.map((eng, idx) => (
                        <div key={idx} className="p-4 bg-white/10 rounded-lg border border-white/20 hover:bg-white/20 transition-all">
                            <p className="font-semibold text-white mb-1">{eng.projet}</p>
                            <p className="text-sm text-slate-300 mb-2">{eng.source}</p>
                            <p className="text-xl font-bold text-emerald-400">
                                {eng.montant} {eng.devise}
                            </p>
                            {eng.montant_dt && <p className="text-sm text-slate-400">≈ {eng.montant_dt} MD</p>}
                            <p className="text-xs text-slate-400 mt-2">{eng.objectif}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Contexte Financier */}
            <div className="card border-l-4 border-amber-500">
                <h3 className="text-lg font-semibold mb-4 text-slate-800">⚠️ Contexte Financier Important</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 bg-amber-50 rounded-lg">
                        <p className="text-sm font-medium text-slate-600 mb-2">Créances de l'État</p>
                        <p className="text-3xl font-bold text-amber-600 mb-2">
                            {historicalSummary.contexte_financier.creances_etat.montant} MD
                        </p>
                        <p className="text-sm text-slate-600">
                            {historicalSummary.contexte_financier.creances_etat.description}
                        </p>
                    </div>
                    <div className="p-4 bg-rose-50 rounded-lg">
                        <p className="text-sm font-medium text-slate-600 mb-2">Dettes Croisées</p>
                        <p className="text-3xl font-bold text-rose-600 mb-2">
                            {historicalSummary.contexte_financier.dettes_croisees.pourcentage}%
                        </p>
                        <p className="text-sm text-slate-600">
                            {historicalSummary.contexte_financier.dettes_croisees.description}
                        </p>
                    </div>
                </div>
            </div>

            {/* Note Méthodologique */}
            <div className="card bg-slate-50 border border-slate-200">
                <h4 className="font-semibold text-slate-800 mb-2">📋 Note Méthodologique</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                    Cette section présente une analyse historique étendue des financements du GCT sur la période 2016-2028,
                    incluant les prêts directs, les garanties de l'État, les dons et subventions, ainsi que les engagements
                    indirects via la chaîne phosphate. Les données sont issues de décrets présidentiels, communiqués officiels
                    et rapports budgétaires. Les montants en devises étrangères sont présentés dans leur devise d'origine,
                    avec conversion indicative en dinars tunisiens lorsque disponible.
                </p>
            </div>
        </div>
    );
}
