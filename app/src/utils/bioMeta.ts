import { Heart, Leaf, Minus, ShieldAlert, Sprout, type LucideIcon } from "lucide-react";

import type { BiologicalRole } from "@/src/data/elementsData";

/** Ordem canônica dos papéis biológicos — do mais central à vida ao irrelevante/tóxico. */
export const BIOLOGY_ORDER: BiologicalRole[] = [
  "essential",
  "trace-essential",
  "beneficial",
  "toxic",
  "none",
];

/** Ícone Lucide por papel biológico, usado nas badges. */
export const BIOLOGY_ICON: Record<BiologicalRole, LucideIcon> = {
  "essential": Heart,
  "trace-essential": Sprout,
  "beneficial": Leaf,
  "toxic": ShieldAlert,
  "none": Minus,
};

/** Cor OKLCH por papel biológico, usada em texto/borda. */
export const BIOLOGY_TINT: Record<BiologicalRole, string> = {
  "essential": "oklch(0.74 0.15 145)",
  "trace-essential": "oklch(0.78 0.14 130)",
  "beneficial": "oklch(0.72 0.14 200)",
  "toxic": "oklch(0.65 0.22 25)",
  "none": "oklch(0.65 0.02 260)",
};
