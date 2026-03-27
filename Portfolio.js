// ── NAV ACTIVE STATE ────────────────────────────────────────────────
function setActive(el) {
  document
    .querySelectorAll(".nav-item")
    .forEach((i) => i.classList.remove("active"));
  el.classList.add("active");
}

// Auto-highlight on scroll
window.addEventListener("scroll", () => {
  const ids = ["home", "about", "skills", "projects", "contact"];
  let current = "home";
  ids.forEach((id) => {
    const el = document.getElementById(id);
    if (el && window.scrollY >= el.offsetTop - 200) current = id;
  });
  document.querySelectorAll(".nav-item").forEach((a) => {
    a.classList.toggle("active", a.getAttribute("href") === "#" + current);
  });
});

// ── TYPEWRITER ──────────────────────────────────────────────────────
const roles = [
  "Front-End Web Developer",
  "React.js Developer",
  "Web Developer",
  "JavaScript Developer",
  "UI Developer",
];
let rIdx = 0,
  cIdx = 0,
  deleting = false;
const roleEl = document.getElementById("role");

function typeRole() {
  const word = roles[rIdx];
  roleEl.textContent = deleting ? word.slice(0, cIdx--) : word.slice(0, cIdx++);
  if (!deleting && cIdx > word.length) {
    deleting = true;
    setTimeout(typeRole, 1600);
    return;
  }
  if (deleting && cIdx < 0) {
    deleting = false;
    rIdx = (rIdx + 1) % roles.length;
    setTimeout(typeRole, 500);
    return;
  }
  setTimeout(typeRole, deleting ? 45 : 85);
}
typeRole();

// ── SCROLL REVEAL ───────────────────────────────────────────────────
// ✅ BUG FIXED 1: was `entries,forEach` (comma) → correct is `entries.forEach`
// ✅ BUG FIXED 2: was `observer.inobserve` → correct is `observer.unobserve`
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
);

document
  .querySelectorAll(".slide-left, .slide-right, .fade-up")
  .forEach((el) => observer.observe(el));

// ── CONTACT FORM ────────────────────────────────────────────────────
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const btn = this.querySelector(".form-submit");
  const msg = document.getElementById("formMsg");
  btn.textContent = "Sending...";
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = "Send Message 🚀";
    btn.disabled = false;
    msg.style.display = "block";
    this.reset();
    setTimeout(() => {
      msg.style.display = "none";
    }, 4000);
  }, 1200);
});
