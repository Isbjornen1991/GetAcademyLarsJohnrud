const model = {
  app: {},
  viewState: {
    selectedShowingId: null,

    selectedSeats: [],

    name: "",
    phone: "",
    message: "",
  },
  data: {
    hall: {
      rows: ["A", "B", "C", "D", "E", "F"],
      seatsPerRow: 8,
    },

    showings: [
      { id: 1, title: "Nordlys", time: "Fredag 20.11 kl. 19:30", price: 140 },
      {
        id: 2,
        title: "Fjellbekken",
        time: "Lørdag 21.11 kl. 16:00",
        price: 110,
      },
      {
        id: 3,
        title: "Siste stopp",
        time: "Lørdag 21.11 kl. 21:00",
        price: 140,
      },
    ],

    reservations: [
      {
        showingId: 1,
        name: "Kari Nordmann",
        phone: "12345678",
        seats: [
          { row: "D", number: 3 },
          { row: "D", number: 4 },
          { row: "D", number: 5 },
        ],
      },
      {
        showingId: 1,
        name: "Ola Nordmann",
        phone: "87654321",
        seats: [
          { row: "F", number: 1 },
          { row: "F", number: 2 },
        ],
      },
      {
        showingId: 3,
        name: "Svein Svensen",
        phone: "45678912",
        seats: [
          { row: "A", number: 3 },
          { row: "A", number: 4 },
          { row: "A", number: 5 },
        ],
      },
    ],
  },
};
