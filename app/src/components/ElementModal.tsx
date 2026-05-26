"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Atom,
  Disc,
  Droplet,
  ExternalLink,
  Flame,
  FlaskConical,
  Heart,
  Leaf,
  Minus,
  Mountain,
  ShieldAlert,
  Sparkles,
  Sprout,
  Star,
  Sun,
  Wind,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";

import {
  type AbundanceProfile,
  type BiologicalRole,
  type ChemicalElement,
  type CosmicOrigin,
} from "@/src/data/elementsData";
import { categoryAccent } from "@/src/utils/tableConstants";
import { pickLocale, useLocale, type DictKey } from "@/src/lib/i18n";
import { HudPanel } from "./hud";

interface ElementModalProps {
  selected: ChemicalElement | null;
  onClose: () => void;
}

const COSMIC_ICON: Record<CosmicOrigin, LucideIcon> = {
  "big-bang":                Sparkles,
  "cosmic-ray-spallation":   Zap,
  "stellar-fusion-low":      Sun,
  "stellar-fusion-high":     Flame,
  "supernova":               Star,
  "neutron-star-merger":     Atom,
  "white-dwarf-explosion":   Disc,
  "human-made":              FlaskConical,
};

const BIOLOGY_ICON: Record<BiologicalRole, LucideIcon> = {
  "essential":       Heart,
  "trace-essential": Sprout,
  "beneficial":      Leaf,
  "toxic":           ShieldAlert,
  "none":            Minus,
};

const BIOLOGY_TINT: Record<BiologicalRole, string> = {
  "essential":       "oklch(0.74 0.15 145)",
  "trace-essential": "oklch(0.78 0.14 130)",
  "beneficial":      "oklch(0.72 0.14 200)",
  "toxic":           "oklch(0.65 0.22 25)",
  "none":            "oklch(0.65 0.02 260)",
};

/** Normaliza ppm para 0..1 numa escala logarítmica. Total = 10^6 ppm = 100%. */
function logRatio(ppm: number | null | undefined): number {
  if (ppm == null || ppm <= 0) return 0;
  const r = Math.log10(ppm + 1) / 6.5;
  return Math.max(0, Math.min(1, r));
}

/** Formata ppm para texto curto e legível. */
function formatPpm(ppm: number | null | undefined): string {
  if (ppm == null) return "—";
  if (ppm === 0) return "0";
  const pct = ppm / 10000; // ppm → %
  if (pct >= 1) return `${pct.toFixed(0)}%`;
  if (pct >= 0.01) return `${pct.toFixed(2)}%`;
  if (ppm >= 1) return `${ppm.toFixed(0)} ppm`;
  if (ppm >= 0.001) return `${ppm.toFixed(3)} ppm`;
  return `${ppm.toExponential(1)} ppm`;
}

export function ElementModal({ selected, onClose }: ElementModalProps) {
  const { t, locale } = useLocale();

  if (!selected) return null;

  const accent = categoryAccent[selected.category];
  const codename = `EL-${selected.number.toString().padStart(3, "0")}`;
  const name = pickLocale(selected.name, selected.nameEn, locale);
  const summary = pickLocale(selected.summary, selected.summaryEn, locale);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto"
        onClick={onClose}
        style={{ "--cat-accent": accent } as React.CSSProperties}
      >
        <motion.div
          initial={{ scale: 0.92, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.92, y: 20 }}
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
          className="relative w-full max-w-5xl my-8 rounded-2xl border border-white/10 bg-[color:var(--card)]/90 backdrop-blur-2xl shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header strip */}
          <div className="flex items-start justify-between p-5 sm:p-6 border-b border-white/[0.06]">
            <div className="flex flex-col gap-1">
              <span
                className="font-mono text-[10px] tracking-[0.35em] uppercase"
                style={{ color: accent }}
              >
                {codename}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl tracking-[0.1em] uppercase">
                {name}
              </h2>
              <span
                className="font-mono text-[10px] tracking-[0.2em] uppercase mt-1 inline-block px-2 py-0.5 rounded-sm border w-fit"
                style={{
                  color: accent,
                  borderColor: accent + "55",
                  background: `color-mix(in oklch, ${accent} 10%, transparent)`,
                }}
              >
                {t(`category.${selected.category}` as DictKey)}
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-white/50 hover:text-white transition-colors p-1"
              aria-label={t("modal.close")}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 p-5 sm:p-6">
            {/* Left: 3D atom + summary */}
            <div className="flex flex-col items-center md:items-start gap-4 md:w-64">
              <div
                className="relative w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center atom-container shrink-0"
                style={{ color: accent }}
              >
                <div
                  className="orbit orbit-1 opacity-60"
                  style={{ animationDuration: `${Math.max(1.5, 8 - selected.number * 0.05)}s` }}
                />
                <div
                  className="orbit orbit-2 opacity-60"
                  style={{ animationDuration: `${Math.max(2, 10 - selected.number * 0.05)}s` }}
                />
                <div
                  className="orbit orbit-3 opacity-60"
                  style={{ animationDuration: `${Math.max(2.5, 12 - selected.number * 0.05)}s` }}
                />

                <div
                  className="relative z-10 flex flex-col items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-black/50 backdrop-blur-md border"
                  style={{
                    borderColor: accent + "40",
                    boxShadow: `0 0 30px ${accent}33 inset`,
                  }}
                >
                  <span className="font-mono text-xs opacity-70 -mb-1">
                    {selected.number}
                  </span>
                  <span
                    className="text-4xl sm:text-5xl font-bold"
                    style={{ filter: `drop-shadow(0 0 12px ${accent})` }}
                  >
                    {selected.symbol}
                  </span>
                </div>
              </div>

              <p className="text-sm text-[color:var(--muted-foreground)] leading-relaxed">
                {summary}
              </p>
            </div>

            {/* Right: HUD panels */}
            <div className="flex flex-col gap-4">
              <CosmicOriginPanel element={selected} />
              <AbundancePanel abundance={selected.abundance} t={t} />
              <BiologyPanel element={selected} locale={locale} t={t} />
            </div>
          </div>

          {/* Footer telemetry */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px border-t border-white/[0.06] bg-white/[0.02] rounded-b-2xl overflow-hidden">
            <TelemetryCell
              label={t("modal.discoveredBy")}
              value={selected.discoveredBy ?? "—"}
            />
            <TelemetryCell
              label={t("modal.year")}
              value={
                selected.discoveryYear === "ancient"
                  ? t("modal.year.ancient")
                  : selected.discoveryYear?.toString() ?? "—"
              }
            />
            <TelemetryCell label={t("modal.column")} value={selected.column.toString()} />
            <TelemetryCell label={t("modal.row")} value={selected.row.toString()} />
          </div>

          {/* CTA — preparado para Fase 5 */}
          <div className="flex justify-end p-4">
            <button
              disabled
              title={t("modal.moreDetails")}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 text-white/30 text-[10px] font-mono uppercase tracking-[0.25em] cursor-not-allowed"
            >
              <ExternalLink className="w-3.5 h-3.5" /> {t("modal.moreDetails")}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ─── Sub-panels ──────────────────────────────────────────────── */

function CosmicOriginPanel({ element }: { element: ChemicalElement }) {
  const { t, locale } = useLocale();
  const accent = categoryAccent[element.category];

  if (!element.cosmicOrigin) {
    return (
      <HudPanel label={t("modal.cosmicOrigin")}>
        <p className="text-sm text-[color:var(--muted-foreground)] italic">
          {t("common.unknown")}
        </p>
      </HudPanel>
    );
  }

  const Icon = COSMIC_ICON[element.cosmicOrigin];
  const originLabel = t(`origin.${element.cosmicOrigin}` as DictKey);
  const note = pickLocale(
    element.cosmicOriginNote ?? "",
    element.cosmicOriginNoteEn,
    locale,
  );

  return (
    <HudPanel label={t("modal.cosmicOrigin")}>
      <div className="flex items-start gap-4">
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0 border"
          style={{
            color: accent,
            borderColor: accent + "40",
            background: `color-mix(in oklch, ${accent} 8%, transparent)`,
            boxShadow: `0 0 18px ${accent}33`,
          }}
        >
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex flex-col gap-1.5 flex-1">
          <span
            className="font-mono text-[11px] tracking-[0.25em] uppercase"
            style={{ color: accent }}
          >
            {originLabel}
          </span>
          {note && (
            <p className="text-sm text-[color:var(--foreground)]/85 leading-relaxed">
              {note}
            </p>
          )}
        </div>
      </div>
    </HudPanel>
  );
}

interface AbundancePanelProps {
  abundance: AbundanceProfile | undefined;
  t: (k: DictKey) => string;
}

function AbundancePanel({ abundance, t }: AbundancePanelProps) {
  const rows: { key: keyof AbundanceProfile; label: string; icon: LucideIcon }[] = [
    { key: "universe",        label: t("modal.abundance.universe"),   icon: Sparkles },
    { key: "earthCrust",      label: t("modal.abundance.crust"),      icon: Mountain },
    { key: "earthAtmosphere", label: t("modal.abundance.atmosphere"), icon: Wind },
    { key: "earthOcean",      label: t("modal.abundance.ocean"),      icon: Droplet },
    { key: "humanBody",       label: t("modal.abundance.body"),       icon: Heart },
  ];

  if (!abundance) {
    return (
      <HudPanel label={t("modal.abundance")}>
        <p className="text-sm text-[color:var(--muted-foreground)] italic">
          {t("common.unknown")}
        </p>
      </HudPanel>
    );
  }

  return (
    <HudPanel label={t("modal.abundance")}>
      <div className="flex flex-col gap-2">
        {rows.map(({ key, label, icon: Icon }) => {
          const value = abundance[key];
          const ratio = logRatio(value);
          return (
            <div key={key} className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 w-28 shrink-0">
                <Icon className="w-3 h-3 text-[color:var(--muted-foreground)]/60" />
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[color:var(--muted-foreground)]">
                  {label}
                </span>
              </div>
              <div className="flex-1 h-2 rounded-full overflow-hidden bg-white/[0.04]">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${ratio * 100}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{
                    background: `linear-gradient(90deg, var(--cat-accent) 0%, color-mix(in oklch, var(--cat-accent) 60%, transparent) 100%)`,
                    boxShadow: ratio > 0 ? `0 0 8px var(--cat-accent)` : undefined,
                  }}
                />
              </div>
              <span className="font-mono text-[11px] tabular-nums text-[color:var(--foreground)]/80 w-20 text-right shrink-0">
                {formatPpm(value)}
              </span>
            </div>
          );
        })}
      </div>
    </HudPanel>
  );
}

interface BiologyPanelProps {
  element: ChemicalElement;
  locale: "pt" | "en";
  t: (k: DictKey) => string;
}

function BiologyPanel({ element, locale, t }: BiologyPanelProps) {
  if (!element.biologicalRole && !element.naturalSources?.length) {
    return null;
  }

  const role = element.biologicalRole;
  const RoleIcon = role ? BIOLOGY_ICON[role] : null;
  const tint = role ? BIOLOGY_TINT[role] : "oklch(0.65 0.02 260)";
  const note = pickLocale(
    element.biologicalRoleNote ?? "",
    element.biologicalRoleNoteEn,
    locale,
  );
  const sources = pickLocale(
    (element.naturalSources ?? []).join("|"),
    (element.naturalSourcesEn ?? []).join("|") || undefined,
    locale,
  )
    .split("|")
    .filter(Boolean);

  return (
    <HudPanel label={t("modal.biology")}>
      <div className="flex flex-col gap-4">
        {role && RoleIcon && (
          <div className="flex items-start gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border"
              style={{
                color: tint,
                borderColor: tint + "40",
                background: `color-mix(in oklch, ${tint} 8%, transparent)`,
              }}
            >
              <RoleIcon className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <span
                className="font-mono text-[10px] tracking-[0.25em] uppercase block mb-1"
                style={{ color: tint }}
              >
                {t(`bio.${role}` as DictKey)}
              </span>
              {note && (
                <p className="text-sm text-[color:var(--foreground)]/80 leading-relaxed">
                  {note}
                </p>
              )}
            </div>
          </div>
        )}

        {sources.length > 0 && (
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-[color:var(--muted-foreground)]">
              {t("modal.naturalSources")}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {sources.map((src) => (
                <span
                  key={src}
                  className="text-[11px] font-mono px-2 py-0.5 rounded-full border border-white/10 bg-white/[0.03] text-[color:var(--foreground)]/75"
                >
                  {src}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </HudPanel>
  );
}

function TelemetryCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-3 bg-[color:var(--background)]/40 flex flex-col gap-0.5">
      <span className="text-[9px] font-mono tracking-[0.25em] uppercase text-[color:var(--muted-foreground)]/70">
        {label}
      </span>
      <span className="text-sm font-mono text-[color:var(--foreground)]/90 tabular-nums truncate">
        {value}
      </span>
    </div>
  );
}
