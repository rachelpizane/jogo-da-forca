const temas = ["Animais", "Frutas", "Países"];

const animais = ["cachorro", "gato", "elefante", "girafa", "tigre"];
const frutas = ["maça", "banana", "laranja", "uva", "morango"];
const paises = ["brasil", "estados unidos", "frança", "japao", "australia"];

const palavras = [];
palavras.push(animais, frutas, paises);

let temaEscolhido;
let palavraEscolhida;
let palavraPreenchida;
let tentativas;

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

// Função para inserir a imagem do hangman
function iniciarImagemHangman(){
  const hangmanContainer = document.getElementById("hangman-container")
  
  hangmanContainer.innerHTML = "";

  hangmanContainer.innerHTML = `
    <svg width="199" height="227" viewBox="0 0 199 227" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="Image Hangman Game">
    <g id="hangman-2" >
    <path id="left-arm" class="game-page__hangman-game" d="M124.488 103L159.527 123.23" stroke="#23291F" stroke-width="8" stroke-linecap="round"/>
    <path id="right-arm" class="game-page__hangman-game" d="M159.488 123.23L194.527 103" stroke="#23291F" stroke-width="8" stroke-linecap="round"/>
    <path id="left-leg" class="game-page__hangman-game" d="M133.488 189.999L159.489 159" stroke="#23291F" stroke-width="8" stroke-linecap="round"/>
    <path id="right-leg" class="game-page__hangman-game" d="M159.488 159L185.488 190" stroke="#23291F" stroke-width="8" stroke-linecap="round"/>
    <path id="body" class="game-page__hangman-game" d="M159.488 107V159" stroke="#23291F" stroke-width="8" stroke-linecap="round"/>
    <circle id="head" class="game-page__hangman-game" cx="159.488" cy="80" r="23.5" stroke="#23291F" stroke-width="9"/>
    </g>
    <g id="hangman-1">
    <path id="Line 7" d="M4.47296 222.742H194.491" stroke="#23291F" stroke-width="8" stroke-linecap="round"/>
    <path id="Line 8" d="M36.4879 222L36.4879 4" stroke="#23291F" stroke-width="8" stroke-linecap="round"/>
    <path id="Line 9" d="M159.488 4L36.4878 4" stroke="#23291F" stroke-width="8" stroke-linecap="round"/>
    <path id="Line 12" d="M163.488 4C163.488 1.79086 161.697 0 159.488 0C157.279 0 155.488 1.79086 155.488 4L163.488 4ZM155.488 52V56H163.488V52H155.488ZM155.488 4V52H163.488V4L155.488 4Z" fill="#23291F"/>
    <path id="Line 11" d="M36.4879 4L61.4879 27" stroke="#23291F" stroke-width="8" stroke-linecap="round"/>
    <path id="Line 10" d="M87.4878 4L36.4878 54" stroke="#23291F" stroke-width="8" stroke-linecap="round"/>
    </g>
    </g>
    </svg>`

  const hangman = hangmanContainer.querySelectorAll(".game-page__hangman-game");
 
  hangman.forEach(parte => {
    parte.classList.toggle("hangman-game--visibility")
  })
}

// Função para atualizar a imagem do hangman de acordo com as tentativas
function atualizarImagemHangman(){
  const SVGElmentosID =  ["left-arm", "right-arm", "left-leg", "right-leg", "body", "head"];

  const parte = document.getElementById(SVGElmentosID[tentativas - 1])

  parte.classList.toggle("hangman-game--visibility")
  tentativas--
}

// Função para atualizar o placar 
function atualizarPlacar() {
  document.getElementById("score").innerHTML = tentativas;
}

//Função para incluir o tema escolhido na página
function incluirTema(){
  document.getElementById("tip").innerHTML =  temaEscolhido;
}

// Função para gerar um número aleatório
function gerarNumeroAleatorio(largura) {
  return Math.floor(Math.random() * largura);
}

// Função para gerar um tema aleatório
function gerarTema() {
  const indexTema = gerarNumeroAleatorio(temas.length)
  temaEscolhido = temas[indexTema] 
  return indexTema;
}

// Função para gerar uma palavra aleatória
function gerarPalavraEscolhida() {
  const indexTema = gerarTema(); //Gera um número aleatório para escolher o tema
  const indexPalavra = gerarNumeroAleatorio(palavras[indexTema].length); // Gera um número aleatório para escolher a palavra

  console.log(temas[indexTema]) //Auxilio, excluir depois
  console.log(palavras[indexTema][indexPalavra]) //Auxilio, excluir depois

  palavraEscolhida = palavras[indexTema][indexPalavra].split(""); //Transforma a palavra escolhida aleatoriamente em um array
}

// Função para gerar os traços sem nenhum caracter preenchido da palavra escolhida
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
        palavraPreenchida[index] = letra; //Preenche a palavra escolhida com a letra correta
      }
    }) 
    console.log(palavraPreenchida);  //Auxilio, excluir depois
    atualizarTracoPalavraEscolhida() 
  } else{
    console.log("Errou...")  //Auxilio, excluir depois
    atualizarImagemHangman();
    atualizarPlacar()
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
function gerarTecladoVirtual(){
  const teclado = document.getElementById("keyboard");
  teclado.innerHTML = "";

  const letras = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'ç'
  ];

  letras.forEach(letra => {
    const containerLetra = document.createElement("button");

    containerLetra.classList.add("game-page__keyboard-key");
    containerLetra.innerHTML = letra;
    containerLetra.removeAttribute("disabled")

    teclado.appendChild(containerLetra)
  })

  capturarTecla(teclado);
}

// Função para capturar a tecla selecionada
function capturarTecla(teclado){
  const teclas = teclado.querySelectorAll("button");

  teclas.forEach(tecla => {
    tecla.addEventListener("click", (e) => {
      let teclaSelecionada = tecla.innerHTML;

      validarTeclaSelecionada(teclaSelecionada)
      tecla.setAttribute("disabled", "true") // Desabilita a tecla selecionada
      tecla.classList.toggle("keyboard-letter--disabled")
    });
  });
  
}

// Função para atualizar a página do jogo
function atualizarPagina(){
  const homePage = document.getElementById("home-page");

  if(!homePage.classList.contains("page--hidden")){
    homePage.classList.toggle("page--hidden"); // Esconde a página inicial
  }

  gerarTecladoVirtual();
  iniciarImagemHangman();
}

// Função para iniciar o jogo
function iniciarJogo(){
  atualizarPagina()

  tentativas = 6;
  atualizarPlacar() 
  gerarPalavraEscolhida(); // Gera a palavra escolhida aleatoriamente
  palavraPreenchida = gerarTracoPalavraEscolhida(); // Inicializa com a palavra vazia
  atualizarTracoPalavraEscolhida() 
  incluirTema()
}

// Função para atualizar o conteúdo da página
document.addEventListener("DOMContentLoaded", function () {
  tracarTituloPrincipal();

  document.getElementById("start-btn").addEventListener("click", iniciarJogo);

  document.getElementById("restart-btn").addEventListener("click", iniciarJogo);
});
