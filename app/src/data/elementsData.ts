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

/** Todos os 118 elementos, ordenados por número atômico (Z). Fonte única de verdade. */
export const elements: ChemicalElement[] = [
  ...period1and2,
  ...period3and4,
  ...period5and6,
  ...period7,
  ...lanthanides,
  ...actinides,
].sort((a, b) => a.number - b.number);

const byZ = new Map(elements.map((el) => [el.number, el]));

/** Lookup O(1) por número atômico. Retorna `undefined` para Z fora de 1–118. */
export const elementByZ = (z: number): ChemicalElement | undefined => byZ.get(z);

/** Índice de elementos agrupados por categoria química (alcalino, halogênio, etc.). */
export const elementsByCategory: Record<ElementCategory, ChemicalElement[]> =
  elements.reduce<Record<ElementCategory, ChemicalElement[]>>(
    (acc, el) => {
      (acc[el.category] ??= []).push(el);
      return acc;
    },
    {} as Record<ElementCategory, ChemicalElement[]>,
  );

/** Índice de elementos por origem cósmica (Big Bang, supernova, etc.). Exclui elementos sem origem definida. */
export const elementsByOrigin: Partial<Record<CosmicOrigin, ChemicalElement[]>> =
  elements.reduce<Partial<Record<CosmicOrigin, ChemicalElement[]>>>(
    (acc, el) => {
      if (!el.cosmicOrigin) return acc;
      (acc[el.cosmicOrigin] ??= []).push(el);
      return acc;
    },
    {},
  );

/** Índice de elementos por papel biológico (essencial, tóxico, etc.). Exclui elementos sem papel definido. */
export const elementsByBiology: Partial<Record<BiologicalRole, ChemicalElement[]>> =
  elements.reduce<Partial<Record<BiologicalRole, ChemicalElement[]>>>(
    (acc, el) => {
      if (!el.biologicalRole) return acc;
      (acc[el.biologicalRole] ??= []).push(el);
      return acc;
    },
    {},
  );
