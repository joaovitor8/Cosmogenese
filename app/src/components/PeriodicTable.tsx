"use client";

import { useState } from "react";
import { Radar, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

import { elements, type ChemicalElement } from "@/src/data/elementsData";
import { useT } from "@/src/lib/i18n";
import { useElementFilter } from "@/src/hooks/useElementFilter";

import { ElementCell } from "./ElementCell";
import { ElementModal } from "./ElementModal";
import { ScannerPanel } from "./ScannerPanel";
import { CosmicTimeline } from "./CosmicTimeline";

export default function PeriodicTable() {
  const t = useT();
  const filter = useElementFilter();
  const [selected, setSelected] = useState<ChemicalElement | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);

  const closeFilters = () => {
    setShowFilters(false);
    filter.clear();
  };

  const openFromTimeline = (el: ChemicalElement) => {
    setShowTimeline(false);
    setSelected(el);
  };

  return (
    <div className="flex flex-col items-center w-full min-h-[calc(100vh-4rem)] px-2 sm:px-4 lg:px-8 py-4 relative">
      {/* Title strip + controls */}
      <div className="w-full max-w-[95vw] lg:max-w-[85vw] flex items-center justify-between mb-4 z-30 gap-3">
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col"
        >
          <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-[color:var(--primary)] opacity-70">
            EL-001 → EL-118
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl tracking-[0.15em] uppercase">
            {t("nav.brand")}
          </h1>
        </motion.div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowTimeline(true)}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 font-mono text-xs uppercase rounded-full border border-white/15 text-white/60 hover:border-[color:var(--primary)]/60 hover:text-[color:var(--primary)] bg-black/30 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span className="hidden sm:inline">{t("timeline.open")}</span>
          </button>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 font-mono text-xs uppercase rounded-full border transition-all duration-300 ${
              showFilters || filter.isActive
                ? "border-[color:var(--primary)] text-[color:var(--primary)] bg-[color:var(--primary)]/10 shadow-[0_0_18px_oklch(0.60_0.18_290_/_0.30)]"
                : "border-white/15 text-white/60 hover:border-white/40 hover:text-white bg-black/30"
            }`}
          >
            <Radar className={`w-4 h-4 ${filter.isActive ? "animate-spin-slow" : ""}`} />
            <span className="hidden sm:inline">{t("scanner.title")}</span>
          </button>
        </div>
      </div>

      <ScannerPanel showFilters={showFilters} filter={filter} onClose={closeFilters} />

      {/* GRID DA TABELA */}
      <div
        className="relative shrink-0 z-10"
        style={{
          width: "min(100%, calc((100vh - 12rem) * 1.8))",
          aspectRatio: "18 / 10",
        }}
      >
        <div
          className="absolute inset-0 grid gap-0.5 sm:gap-1"
          style={{
            gridTemplateColumns: "repeat(18, minmax(0, 1fr))",
            gridTemplateRows: "repeat(10, minmax(0, 1fr))",
          }}
        >
          {elements.map((el) => (
            <ElementCell
              key={el.number}
              element={el}
              dimmed={filter.isDimmed(el)}
              onClick={setSelected}
            />
          ))}
        </div>
      </div>

      <ElementModal selected={selected} onClose={() => setSelected(null)} />
      <CosmicTimeline
        open={showTimeline}
        onClose={() => setShowTimeline(false)}
        onSelect={openFromTimeline}
      />
    </div>
  );
}
