import { useState } from "react";
import { cn } from "@/lib/utils";
import type { Question } from "@/lib/funnel";
import { Eyebrow, Fade, H } from "./ui";

export function QuestionScreen({
  question,
  current,
  onAnswer,
}: {
  question: Question;
  current?: string | undefined;
  onAnswer: (value: string) => void;
}) {
  const [selected, setSelected] = useState<string | undefined>(current);
  const [advancing, setAdvancing] = useState(false);

  const choose = (value: string) => {
    if (advancing) return;
    setSelected(value);
    setAdvancing(true);
    window.setTimeout(() => onAnswer(value), 260);
  };

  return (
    <Fade key={question.key} className="mx-auto flex min-h-[calc(100svh-7.5rem)] w-full max-w-[560px] flex-col justify-center py-3">
      {question.eyebrow && <Eyebrow>{question.eyebrow}</Eyebrow>}
      <H className="mb-6 normal-case">{question.title}</H>

      {question.layout === "cards" ? (
        <div className="grid grid-cols-2 gap-3">
          {question.options.map((o) => (
            <button
              key={o.value}
              type="button"
              onClick={() => choose(o.value)}
              className={cn(
                "group overflow-hidden rounded-[1.35rem] border bg-card text-left shadow-card transition duration-200 active:scale-[0.98]",
                selected === o.value
                  ? "border-primary ring-4 ring-primary/10"
                  : "border-border hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-soft",
              )}
            >
              {o.image && (
                <img
                  src={o.image}
                  alt={o.label}
                  loading="lazy"
                  className="h-32 w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                />
              )}
              <span className="block px-4 py-3 text-[0.9rem] font-extrabold">{o.label}</span>
            </button>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {question.options.map((o) => (
            <button
              key={o.value}
              type="button"
              onClick={() => choose(o.value)}
              className={cn(
                "group flex min-h-[70px] w-full items-center gap-3 rounded-[1.25rem] border bg-card px-3.5 py-3.5 text-left shadow-card transition duration-200 active:scale-[0.99]",
                selected === o.value
                  ? "border-primary bg-secondary/50 ring-4 ring-primary/10"
                  : "border-border hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-soft",
              )}
            >
              {o.image ? (
                <img
                  src={o.image}
                  alt=""
                  aria-hidden="true"
                  className="h-12 w-12 shrink-0 rounded-xl bg-secondary object-cover"
                />
              ) : o.emoji ? (
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-secondary text-[1.45rem]">
                  {o.emoji}
                </span>
              ) : (
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-secondary text-primary">
                  ♥
                </span>
              )}

              <span className="min-w-0 flex-1 text-[0.94rem] font-bold leading-snug">
                {o.label}
              </span>

              <span className="shrink-0 text-xl text-primary/45 transition group-hover:translate-x-0.5">
                ›
              </span>
            </button>
          ))}
        </div>
      )}

      <p className="mt-5 text-center text-[0.72rem] font-medium text-muted-foreground/80">
        Toque em uma resposta para continuar
      </p>
    </Fade>
  );
}
