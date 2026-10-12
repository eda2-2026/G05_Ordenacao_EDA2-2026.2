// Guarda o estado do feed no servidor: o perfil do usuário e a ordem atual dos posts.
// Também decide qual algoritmo de ordenação usar em cada situação.
const { CATEGORIAS, POSTS } = require("./dados/posts");
const { calcularNota } = require("./score");
const { mergeSort, insertionSort } = require("./ordenacao");

let perfil;
let feed;            // itens no formato { post, nota, motivos, movimento }
let ultimaOrdenacao; // { algoritmo, comparacoes, motivo, totalPosts }

// Volta tudo ao início: perfil vazio e feed ordenado pela primeira vez.
function reiniciar() {
  perfil = {
    interesses: new Set(),
    curtidasPorCategoria: {},
    postsCurtidos: new Set(),
  };
  // Copia cada post, para as curtidas não alterarem os dados originais
  feed = POSTS.map((post) => ({ post: { ...post }, nota: 0, motivos: [], movimento: 0 }));
  reordenar("Merge Sort", "Feed montado pela primeira vez, ordenado pela nota de cada post.", false);
}

// Recalcula as notas e ordena o feed com o algoritmo escolhido.
function reordenar(algoritmo, motivo, mostrarMovimentos = true) {
  // Guarda a posição de cada post antes de ordenar, para saber quem subiu/desceu
  const posicaoAntes = {};
  feed.forEach((item, indice) => { posicaoAntes[item.post.id] = indice; });

  for (const item of feed) {
    const resultado = calcularNota(item.post, perfil);
    item.nota = resultado.total;
    item.motivos = resultado.motivos;
  }

  const resultado = algoritmo === "Merge Sort" ? mergeSort(feed) : insertionSort(feed);
  feed = resultado.lista;

  feed.forEach((item, indice) => {
    // positivo = subiu, negativo = desceu
    item.movimento = mostrarMovimentos ? posicaoAntes[item.post.id] - indice : 0;
  });

  ultimaOrdenacao = {
    algoritmo,
    comparacoes: resultado.comparacoes,
    motivo,
    totalPosts: feed.length,
  };
}

// Marca ou desmarca um interesse. Muitas notas mudam: reordena tudo com Merge Sort.
function alternarInteresse(categoria) {
  if (!CATEGORIAS[categoria]) return false;

  if (perfil.interesses.has(categoria)) {
    perfil.interesses.delete(categoria);
  } else {
    perfil.interesses.add(categoria);
  }
  reordenar("Merge Sort", "Seus interesses mudaram, então o feed inteiro foi reordenado.");
  return true;
}

// Curte ou descurte um post. Poucas notas mudam: o feed fica quase ordenado,
// então o Insertion Sort é a melhor escolha.
function alternarCurtida(id) {
  const item = feed.find((i) => i.post.id === id);
  if (!item) return false;

  const categoria = item.post.categoria;
  const contagem = perfil.curtidasPorCategoria[categoria] || 0;

  if (perfil.postsCurtidos.has(id)) {
    perfil.postsCurtidos.delete(id);
    perfil.curtidasPorCategoria[categoria] = contagem - 1;
    item.post.curtidas--;
  } else {
    perfil.postsCurtidos.add(id);
    perfil.curtidasPorCategoria[categoria] = contagem + 1;
    item.post.curtidas++;
  }
  reordenar("Insertion Sort", "Você curtiu um post. O feed já estava quase em ordem, então só alguns posts mudaram de lugar.");
  return true;
}

// Monta a resposta que o servidor envia para a página.
// (Set não vira JSON, por isso convertemos para lista com [...])
function obterEstado() {
  return {
    interesses: [...perfil.interesses],
    postsCurtidos: [...perfil.postsCurtidos],
    ordenacao: ultimaOrdenacao,
    feed,
  };
}

reiniciar();

module.exports = { reiniciar, alternarInteresse, alternarCurtida, obterEstado };
