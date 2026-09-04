import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Shell({
  children,
  progress,
  onBack,
  wide,
}: {
  children: ReactNode;
  progress?: number;
  onBack?: (() => void) | undefined;
  wide?: boolean;
}) {
  return (
    <div className="min-h-screen bg-background">
      {typeof progress === "number" && (
        <div className="sticky top-0 z-20 bg-background/90 backdrop-blur">
          <div className="mx-auto flex w-full max-w-[560px] items-center gap-3 px-5 py-3">
            {onBack ? (
              <button
                type="button"
                onClick={onBack}
                aria-label="Voltar"
                className="shrink-0 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
              >
                ←
              </button>
            ) : (
              <span className="w-3 shrink-0" />
            )}
            <div className="h-1 min-w-0 flex-1 overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-primary transition-all duration-500"
                style={{ width: `${Math.max(4, progress)}%` }}
              />
            </div>
            <span className="shrink-0 text-[11px] font-semibold tabular-nums text-muted-foreground">
              {Math.round(progress)}%
            </span>
          </div>
        </div>
      )}
      <div
        className={cn(
          "mx-auto w-full px-5 pb-16 pt-6",
          wide ? "max-w-[620px]" : "max-w-[560px]",
        )}
      >
        {children}
      </div>
    </div>
  );
}

export function Fade({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("animate-in fade-in slide-in-from-bottom-2 duration-500", className)}>{children}</div>;
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow mb-3">{children}</p>;
}

export function H({ children, className }: { children: ReactNode; className?: string }) {
  return <h2 className={cn("headline text-[1.6rem] leading-[1.08] sm:text-[1.9rem]", className)}>{children}</h2>;
}

export function P({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("text-[0.98rem] leading-relaxed text-muted-foreground", className)}>{children}</p>;
}

export function Cta({
  children,
  onClick,
  href,
  className,
}: {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
}) {
  const classes = cn(
    "block w-full rounded-full bg-cta px-6 py-4 text-center text-[0.95rem] font-extrabold uppercase tracking-wide text-cta-foreground shadow-cta transition-transform active:scale-[0.985] hover:brightness-105",
    className,
  );
  if (href) {
    return (
      <a href={href} onClick={onClick} className={classes}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={classes}>
      {children}
    </button>
  );
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-3xl border border-border bg-card p-5 shadow-card", className)}>
      {children}
    </div>
  );
}

export function Photo({
  src,
  alt,
  className,
  eager,
}: {
  src: string;
  alt: string;
  className?: string;
  eager?: boolean;
}) {
  return (
    <img
      src={src}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      className={cn("w-full rounded-3xl object-cover shadow-soft", className)}
    />
  );
}

export function Bar({ label, value, invert }: { label: string; value: number; invert?: boolean }) {
  const pct = invert ? (10 - value) * 10 : value * 10;
  return (
    <div className="mb-4">
      <div className="mb-1.5 flex items-baseline justify-between gap-2">
        <span className="min-w-0 truncate text-[0.85rem] font-semibold">{label}</span>
        <span className="shrink-0 text-[0.75rem] font-bold text-primary tabular-nums">{pct}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full bg-primary transition-all duration-1000"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
