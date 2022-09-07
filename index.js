const colorsForm = document.getElementById("get-colors-form");
const colorsInput = document.getElementById("colors-input");
const colorsMode = document.getElementById("mode-select");
const colorsBackgroundDiv = document.getElementById("colors-background");
const colorsValuesDiv = document.getElementById("colors-values");

let colorSchemeArray = [];
let chosenColor = colorsInput.value.substring(1);
let chosenMode = colorsMode.value;

const apiUrl = "https://www.thecolorapi.com/scheme";

renderColors();

function renderColors() {
  getColorSchemeArrayFrom(url());
  setTimeout(() => {
    colorBackgroundWithColorScheme();
    showColorSchemeValues();
  }, 500);
}

function url() {
  chosenColor = colorsInput.value.substring(1);
  chosenMode = colorsMode.value;
  let urlQuery = `?hex=${chosenColor}&mode=${chosenMode}`;
  return apiUrl + urlQuery;
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

function colorBackgroundWithColorScheme() {
  colorsBackgroundDiv.innerHTML = "";
  for (let color of colorSchemeArray) {
    colorsBackgroundDiv.innerHTML += `
      <div class="chosen-color" style="background: ${color} ;"></div>
    `;
  }
}

function showColorSchemeValues() {
  colorsValuesDiv.innerHTML = "";
  for (let color of colorSchemeArray) {
    colorsValuesDiv.innerHTML += `
      <div class="chosen-color colors-values">${color}</div>
    `;
  }
}
colorsForm.addEventListener("submit", function (e) {
  e.preventDefault();
  renderColors();
});
