const tema = ["Animais", "Frutas", "Países"];

const animais = ["cachorro", "gato", "elefante", "girafa", "tigre"];
const frutas = ["maçã", "banana", "laranja", "uva", "morango"];
const paises = ["Brasil", "Estados Unidos", "França", "Japão", "Austrália"];




// Eu faço um script para funções conectadas a página??...
// Função para traçar o título principal
function tracarTituloPrincipal() {
  let  titulo = document.getElementById("main-title");
  titulo = titulo.querySelectorAll("span");

  titulo.forEach(parteTitulo => {
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
    };
  });
}


function iniciarJogo(){
  const homePage = document.getElementById("home-page");
  const gamePage = document.getElementById("game-page");
  
  homePage.classList.toggle("hide-page");
}

// Função para atualizar o conteúdo da página
document.addEventListener("DOMContentLoaded", function(){
  tracarTituloPrincipal()
  
  document.getElementById("btn").addEventListener("click", iniciarJogo)
})
