import { BookOpen } from 'lucide-react';

interface GlossaryItem {
    term: string;
    definition: string;
}

interface AuditGlossaryProps {
    items: GlossaryItem[];
}

export default function AuditGlossary({ items }: AuditGlossaryProps) {
    return (
        <div className="card bg-slate-800/85 p-6 rounded-none border border-slate-700 relative overflow-hidden transition-all duration-300">
            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 blur-[30px]" />
            <h3 className="text-base font-black text-blue-300 mb-5 flex items-center gap-2 uppercase tracking-[0.25em]">
                <BookOpen size={18} />
                Audit Glossary
            </h3>
            <div className="space-y-4">
                {items.map((item, idx) => (
                    <div key={idx} className="group">
                        <h4 className="text-sm font-black text-blue-400 mb-1 uppercase tracking-wide group-hover:text-blue-300 transition-colors">
                            {item.term}
                        </h4>
                        <p className="text-base text-slate-100 leading-relaxed font-medium">
                            {item.definition}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
