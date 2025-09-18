// -------------------- NAV ACTIVE + SCROLL --------------------
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll("nav a");
  const currentPage = window.location.pathname.split("/").pop();

  navLinks.forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
    // Smooth scroll if anchor link
    link.addEventListener("click", e => {
      if (link.hash) {
        e.preventDefault();
        document.querySelector(link.hash).scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});

// -------------------- PACKAGES DATA --------------------
const packages = [
  { id: 1, destination: "Goa", durationDays: 5, basePrice: 15000, season: "peak" },
  { id: 2, destination: "Manali", durationDays: 7, basePrice: 20000, season: "off" },
  { id: 3, destination: "Rajasthan", durationDays: 4, basePrice: 12000, season: "normal" },
  { id: 4, destination: "Mumbai", durationDays: 3, basePrice: 10000, season: "festival" }
];

// -------------------- FINAL PRICE CALCULATION --------------------
function calculateFinalPrice(pkg) {
  let multiplier = 1;
  switch (pkg.season) {
    case "peak": multiplier = 1.3; break;
    case "off": multiplier = 0.8; break;
    case "festival": multiplier = 1.5; break;
    default: multiplier = 1;
  }
  let finalPrice = pkg.basePrice * multiplier;
  if (pkg.durationDays > 5) finalPrice += 500;
  return finalPrice;
}

// -------------------- RENDER PACKAGES --------------------
function renderPackages() {
  const tableBody = document.getElementById("packages-table");
  if (!tableBody) return;

  tableBody.innerHTML = "";
  packages.forEach(pkg => {
    const finalPrice = calculateFinalPrice(pkg);
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${pkg.destination}</td>
      <td>${pkg.durationDays} days</td>
      <td>₹${pkg.basePrice}</td>
      <td>${pkg.season}</td>
      <td><strong>₹${finalPrice}</strong></td>
    `;
    tableBody.appendChild(row);
  });
}
renderPackages();

// -------------------- BOOKING PRICE ESTIMATOR --------------------
function estimateBookingPrice() {
  const checkIn = document.getElementById("checkin").value;
  const checkOut = document.getElementById("checkout").value;
  const packageSelect = document.getElementById("package");
  const persons = document.getElementById("persons").value;
  const promoCode = document.getElementById("promoCode").value.trim();

  const estimateDiv = document.getElementById("estimate");
  const submitBtn = document.getElementById("submitBtn");

  // Validate required fields
  if (!checkIn || !checkOut || !packageSelect.value || persons <= 0) {
    estimateDiv.textContent = "Please complete all fields.";
    submitBtn.disabled = true;
    return;
  }

  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const nights = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));

  const selected = packages.find(p => p.id == packageSelect.value);
  if (!selected) return;

  let total = calculateFinalPrice(selected) * nights;

  // Guest multiplier
  if (persons > 2) {
    total *= 1.2;
  }
  total *= persons;

  // Promo code logic
  switch (promoCode.toUpperCase()) {
    case "EARLYBIRD": total *= 0.9; break; // 10% off
    case "FESTIVE50": total *= 0.5; break; // 50% off
    case "WELCOME": total -= 1000; break; // Flat discount
    default: break;
  }

  estimateDiv.textContent = `Estimated Total: ₹${Math.round(total)}`;
  submitBtn.disabled = false;
}

function attachBookingListeners() {
  const inputs = ["checkin", "checkout", "package", "persons", "promoCode"];
  inputs.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("input", estimateBookingPrice);
  });
}
attachBookingListeners();

// -------------------- BOOKING FORM VALIDATION --------------------
function validateBookingForm() {
  const name = document.getElementById("name");
  const checkIn = document.getElementById("checkin");
  const checkOut = document.getElementById("checkout");
  const packageSelect = document.getElementById("package");
  const persons = document.getElementById("persons");

  if (!name.value.trim()) {
    alert("Please enter your name");
    return false;
  }
  if (!checkIn.value || !checkOut.value) {
    alert("Please select check-in and check-out dates");
    return false;
  }
  if (!packageSelect.value) {
    alert("Please select a package");
    return false;
  }
  if (persons.value <= 0) {
    alert("Please enter a valid number of persons");
    return false;
  }
  return true;
}

// -------------------- GALLERY WITH MODAL --------------------
function renderGallery() {
  const galleryDiv = document.getElementById("gallery");
  if (!galleryDiv) return;

  galleryDiv.innerHTML = "";
  galleryImages.forEach((img, index) => {
    const imgEl = document.createElement("img");
    imgEl.src = img.src;
    imgEl.alt = img.caption;
    imgEl.setAttribute("data-large", img.large);
    imgEl.title = img.caption;
    imgEl.classList.add("thumb");

    imgEl.addEventListener("click", () => openModal(imgEl));

    galleryDiv.appendChild(imgEl);
  });
}

const galleryImages = [
  { src: "images/goa_thumb.jpg", large: "images/goa.jpg", caption: "Sunny Goa Beach" },
  { src: "images/manali_thumb.jpg", large: "images/manali.jpg", caption: "Snowy Manali" },
  { src: "images/rajasthan_thumb.jpg", large: "images/rajasthan.jpg", caption: "Rajasthan Desert" },
  { src: "images/mumbai_thumb.jpg", large: "images/mumbai.jpg", caption: "Mumbai Skyline" }
];

function openModal(imgEl) {
  let modal = document.getElementById("modal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "modal";
    modal.style.position = "fixed";
    modal.style.top = 0;
    modal.style.left = 0;
    modal.style.width = "100%";
    modal.style.height = "100%";
    modal.style.background = "rgba(0,0,0,0.8)";
    modal.style.display = "flex";
    modal.style.alignItems = "center";
    modal.style.justifyContent = "center";
    modal.style.zIndex = "1000";

    const imgTag = document.createElement("img");
    imgTag.id = "modal-img";
    imgTag.style.maxWidth = "80%";
    imgTag.style.maxHeight = "80%";
    imgTag.style.border = "5px solid #fff";
    modal.appendChild(imgTag);

    modal.addEventListener("click", () => modal.remove());
    document.body.appendChild(modal);
  }

  const modalImg = document.getElementById("modal-img");
  modalImg.src = imgEl.getAttribute("data-large");
  modalImg.alt = imgEl.alt;
  modalImg.title = imgEl.title;
}

renderGallery();
