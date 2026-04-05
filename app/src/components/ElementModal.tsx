import { motion, AnimatePresence } from 'framer-motion';
import { ChemicalElement } from '@/src/data/elementsData';


interface ElementModalProps {
  selected: ChemicalElement | null;
  onClose: () => void;
}


export function ElementModal({ selected, onClose }: ElementModalProps) {
  if (!selected) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-core/80 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div 
          initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
          className={`
            relative w-full max-w-2xl bg-[#0a0f0a] border border-white/10 p-8 shadow-2xl transition-all duration-500
            ${selected.category === 'actinide' ? 'border-toxic shadow-[0_0_30px_currentColor]' : ''}
          `}
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white/50 hover:text-white font-mono text-xs uppercase transition-colors"
          >
            [ Esc ]
          </button>

          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* ÁTOMO 3D */}
            <div className={`
              relative w-32 h-32 sm:w-40 sm:h-40 flex flex-col items-center justify-center shrink-0 
              transition-all duration-500 atom-container
              ${selected.category === 'actinide' ? 'text-toxic' : 'text-white/80'}
            `}>
              <div className="orbit orbit-1 opacity-50" style={{ animationDuration: `${Math.max(1.5, 8 - selected.number * 0.05)}s` }} />
              <div className="orbit orbit-2 opacity-50" style={{ animationDuration: `${Math.max(2, 10 - selected.number * 0.05)}s` }} />
              <div className="orbit orbit-3 opacity-50" style={{ animationDuration: `${Math.max(2.5, 12 - selected.number * 0.05)}s` }} />

              <div className={`
                relative z-10 flex flex-col items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full 
                backdrop-blur-md border border-current/20 shadow-[0_0_20px_currentColor_inset]
                ${selected.category === 'actinide' ? 'bg-[#0a150a]/80 hazard-bg bg-opacity-20' : 'bg-black/40'}
              `}>
                <span className="font-mono text-[0.6rem] sm:text-sm opacity-70 -mb-1">{selected.number}</span>
                <span className="text-4xl sm:text-5xl font-bold drop-shadow-[0_0_10px_currentColor]">{selected.symbol}</span>
              </div>
            </div>

            {/* DADOS DO ELEMENTO */}
            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-4xl font-bold uppercase tracking-widest text-white mb-1 drop-shadow-sm">
                  {selected.name}
                </h2>
                <span className="font-mono text-xs text-toxic border border-toxic/30 px-2 py-1 bg-toxic/5 transition-colors">
                  CLASSE: {selected.category.replace(/-/g, '_').toUpperCase()}
                </span>
              </div>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed font-light">{selected.summary}</p>
              <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4 mt-4 font-mono text-xs text-slate-500">
                <div>SETOR (COL) <span className="text-white ml-2 text-sm">{selected.column}</span></div>
                <div>NÍVEL (LIN) <span className="text-white ml-2 text-sm">{selected.row}</span></div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
