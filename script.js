const operadores = document.getElementsByClassName("operadores");
const numeros = document.getElementsByClassName("numeros");
const btnIgual = document.getElementById("igual");
let upperDisplay = document.getElementById("upper-display")
const inputDisplay = document.getElementById("input-display")
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
let seila = false
let jaOperou = false
let ultimoOperador = null;
let op = null;
function clickOperadores(operador) {
  
  // deleta
  if (operador == "DEL") {
    console.log(document.getElementById("input-display").value);
    document.getElementById("input-display").value = document.getElementById("input-display").value.slice(0, -1);
    upperDisplay.textContent = ""
  }
  // zera
  if(operador == "C"){
    arlClick = false;
    ultimoOperador = null;
    op = null;
    document.getElementById("input-display").value = ""
    upperDisplay.textContent = ""

  }

  if (document.getElementById("input-display").value != "" && operador == "+") {
    op = parseInt(document.getElementById("input-display").value);
    upperDisplay.textContent = document.getElementById("input-display").value + " " +operador
    arlClick = true;
    ultimoOperador = operador;
  }

  //
  if (operador == "=" && arlClick == true && document.getElementById("input-display").value!="") {
    if ((ultimoOperador == "+")) {
      upperDisplay.textContent = op+" "+ultimoOperador+" "+document.getElementById("input-display").value
      document.getElementById("input-display").value = op + parseInt(document.getElementById("input-display").value);
      arlClick = false;
      jaOperou = true
      ultimoOperador = operador;
    }
  }
}
function clickNumeros(numero) {
  
  if(jaOperou == true){
    upperDisplay.textContent=""
    document.getElementById("input-display").value = ""
    jaOperou = false
    
  }
  document.getElementById("input-display").value += numero;
  
}
