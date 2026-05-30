import { Droplet, Heart, Mountain, Sparkles, Wind, type LucideIcon } from "lucide-react";

import type { AbundanceProfile } from "@/src/data/elementsData";
import type { DictKey } from "@/src/lib/i18n";

/** Normaliza ppm para 0..1 numa escala logarítmica. Total = 10^6 ppm = 100%. */
export function logRatio(ppm: number | null | undefined): number {
  if (ppm == null || ppm <= 0) return 0;
  const r = Math.log10(ppm + 1) / 6.5;
  return Math.max(0, Math.min(1, r));
}

/** Formata ppm para texto curto e legível (%, ppm, ou notação exponencial). */
export function formatPpm(ppm: number | null | undefined): string {
  if (ppm == null) return "—";
  if (ppm === 0) return "0";
  const pct = ppm / 10000;
  if (pct >= 1) return `${pct.toFixed(0)}%`;
  if (pct >= 0.01) return `${pct.toFixed(2)}%`;
  if (ppm >= 1) return `${ppm.toFixed(0)} ppm`;
  if (ppm >= 0.001) return `${ppm.toFixed(3)} ppm`;
  return `${ppm.toExponential(1)} ppm`;
}

export interface AbundanceRowMeta {
  key: keyof AbundanceProfile;
  labelKey: DictKey;
  icon: LucideIcon;
}

/** Ordem canônica dos reservatórios de abundância, com ícone e chave i18n. */
export const ABUNDANCE_ROWS_META: readonly AbundanceRowMeta[] = [
  { key: "universe", labelKey: "modal.abundance.universe", icon: Sparkles },
  { key: "earthCrust", labelKey: "modal.abundance.crust", icon: Mountain },
  { key: "earthAtmosphere", labelKey: "modal.abundance.atmosphere", icon: Wind },
  { key: "earthOcean", labelKey: "modal.abundance.ocean", icon: Droplet },
  { key: "humanBody", labelKey: "modal.abundance.body", icon: Heart },
];
