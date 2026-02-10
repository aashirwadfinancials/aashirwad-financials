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
loadSection("markets", "sections/markets.html", loadMarkets); // 🔥 KEY FIX
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

function reveal(){
  document.querySelectorAll(".reveal").forEach(el => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    const elementVisible = 120;

    if(elementTop < windowHeight - elementVisible){
      el.classList.add("active");
    }
  });
}


// ----------------------
// Mobile Menu System
// ----------------------

function initMenu(){
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav-links");

  if(!toggle || !nav) return;

  toggle.onclick = () => nav.classList.toggle("show");

  nav.querySelectorAll("a").forEach(link => {
    link.onclick = () => nav.classList.remove("show");
  });
}


// ----------------------
// Load Live Market Data
// ----------------------

async function loadMarkets() {
  try {
    const res = await fetch("/.netlify/functions/markets");
    const data = await res.json();

    const set = (id, value) => {
      const el = document.getElementById(id);
      if (el) el.innerText = value ?? "Unavailable";
    };

    set("nifty", data.nifty?.toFixed(2));
    set("sensex", data.sensex?.toFixed(2));
    set("banknifty", data.banknifty?.toFixed(2));
    set("gold", data.gold?.toFixed(2));
    set("silver", data.silver?.toFixed(2));

  } catch (err) {
    console.error("Market load error", err);
  }
}
