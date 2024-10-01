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
  new Tema("animais", ["cachorro", "gato", "elefante", "girafa", "tigre"]),
  new Tema("frutas", ["maça", "banana", "laranja", "uva", "morango"]),
  new Tema("países", ["brasil", "estados unidos", "frança", "japao", "australia"]),
]

let temaAleatorio;
let palavraAleatoria;
let palavraPreenchida;

let qntdTentativas;
let qntdLetrasEscolhidas;
let qntdLetrasCorretas;

// Função que gera traços abaixo do título principal //OK
function gerarTracosTituloPrincipal() {
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

// Função para atualizar a imagem do hangman de acordo com as tentativas // OK
function atualizarImagemHangman() {
  const SVGElmentosID = ["left-arm","right-arm","left-leg","right-leg","body","head"];

  const parte = document.getElementById(SVGElmentosID[qntdTentativas]);
  parte.classList.toggle("hangman-game--visibility");
}

// Função para atualizar o placar
function atualizarPlacar() {
  document.getElementById("score").innerHTML = qntdTentativas;
}

// Função para atualizar exibicação da mensagem de resultado
function atualizarMensagemResultado(){
  const gameMessage = document.getElementById("game-message")
  const messageCard = document.getElementById("message-card")

  gameMessage.classList.toggle("message--visibility-hidden")
  messageCard.classList.toggle("card--expand")
}

// Função para atualizar os elementos da mensagem de acordo com o resultado
function atualizarElementosMensagemResultado(resultado){
  function adicionarElementos(tituloResultado, imagem, altImagem, classePolygon){
    //Função auxiliar para adicionar os elementos 
    messageTitle.innerText = tituloResultado
    messageImg.src = imagem
    messageImg.alt = altImagem
    messagePolygon.classList.add(classePolygon)
  }

  const messageTitle = document.getElementById("message-title")
  const messageImg = document.getElementById("message-img")
  const messagePolygon = document.getElementById("message-polygon")

  atualizarMensagemResultado()
  messagePolygon.classList.remove("polygon--lose", "polygon--win")

  if(resultado){
    adicionarElementos("Você ganhou!", "img/trophy-icon.svg", "trophy icon", "polygon--win")

  } else {
    adicionarElementos("Você perdeu...", "img/sad-face-icon.svg", "sad face icon", "polygon--lose")
  }
}

// Função para verificar se o jogador ganhou ou perdeu
function verificarStatusPontuacao() {
  if (qntdTentativas == 0) {
    console.log("Você perdeu..."); //Auxilio, excluir depois
    atualizarElementosMensagemResultado(false)
  } else if (qntdLetrasCorretas === qntdLetrasEscolhidas) {
    console.log("Você ganhou!!"); //Auxilio, excluir depois
    atualizarElementosMensagemResultado(true)
  }
}

//Função para incluir o tema escolhido na página //OK
function incluirTema() {
  
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

// Função para gerar os traços sem nenhum caracter preenchido da palavra escolhida
function gerarTracopalavraAleatoria() {
  return palavraAleatoria.map((letra) => {
    if (letra !== " ") {
      return null;
    }
    return letra;
  });
}

// Função para validar a tecla selecionada
function validarTeclaSelecionada(teclaSelecionada) {
  if (palavraAleatoria.includes(teclaSelecionada)) {
    //Preenche a palavra escolhida com a letra correta
    palavraAleatoria.forEach((letra, index) => {
      if (letra === teclaSelecionada) {
        palavraPreenchida[index] = letra;
        qntdLetrasCorretas++;
      }
    });

    console.log(palavraPreenchida); //Auxilio, excluir depois
    atualizarTracopalavraAleatoria();
  } else {
    --qntdTentativas;
    atualizarImagemHangman();
    atualizarPlacar();
  }
  console.log(
    qntdLetrasEscolhidas + " - " + qntdLetrasCorretas + " - " + qntdTentativas
  ); //Auxilio, excluir depois
  verificarStatusPontuacao();
}

// Função para gerar os traços da palavra escolhida
function atualizarTracopalavraAleatoria() {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  palavraPreenchida.forEach((caracter) => {
    const letterContainer = document.createElement("span");
    letterContainer.innerHTML = caracter;

    if (caracter !== " ") {
      letterContainer.classList.add("game-page__letter-container");
    } else {
      letterContainer.classList.add("game-page__null-container");
    }

    wordContainer.appendChild(letterContainer);
  });
}

// Função para gerar o teclado virtual
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
    const containerLetra = document.createElement("button");

    containerLetra.classList.add("game-page__keyboard-key");
    containerLetra.innerHTML = letra;
    containerLetra.removeAttribute("disabled");

    teclado.appendChild(containerLetra);
  });

  capturarTecla(teclado);
}

// Função para capturar a tecla selecionada
function capturarTecla(teclado) {
  const teclas = teclado.querySelectorAll("button");

  teclas.forEach((tecla) => {
    tecla.addEventListener("click", (e) => {
      validarTeclaSelecionada(tecla.innerHTML);

      tecla.setAttribute("disabled", "true"); // Desabilita a tecla selecionada
      tecla.classList.toggle("keyboard-key--disabled");
    });
  });
}

// Função para atualizar a exibição da pagina inicial //Em construção, adaptando de acordo com a versão desktop.
function atualizarPaginaInicial(){
  const homePage = document.getElementById("home-page");
  const tamanhoTela = window.innerWidth

  if (tamanhoTela < 1150){
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
 
  incluirTema();
  gerarTecladoVirtual();
  atualizarPlacar();
  iniciarImagemHangman();

  palavraPreenchida = gerarTracopalavraAleatoria(); // Inicializa com a palavra vazia
  console.log(palavraPreenchida)
  atualizarTracopalavraAleatoria();
}

// Função para atualizar o conteúdo da página
document.addEventListener("DOMContentLoaded", function() {
  gerarTracosTituloPrincipal();
  

  document.getElementById("start-btn").addEventListener("click", function(){
    atualizarPaginaInicial();
    iniciarJogo();
  });

  document.getElementById("restart-btn").addEventListener("click", iniciarJogo);

  document.getElementById("message-restart-btn").addEventListener("click", () => {
    atualizarMensagemResultado()
    iniciarJogo();
  });

  document.getElementById("message-home-page-btn").addEventListener("click", () => {
    atualizarPaginaInicial();
    setTimeout(() => {
      atualizarMensagemResultado()
    },400);
  });
});
