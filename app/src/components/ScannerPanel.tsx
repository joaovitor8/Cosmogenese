import { motion, AnimatePresence } from 'framer-motion';
import { X, RotateCcw } from 'lucide-react';
import { ElementCategory } from '@/src/data/elementsData';
import { CATEGORIES } from '@/src/utils/tableConstants';

interface ScannerPanelProps {
  showFilters: boolean;
  activeFilter: ElementCategory | null;
  isCosmic: boolean;
  onToggleFilter: (category: ElementCategory) => void;
  onClose: () => void;
}

export function ScannerPanel({
  showFilters,
  activeFilter,
  isCosmic,
  onToggleFilter,
  onClose,
}: ScannerPanelProps) {
  return (
    <div className="absolute top-20 sm:top-25 w-full max-w-[95vw] lg:max-w-[85vw] z-20 flex justify-end pointer-events-none">
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, y: -20, filter: 'blur(5px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(5px)' }}
            className="bg-core/90 backdrop-blur-md border border-toxic/30 p-4 shadow-2xl pointer-events-auto max-w-2xl"
          >
            <div className="flex justify-between items-center mb-3 border-b border-white/10 pb-2 gap-4">
              <span className="font-mono text-xs tracking-widest text-white/50">
                {isCosmic ? 'FILTRAR ORIGEM CÓSMICA:' : 'SELECIONE A FREQUÊNCIA:'}
              </span>
              <div className="flex items-center gap-2">
                {activeFilter && (
                  <button
                    onClick={() => onToggleFilter(activeFilter)}
                    className="flex items-center gap-1.5 text-[0.65rem] font-mono uppercase text-white/50 hover:text-toxic transition-colors"
                    aria-label="Limpar filtro"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Limpar
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="text-white/40 hover:text-toxic transition-colors"
                  aria-label="Fechar scanner"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => {
                const isActive = activeFilter === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => onToggleFilter(cat.id)}
                    className={`
                      flex items-center gap-2 px-3 py-1.5 text-[0.65rem] sm:text-xs font-mono uppercase border transition-all duration-300
                      ${isActive
                        ? `${cat.textClass} border-current bg-white/10 shadow-[0_0_10px_currentColor_inset]`
                        : 'border-white/10 text-slate-400 hover:border-white/30 hover:text-white bg-black/40'}
                    `}
                  >
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{
                        backgroundColor: cat.hex,
                        boxShadow: isActive ? `0 0 8px ${cat.hex}` : 'none',
                      }}
                    />
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
