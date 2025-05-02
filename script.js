const operadores = document.getElementsByClassName("operadores");
const numeros = document.getElementsByClassName("numeros");
const apagadores = document.getElementsByClassName("apagadores");
const operadoresAvancados = document.getElementsByClassName(
  "operadores-avancado"
);
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
Array.from(operadoresAvancados).forEach((valor) => {
  valor.addEventListener("click", () => {
    clickOperadoresAvancados(valor.textContent);
  });
});
// declarando as variaveis para a calc

// Adicionar um array de event so pra operadores avancados potenciao etc
// e armazenar esse valor e mostrar no display
let ultimoNumero = null;
let ultimoOperador = null;
let numeroParaInversao = null;
let globalOperador = "";
let clickOperador = false;
let zerarDisplay = false;
let operouIgual = false;
let porcentagem = false;

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
      return b - a;
    case "÷":
      return b / a;
    case "%":
      return (a * b) / 100;
    case "1/x":
      return 1 / a;
    case "x²":
      return a ** 2;
    case "√x":
      return a ** (1 / 2);
    case "+/-":
      if (a > 0) {
        return -a;
      } else return a * -1;
  }
}
console.log(operar("+/-", 100));
function clickOperadores(operador) {
  console.log(operador);
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
    console.log("valor do input: " + valorInputFloat());
    console.log(ultimoOperador);
    console.log("ultimo numero " + ultimoNumero);

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
    porcentagem = true;
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
  globalOperador = operador;
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
      numeroParaInversao = null;
      clickOperador = false;
      zerarDisplay = false;
      operouIgual = false;
      initial = false;
      porcentagem = false;
      break;

    case "CE":
      inputDisplay.value = "";

      break;
    case "DEL":
      inputDisplay.value = inputDisplay.value.slice(0, -1);
  }
}
function clickOperadoresAvancados(operadorAvancado) {
  // % 1/x x² √x

  switch (operadorAvancado) {
    case "%":
      if (porcentagem) {
        inputDisplay.value = operar(
          operadorAvancado,
          ultimoNumero,
          valorInputFloat()
        );
        inputDisplay.value = valorToDisplay();
        upperDisplay.textContent =
          ultimoNumero + " " + ultimoOperador + " " + inputDisplay.value;
        upperDisplay.textContent.replace(".", ",");
        clickOperador = true;
      }
      break;
    case "1/x":
      if (initial) {
        numeroParaInversao = valorInputFloat();

        inputDisplay.value = operar(operadorAvancado, valorInputFloat());
        inputDisplay.value = valorToDisplay();

        if (ultimoNumero && !operouIgual) {
          upperDisplay.textContent = `${ultimoNumero} ${globalOperador} 1/(${numeroParaInversao})`;

          clickOperador = true;
          operouIgual = true;
        } else {
          upperDisplay.textContent = `1/(${inputDisplay.value})`;
        }

        upperDisplay.textContent.replace(".", ",");
      }
      break;
    case "x²":
      if (initial) {
        numeroParaInversao = valorInputFloat();

        inputDisplay.value = operar(operadorAvancado, valorInputFloat());
        inputDisplay.value = valorToDisplay();

        if (ultimoNumero && !operouIgual) {
          upperDisplay.textContent = `${ultimoNumero} ${globalOperador} sqr(${numeroParaInversao})`;

          clickOperador = true;
        } else {
          upperDisplay.textContent = `sqr(${inputDisplay.value})`;
        }

        upperDisplay.textContent.replace(".", ",");
      }
      break;
    case "√x":
      if (initial) {
        numeroParaInversao = valorInputFloat();

        inputDisplay.value = operar(operadorAvancado, valorInputFloat());
        inputDisplay.value = valorToDisplay();

        if (ultimoNumero && !operouIgual) {
          upperDisplay.textContent = `${ultimoNumero} ${globalOperador} √(${numeroParaInversao})`;

          clickOperador = true;
        } else {
          upperDisplay.textContent = `√(${inputDisplay.value})`;
        }

        upperDisplay.textContent.replace(".", ",");
      }
      break;
    case "+/-":
      if (initial) {
        inputDisplay.value = operar(operadorAvancado, valorInputFloat());
        inputDisplay.value = valorToDisplay();
      }
  }
}
