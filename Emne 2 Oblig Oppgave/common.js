function isSeatTaken(row, number, showingId) {
  const reservations = model.data.reservations;
  for (let i = 0; i < reservations.length; i++) {
    const res = reservations[i];
    if (res.showingId === showingId) {
      for (let j = 0; j < res.seats.length; j++) {
        const s = res.seats[j];
        if (s.row === row && s.number === number) {
          return true;
        }
      }
    }
  }
  return false;
}

function isSeatSelected(row, number) {
  const selected = model.viewState.selectedSeats;
  for (let i = 0; i < selected.length; i++) {
    if (selected[i].row === row && selected[i].number === number) {
      return true;
    }
  }
  return false;
}
