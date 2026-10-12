// Testes dos algoritmos de ordenação. Rodar com: npm test
const test = require("node:test");
const assert = require("node:assert");
const { mergeSort, insertionSort } = require("../backend/ordenacao");

// Cria itens no formato que os algoritmos esperam ({ nota })
function criarItens(notas) {
  return notas.map((nota, indice) => ({ id: indice, nota }));
}

function pegarNotas(lista) {
  return lista.map((item) => item.nota);
}

// Os mesmos testes valem para os dois algoritmos
for (const [nome, ordenar] of [["Merge Sort", mergeSort], ["Insertion Sort", insertionSort]]) {
  test(`${nome}: ordena do maior para o menor`, () => {
    const { lista } = ordenar(criarItens([40, 82, 15, 60]));
    assert.deepStrictEqual(pegarNotas(lista), [82, 60, 40, 15]);
  });

  test(`${nome}: é estável (empates mantêm a ordem original)`, () => {
    const itens = [
      { id: "a", nota: 50 },
      { id: "b", nota: 30 },
      { id: "c", nota: 50 },
    ];
    const { lista } = ordenar(itens);
    assert.deepStrictEqual(lista.map((item) => item.id), ["a", "c", "b"]);
  });

  test(`${nome}: funciona com lista vazia e com um elemento`, () => {
    assert.deepStrictEqual(ordenar([]).lista, []);
    assert.deepStrictEqual(pegarNotas(ordenar(criarItens([7])).lista), [7]);
  });

  test(`${nome}: não altera a lista original`, () => {
    const itens = criarItens([1, 3, 2]);
    ordenar(itens);
    assert.deepStrictEqual(pegarNotas(itens), [1, 3, 2]);
  });
}

test("Insertion Sort: faz poucas comparações numa lista quase ordenada", () => {
  // Exemplo da apresentação: o 15 virou 55 depois de uma curtida
  const { lista, comparacoes } = insertionSort(criarItens([82, 60, 40, 55]));
  assert.deepStrictEqual(pegarNotas(lista), [82, 60, 55, 40]);
  assert.strictEqual(comparacoes, 4);
});

test("Insertion Sort compara menos que o Merge Sort quando a lista está quase ordenada", () => {
  // 100 notas já em ordem decrescente, com só uma fora do lugar
  const notas = [];
  for (let i = 100; i > 0; i--) notas.push(i);
  notas[99] = 50;

  const insertion = insertionSort(criarItens(notas));
  const merge = mergeSort(criarItens(notas));
  assert.ok(insertion.comparacoes < merge.comparacoes);
});
