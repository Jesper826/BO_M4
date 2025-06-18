const producten = [
  {
    naam: "Goedkope hoek Bank",
    categorie: "bank",
    prijs: 201.00,
    omschrijving: "Ruime, goedkope hoekbank voor een gezellige woonkamer. Betaalbare meubels voor elk interieur.",
    afbeelding: "img/hoek-bank.jpeg"
  },
  {
    naam: "Zelf gemaakte eettafel Hout",
    categorie: "tafel",
    prijs: 299.99,
    omschrijving: "Stevige eettafel van massief hout, ideaal voor het gezin.",
    afbeelding: "img/Eettafel-Hout.webp"
  },
  {
    naam: "Bureaustoel",
    categorie: "stoel",
    prijs: 89.99,
    omschrijving: "Ergonomische bureaustoel voor thuis of kantoor.",
    afbeelding: "img/Bureaustoel.jpeg"
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
    const detailPage = "producten/" + product.naam
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "") + ".html";
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.afbeelding}" alt="Goedkope ${product.naam} - betaalbare meubels">
      <h3>${product.naam}</h3>
      <p>€${product.prijs.toFixed(2)}</p>
      <p>${product.omschrijving}</p>
      <button onclick="addToCart('${product.naam}', ${product.prijs})">Voeg toe</button>
      <a href="${detailPage}" class="details-btn">Bekijk details</a>
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
    prijs: 150,
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

