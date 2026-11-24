/* البوابات — دليل شهبا
   البيانات المنشورة هنا هي المعلومات التي تم التحقق منها فقط.
   أضف بقية الأماكن بعد التأكد من أسمائها وعناوينها ووسائل التواصل.
*/

const categories = {
  all: "كل الأقسام", gold: "الصاغة", food: "المطاعم", cafes: "المقاهي",
  health: "العيادات والصحة", shopping: "التسوق", beauty: "الجمال والعناية",
  services: "الخدمات", other: "أقسام أخرى"
};

const places = [
  {
    id: "lamat-al-dhahab",
    name: "لمعة الذهب",
    category: "gold",
    categoryLabel: "الصاغة",
    description: "محل صياغة وبيع الذهب.",
    address: "الساحة العامة مقابل مطعم تشرين",
    phone: "0933169773",
    whatsapp: "963933169773",
    logo: "◇"
  }
];

const searchInput = document.getElementById("searchInput");
const searchForm = document.getElementById("searchForm");
const clearSearch = document.getElementById("clearSearch");
const categoryGrid = document.getElementById("categoryGrid");
const placesGrid = document.getElementById("placesGrid");
const emptyState = document.getElementById("emptyState");
const resultsMeta = document.getElementById("resultsMeta");
const dialog = document.getElementById("placeDialog");
const dialogContent = document.getElementById("dialogContent");
const dialogClose = document.getElementById("dialogClose");
const featuredTitle = document.getElementById("featuredTitle");

let selectedCategory = "all";
let previousBodyPosition = "";
let previousScrollY = 0;

function readFavorites() {
  try {
    const value = JSON.parse(localStorage.getItem("bawabat-favorites") || "[]");
    return new Set(Array.isArray(value) ? value : []);
  } catch {
    return new Set();
  }
}

let favorites = readFavorites();

const iconFor = (category) => ({
  gold: "◇", food: "♨", cafes: "☕", health: "+", shopping: "▱",
  beauty: "✦", services: "⚙", other: "⌂"
}[category] || "⌂");

function normalizeArabic(value) {
  return String(value ?? "").toLocaleLowerCase("ar")
    .replace(/[أإآ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/[ًٌٍَُِّْـ]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[char]));
}

function getFilteredPlaces() {
  const term = normalizeArabic(searchInput?.value || "");
  return places.filter((place) => {
    const categoryMatch = selectedCategory === "all" || place.category === selectedCategory;
    const searchable = normalizeArabic([
      place.name, place.categoryLabel, place.description, place.address
    ].join(" "));
    return categoryMatch && (!term || searchable.includes(term));
  });
}

function persistFavorites() {
  try {
    localStorage.setItem("bawabat-favorites", JSON.stringify([...favorites]));
  } catch (error) {
    console.warn("تعذر حفظ المفضلة على هذا الجهاز.", error);
  }
}

function toggleFavorite(id) {
  if (favorites.has(id)) favorites.delete(id);
  else favorites.add(id);
  persistFavorites();
}

function renderPlaces() {
  const filtered = getFilteredPlaces();
  placesGrid.replaceChildren();
  emptyState.hidden = filtered.length > 0;

  if (places.length) {
    resultsMeta.textContent = `نعرض ${filtered.length} من ${places.length} مكاناً`;
  } else {
    resultsMeta.textContent = "ستضاف بيانات الأماكن بعد جمعها والتحقق منها.";
  }

  filtered.forEach((place) => {
    const isSaved = favorites.has(place.id);
    const card = document.createElement("article");
    card.className = "place-card";
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `عرض تفاصيل ${place.name}`);

    card.innerHTML = `
      <div class="place-main">
        <span class="place-logo" aria-hidden="true">${escapeHTML(place.logo || iconFor(place.category))}</span>
        <span class="place-info">
          <strong>${escapeHTML(place.name)}</strong>
          <span>${escapeHTML(place.categoryLabel)} · شهبا</span>
        </span>
        <span class="place-arrow" aria-hidden="true">‹</span>
      </div>
      <div class="place-actions">
        <span>${escapeHTML(place.address || "العنوان يضاف لاحقاً")}</span>
        <button class="favorite-button ${isSaved ? "saved" : ""}" type="button"
          aria-label="${isSaved ? "إزالة من" : "إضافة إلى"} المفضلة" aria-pressed="${isSaved}">
          ${isSaved ? "♥" : "♡"}
        </button>
      </div>`;

    // كامل بطاقة المحل تفتح التفاصيل، وليس الاسم أو الجزء العلوي فقط.
    card.addEventListener("click", (event) => {
      if (event.target.closest(".favorite-button")) return;
      openPlace(place);
    });

    card.addEventListener("keydown", (event) => {
      if (event.target !== card) return;
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openPlace(place);
      }
    });

    card.querySelector(".favorite-button").addEventListener("click", (event) => {
      event.stopPropagation();
      toggleFavorite(place.id);
      renderPlaces();
    });

    placesGrid.appendChild(card);
  });
}

function lockPageScroll() {
  previousScrollY = window.scrollY || window.pageYOffset;
  previousBodyPosition = document.body.style.position;
  document.documentElement.classList.add("dialog-open");
  document.body.classList.add("dialog-open");
  document.body.style.position = "fixed";
  document.body.style.top = `-${previousScrollY}px`;
  document.body.style.width = "100%";
}

function unlockPageScroll() {
  document.documentElement.classList.remove("dialog-open");
  document.body.classList.remove("dialog-open");
  document.body.style.position = previousBodyPosition;
  document.body.style.top = "";
  document.body.style.width = "";
  window.scrollTo(0, previousScrollY);
}

function openPlace(place) {
  if (!place || dialog.open) return;

  const phone = String(place.phone || "").replace(/[^\d+]/g, "");
  const whatsapp = String(place.whatsapp || "").replace(/[^\d]/g, "");
  const saved = favorites.has(place.id);

  dialogContent.innerHTML = `
    <div class="detail-hero">
      <div class="detail-hero-logo">${escapeHTML(place.logo || iconFor(place.category))}</div>
      <div class="detail-hero-info">
        <span class="detail-category">${escapeHTML(place.categoryLabel)}</span>
        <h2>${escapeHTML(place.name)}</h2>
        <p>شهبا · محافظة السويداء</p>
      </div>
    </div>
    <section class="detail-section">
      <span class="detail-section-kicker">نبذة عن المكان</span>
      <h3 class="detail-section-heading">معلومات المكان</h3>
      <p class="detail-description">${escapeHTML(place.description || "لا تتوفر تفاصيل إضافية مؤكدة عن هذا المكان حالياً.")}</p>
    </section>
    <section class="detail-section">
      <h3 class="detail-section-heading">بيانات التواصل والعنوان</h3>
      <div class="detail-info-grid">
        <div class="detail-info-card"><span class="detail-info-icon">⌖</span><div><h4>العنوان</h4><p>${escapeHTML(place.address || "غير متوفر حالياً")}</p></div></div>
        <div class="detail-info-card"><span class="detail-info-icon">☎</span><div><h4>رقم الهاتف</h4><p>${phone ? escapeHTML(place.phone) : "غير متوفر حالياً"}</p></div></div>
      </div>
    </section>
    <section class="contact-section">
      <h3>التواصل مع المكان</h3>
      <div class="detail-contact-buttons">
        ${phone ? `<a class="detail-contact-button call-button" href="tel:${escapeHTML(phone)}">اتصال هاتفي</a>` : `<span class="detail-contact-unavailable">رقم الاتصال غير متوفر</span>`}
        ${whatsapp ? `<a class="detail-contact-button whatsapp-button" href="https://wa.me/${escapeHTML(whatsapp)}" target="_blank" rel="noopener noreferrer">واتساب</a>` : ""}
      </div>
    </section>
    <div class="detail-save-section">
      <button class="detail-favorite-button ${saved ? "saved" : ""}" type="button" aria-pressed="${saved}">
        ${saved ? "♥ إزالة من المفضلة" : "♡ إضافة إلى المفضلة"}
      </button>
    </div>`;

  lockPageScroll();
  dialog.showModal();
  dialog.querySelector(".dialog-close")?.focus();

  dialogContent.querySelector(".detail-favorite-button")?.addEventListener("click", () => {
    toggleFavorite(place.id);
    const button = dialogContent.querySelector(".detail-favorite-button");
    const isSaved = favorites.has(place.id);
    button.classList.toggle("saved", isSaved);
    button.setAttribute("aria-pressed", String(isSaved));
    button.textContent = isSaved ? "♥ إزالة من المفضلة" : "♡ إضافة إلى المفضلة";
    renderPlaces();
  });
}

function closePlaceDialog() {
  if (dialog.open) dialog.close();
}

function resetFilters() {
  selectedCategory = "all";
  searchInput.value = "";
  clearSearch.hidden = true;
  categoryGrid.querySelectorAll(".category-card").forEach((card) => {
    card.classList.toggle("active", card.dataset.category === "all");
    card.setAttribute("aria-pressed", String(card.dataset.category === "all"));
  });
  featuredTitle.textContent = "أماكن مميزة";
  renderPlaces();
}

categoryGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  selectedCategory = button.dataset.category;
  categoryGrid.querySelectorAll(".category-card").forEach((card) => {
    const active = card === button;
    card.classList.toggle("active", active);
    card.setAttribute("aria-pressed", String(active));
  });
  featuredTitle.textContent = selectedCategory === "all" ? "أماكن مميزة" : categories[selectedCategory];
  renderPlaces();
});

searchInput.addEventListener("input", () => {
  clearSearch.hidden = !searchInput.value;
  renderPlaces();
});

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  renderPlaces();
});

clearSearch.addEventListener("click", () => {
  searchInput.value = "";
  clearSearch.hidden = true;
  renderPlaces();
  searchInput.focus();
});

document.getElementById("showAll").addEventListener("click", resetFilters);
document.getElementById("resetFilters").addEventListener("click", resetFilters);
dialogClose.addEventListener("click", closePlaceDialog);

dialog.addEventListener("click", (event) => {
  // الضغط على المساحة الخارجية للنافذة يغلقها.
  if (event.target === dialog) closePlaceDialog();
});

dialog.addEventListener("close", () => {
  dialogContent.replaceChildren();
  unlockPageScroll();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && dialog.open) closePlaceDialog();
});

document.getElementById("year").textContent = new Date().getFullYear();
categoryGrid.querySelector('[data-category="all"]')?.classList.add("active");
categoryGrid.querySelector('[data-category="all"]')?.setAttribute("aria-pressed", "true");
renderPlaces();
