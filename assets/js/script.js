/* ==========================================================================
   Amazing Cakes — concept preview interactions (v2)
   Vanilla JS, no dependencies. Progressive: pages remain readable without JS.
   Content collections render from the shared model in data.js (window.AC).
   ========================================================================== */
(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var AC = window.AC || null;

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* 1. Sticky header state + back-to-top visibility ------------------------ */
  var header = document.querySelector("[data-header]");
  var toTop = document.querySelector(".to-top");
  if (header || toTop) {
    var onScroll = function () {
      if (header) header.classList.toggle("is-scrolled", window.scrollY > 8);
      if (toTop) toTop.classList.toggle("is-visible", window.scrollY > 480);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* 2. Mobile navigation --------------------------------------------------- */
  var burger = document.querySelector("[data-nav-toggle]");
  var nav = document.getElementById("primary-nav");

  function setMobileNav(open) {
    if (!burger || !nav) return;
    burger.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("is-open", open);
    /* lock background scroll while the panel is open */
    document.body.classList.toggle("nav-locked", open);
  }

  if (burger && nav) {
    burger.addEventListener("click", function () {
      setMobileNav(burger.getAttribute("aria-expanded") !== "true");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMobileNav(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && burger.getAttribute("aria-expanded") === "true") {
        setMobileNav(false);
        burger.focus();
      }
    });
    window.matchMedia("(min-width: 961px)").addEventListener("change", function (e) {
      if (e.matches) setMobileNav(false);
    });
  }

  /* 3. "Our Cakes" dropdown ------------------------------------------------ */
  var subItem = document.querySelector(".has-sub");
  var subToggle = subItem ? subItem.querySelector(".nav-toggle") : null;
  if (subItem && subToggle) {
    function setDropdown(open) {
      subToggle.setAttribute("aria-expanded", String(open));
      subItem.classList.toggle("is-open", open);
    }
    subToggle.addEventListener("click", function () {
      setDropdown(subToggle.getAttribute("aria-expanded") !== "true");
    });
    document.addEventListener("click", function (e) {
      if (!subItem.contains(e.target)) setDropdown(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && subToggle.getAttribute("aria-expanded") === "true") {
        setDropdown(false);
        subToggle.focus();
      }
    });
  }

  /* 4. Tabs (homepage flavors preview) ------------------------------------- */
  var tablist = document.querySelector("[role=tablist][aria-label='Menu groups']");
  if (tablist) {
    var tabs = Array.prototype.slice.call(tablist.querySelectorAll("[role=tab]"));
    function selectTab(tab, setFocus) {
      tabs.forEach(function (t) {
        var selected = t === tab;
        t.setAttribute("aria-selected", String(selected));
        t.tabIndex = selected ? 0 : -1;
        var panel = document.getElementById(t.getAttribute("aria-controls"));
        if (panel) panel.hidden = !selected;
      });
      if (setFocus) tab.focus();
    }
    tabs.forEach(function (tab, i) {
      tab.addEventListener("click", function () { selectTab(tab, false); });
      tab.addEventListener("keydown", function (e) {
        var next = null;
        switch (e.key) {
          case "ArrowRight": next = tabs[(i + 1) % tabs.length]; break;
          case "ArrowLeft":  next = tabs[(i - 1 + tabs.length) % tabs.length]; break;
          case "Home":       next = tabs[0]; break;
          case "End":        next = tabs[tabs.length - 1]; break;
          default: return;
        }
        e.preventDefault();
        selectTab(next, true);
      });
    });
  }

  /* 5. Reveal-on-scroll ----------------------------------------------------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-inview");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-inview"); });
  }

  /* 6. Content renderers (from window.AC) ----------------------------------- */

  function renderChips(container, items) {
    container.innerHTML = items.map(function (name) {
      return '<li class="chip">' + esc(name) + "</li>";
    }).join("");
  }

  function renderFavorites(container) {
    var published = {
      "White|Strawberry Mousse": "on the cupcake menu as “Vanilla Strawberry”",
      "Chocolate|Cookies and Cream": "published cupcake item",
      "Red Velvet|Sweet Cream Cheese": "published cupcake item"
    };
    container.innerHTML = AC.favorites.map(function (f) {
      var note = published[f.cake + "|" + f.filling];
      return '<li><span class="fav-cake">' + esc(f.cake) + '</span>' +
        '<span class="fav-arrow" aria-hidden="true">&#8594;</span>' +
        '<span class="fav-fill">' + esc(f.filling) + "</span>" +
        (note ? '<span class="fav-note">' + esc(note) + "</span>" : "") +
        "</li>";
    }).join("");
  }

  function renderCupcakes(container, names) {
    var rows = AC.cupcakes.filter(function (c) {
      return !names || names.length === 0 || names.indexOf(c.name) !== -1;
    });
    container.innerHTML = rows.map(function (c) {
      return '<article class="menu-product">' +
        '<div class="frame"><img src="' + esc(c.img) + '" alt="' + esc(c.desc) + " — " +
        esc(c.name) + ' cupcake" width="800" height="1000" loading="lazy"></div>' +
        '<h3 class="mp-name">' + esc(c.name) + "</h3>" +
        '<p class="mp-desc">' + esc(c.desc) + "</p>" +
        '<p class="price-tag">' + esc(c.price) + "</p>" +
        "</article>";
    }).join("");
  }

  function renderDesserts(container) {
    container.innerHTML = AC.desserts.map(function (d) {
      var price = d.price
        ? '<p class="price-tag">' + esc(d.price) + "</p>"
        : '<p class="price-tag price-tag--note">' + esc(d.priceNote || "Contact for pricing") + "</p>";
      var note = d.price && d.priceNote
        ? '<p class="mp-desc">' + esc(d.priceNote) + "</p>"
        : "";
      return '<article class="menu-product menu-product--small">' +
        '<div class="frame"><img src="' + esc(d.img) + '" alt="' + esc(d.name) +
        ' from the dessert-table menu" width="800" height="1000" loading="lazy"></div>' +
        '<h3 class="mp-name">' + esc(d.name) + "</h3>" + note + price +
        "</article>";
    }).join("");
  }

  function renderFillingGroups(container) {
    container.innerHTML = AC.fillingGroups.map(function (g) {
      var chips = g.items.map(function (n) {
        return '<li class="chip">' + esc(n) + "</li>";
      }).join("");
      return '<div class="filling-group"><h4 class="fg-label">' + esc(g.label) +
        '</h4><ul class="chip-list">' + chips + "</ul></div>";
    }).join("");
  }

  function renderAwards(container) {
    container.innerHTML = AC.awards.map(function (a) {
      return '<figure class="award-badge"><img src="' + esc(a.img) + '" alt="' +
        esc(a.label) + '" width="250" height="250" loading="lazy">' +
        "<figcaption>" + esc(a.label) + "</figcaption></figure>";
    }).join("");
  }

  function renderLeadTimes(container) {
    container.innerHTML = AC.leadTimes.map(function (lt) {
      return '<article class="info-block"><h3 class="info-label">' + esc(lt.label) +
        '</h3><p class="info-text">' + esc(lt.text) + "</p></article>";
    }).join("");
  }

  function renderHours(container) {
    container.innerHTML =
      '<dl class="schedule">' +
      AC.hours.rows.map(function (r) {
        var closed = /^closed/i.test(r.time);
        return '<div class="schedule-row' + (closed ? " is-closed" : "") + '">' +
          '<dt>' + esc(r.day) + "</dt><dd>" + esc(r.time) + "</dd></div>";
      }).join("") +
      "</dl>" +
      '<p class="prose-note schedule-note">' + esc(AC.hours.note) + "</p>";
  }

  function renderPolicies(container) {
    container.innerHTML = AC.policies.map(function (p, i) {
      var btnId = "accbtn-" + p.id;
      var panelId = "accpanel-" + p.id;
      return '<div class="acc-item">' +
        '<h3 class="acc-heading"><button type="button" class="acc-btn" id="' + btnId +
        '" aria-expanded="false" aria-controls="' + panelId + '">' + esc(p.title) +
        '<span class="acc-ind" aria-hidden="true"></span></button></h3>' +
        '<div class="acc-panel" id="' + panelId + '" role="region" aria-labelledby="' + btnId + '" hidden>' +
        "<p>" + esc(p.body) + "</p></div></div>";
    }).join("");
  }

  function renderVendors(container) {
    container.innerHTML = AC.vendors.map(function (v) {
      return '<figure class="vendor-badge"><img src="' + esc(v.img) + '" alt="' +
        esc(v.name) + ' logo" loading="lazy"><figcaption>' + esc(v.name) + "</figcaption></figure>";
    }).join("");
  }

  function renderReviews(container) {
    container.innerHTML = AC.reviews.map(function (r) {
      return '<figure class="review"><blockquote>"' + esc(r.text) + '"</blockquote>' +
        "<figcaption>" + esc(r.author) + " · " + esc(r.date) + " · " + esc(r.source) + "</figcaption></figure>";
    }).join("");
  }

  if (AC) {
    document.querySelectorAll("[data-render]").forEach(function (el) {
      var kind = el.getAttribute("data-render");
      var source = el.getAttribute("data-source");
      if (kind === "chips" && AC[source]) renderChips(el, AC[source]);
      else if (kind === "favorites") renderFavorites(el);
      else if (kind === "cupcakes") {
        var names = (el.getAttribute("data-names") || "").split("|").filter(Boolean);
        renderCupcakes(el, names.length ? names : null);
      }
      else if (kind === "desserts") renderDesserts(el);
      else if (kind === "filling-groups") renderFillingGroups(el);
      else if (kind === "awards") renderAwards(el);
      else if (kind === "vendors") renderVendors(el);
      else if (kind === "reviews") renderReviews(el);
      else if (kind === "lead-times") renderLeadTimes(el);
      else if (kind === "hours") renderHours(el);
      else if (kind === "policies") renderPolicies(el);
      else if (kind === "count") {
        var src = el.getAttribute("data-count-of");
        var val = src && AC[src];
        el.textContent = typeof val === "number" ? val : (val ? val.length : "");
      }
    });

    /* inquiry form selects — from the same shared model */
    var flavorSelect = document.getElementById("f-flavor");
    if (flavorSelect) {
      AC.flavors.forEach(function (name) {
        var o = document.createElement("option");
        o.value = name;
        o.textContent = name;
        flavorSelect.appendChild(o);
      });
    }
    var fillingSelect = document.getElementById("f-filling");
    if (fillingSelect) {
      AC.fillings.forEach(function (name) {
        var o = document.createElement("option");
        o.value = name;
        o.textContent = name;
        fillingSelect.appendChild(o);
      });
    }
  }

  /* 7. (size-picker interaction retired in v3 — sizes are now presented
     as photographic product cards with serving rows on the menu page) */

  /* 7b. Policies accordion — accessible disclosure buttons */
  var accWrap = document.querySelector("[data-render='policies']");
  if (accWrap) {
    accWrap.addEventListener("click", function (e) {
      var btn = e.target.closest(".acc-btn");
      if (!btn) return;
      var open = btn.getAttribute("aria-expanded") === "true";
      var panel = document.getElementById(btn.getAttribute("aria-controls"));
      btn.setAttribute("aria-expanded", String(!open));
      if (panel) panel.hidden = open;
    });
  }

  /* 8. Gallery page — filters + pagination ----------------------------------- */
  var galleryGrid = document.getElementById("gallery-grid");
  if (galleryGrid && AC) {
    var PAGE_SIZE = 12;
    var state = { cat: "all", page: 1 };
    var filtersEl = document.getElementById("gallery-filters");
    var pagerEl = document.getElementById("gallery-pager");
    var countEl = document.getElementById("gallery-count");
    var liveEl = document.getElementById("gallery-live");

    function itemsFor(cat) {
      return cat === "all" ? AC.gallery : AC.gallery.filter(function (g) { return g.cat === cat; });
    }

    function catName(id) {
      var c = AC.categories.filter(function (c) { return c.id === id; })[0];
      return c ? c.name : "All work";
    }

    function render() {
      var items = itemsFor(state.cat);
      var pages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
      if (state.page > pages) state.page = pages;
      var slice = items.slice((state.page - 1) * PAGE_SIZE, state.page * PAGE_SIZE);

      galleryGrid.innerHTML = slice.map(function (g) {
        return '<figure class="g-item"><div class="frame"><img src="' + esc(g.src) +
          '" alt="' + esc(g.alt) + '" width="800" height="1000" loading="lazy"></div>' +
          '<figcaption class="gallery-caption"><span class="tag">' + esc(catName(g.cat)) +
          "</span>" + esc(g.cap) + "</figcaption></figure>";
      }).join("");

      if (countEl) {
        countEl.textContent = "Showing " + slice.length + " of " + items.length +
          (state.cat === "all" ? " works" : " — " + catName(state.cat));
      }

      if (pagerEl) {
        var html = '<button type="button" class="page-btn" data-page="prev"' +
          (state.page === 1 ? " disabled" : "") + ' aria-label="Previous page">&#8592;</button>';
        for (var p = 1; p <= pages; p++) {
          html += '<button type="button" class="page-btn" data-page="' + p + '"' +
            (p === state.page ? ' aria-current="page"' : "") + ">" + p + "</button>";
        }
        html += '<button type="button" class="page-btn" data-page="next"' +
          (state.page === pages ? " disabled" : "") + ' aria-label="Next page">&#8594;</button>';
        pagerEl.innerHTML = html;
      }

      if (liveEl) {
        liveEl.textContent = catName(state.cat) + " — page " + state.page + " of " + pages +
          ", showing " + slice.length + " photographs";
      }
    }

    function renderFilters() {
      if (!filtersEl) return;
      var buttons = [{ id: "all", name: "All work" }].concat(AC.categories);
      filtersEl.innerHTML = buttons.map(function (c) {
        var n = c.id === "all" ? AC.gallery.length : itemsFor(c.id).length;
        return '<button type="button" class="filter-chip" data-cat="' + esc(c.id) +
          '" aria-pressed="' + (state.cat === c.id) + '">' + esc(c.name) + " (" + n + ")</button>";
      }).join("");
    }

    if (filtersEl) {
      filtersEl.addEventListener("click", function (e) {
        var btn = e.target.closest(".filter-chip");
        if (!btn) return;
        state.cat = btn.getAttribute("data-cat");
        state.page = 1;
        renderFilters();
        render();
      });
    }
    if (pagerEl) {
      pagerEl.addEventListener("click", function (e) {
        var btn = e.target.closest(".page-btn");
        if (!btn || btn.disabled) return;
        var p = btn.getAttribute("data-page");
        var pages = Math.max(1, Math.ceil(itemsFor(state.cat).length / PAGE_SIZE));
        if (p === "prev") state.page = Math.max(1, state.page - 1);
        else if (p === "next") state.page = Math.min(pages, state.page + 1);
        else state.page = parseInt(p, 10);
        render();
      });
    }

    var initial = new URLSearchParams(window.location.search).get("cat");
    if (initial && AC.categories.some(function (c) { return c.id === initial; })) {
      state.cat = initial;
    }
    renderFilters();
    render();
  }

  /* 9. Inquiry form — composes an email via the visitor's own mail app.
     Nothing is transmitted by the website itself; no success screen. */
  var form = document.getElementById("inquiry-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var v = function (id) {
        var el = document.getElementById(id);
        return el ? el.value.trim() : "";
      };
      var lines = [
        "Custom cake inquiry — from the concept preview",
        "",
        "Name: " + v("f-name"),
        "Email: " + v("f-email"),
        "Phone: " + v("f-phone"),
        "Event date: " + v("f-date"),
        "Approx. guests / servings: " + v("f-guests"),
        "Occasion: " + v("f-occasion"),
        "Cake flavor interest: " + v("f-flavor"),
        "Filling interest: " + v("f-filling"),
        "Cake size (from size guide): " + v("f-size"),
        "Inspiration photo links: " + v("f-photos"),
        "",
        "Description: " + v("f-description")
      ];
      var subject = "Custom cake inquiry" + (v("f-date") ? " — " + v("f-date") : "");
      var mailto = AC.contact.email.href + "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(lines.join("\r\n"));
      var notice = document.getElementById("form-notice");
      window.location.href = mailto;
      if (notice) {
        notice.hidden = false;
      }
    });
  }
})();
