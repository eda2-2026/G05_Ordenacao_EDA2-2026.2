// Frontend: só desenha a tela e conversa com o servidor.
// Quem calcula as notas e ordena o feed é o backend.

let categorias = {};
let estado = null;                    // última resposta do servidor
const explicacoesAbertas = new Set(); // posts com o "por que?" aberto

// Faz um pedido para o servidor e devolve a resposta em JSON.
async function chamarApi(metodo, caminho) {
  const resposta = await fetch(caminho, { method: metodo });
  if (!resposta.ok) {
    throw new Error(`Erro ${resposta.status} em ${caminho}`);
  }
  return resposta.json();
}

// ---------------------------------------------------------------------------
// Ações do usuário
// ---------------------------------------------------------------------------
async function alternarInteresse(categoria) {
  estado = await chamarApi("POST", `/api/interesses/${categoria}`);
  renderizarTudo(true);
}

async function alternarCurtida(id) {
  estado = await chamarApi("POST", `/api/curtidas/${id}`);
  renderizarTudo(true);
}

function alternarExplicacao(id) {
  if (explicacoesAbertas.has(id)) {
    explicacoesAbertas.delete(id);
  } else {
    explicacoesAbertas.add(id);
  }
  renderizarFeed(false); // só abre/fecha, sem mostrar "subiu/desceu" de novo
}

// ---------------------------------------------------------------------------
// Desenho da tela
// ---------------------------------------------------------------------------
function renderizarTudo(mostrarMovimentos) {
  renderizarInteresses();
  renderizarStatus();
  renderizarFeed(mostrarMovimentos);
}

function renderizarInteresses() {
  const container = document.getElementById("interesses");
  let html = "";
  for (const chave in categorias) {
    const cat = categorias[chave];
    const marcado = estado.interesses.includes(chave);
    html += `
      <button class="chip" data-categoria="${chave}" aria-pressed="${marcado}" style="--cor: ${cat.cor}">
        <span aria-hidden="true">${cat.emoji}</span> ${cat.nome}
      </button>`;
  }
  container.innerHTML = html;
}

function renderizarStatus() {
  const { algoritmo, comparacoes, motivo, totalPosts } = estado.ordenacao;
  document.getElementById("status").innerHTML = `
    <p class="status-algoritmo">${algoritmo}</p>
    <p class="status-numero"><strong>${comparacoes}</strong> comparações para ordenar ${totalPosts} posts</p>
    <p class="status-motivo">${motivo}</p>`;
}

function renderizarFeed(mostrarMovimentos) {
  const container = document.getElementById("feed");
  let html = "";

  estado.feed.forEach((item, indice) => {
    const post = item.post;
    const cat = categorias[post.categoria];
    const curtido = estado.postsCurtidos.includes(post.id);
    const aberto = explicacoesAbertas.has(post.id);
    const movimento = mostrarMovimentos ? item.movimento : 0;

    let selo = "";
    if (movimento > 0) selo = `<span class="selo sobe">subiu ${movimento}</span>`;
    if (movimento < 0) selo = `<span class="selo desce">desceu ${-movimento}</span>`;

    html += `
      <article class="post ${movimento > 0 ? "post-subiu" : ""}" style="--cor: ${cat.cor}">
        <div class="post-posicao" aria-label="Posição ${indice + 1}">${indice + 1}</div>
        <div class="post-corpo">
          <header class="post-topo">
            <span class="post-categoria">${cat.emoji} ${cat.nome}</span>
            <span class="post-autor">${post.autor}</span>
            <span class="post-tempo">há ${post.horasAtras}h</span>
            ${selo}
          </header>
          <p class="post-texto">${post.texto}</p>
          <footer class="post-acoes">
            <button class="botao-curtir" data-curtir="${post.id}" aria-pressed="${curtido}">
              ${curtido ? "♥ Curtido" : "♡ Curtir"} <span>${post.curtidas}</span>
            </button>
            <span class="post-comentarios">💬 ${post.comentarios}</span>
            <button class="botao-porque" data-porque="${post.id}" aria-expanded="${aberto}">
              Por que estou vendo isso?
            </button>
          </footer>
          ${aberto ? renderizarExplicacao(item) : ""}
        </div>
      </article>`;
  });

  container.innerHTML = html;
}

function renderizarExplicacao(item) {
  let linhas = "";
  for (const motivo of item.motivos) {
    linhas += `<li><span>${motivo.texto}</span><span>+${motivo.pontos}</span></li>`;
  }
  if (item.motivos.length === 0) {
    linhas = `<li><span>Nenhum ponto ainda. Marque interesses ou curta posts.</span></li>`;
  }
  return `
    <div class="explicacao">
      <ul>${linhas}</ul>
      <p class="explicacao-total"><span>Nota do post</span><span>${item.nota}</span></p>
    </div>`;
}

function mostrarErro() {
  document.getElementById("feed").innerHTML = `
    <p class="erro">Não foi possível falar com o servidor. Confira se ele está rodando
    com <code>npm start</code> e abra a página em http://localhost:3000.</p>`;
}

// ---------------------------------------------------------------------------
// Cliques (um único "ouvinte" para cada área da tela)
// ---------------------------------------------------------------------------
document.getElementById("interesses").addEventListener("click", (evento) => {
  const botao = evento.target.closest("[data-categoria]");
  if (botao) alternarInteresse(botao.dataset.categoria).catch(mostrarErro);
});

document.getElementById("feed").addEventListener("click", (evento) => {
  const curtir = evento.target.closest("[data-curtir]");
  if (curtir) alternarCurtida(Number(curtir.dataset.curtir)).catch(mostrarErro);

  const porque = evento.target.closest("[data-porque]");
  if (porque) alternarExplicacao(Number(porque.dataset.porque));
});

// ---------------------------------------------------------------------------
// Início: busca as categorias e começa um feed novo
// ---------------------------------------------------------------------------
async function iniciar() {
  categorias = await chamarApi("GET", "/api/categorias");
  estado = await chamarApi("POST", "/api/reiniciar");
  renderizarTudo(false);
}

iniciar().catch(mostrarErro);
