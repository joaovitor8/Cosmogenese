"use client";

import { LOCALES, useLocale } from "@/src/lib/i18n";

/** Toggle PT/EN. Consome o `LocaleProvider`. */
export function LocaleToggle() {
  const { locale, setLocale } = useLocale();

  return (
    <div className="inline-flex items-center gap-px rounded-full border border-white/10 bg-black/30 backdrop-blur-sm p-0.5">
      {LOCALES.map((l) => {
        const active = locale === l.id;
        return (
          <button
            key={l.id}
            onClick={() => setLocale(l.id)}
            className={`px-2.5 py-1 text-[10px] font-mono tracking-[0.2em] rounded-full transition-all ${
              active
                ? "bg-(--primary)/20 text-primary shadow-[0_0_12px_oklch(0.60_0.18_290/0.25)]"
                : "text-white/50 hover:text-white"
            }`}
            aria-pressed={active}
          >
            {l.label}
          </button>
        );
      })}
    </div>
  );
}
