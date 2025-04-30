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

// declarando as variaveis para a calc

let jaOperou = false;
let operouIgual = false;
let ultimoNumero = null;
let ultimoOperador = null;

//
function valorInputFloat() {
  return parseFloat(inputDisplay.value.replace(",", "."));
}
function toDisplay() {
  return inputDisplay.value.replace(".", ",");
}
function operar(op, a, b) {
  switch (op) {
    case "+":
      return a + b;
    case "×":
      return a * b;
  }
}

function clickOperadores(operador) {
  switch (operador) {
    case "+":
      ultimoOperador = operador;
      if (inputDisplay.value && jaOperou) {
        inputDisplay.value = operar(operador, ultimoNumero, valorInputFloat());
        upperDisplay.textContent = inputDisplay.value + " " + operador;
        ultimoNumero = valorInputFloat();
        jaOperou = false;
      }
      break;
    case "×":
      ultimoOperador = operador;
      // problema aqui na ordem
      if (inputDisplay.value && jaOperou) {
        ultimoNumero = valorInputFloat();
        inputDisplay.value = operar(operador, ultimoNumero, valorInputFloat());
        upperDisplay.textContent = inputDisplay.value + " " + operador;
        jaOperou = false;
      }
      break;
    case "=":
      switch (ultimoOperador) {
        case "+":
          upperDisplay.textContent = ultimoNumero + " + " + inputDisplay.value + " =";
          inputDisplay.value = operar(ultimoOperador, ultimoNumero, valorInputFloat());
          operouIgual = true;
          jaOperou = false;
      }
      break;
  }
}
function clickNumeros(numero) {
  
  if (!jaOperou) {
    inputDisplay.value = "";
    jaOperou = true;
  }
  if (!jaOperou) {
    inputDisplay.value = "";
  }
  if (operouIgual) {
    upperDisplay.textContent = "";
    operouIgual = false;
    ultimoOperador = null;
    ultimoNumero = null;
  }

  inputDisplay.value += numero;
}
