const temas = ["Animais", "Frutas", "Países"];

const animais = ["cachorro", "gato", "elefante", "girafa", "tigre"];
const frutas = ["maça", "banana", "laranja", "uva", "morango"];
const paises = ["brasil", "estados unidos", "frança", "japao", "australia"];

const palavras = [];
palavras.push(animais, frutas, paises);

let palavraEscolhida;
let palavraPreenchida;

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

  console.log(temas[indexTema]) //Auxilio, excluir depois
  console.log(palavras[indexTema][indexPalavra]) //Auxilio, excluir depois

  palavraEscolhida = palavras[indexTema][indexPalavra].split("");
}

// Função para gerar os traços da palavra escolhida
function gerarTracoPalavraEscolhida(){
  return palavraEscolhida.map(letra => {
    if(letra !== " "){
      return null;
    }
    return letra;
  });
}

// Função para validar a tecla selecionada
function validarTeclaSelecionada(teclaSelecionada){
  if(palavraEscolhida.includes(teclaSelecionada)){
    console.log("OK")  //Auxilio, excluir depois

    palavraEscolhida.forEach((letra, index) => {
      if(letra === teclaSelecionada){
        palavraPreenchida[index] = letra;
      }
    })
    console.log(palavraPreenchida);  //Auxilio, excluir depois
    atualizarTracoPalavraEscolhida() 
  } else{
    console.log("Errou...")  //Auxilio, excluir depois
  }
}

// Função para gerar os traços da palavra escolhida
function atualizarTracoPalavraEscolhida() {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  palavraPreenchida.forEach(caracter => {
    const letterContainer = document.createElement("span");
    letterContainer.innerHTML = caracter;

    if(caracter !== " "){
      letterContainer.classList.add("game-page__letter-container")

    } else {
      letterContainer.classList.add("game-page__null-container")
    }

    wordContainer.appendChild(letterContainer)
  })
}

// Função para gerar o teclado virtual
function gerarTecladoVirtual(teclado){
  const letras = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'ç'
];

  letras.forEach(letra => {
    const containerLetra = document.createElement("span");
    containerLetra.classList.add("game-page__keyboard-letter");
    containerLetra.innerHTML = letra;
    teclado.appendChild(containerLetra)
  })
}

// Função para capturar a tecla selecionada
function capturarTecla(teclado){
  const teclas = teclado.querySelectorAll("span");
  let teclaSelecionada;

  teclas.forEach(tecla => {
    tecla.addEventListener("click", (e)=> {
      teclaSelecionada = e.target.innerHTML;

      validarTeclaSelecionada(teclaSelecionada)
    });
  });
}

// Função para iniciar o jogo
function iniciarJogo() {
  const homePage = document.getElementById("home-page");
  const gamePage = document.getElementById("game-page");

  homePage.classList.toggle("hide-page"); // Esconde a página inicial

  gerarPalavraEscolhida(); 
  palavraPreenchida = gerarTracoPalavraEscolhida();
  atualizarTracoPalavraEscolhida()
}

// Função para atualizar o conteúdo da página
document.addEventListener("DOMContentLoaded", function () {
  const teclado = document.getElementById("keyboard");

  tracarTituloPrincipal();

  document.getElementById("btn").addEventListener("click", iniciarJogo);

  gerarTecladoVirtual(teclado) 
  capturarTecla(teclado);
});
