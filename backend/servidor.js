// Servidor da aplicação: entrega a página e responde às ações do usuário.
const express = require("express");
const path = require("path");
const { CATEGORIAS } = require("./dados/posts");
const feed = require("./feed");

const app = express();
const PORTA = 3000;

// Entrega os arquivos do frontend (HTML, CSS e JS)
app.use(express.static(path.join(__dirname, "..", "frontend")));

// ----------------------------- Rotas da API -----------------------------

// Lista de categorias (para desenhar os botões de interesse)
app.get("/api/categorias", (req, res) => {
  res.json(CATEGORIAS);
});

// Estado atual do feed
app.get("/api/feed", (req, res) => {
  res.json(feed.obterEstado());
});

// Volta o feed para o início (a página chama ao abrir)
app.post("/api/reiniciar", (req, res) => {
  feed.reiniciar();
  res.json(feed.obterEstado());
});

// Marca ou desmarca um interesse -> Merge Sort
app.post("/api/interesses/:categoria", (req, res) => {
  const encontrou = feed.alternarInteresse(req.params.categoria);
  if (!encontrou) {
    return res.status(404).json({ erro: "Categoria não encontrada." });
  }
  res.json(feed.obterEstado());
});

// Curte ou descurte um post -> Insertion Sort
app.post("/api/curtidas/:id", (req, res) => {
  const encontrou = feed.alternarCurtida(Number(req.params.id));
  if (!encontrou) {
    return res.status(404).json({ erro: "Post não encontrado." });
  }
  res.json(feed.obterEstado());
});

app.listen(PORTA, () => {
  console.log(`Servidor rodando em http://localhost:${PORTA}`);
});
