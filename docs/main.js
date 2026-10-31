(function () {
    "use strict";

    var GA_ID = "G-514WEWFRSR";
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

    // ---------- Consentimiento de cookies (Google Analytics solo tras aceptar) ----------
    function readConsent() {
        try { return localStorage.getItem(CONSENT_KEY); } catch (e) { return null; }
    }

    function writeConsent(value) {
        try { localStorage.setItem(CONSENT_KEY, value); } catch (e) { /* sin almacenamiento */ }
    }

    var analyticsLoaded = false;
    function loadAnalytics() {
        if (analyticsLoaded) return;
        analyticsLoaded = true;
        window.dataLayer = window.dataLayer || [];
        window.gtag = function () { window.dataLayer.push(arguments); };
        window.gtag("consent", "default", {
            analytics_storage: "granted",
            ad_storage: "denied",
            ad_user_data: "denied",
            ad_personalization: "denied"
        });
        window.gtag("js", new Date());
        window.gtag("config", GA_ID);
        var s = document.createElement("script");
        s.async = true;
        s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
        document.head.appendChild(s);
    }

    // Borra las cookies _ga y _ga_* al retirar el consentimiento.
    function clearAnalyticsCookies() {
        var host = window.location.hostname;
        var domains = ["", host, "." + host, "." + host.replace(/^www\./, "")];
        document.cookie.split(";").forEach(function (cookie) {
            var name = cookie.split("=")[0].trim();
            if (name === "_ga" || name.indexOf("_ga_") === 0) {
                domains.forEach(function (domain) {
                    document.cookie = name + "=; Max-Age=0; path=/" + (domain ? "; domain=" + domain : "");
                });
            }
        });
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
            loadAnalytics();
        } else {
            clearAnalyticsCookies();
            // Si ya estaba cargado, recargar para descargar el script.
            if (analyticsLoaded) window.location.reload();
        }
    });

    // ---------- Evento de cliente potencial: clic en el correo de contacto ----------
    document.addEventListener("click", function (e) {
        var link = e.target.closest('a[href^="mailto:"]');
        if (!link || !analyticsLoaded) return;
        var section = link.closest("section[id], footer");
        window.gtag("event", "generate_lead", {
            method: "email",
            link_location: section ? (section.id || "footer") : "page"
        });
    });

    var consent = readConsent();
    if (consent === "granted") {
        loadAnalytics();
    } else if (consent !== "denied") {
        showBanner();
    }
})();
