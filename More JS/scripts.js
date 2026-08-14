const map = {
  outside: {
    description: "You are outside an apartment. </br> There is a door in front of you.",
    icon: `<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="beige" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`,
    exits: {
      forwards: "hallway",
      backwards: null,
      left: null,
      right: null,
    },
  },
  hallway: {
    description:
      "You are in the hallway. There are doors in front of you, behind you, on your left and on your right.",
    icon: `<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="beige" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h12a1 1 0 0 1 1 1v17H5V4a1 1 0 0 1 1-1z"></path><circle cx="15.5" cy="12.5" r="1" fill="beige"></circle></svg>`,
    exits: {
      forwards: "kitchen",
      backwards: "outside",
      left: "bathroom",
      right: "bedroom",
    },
  },
  kitchen: {
    description:
      "You are in the kitchen. There is a door behind you and on your right.",
    icon: `<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="beige" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-1"></path><path d="M4 8h14v7a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="3" x2="6" y2="5"></line><line x1="10" y1="2" x2="10" y2="5"></line><line x1="14" y1="3" x2="14" y2="5"></line></svg>`,
    exits: {
      forwards: null,
      backwards: "hallway",
      left: null,
      right: "bedroom",
    },
  },
  bathroom: {
    description: "You are in the bathroom. There is a door behind you.",
    icon: `<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="beige" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12h20v4a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4v-4z"></path><path d="M5 12V6a3 3 0 0 1 6 0v2"></path><line x1="2" y1="20" x2="4" y2="22"></line><line x1="22" y1="20" x2="20" y2="22"></line></svg>`,
    exits: {
      forwards: null,
      backwards: "hallway",
      left: null,
      right: null,
    },
  },
  bedroom: {
    description:
      "You are in the bedroom. There is a door behind you and on your left.",
    icon: `<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="beige" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4v16"></path><path d="M2 8h18a2 2 0 0 1 2 2v10"></path><path d="M2 17h20"></path><path d="M6 8v3"></path><path d="M10 8v3"></path></svg>`,
    exits: {
      forwards: null,
      backwards: "hallway",
      left: "kitchen",
      right: null,
    },
  },
};

let currentRoom = "outside";

function currentPosition() {
  const textArea = document.getElementById("textID");

  textArea.classList.add("fade");

  setTimeout(() => {
    textArea.innerHTML = `
    <div class="room-icon">${map[currentRoom].icon}</div>
    <div class="room-text">${map[currentRoom].description}</div>
  `;

    textArea.classList.remove("fade");
  }, 400);
}

function moveForwards() {
  let nextRoom = map[currentRoom].exits.forwards;

  if (nextRoom !== null) {
    currentRoom = nextRoom;
    currentPosition();
  }
}

function moveBackwards() {
  let nextRoom = map[currentRoom].exits.backwards;

  if (nextRoom !== null) {
    currentRoom = nextRoom;
    currentPosition();
  }
}

function moveLeft() {
  let nextRoom = map[currentRoom].exits.left;

  if (nextRoom !== null) {
    currentRoom = nextRoom;
    currentPosition();
  }
}

function moveRight() {
  let nextRoom = map[currentRoom].exits.right;

  if (nextRoom !== null) {
    currentRoom = nextRoom;
    currentPosition();
  }



}

currentPosition();
