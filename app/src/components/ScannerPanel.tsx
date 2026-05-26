"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

import { type ElementCategory } from "@/src/data/elementsData";
import { filterCategories, categoryAccent } from "@/src/utils/tableConstants";
import { useT } from "@/src/lib/i18n";
import { type DictKey } from "@/src/lib/i18n";

interface ScannerPanelProps {
  showFilters: boolean;
  activeFilter: ElementCategory | null;
  onToggleFilter: (category: ElementCategory) => void;
  onClose: () => void;
}

export function ScannerPanel({
  showFilters,
  activeFilter,
  onToggleFilter,
  onClose,
}: ScannerPanelProps) {
  const t = useT();

  return (
    <div className="absolute top-20 sm:top-24 w-full max-w-[95vw] lg:max-w-[85vw] z-20 flex justify-end pointer-events-none">
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, y: -20, filter: "blur(5px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(5px)" }}
            className="relative bg-[color:var(--background)]/90 backdrop-blur-md border border-[color:var(--primary)]/25 rounded-xl p-4 shadow-2xl pointer-events-auto max-w-2xl"
          >
            {/* Brackets HUD */}
            <span className="absolute top-2 left-2 w-3 h-3 border-t border-l border-[color:var(--primary)]/60" />
            <span className="absolute top-2 right-2 w-3 h-3 border-t border-r border-[color:var(--primary)]/60" />
            <span className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-[color:var(--primary)]/60" />
            <span className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-[color:var(--primary)]/60" />

            <div className="flex justify-between items-center mb-3 border-b border-white/10 pb-2">
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/60">
                {t("scanner.byCategory")}
              </span>
              <button
                onClick={onClose}
                className="text-white/40 hover:text-[color:var(--primary)] transition-colors"
                aria-label={t("modal.close")}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {filterCategories.map((cat) => {
                const isActive = activeFilter === cat.id;
                const accent = categoryAccent[cat.id];
                const label = t(`category.${cat.id}` as DictKey);

                return (
                  <button
                    key={cat.id}
                    onClick={() => onToggleFilter(cat.id)}
                    className="px-3 py-1.5 text-[0.65rem] sm:text-xs font-mono uppercase tracking-wider rounded-full border transition-all duration-300"
                    style={
                      isActive
                        ? {
                            color: accent,
                            borderColor: accent,
                            background: "color-mix(in oklch, " + accent + " 12%, transparent)",
                            boxShadow: "0 0 12px color-mix(in oklch, " + accent + " 40%, transparent)",
                          }
                        : {
                            color: "rgba(255,255,255,0.55)",
                            borderColor: "rgba(255,255,255,0.10)",
                          }
                    }
                  >
                    {label}
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
