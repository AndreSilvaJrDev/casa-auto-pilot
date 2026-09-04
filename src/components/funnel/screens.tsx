import { useEffect, useMemo, useState } from "react";
import {
  CHECKOUT_URL,
  PRICE_LABEL,
  calculateDiagnosis,
  roomLabel,
  timeLabel,
  type Answers,
} from "@/lib/funnel";
import { track, withTrackingParams } from "@/lib/tracking";
import { Card, Cta, Eyebrow, Fade, H, P, Photo, Screen, Trust } from "./ui";

const heroWomanAsset = "/quiz/hero-woman.jpg";
const caosAsset = "/quiz/01_casa_caotica.png";
const sobrecargaAsset = "/quiz/03_mulher_sobrecarregada.png";
const pesoPazAsset = "/quiz/04_peso_vs_paz.png";
const cozinhaAsset = "/quiz/05_prova_visual_cozinha.png";
const pisoAsset = "/quiz/06_prova_visual_piso.png";
const casaAsset = "/quiz/07_prova_visual_casa.png";
const appAsset = "/quiz/app_mockup.png";
const newsAsset = "/quiz/news-feature.png";

export function HeroScreen({ onStart }: { onStart: () => void }) {
  const benefits = [
    ["⏱", "Rotinas de 10, 15, 20 ou 30 minutos"],
    ["✓", "Checklists por cômodo"],
    ["🍽", "Planejamento simples de refeições"],
    ["👕", "Lavanderia organizada"],
    ["⌂", "SOS Casa para dias corridos"],
  ] as const;

  return (
    <Fade className="py-2 sm:py-5">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-primary to-cta text-2xl text-white shadow-cta">
            ♡
          </div>
          <div>
            <p className="font-display text-[1.05rem] font-black leading-tight">
              Casa no Automático
            </p>
            <p className="text-[0.74rem] text-muted-foreground">
              Mais organização para a sua vida
            </p>
          </div>
        </div>

        <div className="hidden rounded-2xl border border-primary/15 bg-secondary px-4 py-2.5 text-[0.78rem] font-bold text-foreground sm:block">
          Uma rotina mais leve começa aqui ♥
        </div>
      </div>

      <div className="grid items-center gap-7 lg:grid-cols-[1.08fr_.92fr] lg:gap-10">
        <div>
          <h1 className="font-display text-[2.35rem] font-black uppercase leading-[0.98] tracking-[-0.055em] sm:text-[3.6rem] lg:text-[4.25rem]">
            Tenha sua casa
            <br />
            <span className="text-cta">sempre em ordem</span>
          </h1>

          <p className="mt-3 text-[1.08rem] font-extrabold sm:text-[1.2rem]">
            Sem passar o dia inteiro limpando.
          </p>

          <p className="mt-4 max-w-[34rem] text-[0.95rem] leading-[1.65] text-muted-foreground sm:text-[1.02rem]">
            Descubra em 1 minuto o que está fazendo sua casa voltar à bagunça e veja
            uma rotina recomendada para a sua realidade.
          </p>

          <div className="mt-5 space-y-2.5">
            {benefits.map(([icon, label]) => (
              <div key={label} className="flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-secondary font-black text-cta">
                  {icon}
                </span>
                <span className="text-[0.9rem] font-bold text-foreground">{label}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 max-w-[36rem]">
            <Cta onClick={onStart}>Quero descobrir minha rotina</Cta>
            <Trust />
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-5 -z-10 rounded-[3rem] bg-secondary blur-2xl" />
          <img
            src={heroWomanAsset}
            alt="Mulher usando o celular em uma casa organizada"
            loading="eager"
            className="h-[460px] w-full rounded-[2.2rem] border border-white/80 object-cover object-center shadow-soft sm:h-[560px]"
          />
          <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/70 bg-white/90 p-3.5 shadow-card backdrop-blur">
            <p className="text-[0.75rem] font-black uppercase tracking-[0.09em] text-cta">
              Casa mais leve
            </p>
            <p className="mt-1 text-[0.88rem] font-bold">
              Menos decisões na cabeça. Mais clareza sobre o que fazer hoje.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-3 overflow-hidden rounded-[1.8rem] border border-border bg-card shadow-card">
        {[
          ["⌂", "Mais organização", "para o seu dia"],
          ["♡", "Mais tempo", "para você"],
          ["✧", "Mais paz", "dentro de casa"],
        ].map(([icon, title, desc], i) => (
          <div
            key={title}
            className={"px-3 py-5 text-center " + (i > 0 ? "border-l border-border" : "")}
          >
            <div className="text-[1.35rem] text-cta">{icon}</div>
            <p className="mt-2 text-[0.78rem] font-black sm:text-[0.88rem]">{title}</p>
            <p className="mt-0.5 text-[0.68rem] text-muted-foreground sm:text-[0.76rem]">
              {desc}
            </p>
          </div>
        ))}
      </div>
    </Fade>
  );
}

export function CicloScreen({ answers, onNext }: { answers: Answers; onNext: () => void }) {
  const d = calculateDiagnosis(answers);
  const items = [
    ["Tarefas que voltam", d.accumulation_score],
    ["Decisões na sua cabeça", d.mental_load_score],
    ["Falta de prioridade", d.priority_score],
  ] as const;

  return (
    <Screen>
      <Eyebrow>Diagnóstico parcial</Eyebrow>
      <H>
        Não é preguiça.
        <br />
        <span className="text-cta">É o ciclo do acúmulo.</span>
      </H>

      <Photo src={caosAsset} alt="Casa acumulada" className="mt-5 aspect-[4/3]" />

      <P className="mt-4">
        Você resolve o que está urgente, se cansa e alguns dias depois parece que tudo voltou.
        O problema é que a rotina está reagindo ao acúmulo em vez de impedir que ele aconteça.
      </P>

      <div className="mt-5 space-y-3">
        {items.map(([label, value]) => (
          <Card key={label} className="py-4">
            <div className="flex items-center justify-between gap-4">
              <p className="text-[0.84rem] font-extrabold">{label}</p>
              <span className="font-display text-lg font-black text-cta">{Math.min(value, 96)}%</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary">
              <div className="h-full rounded-full bg-primary" style={{ width: `${Math.min(value, 96)}%` }} />
            </div>
          </Card>
        ))}
      </div>

      <p className="mt-3 text-[0.72rem] text-muted-foreground">
        Índice calculado exclusivamente a partir das respostas deste quiz.
      </p>

      <div className="mt-6">
        <Cta onClick={onNext}>Continuar meu diagnóstico</Cta>
      </div>
    </Screen>
  );
}

export function EditorialScreen({ onNext }: { onNext: () => void }) {
  return (
    <Screen>
      <div className="overflow-hidden rounded-[1.8rem] border border-border bg-card shadow-soft">
        <Photo
          src={sobrecargaAsset}
          alt="Mulher sobrecarregada com a rotina doméstica"
          className="aspect-[16/11] rounded-none border-0 shadow-none"
        />
        <div className="p-5 sm:p-6">
          <Eyebrow>O que quase ninguém percebe</Eyebrow>
          <H>Por que a casa parece não terminar nunca?</H>
          <div className="mt-4 space-y-3">
            <P>
              Porque a casa não é uma tarefa. São dezenas de pequenas tarefas se renovando todos os dias.
            </P>
            <P>
              Quando ninguém organiza a sequência, tudo vira urgente ao mesmo tempo — e a mesma pessoa
              acaba carregando a execução e a decisão.
            </P>
            <p className="text-[0.98rem] font-extrabold leading-relaxed">
              A sensação de “nunca termina” nasce quando você precisa decidir tudo de novo todos os dias.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <Cta onClick={onNext}>Isso explica muita coisa</Cta>
      </div>
    </Screen>
  );
}

const mentalItems = [
  ["🍽️", "Louça"],
  ["👕", "Roupas"],
  ["🛒", "Compras"],
  ["🍳", "Almoço"],
  ["🧹", "Limpeza"],
  ["🧠", "O que falta"],
  ["📋", "O que vem depois"],
] as const;

export function CargaMentalScreen({ onNext }: { onNext: () => void }) {
  return (
    <Screen className="flex min-h-[calc(100svh-7rem)] flex-col justify-center">
      <Eyebrow>O peso que ninguém vê</Eyebrow>
      <H>
        O cansaço não vem só de fazer.
        <br />
        <span className="text-cta">Vem de precisar pensar em tudo.</span>
      </H>

      <div className="mt-5 grid grid-cols-2 gap-3">
        {mentalItems.map(([icon, label]) => (
          <Card key={label} className="flex items-center gap-3 py-4">
            <span className="text-[1.35rem]">{icon}</span>
            <span className="text-[0.86rem] font-extrabold">{label}</span>
          </Card>
        ))}
      </div>

      <Card className="mt-4 border-primary/20 bg-secondary/55">
        <P className="text-[0.93rem]">
          Quando uma rotina já está pronta, você deixa de gastar energia escolhendo o próximo passo.
        </P>
      </Card>

      <div className="mt-6">
        <Cta onClick={onNext}>É exatamente isso</Cta>
      </div>
    </Screen>
  );
}

export function VerdadeScreen({ onNext }: { onNext: () => void }) {
  return (
    <Screen className="flex min-h-[calc(100svh-7rem)] flex-col justify-center">
      <Eyebrow>A virada de chave</Eyebrow>
      <H className="text-[1.9rem] sm:text-[2.25rem]">
        A casa não está contra você.
        <br />
        <span className="text-cta">Você só está tentando administrá-la no improviso.</span>
      </H>

      <div className="mt-5 space-y-3">
        <P>Você vê o que está pior, corre para resolver e depois parte para a próxima urgência.</P>
        <P>
          Um sistema simples muda a lógica: primeiro você sabe o que importa; depois executa sem
          negociar com a própria cabeça.
        </P>
      </div>

      <Card className="mt-5 border-primary/20 bg-secondary/55 text-center">
        <p className="font-display text-[1.05rem] font-black">
          Menos improviso. Menos acúmulo. Mais previsibilidade.
        </p>
      </Card>

      <div className="mt-6">
        <Cta onClick={onNext}>Quero descobrir minha rotina</Cta>
      </div>
    </Screen>
  );
}

export function ThirtyDaysScreen({ answers, onNext }: { answers: Answers; onNext: () => void }) {
  const cards = [
    ["🏡", "A casa deixa de depender da faxina pesada", "Pequenas tarefas entram antes de tudo acumular."],
    ["🍽️", "A cozinha para de comandar seu dia", "Compras e refeições deixam de nascer no improviso."],
    ["🕊️", "Você recupera espaço mental", "Menos tempo lembrando, decidindo e recomeçando."],
  ] as const;

  return (
    <Screen>
      <Eyebrow>Imagine daqui a 30 dias</Eyebrow>
      <H>Como seria sentir que a casa está finalmente sob controle?</H>

      <div className="mt-5 space-y-3">
        {cards.map(([icon, title, desc]) => (
          <Card key={title} className="flex gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-secondary text-[1.45rem]">
              {icon}
            </span>
            <div>
              <p className="text-[0.94rem] font-extrabold leading-snug">{title}</p>
              <P className="mt-1 text-[0.84rem]">{desc}</P>
            </div>
          </Card>
        ))}
      </div>

      <Card className="mt-4 border-primary/20 bg-secondary/50">
        <P className="text-[0.88rem]">
          Pela sua resposta, o começo mais realista seria por <strong className="text-foreground">{roomLabel(answers).toLowerCase()}</strong>, com cerca
          de <strong className="text-foreground"> {timeLabel(answers).toLowerCase()}</strong>.
        </P>
      </Card>

      <div className="mt-6">
        <Cta onClick={onNext}>Eu quero essa sensação</Cta>
      </div>
    </Screen>
  );
}

export function PesoPazScreen({ onNext }: { onNext: () => void }) {
  const [side, setSide] = useState<"sem" | "com" | null>(null);

  return (
    <Screen>
      <Eyebrow>Escolha um lado</Eyebrow>
      <H>De que lado você quer estar?</H>
      <P className="mt-3">Toque no lado que representa o que você quer para a sua rotina.</P>

      <Photo src={pesoPazAsset} alt="Peso versus paz" className="mt-4 aspect-[4/3]" />

      <div className="mt-4 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => setSide("sem")}
          className={
            "rounded-[1.35rem] border bg-surface p-4 text-left transition " +
            (side === "sem" ? "border-primary/40 ring-4 ring-primary/5" : "border-border opacity-85")
          }
        >
          <p className="text-[0.66rem] font-black uppercase tracking-[0.08em] text-muted-foreground">
            Sem um sistema
          </p>
          <ul className="mt-3 space-y-2 text-[0.8rem] font-semibold text-muted-foreground">
            <li>✕ Cansada</li>
            <li>✕ Bagunça que volta</li>
            <li>✕ Tudo na memória</li>
            <li>✕ Fim de semana perdido</li>
          </ul>
        </button>

        <button
          type="button"
          onClick={() => setSide("com")}
          className={
            "rounded-[1.35rem] border-2 bg-card p-4 text-left shadow-card transition " +
            (side === "com" ? "border-cta ring-4 ring-secondary" : "border-primary/30")
          }
        >
          <p className="text-[0.66rem] font-black uppercase tracking-[0.08em] text-cta">
            Com Casa no Automático
          </p>
          <ul className="mt-3 space-y-2 text-[0.8rem] font-extrabold">
            <li>✓ Rotina pronta</li>
            <li>✓ Mais previsibilidade</li>
            <li>✓ Menos decisões</li>
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

const analysisSteps = [
  [0, "Analisando sua rotina..."],
  [18, "Mapeando o seu nível de sobrecarga..."],
  [36, "Identificando onde o acúmulo começa..."],
  [52, "Calculando o tempo disponível..."],
  [71, "Definindo sua prioridade..."],
  [89, "Montando sua recomendação..."],
  [100, "Pronto."],
] as const;

export function AnalysisScreen({ onDone }: { onDone: () => void }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const timers = analysisSteps.map((_, idx) => window.setTimeout(() => setI(idx), idx * 780));
    const done = window.setTimeout(onDone, 5600);
    return () => {
      timers.forEach(window.clearTimeout);
      window.clearTimeout(done);
    };
  }, [onDone]);
  const [pct, msg] = analysisSteps[i] ?? analysisSteps[0];

  return (
    <Fade className="flex min-h-[78svh] flex-col items-center justify-center text-center">
      <div className="grid h-16 w-16 place-items-center rounded-full bg-secondary text-2xl text-cta">♡</div>
      <p className="eyebrow mt-5">Quase pronto</p>
      <H className="mt-2">Cruzando suas respostas...</H>
      <p className="font-display mt-7 text-[3.2rem] font-black leading-none text-cta tabular-nums">{pct}%</p>
      <div className="mt-5 h-2 w-full max-w-[300px] overflow-hidden rounded-full bg-secondary">
        <div className="h-full rounded-full bg-primary transition-all duration-700" style={{ width: `${Math.max(4, pct)}%` }} />
      </div>
      <P className="mt-5">{msg}</P>
    </Fade>
  );
}

export function ResultScreen({ answers, onNext }: { answers: Answers; onNext: () => void }) {
  const d = calculateDiagnosis(answers);
  useEffect(() => {
    track("diagnosis_viewed", { profile: d.profile.id }, true);
  }, [d.profile.id]);

  return (
    <Screen>
      <Eyebrow>Seu resultado</Eyebrow>
      <H>Seu diagnóstico está pronto</H>

      <Card className="mt-5 overflow-hidden border-primary/25 bg-gradient-to-br from-secondary to-card">
        <p className="text-[0.68rem] font-black uppercase tracking-[0.12em] text-muted-foreground">Seu perfil</p>
        <p className="font-display mt-2 text-[1.55rem] font-black leading-[1.05] text-cta">{d.profile.name}</p>
        <P className="mt-3">{d.profile.text}</P>
      </Card>

      <div className="mt-4 grid grid-cols-2 gap-3">
        {[
          ["Tempo", d.time],
          ["Prioridade", d.room],
          ["Maior trava", d.block],
          ["Estratégia", d.strategy],
        ].map(([label, value]) => (
          <Card key={label} className="p-4">
            <p className="text-[0.63rem] font-black uppercase tracking-[0.09em] text-muted-foreground">{label}</p>
            <p className="mt-1.5 text-[0.84rem] font-extrabold leading-snug">{value}</p>
          </Card>
        ))}
      </div>

      <Card className="mt-4 border-primary/20 bg-secondary/50">
        <P className="text-[0.9rem]">{d.sentence}</P>
      </Card>

      <div className="mt-5">
        <p className="font-display text-[1.04rem] font-black">O que sua rotina precisa agora:</p>
        <div className="mt-3 space-y-2">
          {[
            "Saber exatamente o que fazer a cada dia",
            "Distribuir tarefas antes que acumulem",
            "Tirar decisões repetitivas da sua cabeça",
            "Ter um plano de emergência para dias caóticos",
          ].map((item) => (
            <div key={item} className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
              <span className="text-cta">✓</span>
              <span className="text-[0.86rem] font-bold">{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <Cta onClick={onNext}>Ver minha solução</Cta>
      </div>
    </Screen>
  );
}

export function AppRevealScreen({ answers, onNext }: { answers: Answers; onNext: () => void }) {
  const d = calculateDiagnosis(answers);
  const appFlow = [
    ["1", "Você abre o app"],
    ["2", "Vê o que precisa fazer hoje"],
    ["3", "Inicia o cronômetro"],
    ["4", "Marca como concluído"],
    ["5", "E continua sua vida"],
  ] as const;

  return (
    <Screen>
      <Eyebrow>A sua solução</Eyebrow>
      <H>
        Pare de carregar a casa inteira na cabeça.
        <br />
        <span className="text-cta">Abra e veja o que fazer hoje.</span>
      </H>

      <img src={appAsset} alt="Aplicativo Casa no Automático" loading="eager" className="mx-auto mt-5 max-h-[620px] w-full rounded-[1.8rem] object-cover shadow-soft" />

      <div className="mt-5 space-y-2">
        {appFlow.map(([n, label]) => (
          <div key={label} className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3.5">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-secondary text-[0.76rem] font-black text-cta">{n}</span>
            <span className="text-[0.9rem] font-extrabold">{label}</span>
          </div>
        ))}
      </div>

      <P className="mt-4 text-[0.88rem]">Sua recomendação começa por {d.room.toLowerCase()}, em {d.time.toLowerCase()}.</P>

      <div className="mt-6">
        <Cta onClick={onNext}>Quero ver tudo que recebo</Cta>
      </div>
    </Screen>
  );
}

export function NewsScreen({ onNext }: { onNext: () => void }) {
  return (
    <Screen>
      <Eyebrow>Especial Casa & Rotina</Eyebrow>
      <H>Pequenas rotinas diárias podem mudar a forma como você cuida da casa.</H>
      <P className="mt-3">
        Quando as tarefas deixam de competir entre si e passam a ter uma ordem simples, fica muito mais fácil evitar que louça, roupas e organização acumulem ao mesmo tempo.
      </P>

      <Photo
        src={newsAsset}
        alt="Peça editorial ilustrativa sobre organização da casa"
        className="mt-5"
      />

      <p className="mt-2 text-center text-[0.68rem] text-muted-foreground">
        Peça editorial ilustrativa — não representa publicação jornalística real.
      </p>

      <Card className="mt-4 border-primary/20 bg-secondary/50">
        <p className="text-[0.94rem] font-extrabold leading-relaxed">
          É essa lógica que o Casa no Automático transforma em prática:
          você abre o celular, vê a prioridade do dia e executa sem precisar decidir tudo de novo.
        </p>
      </Card>

      <div className="mt-6">
        <Cta onClick={onNext}>Ver tudo que eu recebo</Cta>
      </div>
    </Screen>
  );
}

const deliverables = [
  ["Método de Limpeza Inteligente", "Rotina por cômodo que se mantém sozinha"],
  ["Cozinha Sem Stress", "Cardápios e receitas práticas do dia a dia"],
  ["Organização que Dura", "Cada coisa no seu lugar, de verdade"],
  ["Rotina da Casa em 30 Dias", "Um plano simples para seguir sem se perder"],
  ["Lavanderia em Ordem", "Roupa e louça sem nunca mais acumular"],
  ["Economia Doméstica", "Gaste menos no mercado e em produtos"],
  ["Conservação de Alimentos", "Faça a comida durar muito mais"],
  ["Banheiro Sempre Limpo", "Rotina rápida que mantém o brilho"],
  ["Casa Livre de Pragas", "Adeus formiga, mosquito e barata"],
  ["Faxina Rápida de 15 Minutos", "Para quando bate o sufoco e chega visita"],
] as const;

export function DeliverablesScreen({ onNext }: { onNext: () => void }) {
  return (
    <Screen>
      <Eyebrow>O que você vai receber</Eyebrow>
      <H>Tudo para sua casa rodar no automático.</H>
      <P className="mt-3">Uma estrutura mais forte, visualmente mais próxima do que funcionou para você.</P>
      <div className="mt-5 space-y-3">
        {deliverables.map(([title, desc], idx) => (
          <div key={title} className="flex items-center gap-4 rounded-[1.35rem] border border-primary/20 bg-card px-4 py-3.5 shadow-card">
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[#3a0d28] to-[#a42865] text-lg text-white shadow-card">
              {String(idx + 1).padStart(2, "0")}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[0.9rem] font-extrabold leading-snug">{title}</p>
              <p className="mt-0.5 text-[0.78rem] text-muted-foreground">{desc}</p>
            </div>
            <span className="shrink-0 text-[1.35rem] font-black text-[#23c55e]">✓</span>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <Cta onClick={onNext}>Continuar</Cta>
      </div>
    </Screen>
  );
}

export function TransformationScreen({ onNext }: { onNext: () => void }) {
  const photos = [
    [cozinhaAsset, "Cozinha mais leve", "Menos acúmulo visível no ambiente que mais se renova."],
    [pisoAsset, "Sensação de ordem", "Pequenas manutenções antes da sujeira virar mutirão."],
    [casaAsset, "Casa mais previsível", "Você sabe o que precisa de atenção sem olhar tudo de uma vez."],
  ] as const;
  return (
    <Screen>
      <Eyebrow>Transformação visual</Eyebrow>
      <H>
        De casa no sufoco
        <br />
        <span className="text-cta">para casa em ordem</span>
      </H>
      <div className="mt-5 space-y-4">
        {photos.map(([src, title, desc]) => (
          <div key={title} className="overflow-hidden rounded-[1.6rem] border border-border bg-card shadow-card">
            <img src={src} alt={title} className="aspect-[16/10] w-full object-cover" />
            <div className="p-4">
              <p className="text-[0.92rem] font-extrabold">{title}</p>
              <P className="mt-1 text-[0.82rem]">{desc}</P>
            </div>
          </div>
        ))}
      </div>
      <Card className="mt-5 border-primary/20 bg-secondary/50 text-center">
        <p className="font-display text-[1.02rem] font-black">
          Não é sobre casa perfeita.
          <br />
          É sobre parar de recomeçar do zero.
        </p>
      </Card>
      <div className="mt-6">
        <Cta onClick={onNext}>Eu quero essa sensação</Cta>
      </div>
    </Screen>
  );
}

function useUrgencyCountdown(initialMinutes = 13, initialSeconds = 36) {
  const initial = useMemo(() => initialMinutes * 60 + initialSeconds, [initialMinutes, initialSeconds]);
  const [total, setTotal] = useState(initial);
  useEffect(() => {
    const id = window.setInterval(() => {
      setTotal((prev) => (prev <= 1 ? initial : prev - 1));
    }, 1000);
    return () => window.clearInterval(id);
  }, [initial]);
  const min = String(Math.floor(total / 60)).padStart(2, "0");
  const sec = String(total % 60).padStart(2, "0");
  return { min, sec };
}

const bonusItems = [
  ["/quiz/offer-icons/bonus-assistente-receitas.jpg", "Assistente de Receitas com IA", "Bônus 01 · Diz o que tem, ela monta a receita"],
  ["/quiz/offer-icons/bonus-produtos-caseiros.jpg", "Receitas de Produtos Caseiros", "Bônus 02 · Limpa mais gastando menos"],
  ["/quiz/offer-icons/bonus-casa-cheirosa.jpg", "Casa Sempre Cheirosa", "Bônus 03 · Segredos de cheiro de casa limpa"],
  ["/quiz/offer-icons/bonus-visitas-sem-stress.jpg", "Recebendo Visitas Sem Stress", "Bônus 04 · Casa pronta em 30 minutos"],
] as const;

const giftItems = [
  ["/quiz/offer-icons/presente-planner.jpg", "Planner Semanal da Dona de Casa", "Presente 01 · Sua semana toda organizada num lugar só"],
  ["/quiz/offer-icons/presente-lista-compra.jpg", "Lista de Compra Personalizada", "Presente 02 · Nunca mais esqueça nada no mercado"],
  ["/quiz/offer-icons/presente-manchas.jpg", "Manual das Manchas Difíceis", "Presente 03 · Gordura, café, molho, mofo. Tira tudo"],
  ["/quiz/offer-icons/presente-300-receitas.jpg", "300 Receitas Exclusivas", "Presente 04 · Nunca mais fique sem saber o que fazer"],
] as const;

export function OfferScreen({ answers }: { answers: Answers }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const timer = useUrgencyCountdown();
  useEffect(() => {
    track("offer_viewed", {}, true);
  }, []);
  const checkout = () => {
    track("InitiateCheckout", { value: 37, currency: "BRL" });
    track("checkout_clicked");
  };
  const href = typeof window === "undefined" ? CHECKOUT_URL : withTrackingParams(CHECKOUT_URL);

  const faqs = [
    ["Tenho pouco tempo. Serve para mim?", "Sim. Existem rotinas de 10, 15, 20 e 30 minutos."],
    ["Trabalho fora. Funciona?", "Sim. A lógica é adaptar a manutenção ao tempo que realmente existe."],
    ["Tenho filhos. Dá conta?", "O plano ajuda a organizar a manutenção para a casa não cobrar tudo de uma vez."],
    ["Moro sozinha. Vale a pena?", "Sim. Você usa a mesma lógica com uma rotina mais enxuta."],
    ["É mensal?", `Não. O acesso custa ${PRICE_LABEL} em pagamento único.`],
    ["Como recebo o acesso?", "O acesso é enviado após a confirmação do pagamento."],
    ["Tem garantia?", "Você tem 7 dias para avaliar o produto conforme as regras da oferta."],
  ] as const;

  const valueTable = [
    ["Método completo (10 módulos)", "R$297"],
    ["Assistente de Receitas com IA", "R$97"],
    ["Receitas de Produtos Caseiros", "R$47"],
    ["Casa Sempre Cheirosa", "R$37"],
    ["Recebendo Visitas Sem Stress", "R$47"],
  ] as const;

  return (
    <Fade className="mx-auto max-w-[760px] space-y-8 pb-8">
      <section className="text-center">
        <Eyebrow>Oferta de hoje</Eyebrow>
        <H className="mx-auto max-w-[36rem]">Comece agora sua Casa no Automático</H>
        <div className="mx-auto mt-5 max-w-[520px] rounded-[1.8rem] border border-primary/20 bg-card p-5 shadow-soft sm:p-7">
          <p className="text-[0.9rem] text-muted-foreground line-through">De R$227</p>
          <p className="font-display mt-1 text-[3.6rem] font-black leading-none text-[#22c55e]">{PRICE_LABEL}</p>
          <div className="mt-2 inline-flex rounded-full bg-[#e9fff1] px-3 py-1 text-[0.76rem] font-black text-[#22a14c]">
            Pagamento único • Sem mensalidade
          </div>
          <p className="mt-4 text-[0.76rem] font-bold text-[#ef476f]">⚠ Este valor é só para quem termina o quiz agora</p>
        </div>
      </section>

      <section>
        <Eyebrow>Bônus especiais</Eyebrow>
        <div className="mt-4 space-y-3">
          {bonusItems.map(([image, title, desc]) => (
            <div key={title} className="flex items-center gap-4 rounded-[1.35rem] border border-[#f2c56f]/40 bg-card px-4 py-3.5 shadow-card">
              <img
                src={image}
                alt=""
                aria-hidden="true"
                className="h-14 w-14 shrink-0 rounded-2xl object-cover shadow-card"
              />
              <div className="min-w-0 flex-1">
                <p className="text-[0.9rem] font-extrabold leading-snug">{title}</p>
                <p className="mt-0.5 text-[0.78rem] text-muted-foreground">{desc}</p>
              </div>
              <span className="shrink-0 text-[1.35rem] font-black text-[#23c55e]">✓</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <Eyebrow>🎁 Bônus pra quem entrar hoje</Eyebrow>
        <P className="mt-2">Presentes extras que saem da oferta amanhã.</P>
        <div className="mt-4 space-y-3">
          {giftItems.map(([image, title, desc]) => (
            <div key={title} className="flex items-center gap-4 rounded-[1.35rem] border border-[#f2c56f]/65 bg-card px-4 py-3.5 shadow-card">
              <img
                src={image}
                alt=""
                aria-hidden="true"
                className="h-14 w-14 shrink-0 rounded-2xl object-cover shadow-card"
              />
              <div className="min-w-0 flex-1">
                <p className="text-[0.9rem] font-extrabold leading-snug">{title}</p>
                <p className="mt-0.5 text-[0.78rem] text-muted-foreground">{desc}</p>
              </div>
              <span className="shrink-0 text-[1.35rem] font-black text-[#f2b632]">✓</span>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[1.6rem] border border-[#f2c56f]/45 bg-[#fffaf1] p-5 shadow-card">
        <p className="text-[0.82rem] text-muted-foreground">Valor real de tudo:</p>
        <div className="mt-4 space-y-2.5">
          {valueTable.map(([item, price]) => (
            <div key={item} className="flex items-center justify-between gap-3 border-b border-[#efdcb0] pb-2 text-[0.88rem]">
              <span className="font-medium text-foreground">{item}</span>
              <span className="font-bold text-muted-foreground line-through">{price}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="font-display text-[1.05rem] font-black">Valor real de tudo:</span>
          <span className="font-display text-[2rem] font-black text-[#f2b632]">R$227</span>
        </div>
      </section>

      <section className="text-center">
        <Eyebrow>Essa oferta expira em:</Eyebrow>
        <div className="mt-4 flex items-center justify-center gap-2">
          {[timer.min, timer.sec].map((part, idx) => (
            <div key={idx} className="grid h-20 w-20 place-items-center rounded-2xl border border-primary/25 bg-card shadow-card">
              <span className="font-display text-[2.25rem] font-black text-primary">{part}</span>
            </div>
          ))}
        </div>
        <div className="mt-1 flex items-center justify-center gap-10 text-[0.68rem] font-bold uppercase tracking-[0.08em] text-muted-foreground">
          <span>Min</span><span>Seg</span>
        </div>
      </section>

      <section className="rounded-[1.6rem] border border-[#8ad7aa] bg-[#f7fff9] p-5 shadow-card">
        <div className="flex items-start gap-4">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white text-2xl shadow-card">🛡️</div>
          <div>
            <p className="text-[1rem] font-black text-[#22a14c]">Garantia incondicional de 7 dias</p>
            <P className="mt-1 text-[0.88rem]">
              Testa sem risco. Se não for pra você, devolvemos conforme as regras da oferta.
            </P>
          </div>
        </div>
      </section>

      <section className="rounded-[1.8rem] border border-primary/20 bg-gradient-to-b from-secondary to-card p-5 text-center shadow-soft sm:p-7">
        <p className="text-[0.72rem] font-black uppercase tracking-[0.12em] text-primary">Acesso imediato</p>
        <h3 className="font-display mt-3 text-[2rem] font-black leading-[1.02] sm:text-[2.6rem]">
          Quero meu acesso agora
        </h3>
        <P className="mx-auto mt-3 max-w-[33rem]">
          Sua recomendação começa por {roomLabel(answers).toLowerCase()}. Quanto antes você começar, antes a casa para de voltar ao zero.
        </P>
        <div className="mx-auto mt-6 max-w-[480px]">
          <Cta href={href} onClick={checkout}>Quero meu acesso agora</Cta>
        </div>
        <p className="mt-4 text-[0.8rem] text-muted-foreground">Pagamento único • Sem mensalidade</p>
      </section>

      <section>
        <Eyebrow>Perguntas frequentes</Eyebrow>
        <H>Antes de começar</H>
        <div className="mt-5 space-y-2">
          {faqs.map(([q, a], i) => (
            <Card key={q} className="p-0">
              <button type="button" onClick={() => setOpenFaq(openFaq === i ? null : i)} className="flex w-full items-center gap-3 px-5 py-4 text-left" aria-expanded={openFaq === i}>
                <span className="min-w-0 flex-1 text-[0.9rem] font-extrabold">{q}</span>
                <span className="shrink-0 text-xl text-cta">{openFaq === i ? "−" : "+"}</span>
              </button>
              {openFaq === i && <P className="px-5 pb-4 text-[0.86rem]">{a}</P>}
            </Card>
          ))}
        </div>
      </section>
    </Fade>
  );
}
