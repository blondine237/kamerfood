/* Kamerfood — script principal */

const WHATSAPP_NUMBER = "237682293965";

function whatsappLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

const DISHES = [
  {
    slug: "ndole",
    name: "Ndolè",
    region: "Littoral",
    price: "3 500 FCFA",
    description:
      "La spécialité emblématique des peuples Sawa : feuilles de ndolè fondantes, arachides et crevettes charnues.",
    image: "images/ndole.png",
    category: "Plats signature",
  },
  {
    slug: "eru",
    name: "Eru",
    region: "Sud-Ouest",
    price: "3 000 FCFA",
    description:
      "Feuilles d'eru et waterleaf mijotées à l'huile de palme, servies avec du water fufu bien lisse.",
    image: "images/eru.png",
    category: "Plats signature",
  },
  {
    slug: "okok",
    name: "O'kok",
    region: "Centre & Sud",
    price: "3 000 FCFA",
    description:
      "Gnetum finement ciselé, manioc râpé et huile de palme rouge, servi avec des bâtons de manioc.",
    image: "images/okok.jpg",
    category: "Classiques",
  },
  {
    slug: "taro-sauce-jaune",
    name: "Taro sauce jaune",
    region: "Ouest (Grassfields)",
    price: "3 200 FCFA",
    description:
      "Le taro pilé des hauts plateaux, nappé de sa sauce jaune parfumée au njangsa et à l'huile de palme.",
    image: "images/taro.jpg",
    category: "Plats signature",
  },
  {
    slug: "met-de-pistache",
    name: "Met de pistache",
    region: "Centre",
    price: "3 500 FCFA",
    description:
      "Pistaches broyées, poisson fumé et épices, cuites à la vapeur dans la feuille de bananier.",
    image: "images/met-de-pistache.jpg",
    category: "Classiques",
  },
  {
    slug: "koki",
    name: "Koki",
    region: "Ouest",
    price: "3 000 FCFA",
    description:
      "Haricots blancs écrasés et huile de palme, cuits à la vapeur dans une feuille de bananier et servis avec du plantain.",
    image: "images/koki.jpg",
    category: "Classiques",
  },
  {
    slug: "mbongo-tchobi",
    name: "Mbongo Tchobi",
    region: "Littoral",
    price: "4 000 FCFA",
    description:
      "La sauce noire épicée du pays Bassa, aux graines grillées, servie avec plantains ou manioc.",
    image: "images/mbongo.jpg",
    category: "Grillades & mijotés",
  },
  {
    slug: "poisson-braise",
    name: "Poisson braisé",
    region: "Littoral",
    price: "4 000 FCFA",
    description:
      "Bar entier mariné aux herbes et braisé au feu de bois, servi avec sa sauce piment maison.",
    image: "images/poisson-braise.jpg",
    category: "Grillades & mijotés",
  },
  {
    slug: "poulet-dg",
    name: "Poulet DG",
    region: "National",
    price: "4 500 FCFA",
    description:
      "Poulet doré, plantains mûrs sautés et légumes croquants : le plat des grandes occasions.",
    image: "images/poulet-dg.jpg",
    category: "Grillades & mijotés",
  },
  {
    slug: "nkondre",
    name: "Nkondre",
    region: "Centre",
    price: "3 800 FCFA",
    description:
      "Plantains mûrs mijotés avec de la viande dans une sauce riche, épicée et légèrement sucrée.",
    image: "images/nkondre.jpg",
    category: "Grillades & mijotés",
  },
];

const CATEGORIES = ["Tout", "Plats signature", "Classiques", "Grillades & mijotés"];

function dishCard(dish) {
  return `
    <article class="dish">
      <div class="dish-media">
        <img src="${dish.image}" alt="${dish.name}, plat camerounais" loading="lazy" width="800" height="600" />
        <span class="dish-region">${dish.region}</span>
      </div>
      <div class="dish-body">
        <div class="dish-top">
          <h3>${dish.name}</h3>
          <span class="dish-price">${dish.price}</span>
        </div>
        <p>${dish.description}</p>
        <a class="btn btn-wa" target="_blank" rel="noopener noreferrer"
           href="${whatsappLink("Bonjour, je voudrais commander le " + dish.name)}">Dégustez !</a>
      </div>
    </article>`;
}

document.addEventListener("DOMContentLoaded", () => {
  /* Menu mobile */
  const burger = document.querySelector("[data-burger]");
  const mobileNav = document.querySelector("[data-mobile-nav]");
  if (burger && mobileNav) {
    burger.addEventListener("click", () => {
      const open = mobileNav.classList.toggle("open");
      burger.setAttribute("aria-expanded", String(open));
      burger.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
    });
  }

  /* Liens WhatsApp génériques */
  document.querySelectorAll("[data-wa]").forEach((el) => {
    el.setAttribute("href", whatsappLink(el.getAttribute("data-wa")));
  });

  /* Accueil : plats mis en avant */
  const highlights = document.querySelector("[data-highlights]");
  if (highlights) {
    highlights.innerHTML = DISHES.slice(0, 3).map(dishCard).join("");
  }

  /* Page menu : filtres + grille */
  const grid = document.querySelector("[data-menu-grid]");
  const filters = document.querySelector("[data-filters]");
  if (grid && filters) {
    let active = "Tout";
    const render = () => {
      const list = active === "Tout" ? DISHES : DISHES.filter((d) => d.category === active);
      grid.innerHTML = list.map(dishCard).join("");
      filters.querySelectorAll("button").forEach((b) => {
        b.classList.toggle("active", b.dataset.cat === active);
      });
    };
    filters.innerHTML = CATEGORIES.map(
      (c) => `<button type="button" class="filter" data-cat="${c}">${c}</button>`,
    ).join("");
    filters.addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-cat]");
      if (!btn) return;
      active = btn.dataset.cat;
      render();
    });
    render();
  }

  /* Page contact : composition du message WhatsApp */
  const form = document.querySelector("[data-order-form]");
  if (form) {
    const send = form.querySelector("[data-send]");
    const update = () => {
      const name = form.querySelector("#name").value.trim();
      const dish = form.querySelector("#dish").value.trim();
      const note = form.querySelector("#note").value.trim();
      const message =
        `Bonjour, je suis ${name || "un client"}. Je souhaite commander : ` +
        `${dish || "(plat à préciser)"}.${note ? ` Précisions : ${note}` : ""}`;
      send.setAttribute("href", whatsappLink(message));
    };
    form.addEventListener("input", update);
    form.addEventListener("submit", (e) => e.preventDefault());
    update();
  }

  /* Année du footer */
  const year = document.querySelector("[data-year]");
  if (year) year.textContent = String(new Date().getFullYear());
});
