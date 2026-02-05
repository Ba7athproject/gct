import { useState } from 'react';
import type { ReactNode } from 'react';
import { ChevronDown, ChevronUp, Database } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnalyticalPanelProps {
    children: ReactNode;
}

export default function AnalyticalPanel({ children }: AnalyticalPanelProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <aside className="space-y-5 lg:space-y-7">
            {/* Mobile Toggle Header */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden w-full flex items-center justify-between px-5 py-4 bg-slate-900 border border-slate-800 rounded-none mb-2 group active:bg-slate-800 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <Database size={18} className="text-blue-400" />
                    <span className="text-sm font-black text-slate-100 uppercase tracking-[0.2em]">
                        Panneau_Outils_Analytiques
                    </span>
                </div>
                {isOpen ? (
                    <ChevronUp size={18} className="text-slate-400" />
                ) : (
                    <ChevronDown size={18} className="text-slate-400" />
                )}
            </button>

            {/* Desktop View / Mobile Collapsible Content */}
            <div className="hidden lg:block space-y-5 lg:space-y-7 text-sm text-slate-100">
                {children}
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="lg:hidden overflow-hidden space-y-5 text-sm text-slate-100"
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="hidden lg:grid grid-cols-2 gap-2 mt-4 opacity-60">
                <div className="h-0.5 bg-slate-700" />
                <div className="h-0.5 bg-slate-700" />
            </div>
        </aside>
    );
}
