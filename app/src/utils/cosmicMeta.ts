import {
  Atom,
  Disc,
  Flame,
  FlaskConical,
  Sparkles,
  Star,
  Sun,
  Zap,
  type LucideIcon,
} from "lucide-react";

import type { CosmicOrigin } from "@/src/data/elementsData";

/** Ordem cronológica cósmica: do Big Bang à criação humana. */
export const COSMIC_ORIGIN_ORDER: CosmicOrigin[] = [
  "big-bang",
  "cosmic-ray-spallation",
  "stellar-fusion-low",
  "stellar-fusion-high",
  "supernova",
  "neutron-star-merger",
  "white-dwarf-explosion",
  "human-made",
];

export const COSMIC_ICON: Record<CosmicOrigin, LucideIcon> = {
  "big-bang": Sparkles,
  "cosmic-ray-spallation": Zap,
  "stellar-fusion-low": Sun,
  "stellar-fusion-high": Flame,
  "supernova": Star,
  "neutron-star-merger": Atom,
  "white-dwarf-explosion": Disc,
  "human-made": FlaskConical,
};

export const COSMIC_TINT: Record<CosmicOrigin, string> = {
  "big-bang": "oklch(0.85 0.14 90)",
  "cosmic-ray-spallation": "oklch(0.72 0.16 200)",
  "stellar-fusion-low": "oklch(0.78 0.16 80)",
  "stellar-fusion-high": "oklch(0.70 0.19 40)",
  "supernova": "oklch(0.65 0.22 25)",
  "neutron-star-merger": "oklch(0.62 0.22 305)",
  "white-dwarf-explosion": "oklch(0.72 0.14 220)",
  "human-made": "oklch(0.74 0.15 145)",
};
