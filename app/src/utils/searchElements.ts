import { elements, type ChemicalElement } from "@/src/data/elementsData";
import type { DictKey, Locale } from "@/src/lib/i18n";

interface ScoredElement {
  element: ChemicalElement;
  score: number;
}

// U+0300–U+036F = Combining Diacritical Marks. Construído via charCode pra
// não depender de bytes literais combinantes no source (que confundem editores).
const COMBINING_MARKS = new RegExp(
  `[${String.fromCharCode(0x0300)}-${String.fromCharCode(0x036f)}]`,
  "g",
);

function norm(s: string): string {
  return s.toLowerCase().normalize("NFD").replace(COMBINING_MARKS, "").trim();
}

interface SearchContext {
  locale: Locale;
  t: (key: DictKey) => string;
}

/**
 * Busca elementos por símbolo, nome (PT/EN), número atômico, categoria ou origem cósmica.
 *
 * Pontuação (heurística, maior = melhor match):
 *  - 100 símbolo exato · 95 nome local exato · 90 número atômico/nome alt exato
 *  - 80 símbolo prefixo · 70 nome local prefixo · 60 nome alt prefixo
 *  - 40 nome local contém · 30 nome alt contém · 20 categoria/origem contém
 *
 * Empate de score é desempatado pelo número atômico (mais leve primeiro).
 * Normaliza acentos e caixa antes de comparar.
 */
export function searchElements(
  query: string,
  { locale, t }: SearchContext,
  limit = 8,
): ChemicalElement[] {
  const q = norm(query);
  if (!q) return [];

  const asNumber = Number(q);
  const isNumericQuery = Number.isInteger(asNumber) && asNumber > 0;

  const scored: ScoredElement[] = [];

  for (const el of elements) {
    let score = 0;

    const symbol = norm(el.symbol);
    if (symbol === q) score = Math.max(score, 100);
    else if (symbol.startsWith(q)) score = Math.max(score, 80);

    if (isNumericQuery && el.number === asNumber) score = Math.max(score, 90);

    const namePt = norm(el.name);
    const nameEn = el.nameEn ? norm(el.nameEn) : "";
    const localName = locale === "en" && nameEn ? nameEn : namePt;
    const altName = locale === "en" ? namePt : nameEn;

    if (localName === q) score = Math.max(score, 95);
    else if (localName.startsWith(q)) score = Math.max(score, 70);
    else if (localName.includes(q)) score = Math.max(score, 40);

    if (altName && altName !== localName) {
      if (altName === q) score = Math.max(score, 90);
      else if (altName.startsWith(q)) score = Math.max(score, 60);
      else if (altName.includes(q)) score = Math.max(score, 30);
    }

    const cat = norm(t(`category.${el.category}` as DictKey));
    if (cat.includes(q)) score = Math.max(score, 20);

    if (el.cosmicOrigin) {
      const origin = norm(t(`origin.${el.cosmicOrigin}` as DictKey));
      if (origin.includes(q)) score = Math.max(score, 20);
    }

    if (score > 0) scored.push({ element: el, score });
  }

  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.element.number - b.element.number;
  });

  return scored.slice(0, limit).map((s) => s.element);
}
