/* =============================================================================
   LE JARDIN — SCRIPT.JS
   Orari real-time (Europe/Rome, gestione mezzanotte), render menu,
   form prenotazione -> WhatsApp, animazioni scroll, header, galleria.
   Tutto legge da window.DATA (data.js).
   ========================================================================== */
(function () {
  "use strict";
  var DATA = window.DATA || {};
  var S = DATA.SHARED || {};

  /* ---------- Helpers ---------- */
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $all(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }

  function waLink(text) {
    return "https://wa.me/" + S.whatsappNumber + "?text=" + encodeURIComponent(text || "");
  }

  /* ---------- Ora corrente in Europe/Rome ---------- */
  function romeNow() {
    // Ricava giorno-settimana e minuti-dal-mezzanotte nel fuso Europe/Rome,
    // indipendentemente dal fuso del dispositivo.
    var now = new Date();
    var fmt = new Intl.DateTimeFormat("en-US", {
      timeZone: "Europe/Rome", weekday: "short",
      hour: "2-digit", minute: "2-digit", hour12: false
    });
    var parts = {};
    fmt.formatToParts(now).forEach(function (p) { parts[p.type] = p.value; });
    var map = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    var dow = map[parts.weekday];
    var h = parseInt(parts.hour, 10) % 24;
    var m = parseInt(parts.minute, 10);
    return { dow: dow, minutes: h * 60 + m };
  }

  /* ---------- Stato Aperto/Chiuso (gestisce l'attraversamento della mezzanotte) ---------- */
  function isOpen(hours) {
    if (!hours) return false;
    var t = romeNow();
    var open = hours.openHour * 60 + (hours.openMinute || 0);
    var close = hours.closeHour * 60 + (hours.closeMinute || 0);
    var days = hours.openDays || [];
    var yesterday = (t.dow + 6) % 7;

    if (close > open) {
      // Finestra nello stesso giorno
      return days.indexOf(t.dow) !== -1 && t.minutes >= open && t.minutes < close;
    } else {
      // Finestra che scavalca la mezzanotte (es. 20:00 -> 02:00)
      // Caso A: stasera dopo l'apertura (giorno di apertura odierno)
      if (days.indexOf(t.dow) !== -1 && t.minutes >= open) return true;
      // Caso B: nelle prime ore, appartiene alla sessione aperta IERI
      if (days.indexOf(yesterday) !== -1 && t.minutes < close) return true;
      return false;
    }
  }

  function renderBadge(node, hours) {
    if (!node) return;
    var open = isOpen(hours);
    node.classList.remove("is-open", "is-closed");
    node.classList.add(open ? "is-open" : "is-closed");
    node.innerHTML = '<span class="dot"></span>' + (open ? "Aperto ora" : "Chiuso ora");
    node.setAttribute("title", hours && hours.humanLine ? hours.humanLine : "");
  }

  /* ---------- Header scroll ---------- */
  function initHeader() {
    var h = $(".site-header");
    if (!h) return;
    var onScroll = function () { h.classList.toggle("scrolled", window.scrollY > 40); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Reveal on scroll ---------- */
  function initReveal() {
    var items = $all("[data-reveal]");
    if (!("IntersectionObserver" in window) || !items.length) {
      items.forEach(function (i) { i.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });
    items.forEach(function (i) { io.observe(i); });
  }

  /* ---------- Splash chooser (index) ---------- */
  function tryAutoplay(v) {
    if (!v) return;
    var p = v.play();
    if (p && p.catch) p.catch(function () { /* fallback: poster resta visibile */ });
  }
  function initSplash() {
    if (!document.body.classList.contains("page-splash")) return;
    // Autoplay dei video se presenti
    $all("video[autoplay]").forEach(tryAutoplay);
    // Footer dinamico
    var f = $("#splashFoot");
    if (f) {
      f.innerHTML =
        '<a href="' + S.mapsUrl + '" target="_blank" rel="noopener">' + S.address + '</a>' +
        '<span class="sep">·</span>' +
        '<a href="tel:' + S.phoneTel + '">' + S.phoneDisplay + '</a>' +
        '<span class="sep">·</span>' +
        '<a href="' + S.facebook + '" target="_blank" rel="noopener">Facebook</a>';
    }
  }

  /* ---------- Menu render ---------- */
  function initMenu(V) {
    var host = $("#menuHost");
    if (!host || !V) return;

    // 1) PDF allegato ha priorità se valorizzato
    if (V.menuPdf) {
      host.innerHTML =
        '<div class="menu-panel" data-reveal>' +
        '<p class="kicker">Il menu</p>' +
        '<h2 class="section__title" style="margin-bottom:.4em">Sfoglia la nostra proposta</h2>' +
        '<a class="btn btn--primary" href="' + V.menuPdf + '" target="_blank" rel="noopener">' + iconMenu() + ' Guarda il menu</a>' +
        '</div>';
      return;
    }
    // 2) Categorie popolate in data.js
    if (V.menuCategories && V.menuCategories.length) {
      var cats = V.menuCategories.map(function (c) {
        var items = (c.items || []).map(function (it) {
          return '<div class="menu-item"><div><div class="menu-item__name">' + it.name + '</div>' +
                 (it.desc ? '<div class="menu-item__desc">' + it.desc + '</div>' : '') + '</div>' +
                 (it.price ? '<div class="menu-item__price">' + it.price + '</div>' : '') + '</div>';
        }).join("");
        return '<div class="menu-cat" data-reveal><h3>' + c.category + '</h3>' + items + '</div>';
      }).join("");
      host.innerHTML = '<div class="menu-cats">' + cats + '</div>';
      return;
    }
    // 3) Link esterno (pattern factory)
    if (V.menuUrl) {
      host.innerHTML =
        '<div class="menu-panel" data-reveal>' +
        '<p class="kicker">Il menu</p>' +
        '<h2 class="section__title" style="margin-bottom:.4em">La nostra selezione</h2>' +
        '<p class="lead">Scopri cocktail e proposte del bancone.</p>' +
        '<a class="btn btn--primary" href="' + V.menuUrl + '" target="_blank" rel="noopener">' + iconMenu() + ' Guarda il menu</a>' +
        '</div>';
      return;
    }
    // 4) In arrivo
    if (V.menuComingSoon) {
      host.innerHTML =
        '<div class="menu-panel" data-reveal>' +
        '<span class="menu-soon__tag">In arrivo</span>' +
        '<h2 class="section__title" style="margin-bottom:.4em">Il menu sta per fiorire</h2>' +
        '<p class="lead">Stiamo mettendo a punto la nostra carta. Torna presto: nel frattempo puoi riservare il tuo tavolo.</p>' +
        '<a class="btn btn--ghost" href="#prenota">' + iconCal() + ' Riserva un tavolo</a>' +
        '</div>';
    }
  }

  /* ---------- Form prenotazione Bistrot -> WhatsApp ---------- */
  function initReservation(V) {
    var form = $("#reservationForm");
    if (!form || !V) return;

    function setInvalid(field, on) { field.classList.toggle("invalid", on); }

    // Imposta data minima = oggi
    var dateInput = form.querySelector('[name="data"]');
    if (dateInput) {
      var t = new Date();
      var iso = new Date(t.getTime() - t.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
      dateInput.min = iso;
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true;
      var data = {};
      $all(".field", form).forEach(function (fld) {
        var input = fld.querySelector("input, select");
        if (!input) return;
        var val = (input.value || "").trim();
        data[input.name] = val;
        var bad = input.hasAttribute("required") && !val;
        if (input.name === "telefono" && val && !/[0-9]{6,}/.test(val.replace(/\s/g, ""))) bad = true;
        setInvalid(fld, bad);
        if (bad) ok = false;
      });
      if (!ok) {
        var firstBad = form.querySelector(".field.invalid input, .field.invalid select");
        if (firstBad) firstBad.focus();
        return;
      }

      var intro = (V.reservation && V.reservation.whatsappIntro) || "Ciao Le Jardin Bistrot! Vorrei prenotare un tavolo.";
      var msg =
        intro + "\n\n" +
        "• Nome: " + data.nome + " " + data.cognome + "\n" +
        "• Telefono: " + data.telefono + "\n" +
        "• Persone: " + data.persone + "\n" +
        "• Data: " + formatDate(data.data) + "\n" +
        "• Orario: " + data.orario + "\n\n" +
        "Grazie!";

      window.open(waLink(msg), "_blank", "noopener");

      var btn = form.querySelector('button[type="submit"]');
      if (btn) { var old = btn.innerHTML; btn.innerHTML = "✓ Apertura WhatsApp…"; setTimeout(function(){ btn.innerHTML = old; }, 3500); }
    });
  }

  function formatDate(iso) {
    if (!iso) return "";
    var p = iso.split("-");
    if (p.length !== 3) return iso;
    return p[2] + "/" + p[1] + "/" + p[0];
  }

  /* ---------- Icone inline ---------- */
  function iconMenu() { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 6h16M4 12h16M4 18h10"/></svg>'; }
  function iconCal()  { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/></svg>'; }

  /* ---------- Popola contatti/link dinamici comuni ---------- */
  function fillDynamic(V) {
    // wa.me links con testo dedicato
    $all("[data-wa]").forEach(function (a) {
      var t = a.getAttribute("data-wa") === "cta" ? V.whatsappText : V.whatsappText;
      a.href = waLink(t);
    });
    // tel:
    $all("[data-tel]").forEach(function (a) { a.href = "tel:" + S.phoneTel; a.textContent = a.textContent || S.phoneDisplay; });
    // maps:
    $all("[data-maps]").forEach(function (a) { a.href = S.mapsUrl; });
  }

  /* ---------- Init ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    initHeader();
    initSplash();

    // Determina la sezione attiva dalla pagina
    var page = document.body.getAttribute("data-page"); // "nouveau" | "bistrot" | "splash"
    var V = page === "nouveau" ? DATA.NOUVEAU : page === "bistrot" ? DATA.BISTROT : null;

    if (V) {
      // Badge orari
      var badge = $("#statusBadge");
      renderBadge(badge, V.hours);
      setInterval(function () { renderBadge(badge, V.hours); }, 60000);

      // Autoplay hero + concept video
      $all("video[autoplay]").forEach(tryAutoplay);

      fillDynamic(V);
      initMenu(V);
      initReservation(V);
    }

    initReveal();
  });
})();
