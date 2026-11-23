"use strict";

/* بيانات الأماكن
   سنضيف الأماكن الحقيقية بعد جمعها والتحقق منها.
*/
const places = [];

/* عناصر الصفحة */
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const clearSearch = document.getElementById("clearSearch");
const categoryGrid = document.getElementById("categoryGrid");
const placesGrid = document.getElementById("placesGrid");
const resultsMeta = document.getElementById("resultsMeta");
const emptyState = document.getElementById("emptyState");
const resetFilters = document.getElementById("resetFilters");
const showAll = document.getElementById("showAll");
const featuredTitle = document.getElementById("featuredTitle");
const placeDialog = document.getElementById("placeDialog");
const dialogClose = document.getElementById("dialogClose");
const dialogContent = document.getElementById("dialogContent");
const yearElement = document.getElementById("year");

/* حالة الموقع */
let activeCategory = "all";
let searchTerm = "";
let favorites = loadFavorites();

/* أسماء الأقسام */
const categoryNames = {
  all: "كل الأقسام",
  gold: "الصاغة",
  food: "المطاعم",
  cafes: "المقاهي",
  health: "العيادات والصحة",
  shopping: "التسوق",
  beauty: "الجمال والعناية",
  services: "الخدمات",
  other: "أقسام أخرى"
};

/* توحيد النص العربي لتسهيل البحث */
function normalizeArabic(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u064B-\u065F\u0670]/g, "")
    .replace(/[أإآ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه")
    .replace(/ـ/g, "")
    .trim();
}

/* تحميل المفضلة */
function loadFavorites() {
  try {
    const saved = localStorage.getItem("albawabat_favorites");
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    return [];
  }
}

/* حفظ المفضلة */
function saveFavorites() {
  try {
    localStorage.setItem(
      "albawabat_favorites",
      JSON.stringify(favorites)
    );
  } catch (error) {
    console.warn("تعذر حفظ المفضلة.");
  }
}

/* معرفة هل المكان ضمن المفضلة */
function isFavorite(id) {
  return favorites.includes(id);
}

/* تغيير حالة المفضلة */
function toggleFavorite(id) {
  if (isFavorite(id)) {
    favorites = favorites.filter(item => item !== id);
  } else {
    favorites.push(id);
  }

  saveFavorites();
  renderPlaces();
}

/* إنشاء بطاقة المكان */
function createPlaceCard(place) {
  const card = document.createElement("article");
  card.className = "place-card";

  const content = document.createElement("div");
  content.className = "place-card-content";

  const category = document.createElement("span");
  category.className = "place-category";
  category.textContent = categoryNames[place.category] || "مكان";

  const title = document.createElement("h3");
  title.textContent = place.name;

  const description = document.createElement("p");
  description.textContent = place.description || "لا توجد تفاصيل إضافية حالياً.";

  const actions = document.createElement("div");
  actions.className = "place-actions";

  const detailsButton = document.createElement("button");
  detailsButton.type = "button";
  detailsButton.textContent = "عرض التفاصيل";
  detailsButton.addEventListener("click", () => openPlaceDetails(place));

  const favoriteButton = document.createElement("button");
  favoriteButton.type = "button";
  favoriteButton.className = "favorite-button";
  favoriteButton.textContent = isFavorite(place.id) ? "♥" : "♡";
  favoriteButton.setAttribute(
    "aria-label",
    isFavorite(place.id) ? "إزالة من المفضلة" : "إضافة إلى المفضلة"
  );

  favoriteButton.addEventListener("click", () => {
    toggleFavorite(place.id);
  });

  actions.append(detailsButton, favoriteButton);
  content.append(category, title, description, actions);
  card.appendChild(content);

  return card;
}

/* عرض تفاصيل المكان */
function openPlaceDetails(place) {
  dialogContent.replaceChildren();

  const category = document.createElement("span");
  category.className = "place-category";
  category.textContent = categoryNames[place.category] || "مكان";

  const title = document.createElement("h2");
  title.textContent = place.name;

  const description = document.createElement("p");
  description.textContent = place.description || "لا توجد تفاصيل إضافية حالياً.";

  dialogContent.append(category, title, description);

  if (place.address) {
    const address = document.createElement("p");
    address.textContent = "العنوان: " + place.address;
    dialogContent.appendChild(address);
  }

  if (place.phone) {
    const phone = document.createElement("p");
    phone.textContent = "الهاتف: " + place.phone;
    dialogContent.appendChild(phone);
  }

  if (place.logo) {
    const logo = document.createElement("img");
    logo.src = place.logo;
    logo.alt = "شعار " + place.name;
    logo.style.maxWidth = "110px";
    logo.style.maxHeight = "90px";
    logo.style.objectFit = "contain";
    dialogContent.prepend(logo);
  }

  if (typeof placeDialog.showModal === "function") {
    placeDialog.showModal();
  }
}

/* البحث والتصفية */
function getFilteredPlaces() {
  return places.filter(place => {
    const matchesCategory =
      activeCategory === "all" ||
      place.category === activeCategory;

    const searchableText = normalizeArabic([
      place.name,
      place.description,
      place.address,
      categoryNames[place.category]
    ].join(" "));

    const matchesSearch =
      !searchTerm ||
      searchableText.includes(normalizeArabic(searchTerm));

    return matchesCategory && matchesSearch;
  });
}

/* تحديث عرض الأماكن */
function renderPlaces() {
  const filteredPlaces = getFilteredPlaces();

  placesGrid.replaceChildren();

  filteredPlaces.forEach(place => {
    placesGrid.appendChild(createPlaceCard(place));
  });

  const hasResults = filteredPlaces.length > 0;

  emptyState.hidden = hasResults;
  placesGrid.hidden = !hasResults;

  if (places.length === 0) {
    resultsMeta.textContent =
      "سيتم إضافة الأماكن الحقيقية بعد جمع بياناتها والتحقق منها.";
  } else {
    resultsMeta.textContent =
      "عدد النتائج: " + filteredPlaces.length;
  }

  if (featuredTitle) {
    featuredTitle.textContent =
      activeCategory === "all"
        ? "أماكن مميزة"
        : categoryNames[activeCategory] || "أماكن مميزة";
  }

  document.querySelectorAll(".category-card").forEach(button => {
    const isActive = button.dataset.category === activeCategory;

    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

/* اختيار قسم */
categoryGrid.addEventListener("click", event => {
  const button = event.target.closest(".category-card");

  if (!button) return;

  activeCategory = button.dataset.category || "all";
  renderPlaces();
});

/* تنفيذ البحث */
searchForm.addEventListener("submit", event => {
  event.preventDefault();
  searchTerm = searchInput.value.trim();
  renderPlaces();
});

/* البحث أثناء الكتابة */
searchInput.addEventListener("input", () => {
  searchTerm = searchInput.value.trim();
  clearSearch.hidden = !searchTerm;
  renderPlaces();
});

/* مسح البحث */
clearSearch.addEventListener("click", () => {
  searchInput.value = "";
  searchTerm = "";
  clearSearch.hidden = true;
  renderPlaces();
  searchInput.focus();
});

/* عرض جميع الأقسام */
function resetAllFilters() {
  activeCategory = "all";
  searchTerm = "";
  searchInput.value = "";
  clearSearch.hidden = true;
  renderPlaces();
}

resetFilters.addEventListener("click", resetAllFilters);
showAll.addEventListener("click", resetAllFilters);

/* إغلاق نافذة التفاصيل */
dialogClose.addEventListener("click", () => {
  placeDialog.close();
});

placeDialog.addEventListener("click", event => {
  if (event.target === placeDialog) {
    placeDialog.close();
  }
});

/* تحديث السنة */
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

/* تشغيل الموقع */
renderPlaces();
