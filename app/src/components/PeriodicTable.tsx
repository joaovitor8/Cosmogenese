"use client";

import { useState } from "react";
import { Radar } from "lucide-react";
import { motion } from "framer-motion";

import { elements, type ChemicalElement, type ElementCategory } from "@/src/data/elementsData";
import { useT } from "@/src/lib/i18n";

import { ElementCell } from "./ElementCell";
import { ElementModal } from "./ElementModal";
import { ScannerPanel } from "./ScannerPanel";

export default function PeriodicTable() {
  const t = useT();
  const [selected, setSelected] = useState<ChemicalElement | null>(null);
  const [activeFilter, setActiveFilter] = useState<ElementCategory | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilter = (categoryId: ElementCategory) =>
    setActiveFilter((prev) => (prev === categoryId ? null : categoryId));

  const closeFilters = () => {
    setShowFilters(false);
    setActiveFilter(null);
  };

  return (
    <div className="flex flex-col items-center w-full min-h-[calc(100vh-4rem)] px-2 sm:px-4 lg:px-8 py-4 relative">
      {/* Title strip + Scanner toggle */}
      <div className="w-full max-w-[95vw] lg:max-w-[85vw] flex items-center justify-between mb-4 z-30">
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

        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-2 font-mono text-xs uppercase rounded-full border transition-all duration-300 ${
            showFilters || activeFilter
              ? "border-[color:var(--primary)] text-[color:var(--primary)] bg-[color:var(--primary)]/10 shadow-[0_0_18px_oklch(0.60_0.18_290_/_0.30)]"
              : "border-white/15 text-white/60 hover:border-white/40 hover:text-white bg-black/30"
          }`}
        >
          <Radar className={`w-4 h-4 ${activeFilter ? "animate-spin-slow" : ""}`} />
          {t("scanner.title")}
        </button>
      </div>

      <ScannerPanel
        showFilters={showFilters}
        activeFilter={activeFilter}
        onToggleFilter={toggleFilter}
        onClose={closeFilters}
      />

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
              activeFilter={activeFilter}
              onClick={setSelected}
            />
          ))}
        </div>
      </div>

      <ElementModal selected={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
