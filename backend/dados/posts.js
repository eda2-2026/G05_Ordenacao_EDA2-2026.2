// Categorias de conteúdo que o usuário pode marcar como interesse.
const CATEGORIAS = {
  futebol:    { nome: "Futebol",    emoji: "⚽", cor: "#1F8A5B" },
  musica:     { nome: "Música",     emoji: "🎧", cor: "#C2417A" },
  games:      { nome: "Games",      emoji: "🎮", cor: "#4F3FD1" },
  culinaria:  { nome: "Culinária",  emoji: "🍝", cor: "#C9731B" },
  viagem:     { nome: "Viagem",     emoji: "✈️", cor: "#1A7FB5" },
  tecnologia: { nome: "Tecnologia", emoji: "💻", cor: "#5A5F7D" },
};

// Posts fictícios do feed.
// horasAtras: há quantas horas o post foi publicado.
// A lista já está do mais recente para o mais antigo. Como o Merge Sort é
// estável, posts com a mesma nota continuam nessa ordem (o mais recente na frente).
const POSTS = [
  { id: 1,  autor: "@resenha_fc",      categoria: "futebol",    texto: "Que golaço no último minuto! Alguém mais gritou aqui?",        curtidas: 2310, comentarios: 412, horasAtras: 1 },
  { id: 2,  autor: "@chef_de_rep",     categoria: "culinaria",  texto: "Miojo gourmet com 3 ingredientes que você já tem em casa.",    curtidas: 860,  comentarios: 97,  horasAtras: 1 },
  { id: 3,  autor: "@bytes_br",        categoria: "tecnologia", texto: "5 atalhos do VS Code que eu queria ter conhecido antes.",      curtidas: 540,  comentarios: 33,  horasAtras: 2 },
  { id: 4,  autor: "@playlist_da_lu",  categoria: "musica",     texto: "Montei uma playlist só de músicas pra estudar sem sono.",      curtidas: 1290, comentarios: 120, horasAtras: 3 },
  { id: 5,  autor: "@speedrun_zé",     categoria: "games",      texto: "Zerei em 47 minutos. Novo recorde pessoal!",                   curtidas: 410,  comentarios: 58,  horasAtras: 4 },
  { id: 6,  autor: "@mochila_nas_costas", categoria: "viagem",  texto: "Chapada dos Veadeiros gastando pouco: meu roteiro de 3 dias.", curtidas: 1780, comentarios: 230, horasAtras: 5 },
  { id: 7,  autor: "@tatica_e_bola",   categoria: "futebol",    texto: "Por que o 4-3-3 voltou com tudo nessa temporada.",             curtidas: 320,  comentarios: 41,  horasAtras: 6 },
  { id: 8,  autor: "@indie_gamer",     categoria: "games",      texto: "Esse jogo brasileiro indie merece muito mais atenção.",        curtidas: 980,  comentarios: 145, horasAtras: 7 },
  { id: 9,  autor: "@vinil_e_cafe",    categoria: "musica",     texto: "Disco antigo que achei no sebo por 10 reais. Que achado!",     curtidas: 210,  comentarios: 19,  horasAtras: 9 },
  { id: 10, autor: "@doce_da_vovo",    categoria: "culinaria",  texto: "Bolo de cenoura com a cobertura que quebra igual casquinha.",  curtidas: 3120, comentarios: 380, horasAtras: 10 },
  { id: 11, autor: "@dev_iniciante",   categoria: "tecnologia", texto: "Meu primeiro site no ar! Feito só com HTML e CSS.",            curtidas: 150,  comentarios: 44,  horasAtras: 12 },
  { id: 12, autor: "@rota_sul",        categoria: "viagem",     texto: "Gramado fora de temporada vale a pena? Contei tudo.",          curtidas: 670,  comentarios: 61,  horasAtras: 14 },
  { id: 13, autor: "@varzea_raiz",     categoria: "futebol",    texto: "Final do campeonato do bairro. Lotou!",                        curtidas: 95,   comentarios: 12,  horasAtras: 18 },
  { id: 14, autor: "@lofi_noturno",    categoria: "musica",     texto: "Gravei essa batida às 3 da manhã. O que acharam?",             curtidas: 440,  comentarios: 52,  horasAtras: 20 },
  { id: 15, autor: "@retro_games",     categoria: "games",      texto: "Achei meu Super Nintendo na casa da minha avó.",               curtidas: 2650, comentarios: 301, horasAtras: 26 },
  { id: 16, autor: "@marmita_fit",     categoria: "culinaria",  texto: "Marmitas da semana em 1 hora de cozinha.",                     curtidas: 530,  comentarios: 40,  horasAtras: 30 },
  { id: 17, autor: "@gadgets_hoje",    categoria: "tecnologia", texto: "Testei o celular mais barato da loja por uma semana.",         curtidas: 1900, comentarios: 260, horasAtras: 36 },
  { id: 18, autor: "@pe_na_estrada",   categoria: "viagem",     texto: "O pôr do sol mais bonito que já vi foi em Jericoacoara.",      curtidas: 2200, comentarios: 150, horasAtras: 48 },
];

module.exports = { CATEGORIAS, POSTS };
