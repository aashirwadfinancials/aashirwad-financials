// ----------------------
// Load HTML Sections
// ----------------------

function loadSection(id, file, callback) {
  fetch(file)
    .then(res => res.text())
    .then(data => {
      document.getElementById(id).innerHTML = data;
      if (callback) callback();
    })
    .catch(err => console.error(`Error loading ${file}`, err));
}

// Load Sections
loadSection("header", "sections/header.html", initMenu);
loadSection("about", "sections/about.html");
loadSection("services", "sections/services.html");

// ✅ IMPORTANT: call loadMarkets AFTER markets.html loads
loadSection("markets", "sections/markets.html", loadMarkets);

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

  toggle.onclick = () => nav.classList.toggle("show");

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
    const data = await res.json();

    document.getElementById("nifty").innerText =
      data.nifty ? Number(data.nifty).toFixed(2) : "Unavailable";

    document.getElementById("sensex").innerText =
      data.sensex ? Number(data.sensex).toFixed(2) : "Unavailable";

    document.getElementById("banknifty").innerText =
      data.banknifty ? Number(data.banknifty).toFixed(2) : "Unavailable";

    document.getElementById("gold").innerText =
      data.gold ? Number(data.gold).toFixed(2) : "Unavailable";

    document.getElementById("silver").innerText =
      data.silver ? Number(data.silver).toFixed(2) : "Unavailable";

  } catch (err) {
    console.error("Market load error:", err);

    ["nifty", "sensex", "banknifty", "gold", "silver"].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.innerText = "Unavailable";
    });
  }
}
