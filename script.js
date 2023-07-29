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

const DEFAULTCOLOR = "#212121";
let currentColor = DEFAULTCOLOR;
let gridColumnAndRow = 16;
let mode = "colorMode";

createGrid(gridColumnAndRow);

gridSize.addEventListener("change", (e) => {
  gridColumnAndRow = e.target.value;

  createGrid(gridColumnAndRow);
});

gridSize.addEventListener("input", (e) => {
  const ColumnAndRow = e.target.value;
  gridText.textContent = `${ColumnAndRow} X ${ColumnAndRow}`;
});

colorPicker.addEventListener("input", (e) => {
  currentColor = e.target.value;
  mode = "colorMode";
  rainbowMode.classList.remove("selected");
  colorMode.classList.add("selected");
  eraser.classList.remove("selected");
  darkenMode.classList.remove("selected");
  lightenMode.classList.remove("selected");
});

colorMode.addEventListener("click", () => {
  mode = "colorMode";
  rainbowMode.classList.remove("selected");
  colorMode.classList.add("selected");
  eraser.classList.remove("selected");
  darkenMode.classList.remove("selected");
  lightenMode.classList.remove("selected");
});

rainbowMode.addEventListener("click", () => {
  mode = "rainbowMode";
  rainbowMode.classList.add("selected");
  colorMode.classList.remove("selected");
  eraser.classList.remove("selected");
  darkenMode.classList.remove("selected");
  lightenMode.classList.remove("selected");
});

darkenMode.addEventListener("click", () => {
  mode = "darkenMode";
  rainbowMode.classList.remove("selected");
  colorMode.classList.remove("selected");
  eraser.classList.remove("selected");
  darkenMode.classList.add("selected");
  lightenMode.classList.remove("selected");
});

lightenMode.addEventListener("click", () => {
  mode = "lightenMode";
  rainbowMode.classList.remove("selected");
  colorMode.classList.remove("selected");
  eraser.classList.remove("selected");
  darkenMode.classList.remove("selected");
  lightenMode.classList.add("selected");
});

eraser.addEventListener("click", () => {
  mode = "eraserMode";
  rainbowMode.classList.remove("selected");
  colorMode.classList.remove("selected");
  eraser.classList.add("selected");
  darkenMode.classList.remove("selected");
  lightenMode.classList.remove("selected");
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
      const colorR = random(255);
      const colorG = random(255);
      const colorB = random(255);
      e.target.style.backgroundColor = `rgb(${colorR}, ${colorG}, ${colorB})`;
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

function random(number) {
  return Math.floor(Math.random() * number) + 1;
}
