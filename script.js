const temas = ["Animais", "Frutas", "Países"];

const animais = ["cachorro", "gato", "elefante", "girafa", "tigre"];
const frutas = ["maçã", "banana", "laranja", "uva", "morango"];
const paises = ["Brasil", "Estados Unidos", "França", "Japão", "Austrália"];

const palavras = [];
palavras.push(animais, frutas, paises);

// Função para traçar o título principal
function tracarTituloPrincipal() {
  let titulo = document.getElementById("main-title");
  titulo = titulo.querySelectorAll("span");

  titulo.forEach((parteTitulo) => {
    const palavra = parteTitulo.innerHTML;
    parteTitulo.innerHTML = "";

    for (let j = 0; j < palavra.length; j++) {
      const span = document.createElement("span");

      if (palavra[j] == " ") {
        span.innerHTML = palavra[j];
      } else {
        span.classList.add("main-title-letter--dashed");
        span.innerHTML = palavra[j];
      }
      parteTitulo.appendChild(span);
    }
  });
}

// Função para gerar um número aleatório
function gerarNumeroAleatorio(largura) {
  return Math.floor(Math.random() * largura);
}

// Função para gerar um tema aleatório
function gerarTema() {
  return gerarNumeroAleatorio(temas.length);
}

/* Não to satisfeita, acho que é possivel transformar isso em um objeto, pensar nisso.*/
// Função para gerar uma palavra aleatória
function gerarPalavraEscolhida() {
  const indexTema = gerarTema();
  const indexPalavra = gerarNumeroAleatorio(palavras[indexTema].length);
  console.log(palavras[indexTema][indexPalavra])
  return palavras[indexTema][indexPalavra];
}

// Em andamento:
function gerarTracoPalavraEscolhida(palavraEscolhida) {
  const container = document.getElementById("container");

  for (let i = 0; i < palavraEscolhida.length; i++) {
    const span = document.createElement("span");

    if(palavraEscolhida[i] != ""){
      span.classList.add("container--dashed");
    } 
    container.appendChild(span);

  }
}

// Função para iniciar o jogo
function iniciarJogo() {
  const homePage = document.getElementById("home-page");
  const gamePage = document.getElementById("game-page");

  homePage.classList.toggle("hide-page"); // Esconde a página inicial
  const palavraEscolhida = gerarPalavraEscolhida(); // Gera uma palavra aleatória
  gerarTracoPalavraEscolhida(palavraEscolhida);
}

// Função para atualizar o conteúdo da página
document.addEventListener("DOMContentLoaded", function () {
  tracarTituloPrincipal();

  document.getElementById("btn").addEventListener("click", iniciarJogo);
});
