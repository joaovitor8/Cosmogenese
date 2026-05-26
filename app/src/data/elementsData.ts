import type {
  AbundanceProfile,
  BiologicalRole,
  ChemicalElement,
  CosmicOrigin,
  ElementCategory,
} from "./types";
import { period1and2 } from "./elements/period-1-2";
import { period3and4 } from "./elements/period-3-4";
import { period5and6 } from "./elements/period-5-6";
import { period7 } from "./elements/period-7";
import { lanthanides } from "./elements/lanthanides";
import { actinides } from "./elements/actinides";

export type {
  AbundanceProfile,
  BiologicalRole,
  ChemicalElement,
  CosmicOrigin,
  ElementCategory,
};

export const elements: ChemicalElement[] = [
  ...period1and2,
  ...period3and4,
  ...period5and6,
  ...period7,
  ...lanthanides,
  ...actinides,
].sort((a, b) => a.number - b.number);

const byZ = new Map(elements.map((el) => [el.number, el]));

export const elementByZ = (z: number): ChemicalElement | undefined => byZ.get(z);

export const elementsByCategory = elements.reduce<Record<ElementCategory, ChemicalElement[]>>(
  (acc, el) => {
    (acc[el.category] ??= []).push(el);
    return acc;
  },
  {} as Record<ElementCategory, ChemicalElement[]>,
);

export const elementsByOrigin = elements.reduce<Partial<Record<CosmicOrigin, ChemicalElement[]>>>(
  (acc, el) => {
    if (!el.cosmicOrigin) return acc;
    (acc[el.cosmicOrigin] ??= []).push(el);
    return acc;
  },
  {},
);

export const elementsByBiology = elements.reduce<Partial<Record<BiologicalRole, ChemicalElement[]>>>(
  (acc, el) => {
    if (!el.biologicalRole) return acc;
    (acc[el.biologicalRole] ??= []).push(el);
    return acc;
  },
  {},
);
