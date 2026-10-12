// Algoritmos de ordenação do feed.
// Os dois ordenam do MAIOR para o MENOR pela nota (o melhor post primeiro)
// e contam quantas comparações fizeram, para mostrarmos na tela.

// ---------------------------------------------------------------------------
// MERGE SORT
// Usado quando o feed inteiro precisa ser reordenado (ao abrir a página ou
// ao mudar os interesses). Complexidade O(n log n) em qualquer caso.
// É estável: em caso de empate, mantém a ordem original dos posts.
// ---------------------------------------------------------------------------
function mergeSort(lista) {
  const contador = { comparacoes: 0 };
  const ordenada = mergeSortRecursivo(lista, contador);
  return { lista: ordenada, comparacoes: contador.comparacoes };
}

function mergeSortRecursivo(lista, contador) {
  // Caso base: lista com 0 ou 1 elemento já está ordenada
  if (lista.length <= 1) {
    return lista;
  }

  // Divide a lista ao meio
  const meio = Math.floor(lista.length / 2);
  const esquerda = mergeSortRecursivo(lista.slice(0, meio), contador);
  const direita = mergeSortRecursivo(lista.slice(meio), contador);

  // Junta as duas metades já ordenadas
  return intercalar(esquerda, direita, contador);
}

function intercalar(esquerda, direita, contador) {
  const resultado = [];
  let i = 0;
  let j = 0;

  while (i < esquerda.length && j < direita.length) {
    contador.comparacoes++;
    // Usar ">=" (e não ">") é o que deixa o Merge Sort estável:
    // no empate, o elemento da esquerda (que veio antes) entra primeiro.
    if (esquerda[i].nota >= direita[j].nota) {
      resultado.push(esquerda[i]);
      i++;
    } else {
      resultado.push(direita[j]);
      j++;
    }
  }

  // Copia o que sobrou de cada metade
  while (i < esquerda.length) {
    resultado.push(esquerda[i]);
    i++;
  }
  while (j < direita.length) {
    resultado.push(direita[j]);
    j++;
  }

  return resultado;
}

// ---------------------------------------------------------------------------
// INSERTION SORT
// Usado quando o usuário curte um post. O feed já estava ordenado e só
// algumas notas mudaram, então a lista fica QUASE ordenada. Nesse caso o
// Insertion Sort é muito rápido (perto de O(n)), mesmo sendo O(n²) no pior caso.
// ---------------------------------------------------------------------------
function insertionSort(lista) {
  const copia = lista.slice(); // não altera a lista original
  let comparacoes = 0;

  for (let i = 1; i < copia.length; i++) {
    const atual = copia[i];
    let j = i - 1;

    // Empurra para a direita os posts com nota MENOR que a do atual
    while (j >= 0) {
      comparacoes++;
      if (copia[j].nota < atual.nota) {
        copia[j + 1] = copia[j];
        j--;
      } else {
        break;
      }
    }

    // Coloca o post atual na posição certa
    copia[j + 1] = atual;
  }

  return { lista: copia, comparacoes };
}

module.exports = { mergeSort, insertionSort };
