const { CATEGORIAS } = require("./dados/posts");

// Pesos da fórmula da nota. Mudem esses números para ver o feed mudar!
const PONTOS_POR_INTERESSE = 30;            // marcou interesse na categoria
const PONTOS_POR_CURTIDA_NA_CATEGORIA = 10; // cada post curtido daquela categoria
const MAX_PONTOS_POPULARIDADE = 30;
const MAX_PONTOS_RECENCIA = 24;

// Calcula a nota de um post para o perfil do usuário.
// Retorna a nota total e a lista de motivos (o "por que estou vendo isso?").
function calcularNota(post, perfil) {
  const motivos = [];
  const nomeCategoria = CATEGORIAS[post.categoria].nome;

  // 1. Interesse marcado pelo usuário
  if (perfil.interesses.has(post.categoria)) {
    motivos.push({
      texto: `Você marcou interesse em ${nomeCategoria}`,
      pontos: PONTOS_POR_INTERESSE,
    });
  }

  // 2. Posts que o usuário curtiu da mesma categoria
  const curtidasNaCategoria = perfil.curtidasPorCategoria[post.categoria] || 0;
  if (curtidasNaCategoria > 0) {
    const plural = curtidasNaCategoria === 1 ? "post" : "posts";
    motivos.push({
      texto: `Você curtiu ${curtidasNaCategoria} ${plural} de ${nomeCategoria}`,
      pontos: curtidasNaCategoria * PONTOS_POR_CURTIDA_NA_CATEGORIA,
    });
  }

  // 3. Popularidade: comentário vale o dobro de curtida
  const engajamento = post.curtidas + 2 * post.comentarios;
  const pontosPopularidade = Math.min(MAX_PONTOS_POPULARIDADE, Math.floor(engajamento / 100));
  if (pontosPopularidade > 0) {
    motivos.push({
      texto: `Popular: ${post.curtidas} curtidas e ${post.comentarios} comentários`,
      pontos: pontosPopularidade,
    });
  }

  // 4. Recência: perde 1 ponto por hora
  const pontosRecencia = Math.max(0, MAX_PONTOS_RECENCIA - post.horasAtras);
  if (pontosRecencia > 0) {
    motivos.push({
      texto: `Publicado há ${post.horasAtras}h`,
      pontos: pontosRecencia,
    });
  }

  let total = 0;
  for (const motivo of motivos) {
    total += motivo.pontos;
  }

  return { total, motivos };
}

module.exports = { calcularNota };
