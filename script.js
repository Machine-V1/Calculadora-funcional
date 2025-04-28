const operadores = document.getElementsByClassName("operadores");
const numeros = document.getElementsByClassName("numeros");
const btnIgual = document.getElementById("igual");
let upperDisplay = document.getElementById("upper-display");
const inputDisplay = document.getElementById("input-display");
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
let arlClick = false;
let zerar = false;
let jaOperou = false;
let ultimoOperador = null;
let op = null;
function clickOperadores(operador) {
  switch (operador) {
    case "DEL":
      console.log(inputDisplay.value);
      inputDisplay.value = inputDisplay.value.slice(0, -1);
      upperDisplay.textContent = "";
      break;

    case "C":
      arlClick = false;
      ultimoOperador = null;
      op = null;
      inputDisplay.value = "";
      upperDisplay.textContent = "";
      break;

    case "+":
      if (inputDisplay.value !== "") {
        op = parseInt(inputDisplay.value);
        upperDisplay.textContent = inputDisplay.value + " " + operador;
        arlClick = true;
        zerar = true;
        ultimoOperador = operador;
      }
      // adiconar pra somar aqui mesmo se arlclick = true
      break;

    case "=":
      if (arlClick === true && inputDisplay.value !== "") {
        if (ultimoOperador === "+") {
          upperDisplay.textContent = op + " " + ultimoOperador + " " + inputDisplay.value + " = ";
          inputDisplay.value = op + parseInt(inputDisplay.value);
          arlClick = false;
          jaOperou = true;
          ultimoOperador = operador;
        }
      }
      break;

    default:
      // Se quiser tratar outros operadores depois
      break;
  }
}

function clickNumeros(numero) {
  if (jaOperou == true) {
    upperDisplay.textContent = "";
    inputDisplay.value = "";
    jaOperou = false;
  }
  if (zerar == true) {
    inputDisplay.value = "";

    zerar = false;
  }
  inputDisplay.value += numero;
}
