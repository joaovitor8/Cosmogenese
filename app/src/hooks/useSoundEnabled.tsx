"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { muteAll, unmuteAll } from "@/src/lib/audio";

const STORAGE_KEY = "tabela.sound";

interface SoundContextValue {
  enabled: boolean;
  toggle: () => void;
  setEnabled: (v: boolean) => void;
}

const SoundContext = createContext<SoundContextValue | null>(null);

function applySoundState(v: boolean) {
  try {
    window.localStorage.setItem(STORAGE_KEY, v ? "on" : "off");
  } catch {
    /* fail-silent */
  }
  if (v) unmuteAll();
  else muteAll();
}

export function SoundProvider({ children }: { children: ReactNode }) {
  // Default OFF — autoplay nunca, usuário escolhe.
  const [enabled, setEnabledState] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (stored === "on") setEnabledState(true);
      } catch {
        /* fail-silent */
      }
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  const setEnabled = useCallback((v: boolean) => {
    setEnabledState(v);
    applySoundState(v);
  }, []);

  const toggle = useCallback(() => {
    setEnabledState((prev) => {
      const next = !prev;
      applySoundState(next);
      return next;
    });
  }, []);

  const value = useMemo(() => ({ enabled, toggle, setEnabled }), [enabled, toggle, setEnabled]);

  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>;
}

export function useSoundEnabled() {
  const ctx = useContext(SoundContext);
  if (!ctx) throw new Error("useSoundEnabled deve ser usado dentro de <SoundProvider>");
  return ctx;
}
