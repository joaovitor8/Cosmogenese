"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchWikipediaIntro } from "@/src/lib/api";
import { pickLocale, useLocale } from "@/src/lib/i18n";
import type { ChemicalElement } from "@/src/data/elementsData";

/**
 * Busca o dossiê estendido (Wikipédia) de um elemento, apenas quando `enabled`.
 * staleTime/gcTime longos vêm do QueryClient global — os dados são quase estáticos.
 */
export function useElementDetails(element: ChemicalElement, enabled: boolean) {
  const { locale } = useLocale();
  const title = pickLocale(element.name, element.nameEn, locale);

  return useQuery({
    queryKey: ["element-details", element.symbol, locale],
    queryFn: () => fetchWikipediaIntro(title, locale),
    enabled,
  });
}
