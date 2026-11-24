
const categories = {
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

// بيانات تجريبية للاختبار
const places = [
  {
    id: 1,
    name: "لمعة الذهب",
    category: "gold",
    categoryLabel: "الصاغة",
    logo: "◇",
    description: "متجر للمجوهرات والذهب.",
    address: "الساحة العامة مقابل مطعم تشرين",
    phone: "0933169773",
    whatsapp: "963933169773"
  },
  {
    id: 2,
    name: "دار الألماس",
    category: "gold",
    categoryLabel: "الصاغة",
    logo: "◇",
    description: "محل تجريبي للمصوغات الذهبية.",
    address: "عنوان وهمي - شهبا"
  },
  {
    id: 3,
    name: "مذاق الدار",
    category: "food",
    categoryLabel: "المطاعم",
    logo: "♨",
    description: "مطعم تجريبي يقدم وجبات متنوعة.",
    address: "عنوان وهمي - شهبا"
  },
  {
    id: 4,
    name: "سفرة زمان",
    category: "food",
    categoryLabel: "المطاعم",
    logo: "♨",
    description: "مطعم تجريبي للمأكولات الشرقية.",
    address: "عنوان وهمي - شهبا"
  },
  {
    id: 5,
    name: "ركن الشواء",
    category: "food",
    categoryLabel: "المطاعم",
    logo: "♨",
    description: "مطعم تجريبي للمشاوي.",
    address: "عنوان وهمي - شهبا"
  },
  {
    id: 6,
    name: "بيت البيتزا",
    category: "food",
    categoryLabel: "المطاعم",
    logo: "♨",
    description: "مطعم تجريبي للبيتزا والوجبات السريعة.",
    address: "عنوان وهمي - شهبا"
  },
  {
    id: 7,
    name: "قهوة الحجر",
    category: "cafes",
    categoryLabel: "المقاهي",
    logo: "☕",
    description: "مقهى تجريبي بجلسات هادئة.",
    address: "عنوان وهمي - شهبا"
  },
  {
    id: 8,
    name: "كافيه الروقان",
    category: "cafes",
    categoryLabel: "المقاهي",
    logo: "☕",
    description: "مقهى تجريبي للمشروبات الساخنة والباردة.",
    address: "عنوان وهمي - شهبا"
  },
  {
    id: 9,
    name: "جلسة زمان",
    category: "cafes",
    categoryLabel: "المقاهي",
    logo: "☕",
    description: "مقهى تجريبي للقاء الأصدقاء.",
    address: "عنوان وهمي - شهبا"
  },
  {
    id: 10,
    name: "عيادة الشفاء",
    category: "health",
    categoryLabel: "العيادات والصحة",
    logo: "+",
    description: "عيادة طبية تجريبية.",
    address: "عنوان وهمي - شهبا"
  },
  {
    id: 11,
    name: "مركز العافية",
    category: "health",
    categoryLabel: "العيادات والصحة",
    logo: "+",
    description: "مركز صحي تجريبي.",
    address: "عنوان وهمي - شهبا"
  },
  {
    id: 12,
    name: "صيدلية الأمل",
    category: "health",
    categoryLabel: "العيادات والصحة",
    logo: "+",
    description: "صيدلية تجريبية.",
    address: "عنوان وهمي - شهبا"
  },
  {
    id: 13,
    name: "أناقة المدينة",
    category: "shopping",
    categoryLabel: "التسوق",
    logo: "▱",
    description: "متجر تجريبي للملابس.",
    address: "عنوان وهمي - شهبا"
  },
  {
    id: 14,
    name: "بيت الهدايا",
    category: "shopping",
    categoryLabel: "التسوق",
    logo: "▱",
    description: "متجر تجريبي للهدايا والإكسسوارات.",
    address: "عنوان وهمي - شهبا"
  },
  {
    id: 15,
    name: "لمسة جمال",
    category: "beauty",
    categoryLabel: "الجمال والعناية",
    logo: "✦",
    description: "مركز تجميلي تجريبي.",
    address: "عنوان وهمي - شهبا"
  },
  {
    id: 16,
    name: "أناقة بيوتي",
    category: "beauty",
    categoryLabel: "الجمال والعناية",
    logo: "✦",
    description: "متجر تجريبي لمستلزمات العناية.",
    address: "عنوان وهمي - شهبا"
  },
  {
    id: 17,
    name: "مركز التقنية",
    category: "services",
    categoryLabel: "الخدمات",
    logo: "⚙",
    description: "مركز تجريبي لخدمات الكمبيوتر.",
    address: "عنوان وهمي - شهبا"
  },
  {
    id: 18,
    name: "مفتاح للخدمات",
    category: "services",
    categoryLabel: "الخدمات",
    logo: "⚙",
    description: "مكتب خدمات تجريبي.",
    address: "عنوان وهمي - شهبا"
  },
  {
    id: 19,
    name: "مكتبة المعرفة",
    category: "other",
    categoryLabel: "أقسام أخرى",
    logo: "⌂",
    description: "مكتبة تجريبية للكتب والقرطاسية.",
    address: "عنوان وهمي - شهبا"
  },
  {
    id: 20,
    name: "حديقة الورد",
    category: "other",
    categoryLabel: "أقسام أخرى",
    logo: "⌂",
    description: "متجر تجريبي للزهور والنباتات.",
    address: "عنوان وهمي - شهبا"
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

let selectedCategory = "all";

let favorites = new Set(
  JSON.parse(localStorage.getItem("bawabat-favorites") || "[]")
);

const iconFor = (category) => ({
  gold: "◇",
  food: "♨",
  cafes: "☕",
  health: "+",
  shopping: "▱",
  beauty: "✦",
  services: "⚙",
  other: "⌂"
}[category] || "⌂");

function normalizeArabic(value) {
  return String(value ?? "").toLowerCase()
    .replace(/[أإآ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/[ًٌٍَُِّْـ]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[char]));
}

function getFilteredPlaces() {
  const term = normalizeArabic(searchInput.value);

  return places.filter(place => {
    const categoryMatch =
      selectedCategory === "all" ||
      place.category === selectedCategory;

    const haystack = normalizeArabic([
      place.name,
      place.categoryLabel,
      place.description,
      place.address
    ].join(" "));

    return categoryMatch &&
      (!term || haystack.includes(term));
  });
}

function renderPlaces() {
  const filtered = getFilteredPlaces();

  placesGrid.innerHTML = "";
  emptyState.hidden = filtered.length > 0;

  resultsMeta.textContent =
    `نعرض ${filtered.length} من ${places.length} مكاناً`;

  filtered.forEach(place => {
    const card = document.createElement("article");

    card.className = "place-card";

    card.innerHTML = `
      <button class="place-main" type="button"
        aria-label="تفاصيل ${escapeHTML(place.name)}">

        <span class="place-logo" aria-hidden="true">
          ${escapeHTML(place.logo || iconFor(place.category))}
        </span>

        <span class="place-info">
          <strong>${escapeHTML(place.name)}</strong>
          <span>${escapeHTML(place.categoryLabel)} · شهبا</span>
        </span>

        <span class="place-arrow" aria-hidden="true">‹</span>
      </button>

      <div class="place-actions">
        <span>${escapeHTML(place.address || "العنوان يضاف لاحقاً")}</span>

        <button
          class="favorite-button ${favorites.has(place.id) ? "saved" : ""}"
          type="button"
          aria-label="إضافة إلى المفضلة">
          ${favorites.has(place.id) ? "♥" : "♡"}
        </button>
      </div>
    `;

    card.querySelector(".place-main")
      .addEventListener("click", () => openPlace(place));

    card.querySelector(".favorite-button")
      .addEventListener("click", (event) => {
        event.stopPropagation();
        toggleFavorite(place.id);
        renderPlaces();
      });

    placesGrid.appendChild(card);
  });
}

function toggleFavorite(id) {
  favorites.has(id)
    ? favorites.delete(id)
    : favorites.add(id);

  localStorage.setItem(
    "bawabat-favorites",
    JSON.stringify([...favorites])
  );
}

function openPlace(place) {
  const phone = place.phone || "";
  const whatsapp = place.whatsapp || "";
  const hasPhone = Boolean(phone);
  const hasWhatsapp = Boolean(whatsapp);

  dialogContent.innerHTML = `
    <div class="detail-header">
      <div class="detail-logo">
        ${escapeHTML(place.logo || iconFor(place.category))}
      </div>

      <span class="dialog-tag">
        ${escapeHTML(place.categoryLabel)}
      </span>

      <h2>${escapeHTML(place.name)}</h2>

      <p class="detail-description">
        ${escapeHTML(
          place.description ||
          "سيتم إضافة تفاصيل هذا المكان بعد التحقق من معلوماته."
        )}
      </p>
    </div>

    <div class="detail-information">
      <h3>معلومات المكان</h3>

      <div class="detail-item">
        <span class="detail-item-icon">⌖</span>
        <div>
          <strong>العنوان</strong>
          <p>${escapeHTML(place.address || "سيضاف لاحقاً")}</p>
        </div>
      </div>

      <div class="detail-item">
        <span class="detail-item-icon">☎</span>
        <div>
          <strong>رقم الهاتف</strong>
          <p>${hasPhone ? escapeHTML(phone) : "غير متوفر حالياً"}</p>
        </div>
      </div>

      <div class="detail-item">
        <span class="detail-item-icon">◷</span>
        <div>
          <strong>أوقات العمل</strong>
          <p>سيتم إضافتها لاحقاً</p>
        </div>
      </div>
    </div>

    <div class="detail-actions">
      ${
        hasPhone
          ? `<a class="detail-call-button"
               href="tel:${escapeHTML(phone)}">
               ☎ اتصال هاتفي
             </a>`
          : ""
      }

      ${
        hasWhatsapp
          ? `<a class="detail-whatsapp-button"
               href="https://wa.me/${encodeURIComponent(whatsapp)}"
               target="_blank"
               rel="noopener noreferrer">
               ◉ تواصل عبر واتساب
             </a>`
          : ""
      }
    </div>

    <div class="detail-footer-note">
      البوابات · دليل مدينة شهبا
    </div>
  `;

  dialog.showModal();
}

categoryGrid.addEventListener("click", event => {
  const button = event.target.closest("[data-category]");

  if (!button) return;

  selectedCategory = button.dataset.category;

  categoryGrid.querySelectorAll(".category-card")
    .forEach(card => {
      card.classList.toggle("active", card === button);
    });

  renderPlaces();

  document.getElementById("featuredTitle").textContent =
    selectedCategory === "all"
      ? "أماكن مميزة"
      : categories[selectedCategory];
});

searchInput.addEventListener("input", () => {
  clearSearch.hidden = !searchInput.value;
  renderPlaces();
});

searchForm.addEventListener("submit", event => {
  event.preventDefault();
  renderPlaces();
});

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

  categoryGrid.querySelectorAll(".category-card")
    .forEach(card => {
      card.classList.toggle(
        "active",
        card.dataset.category === "all"
      );
    });

  document.getElementById("featuredTitle").textContent =
    "أماكن مميزة";

  renderPlaces();
});

document.getElementById("resetFilters").addEventListener("click", () => {
  selectedCategory = "all";
  searchInput.value = "";
  clearSearch.hidden = true;

  categoryGrid.querySelectorAll(".category-card")
    .forEach(card => {
      card.classList.toggle(
        "active",
        card.dataset.category === "all"
      );
    });

  document.getElementById("featuredTitle").textContent =
    "أماكن مميزة";

  renderPlaces();
});

document.getElementById("dialogClose")
  .addEventListener("click", () => dialog.close());

dialog.addEventListener("click", event => {
  if (event.target === dialog) {
    dialog.close();
  }
});

document.getElementById("year").textContent =
  new Date().getFullYear();

renderPlaces();
