class Tema {
  constructor(tema, palavras){
    this.tema = tema;
    this.palavras = palavras;
  }

  gerarPalavraAleatoria = () => {
    const index = Math.floor(Math.random() * this.palavras.length)
    return this.palavras[index]
  }
}

let temas = [
  new Tema("animais", ["cachorro", "gato", "elefante", "girafa", "leao", "tigre", "macaco", "passaro", "peixe", "cobra", "rato", "cavalo", "vaca", "ovelha", "porco"]),
  new Tema("frutas", ['maca', 'banana', 'laranja', 'uva', 'morango', 'abacaxi', 'pera', 'melao', 'mamao', 'kiwi', 'limao', 'manga', 'figo', 'cereja']),
  new Tema("países", ["brasil", "china", "estados unidos", "russia", "india", "angola", "alemanha", "frança", "espanha", "japao", "australia", "canada", "mexico", "egito", "argentina"]),
]

let temaAleatorio;
let palavraAleatoria;
let palavraPreenchida;

let qntdTentativas;
let qntdLetrasEscolhidas;
let qntdLetrasCorretas;

// Função que gera traços abaixo do título principal //OK
function exibirTracosTituloPrincipal() {
  const tituloPrincipal = document.getElementById("main-title").querySelectorAll("span");

  tituloPrincipal.forEach((parteTitulo) => {
    const parteTituloCopia = parteTitulo.innerHTML;
    parteTitulo.innerHTML = "";

    for (let i = 0; i < parteTituloCopia.length; i++) {
      const span = document.createElement("span");

      if (parteTituloCopia[i] !== " ") {
        span.classList.add("main-title-letter--dashed");
      } 

      span.innerHTML = parteTituloCopia[i];

      parteTitulo.appendChild(span);
    }
  });
}

// Função para inserir a imagem inicial do hangman //OK
function iniciarImagemHangman() {
  const hangmanContainer = document.getElementById("hangman-container");

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
    </svg>`;

  const hangman = hangmanContainer.querySelectorAll(".game-page__hangman-game");
  
  hangman.forEach((parte) => {
    parte.classList.toggle("hangman-game--visibility");
  });
}

// Função para atualizar a imagem do hangman de acordo com as tentativas //OK
function atualizarImagemHangman() {
  const SVGElmentosID = ["left-arm","right-arm","left-leg","right-leg","body","head"];

  const parte = document.getElementById(SVGElmentosID[qntdTentativas]);
  parte.classList.toggle("hangman-game--visibility");
}

// Função para atualizar o placar //OK
function atualizarPlacar() {
  document.getElementById("score").innerHTML = qntdTentativas;
}

// Função para atualizar exibição da mensagem de resultado //OK
function atualizarExibicaoMensagemResultado(){ 
  document.getElementById("game-message").classList.toggle("message--visibility-hidden")
  document.getElementById("message-card").classList.toggle("card--expand")
}

// Função para atualizar os elementos da mensagem de acordo com o resultado //OK
function atualizarElementosMensagemResultado(resultado){
  function adicionarElementos(tituloResultado, imagem, altImagem, classePolygon){
    //Função auxiliar para adicionar os elementos na mensagem
    messageTitle.innerText = tituloResultado
    messageImg.src = imagem
    messageImg.alt = altImagem
    messagePolygon.classList.add(classePolygon)
  }

  const messageTitle = document.getElementById("message-title")
  const messageImg = document.getElementById("message-img")
  const messagePolygon = document.getElementById("message-polygon")

  messagePolygon.classList.remove("polygon--lose", "polygon--win")

  if(resultado){
    adicionarElementos("Você ganhou!", "img/trophy-icon.svg", "trophy icon", "polygon--win")

  } else {
    adicionarElementos("Você perdeu...", "img/sad-face-icon.svg", "sad face icon", "polygon--lose")
  }

  atualizarExibicaoMensagemResultado()
}

// Função para verificar se o jogador ganhou ou perdeu //OK
function verificarStatusResultado() {
  if (qntdTentativas == 0) {
    atualizarElementosMensagemResultado(false)

  } else if (qntdLetrasCorretas === qntdLetrasEscolhidas) {
    atualizarElementosMensagemResultado(true)

  }
}

//Função para incluir o tema escolhido na página //OK
function exibirTema() {
  
  document.getElementById("tip").innerHTML = temaAleatorio;
}

// Função para gerar um tema e uma palavra aleatória //OK
function gerarTemaPalavraAleatoria() {
  const index = Math.floor(Math.random() * temas.length);

  temaAleatorio = temas[index].tema
  palavraAleatoria = temas[index].gerarPalavraAleatoria().split('')
}

// Função para somar a quantidade de letras da palavra aleatória //OK
function somarQuantidadeLetrasAleatorias() {
  return palavraAleatoria.reduce((acc, letra) => letra != " " ? ++acc : acc ,0)
}

// Função para iniciar a palavra que será preenchida ao longo do jogo //OK
function iniciarPalavraPreenchida() {
  return palavraAleatoria.map(char => {
    if (char == " ") {
      return char
    }

    return null
  });
}

// Função para atualizar a exibição da palavra preenchida na tela //OK
function atualizarExibicaoPalavraPreenchida() {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  palavraPreenchida.forEach((char) => {
    const letterContainer = document.createElement("span");
    letterContainer.innerHTML = char;

    if (char !== " ") {
      letterContainer.classList.add("game-page__letter-container");
    } else {
      letterContainer.classList.add("game-page__null-container");
    }

    wordContainer.appendChild(letterContainer);
  });
}

// Função para verificar se a tecla selecionada é uma das letras existente da palavra aleatória definida. //OK
function verificarTeclaSelecionada(teclaSelecionada) {
  if (palavraAleatoria.includes(teclaSelecionada)) {
    palavraAleatoria.forEach((letra, index) => {
      //Preenche a palavra aleatoria definida com a letra selecionada.
      if (letra === teclaSelecionada) {
        palavraPreenchida[index] = letra;
        ++qntdLetrasEscolhidas;

      }
    });

    atualizarExibicaoPalavraPreenchida();

  } else {
    --qntdTentativas;
    atualizarImagemHangman();
    atualizarPlacar();

  }

  verificarStatusResultado();

}

// Função para incluir evento de click no teclado virtual que desabilita a tecla selecionada e verifica se a letra é a correta ou não. //OK
function incluirEventoClickTeclado(teclado) {
  teclado = teclado.querySelectorAll("button");

  teclado.forEach((tecla) => {
    tecla.addEventListener("click", (e) => {
      tecla.setAttribute("disabled", "true");
      tecla.classList.add("keyboard-key--disabled");

      verificarTeclaSelecionada(tecla.innerHTML)
    });
  });
}

// Função para gerar o teclado virtual //OK
function gerarTecladoVirtual() {
  const teclado = document.getElementById("keyboard");
  teclado.innerHTML = "";

  const letras = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "ç",
  ];

  letras.forEach((letra) => {
    const tecla = document.createElement("button");

    tecla.classList.add("game-page__keyboard-key");
    tecla.innerHTML = letra;

    teclado.appendChild(tecla);
  });

  incluirEventoClickTeclado(teclado);
}

// Função para atualizar a página inicial de acordo com a largura da tela //OK
function atualizarPaginaInicial(){
  const homePage = document.getElementById("home-page");

  if (window.innerWidth < 1150){
    homePage.classList.toggle("page--move-up")

  } else {
    homePage.classList.toggle("page--visibility-hidden")

  }
}

// Função para iniciar o jogo
function iniciarJogo() {
  gerarTemaPalavraAleatoria()
  
  qntdTentativas = 6;
  qntdLetrasEscolhidas = 0;
  qntdLetrasCorretas = somarQuantidadeLetrasAleatorias();
 
  exibirTema();
  gerarTecladoVirtual();
  atualizarPlacar();
  iniciarImagemHangman();

  palavraPreenchida = iniciarPalavraPreenchida();
  atualizarExibicaoPalavraPreenchida();
}

// Função para atualizar o conteúdo da página
document.addEventListener("DOMContentLoaded", function() {
  exibirTracosTituloPrincipal();
  

  document.getElementById("start-btn").addEventListener("click", function(){
    atualizarPaginaInicial();
    iniciarJogo();
  });

  document.getElementById("restart-btn").addEventListener("click", iniciarJogo);

  document.getElementById("message-restart-btn").addEventListener("click", () => {
    atualizarExibicaoMensagemResultado()
    iniciarJogo();
  });

  document.getElementById("message-home-page-btn").addEventListener("click", () => {
    atualizarPaginaInicial();
    setTimeout(() => {
      atualizarExibicaoMensagemResultado()
    },400);
  });
});
