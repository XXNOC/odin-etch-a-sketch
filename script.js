let container = document.querySelector(".container");
let defaultColor = "black";
let currentColor = defaultColor;
let mouseDown = false;
document.body.addEventListener("mousedown", () => (mouseDown = true));
document.body.addEventListener("mouseup", () => (mouseDown = false));

for (let i = 0; i < 273; i++) {
  let gridElement = document.createElement("div");
  gridElement.className = "gridElement";
  gridElement.addEventListener("mouseover", changeColor);
  gridElement.addEventListener("mousedown", changeColor);
  container.appendChild(gridElement);
}

function changeColor(e) {
  if (e.type === "mouseover" && !mouseDown) return;
  e.target.style.backgroundColor = currentColor;
}
