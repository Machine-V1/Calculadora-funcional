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
let operadorUnico = false;
let ultimoOperador = null;
let op = null;
function clickOperadores(operador) {
  switch (operador) {
    case "CE":
      inputDisplay.value = "";
    case "DEL":
      console.log(inputDisplay.value);
      inputDisplay.value = inputDisplay.value.slice(0, -1);
      
      break;
    case "C":
      arlClick = false;
      ultimoOperador = null;
      op = null;
      inputDisplay.value = "";
      upperDisplay.textContent = "";
      break;

    case "+":
      if (inputDisplay.value !== "" && arlClick == false) {
        op = parseFloat(inputDisplay.value.replace(/\D/g, "."));
        upperDisplay.textContent = inputDisplay.value + " " + operador;
        arlClick = true;
        zerar = true;
        jaOperou = false;
        ultimoOperador = operador;
      } else if (inputDisplay.value !== "" && arlClick == true) {

        inputDisplay.value = op + parseFloat(inputDisplay.value.replace(/\D/g, "."));
        inputDisplay.value = inputDisplay.value.replace(/\D/g, ",")

        
        upperDisplay.textContent = inputDisplay.value + " " + operador;
        jaOperou = false;
        operadorUnico = true;
        op = parseFloat(inputDisplay.value.replace(/\D/g, "."));
      }

      break;

    case "×":
      if (inputDisplay.value !== "" && arlClick == false) {
        op = parseFloat(inputDisplay.value.replace(/\D/g, "."));
        upperDisplay.textContent = inputDisplay.value + " " + operador;
        arlClick = true;
        zerar = true;
        jaOperou = false;
        ultimoOperador = operador;
      } else if (inputDisplay.value !== "" && arlClick == true) {
        console.log(parseFloat(inputDisplay.value.replace(/\D/g, ".")));

        inputDisplay.value = op * parseFloat(inputDisplay.value.replace(/\D/g, "."));
        inputDisplay.value = inputDisplay.value.replace(/\D/g, ",")

        upperDisplay.textContent = inputDisplay.value + " " + operador;
        jaOperou = false;
        operadorUnico = true;
        op = parseFloat(inputDisplay.value.replace(/\D/g, "."));
      }
      break;
    case "=":
      if (arlClick === true && inputDisplay.value !== "") {
        if (ultimoOperador === "+") {
          upperDisplay.textContent = op + " " + ultimoOperador + " " + inputDisplay.value + " = ";
          inputDisplay.value = op + parseFloat(inputDisplay.value.replace(/\D/g, "."));
          arlClick = false;
          jaOperou = true;
          ultimoOperador = operador;
        }
        if (ultimoOperador === "×") {
          upperDisplay.textContent = op + " " + ultimoOperador + " " + inputDisplay.value + " = ";
          inputDisplay.value = op * parseFloat(inputDisplay.value.replace(/\D/g, "."));
          inputDisplay.value = inputDisplay.value.replace(/\D/g, ",")
          arlClick = false;
          jaOperou = true;
          ultimoOperador = operador;
        }
      }
      break;
  }
}

function clickNumeros(numero) {
  if (jaOperou && !operadorUnico) {
    upperDisplay.textContent = "";
    inputDisplay.value = "";
    jaOperou = false;
  }
  if (zerar) {
    inputDisplay.value = "";
    zerar = false;
  }
  if (operadorUnico) {
    inputDisplay.value = "";
    operadorUnico = false;
  }

  inputDisplay.value += numero;
}
// adicionar outros operadores / aprender a otimizar o codigo