import { FileDown, BookOpen } from 'lucide-react';

export default function FullReport() {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-slate-800">Rapport Complet</h2>
                <p className="text-slate-500">Accès aux données brutes et méthodologie.</p>
            </div>

            <div className="card max-w-4xl mx-auto text-center py-16">
                <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600">
                    <BookOpen size={40} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                    Rapport Financier GCT 2020-2026
                </h3>
                <p className="text-slate-600 max-w-lg mx-auto mb-8">
                    Ce document detailles l&apos;analyse financière consolidée du Groupe Chimique Tunisien,
                    incluant les transferts de l&apos;État, les garanties souveraines et la structure de la
                    dette.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                        href="https://drive.google.com/uc?export=download&id=1yOgRl_Ohx7ZVPJ9aYeg5jdlXJn3ZNuJZ"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-lg hover:bg-slate-800 transition-colors"
                    >
                        <FileDown size={20} />
                        Télécharger le PDF
                    </a>
                </div>
            </div>

            <div className="card max-w-4xl mx-auto">
                <h3 className="text-lg font-bold mb-4">Méthodologie &amp; Sources</h3>
                <div className="prose prose-slate max-w-none text-sm">
                    <h4 className="font-semibold text-slate-800">1. Sources de Données</h4>
                    <ul className="list-disc pl-5 space-y-1 text-slate-600">
                        <li>
                            <strong>2020-2023 :</strong> Données réelles issues des rapports sur les Entreprises
                            Publiques (Annexes LF).
                        </li>
                        <li>
                            <strong>2024-2026 :</strong> Estimations basées sur les Lois de Finances et
                            extrapolations linéaires.
                        </li>
                    </ul>

                    <h4 className="font-semibold text-slate-800 mt-4">2. Unités</h4>
                    <p className="text-slate-600">
                        Toutes les valeurs monétaires sont exprimées en{' '}
                        <strong>Millions de Dinars Tunisiens (MDT)</strong>, sauf indication contraire.
                    </p>

                    <h4 className="font-semibold text-slate-800 mt-4">3. Avertissement</h4>
                    <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                        <p className="text-amber-800">
                            Les données prévisionnelles (2025-2026) sont sujettes à modification en fonction de
                            l&apos;évolution de la conjoncture économique et des décisions budgétaires de
                            l&apos;État.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
