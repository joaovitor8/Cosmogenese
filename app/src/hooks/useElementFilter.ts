"use client";

import { useCallback, useMemo, useState } from "react";

import type {
  BiologicalRole,
  ChemicalElement,
  CosmicOrigin,
  ElementCategory,
} from "@/src/data/elementsData";

export interface ElementFilterState {
  category: ElementCategory | null;
  origin: CosmicOrigin | null;
  biology: BiologicalRole | null;
}

const EMPTY: ElementFilterState = { category: null, origin: null, biology: null };

export function useElementFilter() {
  const [filter, setFilter] = useState<ElementFilterState>(EMPTY);

  const toggleCategory = useCallback(
    (c: ElementCategory) =>
      setFilter((f) => ({ ...f, category: f.category === c ? null : c })),
    [],
  );
  const toggleOrigin = useCallback(
    (o: CosmicOrigin) =>
      setFilter((f) => ({ ...f, origin: f.origin === o ? null : o })),
    [],
  );
  const toggleBiology = useCallback(
    (b: BiologicalRole) =>
      setFilter((f) => ({ ...f, biology: f.biology === b ? null : b })),
    [],
  );
  const clear = useCallback(() => setFilter(EMPTY), []);

  const isActive =
    filter.category !== null || filter.origin !== null || filter.biology !== null;

  const isDimmed = useCallback(
    (el: ChemicalElement) => {
      if (!isActive) return false;
      if (filter.category && el.category !== filter.category) return true;
      if (filter.origin && el.cosmicOrigin !== filter.origin) return true;
      if (filter.biology && el.biologicalRole !== filter.biology) return true;
      return false;
    },
    [filter, isActive],
  );

  return useMemo(
    () => ({
      filter,
      toggleCategory,
      toggleOrigin,
      toggleBiology,
      clear,
      isActive,
      isDimmed,
    }),
    [filter, toggleCategory, toggleOrigin, toggleBiology, clear, isActive, isDimmed],
  );
}

export type ElementFilterApi = ReturnType<typeof useElementFilter>;
