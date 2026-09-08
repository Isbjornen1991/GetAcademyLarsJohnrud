//Model

let inputEmail = "";

//View
function updateView() {
  app.innerHTML = /*HTML*/ `

      <label>Enter your example.com email:</label>
      <input
        type="text"
        value="${inputEmail}"
        oninput="betterTestEmail(this.value)">

        <button onclick="betterTestEmail(inputEmail)">Test The Email</button>
        `;
}

function testEmail(textInput) {
  for (let i = 0; i < textInput.length; i++) {
    if (textInput[i] === "@") {
      console.log(true);
      return true;
    }
  }
  console.log(false);
  return false;
}

function betterTestEmail(textInput) {
  return textInput.includes("@");
}
