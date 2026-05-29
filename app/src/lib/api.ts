import type { Locale } from "@/src/lib/i18n";

export interface WikipediaIntro {
  title: string;
  extract: string;
  thumbnail?: string;
  pageUrl?: string;
}

/**
 * Busca o resumo enciclopédico de um elemento na Wikipédia (REST API).
 * A API segue redirecionamentos automaticamente e envia CORS aberto,
 * então funciona direto do navegador. O nome localizado é usado como título.
 */
export async function fetchWikipediaIntro(
  title: string,
  locale: Locale,
): Promise<WikipediaIntro> {
  const lang = locale === "en" ? "en" : "pt";
  const url = `https://${lang}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
    title,
  )}`;

  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error(`Wikipedia ${res.status}`);

  const data = await res.json();
  return {
    title: data.title ?? title,
    extract: data.extract ?? "",
    thumbnail: data.thumbnail?.source,
    pageUrl: data.content_urls?.desktop?.page,
  };
}
