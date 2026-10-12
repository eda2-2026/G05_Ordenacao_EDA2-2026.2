// Testes do cálculo da nota. Rodar com: npm test
const test = require("node:test");
const assert = require("node:assert");
const { calcularNota } = require("../backend/score");

function perfilVazio() {
  return { interesses: new Set(), curtidasPorCategoria: {}, postsCurtidos: new Set() };
}

// Post de exemplo: engajamento = 1000 + 2*100 = 1200 -> 12 pontos; publicado há 4h -> 20 pontos
const post = { id: 1, categoria: "games", curtidas: 1000, comentarios: 100, horasAtras: 4 };

test("sem interesses, a nota vem só da popularidade e da recência", () => {
  assert.strictEqual(calcularNota(post, perfilVazio()).total, 32);
});

test("marcar interesse na categoria soma 30 pontos", () => {
  const perfil = perfilVazio();
  perfil.interesses.add("games");
  assert.strictEqual(calcularNota(post, perfil).total, 62);
});

test("cada curtida na mesma categoria soma 10 pontos", () => {
  const perfil = perfilVazio();
  perfil.curtidasPorCategoria.games = 2;
  assert.strictEqual(calcularNota(post, perfil).total, 52);
});

test("interesse em outra categoria não muda a nota", () => {
  const perfil = perfilVazio();
  perfil.interesses.add("musica");
  assert.strictEqual(calcularNota(post, perfil).total, 32);
});

test("a popularidade tem limite de 30 pontos", () => {
  const viral = { ...post, curtidas: 100000 };
  const motivo = calcularNota(viral, perfilVazio()).motivos.find((m) => m.texto.startsWith("Popular"));
  assert.strictEqual(motivo.pontos, 30);
});

test("post com mais de 24h não ganha pontos de recência", () => {
  const antigo = { ...post, horasAtras: 48 };
  const { motivos } = calcularNota(antigo, perfilVazio());
  assert.ok(motivos.every((m) => !m.texto.startsWith("Publicado")));
});

test("a nota é a soma dos pontos de todos os motivos", () => {
  const perfil = perfilVazio();
  perfil.interesses.add("games");
  const { total, motivos } = calcularNota(post, perfil);
  const soma = motivos.reduce((acumulado, m) => acumulado + m.pontos, 0);
  assert.strictEqual(total, soma);
});
