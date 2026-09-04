import quartoImg from "@/assets/room_quarto.jpg";
import banheiroImg from "@/assets/room_banheiro.jpg";
import lavanderiaImg from "@/assets/room_lavanderia.jpg";
import cozinhaAsset from "@/assets/05_prova_visual_cozinha.png.asset.json";
import salaAsset from "@/assets/07_prova_visual_casa.png.asset.json";
import casaAsset from "@/assets/02_casa_organizada.png.asset.json";

/** Cole aqui a URL de checkout da Kiwify. */
export const CHECKOUT_URL = "https://pay.kiwify.com.br/SEU-CHECKOUT";

export const PRICE_LABEL = "R$37";

export type Answers = Record<string, string>;

export type QuestionOption = {
  value: string;
  label: string;
  emoji?: string;
  image?: string;
};

export type Question = {
  key: string;
  eyebrow?: string;
  title: string;
  layout?: "list" | "cards";
  options: QuestionOption[];
};

export const questions: Record<string, Question> = {
  house_feeling: {
    key: "house_feeling",
    eyebrow: "Responda sinceramente",
    title: "A sua casa hoje te dá paz ou te dá peso?",
    options: [
      { value: "peso", emoji: "😮‍💨", label: "Mais peso do que paz, confesso" },
      { value: "cansada", emoji: "😔", label: "Vivo cansada, nunca fica como eu queria" },
      { value: "ciclo", emoji: "🤍", label: "Tem dias bons e dias de sufoco" },
      { value: "tranquila", emoji: "🙂", label: "Está tranquila, mas quero melhorar" },
    ],
  },
  main_pain: {
    key: "main_pain",
    eyebrow: "Só mais uma coisa",
    title: "O que mais te pesa no dia a dia?",
    options: [
      { value: "tudo_em_mim", emoji: "😮‍💨", label: "Sentir que tudo cai em mim" },
      { value: "sem_energia", emoji: "😴", label: "Viver cansada, sem energia" },
      { value: "volta", emoji: "🔁", label: "Arrumar e a bagunça voltar" },
      { value: "visita", emoji: "🙈", label: "Ficar desesperada quando alguém aparece" },
    ],
  },
  household: {
    key: "household",
    title: "Você cuida da casa e de mais quem?",
    options: [
      { value: "filhos_pequenos", label: "Filhos pequenos" },
      { value: "filhos_maiores", label: "Filhos maiores" },
      { value: "parceiro_familia", label: "Parceiro e família" },
      { value: "so_eu", label: "Só de mim e da minha casa" },
    ],
  },
  mental_load: {
    key: "mental_load",
    title: "Em casa, quem segura a maior parte?",
    options: [
      { value: "tudo_em_mim", emoji: "😩", label: "Praticamente tudo cai em mim" },
      { value: "quase_tudo", emoji: "🤷", label: "Eu faço quase tudo" },
      { value: "penso_tudo", emoji: "🙏", label: "Tenho alguma ajuda, mas o peso ainda é meu" },
      { value: "dividimos", emoji: "👫", label: "A gente divide, mas falta organização" },
    ],
  },
  phrase: {
    key: "phrase",
    title: "Qual dessas frases mais bate com você?",
    options: [
      { value: "volta", emoji: "🔁", label: "“Arrumo e poucos dias depois já está tudo igual.”" },
      { value: "prioridade", emoji: "🍳", label: "“Não aguento mais pensar no que fazer na cozinha.”" },
      { value: "cansada", emoji: "😴", label: "“Termino o dia exausta e sinto que não rendeu.”" },
      { value: "visita", emoji: "😳", label: "“Fico desesperada quando alguém aparece sem avisar.”" },
    ],
  },
  organization_block: {
    key: "organization_block",
    title: "O que mais te trava na hora de organizar?",
    options: [
      { value: "por_onde", emoji: "🤯", label: "Não sei por onde começar" },
      { value: "dez_coisas", emoji: "⏳", label: "Começo e nunca termino" },
      { value: "tempo", emoji: "😮‍💨", label: "Falta tempo e energia" },
      { value: "volta", emoji: "🔁", label: "Arrumo e logo volta tudo" },
    ],
  },
  available_time: {
    key: "available_time",
    title: "Quanto tempo você conseguiria separar por dia?",
    options: [
      { value: "10", label: "10 minutos" },
      { value: "15", label: "15 minutos" },
      { value: "20", label: "20 minutos" },
      { value: "30", label: "30 minutos" },
      { value: "30+", label: "Mais de 30 minutos" },
    ],
  },
  priority_room: {
    key: "priority_room",
    title: "Qual ambiente mais te faz perder o controle?",
    layout: "cards",
    options: [
      { value: "Cozinha", label: "Cozinha", image: cozinhaAsset.url },
      { value: "Quarto", label: "Quarto", image: quartoImg },
      { value: "Banheiro", label: "Banheiro", image: banheiroImg },
      { value: "Sala", label: "Sala", image: salaAsset.url },
      { value: "Lavanderia", label: "Lavanderia", image: lavanderiaImg },
      { value: "A casa toda", label: "A casa toda", image: casaAsset.url },
    ],
  },
  desired_result: {
    key: "desired_result",
    title: "Qual seria a sua maior vitória?",
    options: [
      { value: "controle", emoji: "🏡", label: "Ter a casa em ordem sem sofrer" },
      { value: "refeicoes", emoji: "🍽", label: "Ter a cozinha organizada" },
      { value: "tempo", emoji: "🕊", label: "Ter mais tempo e paz" },
      { value: "orgulho", emoji: "👑", label: "Sentir orgulho da minha casa" },
    ],
  },
  commitment: {
    key: "commitment",
    title: "Se existisse um caminho simples e barato, você começaria hoje?",
    options: [
      { value: "agora", emoji: "🔥", label: "Sim, estou decidida" },
      { value: "simples", emoji: "💕", label: "Sim, se for fácil" },
      { value: "recomecar", emoji: "✅", label: "Já passou da hora" },
    ],
  },
};


export const QUESTION_KEYS = Object.keys(questions);

/* ---------- diagnóstico ---------- */

export type Scores = {
  acumulo: number;
  cargaMental: number;
  clareza: number;
  tempo: number;
  signals: number;
};

export function computeScores(a: Answers): Scores {
  let acumulo = 5;
  let cargaMental = 5;
  let clareza = 5;
  let tempo = 5;

  if (a["house_feeling"] === "peso") {
    acumulo += 3;
    cargaMental += 2;
  }
  if (a["house_feeling"] === "cansada") {
    tempo -= 2;
    acumulo += 2;
  }
  if (a["house_feeling"] === "ciclo") acumulo += 3;
  if (a["house_feeling"] === "tranquila") {
    acumulo -= 1;
    clareza += 1;
  }

  if (a["main_pain"] === "tudo_em_mim") cargaMental += 3;
  if (a["main_pain"] === "sem_energia") tempo -= 2;
  if (a["main_pain"] === "volta") acumulo += 3;
  if (a["main_pain"] === "visita") acumulo += 2;
  if (a["main_pain"] === "roupa" || a["main_pain"] === "cozinha") acumulo += 2;

  if (a["household"] === "filhos_pequenos" || a["household"] === "familia_grande") {
    tempo -= 2;
    cargaMental += 2;
  }
  if (a["household"] === "so_eu") tempo += 1;

  if (a["mental_load"] === "tudo_em_mim") cargaMental += 4;
  if (a["mental_load"] === "quase_tudo") cargaMental += 3;
  if (a["mental_load"] === "penso_tudo") cargaMental += 3;
  if (a["mental_load"] === "dividimos") clareza -= 2;

  if (a["phrase"] === "prioridade") clareza -= 3;
  if (a["phrase"] === "volta") acumulo += 2;
  if (a["phrase"] === "cansada") tempo -= 2;
  if (a["phrase"] === "faxina") acumulo += 2;
  if (a["phrase"] === "visita") acumulo += 1;

  if (a["organization_block"] === "por_onde") clareza -= 4;
  if (a["organization_block"] === "dez_coisas") clareza -= 3;
  if (a["organization_block"] === "tempo") tempo -= 3;
  if (a["organization_block"] === "volta") acumulo += 3;
  if (a["organization_block"] === "rotina_pronta") clareza -= 3;

  const time = a["available_time"];
  if (time === "10") tempo -= 2;
  if (time === "15") tempo -= 1;
  if (time === "30" || time === "30+") tempo += 2;

  const clamp = (n: number) => Math.max(1, Math.min(10, Math.round(n)));
  const scores = {
    acumulo: clamp(acumulo),
    cargaMental: clamp(cargaMental),
    clareza: clamp(clareza),
    tempo: clamp(tempo),
    signals: 0,
  };
  scores.signals =
    (scores.acumulo >= 7 ? 1 : 0) +
    (scores.cargaMental >= 7 ? 1 : 0) +
    (scores.clareza <= 5 ? 1 : 0) +
    (scores.tempo <= 5 ? 1 : 0);
  return scores;
}

export type Profile = {
  id: string;
  name: string;
  subtitle: string;
  text: string;
};

export const profiles: Profile[] = [
  {
    id: "acumulo",
    name: "Casa no ciclo do acúmulo",
    subtitle: "Para quem organiza, mas a bagunça volta.",
    text: "Você consegue colocar a casa em ordem. O problema é que pequenas tarefas voltam a acumular antes de entrarem na rotina.",
  },
  {
    id: "piloto",
    name: "Casa no piloto manual",
    subtitle: "Para quem precisa decidir tudo.",
    text: "Sua maior sobrecarga está em precisar lembrar constantemente o que deve ser feito.",
  },
  {
    id: "sobrecarga",
    name: "Rotina sobrecarregada",
    subtitle: "Para quem tem pouco tempo e muitas responsabilidades.",
    text: "Sua rotina está pedindo mais tarefas e decisões do que cabem no tempo disponível.",
  },
  {
    id: "prioridades",
    name: "Casa sem prioridades",
    subtitle: "Para quem começa várias coisas e não sabe o que fazer primeiro.",
    text: "Você está tratando tarefas demais como urgentes ao mesmo tempo.",
  },
];

export function pickProfile(a: Answers): Profile {
  const s = computeScores(a);
  const ranked: Array<[string, number]> = [
    ["prioridades", 11 - s.clareza],
    ["sobrecarga", 11 - s.tempo],
    ["piloto", s.cargaMental],
    ["acumulo", s.acumulo],
  ];
  ranked.sort((x, y) => y[1] - x[1]);
  const winner = ranked[0]?.[0] ?? "acumulo";
  return profiles.find((p) => p.id === winner) ?? profiles[0]!;
}

export function pressureLevel(a: Answers): number {
  const s = computeScores(a);
  const raw = (s.acumulo + s.cargaMental + (11 - s.clareza) + (11 - s.tempo)) / 4;
  return Math.max(10, Math.min(96, Math.round(raw * 10)));
}

export function timeLabel(a: Answers): string {
  const t = a["available_time"];
  if (!t) return "15 minutos por dia";
  return t === "30+" ? "Mais de 30 minutos por dia" : `${t} minutos por dia`;
}

export function roomLabel(a: Answers): string {
  return a["priority_room"] ?? "Cozinha";
}
