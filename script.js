const operadores = document.getElementsByClassName("operadores");
const numeros = document.getElementsByClassName("numeros");
const apagadores = document.getElementsByClassName("apagadores");
const btnIgual = document.getElementById("igual");
let upperDisplay = document.getElementById("upper-display");
const inputDisplay = document.getElementById("input-display");
inputDisplay.value = 0;
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
Array.from(apagadores).forEach((valor) => {
  valor.addEventListener("click", () => {
    clickApagadores(valor.textContent);
  });
});
// declarando as variaveis para a calc

// Adicionar um array de event so pra operadores avancados potenciao etc
// e armazenar esse valor e mostrar no display
let ultimoNumero = null;
let ultimoOperador = null;
let clickOperador = false;
let zerarDisplay = false;
let operouIgual = false;
//
function valorInputFloat() {
  return parseFloat(inputDisplay.value.replace(",", "."));
}
function valorToDisplay() {
  return inputDisplay.value.replace(".", ",");
}
function operar(op, a, b) {
  switch (op) {
    case "+":
      return a + b;
    case "×":
      return a * b;
    case "-":
      return a - b;
    case "÷":
      return a / b;
    
  }
}

function clickOperadores(operador) {
  if (operador == "=" && ultimoNumero) {
    upperDisplay.textContent =
      ultimoNumero + " " + ultimoOperador + " " + inputDisplay.value + " =";
    upperDisplay.textContent.replace(".", ",");
    inputDisplay.value = operar(
      ultimoOperador,
      valorInputFloat(),
      ultimoNumero
    );
    inputDisplay.value = valorToDisplay();
    clickOperador = false;
    operouIgual = true;
  } else if (clickOperador && operador == ultimoOperador) {
    inputDisplay.value = operar(operador, valorInputFloat(), ultimoNumero);
    inputDisplay.value = valorToDisplay();
    upperDisplay.textContent = inputDisplay.value + " " + operador;
    upperDisplay.textContent.replace(".", ",");
    zerarDisplay = true;
    clickOperador = false;
    operouIgual = false;
  } else if (
    ultimoOperador != operador &&
    clickOperador &&
    ultimoOperador != null
  ) {
    inputDisplay.value = operar(
      ultimoOperador,
      valorInputFloat(),
      ultimoNumero
    );
    inputDisplay.value = valorToDisplay();
    zerarDisplay = true;
    clickOperador = false;
    operouIgual = false;
  } else if (!clickOperador) {
    zerarDisplay = true;
    operouIgual = false;
  } else {
    ultimoOperador = operador;
    upperDisplay.textContent = inputDisplay.value + " " + operador;
    upperDisplay.textContent.replace(".", ",");
    operouIgual = false;
    zerarDisplay = true;
  }
  if (operador != "=") {
    upperDisplay.textContent = inputDisplay.value + " " + operador;
    upperDisplay.textContent.replace(".", ",");
    ultimoNumero = parseFloat(inputDisplay.value.replace(",", "."));
    ultimoOperador = operador;
  }
}
let initial = false;

function clickNumeros(numero) {
  if (!initial) {
    inputDisplay.value = "";
    inputDisplay.value += numero;
    initial = true;
  } else if (zerarDisplay) {
    inputDisplay.value = "";
    inputDisplay.value += numero;
    clickOperador = true;
    zerarDisplay = false;
  } else if (operouIgual) {
    inputDisplay.value = "";
    ultimoNumero = null;
    ultimoOperador = null;
    operouIgual = false;
    inputDisplay.value += numero;
    upperDisplay.textContent = "";
  } else {
    inputDisplay.value += numero;
  }
}
function clickApagadores(apagador) {
  switch (apagador) {
    case "C":
      inputDisplay.value = "0";
      upperDisplay.textContent = "";
      clickOperador = false;
      zerarDisplay = false;
      operouIgual = false;
      initial = false;
      break;

    case "CE":
      inputDisplay.value = "";

      break;
    case "DEL":
      inputDisplay.value = inputDisplay.value.slice(0, -1);
  }
}
