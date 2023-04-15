const contenedor = document.querySelector(".contenedor");
const altoTablero = 300;
const anchoTablero = 570;
const altoBloque = 20;
const anchoBloque = 100;

const posicionInicialUsuario = [230, 10];
let posicionActualUsuario = posicionInicialUsuario;

const posicionInicialBola = [270, 40];
let posicionActualBola = posicionInicialBola;

let xDireccionBola = 2;
let yDireccionBola = 2;
let diametro = 20;

let timerId;

class Bloque {
  constructor(ejeX, ejeY) {
    this.bottomLeft = [ejeX, ejeY];
    this.bottomRight = [ejeX + anchoBloque, ejeY];
    this.topLeft = [ejeX, ejeY + altoBloque];
    this.topRight = [ejeX + anchoBloque, ejeY + altoBloque];
  }
}

const bloques = [
  new Bloque(10, 250),
  new Bloque(120, 250),
  new Bloque(230, 250),
  new Bloque(340, 250),
  new Bloque(450, 250),
  new Bloque(10, 220),
  new Bloque(120, 220),
  new Bloque(230, 220),
  new Bloque(340, 220),
  new Bloque(450, 220),
  new Bloque(10, 190),
  new Bloque(120, 190),
  new Bloque(230, 190),
  new Bloque(340, 190),
  new Bloque(450, 190),
];

function addBloques() {
  for (let i = 0; i < bloques.length; i++) {
    const bloque = document.createElement("div");
    bloque.classList.add("bloque");
    bloque.style.left = bloques[i].bottomLeft[0] + "px";
    bloque.style.bottom = bloques[i].bottomLeft[1] + "px";
    contenedor.appendChild(bloque);
  }
}

addBloques();

function dibujarUsuario() {
  usuario.style.left = posicionActualUsuario[0] + "px";
  usuario.style.bottom = posicionActualUsuario[1] + "px";
}

const usuario = document.createElement("div");
usuario.classList.add("usuario");
contenedor.appendChild(usuario);
dibujarUsuario();

function moverUsuario(e) {
  switch (e.key) {
    case "ArrowLeft":
      if (posicionActualUsuario[0] > 0) {
        posicionActualUsuario[0] -= 10;
        dibujarUsuario();
      }
      break;
    case "ArrowRight":
      if (posicionActualUsuario[0] < anchoTablero - anchoBloque) {
        posicionActualUsuario[0] += 10;
        dibujarUsuario();
      }
  }
}

document.addEventListener("keydown", moverUsuario);

function dibujarBola() {
  bola.style.left = posicionActualBola[0] + "px";
  bola.style.bottom = posicionActualBola[1] + "px";
}

const bola = document.createElement("div");
bola.classList.add("bola");
contenedor.appendChild(bola);
dibujarBola();

function moverBola() {
  posicionActualBola[0] += xDireccionBola;
  posicionActualBola[1] += yDireccionBola;
  dibujarBola();
  revisarColisiones();
  gameOver();
}

timerId = setInterval(moverBola, 20);

function revisarColisiones() {
  for (let i = 0; i < bloques.length; i++) {
    if (
      posicionActualBola[0] > bloques[i].bottomLeft[0] &&
      posicionActualBola[0] < bloques[i].bottomRight[0] &&
      posicionActualBola[1] + diametro > bloques[i].bottomLeft[1] &&
      posicionActualBola[1] < bloques[i].topLeft[1]
    ) {
      const todosLosBloques = Array.from(document.querySelectorAll(".bloque"));
      todosLosBloques[i].classList.remove("bloque");
      bloques.splice(i, 1);
      cambiarDireccion();
    }
  }

  if (
    posicionActualBola[0] >= anchoTablero - diametro ||
    posicionActualBola[1] >= anchoTablero - diametro ||
    posicionActualBola[0] <= 0 ||
    posicionActualBola[1] <= 0
  ) {
    cambiarDireccion();
  }

  if (
    posicionActualBola[0] > posicionActualUsuario[0] &&
    posicionActualBola[0] < posicionActualUsuario[0] + anchoBloque &&
    posicionActualBola[1] > posicionActualUsuario[1] &&
    posicionActualBola[1] < posicionActualUsuario[1] + altoBloque
  ) {
    cambiarDireccion();
  }
}

function gameOver() {
  if (posicionActualBola[1] <= 0) {
    clearInterval(timerId);
    puntuacion.innerHTML =
      "Lo siento has perdido, recarga la página para intentarlo otra vez.";
    document.removeEventListener("keydown", moverUsuario);
  }
}

function cambiarDireccion() {
  if (xDireccionBola === 2 && yDireccionBola === 2) {
    yDireccionBola = -2;
    return;
  }
  if (xDireccionBola === 2 && yDireccionBola === -2) {
    xDireccionBola = -2;
    return;
  }
  if (xDireccionBola === -2 && yDireccionBola === -2) {
    yDireccionBola = 2;
    return;
  }
  if (xDireccionBola === -2 && yDireccionBola === 2) {
    xDireccionBola = 2;
    return;
  }
}
