const categories = {
  all: "كل الأقسام", gold: "الصاغة", food: "المطاعم", cafes: "المقاهي",
  health: "العيادات والصحة", shopping: "التسوق", beauty: "الجمال والعناية",
  services: "الخدمات", other: "أقسام أخرى"
};

// لا توجد أسماء محلات حقيقية في هذه النسخة؛ أضف البيانات بعد جمعها والتحقق منها.
const places = [];

const searchInput = document.getElementById("searchInput");
const searchForm = document.getElementById("searchForm");
const clearSearch = document.getElementById("clearSearch");
const categoryGrid = document.getElementById("categoryGrid");
const placesGrid = document.getElementById("placesGrid");
const emptyState = document.getElementById("emptyState");
const resultsMeta = document.getElementById("resultsMeta");
const dialog = document.getElementById("placeDialog");
const dialogContent = document.getElementById("dialogContent");
let selectedCategory = "all";
let favorites = new Set(JSON.parse(localStorage.getItem("bawabat-favorites") || "[]"));

const iconFor = (category) => ({
  gold:"◇", food:"♨", cafes:"☕", health:"+", shopping:"▱",
  beauty:"✦", services:"⚙", other:"⌂"
}[category] || "⌂");

function normalizeArabic(value) {
  return value.toLowerCase()
    .replace(/[أإآ]/g, "ا").replace(/ى/g, "ي")
    .replace(/[ًٌٍَُِّْـ]/g, "").replace(/\s+/g, " ").trim();
}

function getFilteredPlaces() {
  const term = normalizeArabic(searchInput.value);
  return places.filter(place => {
    const categoryMatch = selectedCategory === "all" || place.category === selectedCategory;
    const haystack = normalizeArabic([place.name, place.categoryLabel, place.description, place.address].join(" "));
    return categoryMatch && (!term || haystack.includes(term));
  });
}

function renderPlaces() {
  const filtered = getFilteredPlaces();
  placesGrid.innerHTML = "";
  emptyState.hidden = filtered.length > 0;
  resultsMeta.textContent = places.length
    ? `نعرض ${filtered.length} من ${places.length} مكاناً`
    : "هذه واجهة تجريبية أولية — ستضاف بيانات الأماكن بعد جمعها والتحقق منها.";

  filtered.forEach(place => {
    const card = document.createElement("article");
    card.className = "place-card";
    card.innerHTML = `
      <button class="place-main" type="button" aria-label="تفاصيل ${escapeHTML(place.name)}">
        <span class="place-logo" aria-hidden="true">${escapeHTML(place.logo || iconFor(place.category))}</span>
        <span class="place-info"><strong>${escapeHTML(place.name)}</strong><span>${escapeHTML(place.categoryLabel)} · شهبا</span></span>
        <span class="place-arrow" aria-hidden="true">‹</span>
      </button>
      <div class="place-actions"><span>${escapeHTML(place.address || "العنوان يضاف لاحقاً")}</span>
      <button class="favorite-button ${favorites.has(place.id) ? "saved" : ""}" type="button" aria-label="إضافة إلى المفضلة">${favorites.has(place.id) ? "♥" : "♡"}</button></div>`;
    card.querySelector(".place-main").addEventListener("click", () => openPlace(place));
    card.querySelector(".favorite-button").addEventListener("click", (event) => {
      event.stopPropagation();
      toggleFavorite(place.id);
      renderPlaces();
    });
    placesGrid.appendChild(card);
  });
}

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;"
  }[char]));
}

function toggleFavorite(id) {
  favorites.has(id) ? favorites.delete(id) : favorites.add(id);
  localStorage.setItem("bawabat-favorites", JSON.stringify([...favorites]));
}

function openPlace(place) {
  dialogContent.innerHTML = `
    <span class="dialog-tag">${escapeHTML(place.categoryLabel)}</span>
    <h2>${escapeHTML(place.name)}</h2>
    <p>${escapeHTML(place.description || "سيتم إضافة تفاصيل هذا المكان بعد التحقق من معلوماته.")}</p>
    <div class="dialog-note">العنوان: ${escapeHTML(place.address || "سيضاف لاحقاً")}<br>رقم الهاتف: ${escapeHTML(place.phone || "غير متوفر حالياً")}</div>`;
  dialog.showModal();
}

categoryGrid.addEventListener("click", event => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  selectedCategory = button.dataset.category;
  categoryGrid.querySelectorAll(".category-card").forEach(card => card.classList.toggle("active", card === button));
  renderPlaces();
  document.getElementById("featuredTitle").textContent = selectedCategory === "all" ? "أماكن مميزة" : categories[selectedCategory];
});
searchInput.addEventListener("input", () => {
  clearSearch.hidden = !searchInput.value;
  renderPlaces();
});
searchForm.addEventListener("submit", event => { event.preventDefault(); renderPlaces(); });
clearSearch.addEventListener("click", () => {
  searchInput.value = "";
  clearSearch.hidden = true;
  renderPlaces();
  searchInput.focus();
});
document.getElementById("showAll").addEventListener("click", () => {
  selectedCategory = "all";
  searchInput.value = "";
  clearSearch.hidden = true;
  categoryGrid.querySelectorAll(".category-card").forEach(card => card.classList.toggle("active", card.dataset.category === "all"));
  document.getElementById("featuredTitle").textContent = "أماكن مميزة";
  renderPlaces();
});
document.getElementById("resetFilters").addEventListener("click", () => {
  selectedCategory = "all";
  searchInput.value = "";
  clearSearch.hidden = true;
  categoryGrid.querySelectorAll(".category-card").forEach(card => card.classList.toggle("active", card.dataset.category === "all"));
  document.getElementById("featuredTitle").textContent = "أماكن مميزة";
  renderPlaces();
});
document.getElementById("dialogClose").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => {
  if (event.target === dialog) dialog.close();
});
document.getElementById("year").textContent = new Date().getFullYear();
renderPlaces();
