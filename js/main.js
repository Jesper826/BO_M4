const producten = [
  {
    naam: "Leren Bank",
    categorie: "bank",
    prijs: 499.99,
    omschrijving: "Comfortabele leren bank met een luxe uitstraling.",
    afbeelding: "img/Leren-bank.jpeg"
  },
  {
    naam: "Hoek Bank",
    categorie: "bank",
    prijs: 499.99,
    omschrijving: "Ruime hoekbank voor een gezellige woonkamer.",
    afbeelding: "img/hoek-bank.jpeg"
  },
  {
    naam: "Rechte Bank",
    categorie: "bank",
    prijs: 499.99,
    omschrijving: "Stijlvolle rechte bank met een moderne uitstraling.",
    afbeelding: "img/rechte-bank.jpeg"
  },
  {
    naam: "Modulaire Bank",
    categorie: "bank",
    prijs: 499.99,
    omschrijving: "Comfortabele leren bank met een luxe uitstraling.",
    afbeelding: "img/modulaire-bank.jpeg"
  },
  {
    naam: "Eettafel Hout",
    categorie: "tafel",
    prijs: 299.99,
    omschrijving: "Stevige eettafel van massief hout, ideaal voor het gezin.",
    afbeelding: "img/Eettafel-Hout.webp"
  },
  {
    naam: "Vierkante eettafel",
    categorie: "tafel",
    prijs: 299.99,
    omschrijving: "Stevige eettafel van massief hout, ideaal voor het gezin.",
    afbeelding: "img/vierkante-eettafel.jpeg"
  },
  {
    naam: "Ronde eettafel",
    categorie: "tafel",
    prijs: 299.99,
    omschrijving: "Stevige eettafel van massief hout, ideaal voor het gezin.",
    afbeelding: "img/ronde-eettafel.jpeg"
  },
  {
    naam: "Ovale eettafel",
    categorie: "tafel",
    prijs: 299.99,
    omschrijving: "Stevige eettafel van massief hout, ideaal voor het gezin.",
    afbeelding: "img/ovale-eettafel.jpeg"
  },

  {
    naam: "Bureaustoel",
    categorie: "stoel",
    prijs: 89.99,
    omschrijving: "Ergonomische bureaustoel voor thuis of kantoor.",
    afbeelding: "img/Bureaustoel.jpeg"
  },
  {
    naam: "Standaard bureaustoel",
    categorie: "stoel",
    prijs: 89.99,
    omschrijving: "Basisstoel met wieltjes en verstelbare hoogte.",
    afbeelding: "img/standaard-bureaustoel.jpeg"
  },
  {
    naam: "Directiestoel",
    categorie: "stoel",
    prijs: 89.99,
    omschrijving: "Stijlvolle directiestoel met leren bekleding.",
    afbeelding: "img/Directiestoel.jpeg"
  },
  {
    naam: "Gamestoel",
    categorie: "stoel",
    prijs: 89.99,
    omschrijving: "Comfortabele gamestoel met verstelbare armleuningen.",
    afbeelding: "img/Gamestoel.jpeg"
  }

];

const productContainer = document.getElementById("product-container");
const winkelwagen = [];
const cartList = document.getElementById("cart-items");
const totaalText = document.getElementById("totaal");
const modal = document.getElementById("winkelwagen-modal");
const openBtn = document.getElementById("open-cart-btn");
const closeBtn = document.getElementById("close-cart-btn");
const filter = document.getElementById("filter");

function toonProducten(productLijst) {
  productContainer.innerHTML = "";
  productLijst.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.afbeelding}" alt="${product.naam}">
      <h3>${product.naam}</h3>
      <p>€${product.prijs.toFixed(2)}</p>
      <p>${product.omschrijving}</p>
      <button onclick="addToCart('${product.naam}', ${product.prijs})">Voeg toe</button>
    `;
    productContainer.appendChild(card);
  });
}

if (filter) {
  filter.addEventListener("change", () => {
    const gekozen = filter.value;
    if (gekozen === "alles") {
      toonProducten(producten);
    } else {
      const gefilterd = producten.filter(p => p.categorie === gekozen);
      toonProducten(gefilterd);
    }
  });
}

function addToCart(naam, prijs) {
  winkelwagen.push({ naam, prijs });
  updateCart();
}

function updateCart() {
  cartList.innerHTML = "";
  let totaal = 0;
  winkelwagen.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.naam} - €${item.prijs.toFixed(2)} <button class="remove-btn" onclick="removeFromCart(${index})">X</button>`;
    cartList.appendChild(li);
    totaal += item.prijs;
  });
  totaalText.textContent = `Totaal: €${totaal.toFixed(2)}`;
}

function removeFromCart(index) {
  winkelwagen.splice(index, 1);
  updateCart();
}

openBtn.addEventListener("click", () => {
  modal.style.display = "block";
});
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});
window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

const deals = [
  {
    naam: "kinder stoel",
    prijs: 50,
    omschrijving: "Leuke kinderstoel met een vrolijk design.",
    afbeelding: "img/kinder-stoel.jpeg"
  },
  {
    naam: "Eettafel plastic",
    prijs: 80,
    omschrijving: "Stevige eettafel van massief hout, ideaal voor het gezin.",
    afbeelding: "img/Eettafel-plastic.jpeg"
  },
  {
    naam: "Wit Hoek Bank",
    prijs: 35,
    omschrijving: "Ruime hoekbank voor een gezellige woonkamer.",
    afbeelding: "img/Wit-hoek-bank.jpeg"
  }
];

function toonDeals() {
  const dealsContainer = document.getElementById("product-container2");
  if (!dealsContainer) return;
  dealsContainer.innerHTML = "";
  deals.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.afbeelding}" alt="${product.naam}">
      <h3>${product.naam}</h3>
      <p>€${product.prijs.toFixed(2)}</p>
      <p>${product.omschrijving}</p>
      <button onclick="addToCart('${product.naam}', ${product.prijs})">Voeg toe</button>
    `;
    dealsContainer.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", function() {
  if (document.getElementById("product-container")) {
    toonProducten(producten);
  }
  if (document.getElementById("product-container2")) {
    toonDeals();
  }

  const darkBtn = document.getElementById("darkmode-toggle");
  if (darkBtn) {
    darkBtn.addEventListener("click", () => {
      document.body.classList.toggle("darkmode");
      localStorage.setItem("darkmode", document.body.classList.contains("darkmode"));
    });
    if (localStorage.getItem("darkmode") === "true") {
      document.body.classList.add("darkmode");
    }
  }

  const searchInput = document.getElementById("search");
  if (searchInput && document.getElementById("product-container")) {
    searchInput.addEventListener("input", function() {
      const zoekterm = searchInput.value.toLowerCase();
      const gefilterd = producten.filter(p => p.naam.toLowerCase().includes(zoekterm));
      toonProducten(gefilterd);
    });
  }
});

