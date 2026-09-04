import { useEffect, useState } from "react";
import {
  CHECKOUT_URL,
  PRICE_LABEL,
  computeScores,
  pickProfile,
  pressureLevel,
  roomLabel,
  timeLabel,
  type Answers,
} from "@/lib/funnel";
import { track, withTrackingParams } from "@/lib/tracking";
import { Bar, Card, Cta, Eyebrow, Fade, H, P, Photo } from "./ui";

import heroAsset from "@/assets/hero_lp.png.asset.json";
import caosAsset from "@/assets/01_casa_caotica.png.asset.json";
import ordemAsset from "@/assets/02_casa_organizada.png.asset.json";
import sobrecargaAsset from "@/assets/03_mulher_sobrecarregada.png.asset.json";
import pesoPazAsset from "@/assets/04_peso_vs_paz.png.asset.json";
import cozinhaAsset from "@/assets/05_prova_visual_cozinha.png.asset.json";
import pisoAsset from "@/assets/06_prova_visual_piso.png.asset.json";
import casaAsset from "@/assets/07_prova_visual_casa.png.asset.json";
import appAsset from "@/assets/app_mockup.png.asset.json";

export function HeroScreen({ onStart }: { onStart: () => void }) {
  return (
    <Fade>
      <Eyebrow>Casa no Automático</Eyebrow>
      <h1 className="headline text-[2.05rem] leading-[1.02] sm:text-[2.4rem]">
        Tenha sua casa <span className="text-primary">sempre em ordem</span>
      </h1>
      <P className="mt-4 text-[1.02rem]">
        Sem passar o dia inteiro limpando. Responda 9 perguntas rápidas e descubra a rotina que cabe
        na sua vida real.
      </P>
      <Photo src={heroAsset.url} alt="Casa organizada e acolhedora" className="mt-6 aspect-[4/5]" eager />
      <div className="mt-6">
        <Cta onClick={onStart}>Quero descobrir minha rotina</Cta>
      </div>
      <p className="mt-3 text-center text-[0.78rem] text-muted-foreground">
        Menos de 2 minutos • 100% anônimo
      </p>
    </Fade>
  );
}

export function BeliefScreen({ onNext }: { onNext: () => void }) {
  const cycle = [
    "Pequenas tarefas ficam para depois",
    "O acúmulo aparece em todo canto",
    "Vem a faxina pesada do fim de semana",
    "O cansaço faz tudo começar de novo",
  ];
  return (
    <Fade>
      <Eyebrow>A verdade que ninguém te contou</Eyebrow>
      <H>Não é falta de esforço. É o ciclo.</H>
      <Photo src={caosAsset.url} alt="Casa desorganizada" className="mt-5 aspect-[4/3]" />
      <P className="mt-5">
        Sua casa não fica bagunçada porque você é preguiçosa. Ela fica bagunçada porque você está
        presa em um ciclo que se repete toda semana:
      </P>
      <div className="mt-5 space-y-2">
        {cycle.map((step, i) => (
          <Card key={step} className="flex items-center gap-3 py-4">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-secondary text-[0.8rem] font-extrabold text-primary">
              {i + 1}
            </span>
            <span className="min-w-0 text-[0.92rem] font-semibold">{step}</span>
          </Card>
        ))}
      </div>
      <p className="mt-4 text-center text-[0.9rem] font-bold">
        Enquanto o ciclo continua, nenhuma faxina resolve.
      </p>
      <div className="mt-6">
        <Cta onClick={onNext}>Continuar</Cta>
      </div>
    </Fade>
  );
}

export function PartialDiagnosis({ answers, onNext }: { answers: Answers; onNext: () => void }) {
  const s = computeScores(answers);
  return (
    <Fade>
      <Eyebrow>Diagnóstico parcial</Eyebrow>
      <H>
        {s.signals} de 4 sinais de sobrecarga
        <br />
        já apareceram nas suas respostas
      </H>
      <Card className="mt-6">
        <Bar label="Acúmulo de tarefas" value={s.acumulo} />
        <Bar label="Carga mental" value={s.cargaMental} />
        <Bar label="Falta de clareza" value={s.clareza} invert />
        <Bar label="Tempo e energia" value={s.tempo} invert />
      </Card>
      <P className="mt-5">
        Isso não é sobre limpar mais. É sobre a ordem em que as coisas acontecem no seu dia.
      </P>
      <div className="mt-6">
        <Cta onClick={onNext}>Quero entender o motivo</Cta>
      </div>
    </Fade>
  );
}

export function EditorialScreen({ onNext }: { onNext: () => void }) {
  return (
    <Fade>
      <Eyebrow>Leia com calma</Eyebrow>
      <H>Por que a sensação de que “a casa nunca termina” é tão pesada</H>
      <Photo src={sobrecargaAsset.url} alt="Mulher sobrecarregada" className="mt-5 aspect-[4/5]" />
      <div className="mt-5 space-y-4">
        <P>
          Porque não é só o serviço. É a lista invisível que você carrega na cabeça o tempo inteiro:
          a roupa na máquina, o almoço de amanhã, a louça, o banheiro, o que ainda falta.
        </P>
        <P>
          Você termina o dia exausta e ainda sente que não fez nada. Não porque fez pouco — mas
          porque decidiu demais.
        </P>
        <P className="font-bold text-foreground">
          Cansaço de casa não vem do trabalho físico. Vem de nunca poder desligar.
        </P>
      </div>
      <div className="mt-6">
        <Cta onClick={onNext}>Continuar</Cta>
      </div>
    </Fade>
  );
}

export function PesoPazScreen({ onNext }: { onNext: () => void }) {
  return (
    <Fade>
      <Eyebrow>Duas rotinas possíveis</Eyebrow>
      <H>Peso x Paz</H>
      <Photo src={pesoPazAsset.url} alt="Comparação entre peso e paz" className="mt-5 aspect-[4/3]" />
      <div className="mt-5 grid gap-3">
        <Card className="bg-surface">
          <p className="mb-2 text-[0.72rem] font-extrabold uppercase tracking-widest text-muted-foreground">
            Rotina com peso
          </p>
          <ul className="space-y-1.5 text-[0.9rem] font-medium">
            <li>Decidir tudo em cima da hora</li>
            <li>Faxina pesada no fim de semana</li>
            <li>Vergonha quando alguém chega</li>
            <li>Cansaço que nunca passa</li>
          </ul>
        </Card>
        <Card>
          <p className="mb-2 text-[0.72rem] font-extrabold uppercase tracking-widest text-primary">
            Rotina com paz
          </p>
          <ul className="space-y-1.5 text-[0.9rem] font-semibold">
            <li>Abrir o celular e saber o que fazer hoje</li>
            <li>Tarefas curtas, em vez de dias inteiros</li>
            <li>Casa sempre apresentável</li>
            <li>Cabeça livre no fim do dia</li>
          </ul>
        </Card>
      </div>
      <div className="mt-6">
        <Cta onClick={onNext}>Eu quero a segunda</Cta>
      </div>
    </Fade>
  );
}

export function MechanismScreen({ answers, onNext }: { answers: Answers; onNext: () => void }) {
  const tasks = ["Arrumar a cama", "Reset da cozinha", "Pia do banheiro", "Guardar as roupas"];
  return (
    <Fade>
      <Eyebrow>O mecanismo</Eyebrow>
      <H>Imagine abrir o celular e encontrar apenas isso:</H>
      <Card className="mt-5 border-primary/30 bg-surface">
        <p className="text-[0.72rem] font-extrabold uppercase tracking-widest text-primary">
          Sua rotina de hoje
        </p>
        <p className="headline mt-1 text-[1.4rem]">{timeLabel(answers).replace(" por dia", "")}</p>
        <div className="mt-4 space-y-2">
          {tasks.map((t) => (
            <div
              key={t}
              className="flex items-center gap-3 rounded-2xl bg-card px-4 py-3 text-[0.9rem] font-semibold shadow-card"
            >
              <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 border-primary text-[0.6rem] text-primary">
                ✓
              </span>
              <span className="min-w-0">{t}</span>
            </div>
          ))}
        </div>
      </Card>
      <Photo src={appAsset.url} alt="Aplicativo Casa no Automático no celular" className="mt-5 aspect-[4/5]" />
      <P className="mt-5">
        Sem lista infinita. Sem plano de 40 páginas. Só o que precisa ser feito hoje, no tempo que
        você tem.
      </P>
      <div className="mt-6">
        <Cta onClick={onNext}>Continuar</Cta>
      </div>
    </Fade>
  );
}

export function ThirtyDaysScreen({ answers, onNext }: { answers: Answers; onNext: () => void }) {
  return (
    <Fade>
      <Eyebrow>Em 30 dias</Eyebrow>
      <H>Como sua casa estaria daqui a um mês</H>
      <Photo src={ordemAsset.url} alt="Casa organizada" className="mt-5 aspect-[4/3]" />
      <div className="mt-5 space-y-3">
        {[
          `${roomLabel(answers)} sob controle, sem esforço extra`,
          "Manhãs sem correria e sem discussão",
          "Roupas girando sem virar montanha",
          "Visita chegando sem susto",
          "Fim de semana livre de faxina pesada",
        ].map((item) => (
          <Card key={item} className="flex items-center gap-3 py-3.5">
            <span className="shrink-0 text-primary">✓</span>
            <span className="min-w-0 text-[0.92rem] font-semibold">{item}</span>
          </Card>
        ))}
      </div>
      <div className="mt-6">
        <Cta onClick={onNext}>Quero isso na minha casa</Cta>
      </div>
    </Fade>
  );
}

export function BeforeAfterScreen({ onNext }: { onNext: () => void }) {
  return (
    <Fade>
      <Eyebrow>Prova visual</Eyebrow>
      <H>Antes x Depois</H>
      <P className="mt-3">A diferença não é faxina. É rotina.</P>
      <div className="mt-5 space-y-4">
        <Photo src={cozinhaAsset.url} alt="Cozinha antes e depois" className="aspect-[4/3]" />
        <Photo src={pisoAsset.url} alt="Piso antes e depois" className="aspect-[4/3]" />
        <Photo src={casaAsset.url} alt="Casa antes e depois" className="aspect-[4/3]" />
      </div>
      <div className="mt-6">
        <Cta onClick={onNext}>Continuar</Cta>
      </div>
    </Fade>
  );
}

export function AnalysisScreen({ onDone }: { onDone: () => void }) {
  const steps = [
    "Lendo suas respostas...",
    "Analisando o nível de acúmulo...",
    "Medindo sua carga mental...",
    "Montando sua rotina ideal...",
  ];
  const [i, setI] = useState(0);
  useEffect(() => {
    const timers = steps.map((_, idx) => window.setTimeout(() => setI(idx), idx * 1500));
    const done = window.setTimeout(onDone, 6200);
    return () => {
      timers.forEach(window.clearTimeout);
      window.clearTimeout(done);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fade className="flex min-h-[70vh] flex-col items-center justify-center text-center">
      <div className="h-14 w-14 animate-spin rounded-full border-4 border-secondary border-t-primary" />
      <H className="mt-8">Cruzando suas respostas...</H>
      <P className="mt-4">{steps[i]}</P>
    </Fade>
  );
}

export function ResultScreen({ answers, onNext }: { answers: Answers; onNext: () => void }) {
  const profile = pickProfile(answers);
  const level = pressureLevel(answers);
  useEffect(() => {
    track("diagnosis_viewed", { profile: profile.id }, true);
  }, [profile.id]);

  return (
    <Fade>
      <Eyebrow>Seu diagnóstico final</Eyebrow>
      <H className="text-primary">{profile.name}</H>
      <P className="mt-3 font-semibold text-foreground">{profile.subtitle}</P>
      <Card className="mt-5">
        <P>{profile.text}</P>
      </Card>

      <Card className="mt-4">
        <div className="flex items-center justify-between text-[0.7rem] font-extrabold uppercase tracking-widest">
          <span className="text-primary">Em ordem</span>
          <span className="text-muted-foreground">No sufoco</span>
        </div>
        <div className="relative mt-3 h-2 rounded-full bg-secondary">
          <div
            className="absolute -top-1 h-4 w-4 -translate-x-1/2 rounded-full bg-cta shadow-cta"
            style={{ left: `${level}%` }}
          />
        </div>
        <p className="mt-4 text-[0.85rem] font-semibold">
          Nível de sobrecarga: <span className="text-primary">{level}%</span>
        </p>
      </Card>

      <div className="mt-4 grid gap-3">
        <Card>
          <p className="eyebrow">Seu tempo disponível</p>
          <p className="mt-1 text-[1.05rem] font-bold">{timeLabel(answers)}</p>
        </Card>
        <Card>
          <p className="eyebrow">Sua prioridade agora</p>
          <p className="mt-1 text-[1.05rem] font-bold">{roomLabel(answers)}</p>
        </Card>
      </div>

      <P className="mt-5">
        Com base nisso, montamos a rotina que cabe no seu dia — e ela já está pronta esperando por
        você.
      </P>
      <div className="mt-6">
        <Cta onClick={onNext}>Ver minha solução</Cta>
      </div>
    </Fade>
  );
}

const deliverables = [
  ["Rotina de hoje", "Abre o app e já sabe o que fazer, em minutos."],
  ["Rotinas por tempo", "Versões de 10, 15, 20 e 30 minutos."],
  ["Plano por ambiente", "Cozinha, quarto, banheiro, sala e lavanderia."],
  ["Reset rápido", "Casa apresentável antes de a visita chegar."],
  ["Modo dia difícil", "Para quando não sobrou energia nenhuma."],
  ["Rotina de roupas", "Para a montanha nunca mais se formar."],
  ["Faxina distribuída", "O fim de semana volta a ser seu."],
  ["Checklists prontos", "Nada de decidir tudo na hora."],
  ["Progresso visual", "Você vê a casa saindo do sufoco, dia a dia."],
] as const;

const faqs = [
  ["É um ebook?", "Não. É um aplicativo que abre no celular e mostra a rotina do seu dia."],
  ["Preciso instalar algo?", "Não. Você acessa direto pelo navegador do celular e pode salvar na tela inicial."],
  ["Funciona para casa pequena?", "Sim. As rotinas se adaptam ao tamanho da casa e ao tempo disponível."],
  ["Tenho filhos pequenos, dá conta?", "Dá. Existem rotinas de 10 minutos pensadas para dias corridos."],
  ["Quanto tempo por dia preciso?", "A partir de 10 minutos. Você escolhe a versão da rotina."],
  ["É mensalidade?", `Não. São ${PRICE_LABEL} em pagamento único, sem mensalidade.`],
  ["Quando recebo o acesso?", "Na hora, no seu e-mail, logo após o pagamento."],
  ["E se eu não gostar?", "Você tem 7 dias de garantia e devolvemos o valor integral."],
  ["Serve se eu trabalho fora?", "Sim. As rotinas foram feitas para quem tem pouco tempo em casa."],
  ["Preciso saber organizar?", "Não. Você só segue o que aparece na tela."],
] as const;

export function SalesScreen({ answers }: { answers: Answers }) {
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
    <Fade className="space-y-14">
      <section>
        <Eyebrow>A sua solução</Eyebrow>
        <H>
          Você não precisa de outro ebook.
          <br />
          Precisa de alguém dizendo o que fazer hoje.
        </H>
        <Photo src={appAsset.url} alt="App Casa no Automático" className="mt-5 aspect-[4/5]" />
        <P className="mt-5">
          <strong className="text-foreground">Casa no Automático</strong> é um aplicativo. Você abre
          no celular e ele mostra a rotina do dia, no tempo que você tem, começando pelo ambiente que
          mais te incomoda — hoje, {roomLabel(answers).toLowerCase()}.
        </P>
        <div className="mt-6">
          <Cta href={href} onClick={checkout}>
            Quero começar agora
          </Cta>
        </div>
      </section>

      <section>
        <Eyebrow>O que você recebe</Eyebrow>
        <H>Tudo pronto para usar hoje</H>
        <div className="mt-5 grid gap-3">
          {deliverables.map(([title, desc]) => (
            <Card key={title}>
              <p className="text-[0.95rem] font-extrabold">{title}</p>
              <P className="mt-1 text-[0.88rem]">{desc}</P>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <Eyebrow>Transformação visual</Eyebrow>
        <H>De casa no sufoco para casa em ordem</H>
        <div className="mt-5 space-y-4">
          <Photo src={caosAsset.url} alt="Casa no sufoco" className="aspect-[4/3]" />
          <Photo src={ordemAsset.url} alt="Casa em ordem" className="aspect-[4/3]" />
        </div>
        <div className="mt-6">
          <Cta href={href} onClick={checkout}>
            Quero minha casa assim
          </Cta>
        </div>
      </section>

      <section>
        <Card className="border-primary/40 bg-surface text-center">
          <Eyebrow>Oferta de hoje</Eyebrow>
          <H>Comece agora sua Casa no Automático</H>
          <p className="headline mt-5 text-[3rem] leading-none text-primary">{PRICE_LABEL}</p>
          <p className="mt-2 text-[0.75rem] font-extrabold uppercase tracking-widest text-muted-foreground">
            Pagamento único • Sem mensalidade
          </p>
          <div className="mt-6">
            <Cta href={href} onClick={checkout}>
              Quero acesso imediato
            </Cta>
          </div>
          <p className="mt-3 text-[0.78rem] text-muted-foreground">
            Acesso na hora, direto no seu celular.
          </p>
        </Card>
      </section>

      <section>
        <Card className="text-center">
          <p className="headline text-[1.3rem]">Garantia de 7 dias</p>
          <P className="mt-3">
            Use por 7 dias. Se você não sentir sua casa mais leve, devolvemos cada centavo. Sem
            perguntas.
          </P>
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
                <span className="shrink-0 text-primary">{openFaq === i ? "−" : "+"}</span>
              </button>
              {openFaq === i && <P className="px-5 pb-4 text-[0.88rem]">{a}</P>}
            </Card>
          ))}
        </div>
      </section>

      <section className="text-center">
        <Photo src={pesoPazAsset.url} alt="Peso x paz" className="aspect-[4/3]" />
        <H className="mt-6">
          A diferença não é ter uma casa perfeita. É parar de precisar recomeçar do zero.
        </H>
        <div className="mt-6">
          <Cta href={href} onClick={checkout}>
            Começar por {PRICE_LABEL}
          </Cta>
        </div>
        <p className="mt-3 text-[0.78rem] text-muted-foreground">
          Pagamento único • 7 dias de garantia
        </p>
      </section>
    </Fade>
  );
}
