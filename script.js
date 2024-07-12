const tema = ["Animais", "Frutas", "Países"];

const animais = ["cachorro", "gato", "elefante", "girafa", "tigre"];
const frutas = ["maçã", "banana", "laranja", "uva", "morango"];
const paises = ["Brasil", "Estados Unidos", "França", "Japão", "Austrália"];




// Eu faço um script para funções conectadas a página??...
// Função para traçar o título principal
function tracarTituloPrincipal() {
  const titulo = document.getElementById("main-title").children;

  for (let i = 0; i < titulo.length; i++) {
    const parteTitulo = titulo[i].innerHTML;
    titulo[i].innerHTML = "";

    for (let j = 0; j < parteTitulo.length; j++) {
      const span = document.createElement("span");

      if (parteTitulo[j] == " ") {
        span.innerHTML = parteTitulo[j];

      } else {
        span.classList.add("main-title-letter--tracado");
        span.innerHTML = parteTitulo[j];

      }
      titulo[i].appendChild(span);
    }
  }
}

// Função para atualizar o conteúdo da página
document.addEventListener("DOMContentLoaded", function(){
  tracarTituloPrincipal()
})
