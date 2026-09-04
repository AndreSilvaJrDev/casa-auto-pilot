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
    <div className="min-h-screen bg-background text-foreground">
      {typeof progress === "number" && (
        <header className="sticky top-0 z-30 border-b border-border/70 bg-background/95 backdrop-blur">
          <div className="mx-auto w-full max-w-[620px] px-4 pb-3 pt-3 sm:px-5">
            <div className="relative flex items-center justify-center">
              {onBack ? (
                <button
                  type="button"
                  onClick={onBack}
                  aria-label="Voltar"
                  className="absolute left-0 grid h-9 w-9 place-items-center rounded-full text-xl text-muted-foreground transition hover:bg-secondary hover:text-foreground"
                >
                  ‹
                </button>
              ) : null}

              <div className="text-center">
                <div className="text-[0.72rem] font-black uppercase tracking-[0.18em] text-foreground">
                  CASA NO <span className="text-cta">AUTOMÁTICO</span>
                </div>
              </div>
            </div>

            <div className="mt-3 h-2 overflow-hidden rounded-full border border-primary/15 bg-secondary">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary to-cta transition-all duration-500"
                style={{ width: `${Math.max(5, progress)}%` }}
              />
            </div>
          </div>
        </header>
      )}

      <main
        className={cn(
          "mx-auto w-full px-4 pb-14 pt-5 sm:px-5 sm:pb-16",
          wide ? "max-w-[1080px]" : "max-w-[620px]",
        )}
      >
        {children}
      </main>
    </div>
  );
}

export function Fade({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "animate-in fade-in slide-in-from-bottom-2 duration-500",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Screen({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <Fade className={cn("mx-auto w-full max-w-[580px] pt-2", className)}>
      {children}
    </Fade>
  );
}

export function Trust() {
  return (
    <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[0.76rem] font-semibold text-muted-foreground">
      <span>◷ Leva cerca de 1 minuto</span>
      <span>▣ Respostas privadas</span>
    </div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow mb-3">{children}</p>;
}

export function H({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h2
      className={cn(
        "font-display text-[1.72rem] font-black leading-[1.06] tracking-[-0.035em] sm:text-[2rem]",
        className,
      )}
    >
      {children}
    </h2>
  );
}

export function P({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "text-[0.98rem] leading-[1.65] text-muted-foreground",
        className,
      )}
    >
      {children}
    </p>
  );
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
    "group flex min-h-[56px] w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-primary to-cta px-6 py-4 text-center text-[0.93rem] font-black uppercase tracking-[0.025em] text-white shadow-cta transition hover:-translate-y-0.5 hover:brightness-[1.03] active:translate-y-0 active:scale-[0.99]",
    className,
  );

  const inner = (
    <>
      <span>{children}</span>
      <span className="text-xl transition-transform group-hover:translate-x-1">→</span>
    </>
  );

  if (href) {
    return (
      <a href={href} onClick={onClick} className={classes}>
        {inner}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {inner}
    </button>
  );
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "rounded-[1.45rem] border border-border/90 bg-card p-5 shadow-card",
        className,
      )}
    >
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
      className={cn(
        "w-full rounded-[1.6rem] border border-white/70 object-cover shadow-soft",
        className,
      )}
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
