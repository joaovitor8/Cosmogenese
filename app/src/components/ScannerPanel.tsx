import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { ElementCategory } from '@/src/data/elementsData';
import { filterCategories, categoryStyles } from '@/src/utils/tableConstants';



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
  onClose 
}: ScannerPanelProps) {
  return (
    <div className="absolute top-20 sm:top-25 w-full max-w-[95vw] lg:max-w-[85vw] z-20 flex justify-end pointer-events-none">
      <AnimatePresence>
        {showFilters && (
          <motion.div 
            initial={{ opacity: 0, y: -20, filter: "blur(5px)" }} 
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} 
            exit={{ opacity: 0, y: -10, filter: "blur(5px)" }} 
            className="bg-core/90 backdrop-blur-md border border-toxic/30 p-4 shadow-2xl pointer-events-auto max-w-2xl"
          >
            <div className="flex justify-between items-center mb-3 border-b border-white/10 pb-2">
              <span className="font-mono text-xs tracking-widest text-white/50">
                {isCosmic ? "FILTRAR ORIGEM CÓSMICA:" : "SELECIONE A FREQUÊNCIA:"}
              </span>
              <button 
                onClick={onClose} 
                className="text-white/40 hover:text-toxic transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {filterCategories.map(cat => {
                const isActive = activeFilter === cat.id;
                // Pega a cor base (ex: text-cyan-300) da constante de estilos
                const baseColorClass = categoryStyles[cat.id].split(' ')[0]; 

                return (
                  <button 
                    key={cat.id} 
                    onClick={() => onToggleFilter(cat.id)} 
                    className={`
                      px-3 py-1.5 text-[0.65rem] sm:text-xs font-mono uppercase border transition-all duration-300 
                      ${isActive 
                        ? `${baseColorClass} border-current bg-white/10 shadow-[0_0_10px_currentColor_inset]` 
                        : 'border-white/10 text-slate-400 hover:border-white/30 hover:text-white bg-black/40'}
                    `}
                  >
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
