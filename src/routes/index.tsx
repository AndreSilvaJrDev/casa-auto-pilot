import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { QuestionScreen } from "@/components/funnel/QuestionScreen";
import {
  AnalysisScreen,
  AppRevealScreen,
  CargaMentalScreen,
  CicloScreen,
  DeliverablesScreen,
  EditorialScreen,
  HeroScreen,
  OfferScreen,
  PesoPazScreen,
  ResultScreen,
  ThirtyDaysScreen,
  TransformationScreen,
  VerdadeScreen,
} from "@/components/funnel/screens";
import { Shell } from "@/components/funnel/ui";
import { questions, type Answers } from "@/lib/funnel";
import { captureTrackingParams, track } from "@/lib/tracking";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Casa no Automático | Tenha sua casa sempre em ordem" },
      {
        name: "description",
        content:
          "Descubra em 2 minutos a rotina de casa que cabe no seu dia. Casa sempre em ordem sem passar o dia inteiro limpando.",
      },
      { property: "og:title", content: "Casa no Automático | Tenha sua casa sempre em ordem" },
      {
        property: "og:description",
        content:
          "Responda 9 perguntas rápidas e receba a rotina certa para a sua casa e o seu tempo.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Funnel,
});

type Step =
  | { kind: "hero" }
  | { kind: "question"; key: string }
  | { kind: "screen"; id: string };

const steps: Step[] = [
  { kind: "hero" },
  { kind: "question", key: "house_feeling" },
  { kind: "question", key: "main_pain" },
  { kind: "question", key: "household" },
  { kind: "question", key: "mental_load" },
  { kind: "question", key: "phrase" },
  { kind: "screen", id: "ciclo" },
  { kind: "screen", id: "editorial" },
  { kind: "screen", id: "cargamental" },
  { kind: "screen", id: "verdade" },
  { kind: "question", key: "organization_block" },
  { kind: "question", key: "available_time" },
  { kind: "question", key: "priority_room" },
  { kind: "screen", id: "thirty" },
  { kind: "question", key: "desired_result" },
  { kind: "screen", id: "pesopaz" },
  { kind: "question", key: "commitment" },
  { kind: "screen", id: "analysis" },
  { kind: "screen", id: "result" },
  { kind: "screen", id: "app" },
  { kind: "screen", id: "deliverables" },
  { kind: "screen", id: "transformation" },
  { kind: "screen", id: "offer" },
];

const TOTAL_QUESTIONS = steps.filter((s) => s.kind === "question").length;
const STORAGE_KEY = "cna_funnel_state";

function Funnel() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [ready, setReady] = useState(false);
  const milestones = useRef<Set<number>>(new Set());

  useEffect(() => {
    captureTrackingParams();
    track("PageView", {}, true);
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { index?: number; answers?: Answers };
        if (parsed.answers) setAnswers(parsed.answers);
        if (typeof parsed.index === "number") {
          // nunca restaura direto na tela de análise
          const saved = steps[parsed.index];
          const restored =
            saved && saved.kind === "screen" && saved.id === "analysis"
              ? parsed.index + 1
              : parsed.index;

          setIndex(Math.min(Math.max(restored, 0), steps.length - 1));
        }
      }
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ index, answers }));
    } catch {
      /* ignore */
    }
  }, [index, answers, ready]);

  // O progresso acompanha o funil inteiro, inclusive as telas persuasivas.
  const resultIndex = steps.findIndex(
    (s) => s.kind === "screen" && s.id === "result",
  );
  const progress =
    resultIndex > 0
      ? Math.min(100, Math.max(4, (index / resultIndex) * 100))
      : 0;

  const go = (next: number) => {
    setIndex(Math.min(next, steps.length - 1));
    window.scrollTo({ top: 0 });
  };

  const start = () => {
    track("quiz_started");
    go(1);
  };

  const answer = (key: string, value: string) => {
    const nextAnswers = { ...answers, [key]: value };
    setAnswers(nextAnswers);
    track("question_answered", { question: key, answer: value });

    const count = Object.keys(nextAnswers).filter((k) => k in questions).length;
    const pct = (count / TOTAL_QUESTIONS) * 100;
    for (const m of [25, 50, 75]) {
      if (pct >= m && !milestones.current.has(m)) {
        milestones.current.add(m);
        track(`quiz_${m}`);
      }
    }
    if (count >= TOTAL_QUESTIONS) track("quiz_completed", {}, true);
    go(index + 1);
  };

  const step = steps[index] ?? steps[0]!;
  const showProgress = index > 0 && !(step.kind === "screen" && step.id === "offer");
  const onBack = index > 0 && !(step.kind === "screen" && (step.id === "analysis" || step.id === "offer"))
    ? () => go(index - 1)
    : undefined;

  if (!ready) return <div className="min-h-screen bg-background" />;

  return (
    <Shell
      {...(showProgress ? { progress } : {})}
      onBack={onBack}
      wide={step.kind === "screen" && step.id === "offer"}
    >
      {step.kind === "hero" && <HeroScreen onStart={start} />}
      {step.kind === "question" && questions[step.key] && (
        <QuestionScreen
          key={step.key}
          question={questions[step.key]!}
          current={answers[step.key]}
          onAnswer={(value) => answer(step.key, value)}
        />
      )}
      {step.kind === "screen" && step.id === "ciclo" && (
        <CicloScreen answers={answers} onNext={() => go(index + 1)} />
      )}
      {step.kind === "screen" && step.id === "editorial" && (
        <EditorialScreen onNext={() => go(index + 1)} />
      )}
      {step.kind === "screen" && step.id === "cargamental" && (
        <CargaMentalScreen onNext={() => go(index + 1)} />
      )}
      {step.kind === "screen" && step.id === "verdade" && (
        <VerdadeScreen onNext={() => go(index + 1)} />
      )}
      {step.kind === "screen" && step.id === "thirty" && (
        <ThirtyDaysScreen answers={answers} onNext={() => go(index + 1)} />
      )}
      {step.kind === "screen" && step.id === "pesopaz" && <PesoPazScreen onNext={() => go(index + 1)} />}
      {step.kind === "screen" && step.id === "analysis" && <AnalysisScreen onDone={() => go(index + 1)} />}
      {step.kind === "screen" && step.id === "result" && (
        <ResultScreen answers={answers} onNext={() => go(index + 1)} />
      )}
      {step.kind === "screen" && step.id === "app" && (
        <AppRevealScreen answers={answers} onNext={() => go(index + 1)} />
      )}
      {step.kind === "screen" && step.id === "deliverables" && (
        <DeliverablesScreen onNext={() => go(index + 1)} />
      )}
      {step.kind === "screen" && step.id === "transformation" && (
        <TransformationScreen onNext={() => go(index + 1)} />
      )}
      {step.kind === "screen" && step.id === "offer" && <OfferScreen answers={answers} />}
    </Shell>
  );
}
