function updateView() {
  document.getElementById("app").innerHTML = /*HTML*/ `
        <div class="page">
            <h1>Kino</h1>
            ${createShowings()}
            ${createShowingInfo()}
            ${createHall()}
            ${createLegend()}
            ${createSummary()}
            ${createForm()}
            ${createMessage()}
        </div>
    `;
}

function createShowings() {
  let showingsHtml = "";
  const showings = model.data.showings;
  const selectedShowingId = model.viewState.selectedShowingId;

  for (let i = 0; i < showings.length; i++) {
    const showing = showings[i];
    let isSelected = showing.id === selectedShowingId ? " selected" : "";
    showingsHtml += /*HTML*/ `
            <button class="showing${isSelected}" onclick="selectShowing(${showing.id})">
                <span class="showing-title">${showing.title}</span>
                <span class="showing-time">${showing.time}</span>
            </button>
        `;
  }
  return /*HTML*/ `
        <div class="showings">
            ${showingsHtml}
        </div>
    `;
}

function createShowingInfo() {
  const selectedShowingId = model.viewState.selectedShowingId;
  const showings = model.data.showings;

  let title = "Ingen forestilling valgt";
  let priceText = "– · – kr per billett";

  if (selectedShowingId) {
    for (let i = 0; i < showings.length; i++) {
      if (showings[i].id === selectedShowingId) {
        title = showings[i].title + " (" + showings[i].time + ")";
        priceText = showings[i].price + " kr per billett";
        break;
      }
    }
  }

  return /*HTML*/ `
        <div class="showing-info">
            <h2>${title}</h2>
            <p>${priceText}</p>
        </div>
    `;
}

function createHall() {
  const hall = model.data.hall;
  const selectedShowingId = model.viewState.selectedShowingId;
  let hallHtml = "";

  for (let i = 0; i < hall.rows.length; i++) {
    const row = hall.rows[i];
    let seatsHtml = "";
    for (let number = 1; number <= hall.seatsPerRow; number++) {
      let seatClass = "free";

      if (selectedShowingId) {
        if (isSeatTaken(row, number, selectedShowingId)) {
          seatClass = "taken";
        } else if (isSeatSelected(row, number)) {
          seatClass = "selected";
        }
      }

      seatsHtml += /*HTML*/ `
                <button class="seat ${seatClass}" onclick="toggleSeat('${row}', ${number})">${number}</button>
            `;
    }
    hallHtml += /*HTML*/ `
            <div class="row"><span class="row-label">${row}</span>${seatsHtml}</div>
        `;
  }
  return /*HTML*/ `
        <div class="screen"></div>
        <div class="screen-label">LERRET</div>
        <div class="hall">
            ${hallHtml}
        </div>
    `;
}
function createLegend() {
  return /*HTML*/ `
        <div class="legend">
            <span><span class="seat free"></span>Ledig</span>
            <span><span class="seat selected"></span>Valgt</span>
            <span><span class="seat taken"></span>Opptatt</span>
        </div>
    `;
}

function createSummary() {
  const selectedSeats = model.viewState.selectedSeats;
  const selectedShowingId = model.viewState.selectedShowingId;
  const showings = model.data.showings;

  let count = selectedSeats.length;
  let totalPrice = 0;

  if (selectedShowingId && count > 0) {
    let pricePerTicket = 0;
    for (let i = 0; i < showings.length; i++) {
      if (showings[i].id === selectedShowingId) {
        pricePerTicket = showings[i].price;
        break;
      }
    }
    totalPrice = count * pricePerTicket;
  }

  let countText = count > 0 ? count : "–";
  let priceText = count > 0 ? totalPrice + " kr" : "–";

  return /*HTML*/ `
        <div class="summary">
            <span>Valgte seter: ${countText}</span>
            <span>Totalpris: ${priceText}</span>
        </div>
    `;
}

function createForm() {
  const name = model.viewState.name;
  const phone = model.viewState.phone;

  // Jeg testet mye med å sette inputten til phone her til number som en safety feature,
  // men det skaper masse problemer med number så jeg gikk heller for en annen fix.
  return /*HTML*/ `
        <div class="form">
            <label>Navn
                <input type="text" value="${name}" oninput="updateName(this.value)">
            </label>
            <label>Telefonnummer

                <input type="text" value="${phone}" oninput="updatePhone(this.value)">
            </label>
            <button class="reserve" onclick="reserve()">Reserver</button>
        </div>
    `;
}

function createMessage() {
  const message = model.viewState.message;
  return /*HTML*/ `
        <div class="message">${message}</div>
    `;
}
