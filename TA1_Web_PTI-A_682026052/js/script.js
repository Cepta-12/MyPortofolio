/* =========================================================
   Yefta Portfolio — interaksi dan navigasi
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector("header");
    const nav = document.getElementById("primary-nav");
    const navToggle = document.querySelector(".nav-toggle");
    const navLinks = document.querySelectorAll("#primary-nav a");
    const sections = document.querySelectorAll("main section");
    const backToTop = document.getElementById("back-to-top");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Header, tombol kembali ke atas, dan menu aktif
    function updateScrollUI() {
        const scrolled = window.scrollY > 40;
        header?.classList.toggle("scrolled", scrolled);
        backToTop?.classList.toggle("visible", window.scrollY > 420);

        let currentSection = "";
        sections.forEach((section) => {
            if (window.scrollY >= section.offsetTop - 150) {
                currentSection = section.id;
            }
        });

        navLinks.forEach((link) => {
            const isActive = link.getAttribute("href") === `#${currentSection}`;
            link.classList.toggle("active", isActive);
        });
    }

    window.addEventListener("scroll", updateScrollUI, { passive: true });
    updateScrollUI();

    // Navigasi mobile
    function closeMobileNav() {
        if (!nav || !window.bootstrap?.Collapse) return;
        const collapse = window.bootstrap.Collapse.getOrCreateInstance(nav, { toggle: false });
        collapse.hide();
    }

    navLinks.forEach((link) => link.addEventListener("click", closeMobileNav));

    // Animasi elemen ketika masuk ke area layar
    const revealTargets = document.querySelectorAll(
        "main section, .skill-item, .project-card, .hobby-card"
    );

    if ("IntersectionObserver" in window && !reduceMotion) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("revealed");

                entry.target.querySelectorAll?.(".progress-bar").forEach((bar) => {
                    bar.style.width = bar.dataset.width || "0%";
                });

                if (entry.target.classList.contains("skill-item")) {
                    const bar = entry.target.querySelector(".progress-bar");
                    if (bar) bar.style.width = bar.dataset.width || "0%";
                }
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.12 });

        revealTargets.forEach((element) => {
            element.classList.add("reveal");
            revealObserver.observe(element);
        });
    } else {
        revealTargets.forEach((element) => element.classList.add("revealed"));
        document.querySelectorAll(".progress-bar").forEach((bar) => {
            bar.style.width = bar.dataset.width || "0%";
        });
    }

    // Typing effect pada halaman utama
    const typingSpan = document.getElementById("typing");
    const phrases = [
        "NIM 682026052",
        "Fakultas Teknologi Informasi",
        "Program Studi Sistem Informasi",
        "Universitas Kristen Satya Wacana",
        "teknologi dan pemrograman",
        "analisis serta pengembangan sistem"
    ];

    if (typingSpan) {
        if (reduceMotion) {
            typingSpan.textContent = phrases[0];
        } else {
            let phraseIndex = 0;
            let charIndex = 0;
            let deleting = false;

            function typeEffect() {
                const phrase = phrases[phraseIndex];

                if (!deleting) {
                    charIndex += 1;
                    typingSpan.textContent = phrase.slice(0, charIndex);

                    if (charIndex >= phrase.length) {
                        deleting = true;
                        window.setTimeout(typeEffect, 1500);
                        return;
                    }
                    window.setTimeout(typeEffect, 85);
                } else {
                    charIndex -= 1;
                    typingSpan.textContent = phrase.slice(0, charIndex);

                    if (charIndex <= 0) {
                        deleting = false;
                        phraseIndex = (phraseIndex + 1) % phrases.length;
                        window.setTimeout(typeEffect, 350);
                        return;
                    }
                    window.setTimeout(typeEffect, 42);
                }
            }

            typeEffect();
        }
    }

    // Tombol kembali ke atas
    backToTop?.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });

    // Tahun otomatis pada footer
    const yearSpan = document.getElementById("year");
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
});
