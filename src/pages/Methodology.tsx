import { FileText, Database, Info } from 'lucide-react';

export default function Methodology() {
    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div>
                <h2 className="text-3xl font-bold text-slate-800 mb-4">Données & Méthodologie</h2>
                <p className="text-slate-600 text-lg">
                    Transparence sur les sources utilisées et les méthodes de calcul pour ce rapport.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Data Sources */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                    <div className="flex items-center gap-3 mb-4 text-blue-600">
                        <Database size={24} />
                        <h3 className="text-xl font-semibold">Sources des Données</h3>
                    </div>
                    <ul className="space-y-2 text-slate-700 list-disc list-inside">
                        <li>Rapports sur les Établissements Publics (Ministère des Finances).</li>
                        <li>Lois de Finances (2020-2024).</li>
                        <li>États financiers publiés par le Groupe Chimique Tunisien (GCT).</li>
                        <li>Rapports annuels des bailleurs internationaux (ITFC, BEI, BERD).</li>
                    </ul>
                </div>

                {/* Terminology */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                    <div className="flex items-center gap-3 mb-4 text-emerald-600">
                        <Info size={24} />
                        <h3 className="text-xl font-semibold">Terminologie Financière</h3>
                    </div>
                    <p className="text-slate-700 leading-relaxed">
                        Le terme <strong>"Financement"</strong> est utilisé ici pour désigner l'ensemble des ressources externes mobilisées par le GCT.
                        Il s'agit majoritairement de <strong>dettes</strong> (bancaires, lignes de crédit) garanties par l'État, plutôt que de subventions ou de revenus propres.
                    </p>
                </div>
            </div>

            {/* Methodology & Estimates */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                <div className="flex items-center gap-3 mb-4 text-purple-600">
                    <FileText size={24} />
                    <h3 className="text-xl font-semibold">Méthodologie & Projections (2024-2026)</h3>
                </div>
                <div className="space-y-4 text-slate-700">
                    <p>
                        Les données pour la période <strong>2020-2023</strong> sont basées sur les chiffres réalisés et audités, tels que rapportés par les organismes officiels.
                    </p>
                    <p>
                        Pour la période <strong>2024-2026</strong>, les chiffres présentés sont des <strong>projections</strong> (estimations) basées sur :
                    </p>
                    <ul className="list-disc list-inside pl-4 space-y-1">
                        <li>Les tendances de financement observées les années précédentes.</li>
                        <li>Les accords-cadres annoncés par les bailleurs de fonds (par exemple l'accord triennal avec l'ITFC).</li>
                        <li>Les besoins de financement prévisionnels liés aux importations de matières premières.</li>
                    </ul>
                </div>
            </div>

            {/* Limitations */}
            <div className="bg-amber-50 p-6 rounded-lg border border-amber-200">
                <h3 className="text-lg font-bold text-amber-800 mb-2">Limites des Données</h3>
                <p className="text-amber-900 text-sm">
                    Ce site est un outil de visualisation à but informatif. Bien que nous nous efforcions d'assurer l'exactitude des données, des divergences peuvent exister entre les chiffres présentés et la situation comptable en temps réel du GCT, notamment en raison des taux de change (pour les dettes en devises) et des délais de publication des rapports officiels.
                </p>
            </div>
        </div>
    );
}
