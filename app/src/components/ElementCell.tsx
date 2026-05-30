"use client";

import { memo } from "react";
import { motion } from "framer-motion";

import {
  type AbundanceProfile,
  type ChemicalElement,
} from "@/src/data/elementsData";
import { categoryStyles, type CatAccentStyle } from "@/src/utils/tableConstants";
import { COSMIC_ICON, COSMIC_TINT } from "@/src/utils/cosmicMeta";
import { ABUNDANCE_ROWS_META } from "@/src/utils/abundance";
import { useLocale, type DictKey } from "@/src/lib/i18n";

interface ElementCellProps {
  element: ChemicalElement;
  dimmed: boolean;
  onClick: (el: ChemicalElement) => void;
  pulse?: boolean;
  tintOverride?: string;
}

function dominantReservoir(ab?: AbundanceProfile): keyof AbundanceProfile | null {
  if (!ab) return null;
  let best: keyof AbundanceProfile | null = null;
  let bestVal = -1;
  for (const { key } of ABUNDANCE_ROWS_META) {
    const v = ab[key];
    if (v != null && v > bestVal) {
      bestVal = v;
      best = key;
    }
  }
  return best;
}

function ElementCellInner({
  element,
  dimmed,
  onClick,
  pulse = false,
  tintOverride,
}: ElementCellProps) {
  const { t } = useLocale();
  const gridRow = element.row >= 8 ? element.row + 1 : element.row;

  const OriginIcon = element.cosmicOrigin ? COSMIC_ICON[element.cosmicOrigin] : null;
  const originTint = element.cosmicOrigin ? COSMIC_TINT[element.cosmicOrigin] : undefined;
  const topReservoir = dominantReservoir(element.abundance);
  const topReservoirLabel = topReservoir
    ? ABUNDANCE_ROWS_META.find((r) => r.key === topReservoir)?.labelKey
    : null;

  const overrideStyle: CatAccentStyle = tintOverride
    ? {
        gridColumn: element.column,
        gridRow,
        "--cat-accent": tintOverride,
        color: tintOverride,
        borderColor: `color-mix(in oklch, ${tintOverride} 45%, transparent)`,
        background: `color-mix(in oklch, ${tintOverride} 8%, oklch(0.15 0.04 260 / 0.55))`,
        boxShadow: `0 0 16px color-mix(in oklch, ${tintOverride} 30%, transparent)`,
      }
    : {
        gridColumn: element.column,
        gridRow,
        ...(pulse
          ? {
              "--cat-accent":
                element.cosmicOrigin && originTint ? originTint : "var(--primary)",
            }
          : {}),
      };

  return (
    <motion.button
      onClick={() => onClick(element)}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      whileHover={{ scale: dimmed ? 1 : 1.1, zIndex: dimmed ? 1 : 50 }}
      style={overrideStyle}
      className={`
        @container group relative w-full h-full flex flex-col items-center justify-center
        glass-cell transition-all duration-500 cursor-crosshair rounded-sm
        ${dimmed ? "opacity-10 grayscale brightness-50 pointer-events-none" : ""}
        ${!dimmed && !tintOverride ? categoryStyles[element.category] : ""}
        ${pulse && !dimmed ? "eod-halo z-10" : ""}
      `}
    >
      <span className="absolute top-[5%] left-[8%] text-[15cqw] font-mono opacity-60 group-hover:opacity-100 transition-opacity">
        {element.number}
      </span>
      <strong className="text-[40cqw] font-bold leading-none tracking-tighter mt-[10%] drop-shadow-md">
        {element.symbol}
      </strong>
      <span className="text-[12cqw] uppercase font-medium tracking-widest opacity-70 group-hover:opacity-100 truncate w-[90%] text-center mt-[2%]">
        {element.name}
      </span>

      {/* Hover preview — escondido em telas touch */}
      <span
        className="cell-tooltip pointer-events-none absolute bottom-[105%] left-1/2 -translate-x-1/2 z-50 w-max max-w-56 rounded-md border border-white/10 bg-[#06060c]/95 backdrop-blur-md px-2.5 py-1.5 opacity-0 [@media(hover:hover)]:group-hover:opacity-100 transition-opacity duration-200 flex flex-col gap-0.5 normal-case"
      >
        {element.cosmicOrigin && OriginIcon && (
          <span
            className="flex items-center gap-1.5 text-[11px] font-mono tracking-wide"
            style={{ color: originTint }}
          >
            <OriginIcon className="w-3 h-3 shrink-0" />
            {t(`origin.${element.cosmicOrigin}` as DictKey)}
          </span>
        )}
        {topReservoir && topReservoirLabel && (
          <span className="text-[10px] font-mono text-white/55 tracking-wide">
            {t("modal.abundance")}: {t(topReservoirLabel)}
          </span>
        )}
      </span>
    </motion.button>
  );
}

/**
 * Célula clicável de um elemento na grade. `memo` porque a tabela renderiza
 * 118 instâncias e a re-render do pai (filtros, EOD) é frequente.
 * `pulse` ativa o halo do "elemento do dia"; `tintOverride` colore por origem cósmica (stardust mode).
 */
export const ElementCell = memo(ElementCellInner);
