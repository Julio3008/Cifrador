const alfabeto = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "Ñ",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

// Elementos del DOM
const inputOriginal = document.getElementById("input-original");
const cifrador = document.getElementById("cifrador");
const resultado = document.getElementById("resultado");
const rango = document.getElementById("rango");
const rangoValor = document.querySelector(".rango o");

// Inicializar
document.addEventListener("DOMContentLoaded", () => {
  inputOriginal.focus();

  // Actualizar el valor del rango al cargar la página
  rangoValor.textContent = rango.value;

  // Actualizar el valor del rango cuando cambie
  rango.addEventListener("input", () => {
    rangoValor.textContent = rango.value;
  });
});

// Función principal para cifrar el mensaje
const shifMessage = () => {
  // Limpiar resultado anterior
  resultado.innerHTML = "";

  // Si no hay texto, mostrar mensaje
  if (!inputOriginal.value.trim()) {
    const emptyMessage = document.createElement("span");
    emptyMessage.textContent = "Ingresa un texto para cifrar";
    emptyMessage.style.opacity = "0.7";
    resultado.appendChild(emptyMessage);
    return;
  }

  // Convertir a array y procesar
  const wordArray = [...inputOriginal.value.toUpperCase()];
  const textoOriginal = inputOriginal.value; // Guardar texto original
  inputOriginal.value = ""; // Limpiar input

  // Iniciar animación de caracteres
  printChar(0, wordArray, textoOriginal);
};

// Función para mostrar caracteres animados
const printChar = (currentLetterIndex, wordArray, textoOriginal) => {
  if (wordArray.length === currentLetterIndex) {
    inputOriginal.value = textoOriginal; // Restaurar texto original
    return;
  }

  const spanChar = document.createElement("span");
  resultado.appendChild(spanChar);

  animateChar(spanChar).then(() => {
    const charSinCodificar = wordArray[currentLetterIndex];

    // Cifrar solo letras del alfabeto
    spanChar.innerHTML = alfabeto.includes(charSinCodificar)
      ? alfabeto[
          (alfabeto.indexOf(charSinCodificar) + parseInt(rango.value)) %
            alfabeto.length
        ]
      : charSinCodificar;

    // Aplicar efecto de color
    spanChar.style.color = alfabeto.includes(charSinCodificar)
      ? "var(--color-success)"
      : "var(--color-text)";

    // Continuar con el siguiente caracter
    printChar(currentLetterIndex + 1, wordArray, textoOriginal);
  });
};

// Animación de caracteres
const animateChar = (spanChar) => {
  let cambiosDeLetra = 0;
  return new Promise((resolve) => {
    const intervalo = setInterval(() => {
      spanChar.innerHTML =
        alfabeto[Math.floor(Math.random() * alfabeto.length)];
      cambiosDeLetra++;
      if (cambiosDeLetra === 3) {
        clearInterval(intervalo);
        resolve();
      }
    }, 50);
  });
};

// Manejar envío del formulario
const submit = (e) => {
  e.preventDefault();
  shifMessage();
};

// Event listeners
cifrador.addEventListener("submit", submit);

// Permitir envío con Enter
inputOriginal.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    shifMessage();
  }
});
