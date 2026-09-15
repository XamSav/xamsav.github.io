(function () {
    "use strict";

    var GTM_ID = "GTM-P8J7SDCR";
    var CONSENT_KEY = "xamsav-consent";

    document.documentElement.classList.add("js");

    // ---------- Menú móvil ----------
    var toggle = document.querySelector(".nav-toggle");
    var links = document.getElementById("nav-links");

    if (toggle && links) {
        toggle.addEventListener("click", function () {
            var open = toggle.getAttribute("aria-expanded") === "true";
            toggle.setAttribute("aria-expanded", String(!open));
            links.classList.toggle("is-open", !open);
        });

        links.addEventListener("click", function (e) {
            if (e.target.closest("a")) {
                toggle.setAttribute("aria-expanded", "false");
                links.classList.remove("is-open");
            }
        });
    }

    // ---------- Borde de la cabecera al hacer scroll ----------
    var header = document.querySelector(".site-header");
    if (header) {
        var onScroll = function () {
            header.classList.toggle("is-scrolled", window.scrollY > 8);
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
    }

    // ---------- Aparición de secciones ----------
    var revealEls = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { rootMargin: "0px 0px -10% 0px" });
        revealEls.forEach(function (el) { observer.observe(el); });
    } else {
        revealEls.forEach(function (el) { el.classList.add("is-visible"); });
    }

    // ---------- Año del footer ----------
    document.querySelectorAll("[data-year]").forEach(function (el) {
        el.textContent = new Date().getFullYear();
    });

    // ---------- Consentimiento de cookies (GTM solo tras aceptar) ----------
    function readConsent() {
        try { return localStorage.getItem(CONSENT_KEY); } catch (e) { return null; }
    }

    function writeConsent(value) {
        try { localStorage.setItem(CONSENT_KEY, value); } catch (e) { /* sin almacenamiento */ }
    }

    var gtmLoaded = false;
    function loadGtm() {
        if (gtmLoaded) return;
        gtmLoaded = true;
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
        var s = document.createElement("script");
        s.async = true;
        s.src = "https://www.googletagmanager.com/gtm.js?id=" + GTM_ID;
        document.head.appendChild(s);
    }

    var banner = document.getElementById("consent");

    function showBanner() {
        if (banner) banner.hidden = false;
    }

    function hideBanner() {
        if (banner) banner.hidden = true;
    }

    document.addEventListener("click", function (e) {
        var btn = e.target.closest("[data-consent]");
        if (!btn) return;
        var choice = btn.getAttribute("data-consent");
        if (choice === "settings") {
            showBanner();
            return;
        }
        writeConsent(choice);
        hideBanner();
        if (choice === "granted") {
            loadGtm();
        } else if (gtmLoaded) {
            // Si se retira el consentimiento, recargar para descargar el script.
            window.location.reload();
        }
    });

    var consent = readConsent();
    if (consent === "granted") {
        loadGtm();
    } else if (consent !== "denied") {
        showBanner();
    }
})();
