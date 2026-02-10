// ----------------------
// Load HTML Sections
// ----------------------

function loadSection(id, file, callback) {
  fetch(file)
    .then(res => res.text())
    .then(data => {
      const container = document.getElementById(id);
      if (!container) return;

      container.innerHTML = data;

      // Run callback ONLY after section is injected
      if (typeof callback === "function") {
        callback();
      }
    })
    .catch(err => {
      console.error(`Failed to load ${file}`, err);
    });
}

// Load Sections (ORDER MATTERS)
loadSection("header", "sections/header.html", initMenu);
loadSection("about", "sections/about.html");
loadSection("services", "sections/services.html");
loadSection("markets", "sections/markets.html", loadMarkets); // 👈 IMPORTANT
loadSection("testimonials", "sections/testimonials.html");
loadSection("partners", "sections/partners.html");
loadSection("awards", "sections/awards.html");
loadSection("career", "sections/career.html");
loadSection("contact", "sections/contact.html");
loadSection("footer", "sections/footer.html");


// ----------------------
// Scroll Reveal Animation
// ----------------------

window.addEventListener("scroll", reveal);

function reveal() {
  const reveals = document.querySelectorAll(".reveal");

  reveals.forEach(el => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    const elementVisible = 120;

    if (elementTop < windowHeight - elementVisible) {
      el.classList.add("active");
    }
  });
}


// ----------------------
// Mobile Menu System
// ----------------------

function initMenu() {
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav-links");

  if (!toggle || !nav) return;

  toggle.onclick = () => {
    nav.classList.toggle("show");
  };

  // Close menu on link click
  nav.querySelectorAll("a").forEach(link => {
    link.onclick = () => nav.classList.remove("show");
  });
}


// ----------------------
// Load Live Market Prices
// ----------------------

async function loadMarkets() {
  try {
    const res = await fetch("/.netlify/functions/markets");

    if (!res.ok) throw new Error("Market API failed");

    const data = await res.json();

    setValue("nifty", data.nifty);
    setValue("sensex", data.sensex);
    setValue("banknifty", data.banknifty);
    setValue("gold", data.gold);
    setValue("silver", data.silver);

  } catch (err) {
    console.error("Market load error:", err);
    setUnavailable();
  }
}


// ----------------------
// Helpers
// ----------------------

function setValue(id, value) {
  const el = document.getElementById(id);
  if (!el) return;

  el.innerText =
    typeof value === "number"
      ? value.toLocaleString("en-IN", { maximumFractionDigits: 2 })
      : "Unavailable";
}

function setUnavailable() {
  ["nifty", "sensex", "banknifty", "gold", "silver"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.innerText = "Unavailable";
  });
}
