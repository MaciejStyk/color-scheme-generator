const colorsForm = document.getElementById("get-colors-form");
const colorsInput = document.getElementById("colors-input");
const colorsMode = document.getElementById("mode-select");
const colorsBackgroundDiv = document.getElementById("colors-background");
const colorsValuesDiv = document.getElementById("colors-values");
const tooltipSpan = document.getElementById("tooltiptext");

let colorSchemeArray = [];
let chosenColor = colorsInput.value.substring(1);
let chosenMode = colorsMode.value;

const apiUrl = "https://www.thecolorapi.com/scheme";

renderColors();

function renderColors() {
  getColorSchemeArrayFrom(url());
  setTimeout(() => {
    fillPageWithColorScheme();
  }, 500);
}

function getColorSchemeArrayFrom(url) {
  colorSchemeArray = [];
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      for (let color of data.colors) {
        colorSchemeArray.push(color.hex.value);
      }
    });
}

function url() {
  chosenColor = colorsInput.value.substring(1);
  chosenMode = colorsMode.value;
  let urlQuery = `?hex=${chosenColor}&mode=${chosenMode}`;
  return apiUrl + urlQuery;
}

function fillPageWithColorScheme() {
  colorsBackgroundDiv.innerHTML = "";
  colorsValuesDiv.innerHTML = "";
  for (let color of colorSchemeArray) {
    colorsBackgroundDiv.innerHTML += `
      <div class="chosen-color" data-color="${color}" style="background: ${color} ;"></div>
    `;
    colorsValuesDiv.innerHTML += `
      <div class="chosen-color colors-values" data-color="${color}" id="${color}">${color}</div>
    `;
  }
}

colorsForm.addEventListener("submit", (e) => {
  e.preventDefault();
  renderColors();
});

colorsBackgroundDiv.addEventListener("click", showAndHideTooltip);
colorsValuesDiv.addEventListener("click", showAndHideTooltip);

function showAndHideTooltip(e) {
  const colorHexValue = e.target.getAttribute("data-color");
  tooltipSpan.style.animation = "";
  highlightOnPage(colorHexValue);
  styleTooltip(e, colorHexValue);
  copyToClipboard(colorHexValue);
}

function highlightOnPage(colorHexValue) {
  const range = document.createRange();
  range.selectNode(document.getElementById(colorHexValue));
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);
}

function styleTooltip(e, colorHexValue) {
  tooltipSpan.style.left = e.clientX + "px";
  tooltipSpan.style.top = e.clientY + 20 + "px";
  tooltipSpan.innerText = `Copied: ${colorHexValue}`;
  tooltipSpan.style.animation = "showAndHideTooltip 1s";
}

function copyToClipboard(colorHexValue) {
  navigator.clipboard.writeText(colorHexValue);
}
