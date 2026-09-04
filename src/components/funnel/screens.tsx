import { useEffect, useState } from "react";
import {
  CHECKOUT_URL,
  PRICE_LABEL,
  calculateDiagnosis,
  pickProfile,
  pressureLevel,
  roomLabel,
  timeLabel,
  type Answers,
} from "@/lib/funnel";
import { track, withTrackingParams } from "@/lib/tracking";
import { Card, Cta, Eyebrow, Fade, H, P, Photo, Screen, Trust } from "./ui";

// Assets locais: independentes das URLs internas do Lovable.
const caosAsset = "/quiz/01_casa_caotica.png";
const ordemAsset = "/quiz/02_casa_organizada.png";
const sobrecargaAsset = "/quiz/03_mulher_sobrecarregada.png";
const pesoPazAsset = "/quiz/04_peso_vs_paz.png";
const cozinhaAsset = "/quiz/05_prova_visual_cozinha.png";
const pisoAsset = "/quiz/06_prova_visual_piso.png";
const casaAsset = "/quiz/07_prova_visual_casa.png";
const appAsset = "/quiz/app_mockup.png";

/* ---------------- 1. HERO ---------------- */

export function HeroScreen({ onStart }: { onStart: () => void }) {
  return (
    <Fade className="flex min-h-[calc(100svh-2.5rem)] flex-col justify-center py-4">
      <p className="eyebrow text-center">Casa no Automático</p>
      <h1 className="headline mt-3 text-center text-[2rem] leading-[1.02] sm:text-[2.4rem]">
        Tenha sua casa
        <br />
        <span className="text-cta">sempre em ordem</span>
      </h1>
      <p className="mt-3 text-center text-[1.05rem] font-bold leading-snug">
        Sem passar o dia inteiro limpando
      </p>
      <div className="relative mt-5 overflow-hidden rounded-[2rem] shadow-soft">
        <img
          src={ordemAsset}
          alt="Casa organizada e acolhedora"
          loading="eager"
          className="h-[30svh] max-h-[260px] w-full object-cover"
        />
      </div>
      <p className="mx-auto mt-4 max-w-[22rem] text-center text-[0.85rem] leading-relaxed text-muted-foreground">
        Descubra em 1 minuto o que trava a rotina da sua casa e veja um plano feito para a sua
        realidade.
      </p>
      <div className="mt-5">
        <Cta onClick={onStart}>Quero minha casa em ordem</Cta>
      </div>
      <Trust />
    </Fade>
  );
}

/* ---------------- 2. QUEBRA — CICLO DO ACÚMULO ---------------- */

export function CicloScreen({ answers, onNext }: { answers: Answers; onNext: () => void }) {
  const d = calculateDiagnosis(answers);
  const blocks = [
    ["Tarefas refeitas", d.accumulation_score, "O mesmo serviço voltando poucos dias depois."],
    ["Rotina sem prioridade", d.priority_score, "Você decide na hora, com a casa já pedindo tudo."],
    ["Acúmulo diário", d.mental_load_score, "Pequenas coisas somando até virar faxina."],
  ] as const;

  return (
    <Screen>
      <Eyebrow>Diagnóstico parcial</Eyebrow>
      <H>
        Não é preguiça.
        <br />
        Você está presa no ciclo do acúmulo.
      </H>
      <Photo src={caosAsset} alt="Casa no sufoco" className="mt-4 aspect-[4/3]" />
      <P className="mt-4">Veja onde sua energia está indo sem você perceber.</P>
      <div className="mt-4 space-y-3">
        {blocks.map(([label, pct, desc]) => (
          <Card key={label}>
            <div className="flex items-baseline justify-between gap-3">
              <p className="min-w-0 text-[0.8rem] font-extrabold uppercase tracking-widest">
                {label}
              </p>
              <span className="shrink-0 text-[1.1rem] font-extrabold text-cta tabular-nums">
                {Math.min(96, pct)}%
              </span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-primary transition-all duration-1000"
                style={{ width: `${Math.min(96, pct)}%` }}
              />
            </div>
            <P className="mt-2 text-[0.85rem]">{desc}</P>
          </Card>
        ))}
      </div>
      <p className="mt-3 text-[0.72rem] text-muted-foreground">
        Índice calculado a partir das suas respostas.
      </p>
      <P className="mt-5">
        Você limpa. Cansa. Pequenas coisas acumulam. E alguns dias depois parece que voltou ao
        começo.
      </P>
      <p className="headline mt-4 text-[1.05rem] leading-[1.15]">
        Quem distribui as tarefas antes que elas acumulem para de precisar recomeçar a casa toda.
      </p>
      <div className="mt-6">
        <Cta onClick={onNext}>Continuar</Cta>
      </div>
    </Screen>
  );
}

/* ---------------- 3. EDITORIAL ---------------- */

export function EditorialScreen({ onNext }: { onNext: () => void }) {
  return (
    <Screen>
      <div className="rounded-3xl border border-border bg-card p-5 shadow-card">
        <p className="eyebrow">Especial Casa & Rotina</p>
        <H className="mt-2">Por que a casa parece não terminar nunca?</H>
        <Photo
          src={sobrecargaAsset}
          alt="Mulher sobrecarregada com a rotina da casa"
          className="mt-4 aspect-[4/3]"
        />
        <div className="mt-4 space-y-3">
          <P>
            Porque a casa não é uma tarefa. São dezenas de pequenas tarefas se renovando todos os
            dias, sem aviso e sem ordem.
          </P>
          <P>
            Enquanto ninguém organiza essa sequência, ela cai inteira na mesma pessoa — sempre em
            cima da hora.
          </P>
          <p className="text-[0.98rem] font-bold leading-relaxed">
            Não termina nunca porque nunca teve um começo definido.
          </p>
        </div>
      </div>
      <div className="mt-6">
        <Cta onClick={onNext}>Isso explica muita coisa</Cta>
      </div>
    </Screen>
  );
}

/* ---------------- 4. CARGA MENTAL ---------------- */

const mentalItems = [
  "Louça",
  "Roupas",
  "Compras",
  "Almoço",
  "Limpeza",
  "O que acabou",
  "O que precisa ser feito",
];

export function CargaMentalScreen({ onNext }: { onNext: () => void }) {
  return (
    <Screen>
      <Eyebrow>O peso que ninguém vê</Eyebrow>
      <H>Cansada de ser a única que precisa pensar na casa?</H>
      <Photo src={sobrecargaAsset} alt="Carga mental da rotina" className="mt-4 aspect-[4/5]" />
      <div className="mt-4 flex flex-wrap gap-2">
        {mentalItems.map((item) => (
          <span
            key={item}
            className="rounded-full border border-border bg-card px-3.5 py-2 text-[0.8rem] font-bold shadow-card"
          >
            {item}
          </span>
        ))}
      </div>
      <P className="mt-5">
        O problema não é apenas <strong className="text-foreground">fazer</strong>. É lembrar,
        decidir e organizar tudo antes de fazer.
      </P>
      <div className="mt-6">
        <Cta onClick={onNext}>Por isso eu canso tanto</Cta>
      </div>
    </Screen>
  );
}

/* ---------------- 5. VERDADE ---------------- */

export function VerdadeScreen({ onNext }: { onNext: () => void }) {
  return (
    <Screen className="flex min-h-[calc(100svh-6rem)] flex-col justify-center">
      <Eyebrow>A verdade que muda tudo</Eyebrow>
      <h2 className="headline text-[1.9rem] leading-[1.05] sm:text-[2.2rem]">
        A casa não está contra você.
        <br />
        <span className="text-cta">Você só nunca teve um sistema.</span>
      </h2>
      <div className="mt-5 space-y-3">
        <P>Você aprendeu no improviso.</P>
        <P>Faz o que parece urgente. Resolve o que está na frente. E amanhã começa novamente.</P>
        <p className="text-[1rem] font-bold leading-relaxed">
          Com uma rotina pronta, você para de decidir e começa apenas a executar.
        </p>
      </div>
      <div className="mt-7">
        <Cta onClick={onNext}>Faz todo sentido</Cta>
      </div>
    </Screen>
  );
}

/* ---------------- 6. 30 DIAS ---------------- */

const thirtyCards = [
  ["🏡", "A casa para de depender de grandes faxinas", "Pequenas tarefas entram na rotina antes de tudo acumular."],
  ["🍽️", "A cozinha para de ocupar sua cabeça", "Compras e refeições ficam planejadas."],
  ["🕊️", "Sobra mais tempo para você", "Você deixa de gastar energia pensando no que fazer a toda hora."],
] as const;

export function ThirtyDaysScreen({ answers, onNext }: { answers: Answers; onNext: () => void }) {
  return (
    <Screen>
      <Eyebrow>Imagine daqui a 30 dias</Eyebrow>
      <H>Como seria sua vida se...</H>
      <div className="mt-5 space-y-3">
        {thirtyCards.map(([icon, title, desc]) => (
          <Card key={title} className="bg-card">
            <span className="text-[1.6rem]">{icon}</span>
            <p className="headline mt-2 text-[1.05rem] leading-[1.15]">{title}</p>
            <P className="mt-2 text-[0.88rem]">{desc}</P>
          </Card>
        ))}
      </div>
      <P className="mt-4 text-[0.88rem]">
        Começando por {roomLabel(answers).toLowerCase()}, em {timeLabel(answers).toLowerCase()}.
      </P>
      <div className="mt-6">
        <Cta onClick={onNext}>Eu quero essa vida</Cta>
      </div>
    </Screen>
  );
}

/* ---------------- 7. PESO x PAZ ---------------- */

export function PesoPazScreen({ onNext }: { onNext: () => void }) {
  const [side, setSide] = useState<"sem" | "com" | null>(null);
  return (
    <Screen>
      <Eyebrow>Escolha um lado</Eyebrow>
      <H>De que lado você quer estar?</H>
      <P className="mt-3">Toque no lado que você quer para sua vida.</P>
      <Photo src={pesoPazAsset} alt="Peso x paz" className="mt-4 aspect-[4/3]" />
      <div className="mt-4 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => setSide("sem")}
          className={
            "rounded-3xl border bg-surface p-4 text-left transition-all " +
            (side === "sem" ? "border-border opacity-100" : "border-border opacity-80")
          }
        >
          <p className="text-[0.7rem] font-extrabold uppercase tracking-widest text-muted-foreground">
            Você sem um sistema
          </p>
          <ul className="mt-3 space-y-2 text-[0.85rem] font-medium text-muted-foreground">
            <li>✕ Cansada</li>
            <li>✕ Bagunça que volta</li>
            <li>✕ Vergonha de visita</li>
            <li>✕ Tudo depende da memória</li>
          </ul>
        </button>
        <button
          type="button"
          onClick={() => setSide("com")}
          className={
            "rounded-3xl border-2 bg-card p-4 text-left shadow-soft transition-all " +
            (side === "com" ? "border-cta ring-4 ring-secondary" : "border-primary/50")
          }
        >
          <p className="text-[0.7rem] font-extrabold uppercase tracking-widest text-cta">
            Você com Casa no Automático
          </p>
          <ul className="mt-3 space-y-2 text-[0.85rem] font-bold">
            <li>✓ Rotina pronta</li>
            <li>✓ Casa mais previsível</li>
            <li>✓ Orgulho de receber pessoas</li>
            <li>✓ Mais controle e paz</li>
          </ul>
        </button>
      </div>
      <div className="mt-6">
        <Cta onClick={onNext}>{side === "sem" ? "Continuar" : "Quero o lado da paz"}</Cta>
      </div>
    </Screen>
  );
}

/* ---------------- 8. ANÁLISE ---------------- */

const analysisSteps = [
  [0, "Analisando sua rotina..."],
  [18, "Analisando sua rotina..."],
  [36, "Identificando seu maior ponto de acúmulo..."],
  [52, "Calculando seu tempo disponível..."],
  [71, "Definindo sua prioridade..."],
  [89, "Montando sua recomendação..."],
  [100, "Pronto."],
] as const;

export function AnalysisScreen({ onDone }: { onDone: () => void }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const timers = analysisSteps.map((_, idx) =>
      window.setTimeout(() => setI(idx), idx * 900),
    );
    const done = window.setTimeout(onDone, 6300);
    return () => {
      timers.forEach(window.clearTimeout);
      window.clearTimeout(done);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [pct, msg] = analysisSteps[i] ?? analysisSteps[0];

  return (
    <Fade className="flex min-h-[80svh] flex-col items-center justify-center text-center">
      <p className="eyebrow">Quase pronto</p>
      <H className="mt-3">Cruzando suas respostas...</H>
      <p className="headline mt-8 text-[3.4rem] leading-none text-cta tabular-nums">{pct}%</p>
      <div className="mt-5 h-2 w-full max-w-[280px] overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full bg-primary transition-all duration-700"
          style={{ width: `${Math.max(4, pct)}%` }}
        />
      </div>
      <P className="mt-5">{msg}</P>
    </Fade>
  );
}

/* ---------------- 9. DIAGNÓSTICO ---------------- */

export function ResultScreen({ answers, onNext }: { answers: Answers; onNext: () => void }) {
  const d = calculateDiagnosis(answers);
  const profile = d.profile;
  const level = d.overload_score;
  useEffect(() => {
    track("diagnosis_viewed", { profile: profile.id }, true);
  }, [profile.id]);

  const rows = [
    ["Seu tempo disponível", d.time],
    ["Seu ponto de maior atenção", d.room],
    ["Seu principal bloqueio", d.block],
    ["Sua estratégia recomendada", d.strategy],
  ] as const;

  return (
    <Screen>
      <Eyebrow>Funciona assim</Eyebrow>
      <H>Seu diagnóstico está pronto</H>
      <Card className="mt-5 border-primary/40 bg-surface">
        <p className="text-[0.7rem] font-extrabold uppercase tracking-widest text-muted-foreground">
          Seu resultado
        </p>
        <p className="headline mt-2 text-[1.5rem] leading-[1.1] text-cta">{profile.name}</p>
        <P className="mt-3">{profile.text}</P>
      </Card>

      <Card className="mt-4">
        <div className="relative mt-2 h-2 rounded-full bg-secondary">
          <div
            className="absolute -top-1.5 h-5 w-5 -translate-x-1/2 rounded-full border-2 border-card bg-cta shadow-cta"
            style={{ left: `${level}%` }}
          />
        </div>
        <div className="mt-4 flex justify-between gap-2 text-[0.62rem] font-extrabold uppercase tracking-widest text-muted-foreground">
          <span>Em ordem</span>
          <span>No sufoco</span>
          <span className="text-cta">Sobrecarregada</span>
        </div>
        <p className="mt-4 text-[0.85rem] font-semibold">
          Nível de sobrecarga: <span className="text-cta">{level}%</span>
        </p>
        <p className="mt-2 text-[0.72rem] text-muted-foreground">
          Índice calculado a partir das suas respostas.
        </p>
      </Card>

      <div className="mt-4 space-y-2">
        {rows.map(([label, value]) => (
          <Card key={label} className="py-4">
            <p className="text-[0.68rem] font-extrabold uppercase tracking-widest text-muted-foreground">
              {label}
            </p>
            <p className="mt-1 text-[0.98rem] font-bold">{value}</p>
          </Card>
        ))}
      </div>

      <Card className="mt-4 border-primary/30 bg-surface">
        <P className="text-[0.92rem]">{d.sentence}</P>
      </Card>

      <p className="headline mt-6 text-[1.05rem]">O que sua rotina precisa:</p>
      <div className="mt-3 space-y-2">
        {[
          "Saber exatamente o que fazer a cada dia",
          "Distribuir tarefas antes de acumular",
          "Tirar decisões da sua cabeça",
          "Ter um plano para quando tudo sair do controle",
        ].map((item) => (
          <Card key={item} className="flex items-center gap-3 py-3.5">
            <span className="shrink-0 text-cta">✓</span>
            <span className="min-w-0 text-[0.9rem] font-semibold">{item}</span>
          </Card>
        ))}
      </div>

      <div className="mt-6">
        <Cta onClick={onNext}>Ver minha solução</Cta>
      </div>
    </Screen>
  );
}

/* ---------------- 10. REVELAÇÃO DO APP ---------------- */

const appFlow = [
  "Você abre.",
  "Vê sua rotina.",
  "Inicia o cronômetro.",
  "Marca como concluído.",
  "E continua sua vida.",
];

export function AppRevealScreen({ answers, onNext }: { answers: Answers; onNext: () => void }) {
  const d = calculateDiagnosis(answers);
  return (
    <Screen>
      <Eyebrow>A sua solução</Eyebrow>
      <h2 className="headline text-[1.7rem] leading-[1.06] sm:text-[2rem]">
        Foi exatamente para isso que criamos o{" "}
        <span className="text-cta">Casa no Automático</span>.
      </h2>
      <P className="mt-3">
        Em vez de carregar a casa inteira na cabeça, você abre o celular e vê apenas o que precisa
        fazer hoje.
      </P>
      <img
        src={appAsset}
        alt="Aplicativo Casa no Automático aberto no celular"
        loading="eager"
        className="mx-auto mt-5 w-full max-w-[420px] rounded-[2rem] object-cover shadow-soft"
      />
      <div className="mt-5 space-y-2">
        {appFlow.map((line) => (
          <div
            key={line}
            className="flex items-center gap-3 rounded-2xl bg-card px-4 py-3.5 text-[0.95rem] font-extrabold uppercase tracking-wide shadow-card"
          >
            <span className="shrink-0 text-cta">✓</span>
            <span className="min-w-0">{line}</span>
          </div>
        ))}
      </div>
      <P className="mt-4 text-[0.88rem]">
        Sua rotina começa por {d.room.toLowerCase()}, em {d.time.toLowerCase()}.
      </P>
      <div className="mt-6">
        <Cta onClick={onNext}>Quero ver tudo que recebo</Cta>
      </div>
    </Screen>
  );
}

/* ---------------- 11. ENTREGÁVEIS ---------------- */

const deliverables = [
  ["App Casa no Automático", "A rotina do dia aberta no seu celular."],
  ["Plano de 30 dias", "A casa saindo do sufoco, dia a dia."],
  ["Rotinas curtas", "Versões de 10, 15, 20 e 30 minutos."],
  ["Checklists prontos", "Nada de decidir tudo na hora."],
  ["Lavanderia", "Para a montanha de roupa nunca mais se formar."],
  ["Reset noturno", "10 minutos que salvam o dia seguinte."],
  ["SOS Casa", "Casa apresentável antes de a visita chegar."],
  ["Compras", "Lista pronta, sem esquecer o essencial."],
  ["Cardápio semanal", "A cozinha fora da sua cabeça."],
  ["Progresso", "Você vê sua evolução em cada ambiente."],
] as const;

export function DeliverablesScreen({ onNext }: { onNext: () => void }) {
  return (
    <Screen>
      <Eyebrow>O que você recebe</Eyebrow>
      <H>Tudo pronto para você usar hoje</H>
      <P className="mt-3">
        Você não recebe só uma lista. Recebe um sistema dentro do celular.
      </P>
      <img
        src={appAsset}
        alt="App Casa no Automático no celular"
        loading="lazy"
        className="mx-auto mt-5 w-full max-w-[380px] rounded-[2rem] object-cover shadow-soft"
      />
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {deliverables.map(([title, desc]) => (
          <Card key={title}>
            <p className="text-[0.95rem] font-extrabold">{title}</p>
            <P className="mt-1 text-[0.86rem]">{desc}</P>
          </Card>
        ))}
      </div>
      <div className="mt-6">
        <Cta onClick={onNext}>Continuar</Cta>
      </div>
    </Screen>
  );
}

/* ---------------- 11b. TRANSFORMAÇÃO VISUAL ---------------- */

export function TransformationScreen({ onNext }: { onNext: () => void }) {
  return (
    <Screen>
      <Eyebrow>Transformação visual</Eyebrow>
      <h2 className="headline text-[1.7rem] leading-[1.06] sm:text-[2rem]">
        De casa no sufoco
        <br />
        <span className="text-cta">para casa em ordem</span>
      </h2>
      <div className="mt-5 space-y-4">
        <Photo src={cozinhaAsset} alt="Cozinha antes e depois" className="aspect-[4/3]" />
        <Photo src={pisoAsset} alt="Piso antes e depois" className="aspect-[4/3]" />
        <Photo src={casaAsset} alt="Casa antes e depois" className="aspect-[4/3]" />
      </div>
      <p className="mt-5 text-[1rem] font-bold leading-relaxed">
        Não é sobre perfeição. É sobre parar de começar tudo do zero.
      </p>
      <div className="mt-6">
        <Cta onClick={onNext}>Eu quero essa sensação na minha casa</Cta>
      </div>
    </Screen>
  );
}

/* ---------------- 12. OFERTA ---------------- */

const faqs = [
  ["Tenho pouco tempo. Serve para mim?", "Sim. Existem rotinas de 10, 15, 20 e 30 minutos por dia."],
  ["Trabalho fora. Funciona?", "Funciona. As rotinas foram pensadas para quem passa pouco tempo em casa."],
  ["Tenho filhos. Dá conta?", "Dá. Em dias corridos você usa a versão curta da rotina."],
  ["Moro sozinha. Vale a pena?", "Vale. As rotinas se adaptam ao tamanho da casa e à sua realidade."],
  ["É mensal?", `Não. São ${PRICE_LABEL} em pagamento único, sem mensalidade.`],
  ["Como recebo o acesso?", "Por e-mail, logo após a confirmação do pagamento."],
  ["Preciso instalar algo?", "Não. Você abre pelo navegador do celular e pode salvar na tela inicial."],
  ["E se eu perder um dia?", "Nada se perde. Você retoma de onde parou, sem começar do zero."],
  ["Como funciona a garantia?", "Você tem 7 dias. Se não sentir a casa mais leve, devolvemos o valor integral."],
] as const;

export function OfferScreen({ answers }: { answers: Answers }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const checkout = () => {
    track("InitiateCheckout", { value: 37, currency: "BRL" });
    track("checkout_clicked");
  };
  useEffect(() => {
    track("offer_viewed", {}, true);
  }, []);
  const href = typeof window === "undefined" ? CHECKOUT_URL : withTrackingParams(CHECKOUT_URL);

  return (
    <Fade className="space-y-12">
      <section>
        <Card className="border-primary/40 bg-surface text-center">
          <Eyebrow>Oferta de hoje</Eyebrow>
          <H>Comece agora sua Casa no Automático</H>
          <p className="headline mt-5 text-[3rem] leading-none text-cta">{PRICE_LABEL}</p>
          <p className="mt-2 text-[0.75rem] font-extrabold uppercase tracking-widest text-muted-foreground">
            Pagamento único • Sem mensalidade
          </p>
          <div className="mt-6">
            <Cta href={href} onClick={checkout}>
              Quero ativar meu acesso agora
            </Cta>
          </div>
          <p className="mt-3 text-[0.78rem] text-muted-foreground">
            Acesso liberado após a confirmação do pagamento. Sua rotina começa por{" "}
            {roomLabel(answers).toLowerCase()}.
          </p>
        </Card>
      </section>

      <section>
        <Card className="text-center">
          <p className="headline text-[1.3rem]">7 dias de garantia</p>
          <P className="mt-3">
            Use por 7 dias. Se você não sentir sua casa mais leve, devolvemos cada centavo.
          </P>
          <div className="mt-5">
            <Cta href={href} onClick={checkout}>
              Quero testar sem risco
            </Cta>
          </div>
        </Card>
      </section>

      <section>
        <Eyebrow>Perguntas frequentes</Eyebrow>
        <H>Ficou alguma dúvida?</H>
        <div className="mt-5 space-y-2">
          {faqs.map(([q, a], i) => (
            <Card key={q} className="p-0">
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="flex w-full items-center gap-3 px-5 py-4 text-left"
                aria-expanded={openFaq === i}
              >
                <span className="min-w-0 flex-1 text-[0.92rem] font-bold">{q}</span>
                <span className="shrink-0 text-cta">{openFaq === i ? "−" : "+"}</span>
              </button>
              {openFaq === i && <P className="px-5 pb-4 text-[0.88rem]">{a}</P>}
            </Card>
          ))}
        </div>
      </section>

      <section className="text-center">
        <Photo src={ordemAsset} alt="Casa em ordem" className="aspect-[4/3]" />
        <H className="mt-6">
          A diferença não é ter uma casa perfeita. É parar de precisar recomeçar do zero.
        </H>
        <p className="mt-4 text-[0.8rem] font-extrabold uppercase tracking-widest text-muted-foreground">
          {PRICE_LABEL} • Pagamento único
        </p>
        <div className="mt-5">
          <Cta href={href} onClick={checkout}>
            Quero minha Casa no Automático
          </Cta>
        </div>
        <p className="mt-3 text-[0.78rem] text-muted-foreground">
          Pagamento único • 7 dias de garantia
        </p>
      </section>
    </Fade>
  );
}
