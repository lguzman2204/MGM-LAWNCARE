// Mobile nav toggle
const hamburger = document.querySelector(".hamburger");
const mobileNav = document.querySelector(".mobile-nav");

if (hamburger && mobileNav) {
  hamburger.addEventListener("click", () => {
    const expanded = hamburger.getAttribute("aria-expanded") === "true";
    hamburger.setAttribute("aria-expanded", String(!expanded));
    mobileNav.hidden = expanded;
  });

  // Close mobile nav when clicking a link
  mobileNav.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      hamburger.setAttribute("aria-expanded", "false");
      mobileNav.hidden = true;
    });
  });
}

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Quote form behavior (no backend needed)
const form = document.getElementById("quoteForm");
const statusEl = document.getElementById("formStatus");

function setStatus(msg) {
  if (statusEl) statusEl.textContent = msg;
}

function buildMessage(data) {
  return `
New Quote Request (GreenEdge Lawn Care)

Name: ${data.name}
Phone: ${data.phone}
Email: ${data.email}
ZIP: ${data.zip}
Address: ${data.address || "(not provided)"}
Service: ${data.service}
Yard Size: ${data.yard_size}
Preferred Start Date: ${data.start_date || "(not provided)"}

Notes:
${data.notes || "(none)"}
`.trim();
}

form?.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  // Save locally so you (or the visitor) can see it as a demo
  const submissions = JSON.parse(localStorage.getItem("quoteSubmissions") || "[]");
  submissions.unshift({ ...data, submittedAt: new Date().toISOString() });
  localStorage.setItem("quoteSubmissions", JSON.stringify(submissions));

  // Option A: open an email draft (works everywhere, no backend)
  const businessEmail = "quotes@greenedgelawn.com"; // change this
  const subject = encodeURIComponent(`Quote Request - ${data.service} (${data.zip})`);
  const body = encodeURIComponent(buildMessage(data));
  window.location.href = `mailto:${businessEmail}?subject=${subject}&body=${body}`;

  setStatus("Thanks! Your quote request is ready to send.");
  form.reset();
});
