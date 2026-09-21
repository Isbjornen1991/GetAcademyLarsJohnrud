function buyCoke() {
  errorMessage = ""; // Reset error message at start of attempt
  const totalInserted = valueFromCoinCounts(coinsInserted);

  if (isCokeInDelivery) return;

  // Check 1: Did customer input enough money?
  if (totalInserted < cokePrice) {
    errorMessage = "Putt på mer penger!";
    updateView();
    return;
  }

  // Check 2: Is there coke in stock?
  if (cokesInStore <= 0) {
    errorMessage = "Tomt for Cola!";
    updateView();
    return;
  }

  const changeOwed = totalInserted - cokePrice;
  let changeResult = null;

  // If change is required, test if we can make it with the inventory of coins that we have.
  // I tested setting the inventory to nothing and it works nicely when its empty
  if (changeOwed > 0) {
    changeResult = calculateChange(changeOwed);

    // If calculateChange returned null because there was not enough change, abort the whole thing.
    if (changeResult === null) {
      errorMessage = "Automaten har ikke nok vekslepenger!";
      updateView();
      return;
    }
  }

  // --- Transaction Succeeded ---
  cokesInStore--;
  isCokeInDelivery = true;

  // 1. Move inserted coins into machine inventory
  for (let i = 0; i < 4; i++) {
    coinsInMachine[i] += coinsInserted[i];
  }
  coinsInserted = [0, 0, 0, 0];

  // 2. Dispense change as needed
  if (changeResult) {
    for (let i = 0; i < 4; i++) {
      coinsReturned[i] += changeResult.changeToDispense[i];
      coinsInMachine[i] -= changeResult.changeToDispense[i]; // Here we finally deduct from the inventory of coins
    }
  }

  updateView();
}

function insertCoin(value) {
  if (value === 1) {
    coinsInserted[0]++;
  } else if (value === 5) {
    coinsInserted[1]++;
  } else if (value === 10) {
    coinsInserted[2]++;
  } else if (value === 20) {
    coinsInserted[3]++;
  }
  updateView();
}

function returnCoins() {
  for (let i = 0; i < coinsInserted.length; i++) {
    coinsReturned[i] += coinsInserted[i];
  }

  coinsInserted = [0, 0, 0, 0];

  updateView();
}

function takeCoins() {
  coinsReturned = [0, 0, 0, 0];
  updateView();
}

function takeCoke() {
  if (isCokeInDelivery) isCokeInDelivery = false;
  updateView();
}

function calculateChange(changeOwed) {
  // Temporary values created here, so we can calculate without modifying the real values
  const tempMachine = [...coinsInMachine];
  const changeToDispense = [0, 0, 0, 0];

  for (let index = 3; index >= 0; index--) {
    const value = coinValueFromIndex(index);
    const countNeeded = Math.floor(changeOwed / value); // Example: 15 / 10, here we need 15 back to the customer, and we want to give one 10
    const countToGive = Math.min(countNeeded, tempMachine[index]);
    // Following the example above, we say, hey, we need 1 10 coin.
    // How many actually exist in the machine? If we exceed available quantity,
    // the min allows us to pass the remainder further down in denominations.
    // The Math.min() static method returns the smallest of the numbers given as input parameters, or Infinity if there are no parameters. From mdn

    if (countToGive > 0) {
      changeToDispense[index] += countToGive;
      tempMachine[index] -= countToGive;
      changeOwed -= countToGive * value;
    }
  }

  // If changeOwed is still > 0, we fail to make the exact change needed
  if (changeOwed > 0) {
    return null; // Signals failure to other parts of the code
  }

  return { changeToDispense, updatedMachine: tempMachine };
}
