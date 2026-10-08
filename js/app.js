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
    <span class="cat-action product-detail-btn" style="color:${color}">
    ${currentLang === "en" ? "View details →" : "Xem chi tiết →"}
</span>
`;
        catContainer.appendChild(card);
        const detailBtn = card.querySelector(".product-detail-btn");

        if (detailBtn) {
            detailBtn.addEventListener("click", () => {
                openProductModal(cat);
            });
        }
    });
}

function openProductModal(product) {
    const modal = document.getElementById("productModal");

    const image = document.getElementById("modalProductImage");
    const name = document.getElementById("modalProductName");
    const desc = document.getElementById("modalProductDesc");
    const detail = document.getElementById("modalProductDetail");

    if (!modal) return;

    image.src = product.image;
    image.alt = product.name;

    name.textContent = product.name;

    detail.textContent = product.detail || product.desc;
    modal.classList.add("active");

    document.body.style.overflow = "hidden";
}

async function switchTheme(themeFile) {
    try {
        const res = await fetch(`config/${themeFile}`);
        if (!res.ok) return;
        const data = await res.json();

        const punevieBanner = document.getElementById("punevie-hero-banner");
        const punevieLeftImage = document.getElementById("punevie-left-image");
        const heroText = document.querySelector("#hero .hero-text");

        const isPunevie = themeFile === "punevie.config.json";

        const storyTitle = document.querySelector(".story-title");
        const storyBadge = document.querySelector(".story-badge");
        const storyDesc = document.querySelector(".story-desc");

        if (isPunevie) {
            if (storyBadge) storyBadge.textContent = "Câu chuyện PUNÉVIE";

            if (storyTitle) {
                storyTitle.textContent = "Vẻ đẹp bắt đầu từ sự nâng niu";
            }

            
        if (storyDesc) {
            storyDesc.textContent =
                "PUNÉVIE bắt đầu từ một suy nghĩ giản dị: giữa những bộn bề của cuộc sống, người phụ nữ đôi khi dành quá nhiều thời gian chăm lo cho mọi thứ xung quanh mà quên rằng bản thân cũng cần được yêu thương. Chúng tôi tin rằng chăm sóc làn da không chỉ là để trở nên xinh đẹp hơn, mà còn là khoảng thời gian riêng để mỗi người phụ nữ thư giãn và trân trọng chính mình. Lấy cảm hứng từ vẻ đẹp thanh lịch của hoa hồng, PUNÉVIE mang đến những sản phẩm chăm sóc da dịu nhẹ, từ sữa rửa mặt, serum đến kem dưỡng và mặt nạ, để mỗi bước dưỡng da đều trở thành một trải nghiệm dễ chịu. Bởi với PUNÉVIE, vẻ đẹp không nằm ở sự hoàn hảo, mà ở sự tự tin và cách mỗi người phụ nữ biết yêu thương chính mình mỗi ngày.";
        }

        } else if (baseConfig && baseConfig[currentLang]) {
            const dict = baseConfig[currentLang];

            if (storyBadge) storyBadge.textContent = dict.story_badge || "";
            if (storyTitle) storyTitle.textContent = dict.story_title || "";
            if (storyDesc) storyDesc.textContent = dict.story_desc || "";
        }
        
        document.body.classList.toggle("brand-punevie", isPunevie);

        
        const heroSection = document.getElementById("hero");

        if (heroSection) {
            if (isPunevie) {
                heroSection.style.setProperty("--hero-bg-image", "none");
            } else if (baseConfig?.hero?.background_image) {
                const originalBg = new URL(
                    baseConfig.hero.background_image,
                    document.baseURI
                ).href;

                heroSection.style.setProperty(
                    "--hero-bg-image",
                    `url("${originalBg}")`
                );
            }
        }


        if (punevieBanner && punevieLeftImage && heroText) {
            if (isPunevie && data.hero?.left_image) {
                punevieLeftImage.src = data.hero.left_image;
                punevieBanner.hidden = false;
                heroText.hidden = true;
            } else {
                punevieBanner.hidden = true;
                heroText.hidden = false;
            }
        }


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
            
            const activeBrand = data.brand_name ? data : baseConfig;
            const logoEl = document.getElementById("brand-logo");

            if (logoEl && activeBrand) {
                logoEl.innerHTML = "";

                const logoImg = document.createElement("img");
                logoImg.src = activeBrand.logo_url;
                logoImg.alt = activeBrand.brand_name;

                const logoText = document.createElement("span");
                logoText.className = "logo-text";
                logoText.textContent = activeBrand.brand_name;

                logoEl.append(logoImg, logoText);
                document.title = activeBrand.brand_name;

                const heroImage = document.getElementById("hero-image");

                if (heroImage) {
                    heroImage.src = data.hero?.hero_image
                        || baseConfig.hero.hero_image;

                    heroImage.alt = activeBrand.brand_name;
                }

            }

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
        
        document.body.classList.remove("brand-punevie");

        const punevieBanner = document.getElementById("punevie-hero-banner");
        const heroText = document.querySelector("#hero .hero-text");

        if (punevieBanner) punevieBanner.hidden = true;
        if (heroText) heroText.hidden = false;

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
            root.style.setProperty("--footer-color", baseConfig.theme.footer_color);
        }

        if (baseConfig.hero) {
            const heroSection = document.querySelector(".hero-section");

            if (baseConfig.hero.background_image) {
                const heroImageUrl = new URL(
                    baseConfig.hero.background_image,
                    document.baseURI
                ).href;

                root.style.setProperty(
                    "--hero-bg-image",
                    `url("${heroImageUrl}")`
                );

                if (heroSection) {
                    heroSection.style.setProperty(
                        "--hero-bg-image",
                        `url("${heroImageUrl}")`
                    );
                }
                if (baseConfig.hero && baseConfig.hero.hero_image) {
                    const heroImage = document.getElementById("hero-image");

                    if (heroImage) {
                        heroImage.src = baseConfig.hero.hero_image;
                        heroImage.alt = baseConfig.brand_name || "";
                    }
                }
            }

            if (baseConfig.hero.background_opacity !== undefined) {
                root.style.setProperty(
                    "--hero-bg-opacity",
                    baseConfig.hero.background_opacity
                );

                if (heroSection) {
                    heroSection.style.setProperty(
                        "--hero-bg-opacity",
                        baseConfig.hero.background_opacity
                    );
                }
            }

            if (baseConfig.hero.background_blur) {
                root.style.setProperty(
                    "--hero-bg-blur",
                    baseConfig.hero.background_blur
                );

                if (heroSection) {
                    heroSection.style.setProperty(
                        "--hero-bg-blur",
                        baseConfig.hero.background_blur
                    );
                }
            }
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
    const productModal = document.getElementById("productModal");
    const productModalClose = document.getElementById("productModalClose");
    const productModalOverlay = document.getElementById("productModalOverlay");

    function closeProductModal() {
        if (productModal) {
            productModal.classList.remove("active");
            document.body.style.overflow = "";
        }
    }

    if (productModalClose) {
        productModalClose.addEventListener("click", closeProductModal);
    }

    if (productModalOverlay) {
        productModalOverlay.addEventListener("click", closeProductModal);
    }

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeProductModal();
        }
    });
});