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

  const choose = (value: string) => {
    if (selected) return;
    setSelected(value);
    window.setTimeout(() => onAnswer(value), 300);
  };

  return (
    <Fade key={question.key}>
      {question.eyebrow && <Eyebrow>{question.eyebrow}</Eyebrow>}
      <H className="mb-6 normal-case tracking-[-0.01em]">{question.title}</H>

      {question.layout === "cards" ? (
        <div className="grid grid-cols-2 gap-3">
          {question.options.map((o) => (
            <button
              key={o.value}
              type="button"
              onClick={() => choose(o.value)}
              className={cn(
                "overflow-hidden rounded-3xl border bg-card text-left shadow-card transition-all active:scale-[0.98]",
                selected === o.value
                  ? "border-primary ring-2 ring-primary/40"
                  : "border-border hover:border-primary/50",
              )}
            >
              {o.image && (
                <img
                  src={o.image}
                  alt={o.label}
                  loading="lazy"
                  className="h-28 w-full object-cover"
                />
              )}
              <span className="block px-4 py-3 text-[0.9rem] font-bold">{o.label}</span>
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
                "flex w-full items-center gap-3 rounded-2xl border bg-card px-5 py-4 text-left shadow-card transition-all active:scale-[0.99]",
                selected === o.value
                  ? "border-primary bg-secondary ring-2 ring-primary/40"
                  : "border-border hover:border-primary/50",
              )}
            >
              {o.emoji && <span className="shrink-0 text-xl">{o.emoji}</span>}
              <span className="min-w-0 text-[0.95rem] font-semibold leading-snug">{o.label}</span>
            </button>
          ))}
        </div>
      )}

      <p className="mt-6 text-center text-[0.75rem] text-muted-foreground">
        Suas respostas ficam salvas — você pode voltar quando quiser.
      </p>
    </Fade>
  );
}
