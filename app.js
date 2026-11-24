/* ==========================================
   البوابات - دليلك في شهبا
   نظام الأماكن وصفحات التفاصيل
========================================== */

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

// بيانات الأماكن التجريبية
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

// عناصر الصفحة الرئيسية
const homeView = document.getElementById("homeView");
const detailView = document.getElementById("detailView");
const detailPageContent =
  document.getElementById("detailPageContent");

const backToDirectory =
  document.getElementById("backToDirectory");

const detailHomeLink =
  document.getElementById("detailHomeLink");

const searchInput =
  document.getElementById("searchInput");

const searchForm =
  document.getElementById("searchForm");

const clearSearch =
  document.getElementById("clearSearch");

const categoryGrid =
  document.getElementById("categoryGrid");

const placesGrid =
  document.getElementById("placesGrid");

const emptyState =
  document.getElementById("emptyState");

const resultsMeta =
  document.getElementById("resultsMeta");

let selectedCategory = "all";

let favorites = new Set(
  JSON.parse(
    localStorage.getItem("bawabat-favorites") || "[]"
  )
);

// أيقونات الأقسام
function iconFor(category) {
  return {
    gold: "◇",
    food: "♨",
    cafes: "☕",
    health: "+",
    shopping: "▱",
    beauty: "✦",
    services: "⚙",
    other: "⌂"
  }[category] || "⌂";
}

// حماية النصوص عند عرضها
function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[char]));
}

// توحيد الكتابة العربية للبحث
function normalizeArabic(value) {
  return String(value ?? "")
    .toLowerCase()
    .replace(/[أإآ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/[ًٌٍَُِّْـ]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

// تصفية الأماكن
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

// عرض بطاقات الأماكن
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
      <button
        class="place-main"
        type="button"
        aria-label="عرض تفاصيل ${escapeHTML(place.name)}"
      >
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
        <span>
          ${escapeHTML(place.address || "العنوان يضاف لاحقاً")}
        </span>

        <button
          class="favorite-button ${favorites.has(place.id) ? "saved" : ""}"
          type="button"
          aria-label="إضافة إلى المفضلة"
        >
          ${favorites.has(place.id) ? "♥" : "♡"}
        </button>
      </div>
    `;

    card.querySelector(".place-main")
      .addEventListener("click", () => {
        openPlace(place);
      });

    card.querySelector(".favorite-button")
      .addEventListener("click", event => {
        event.stopPropagation();
        toggleFavorite(place.id);
        renderPlaces();
      });

    placesGrid.appendChild(card);
  });
}

// إضافة أو إزالة المفضلة
function toggleFavorite(id) {
  if (favorites.has(id)) {
    favorites.delete(id);
  } else {
    favorites.add(id);
  }

  localStorage.setItem(
    "bawabat-favorites",
    JSON.stringify([...favorites])
  );
}

// ==========================================
// صفحة تفاصيل المكان
// ==========================================

function renderPlaceDetails(place) {
  const phone = place.phone || "";
  const whatsapp = place.whatsapp || "";

  const phoneLink = phone
    ? `tel:${phone.replace(/[^\d+]/g, "")}`
    : "";

  const whatsappLink = whatsapp
    ? `https://wa.me/${encodeURIComponent(whatsapp)}`
    : "";

  detailPageContent.innerHTML = `
    <section class="detail-hero">

      <div class="detail-hero-logo">
        ${escapeHTML(place.logo || iconFor(place.category))}
      </div>

      <div class="detail-hero-info">
        <span class="detail-category">
          ${escapeHTML(place.categoryLabel)}
        </span>

        <h1>${escapeHTML(place.name)}</h1>

        <p>شهبا · محافظة السويداء</p>
      </div>

    </section>

    <section class="detail-section">

      <div class="detail-section-heading">
        <span class="detail-section-kicker">تعرف على المكان</span>
        <h2>نبذة عن المكان</h2>
      </div>

      <p class="detail-description">
        ${escapeHTML(
          place.description ||
          "سيتم إضافة وصف هذا المكان بعد التحقق من معلوماته."
        )}
      </p>

    </section>

    <section class="detail-section">

      <div class="detail-section-heading">
        <span class="detail-section-kicker">كل ما تحتاج معرفته</span>
        <h2>معلومات المكان</h2>
      </div>

      <div class="detail-info-grid">

        <div class="detail-info-card">
          <span class="detail-info-icon">⌖</span>
          <div>
            <strong>العنوان</strong>
            <p>
              ${escapeHTML(place.address || "سيضاف لاحقاً")}
            </p>
          </div>
        </div>

        <div class="detail-info-card">
          <span class="detail-info-icon">☎</span>
          <div>
            <strong>رقم الهاتف</strong>
            <p>
              ${phone
                ? escapeHTML(phone)
                : "غير متوفر حالياً"}
            </p>
          </div>
        </div>

        <div class="detail-info-card">
          <span class="detail-info-icon">◷</span>
          <div>
            <strong>أوقات العمل</strong>
            <p>سيتم إضافتها لاحقاً</p>
          </div>
        </div>

        <div class="detail-info-card">
          <span class="detail-info-icon">▦</span>
          <div>
            <strong>التصنيف</strong>
            <p>${escapeHTML(place.categoryLabel)}</p>
          </div>
        </div>

      </div>

    </section>

    <section class="detail-section contact-section">

      <div class="detail-section-heading">
        <span class="detail-section-kicker">ابقَ على تواصل</span>
        <h2>تواصل مع المكان</h2>
      </div>

      <div class="detail-contact-buttons">

        ${
          phone
            ? `
              <a
                class="detail-contact-button call-button"
                href="${escapeHTML(phoneLink)}"
              >
                <span>☎</span>
                <span>اتصال هاتفي</span>
              </a>
            `
            : `
              <span class="detail-contact-unavailable">
                لا يوجد رقم هاتف مسجل
              </span>
            `
        }

        ${
          whatsapp
            ? `
              <a
                class="detail-contact-button whatsapp-button"
                href="${escapeHTML(whatsappLink)}"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>◉</span>
                <span>تواصل عبر واتساب</span>
              </a>
            `
            : ""
        }

      </div>

    </section>

    <section class="detail-save-section">

      <button
        type="button"
        class="detail-favorite-button ${favorites.has(place.id) ? "saved" : ""}"
        id="detailFavoriteButton"
      >
        ${favorites.has(place.id) ? "♥ إزالة من المفضلة" : "♡ إضافة إلى المفضلة"}
      </button>

    </section>
  `;

  const favoriteButton =
    document.getElementById("detailFavoriteButton");

  favoriteButton.addEventListener("click", () => {
    toggleFavorite(place.id);
    renderPlaceDetails(place);
    renderPlaces();
  });
}

// فتح صفحة تفاصيل المكان
function openPlace(place) {
  if (!place) return;

  const nextURL = new URL(window.location.href);
  nextURL.searchParams.set("place", place.id);

  history.pushState(
    { placeId: place.id },
    "",
    nextURL
  );

  showPlacePage(place);
}

// إظهار صفحة التفاصيل
function showPlacePage(place) {
  homeView.hidden = true;
  detailView.hidden = false;

  renderPlaceDetails(place);

  document.title = `${place.name} | البوابات`;

  window.scrollTo({
    top: 0,
    behavior: "instant"
  });
}

// العودة إلى الدليل
function goToDirectory() {
  if (history.state && history.state.placeId) {
    history.back();
    return;
  }

  const cleanURL = new URL(window.location.href);
  cleanURL.searchParams.delete("place");

  history.replaceState({}, "", cleanURL);

  showHomePage();
}

// إظهار الصفحة الرئيسية
function showHomePage() {
  detailView.hidden = true;
  homeView.hidden = false;

  document.title = "البوابات | دليلك إلى شهبا";

  window.scrollTo({
    top: 0,
    behavior: "instant"
  });
}

// التعامل مع زر الرجوع في المتصفح
window.addEventListener("popstate", () => {
  const params = new URLSearchParams(window.location.search);
  const placeId = Number(params.get("place"));

  if (placeId) {
    const place = places.find(item => item.id === placeId);

    if (place) {
      showPlacePage(place);
      return;
    }
  }

  showHomePage();
});

// فتح صفحة التفاصيل عند تحديث الموقع إذا كان الرابط يحتوي على رقم محل
function loadInitialPage() {
  const params = new URLSearchParams(window.location.search);
  const placeId = Number(params.get("place"));

  if (!placeId) return;

  const place = places.find(item => item.id === placeId);

  if (place) {
    history.replaceState(
      { placeId: place.id },
      "",
      window.location.href
    );

    showPlacePage(place);
  } else {
    const cleanURL = new URL(window.location.href);
    cleanURL.searchParams.delete("place");
    history.replaceState({}, "", cleanURL);
  }
}

// ==========================================
// البحث والتصنيفات
// ==========================================

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

// عرض جميع الأماكن
function resetDirectoryFilters() {
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
}

document.getElementById("showAll")
  .addEventListener("click", resetDirectoryFilters);

document.getElementById("resetFilters")
  .addEventListener("click", resetDirectoryFilters);

// أزرار العودة
backToDirectory.addEventListener("click", goToDirectory);

detailHomeLink.addEventListener("click", event => {
  event.preventDefault();
  goToDirectory();
});

// تحديث السنة
document.getElementById("year").textContent =
  new Date().getFullYear();

document.getElementById("detailYear").textContent =
  new Date().getFullYear();

// تشغيل الموقع
renderPlaces();
loadInitialPage();
