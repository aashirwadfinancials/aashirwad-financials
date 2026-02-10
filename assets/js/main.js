// ----------------------
// Load HTML Sections
// ----------------------

function loadSection(id, file, callback) {
  fetch(file)
    .then(res => res.text())
    .then(data => {
      document.getElementById(id).innerHTML = data;
      if (callback) callback();
    });
}

// Load Sections
loadSection("header", "sections/header.html", initMenu);
loadSection("about", "sections/about.html");
loadSection("services", "sections/services.html");
loadSection("markets", "sections/markets.html");
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
  const reveals = document.querySelectorAll(".reveal");

  reveals.forEach(el => {
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

  // Toggle menu
  toggle.onclick = function(){
    nav.classList.toggle("show");
  };

  // Close menu when link clicked
  const links = nav.querySelectorAll("a");
  links.forEach(link=>{
    link.onclick = function(){
      nav.classList.remove("show");
    };
  });

}

async function loadMarkets() {
  try {
    const res = await fetch("/.netlify/functions/markets");
    const data = await res.json();

    document.getElementById("nifty").innerText = data.nifty
      ? data.nifty.toFixed(2)
      : "Unavailable";

    document.getElementById("sensex").innerText = data.sensex
      ? data.sensex.toFixed(2)
      : "Unavailable";

    document.getElementById("banknifty").innerText = data.banknifty
      ? data.banknifty.toFixed(2)
      : "Unavailable";

    document.getElementById("gold").innerText = data.gold
      ? data.gold.toFixed(2)
      : "Unavailable";

    document.getElementById("silver").innerText = data.silver
      ? data.silver.toFixed(2)
      : "Unavailable";

  } catch (err) {
    console.error("Market load error", err);
  }
}

document.addEventListener("DOMContentLoaded", loadMarkets);
