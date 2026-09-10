//Model
let inputEmail = "";
let outputArea = document.getElementById("output");
let isValid = false;

//View
function updateView() {
  app.innerHTML = /*HTML*/ `
    <div>
      <label>Enter your example.com email:</label>
      <input
        type="text"
        value="${inputEmail}"
        oninput="betterTestEmail(this.value)">
    </div>
    <div>
      <div id="output">${isValid}</div>
    </div>
        `;
}

//Controller

//Old, works, but is just worse

// function testEmail(textInput) {
//   for (let i = 0; i < textInput.length; i++) {
//     if (textInput[i] === "@") {
//       console.log(true);
//       return true;
//     }
//   }
//   console.log(false);
//   return false;
// }

function betterTestEmail(textInput) {
  inputEmail = textInput;
  isValid = textInput.includes("@");
  checkForPeriod(textInput);

  console.log("Is email valid?", isValid);

  document.getElementById("output").innerText = isValid;

  return isValid;
}

function checkForPeriod(textInput) {
  const splitArray = textInput.split("@");
  console.log(splitArray[0]);

  //Her bruker vi Optional Chaining ?. Operator
  if (splitArray[0]?.includes(".") && splitArray[1]?.includes(".")) {
    console.log(true);
    return true;
  }
  return false;
}
