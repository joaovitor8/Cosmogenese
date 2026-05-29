import { type ReactNode } from "react";
import { cn } from "@/src/lib/utils";

interface HudPanelProps {
  label?: string;
  badge?: ReactNode;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  brackets?: boolean;
  variant?: "glass" | "solid";
}

export function HudPanel({
  label,
  badge,
  children,
  className,
  contentClassName,
  brackets = true,
  variant = "glass",
}: HudPanelProps) {
  return (
    <div
      className={cn(
        "relative rounded-2xl p-4 md:p-6",
        variant === "glass" &&
          "border border-white/10 bg-white/3 backdrop-blur-xl",
        variant === "solid" && "border border-white/5 bg-[#05050a]",
        className,
      )}
    >
      {brackets && (
        <>
          <span
            className="absolute top-2 left-2 w-3 h-3 border-t border-l"
            style={{ borderColor: "var(--cat-accent, var(--primary))" }}
          />
          <span
            className="absolute top-2 right-2 w-3 h-3 border-t border-r"
            style={{ borderColor: "var(--cat-accent, var(--primary))" }}
          />
          <span
            className="absolute bottom-2 left-2 w-3 h-3 border-b border-l"
            style={{ borderColor: "var(--cat-accent, var(--primary))" }}
          />
          <span
            className="absolute bottom-2 right-2 w-3 h-3 border-b border-r"
            style={{ borderColor: "var(--cat-accent, var(--primary))" }}
          />
        </>
      )}

      {(label || badge) && (
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/5 gap-3">
          {label ? (
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-muted-foreground">
              {label}
            </span>
          ) : (
            <span />
          )}
          {badge}
        </div>
      )}

      <div className={contentClassName}>{children}</div>
    </div>
  );
}
