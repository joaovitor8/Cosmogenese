"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

import { elementsByOrigin, type ChemicalElement } from "@/src/data/elementsData";
import { COSMIC_ORIGIN_ORDER, COSMIC_ICON, COSMIC_TINT } from "@/src/utils/cosmicMeta";
import { pickLocale, useLocale, type DictKey } from "@/src/lib/i18n";

interface CosmicTimelineProps {
  open: boolean;
  onClose: () => void;
  onSelect: (el: ChemicalElement) => void;
}

export function CosmicTimeline({ open, onClose, onSelect }: CosmicTimelineProps) {
  const { t, locale } = useLocale();

  const stops = COSMIC_ORIGIN_ORDER.map((origin) => ({
    origin,
    elements: (elementsByOrigin[origin] ?? []).slice().sort((a, b) => a.number - b.number),
  })).filter((s) => s.elements.length > 0);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, y: 24 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 24 }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className="relative w-full max-w-4xl my-8 rounded-2xl border border-white/10 bg-(--card)/90 backdrop-blur-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between p-6 border-b border-white/6">
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[10px] tracking-[0.35em] uppercase ext-primary">
                  TIMELINE · BIG-BANG → HUMAN
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl tracking-widest uppercase">
                  {t("timeline.title")}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {t("timeline.subtitle")}
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-white/50 hover:text-white transition-colors p-1"
                aria-label={t("modal.close")}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Stops */}
            <div className="relative p-6 flex flex-col gap-5">
              {/* Linha vertical conectando as paradas */}
              <span className="absolute left-[2.85rem] top-10 bottom-10 w-px bg-linear-to-b from-transparent via-white/15 to-transparent" />

              {stops.map(({ origin, elements }) => {
                const Icon = COSMIC_ICON[origin];
                const tint = COSMIC_TINT[origin];
                return (
                  <div key={origin} className="relative flex gap-4">
                    <div
                      className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center border z-10"
                      style={{
                        color: tint,
                        borderColor: tint + "55",
                        background: `color-mix(in oklch, ${tint} 12%, var(--background))`,
                        boxShadow: `0 0 18px ${tint}44`,
                      }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="flex-1 pb-1">
                      <div className="flex items-baseline gap-2 mb-2">
                        <span
                          className="font-mono text-xs tracking-[0.2em] uppercase"
                          style={{ color: tint }}
                        >
                          {t(`origin.${origin}` as DictKey)}
                        </span>
                        <span className="font-mono text-[10px] text-muted-foreground/60">
                          {elements.length} {t("timeline.count")}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {elements.map((el) => (
                          <button
                            key={el.number}
                            onClick={() => onSelect(el)}
                            title={pickLocale(el.name, el.nameEn, locale)}
                            className="w-9 h-9 rounded-md border text-sm font-bold font-mono transition-all hover:scale-110 hover:z-10"
                            style={{
                              color: tint,
                              borderColor: tint + "33",
                              background: `color-mix(in oklch, ${tint} 7%, transparent)`,
                            }}
                          >
                            {el.symbol}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
