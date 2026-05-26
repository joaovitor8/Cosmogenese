import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChemicalElement } from '@/src/data/elementsData';
import { categoryMap } from '@/src/utils/tableConstants';

interface ElementModalProps {
  selected: ChemicalElement | null;
  onClose: () => void;
}

export function ElementModal({ selected, onClose }: ElementModalProps) {
  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selected, onClose]);

  if (!selected) return null;

  const meta = categoryMap[selected.category];
  const isHazard = selected.category === 'actinide';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-core/80 backdrop-blur-md p-4"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={`Ficha do elemento ${selected.name}`}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className={`
            relative w-full max-w-2xl bg-[#0a0f0a] border border-white/10 p-6 sm:p-8 shadow-2xl transition-all duration-500
            ${isHazard ? 'border-toxic shadow-[0_0_30px_currentColor]' : ''}
          `}
          style={!isHazard ? { boxShadow: `0 0 40px ${meta.hex}22` } : undefined}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-white/50 hover:text-white font-mono text-xs uppercase transition-colors px-2 py-1 border border-white/10 hover:border-white/30"
            aria-label="Fechar (Esc)"
          >
            [ Esc ]
          </button>

          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* ÁTOMO 3D */}
            <div
              className={`
                relative w-32 h-32 sm:w-40 sm:h-40 flex flex-col items-center justify-center shrink-0
                transition-all duration-500 atom-container
                ${isHazard ? 'text-toxic' : ''}
              `}
              style={!isHazard ? { color: meta.hex } : undefined}
            >
              <div
                className="orbit orbit-1 opacity-50"
                style={{ animationDuration: `${Math.max(1.5, 8 - selected.number * 0.05)}s` }}
              />
              <div
                className="orbit orbit-2 opacity-50"
                style={{ animationDuration: `${Math.max(2, 10 - selected.number * 0.05)}s` }}
              />
              <div
                className="orbit orbit-3 opacity-50"
                style={{ animationDuration: `${Math.max(2.5, 12 - selected.number * 0.05)}s` }}
              />

              <div
                className={`
                  relative z-10 flex flex-col items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full
                  backdrop-blur-md border border-current/20 shadow-[0_0_20px_currentColor_inset]
                  ${isHazard ? 'bg-[#0a150a]/80 hazard-bg bg-opacity-20' : 'bg-black/40'}
                `}
              >
                <span className="font-mono text-[0.6rem] sm:text-sm opacity-70 -mb-1">
                  {selected.number}
                </span>
                <span className="text-4xl sm:text-5xl font-bold drop-shadow-[0_0_10px_currentColor]">
                  {selected.symbol}
                </span>
              </div>
            </div>

            {/* DADOS DO ELEMENTO */}
            <div className="flex-1 space-y-4 min-w-0">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold uppercase tracking-widest text-white mb-2 drop-shadow-sm break-words">
                  {selected.name}
                </h2>
                <span
                  className="inline-flex items-center gap-2 font-mono text-xs px-2 py-1 border bg-white/5 transition-colors"
                  style={{
                    color: meta.hex,
                    borderColor: `${meta.hex}55`,
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: meta.hex, boxShadow: `0 0 6px ${meta.hex}` }}
                  />
                  CLASSE: {meta.label.toUpperCase()}
                </span>
              </div>

              <p className="text-slate-400 text-sm md:text-base leading-relaxed font-light">
                {selected.summary}
              </p>

              <div className="grid grid-cols-3 gap-3 border-t border-white/10 pt-4 font-mono text-[0.65rem] sm:text-xs text-slate-500 uppercase tracking-widest">
                <div>
                  <div>Nº Atômico</div>
                  <div className="text-white text-base font-sans normal-case tracking-normal mt-1">
                    {selected.number}
                  </div>
                </div>
                <div>
                  <div>Grupo</div>
                  <div className="text-white text-base font-sans normal-case tracking-normal mt-1">
                    {selected.column}
                  </div>
                </div>
                <div>
                  <div>Período</div>
                  <div className="text-white text-base font-sans normal-case tracking-normal mt-1">
                    {selected.row}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
