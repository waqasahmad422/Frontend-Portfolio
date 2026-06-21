/* ══════════════════════════════════════════════
   WAS Portfolio — app.js  (Week 2 Enhanced)
══════════════════════════════════════════════ */

/* ── AOS INIT ── */
AOS.init({ duration: 800, once: true, offset: 80 });

/* ── TYPED.JS ── */
new Typed("#typed-text", {
  strings: [
    "Frontend Developer",
    "UI/UX Desinger",
    "React Developer",
    "Web Developer",
  ],
  typeSpeed: 60,
  backSpeed: 35,
  backDelay: 1800,
  loop: true,
  cursorChar: "|",
});

/* ── DARK / LIGHT MODE TOGGLE ── */
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const html = document.documentElement;

// Load saved preference (default: dark)
const savedTheme = localStorage.getItem("was-theme") || "dark";
applyTheme(savedTheme);

themeToggle.addEventListener("click", () => {
  const current = html.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  applyTheme(next);
  localStorage.setItem("was-theme", next);
});

function applyTheme(theme) {
  html.setAttribute("data-theme", theme);
  // Sun = switch to light; Moon = switch to dark
  if (theme === "dark") {
    themeIcon.className = "fas fa-sun";
    themeToggle.title = "Switch to light mode";
  } else {
    themeIcon.className = "fas fa-moon";
    themeToggle.title = "Switch to dark mode";
  }
}

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
  .querySelectorAll(
    "a,button,.project-card,.tech-badge,.social-btn,.testimonial-card",
  )
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

/* ── TESTIMONIALS SLIDER ── */
(function initSlider() {
  const track = document.getElementById("testimonialsTrack");
  const cards = track ? Array.from(track.children) : [];
  const dotsWrap = document.getElementById("sliderDots");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  if (!track || cards.length === 0) return;

  // How many cards visible at once depends on viewport
  function visibleCount() {
    return window.innerWidth <= 900 ? 1 : 2;
  }

  let current = 0;

  // Build dots
  function buildDots() {
    dotsWrap.innerHTML = "";
    const total = Math.ceil(cards.length / visibleCount());
    for (let i = 0; i < total; i++) {
      const dot = document.createElement("button");
      dot.className = "slider-dot" + (i === 0 ? " active" : "");
      dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
      dot.addEventListener("click", () => goTo(i));
      dotsWrap.appendChild(dot);
    }
  }

  function updateDots() {
    document.querySelectorAll(".slider-dot").forEach((d, i) => {
      d.classList.toggle("active", i === current);
    });
  }

  function goTo(index) {
    const total = Math.ceil(cards.length / visibleCount());
    current = Math.max(0, Math.min(index, total - 1));
    const cardWidth = cards[0].offsetWidth + 28; // gap = 28px
    track.style.transform = `translateX(-${current * visibleCount() * cardWidth}px)`;
    updateDots();
  }

  prevBtn.addEventListener("click", () => goTo(current - 1));
  nextBtn.addEventListener("click", () => goTo(current + 1));

  // Auto-play
  let autoPlay = setInterval(
    () =>
      goTo(
        current + 1 >= Math.ceil(cards.length / visibleCount())
          ? 0
          : current + 1,
      ),
    5000,
  );

  [prevBtn, nextBtn].forEach((btn) => {
    btn.addEventListener("click", () => {
      clearInterval(autoPlay);
      autoPlay = null;
    });
  });

  buildDots();

  // Rebuild on resize
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      current = 0;
      buildDots();
      goTo(0);
    }, 200);
  });
})();

/* ── CONTACT FORM ── */
function handleSubmit(e) {
  e.preventDefault();
  const form = document.getElementById("contactForm");
  const success = document.getElementById("formSuccess");
  form.style.opacity = "0";
  setTimeout(() => {
    form.style.display = "none";
    success.style.display = "block";
  }, 400);
}

/* ── ACTIVE NAV HIGHLIGHT ── */
const sections = document.querySelectorAll("section[id]");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((s) => {
    if (window.scrollY >= s.offsetTop - 140) current = s.id;
  });
  document.querySelectorAll(".nav-links a").forEach((a) => {
    const href = a.getAttribute("href");
    a.style.color = href === "#" + current ? "var(--orange)" : "";
  });
});
