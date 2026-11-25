function selectShowing(showingId) {
  model.viewState.selectedShowingId = showingId;
  model.viewState.selectedSeats = [];
  model.viewState.message = "";
  updateView();
}

function toggleSeat(row, number) {
  let selectedShowingId = model.viewState.selectedShowingId;
  let selectedSeats = model.viewState.selectedSeats;

  if (!selectedShowingId) {
    model.viewState.message = "Du må velge en visning først.";
    updateView();
    return;
  }

  if (isSeatTaken(row, number, selectedShowingId)) {
    model.viewState.message = "Dette setet er allerede reservert.";
    updateView();
    return;
  }

  let index = -1;
  for (let i = 0; i < selectedSeats.length; i++) {
    if (selectedSeats[i].row === row && selectedSeats[i].number === number) {
      index = i;
      break;
    }
  }

  if (index > -1) {
    selectedSeats.splice(index, 1);
    model.viewState.message = "";
  } else {
    if (selectedSeats.length >= 6) {
      model.viewState.message = "Du kan maksimalt reservere 6 seter.";
      updateView();
      return;
    }

    selectedSeats.push({ row, number });
    model.viewState.message = "";
  }
  updateView();
}

function reserve() {
  let selectedShowingId = model.viewState.selectedShowingId;
  let selectedSeats = model.viewState.selectedSeats;
  let name = model.viewState.name;
  let phone = model.viewState.phone;

  if (!selectedShowingId) {
    model.viewState.message = "Vennligst velg en forestilling.";
    updateView();
    return;
  }
  if (selectedSeats.length === 0) {
    model.viewState.message = "Du må velge minst ett sete.";
    updateView();
    return;
  }
  if (name.length === 0) {
    model.viewState.message = "Vennligst fyll inn navnet ditt.";
    updateView();
    return;
  }
  if (phone.length !== 8) {
    model.viewState.message = "Telefonnummer må bestå av nøyaktig 8 siffer.";
    updateView();
    return;
  }

  //Denne er litt overkill, da samme sjekk kan gjøres med en regular expression
  //men jeg prøver å holde meg til det vi har lært
  let isOnlyNumbers = true;
  for (let i = 0; i < phone.length; i++) {
    if (phone[i] < "0" || phone[i] > "9") {
      isOnlyNumbers = false;
      break;
    }
  }

  if (!isOnlyNumbers) {
    model.viewState.message = "Telefonnummer kan bare inneholde siffer(0-9).";
    updateView();
    return;
  }

  model.data.reservations.push({
    showingId: selectedShowingId,
    name: name,
    phone: phone,
    seats: [...selectedSeats],
  });

  model.viewState.selectedSeats = [];
  model.viewState.name = "";
  model.viewState.phone = "";
  model.viewState.message = "Reservasjonen er fullført!";

  updateView();
}

function updateName(value) {
  model.viewState.name = value;
}

function updatePhone(value) {
  model.viewState.phone = value;
}
