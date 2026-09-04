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
    title: "A sua casa hoje te dá mais paz ou mais peso?",
    options: [
      { value: "peso", emoji: "😮‍💨", label: "Mais peso do que paz" },
      { value: "cansada", emoji: "😓", label: "Vivo cansada e nunca fica como eu queria" },
      { value: "ciclo", emoji: "🔁", label: "Tem dias bons, mas a bagunça sempre volta" },
      { value: "tranquila", emoji: "🙂", label: "Está tranquila, mas quero melhorar" },
    ],
  },
  main_pain: {
    key: "main_pain",
    title: "O que mais pesa no seu dia a dia?",
    options: [
      { value: "tudo_em_mim", emoji: "😮‍💨", label: "Sentir que tudo cai em mim" },
      { value: "sem_energia", emoji: "😴", label: "Viver cansada e sem energia" },
      { value: "volta", emoji: "🔁", label: "Arrumar e a bagunça voltar" },
      { value: "visita", emoji: "🙈", label: "Alguém aparecer sem avisar" },
      { value: "roupa", emoji: "👕", label: "Roupa que nunca termina" },
      { value: "cozinha", emoji: "🍽", label: "Cozinha que parece não ter fim" },
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
      { value: "familia_grande", label: "Família grande" },
    ],
  },
  mental_load: {
    key: "mental_load",
    title: "Em casa, quem segura a maior parte da rotina?",
    options: [
      { value: "tudo_em_mim", emoji: "😩", label: "Praticamente tudo cai em mim" },
      { value: "quase_tudo", emoji: "🤷", label: "Faço quase tudo e às vezes peço ajuda" },
      { value: "penso_tudo", emoji: "🙏", label: "Tenho ajuda, mas ainda preciso pensar em tudo" },
      { value: "dividimos", emoji: "👫", label: "Dividimos, mas falta organização" },
    ],
  },
  phrase: {
    key: "phrase",
    title: "Qual dessas frases mais bate com você?",
    options: [
      { value: "volta", label: "“Eu arrumei isso ontem e já está bagunçado de novo.”" },
      { value: "prioridade", label: "“Não sei mais o que fazer primeiro.”" },
      { value: "cansada", label: "“Termino o dia cansada e parece que não fiz nada.”" },
      { value: "visita", label: "“Se alguém chegar agora, entro em desespero.”" },
      { value: "faxina", label: "“Meu fim de semana vira faxina.”" },
    ],
  },
  organization_block: {
    key: "organization_block",
    title: "O que mais te trava quando começa a organizar?",
    options: [
      { value: "por_onde", emoji: "🤯", label: "Não sei por onde começar" },
      { value: "dez_coisas", emoji: "⏳", label: "Começo uma coisa e encontro outras dez" },
      { value: "tempo", emoji: "😮‍💨", label: "Falta tempo e energia" },
      { value: "volta", emoji: "🔁", label: "Arrumo, mas logo volta tudo" },
      { value: "rotina_pronta", emoji: "📋", label: "Precisava de uma rotina pronta" },
    ],
  },
  available_time: {
    key: "available_time",
    title: "Se você soubesse exatamente o que fazer, quanto tempo conseguiria separar por dia?",
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
    title: "Qual ambiente mais faz você sentir que perdeu o controle?",
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
    title: "Qual seria sua maior vitória?",
    options: [
      { value: "controle", emoji: "🏡", label: "Sentir que minha casa está sob controle" },
      { value: "refeicoes", emoji: "🍽", label: "Parar de decidir tudo em cima da hora" },
      { value: "tempo", emoji: "🕊", label: "Ter mais tempo para mim" },
      { value: "orgulho", emoji: "👑", label: "Sentir orgulho da minha casa" },
      { value: "cabeca", emoji: "🧠", label: "Tirar a rotina da casa da cabeça" },
    ],
  },
  commitment: {
    key: "commitment",
    title:
      "Se existisse um caminho simples, barato e que coubesse na sua rotina, você começaria hoje?",
    options: [
      { value: "agora", emoji: "🔥", label: "Sim, já passou da hora" },
      { value: "simples", emoji: "💕", label: "Sim, se for simples" },
      { value: "recomecar", emoji: "✅", label: "Quero parar de recomeçar" },
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
