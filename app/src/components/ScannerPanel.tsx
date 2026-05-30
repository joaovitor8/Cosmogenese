"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

import { elementsByOrigin } from "@/src/data/elementsData";
import { filterCategories, categoryAccent } from "@/src/utils/tableConstants";
import { COSMIC_ORIGIN_ORDER, COSMIC_TINT } from "@/src/utils/cosmicMeta";
import { BIOLOGY_ORDER, BIOLOGY_TINT } from "@/src/utils/bioMeta";
import { useT, type DictKey } from "@/src/lib/i18n";
import type { ElementFilterApi } from "@/src/hooks/useElementFilter";

interface ScannerPanelProps {
  showFilters: boolean;
  filter: ElementFilterApi;
  onClose: () => void;
}

interface PillProps {
  label: string;
  accent: string;
  active: boolean;
  onClick: () => void;
}

function Pill({ label, accent, active, onClick }: PillProps) {
  return (
    <button
      onClick={onClick}
      className="px-3 py-1.5 text-[0.65rem] sm:text-xs font-mono uppercase tracking-wider rounded-full border transition-all duration-300"
      style={
        active
          ? {
              color: accent,
              borderColor: accent,
              background: `color-mix(in oklch, ${accent} 12%, transparent)`,
              boxShadow: `0 0 12px color-mix(in oklch, ${accent} 40%, transparent)`,
            }
          : { color: "rgba(255,255,255,0.55)", borderColor: "rgba(255,255,255,0.10)" }
      }
    >
      {label}
    </button>
  );
}

export function ScannerPanel({ showFilters, filter, onClose }: ScannerPanelProps) {
  const t = useT();
  const origins = COSMIC_ORIGIN_ORDER.filter((o) => (elementsByOrigin[o]?.length ?? 0) > 0);

  return (
    <div className="absolute top-20 sm:top-24 w-full max-w-[95vw] lg:max-w-[85vw] z-20 flex justify-end pointer-events-none">
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, y: -20, filter: "blur(5px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(5px)" }}
            className="relative bg-(--background)/92 backdrop-blur-md border border-(--primary)/25 rounded-xl p-4 shadow-2xl pointer-events-auto w-[min(40rem,92vw)] max-h-[70vh] overflow-y-auto"
          >
            <span className="absolute top-2 left-2 w-3 h-3 border-t border-l border-(--primary)/60" />
            <span className="absolute top-2 right-2 w-3 h-3 border-t border-r border-(--primary)/60" />
            <span className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-(--primary)/60" />
            <span className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-(--primary)/60" />

            <div className="flex justify-between items-center mb-3 border-b border-white/10 pb-2">
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/60">
                {t("scanner.title")}
              </span>
              <div className="flex items-center gap-3">
                {filter.isActive && (
                  <button
                    onClick={filter.clear}
                    className="font-mono text-[10px] tracking-[0.2em] uppercase text-primary hover:underline"
                  >
                    {t("scanner.clear")}
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="text-white/40 hover:text-primary transition-colors"
                  aria-label={t("modal.close")}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {/* Categoria */}
              <section className="flex flex-col gap-2">
                <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-muted-foreground">
                  {t("scanner.axisCategory")}
                </span>
                <div className="flex flex-wrap gap-2">
                  {filterCategories.map((cat) => (
                    <Pill
                      key={cat.id}
                      label={t(`category.${cat.id}` as DictKey)}
                      accent={categoryAccent[cat.id]}
                      active={filter.filter.category === cat.id}
                      onClick={() => filter.toggleCategory(cat.id)}
                    />
                  ))}
                </div>
              </section>

              {/* Origem cósmica */}
              <section className="flex flex-col gap-2">
                <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-muted-foreground">
                  {t("scanner.axisOrigin")}
                </span>
                <div className="flex flex-wrap gap-2">
                  {origins.map((origin) => (
                    <Pill
                      key={origin}
                      label={t(`origin.${origin}` as DictKey)}
                      accent={COSMIC_TINT[origin]}
                      active={filter.filter.origin === origin}
                      onClick={() => filter.toggleOrigin(origin)}
                    />
                  ))}
                </div>
              </section>

              {/* Papel biológico */}
              <section className="flex flex-col gap-2">
                <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-muted-foreground">
                  {t("scanner.axisBiology")}
                </span>
                <div className="flex flex-wrap gap-2">
                  {BIOLOGY_ORDER.map((role) => (
                    <Pill
                      key={role}
                      label={t(`bio.${role}` as DictKey)}
                      accent={BIOLOGY_TINT[role]}
                      active={filter.filter.biology === role}
                      onClick={() => filter.toggleBiology(role)}
                    />
                  ))}
                </div>
              </section>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
