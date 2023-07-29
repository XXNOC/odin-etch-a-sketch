const grid = document.querySelector(".grid");
const gridSize = document.querySelector("#gridSize");
const colorPicker = document.querySelector("#colorPicker");
const colorMode = document.querySelector("#colorMode");
const rainbowMode = document.querySelector("#rainbow");
const eraser = document.querySelector("#eraser");
const clear = document.querySelector("#clear");

const DEFAULTCOLOR = "#212121";
let currentColor = DEFAULTCOLOR;
let gridColumnAndRow = 16;
let mode = "colorMode";

let mouseDown = false;
document.body.addEventListener("mousedown", () => (mouseDown = true));
document.body.addEventListener("mouseup", () => (mouseDown = false));

createGrid(gridColumnAndRow);

gridSize.addEventListener("change", (e) => {
  gridColumnAndRow = e.target.value;
  createGrid(gridColumnAndRow);
});

colorPicker.addEventListener("change", (e) => {
  currentColor = e.target.value;
});

rainbowMode.addEventListener("click", () => {
  mode = "rainbowMode";
});

eraser.addEventListener("click", () => {
  mode = "eraserMode";
});

colorMode.addEventListener("click", () => {
  mode = "colorMode";
});

clear.addEventListener("click", () => {
  const elements = document.querySelectorAll(".gridElement");
  elements.forEach((element) => {
    element.style.backgroundColor = "#FFFFFF";
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
    gridElement.addEventListener("mouseover", changeColor);
    gridElement.addEventListener("mousedown", changeColor);
    grid.appendChild(gridElement);
  }
}

function changeColor(e) {
  if (e.type === "mouseover" && !mouseDown) return;
  if (mode === "colorMode") {
    e.target.style.backgroundColor = currentColor;
  }
  if (mode === "rainbowMode") {
    const colorR = random(255);
    const colorG = random(255);
    const colorB = random(255);
    e.target.style.backgroundColor = `rgb(${colorR}, ${colorG}, ${colorB})`;
  }
  if (mode === "eraserMode") {
    e.target.style.backgroundColor = "#FFFFFF";
  }
}

function random(number) {
  return Math.floor(Math.random() * number) + 1;
}
