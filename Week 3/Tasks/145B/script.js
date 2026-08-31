// ==========================================
// 1. MODEL (Holds data and current state)
// ==========================================

const model = {
  // App State
  activeCard: null, // 'verktoy', 'html', 'css', 'javascript', 'game', or null
  layoutClass: "", // '', 'vertical', 'horizontal', or 'grid'

  // Character Game State
  headIndex: 1,
  bodyIndex: 1,
  legsIndex: 1,

  // Content Data
  cardContents: {
    verktoy: {
      title: "De to viktigste verktøyene vi skal bruke er disse:",
      editor: "Visual Studio Code",
      editorUrl: "https://code.visualstudio.com/",
      extensions: [
        "JavaScript-booster",
        "es6-string-html",
        "live-server",
        "live-share",
      ],
      browser: "Google Chrome",
      browserUrl: "https://www.google.com/intl/no/chrome/",
    },
    html: {
      title: "Vi bruker HTML til å definere et dokument.",
      items: [
        "Tagger for grunnleggende oppsett av en HTML-fil",
        "Tagger for grunnleggende formatering av tekst",
        "<tt>&lt;div&gt;</tt>",
        '<tt>&lt;input type="text"&gt;</tt>',
        "<tt>&lt;button&gt;</tt>",
      ],
    },
    css: {
      title:
        "Vi bruker CSS til å style et dokument, altså farger, fonter, utseende og lignende.",
      items: [
        "background-color",
        "color",
        "padding",
        "margin",
        "border",
        "text-align",
        "font-size",
        "flexbox",
        "grid",
        "W3Schools CSS Tutorial",
        "W3Schools CSS Reference",
      ],
    },
    javascript: {
      title:
        "Det viktigste vi skal lære er programmeringsspråket JavaScript. Vi skal lære grunnleggende programmering ved å manipulere HTML- og CSS-kode på en nettside ved hjelp av JavaScript.",
      items: [
        "Det finnes en W3Schools JavaScript Tutorial, men her anbefaler vi heller å følge kurset vårt på Moodle.",
        "color",
      ],
      jsscriptref: "W3Schools JavaScript Reference",
      jsscriptrefurl: "https://www.w3schools.com/jsref/default.asp",
    },
  },
};

// ==========================================
// 2. CONTROLLER (Functions called by user actions)
// ==========================================

// Layout Controllers
function setLayout(layoutName) {
  model.layoutClass = layoutName;
  updateLayoutView();
}

// Card Toggle Controller
function selectCard(cardName) {
  // If clicking the active card, close it; otherwise open the new card
  model.activeCard = model.activeCard === cardName ? null : cardName;
  updateCardsView();
}

// Character Game Controllers (Generic step logic replacing selectHead1, selectHead2...)
function changeHead(step) {
  model.headIndex = cycleIndex(model.headIndex, step);
  updateGameView();
}

function changeBody(step) {
  model.bodyIndex = cycleIndex(model.bodyIndex, step);
  updateGameView();
}

function changeLegs(step) {
  model.legsIndex = cycleIndex(model.legsIndex, step);
  updateGameView();
}

// Helper to keep image numbers cycling between 1 and 4
function cycleIndex(currentIndex, step) {
  let newIndex = currentIndex + step;
  if (newIndex > 4) return 1;
  if (newIndex < 1) return 4;
  return newIndex;
}

// ==========================================
// 3. VIEW (Functions that read Model and build HTML)
// ==========================================

// Initial static layout creation (Runs once)
function initView() {
  document.getElementById("app").innerHTML = /*HTML*/ `
    <div>
      <button onclick="setLayout('')">Ingen layout</button>
      <button onclick="setLayout('vertical')">Vertikal layout</button>
      <button onclick="setLayout('horizontal')">Horisontal layout</button>
      <button onclick="setLayout('grid')">Grid layout</button>
    </div>
    <h1>Eksempel 1</h1>
    <div id="cards">
      <div class="card">
        <div class="header green" onclick="selectCard('verktoy')">Verktøy</div>
        <div id="cardTools"></div>
      </div>
      <div class="card">
        <div class="header blue" onclick="selectCard('html')">HTML</div>
        <div id="cardHtml"></div>
      </div>
      <div class="card">
        <div class="header red" onclick="selectCard('css')">CSS</div>
        <div id="cardCss"></div>
      </div>
      <div class="card">
        <div class="header yellow" onclick="selectCard('javascript')">JavaScript</div>
        <div id="cardJavaScript"></div>
      </div>
      <div class="card">
        <div class="header dark" onclick="selectCard('game')">Hode, kropp og ben</div>
        <div id="cardGame" class="bodies"></div>
      </div>
    </div>
  `;
}

// Update the container class when layout buttons are clicked
function updateLayoutView() {
  document.getElementById("cards").className = model.layoutClass;
}

// Render open/close states for cards
function updateCardsView() {
  blankAll();

  if (model.activeCard === "verktoy") {
    document.getElementById("cardTools").innerHTML = getToolsHtml();
  } else if (model.activeCard === "html") {
    document.getElementById("cardHtml").innerHTML = getHtmlHtml();
  } else if (model.activeCard === "css") {
    document.getElementById("cardCss").innerHTML = getCssHtml();
  } else if (model.activeCard === "javascript") {
    document.getElementById("cardJavaScript").innerHTML = getJavaScriptHtml();
  } else if (model.activeCard === "game") {
    // Inject character slots, then render character images
    document.getElementById("cardGame").innerHTML = /*HTML*/ `
      <div id="head" class="bodyPart"></div>
      <div id="body" class="bodyPart"></div>
      <div id="legs" class="bodyPart"></div>
    `;
    updateGameView();
  }
}

// Blank all card slots
function blankAll() {
  document.getElementById("cardTools").innerHTML = "";
  document.getElementById("cardHtml").innerHTML = "";
  document.getElementById("cardCss").innerHTML = "";
  document.getElementById("cardJavaScript").innerHTML = "";
  document.getElementById("cardGame").innerHTML = "";
}

function getToolsHtml() {
  const data = model.cardContents.verktoy;
  return /*HTML*/ `
    <div class="innerCard">
      ${data.title}
      <ul>
        <li>
          Koderedigeringsprogrammet <a href="${data.editorUrl}">${data.editor}</a>
          <br />Vi skal bruke noen <i>extensions</i>:
          <ul>
            ${data.extensions.map((ext) => `<li>${ext}</li>`).join("")}
          </ul>
        </li>
        <li>Nettleseren <a href="${data.browserUrl}">${data.browser}</a></li>
      </ul>        
    </div>
  `;
}

function getHtmlHtml() {
  const data = model.cardContents.html;
  return /*HTML*/ `
    <div class="innerCard">
      ${data.title}
      <ul>
        ${data.items.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    </div>
  `;
}

function getCssHtml() {
  const data = model.cardContents.css;
  return /*HTML*/ `
    <div class="innerCard">
      ${data.title}
      <ul>
        ${data.items.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    </div>
  `;
}

function getJavaScriptHtml() {
  const data = model.cardContents.javascript;
  return /*HTML*/ `
    <div class="innerCard">
      ${data.title}
      <ul>
        ${data.items.map((item) => `<li>${item}</li>`).join("")}
        <li>
          <a href="${data.jsscriptrefurl}" target="_new">${data.jsscriptref}</a>
        </li>
      </ul>
    </div>
  `;
}

function updateGameView() {
  document.getElementById("head").innerHTML = /*HTML*/ `
    <button onclick="changeHead(-1)">◀</button>
    <img src="img/head${model.headIndex}.png" />
    <button onclick="changeHead(1)">▶</button>
  `;

  document.getElementById("body").innerHTML = /*HTML*/ `
    <button onclick="changeBody(-1)">◀</button>
    <img src="img/body${model.bodyIndex}.png" />
    <button onclick="changeBody(1)">▶</button>
  `;

  document.getElementById("legs").innerHTML = /*HTML*/ `
    <button onclick="changeLegs(-1)">◀</button>
    <img src="img/legs${model.legsIndex}.png" />
    <button onclick="changeLegs(1)">▶</button>
  `;
}

initView();
