/* ── TYPED.JS ── */
new Typed("#typed-text", {
  strings: [
    "Frontend Developer",
    "Web Developer",
  ],
  typeSpeed: 60,
  backSpeed: 35,
  backDelay: 1800,
  loop: true,
  cursorChar: "|",
});

/* ── CUSTOM CURSOR ── */
const dot = document.getElementById("cursorDot");
const outline = document.getElementById("cursorOutline");
let mx = 0,
  my = 0,
  ox = 0,
  oy = 0;
document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
  dot.style.left = mx + "px";
  dot.style.top = my + "px";
});
function animCursor() {
  ox += (mx - ox) * 0.15;
  oy += (my - oy) * 0.15;
  outline.style.left = ox + "px";
  outline.style.top = oy + "px";
  requestAnimationFrame(animCursor);
}
animCursor();
document
  .querySelectorAll("a,button,.project-card,.tech-badge,.social-btn")
  .forEach((el) => {
    el.addEventListener("mouseenter", () => {
      outline.style.width = "52px";
      outline.style.height = "52px";
      outline.style.opacity = "1";
    });
    el.addEventListener("mouseleave", () => {
      outline.style.width = "36px";
      outline.style.height = "36px";
      outline.style.opacity = ".6";
    });
  });

/* ── NAVBAR SCROLL ── */
window.addEventListener("scroll", () => {
  document
    .getElementById("navbar")
    .classList.toggle("scrolled", window.scrollY > 60);
});

/* ── HAMBURGER ── */
function toggleNav() {
  document.getElementById("hamburger").classList.toggle("open");
  document.getElementById("navLinks").classList.toggle("open");
}
function closeNav() {
  document.getElementById("hamburger").classList.remove("open");
  document.getElementById("navLinks").classList.remove("open");
}

/* ── PARTICLES ── */
const container = document.getElementById("particles");
for (let i = 0; i < 22; i++) {
  const p = document.createElement("div");
  p.classList.add("particle");
  const size = Math.random() * 5 + 2;
  p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random() * 100}%;
      animation-duration:${Math.random() * 12 + 8}s;
      animation-delay:${Math.random() * 10}s;
      opacity:0;
    `;
  container.appendChild(p);
}

/* ── SCROLL REVEAL ── */
const revealEls = document.querySelectorAll(".reveal");
const revealObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add("visible"), i * 80);
        revealObs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 },
);
revealEls.forEach((el) => revealObs.observe(el));

/* ── SKILL BARS ── */
const barObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll(".skill-fill").forEach((fill) => {
          fill.style.width = fill.dataset.width + "%";
        });
        barObs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 },
);
document
  .querySelectorAll(".skill-category")
  .forEach((el) => barObs.observe(el));

/* ── COUNT-UP STATS ── */
const countObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll(".stat-number").forEach((num) => {
          const target = +num.dataset.count;
          let current = 0;
          const step = Math.ceil(target / 40);
          const timer = setInterval(() => {
            current = Math.min(current + step, target);
            num.textContent = current + (target >= 5 ? "+" : "");
            if (current >= target) clearInterval(timer);
          }, 40);
        });
        countObs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.4 },
);
document.querySelectorAll(".about-card").forEach((el) => countObs.observe(el));

/* ── CONTACT FORM ── */
function handleSubmit(e) {
  e.preventDefault();
  const form = document.getElementById("contactForm");
  const success = document.getElementById("formSuccess");
  form.style.opacity = "0";
  setTimeout(() => {
    form.style.display = "none";
    success.style.display = "block";
    success.style.animation = "none";
  }, 400);
}

/* ── ACTIVE NAV ── */
const sections = document.querySelectorAll("section[id]");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((s) => {
    if (window.scrollY >= s.offsetTop - 140) current = s.id;
  });
  document.querySelectorAll(".nav-links a").forEach((a) => {
    a.style.color =
      a.getAttribute("href") === "#" + current ? "var(--orange)" : "";
  });
});
