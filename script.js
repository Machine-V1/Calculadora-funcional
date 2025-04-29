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
let clickOperador = false;
let jaOperou = false;
let ultimoNumero = null;

//
function valorInputFloat() {
  return parseFloat(inputDisplay.value.replace(",", "."));
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
      if (inputDisplay.value && !clickOperador && !jaOperou) {
        upperDisplay.textContent = inputDisplay.value + " " + operador;
        ultimoNumero = valorInputFloat();
        clickOperador = true;
        jaOperou = true;
      } else if (inputDisplay.value && jaOperou) {
        inputDisplay.value = operar(operador, ultimoNumero, valorInputFloat());
        upperDisplay.textContent = inputDisplay.value + " " + operador;
        ultimoNumero = valorInputFloat();
        clickOperador = true;
        jaOperou = false;
      } // NAO FUNCIONA ESSA BOSTA
  }
}
function clickNumeros(numero) {
  if (clickOperador) {
    inputDisplay.value = "";
    clickOperador = false;
  }
  inputDisplay.value += numero;
  // parseFloat(inputDisplay.value.replace(/\D/g, ".")) += numero
}
