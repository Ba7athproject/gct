import { useState } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import bailleursData from '../data/bailleurs_par_annee.json';
import { formatPercentage } from '../utils/format';
import AcronymTooltip from '../components/AcronymTooltip';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658'];

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

    // Helper to render name with tooltip if applicable
    const renderName = (name: string) => {
        if (ACRONYMS[name]) {
            return <AcronymTooltip term={name} definition={ACRONYMS[name]} />;
        }
        return name;
    };

    // Helper to extract top donors trend
    const bhBankTrend = bailleursData.map(d => ({
        year: d.year,
        amount: d.sources.find(s => s.name === 'BH BANK')?.amount || 0
    }));

    const itfcTrend = bailleursData.map(d => ({
        year: d.year,
        amount: d.sources.find(s => s.name === 'ITFC')?.amount || 0
    }));

    return (
        <div className="space-y-8">
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Sources de Financement</h2>
                <p className="text-slate-700 text-sm leading-relaxed">
                    <strong>Note importante :</strong> Dans ce site, le terme "financement" désigne principalement les <strong>prêts et crédits</strong> accordés au Groupe Chimique Tunisien, souvent avec la garantie de l'État.
                    Ces montants correspondent donc à des <strong>dettes</strong> que l'entreprise devra rembourser, avec des conditions spécifiques selon chaque bailleur (banques locales, institutions internationales, etc.).
                </p>
            </div>

            <div>
                <h3 className="text-xl font-bold text-slate-800">Qui finance le GCT ?</h3>
                <p className="text-slate-500">Répartition entre acteurs locaux et internationaux.</p>
            </div>

            {/* Year Selector */}
            <div className="flex gap-2 overflow-x-auto pb-2">
                {bailleursData.map(d => (
                    <button
                        key={d.year}
                        onClick={() => setSelectedYear(d.year)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${selectedYear === d.year
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                            }`}
                    >
                        {d.year}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Pie Chart for Selected Year */}
                <div className="card">
                    <h3 className="text-lg font-semibold mb-4 text-center">Répartition {selectedYear}</h3>
                    <div className="h-[350px] w-full relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={yearData.sources}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, payload }: any) => {
                                        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                                        const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                                        const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
                                        return percent > 0.05 ? (
                                            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize={12}>
                                                {formatPercentage(payload.percent)}
                                            </text>
                                        ) : null;
                                    }}
                                    outerRadius={120}
                                    fill="#8884d8"
                                    dataKey="percent"
                                >
                                    {yearData.sources.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(_value: any, _name: any, props: any) => `${props.payload.amount} MDT`} />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-4 space-y-2">
                        {yearData.sources.map((source, idx) => (
                            <div key={idx} className="flex justify-between items-center text-sm border-b border-slate-50 last:border-0 py-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></div>
                                    <span className="text-slate-700 font-medium">{renderName(source.name)}</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-slate-500">{source.amount} MDT</span>
                                    <span className="text-slate-900 font-bold w-16 text-right">{formatPercentage(source.percent)}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top Donors Trend */}
                <div className="card">
                    <h3 className="text-lg font-semibold mb-6">Évolution des Bailleurs Clés</h3>

                    <div className="h-[300px] mb-8">
                        <div className="mb-2">
                            <h4 className="text-sm font-medium text-slate-800 flex items-center gap-2">
                                {renderName('BH BANK')}
                                <span className="text-xs text-slate-400 font-normal">(Prêteur Historique)</span>
                            </h4>
                        </div>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={bhBankTrend}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="year" />
                                <YAxis />
                                <Tooltip cursor={{ fill: '#f8fafc' }} />
                                <Bar dataKey="amount" fill="#0088FE" radius={[4, 4, 0, 0]} name="BH Bank" />
                            </BarChart>
                        </ResponsiveContainer>
                        <p className="text-xs text-slate-500 mt-2 italic">
                            Le financement par la BH Bank augmente significativement, soulignant la dépendance accrue aux banques locales.
                        </p>
                    </div>

                    <div className="h-[300px]">
                        <div className="mb-2">
                            <h4 className="text-sm font-medium text-slate-800">
                                {renderName('ITFC')}
                            </h4>
                        </div>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={itfcTrend}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="year" />
                                <YAxis />
                                <Tooltip cursor={{ fill: '#f8fafc' }} />
                                <Bar dataKey="amount" fill="#00C49F" radius={[4, 4, 0, 0]} name="ITFC" />
                            </BarChart>
                        </ResponsiveContainer>
                        <p className="text-xs text-slate-500 mt-2 italic">
                            L'ITFC devient un partenaire clé pour le financement des importations (matières premières).
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
