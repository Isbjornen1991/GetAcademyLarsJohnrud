// model
let numbers = [7, 3, 1, 5, 8];
let chosenBar; // Variabel for hvilken stolpe som er valgt
let inputValue; // Variabel for hva som er skrevet i input-feltet

// view
function updateView() {
  //Lets try to rememeber that I can just set the html div ID reference here.
  let app = document.getElementById("content");
  if (!app) return;

  let svgInnerHtml = "";
  for (let i = 0; i < numbers.length; i++) {
    svgInnerHtml += createBar(numbers[i], i + 1);
  }

  let isDisabled = chosenBar == null ? "disabled" : "";

  app.innerHTML = /*HTML*/ `
            <svg id="chart" width="500" viewBox="0 0 80 60">
                ${svgInnerHtml}
            </svg><br/>
            Valgt stolpe: <i>${chosenBar != null ? chosenBar : "ingen"}</i>
            <br />
            Verdi:
            <input type="number" min="1" max="10" oninput="inputValue = this.value"/>
            <button onclick="addBar()">Legg til stolpe</button>
            <button ${isDisabled} onclick="changeBar()">Endre valgt stolpe</button><br />
            <button ${isDisabled} onclick="removeBar()">Fjerne valgt stolpe</button>
        `;
}

function createBar(number, barNo) {
  const width = 8;
  const spacing = 2;
  let x = (barNo - 1) * (width + spacing);
  let height = number * 10;
  let y = 60 - height;
  let color = calcColor(1, 10, barNo);

  // Highlight with a black border if this bar is the chosen bar
  let border = barNo === chosenBar ? 'stroke="black" stroke-width="1"' : "";

  return `<rect width="${width}" height="${height}"
                x="${x}" y="${y}" fill="${color}"
                ${border}
                onclick="selectBar(${barNo})"></rect>`;
}

function calcColor(min, max, val) {
  var minHue = 240,
    maxHue = 0;
  var curPercent = (val - min) / (max - min);
  var colString =
    "hsl(" + (curPercent * (maxHue - minHue) + minHue) + ",100%,50%)";
  return colString;
}

// controller (ingenting her ennå)

function selectBar(barNo) {
  if (chosenBar === barNo) {
    chosenBar = undefined; // Deselect if clicking the same bar again
  } else {
    chosenBar = barNo; // Select the clicked bar
  }
  updateView(); // Re-render the view to show changes
}

function removeBar() {
  if (chosenBar == null) return;

  let indexToRemove = chosenBar - 1;

  numbers.splice(indexToRemove, 1);

  chosenBar = undefined;

  updateView();
}

function addBar() {
  let val = Number(inputValue);

  // Validate: must be a number between 1 and 10
  if (isNaN(val) || val < 1 || val > 10) {
    alert("Ugyldig verdi! Skriv inn et tall mellom 1 og 10.");
    return;
  }

  // Add the new number to the end of the array
  numbers.push(val);

  updateView();
}

function changeBar() {
  if (chosenBar == null) return;

  let val = Number(inputValue);

  // Validate: must be a number between 1 and 10
  if (isNaN(val) || val < 1 || val > 10) {
    alert("Ugyldig verdi! Skriv inn et tall mellom 1 og 10.");
    return;
  }

  // Update the array value for the selected bar
  numbers[chosenBar - 1] = val;

  updateView();
}
