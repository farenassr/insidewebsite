const REVEAL_SELECTOR = ".advantage-card, .step, .service-block, .episode-card, .about-photo-card, .about-copy-block";
const ICON_CARD_SELECTOR = ".icon-card";

function applyBackgroundImages() {
    document.querySelectorAll("[data-bg-src]").forEach((element) => {
        const source = element.dataset.bgSrc;
        if (source) {
            element.style.backgroundImage = `url("${source}")`;
        }
    });
}

function initFeatherIcons() {
    if (window.feather) {
        feather.replace();
    }
}

function initNavbar() {
    const navbar = document.querySelector(".navbar");
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    const menuIcon = menuToggle?.querySelector("svg");

    if (!navbar) {
        return;
    }

    const updateNavbarState = () => {
        navbar.classList.toggle("scrolled", window.scrollY > 50);
    };

    const closeMenu = () => {
        navbar.classList.remove("menu-open");
        if (menuToggle) {
            menuToggle.setAttribute("aria-expanded", "false");
        }
        if (menuIcon && window.feather) {
            menuIcon.innerHTML = feather.icons.menu.toSvg().replace(/^<svg[^>]*>|<\/svg>$/g, "");
        }
    };

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", (event) => {
            event.preventDefault();
            const isOpen = navbar.classList.toggle("menu-open");
            menuToggle.setAttribute("aria-expanded", String(isOpen));
            if (menuIcon && window.feather) {
                const iconName = isOpen ? "x" : "menu";
                menuIcon.innerHTML = feather.icons[iconName].toSvg().replace(/^<svg[^>]*>|<\/svg>$/g, "");
            }
        });

        navLinks.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", closeMenu);
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 900) {
                closeMenu();
            }
        });
    }

    window.addEventListener("scroll", updateNavbarState);
    window.addEventListener("resize", updateNavbarState);
    updateNavbarState();
}

function initActiveNavLinks() {
    const navLinks = document.querySelectorAll(".nav-links a");

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.forEach((navLink) => navLink.classList.remove("active"));
            link.classList.add("active");
        });
    });
}

function initHeroParallax() {
    const hero = document.querySelector(".hero");
    const floatLeft = document.querySelector(".img-left");
    const floatRight = document.querySelector(".img-right");

    if (!hero || !floatLeft || !floatRight) {
        return;
    }

    hero.addEventListener("mousemove", (event) => {
        const x = event.clientX / window.innerWidth;
        const y = event.clientY / window.innerHeight;

        floatLeft.style.transform = `translate(${x * 20}px, ${y * 20}px) rotate(-5deg)`;
        floatRight.style.transform = `translate(-${x * 20}px, -${y * 20}px) rotate(3deg)`;
    });
}

function initScrollReveal() {
    const revealElements = document.querySelectorAll(REVEAL_SELECTOR);

    if (!revealElements.length) {
        return;
    }

    const observer = new IntersectionObserver((entries, revealObserver) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            entry.target.classList.add("in-view");
            revealObserver.unobserve(entry.target);
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach((element) => {
        element.classList.add("fade-up-element");
        observer.observe(element);
    });
}

function initIconCardAnimations() {
    const iconCards = document.querySelectorAll(ICON_CARD_SELECTOR);

    if (!iconCards.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            const card = entry.target;
            card.classList.remove("is-icon-active");

            if (card.iconAnimationTimer) {
                window.clearTimeout(card.iconAnimationTimer);
            }

            void card.offsetWidth;
            card.classList.add("is-icon-active");

            card.iconAnimationTimer = window.setTimeout(() => {
                card.classList.remove("is-icon-active");
            }, 2600);
        });
    }, {
        threshold: 0.45,
        rootMargin: "0px 0px -12% 0px"
    });

    iconCards.forEach((card) => observer.observe(card));
}

function initTestimonialSlider() {
    const sliderSections = document.querySelectorAll(".testimonials");

    sliderSections.forEach((section) => {
        const slider = section.querySelector(".testimonial-cards");
        const prevButton = section.querySelector(".prev-arrow");
        const nextButton = section.querySelector(".next-arrow");
        const indicatorsContainer = section.querySelector(".slider-indicators");

        if (!slider || !indicatorsContainer) {
            return;
        }

        const cards = Array.from(slider.querySelectorAll(".testimonial-card"));
        if (!cards.length) {
            return;
        }

        let activePage = 0;
        let pageTargets = [];
        let dragState = {
            isDragging: false,
            startX: 0,
            scrollLeft: 0
        };

        const getPageTarget = (index, isLastPage = false) => {
            const maxScroll = Math.max(0, slider.scrollWidth - slider.clientWidth);
            if (isLastPage) {
                return maxScroll;
            }

            const card = cards[index];
            if (!card) {
                return 0;
            }

            return Math.min(maxScroll, Math.max(0, card.offsetLeft));
        };

        const getVisibleCardCount = () => {
            const firstCard = cards[0];
            if (!firstCard) {
                return 1;
            }

            const sliderStyles = window.getComputedStyle(slider);
            const gap = Number.parseFloat(sliderStyles.gap || "0") || 0;
            const cardWidth = firstCard.getBoundingClientRect().width;
            const visibleCards = Math.floor((slider.clientWidth + gap) / (cardWidth + gap));
            return Math.max(1, visibleCards);
        };

        const buildPageTargets = () => {
            const rawTargets = cards.map((card) => {
                const maxScroll = Math.max(0, slider.scrollWidth - slider.clientWidth);
                return Math.min(maxScroll, Math.max(0, card.offsetLeft));
            });
            pageTargets = [...new Set(rawTargets)];
        };

        const syncDots = () => {
            indicatorsContainer.querySelectorAll(".slider-dot").forEach((dot, index) => {
                dot.classList.toggle("active", index === activePage);
            });
        };

        const getNearestPageIndex = () => {
            const currentScroll = slider.scrollLeft;

            return pageTargets.reduce((nearestIndex, target, index) => {
                const nearestDistance = Math.abs(currentScroll - pageTargets[nearestIndex]);
                const currentDistance = Math.abs(currentScroll - target);
                return currentDistance < nearestDistance ? index : nearestIndex;
            }, 0);
        };

        const scrollToPage = (index) => {
            activePage = index;
            syncDots();

            slider.scrollTo({
                left: pageTargets[index] ?? 0,
                behavior: "smooth"
            });
        };

        const renderDots = () => {
            indicatorsContainer.innerHTML = "";

            pageTargets.forEach((_, index) => {
                const dot = document.createElement("button");
                dot.type = "button";
                dot.className = "slider-dot";
                dot.setAttribute("aria-label", `Go to testimonial group ${index + 1}`);
                dot.addEventListener("click", () => scrollToPage(index));
                indicatorsContainer.appendChild(dot);
            });

            syncDots();
        };

        const updateActivePage = () => {
            activePage = getNearestPageIndex();
            syncDots();
        };

        const initialize = () => {
            buildPageTargets();
            renderDots();
            updateActivePage();
        };

        const startDrag = (event) => {
            dragState = {
                isDragging: true,
                startX: event.pageX - slider.offsetLeft,
                scrollLeft: slider.scrollLeft
            };

            slider.classList.add("active");
        };

        const stopDrag = () => {
            dragState.isDragging = false;
            slider.classList.remove("active");
        };

        const handleDrag = (event) => {
            if (!dragState.isDragging) {
                return;
            }

            event.preventDefault();
            const currentX = event.pageX - slider.offsetLeft;
            const walk = (currentX - dragState.startX) * 2.5;
            slider.scrollLeft = dragState.scrollLeft - walk;
        };

        slider.addEventListener("scroll", updateActivePage);
        slider.addEventListener("mousedown", startDrag);
        slider.addEventListener("mouseleave", stopDrag);
        slider.addEventListener("mouseup", stopDrag);
        slider.addEventListener("mousemove", handleDrag);
        window.addEventListener("resize", initialize);

        if (prevButton) {
            prevButton.addEventListener("click", () => {
                const currentPage = getNearestPageIndex();
                const targetPage = currentPage <= 0 ? pageTargets.length - 1 : currentPage - 1;
                scrollToPage(targetPage);
            });
        }

        if (nextButton) {
            nextButton.addEventListener("click", () => {
                const currentPage = getNearestPageIndex();
                const targetPage = currentPage >= pageTargets.length - 1 ? 0 : currentPage + 1;
                scrollToPage(targetPage);
            });
        }

        initialize();
    });
}

document.addEventListener("DOMContentLoaded", () => {
    applyBackgroundImages();
    initFeatherIcons();
    initNavbar();
    initActiveNavLinks();
    initHeroParallax();
    initScrollReveal();
    initIconCardAnimations();
    initTestimonialSlider();
});
