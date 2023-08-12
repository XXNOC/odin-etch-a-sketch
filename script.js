const grid = document.querySelector(".grid");
const gridSize = document.querySelector("#gridSize");
const colorPicker = document.querySelector("#colorPicker");
const colorMode = document.querySelector("#colorMode");
const rainbowMode = document.querySelector("#rainbow");
const darkenMode = document.querySelector("#darken");
const lightenMode = document.querySelector("#lighten");
const eraser = document.querySelector("#eraser");
const clear = document.querySelector("#clear");
const gridText = document.querySelector("#gridText");

let currentColor = "#212121";
let mode = "colorMode";

createGrid(16);

gridSize.addEventListener("change", (e) => {
  createGrid(e.target.value);
});

gridSize.addEventListener("input", (e) => {
  gridText.textContent = `${e.target.value} X ${e.target.value}`;
});

colorPicker.addEventListener("input", (e) => {
  currentColor = e.target.value;
  changeMode("colorMode");
});

colorMode.addEventListener("click", () => {
  changeMode("colorMode");
});

rainbowMode.addEventListener("click", () => {
  changeMode("rainbowMode");
});

darkenMode.addEventListener("click", () => {
  changeMode("darkenMode");
});

lightenMode.addEventListener("click", () => {
  changeMode("lightenMode");
});

eraser.addEventListener("click", () => {
  changeMode("eraserMode");
});

clear.addEventListener("click", () => {
  const elements = document.querySelectorAll(".gridElement");
  elements.forEach((element) => {
    element.style.backgroundColor = "#FFFFFF";
    element.style.filter = "brightness(100%)";
  });
});

function createGrid(count) {
  grid.innerHTML = "";

  let gridWidthAndHeight = 500 / count;

  for (let i = 0; i < count * count; i++) {
    const gridElement = document.createElement("div");
    gridElement.className = "gridElement";
    gridElement.style.width = `${gridWidthAndHeight}px`;
    gridElement.style.height = `${gridWidthAndHeight}px`;
    gridElement.style.backgroundColor = "#FFFFFF";
    gridElement.style.filter = "brightness(100%)";
    gridElement.addEventListener("mouseover", changeColor);
    gridElement.addEventListener("mousedown", changeColor);
    grid.appendChild(gridElement);
  }
}

function changeColor(e) {
  if (e.buttons === 1) {
    if (mode === "colorMode") {
      e.target.style.backgroundColor = currentColor;
      e.target.style.filter = "brightness(100%)";
    }
    if (mode === "rainbowMode") {
      e.target.style.backgroundColor = `rgb(${random(256)}, ${random(
        256
      )}, ${random(256)})`;
      e.target.style.filter = "brightness(100%)";
    }
    if (mode === "eraserMode") {
      e.target.style.backgroundColor = "#FFFFFF";
      e.target.style.filter = "brightness(100%)";
    }
    if (mode === "darkenMode") {
      const currentBrightness = e.target.style.filter.split(/[(%]/);
      e.target.style.filter = `brightness(${
        parseInt(currentBrightness[1]) - 10
      }%)`;
    }
    if (mode === "lightenMode") {
      const currentBrightness = e.target.style.filter.split(/[(%]/);
      e.target.style.filter = `brightness(${
        parseInt(currentBrightness[1]) + 10
      }%)`;
    }
  }
}

function changeMode(newMode) {
  if (mode === "colorMode") colorMode.classList.remove("selected");
  if (mode === "rainbowMode") rainbowMode.classList.remove("selected");
  if (mode === "darkenMode") darkenMode.classList.remove("selected");
  if (mode === "lightenMode") lightenMode.classList.remove("selected");
  if (mode === "eraserMode") eraser.classList.remove("selected");

  if (newMode === "colorMode") colorMode.classList.add("selected");
  if (newMode === "rainbowMode") rainbowMode.classList.add("selected");
  if (newMode === "darkenMode") darkenMode.classList.add("selected");
  if (newMode === "lightenMode") lightenMode.classList.add("selected");
  if (newMode === "eraserMode") eraser.classList.add("selected");
  mode = newMode;
}

function random(number) {
  return Math.floor(Math.random() * number);
}
