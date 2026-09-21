function buyCoke() {
  const totalInserted = valueFromCoinCounts(coinsInserted);

  // Here there needs to be a while, so I can loop through the array of inserted coins,
  // take out the 25 kr, keep the rest in the array, then pass that extra money back later
  if (cokesInStore > 0 && totalInserted >= cokePrice) {
    cokesInStore--;
    isCokeInDelivery = true;

    for (let i = 0; i < coinsInserted.length; i++) {
      coinsInMachine[i] += coinsInserted[i];
    }
      //This just makes excess money vanish, need to weave this into the 
    coinsInserted = [0, 0, 0, 0];
    updateView();
  }
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
  // Old default code below
  //   coinsReturned = [...coinsInserted];
  //   coinsInserted = [0, 0, 0, 0];
  updateView();
}

function takeCoins() {
  coinsReturned = [0, 0, 0, 0];
  updateView();
}
