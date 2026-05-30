import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Combina classes Tailwind resolvendo conflitos (a última vence). Padrão shadcn — use em todo `className` dinâmico. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Devolve `color` com transparência via `color-mix`. Funciona com qualquer
 * cor CSS válida (oklch, var(--x), hex). Substitui o anti-pattern `oklch(...) + "55"`,
 * que produz string inválida e é silenciosamente descartado pelo browser.
 */
export function withAlpha(color: string, percent: number): string {
  return `color-mix(in oklch, ${color} ${percent}%, transparent)`;
}
