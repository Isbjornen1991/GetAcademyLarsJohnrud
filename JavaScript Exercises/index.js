console.log(`Hello`);

let number = 1;
let holder = document.querySelector(".numberholder");
holder.textContent = number;

function updateDisplay() {
  document.querySelector(".numberholder").textContent = number;
}

function increase() {
  number++;
  updateDisplay();
}

function decrease() {
  number--;
  updateDisplay();
}
