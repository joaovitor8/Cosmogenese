"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface CommsFailureProps {
  message?: string;
  detail?: string;
  onRetry?: () => void;
  retryLabel?: string;
  className?: string;
}

export function CommsFailure({
  message = "Falha de comunicação com a base de dados.",
  detail,
  onRetry,
  retryLabel = "Reconectar",
  className,
}: CommsFailureProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-5 py-12 text-center",
        className,
      )}
    >
      <div
        className="w-16 h-16 rounded-full border-2 border-red-400/40 bg-red-400/10 flex items-center justify-center"
        style={{ animation: "hud-flicker 3s linear infinite" }}
      >
        <AlertTriangle className="w-7 h-7 text-red-400" />
      </div>

      <div className="space-y-1.5 max-w-md">
        <div className="text-[10px] font-mono tracking-[0.35em] text-red-400 uppercase">
          Sinal Perdido — Code 503
        </div>
        <p className="text-sm text-[color:var(--foreground)]/90">{message}</p>
        {detail && (
          <p className="text-xs font-mono text-[color:var(--muted-foreground)]/80 pt-2">
            {detail}
          </p>
        )}
      </div>

      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-red-400/30 text-red-400 hover:bg-red-400/10 hover:scale-105 text-xs font-mono uppercase tracking-[0.25em] transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5" /> {retryLabel}
        </button>
      )}
    </div>
  );
}
