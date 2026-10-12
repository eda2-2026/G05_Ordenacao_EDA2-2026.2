# G05 - Ordenação - EDA2 2026.2: Por que isso apareceu pra mim?

Trabalho de Estruturas de Dados e Algoritmos 2 (2026.2), grupo G05, sobre **algoritmos de ordenação**.

## O problema

Muita gente não sabe como as redes sociais escolhem o que aparece no feed. Por trás de tudo existe uma ideia simples: cada post recebe uma **nota** e o feed é uma **lista ordenada** da maior nota para a menor.

Este projeto simula um feed e mostra, de forma didática, a conta por trás de cada post e o algoritmo de ordenação usado em cada momento. A proposta é conscientizar quem usa redes sociais e defender feeds mais transparentes, guiados pelos interesses das pessoas e não pelo tempo de tela.

<img width="1360" height="768" alt="image" src="https://github.com/user-attachments/assets/b02249a0-86e3-4df8-b6a5-1e1cbb0080a2" />


## Como funciona

A nota de cada post soma quatro critérios:

| Critério | Pontos |
| --- | --- |
| Você marcou interesse na categoria | +30 |
| Cada post curtido da mesma categoria | +10 |
| Popularidade (curtidas + 2 × comentários) / 100 | até +30 |
| Recência (perde 1 ponto por hora) | até +24 |

O botão **"Por que estou vendo isso?"** mostra essa conta para cada post.

<img width="920" height="622" alt="image" src="https://github.com/user-attachments/assets/e1d40f1a-6f3f-4e73-a2ec-1e235da898d8" />


## Algoritmos de ordenação

| Situação | O que acontece | Algoritmo | Por quê |
| --- | --- | --- | --- |
| Marcar ou desmarcar um interesse | Todas as notas mudam | **Merge Sort** | O(n log n) em qualquer caso e estável: posts empatados mantêm a ordem (o mais recente na frente) |
| Curtir um post | Poucas notas mudam e o feed fica quase ordenado | **Insertion Sort** | O(n²) no pior caso, mas perto de O(n) quando a lista está quase ordenada |

Os dois algoritmos foram implementados pelo grupo em `backend/ordenacao.js`, sem usar o `sort()` pronto do JavaScript. O painel "Última ordenação" mostra quantas comparações cada um fez.

## Como rodar o projeto

### 1. Pré-requisitos

É preciso ter o [Git](https://git-scm.com) e o [Node.js](https://nodejs.org) **versão 18 ou mais recente** (o npm já vem junto). Para conferir:

```bash
node -v
npm -v
```

### 2. Baixar o projeto

```bash
git clone https://github.com/eda2-2026/G05_Ordenacao_EDA2-2026.2.git
cd G05_Ordenacao_EDA2-2026.2
```

### 3. Instalar as dependências

```bash
npm install
```

Isso baixa o Express e cria a pasta `node_modules`. Só precisa ser feito uma vez.

### 4. Subir a aplicação

```bash
npm start
```

O terminal deve mostrar `Servidor rodando em http://localhost:3000`. Abra esse endereço no navegador.

Para desligar o servidor, volte ao terminal e aperte **Ctrl + C**.

### 5. Rodar os testes

```bash
npm test
```

O resultado esperado é `pass 17` e `fail 0`.

### Problemas comuns

| Problema | Solução |
| --- | --- |
| A página mostra "Não foi possível falar com o servidor" | O servidor não está rodando. Rode `npm start` e abra http://localhost:3000 (abrir o `index.html` direto com dois cliques não funciona) |
| `Error: Cannot find module 'express'` | Faltou o `npm install` |
| `EADDRINUSE: address already in use :::3000` | Já existe um servidor rodando na porta 3000. Aperte Ctrl + C no outro terminal ou rode `fuser -k 3000/tcp` |
| `npm test` não encontra os testes | Confira se o Node é versão 18 ou mais recente com `node -v` |

## Estrutura

```
backend/
  servidor.js      Servidor Express: entrega a página e as rotas da API
  feed.js          Estado do feed e escolha do algoritmo
  score.js         Cálculo da nota de cada post
  ordenacao.js     Merge Sort e Insertion Sort
  dados/posts.js   Categorias e posts fictícios
frontend/
  index.html       Página
  css/style.css    Estilo
  js/app.js        Desenha a tela e conversa com a API
tests/
  ordenacao.test.js
  score.test.js
```

## API

| Método | Rota | O que faz |
| --- | --- | --- |
| GET | `/api/categorias` | Lista as categorias |
| GET | `/api/feed` | Estado atual do feed |
| POST | `/api/reiniciar` | Volta o feed ao início |
| POST | `/api/interesses/:categoria` | Marca ou desmarca um interesse (Merge Sort) |
| POST | `/api/curtidas/:id` | Curte ou descurte um post (Insertion Sort) |

## Integrantes

| Nome | Matrícula |
| --- | --- |
| Maria Eduarda Quaresma Andrade | 222037577 |
|  Beatriz Geane Santos Santos Lins | 222021844 |

## Vídeo de apresentação

Link: (adicionar)

## Slides da apresentação

[Abrir os slides (PDF)](docs/apresentacao.pdf)
