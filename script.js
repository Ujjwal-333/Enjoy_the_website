const slides = [...document.querySelectorAll(".hero-slide")];
const dotsContainer = document.getElementById("dots");
let currentSlide = 0;

slides.forEach((_, index) => {
  const dot = document.createElement("span");
  dot.className = `dot ${index === 0 ? "active" : ""}`;
  dot.addEventListener("click", () => showSlide(index));
  dotsContainer.appendChild(dot);
});

function showSlide(index) {
  currentSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, i) => slide.classList.toggle("active", i === currentSlide));
  document.querySelectorAll(".dot").forEach((dot, i) => dot.classList.toggle("active", i === currentSlide));
}
document.getElementById("nextBtn").addEventListener("click", () => showSlide(currentSlide + 1));
document.getElementById("prevBtn").addEventListener("click", () => showSlide(currentSlide - 1));
setInterval(() => showSlide(currentSlide + 1), 5000);

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
menuBtn.addEventListener("click", () => navLinks.classList.toggle("open"));
document.querySelectorAll(".nav-links a").forEach(a => a.addEventListener("click", () => navLinks.classList.remove("open")));

async function loadServices() {
  const container = document.getElementById("serviceCards");
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=6");
    if (!response.ok) throw new Error("API request failed");
    const posts = await response.json();

    const images = ["images/cc4.jpg", "images/c1.jpg", "images/c2.jpg", "images/c3.jpg", "images/cc2.jpg", "images/cc5.jpg"];
    container.innerHTML = posts.slice(0, 3).map((post, index) => `
      <article class="card">
        <img src="${images[index]}" alt="Service ${index + 1}">
        <div class="card-body">
          <h4>${post.title.replace(/^\w/, c => c.toUpperCase())}</h4>
          <p>${post.body}</p>
          <a class="btn primary" href="#contact">See Profile</a>
        </div>
      </article>
    `).join("");
  } catch (error) {
    container.innerHTML = `
      <article class="card"><img src="images/cc4.jpg" alt="Beautiful Nature">
        <div class="card-body"><h4>Beautiful Nature</h4><p>Explore our services and learn web development.</p><a class="btn primary" href="#contact">See Profile</a></div>
      </article>
      <article class="card"><img src="images/c1.jpg" alt="Web Development">
        <div class="card-body"><h4>Web Development</h4><p>Build modern and responsive websites.</p><a class="btn primary" href="#contact">See Profile</a></div>
      </article>
      <article class="card"><img src="images/c2.jpg" alt="Design">
        <div class="card-body"><h4>Creative Design</h4><p>Clean layouts and user-friendly experiences.</p><a class="btn primary" href="#contact">See Profile</a></div>
      </article>`;
  }
}
loadServices();

const STORAGE_KEY = "thapaTechnicalContacts";
const form = document.getElementById("contactForm");
const message = document.getElementById("formMessage");
const savedBox = document.getElementById("savedBox");

function getContacts() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
}
function renderSavedInfo() {
  const contacts = getContacts();
  savedBox.innerHTML = contacts.length
    ? `<strong>${contacts.length}</strong> contact submission(s) saved in your browser's localStorage.`
    : "No contact submission saved yet.";
}
renderSavedInfo();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const contact = {
    id: Date.now(),
    user: document.getElementById("user").value.trim(),
    email: document.getElementById("email").value.trim(),
    mobile: document.getElementById("mobile").value.trim(),
    comment: document.getElementById("comment").value.trim(),
    createdAt: new Date().toLocaleString()
  };

  const contacts = getContacts();
  contacts.push(contact);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));

  message.textContent = "Form submitted successfully! Data localStorage me save ho gaya.";
  message.style.color = "#28a745";
  form.reset();
  renderSavedInfo();
});

document.getElementById("searchForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const query = document.getElementById("searchInput").value.trim().toLowerCase();
  if (!query) return;
  const match = [...document.querySelectorAll(".section, .card")].find(el => el.innerText.toLowerCase().includes(query));
  if (match) match.scrollIntoView({ behavior: "smooth", block: "center" });
  else alert(`"${query}" not found on this page.`);
});
