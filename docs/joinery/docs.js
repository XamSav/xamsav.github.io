// Manual: section highlighting, "On this page", code copy and C# colouring.
(function () {
    var content = document.querySelector(".docs-content");
    if (!content) return;
    var sideLinks = Array.prototype.slice.call(document.querySelectorAll(".docs-side a[href^='#']"));
    var toc = document.getElementById("toc");
    var headings = Array.prototype.slice.call(content.querySelectorAll("h1[id], h2[id], h3[id]"));

    // Hover anchors on headings
    headings.forEach(function (h) {
        if (h.tagName === "H1") return;
        var a = document.createElement("a");
        a.className = "anchor";
        a.href = "#" + h.id;
        a.setAttribute("aria-label", "Link to this section");
        a.textContent = "#";
        h.appendChild(a);
    });

    // Code blocks: title bar, copy button, light C# colouring
    var KEYWORDS = /^(public|private|protected|internal|class|struct|interface|enum|void|var|new|return|if|else|for|foreach|in|out|ref|while|using|namespace|static|override|virtual|abstract|sealed|readonly|const|bool|int|float|string|null|true|false|this|base|get|set|async|await|is|as)$/;
    function escape(t) { return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
    function colour(src) {
        return src.replace(/(\/\/[^\n]*)|("(?:\\.|[^"\\])*")|\b(\d+(?:\.\d+)?f?)\b|\b([A-Za-z_]\w*)\b|([\s\S])/g, function (m, c, s, n, w, o) {
            if (o) return escape(o);
            if (c) return '<span class="tok-c">' + escape(c) + "</span>";
            if (s) return '<span class="tok-s">' + escape(s) + "</span>";
            if (n) return '<span class="tok-n">' + n + "</span>";
            if (KEYWORDS.test(w)) return '<span class="tok-k">' + w + "</span>";
            if (/^[A-Z]/.test(w)) return '<span class="tok-t">' + w + "</span>";
            return w;
        });
    }
    content.querySelectorAll("pre > code").forEach(function (code) {
        var pre = code.parentNode;
        var raw = code.textContent;
        var cs = code.className.indexOf("csharp") !== -1;
        if (cs) code.innerHTML = colour(raw);
        var box = document.createElement("div");
        box.className = "code-block";
        box.innerHTML = '<div class="code-head"><span>' + (cs ? "C#" : "Code") + '</span><button class="code-copy" type="button">Copy</button></div>';
        pre.parentNode.insertBefore(box, pre);
        box.appendChild(pre);
        box.querySelector(".code-copy").addEventListener("click", function (e) {
            var btn = e.currentTarget;
            navigator.clipboard.writeText(raw).then(function () {
                btn.textContent = "Copied";
                setTimeout(function () { btn.textContent = "Copy"; }, 1500);
            });
        });
    });

    // Which section and subsection are on screen
    var currentSection = null;
    function sectionOf(h) {
        for (var i = headings.indexOf(h); i >= 0; i--) if (headings[i].tagName !== "H3") return headings[i];
        return headings[0];
    }
    function buildToc(section) {
        toc.innerHTML = "";
        var i = headings.indexOf(section) + 1;
        for (; i < headings.length && headings[i].tagName === "H3"; i++) {
            var li = document.createElement("li");
            li.innerHTML = '<a href="#' + headings[i].id + '"></a>';
            li.firstChild.textContent = headings[i].firstChild.textContent;
            toc.appendChild(li);
        }
        toc.parentNode.style.visibility = toc.children.length ? "visible" : "hidden";
    }
    function update() {
        var line = window.innerHeight * 0.25;
        var active = headings[0];
        headings.forEach(function (h) { if (h.getBoundingClientRect().top < line) active = h; });
        var section = sectionOf(active);
        if (section !== currentSection) {
            currentSection = section;
            sideLinks.forEach(function (a) { a.classList.toggle("active", a.getAttribute("href") === "#" + section.id); });
            buildToc(section);
        }
        toc.querySelectorAll("a").forEach(function (a) { a.classList.toggle("active", a.getAttribute("href") === "#" + active.id); });
    }
    var ticking = false;
    window.addEventListener("scroll", function () {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(function () { ticking = false; update(); });
    }, { passive: true });
    update();

    // Mobile: open and close the sections list
    var side = document.getElementById("docs-side");
    var menu = document.querySelector(".docs-menu");
    function setOpen(open) {
        side.classList.toggle("open", open);
        menu.setAttribute("aria-expanded", open ? "true" : "false");
    }
    menu.addEventListener("click", function () { setOpen(!side.classList.contains("open")); });
    side.addEventListener("click", function (e) { if (e.target.closest("a")) setOpen(false); });
})();
