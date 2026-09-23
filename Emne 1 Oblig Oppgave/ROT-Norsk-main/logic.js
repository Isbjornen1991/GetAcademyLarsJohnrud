// ------------------------------------------------------------------------
//                               Model
// ------------------------------------------------------------------------
// These are here for fetching input and displaying the correct text
// and making the user experience slightly better
let inputText = "";
let outputText = "";
let isEncrypted = false;

// ------------------------------------------------------------------------
//                                VIEW
// ------------------------------------------------------------------------
function updateView() {
  // This const has to be inside of updateView() to prevent QUnit
  // showing an extra test as failed, even though there is no 10th test
  const app = document.getElementById("app");
  // Safety in case app div isn't found
  if (!app) return;

  app.innerHTML = /*HTML*/ `
  
    <div class="inputArea">
      <input
        type="text"
        value="${inputText}"
        oninput="inputText = this.value; isEncrypted = false;">
    </div>
    <div>
      <button onclick="handleEncrypt()">Krypter</button><button onclick="handleDecrypt()">Dekrypter</button>
    </div>
    <div class="outputArea">${outputText}</div>
  `;
}

// Init app
updateView();

// ------------------------------------------------------------------------
//                           VIEW HANDLERS
// ------------------------------------------------------------------------
function handleEncrypt() {
  if (!isEncrypted) {
    outputText = encrypt(inputText);
    isEncrypted = true;
    updateView();
  }
}

function handleDecrypt() {
  if (isEncrypted) {
    outputText = decrypt(outputText);
    isEncrypted = false;
    updateView();
  }
}

// ------------------------------------------------------------------------
//                              CONTROLLER
// ------------------------------------------------------------------------
function encrypt(text) {
  return rotateText(text, 14);
}

function decrypt(text) {
  return rotateText(text, 15);
}

function rotateText(text, shift) {
  let output = "";

  for (let i = 0; i < text.length; i++) {
    output += rotateChar(text[i], shift);
  }

  return output;
}

function rotateChar(char, shift) {
  const alphabet = "abcdefghijklmnopqrstuvwxyzæøå";

  // This check shouldn't really be necessary
  // but I'm leaving it as a safety measure
  if (char === "") {
    return "";
  }

  // Check if char is uppercase. If it is not equal to the lower case version
  // it must be uppercase, thus flag set true for isUpperCase.
  const isUpperCase = char !== char.toLowerCase();

  const lowerChar = char.toLowerCase();
  const index = alphabet.indexOf(lowerChar);

  // If lowerChar is not found in the alphabet defined at the start, lowerChar will be set to -1 in the previous line
  // This means I can just return the char as it was, since it is most likely just a symbol or number
  // This also means I don't need any extra code for symbols or numbers
  if (index === -1) {
    return char;
  }

  // These two lines allow us to encrypt/decrypt based on the shift param and the modulus
  const newIndex = (index + shift) % 29;
  const rotatedChar = alphabet[newIndex];

  // Restore uppercase for the char if it was uppercase before
  if (isUpperCase) {
    return rotatedChar.toUpperCase();
  }

  return rotatedChar;
}
