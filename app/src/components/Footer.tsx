"use client";

import { useEffect, useRef, useState } from "react";
import { Database, ExternalLink, Sparkles } from "lucide-react";

import { useT } from "@/src/lib/i18n";

export function Footer() {
  const t = useT();
  const universeUrl = process.env.NEXT_PUBLIC_UNIVERSE_URL ?? "/";

  const [toxic, setToxic] = useState(false);
  const clickCountRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    document.body.classList.toggle("theme-toxic", toxic);
  }, [toxic]);

  const handleEasterClick = () => {
    clickCountRef.current += 1;
    if (timerRef.current) clearTimeout(timerRef.current);

    if (clickCountRef.current >= 3) {
      setToxic((prev) => !prev);
      clickCountRef.current = 0;
    } else {
      timerRef.current = setTimeout(() => {
        clickCountRef.current = 0;
      }, 1000);
    }
  };

  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-white/[0.06] bg-[color:var(--background)]/70 backdrop-blur-xl mt-12">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Coluna 1 — About */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-[color:var(--primary)]">
              <Sparkles className="w-3.5 h-3.5" /> {t("footer.about")}
            </div>
            <p className="text-sm text-[color:var(--muted-foreground)] leading-relaxed">
              {t("footer.tagline")}
            </p>
          </div>

          {/* Coluna 2 — Data sources */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-[color:var(--primary)]">
              <Database className="w-3.5 h-3.5" /> {t("footer.sources")}
            </div>
            <ul className="flex flex-col gap-1.5 text-sm text-[color:var(--muted-foreground)]">
              <li>NASA / JPL</li>
              <li>Wikipedia REST API</li>
              <li>PubChem PUG-REST</li>
              <li>IUPAC</li>
            </ul>
          </div>

          {/* Coluna 3 — Shortcuts */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-[color:var(--primary)]">
              <ExternalLink className="w-3.5 h-3.5" /> {t("footer.shortcuts")}
            </div>
            <a
              href={universeUrl}
              className="text-sm text-[color:var(--muted-foreground)] hover:text-[color:var(--primary)] transition-colors w-fit"
            >
              ← {t("nav.back")}
            </a>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-white/[0.04]">
          <p className="text-xs font-mono text-[color:var(--muted-foreground)]/70">
            FORJA · ESTELAR · v1.0
          </p>
          <button
            onClick={handleEasterClick}
            className="text-xs font-mono text-[color:var(--muted-foreground)]/50 hover:text-[color:var(--muted-foreground)] transition-colors cursor-default select-none"
            aria-label="Easter egg glyph"
          >
            ◆ {year}
          </button>
        </div>
      </div>
    </footer>
  );
}
