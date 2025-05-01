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

// Map de true e false com chaves tipo + - x 1/x
// logica 1 - Armazenar 2- calcular
let ultimoNumero = null;
let ultimoOperador = null;
let clickOperador = false;
let zerarDisplay = false;
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
function operarCasoIgual() {
  upperDisplay.textContent = ultimoNumero + " + " + inputDisplay.value + " =";
  toDisplay();
}

function clickOperadores(operador) {
  if (operador == "=" && ultimoNumero) {
    console.log("ingual");
  } else if (clickOperador && operador == ultimoOperador) {
    inputDisplay.value = operar(operador, valorInputFloat(), ultimoNumero);
    upperDisplay.textContent = inputDisplay.value + " " + operador;
    zerarDisplay = true;
    clickOperador = false;
  } else if (ultimoOperador != operador && clickOperador) {
    inputDisplay.value = operar(
      ultimoOperador,
      valorInputFloat(),
      ultimoNumero
    );
    zerarDisplay = true;
    clickOperador = false;
  } else if (!clickOperador) {
    zerarDisplay = true;
  } else {
    ultimoOperador = operador;
    upperDisplay.textContent = inputDisplay.value + " " + operador;
    zerarDisplay = true;
  }
  upperDisplay.textContent = inputDisplay.value + " " + operador;
  ultimoNumero = parseFloat(inputDisplay.value.replace(",", "."));
  ultimoOperador = operador;
}
let initial = false;
function clickNumeros(numero) {
  if (inputDisplay.value == "0" && !initial) {
    inputDisplay.value = "";
    inputDisplay.value += numero;
    initial = true;
  } else if (zerarDisplay) {
    inputDisplay.value = "";
    inputDisplay.value += numero;
    clickOperador = true;
    zerarDisplay = false;
  } else {
    inputDisplay.value += numero;
  }
}
function clickApagadores(apagador) {
  switch (apagador) {
    case "C":
      inputDisplay.value = "";
      upperDisplay.textContent = "";
      clickOperador = false;
      zerarDisplay = false;
      break;

    case "CE":
      inputDisplay.value = "0";
      break;
    case "DEL":
      inputDisplay.value = inputDisplay.value.slice(0, -1);
  }
}
