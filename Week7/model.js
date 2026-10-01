export const model = {
  //------------------------------------------------------------------------
  //                        Global Stuff
  //------------------------------------------------------------------------
  app: {
    currentUser: null, // "admin" | "employee" | "customer"
    theme: "light",
    error: null,

    currentDateTime: new Date().toISOString(),
  },

  //------------------------------------------------------------------------
  //                        Customer Area
  //------------------------------------------------------------------------
  customer: {
    viewState: {
      currentPage: "mainPage", // "mainPage" | "cafeCheckoutPage" | "cakeBuilderPage" | "cakeCheckoutPage" | "receiptPage"
      activeCategory: "all",
      selectedProductId: null,
    },

    // 1. REGULAR CAFE CART (Baguettes, Coffee, Daily Pastries)
    cafeCart: {
      items: [
        // { productId: 1, quantity: 2, selectedOptions: ["skinke"] }
      ],
      pickupDate: "", // "2026-10-05"
      pickupTime: "", // "12:30"
      paymentMethod: "store", // "store" | "online"
      customerInfo: { name: "", email: "", phone: "" },
    },

    // 2. CUSTOM CAKE CART (Separate rules, 1-week advance notice, custom options)
    cakeCart: {
      quantity: 1,
      item: {
        typeId: "birthday",
        tasteId: "chocolate",
        colorId: "red",
        decorId: "stars",
        sizeId: "24cm",
        customText: "",
        totalPrice: 299,
      },
      pickupDate: "",
      pickupTime: "",
      customerInfo: {
        name: "",
        email: "",
        phone: "",
      },
    },
  },

  //------------------------------------------------------------------------
  //                        Employee Area
  //------------------------------------------------------------------------
  employee: {
    viewState: {
      currentPage: "ordersPage", // "ordersPage" | "orderHistoryPage"
      selectedOrderId: null,
    },
  },

  //------------------------------------------------------------------------
  //                        Admin Area
  //------------------------------------------------------------------------
  admin: {
    viewState: {
      currentPage: "dashboardPage", // "dashboardPage" | "productsPage" | "categoriesPage" | "hoursPage"
      editingProductId: null,
    },
    productForm: {
      name: "",
      description: "",
      allergens: [],
      options: [],
      price: 0,
      pictures: [],
      quantity: 0,
      categoryId: "",
      hasDiscount: false,
      discountAmount: 0,
    },
    hoursForm: {
      openingHours: {},
      pickupHours: {},
    },
  },

  //------------------------------------------------------------------------
  //                               Shared Data
  //------------------------------------------------------------------------
  data: {
    productRegister: [
      {
        id: 1,
        name: "Fin Baguette",
        description: "Nystekt fin baguette",
        allergens: ["Hvetemel", "Melk"],
        options: ["ost", "skinke", "smør"],
        price: 39.9,
        pictures: ["baguettefin1.jpg", "baguettefin2.jpg"],
        quantity: 15,
        categoryId: "baguetter",
        //Litt out of scope, men kjekt å ha
        hasDiscount: false,
        discountAmount: 0,
      },
      {
        id: 2,
        name: "Grov Baguette",
        description: "Nystekt grov baguette",
        allergens: ["Hvetemel", "Melk"],
        options: ["ost", "skinke", "smør"],
        price: 39.9,
        pictures: ["baguettegrov1.jpg", "baguettegrov2.jpg"],
        quantity: 10,
        categoryId: "baguetter",
        //Litt out of scope, men kjekt å ha
        hasDiscount: false,
        discountAmount: 0,
      },
    ],

    categories: ["Baguetter", "Kaker", "Snitter", "Kaffe"],
    //------------------------------------------------------------------------
    //                             Hours
    //------------------------------------------------------------------------

    openingHours: {
      mandag: { open: "10:00", close: "18:00" },
      tirsdag: { open: "10:00", close: "18:00" },
      onsdag: { open: "10:00", close: "18:00" },
      torsdag: { open: "10:00", close: "18:00" },
      fredag: { open: "10:00", close: "18:00" },
      lørdag: { open: "11:00", close: "17:00" },
      søndag: { open: null, close: null },
    },

    pickupHours: {
      mandag: { open: "10:30", close: "17:30" },
      tirsdag: { open: "10:30", close: "17:30" },
      onsdag: { open: "10:30", close: "17:30" },
      torsdag: { open: "10:30", close: "17:30" },
      fredag: { open: "10:30", close: "17:30" },
      lørdag: { open: "11:30", close: "16:30" },
      søndag: { open: null, close: null },
    },

    maxOrdersPerSlot: 10,

    cakeOptions: {
      types: [
        { id: "birthday", name: "Bursdagskake", basePrice: 19.9 },
        { id: "wedding", name: "Bryllupskake", basePrice: 49.9 },
      ],
      tastes: [
        { id: "chocolate", name: "Sjokolade", price: 19.9 },
        { id: "vanilla", name: "Vanilje", price: 14.9 },
      ],
      colors: [
        { id: "red", name: "Rød", price: 0 },
        { id: "blue", name: "Blå", price: 0 },
      ],
      decors: [
        { id: "stars", name: "Stjerner", price: 19.9 },
        { id: "flowers", name: "Blomster", price: 29.9 },
      ],
      sizes: [
        { id: "24cm", name: "24cm (8-10 biter)", price: 59.9 },
        { id: "27cm", name: "27cm (12-14 biter)", price: 89.9 },
      ],
    },

    orders: [
      {
        id: "AXG103",
        customerName: "Lars Larsensen",
        customerPhone: "12345678",
        customerEmail: "email@mail.com",
        items: [{ productId: 1, quantity: 2, selectedOptions: ["skinke"] }],
        paymentMethod: "card",
        paymentStatus: "unpaid",
        orderStatus: "received", // "received" | "preparing" | "ready" | "completed"
        pickupTime: "10:30",
        pickupDate: "2026-10-05",
      },
    ],

    ordersHistory: [
      {
        id: "AXG101",
        customerName: "Ola Nordmann",
        customerPhone: "87654321",
        customerEmail: "ola@mail.com",
        items: [{ productId: 2, quantity: 1, selectedOptions: [] }],
        paymentMethod: "card",
        paymentStatus: "paid",
        orderStatus: "completed",
        pickupTime: "10:30",
        pickupDate: "2026-09-28",
        pickedupTime: "10:30",
      },
    ],

    users: [
      {
        id: 0,
        role: "admin",
        username: "admin1",
        password: "mostSecurePassword",
      },
      {
        id: 1,
        role: "employee",
        username: "employee1",
        password: "mostSecurePassword",
      },
      {
        id: 2,
        role: "customer",
        username: "customer1",
        password: "mostSecurePassword",
        previousOrders: ["AXG101"],
      },
    ],
  },
};
