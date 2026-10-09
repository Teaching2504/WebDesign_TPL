
let baseConfig = null;
let activeConfig = null;
let currentLang = "vi";

/* =========================================
   1. LOAD CSS
   ========================================= */

function loadCSS(href) {
    return new Promise((resolve) => {
        if (document.querySelector(`link[href="${href}"]`)) {
            resolve();
            return;
        }

        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = href;
        link.onload = resolve;
        link.onerror = resolve;
        document.head.appendChild(link);
    });
}

/* =========================================
   2. APPLY THEME
   ========================================= */

function applyTheme(config) {
    const root = document.documentElement;
    const theme = config.theme || {};
    const baseTheme = baseConfig?.theme || {};

    const variables = {
        "--primary-color": "primary_color",
        "--secondary-color": "secondary_color",
        "--third-color": "third_color",
        "--accent-color": "accent_color",
        "--bg-color": "bg_color",
        "--text-color": "text_color",
        "--footer-color": "footer_color",
        "--bg-surface": "bg_surface",
        "--text-muted": "text_muted",
        "--border-color": "border_color",
        "--font-family": "font_family"
    };

    Object.entries(variables).forEach(([variable, key]) => {
        const value = theme[key] ?? baseTheme[key];

        if (value !== undefined && value !== null) {
            root.style.setProperty(variable, value);
        } else {
            root.style.removeProperty(variable);
        }
    });
}

/* =========================================
   3. RENDER BRAND
   ========================================= */

function renderBrand(config) {
    const brandName = config.brand_name || "Thương hiệu";

    document.title = brandName;

    const logo = document.getElementById("brand-logo");

    if (logo) {
        logo.replaceChildren();

        if (config.logo_url) {
            const image = document.createElement("img");
            image.src = config.logo_url;
            image.alt = brandName;
            logo.appendChild(image);
        }

        const name = document.createElement("span");
        name.className = "logo-text";
        name.textContent = brandName;
        logo.appendChild(name);
    }

    const footerName = document.getElementById("footer-brand-name");
    const copyright = document.getElementById("footer-copyright");

    if (footerName) footerName.textContent = brandName;

    if (copyright) {
        copyright.textContent =
            `© Bản quyền thuộc về ${brandName} - ${new Date().getFullYear()}`;
    }

    const contact = config.contact || {};

    const phone = document.getElementById("footer-phone");
    const email = document.getElementById("footer-email");
    const address = document.getElementById("footer-address");

    if (phone) phone.textContent = contact.phone || "";
    if (email) email.textContent = contact.email || "";
    if (address) address.textContent = contact.address || "";
}

/* =========================================
   4. HERO COMBINED
   Mot anh ghep cho moi thuong hieu.
   Duong dan va noi dung lay tu JSON.
   ========================================= */

function renderHero(config) {
    const heroSection = document.getElementById("hero");
    if (!heroSection) return;

    const hero = config.hero || {};

    const dict = {
        ...(baseConfig?.[currentLang] || {}),
        ...(config?.[currentLang] || {})
    };

    const combinedImage = hero.combined_image || "";

    heroSection.style.setProperty(
        "--hero-frame-bg",
        hero.frame_color ||
        config.theme?.secondary_color ||
        "#ffffff"
    );

    heroSection.style.setProperty("--hero-bg-image", "none");

    heroSection.replaceChildren();

    const shell = document.createElement("div");
    shell.className = "container hero-combined-shell";

    if (combinedImage) {
        const imageWrap = document.createElement("div");
        imageWrap.className = "hero-combined-image-wrap";

        const image = document.createElement("img");
        image.className = "hero-combined-image";
        image.src = combinedImage;
        image.alt = `Banner và bộ sản phẩm ${config.brand_name || ""}`;

        imageWrap.appendChild(image);
        shell.appendChild(imageWrap);
    } else {
        const fallback = document.createElement("div");
        fallback.className = "hero-combined-fallback";

        const title = document.createElement("h1");
        title.textContent = config.brand_name || "Thương hiệu";

        const desc = document.createElement("p");
        desc.textContent =
            config.hero?.description ||
            "Khám phá các sản phẩm và câu chuyện thương hiệu.";

        fallback.append(title, desc);
        shell.appendChild(fallback);
    }

    const actions = document.createElement("div");
    actions.id = "hero-actions";
    actions.className = "hero-combined-actions";

    const explore = document.createElement("a");
    explore.href = "#products";
    explore.className = "btn btn-primary";
    explore.textContent =
        dict.btn_explore || "Khám phá sản phẩm";

    const story = document.createElement("a");
    story.href = "#about";
    story.className = "btn btn-outline";
    story.textContent =
        dict.btn_learn_more || "Khám phá câu chuyện";

    actions.append(explore, story);
    shell.appendChild(actions);

    heroSection.appendChild(shell);
}

/* =========================================
   5. STORY
   ========================================= */

function renderStory(config) {
    const title = document.querySelector(".story-title");
    const badge = document.querySelector(".story-badge");
    const desc = document.querySelector(".story-desc");

    const dict = {
        ...(baseConfig?.[currentLang] || {}),
        ...(config?.[currentLang] || {})
    };

    if (badge) badge.textContent = dict.story_badge || "";
    if (title) title.textContent = dict.story_title || "";
    if (desc) desc.textContent = dict.story_desc || "";
}

/* =========================================
   6. PRODUCT CATEGORIES
   ========================================= */

function renderCategories(categories, customColors) {
    const container = document.getElementById("categoriesContainer");
    if (!container) return;

    container.replaceChildren();

    if (!Array.isArray(categories)) return;

    categories.forEach((cat, index) => {
        const color =
            customColors?.[index] ||
            cat.color ||
            "var(--accent-color)";

        const card = document.createElement("div");
        card.className = "category-card";

        const image = document.createElement("img");
        image.className = "cat-image";
        image.src = cat.image || "";
        image.alt = cat.name || "";

        const pill = document.createElement("div");
        pill.className = "cat-pill";
        pill.style.backgroundColor = color;

        const title = document.createElement("h3");
        title.className = "cat-title";
        title.textContent = cat.name || "";

        const desc = document.createElement("p");
        desc.className = "cat-desc";
        desc.textContent = cat.desc || "";

        const detailBtn = document.createElement("span");
        detailBtn.className = "cat-action product-detail-btn";
        detailBtn.style.color = color;
        detailBtn.textContent =
            currentLang === "en" ? "View details →" : "Xem chi tiết →";

        detailBtn.addEventListener("click", () => {
            openProductModal(cat);
        });

        card.append(image, pill, title, desc, detailBtn);
        container.appendChild(card);
    });
}

/* =========================================
   7. PRODUCT MODAL
   ========================================= */

function openProductModal(product) {
    const modal = document.getElementById("productModal");
    if (!modal) return;

    const image = document.getElementById("modalProductImage");
    const name = document.getElementById("modalProductName");
    const desc = document.getElementById("modalProductDesc");
    const detail = document.getElementById("modalProductDetail");

    if (image) {
        image.src = product.image || "";
        image.alt = product.name || "";
    }

    if (name) name.textContent = product.name || "";
    if (desc) desc.textContent = product.desc || "";

    if (detail) {
        detail.textContent =
            product.detail || product.desc || "";
    }

    modal.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeProductModal() {
    const modal = document.getElementById("productModal");

    if (modal) {
        modal.classList.remove("active");
        document.body.style.overflow = "";
    }
}

/* =========================================
   8. LANGUAGE
   ========================================= */

async function setLanguage(lang) {
    if (!baseConfig) return;

    const config = activeConfig || baseConfig;

    currentLang = baseConfig[lang] ? lang : "vi";

    const dict = {
        ...(baseConfig[currentLang] || {}),
        ...(config[currentLang] || {})
    };

    document.querySelectorAll("[data-i18n]").forEach((element) => {
        const key = element.getAttribute("data-i18n");

        if (dict[key] !== undefined && !Array.isArray(dict[key])) {
            element.textContent = dict[key];
        }
    });

    const categories =
        config[currentLang]?.categories ||
        config.categories ||
        baseConfig[currentLang]?.categories;

    renderCategories(categories, config.category_colors);

    renderStory(config);
    renderHero(config);

    document.querySelectorAll(".btn-lang").forEach((button) => {
        button.classList.toggle(
            "active",
            button.getAttribute("data-lang") === currentLang
        );
    });

    localStorage.setItem("app_lang", currentLang);
}

/* =========================================
   9. CHANGE BRAND
   ========================================= */

async function applyBrandConfig(config) {
    activeConfig = config;

    document.body.classList.toggle(
        "brand-punevie",
        config.brand_id === "punevie_skincare_02"
    );

    applyTheme(config);
    renderBrand(config);

    await setLanguage(currentLang);
}

async function switchTheme(themeFile) {
    try {
        const response = await fetch(`config/${themeFile}`);

        if (!response.ok) {
            throw new Error(`Không tải được ${themeFile}`);
        }

        const config = await response.json();
        await applyBrandConfig(config);
    } catch (error) {
        console.error("Lỗi chuyển thương hiệu:", error);
    }
}

/* =========================================
   10. INIT APPLICATION
   ========================================= */

async function initApp() {
    try {
        const response = await fetch("config/site.config.json");

        if (!response.ok) {
            throw new Error("Không tải được cấu hình mặc định");
        }

        baseConfig = await response.json();

        const savedLang =
            localStorage.getItem("app_lang") ||
            baseConfig.default_language ||
            "vi";

        currentLang = savedLang;

        await applyBrandConfig(baseConfig);
    } catch (error) {
        console.error("Lỗi khởi tạo website:", error);
    }
}

/* =========================================
   11. EVENTS
   ========================================= */

document.addEventListener("DOMContentLoaded", async () => {
    await loadCSS("css/reset.css");
    await loadCSS("css/style.css");
    await loadCSS("css/responsive.css");

    const savedTheme =
        localStorage.getItem("app_theme") || "light";

    document.documentElement.setAttribute(
        "data-theme",
        savedTheme
    );

    const darkBtn = document.getElementById("darkModeBtn");

    if (darkBtn) {
        darkBtn.textContent =
            savedTheme === "dark" ? "☀️" : "🌙";

        darkBtn.addEventListener("click", () => {
            const isDark =
                document.documentElement.getAttribute("data-theme") === "dark";

            const nextTheme = isDark ? "light" : "dark";

            document.documentElement.setAttribute(
                "data-theme",
                nextTheme
            );

            localStorage.setItem("app_theme", nextTheme);

            darkBtn.textContent =
                nextTheme === "dark" ? "☀️" : "🌙";
        });
    }

    await initApp();

    const select = document.getElementById("configPresetSelect");

    if (select) {
        select.addEventListener("change", async (event) => {
            await switchTheme(event.target.value);
        });
    }

    document.querySelectorAll(".btn-lang").forEach((button) => {
        button.addEventListener("click", async () => {
            await setLanguage(button.getAttribute("data-lang"));
        });
    });

    const navToggle = document.getElementById("navToggle");
    const navMenu = document.getElementById("navMenu");

    if (navToggle && navMenu) {
        navToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");
        });

        navMenu.querySelectorAll(".nav-link, .btn").forEach((item) => {
            item.addEventListener("click", () => {
                navMenu.classList.remove("active");
            });
        });
    }

    const modalClose = document.getElementById("productModalClose");
    const modalOverlay = document.getElementById("productModalOverlay");

    if (modalClose) {
        modalClose.addEventListener("click", closeProductModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener("click", closeProductModal);
    }

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") closeProductModal();
    });
});
