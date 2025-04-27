const operadores = document.getElementsByClassName("operadores");
const numeros = document.getElementsByClassName("numeros");
const btnIgual = document.getElementById("igual");

// adicionando eventos a todos os botoes
Array.from(operadores).forEach((valor, index) => {
  valor.addEventListener("click", () => {
    clickOperadores(valor.textContent);
  });
});
Array.from(numeros).forEach((valor) => {
  valor.addEventListener("click", () => {
    clickNumeros(valor.textContent);
  });
});

//

function clickOperadores(operador) {
  // deleta
  if(operador == 'DEL'){
    console.log(document.getElementById("input-display").value)
    document.getElementById("input-display").value = document.getElementById("input-display").value.slice(0,-1)
  }

  
}
function clickNumeros(numero) {
    document.getElementById("input-display").value += numero
}
