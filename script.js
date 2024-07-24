const temas = ["Animais", "Frutas", "Países"];

const animais = ["cachorro", "gato", "elefante", "girafa", "tigre"];
const frutas = ["maçã", "banana", "laranja", "uva", "morango"];
const paises = ["Brasil", "Estados Unidos", "França", "Japão", "Austrália"];

const palavras = [];
palavras.push(animais, frutas, paises);

// Função para traçar o título principal
function tracarTituloPrincipal() {
  let titulo = document.getElementById("main-title").querySelectorAll("span");

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

// Função para gerar os traços da palavra escolhida
function gerarTracoPalavraEscolhida(palavraEscolhida) {
  palavraEscolhida = "Estados Unidos"

  const wordContainer = document.getElementById("word-container");

  palavraEscolhida.split("").forEach(caracter => {
    const letterContainer = document.createElement("span");

    if(caracter !== " "){
      letterContainer.classList.add("game-page__letter-container")
    } else {
      letterContainer.classList.add("game-page__null-container")
    }

    wordContainer.appendChild(letterContainer)
  })
}

// Função para gerar o teclado virtual
function gerarTecladoVirtural(){
  const letras = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'Ç'
  ];

  const teclado = document.getElementById("keyboard");

  letras.forEach(letra => {
    const containerLetra = document.createElement("span");
    containerLetra.classList.add("game-page__keyboard-letter");
    containerLetra.innerHTML = letra;
    teclado.appendChild(containerLetra)
  })
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

  gerarTecladoVirtural()
});
