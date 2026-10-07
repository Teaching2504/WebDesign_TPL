let baseConfig = null;
let currentLang = "vi";

function loadCSS(href) {
    return new Promise((resolve) => {
        if (document.querySelector(`link[href="${href}"]`)) return resolve();
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = href;
        link.onload = () => resolve();
        link.onerror = () => resolve();
        document.head.appendChild(link);
    });
}

async function setLanguage(lang) {
    try {
        if (!baseConfig || !baseConfig[lang]) {
            console.error(`Không tìm thấy ngôn ngữ: ${lang}`);
            return;
        }

        const dict = baseConfig[lang];
        currentLang = lang;

        document.querySelectorAll("[data-i18n]").forEach((el) => {
            const key = el.getAttribute("data-i18n");

            if (dict[key]) {
                el.textContent = dict[key];
            }
        });
        if (dict.categories) {
            renderCategories(dict.categories, null);
        }

        document.querySelectorAll(".btn-lang").forEach((btn) => {
            btn.classList.toggle(
                "active",
                btn.getAttribute("data-lang") === lang
            );
        });

        localStorage.setItem("app_lang", lang);

    } catch (err) {
        console.error("Lỗi chuyển ngôn ngữ:", err);
    }
}

function renderCategories(categories, customColors) {
    const catContainer = document.getElementById("categoriesContainer");
    if (!catContainer || !categories) return;

    catContainer.innerHTML = "";
    categories.forEach((cat, index) => {
        const color = (customColors && customColors[index]) ? customColors[index] : cat.color;
        const card = document.createElement("div");
        card.className = "category-card";
        card.innerHTML = ` 
    <img class="cat-image" src="${cat.image}" alt="${cat.name}">
    <div class="cat-pill" style="background:${color}"></div> 
    <h3 class="cat-title">${cat.name}</h3> 
    <p class="cat-desc">${cat.desc}</p> 
    <span class="cat-action" style="color:${color}">
        ${currentLang === "en" ? "View details →" : "Xem chi tiết →"}
    </span> 
`;
        catContainer.appendChild(card);
    });
}

async function switchTheme(themeFile) {
    try {
        const res = await fetch(`config/${themeFile}`);
        if (!res.ok) return;
        const data = await res.json();

        const root = document.documentElement;
        const theme = data.theme;

        if (theme) {
            if (theme.primary_color) root.style.setProperty("--primary-color", theme.primary_color);
            if (theme.secondary_color) root.style.setProperty("--secondary-color", theme.secondary_color);

            if (theme.third_color) {
                root.style.setProperty("--third-color", theme.third_color);
            }
            if (theme.accent_color) root.style.setProperty("--accent-color", theme.accent_color);
            if (theme.bg_color) root.style.setProperty("--bg-color", theme.bg_color);
            if (theme.text_color) root.style.setProperty("--text-color", theme.text_color);
            if (theme.footer_color) {
                root.style.setProperty("--footer-color", theme.footer_color);
            }
        }

        if (baseConfig && baseConfig[currentLang] && baseConfig[currentLang].categories) {
            renderCategories(
                baseConfig[currentLang].categories,
                data.category_colors
            );
        }
    } catch (err) {
        console.error(err);
    }
}

async function initApp() {
    try {
        const res = await fetch("config/site.config.json");
        if (!res.ok) return;
        baseConfig = await res.json();

        const root = document.documentElement;
        if (baseConfig.theme) {
            root.style.setProperty("--primary-color", baseConfig.theme.primary_color);
            root.style.setProperty("--secondary-color", baseConfig.theme.secondary_color);
            root.style.setProperty("--third-color", baseConfig.theme.third_color);
            root.style.setProperty("--accent-color", baseConfig.theme.accent_color);
            root.style.setProperty("--bg-color", baseConfig.theme.bg_color);
            root.style.setProperty("--text-color", baseConfig.theme.text_color);
            root.style.setProperty("--header-footer-color", baseConfig.theme.header_footer_color);
            root.style.setProperty("--footer-color", baseConfig.theme.footer_color);
        }

        if (baseConfig.brand_name) {
            document.title = baseConfig.brand_name;
            const logoEl = document.getElementById("brand-logo");
            if (logoEl) {
                logoEl.innerHTML = `
        <img src="${baseConfig.logo_url}" alt="${baseConfig.brand_name}">
        <span class="logo-text">${baseConfig.brand_name}</span>
    `;
            }

            const fBrand = document.getElementById("footer-brand-name");
            if (fBrand) fBrand.textContent = baseConfig.brand_name;

            const fCopy = document.getElementById("footer-copyright");
            if (fCopy) fCopy.textContent = `© Bản quyền thuộc về ${baseConfig.brand_name} - ${new Date().getFullYear()}`;
        }

        if (baseConfig.contact) {
            const phone = document.getElementById("footer-phone");
            const email = document.getElementById("footer-email");
            const addr = document.getElementById("footer-address");
            if (phone && baseConfig.contact.phone) phone.textContent = baseConfig.contact.phone;
            if (email && baseConfig.contact.email) email.textContent = baseConfig.contact.email;
            if (addr && baseConfig.contact.address) addr.textContent = baseConfig.contact.address;
        }


        const savedLang = localStorage.getItem("app_lang") || baseConfig.default_language || "vi";
        await setLanguage(savedLang);
    } catch (err) {
        console.error(err);
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    await loadCSS("css/reset.css");
    await loadCSS("css/style.css");
    await loadCSS("css/responsive.css");

    const savedTheme = localStorage.getItem("app_theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);

    const darkBtn = document.getElementById("darkModeBtn");
    if (darkBtn) {
        darkBtn.textContent = savedTheme === "dark" ? "☀️" : "🌙";
        darkBtn.addEventListener("click", () => {
            const isDark = document.documentElement.getAttribute("data-theme") === "dark";
            const next = isDark ? "light" : "dark";
            document.documentElement.setAttribute("data-theme", next);
            localStorage.setItem("app_theme", next);
            darkBtn.textContent = next === "dark" ? "☀️" : "🌙";
        });
    }

    await initApp();

    const select = document.getElementById("configPresetSelect");
    if (select) {
        select.addEventListener("change", (e) => {
            if (e.target.value === "site.config.json") {
                initApp();
            } else {
                switchTheme(e.target.value);
            }
        });
    }

    document.querySelectorAll(".btn-lang").forEach((btn) => {
        btn.addEventListener("click", () => {
            setLanguage(btn.getAttribute("data-lang"));
        });
    });

    const navToggle = document.getElementById("navToggle");
    const navMenu = document.getElementById("navMenu");
    if (navToggle && navMenu) {
        navToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");
        });
        navMenu.querySelectorAll(".nav-link, .btn").forEach((item) => {
            item.addEventListener("click", () => navMenu.classList.remove("active"));
        });
    }
});