/* ==========================================================================
   AlgoGrowth Hub - JavaScript Engine (CSS-Only Visuals & Interactive Modals)
   ========================================================================== */

// Temporary storage for current booking info
let currentBookingData = null;

document.addEventListener("DOMContentLoaded", () => {
  // Check if websiteData exists from data.js
  if (typeof websiteData === "undefined") {
    console.error("websiteData is not defined. Ensure data.js is loaded first.");
    return;
  }

  // Initialize features
  initTheme();
  renderHeader();
  renderHero();
  renderAboutSection();
  renderServices();
  renderResources();
  renderCommunity();
  renderFAQs();
  renderBookingSection();
  renderFooter();
  setupScrollListener();
  setupMobileMenu();
});

/* --------------------------------------------------------------------------
   1. Theme Management (Light / Dark Mode)
   -------------------------------------------------------------------------- */
function initTheme() {
  const currentTheme = localStorage.getItem("theme") || "dark";
  const body = document.body;

  if (currentTheme === "light") {
    body.classList.add("light-mode");
  } else {
    body.classList.remove("light-mode");
  }
}

function toggleTheme() {
  const body = document.body;
  const isLight = body.classList.toggle("light-mode");
  localStorage.setItem("theme", isLight ? "light" : "dark");
  
  // Update toggle button icon
  const icon = document.querySelector(".theme-toggle-btn i");
  if (icon) {
    icon.className = isLight ? "fa-solid fa-moon" : "fa-solid fa-sun";
  }
}

/* --------------------------------------------------------------------------
   2. Render Header / Navigation
   -------------------------------------------------------------------------- */
function renderHeader() {
  const container = document.getElementById("header-container");
  const data = websiteData.header;
  const isLight = document.body.classList.contains("light-mode");

  const linksHtml = data.navLinks
    .map(link => `<li><a href="${link.href}" class="nav-link">${link.text}</a></li>`)
    .join("");

  container.innerHTML = `
    <div class="container">
      <div class="nav-bar">
        <a href="#home" class="logo">
          <img src="${data.logoPath}" alt="${data.logoText} Logo" class="logo-img">
        </a>
        
        <ul class="nav-menu" id="nav-menu">
          ${linksHtml}
          <li class="mobile-cta-li">
            <a href="${data.ctaButton.href}" target="_blank" class="btn btn-primary" style="width: 100%; justify-content: center;">
              ${data.ctaButton.text} <i class="fa-solid fa-arrow-right" style="font-size: 0.75rem;"></i>
            </a>
          </li>
        </ul>
        
        <div class="nav-actions">
          <button class="theme-toggle-btn" aria-label="Toggle theme" onclick="toggleTheme()">
            <i class="${isLight ? 'fa-solid fa-moon' : 'fa-solid fa-sun'}"></i>
          </button>
          
          <a href="${data.ctaButton.href}" target="_blank" class="btn btn-primary" style="padding: 0.6rem 1.25rem; font-size: 0.85rem;">
            ${data.ctaButton.text} <i class="fa-solid fa-arrow-right" style="font-size: 0.75rem;"></i>
          </a>
          
          <button class="mobile-toggle" id="mobile-toggle" aria-label="Toggle navigation menu">
            <i class="fa-solid fa-bars"></i>
          </button>
        </div>
      </div>
    </div>
  `;
}

function setupScrollListener() {
  const header = document.getElementById("header-container");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

function setupMobileMenu() {
  document.addEventListener("click", (e) => {
    const toggle = document.getElementById("mobile-toggle");
    const menu = document.getElementById("nav-menu");
    
    if (toggle && toggle.contains(e.target)) {
      menu.classList.toggle("active");
      const icon = toggle.querySelector("i");
      icon.className = menu.classList.contains("active") ? "fa-solid fa-xmark" : "fa-solid fa-bars";
    } else if (menu && menu.classList.contains("active") && !menu.contains(e.target)) {
      menu.classList.remove("active");
      const icon = document.getElementById("mobile-toggle").querySelector("i");
      icon.className = "fa-solid fa-bars";
    }
  });
}

/* --------------------------------------------------------------------------
   3. Render Hero Section
   -------------------------------------------------------------------------- */
function renderHero() {
  const section = document.getElementById("home");
  const data = websiteData.hero;

  section.innerHTML = `
    <div class="container">
      <div class="hero-grid">
        <div class="hero-content">
          <h1>Build.<br>Grow.<br><span class="grad-text">${data.title.split('. ')[2] || 'Monetize.'}</span></h1>
          <p class="hero-desc">${data.description}</p>
          <div class="hero-quote">"${data.quote}"</div>
          <div class="hero-ctas">
            <a href="${data.primaryCta.href}" target="_blank" class="btn btn-primary">
              ${data.primaryCta.text} <i class="fa-solid fa-rocket"></i>
            </a>
            <a href="${data.secondaryCta.href}" class="btn btn-outline">
              ${data.secondaryCta.text} <i class="fa-solid fa-arrow-down-long"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  `;
}

/* --------------------------------------------------------------------------
   4. Render Who We Are / Core Team Section
   -------------------------------------------------------------------------- */
function renderAboutSection() {
  const section = document.getElementById("about");
  const data = websiteData.about;

  const cardsHtml = data.team
    .map(member => {
      const avatarHtml = member.image ? 
        `<img src="${member.image}" alt="${member.name}" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; border: 4px solid var(--card-bg); box-shadow: var(--shadow-md); transition: all 0.4s ease;">` : 
        `<div class="avatar-circle">${member.initials}</div>`;
      return `
        <div class="team-card">
          <div class="team-card-banner"></div>
          <div class="team-avatar-container">
            ${avatarHtml}
          </div>
          <div class="team-card-content">
            <span class="team-card-role">${member.role}</span>
            <h3 class="team-card-name">${member.name}</h3>
            <p class="team-card-bio">${member.bio}</p>
            <div class="team-card-footer">
              <span style="font-size: 0.8rem; color: var(--text-muted);">Core Member</span>
              <div class="team-socials">
                <a href="${member.socials.instagram}" target="_blank" class="social-icon" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
                <a href="${member.socials.telegram}" target="_blank" class="social-icon" aria-label="Telegram"><i class="fa-brands fa-telegram"></i></a>
              </div>
            </div>
          </div>
        </div>
      `;
    })
    .join("");

  section.innerHTML = `
    <div class="container">
      <div class="section-header">
        <span class="section-tagline">${data.tagline}</span>
        <h2 class="section-title">${data.title}</h2>
        <p class="section-subtitle">${data.description}</p>
      </div>
      
      <div class="team-grid">
        ${cardsHtml}
      </div>
    </div>
  `;
}

/* --------------------------------------------------------------------------
   5. Render Services Section
   -------------------------------------------------------------------------- */
function renderServices() {
  const section = document.getElementById("services");
  const data = websiteData.services;

  const getIconClass = (iconName) => {
    switch (iconName) {
      case "instagram": return "fa-brands fa-instagram";
      case "cpu": return "fa-solid fa-microchip";
      case "layout": return "fa-solid fa-chart-line";
      case "video": return "fa-solid fa-video";
      case "award": return "fa-solid fa-award";
      case "shopping-bag": return "fa-solid fa-bag-shopping";
      default: return "fa-solid fa-star";
    }
  };

  const cardsHtml = data.list
    .map(service => `
      <div class="service-card">
        <div class="service-icon-box">
          <i class="${getIconClass(service.icon)}"></i>
        </div>
        <h3 class="service-title">${service.title}</h3>
        <p class="service-desc">${service.description}</p>
      </div>
    `)
    .join("");

  section.innerHTML = `
    <div class="container">
      <div class="section-header">
        <span class="section-tagline">Our Services</span>
        <h2 class="section-title">${data.title}</h2>
      </div>
      
      <div class="services-grid">
        ${cardsHtml}
      </div>
    </div>
  `;
}

/* --------------------------------------------------------------------------
   7. Render Resources Section
   -------------------------------------------------------------------------- */
function renderResources() {
  const section = document.getElementById("resources");
  const data = websiteData.resources;

  const cardsHtml = data.list
    .map(res => `
      <div class="resource-card">
        <div class="resource-info">
          <h3>${res.title}</h3>
          <p>${res.description}</p>
        </div>
        <a href="#booking" class="btn-link">Download Free <i class="fa-solid fa-arrow-right-long"></i></a>
      </div>
    `)
    .join("");

  section.innerHTML = `
    <div class="container">
      <div class="section-header">
        <span class="section-tagline">${data.title}</span>
        <h2 class="section-title">${data.subtitle}</h2>
      </div>
      
      <div class="resources-grid">
        ${cardsHtml}
      </div>
      
      <div class="premium-resources-box">
        <span class="badge">Premium Resource</span>
        <h3 style="margin-top: 1rem;">${data.premiumLink.text}</h3>
        <p>${data.premiumLink.description}</p>
        <a href="${data.premiumLink.href}" class="btn btn-primary">Request Access <i class="fa-solid fa-unlock-keyhole"></i></a>
      </div>
    </div>
  `;
}

/* --------------------------------------------------------------------------
   8. Render Community Section
   -------------------------------------------------------------------------- */
function renderCommunity() {
  const section = document.getElementById("community");
  const data = websiteData.community;

  section.innerHTML = `
    <div class="container">
      <div class="community-box">
        <span class="section-tagline">Join Us</span>
        <h2>${data.title}</h2>
        <p class="community-desc">${data.description}</p>
        <div class="community-ctas">
          <a href="${data.telegramLink}" target="_blank" class="btn btn-primary">
            <i class="fa-brands fa-telegram"></i> Join Telegram Channel
          </a>
          <a href="${data.whatsappLink}" target="_blank" class="btn btn-outline">
            <i class="fa-brands fa-whatsapp"></i> WhatsApp Community
          </a>
        </div>
      </div>
    </div>
  `;
}

/* --------------------------------------------------------------------------
   9. Render FAQs Section (Accordion)
   -------------------------------------------------------------------------- */
function renderFAQs() {
  const section = document.getElementById("faqs");
  const data = websiteData.faqs;

  const itemsHtml = data.list
    .map((faq, index) => `
      <div class="faq-item" id="faq-${index}">
        <button class="faq-question-btn" onclick="toggleFaq(${index})">
          <span>${faq.question}</span>
          <i class="fa-solid fa-chevron-down faq-icon"></i>
        </button>
        <div class="faq-answer" id="faq-ans-${index}">
          <div class="faq-answer-inner">
            ${faq.answer}
          </div>
        </div>
      </div>
    `)
    .join("");

  section.innerHTML = `
    <div class="container">
      <div class="section-header">
        <span class="section-tagline">Clarifications</span>
        <h2 class="section-title">${data.title}</h2>
      </div>
      
      <div class="faq-list">
        ${itemsHtml}
      </div>
    </div>
  `;
}

function toggleFaq(index) {
  const faqItem = document.getElementById(`faq-${index}`);
  const faqAnswer = document.getElementById(`faq-ans-${index}`);
  const isActive = faqItem.classList.contains("active");

  document.querySelectorAll(".faq-item").forEach(item => {
    item.classList.remove("active");
    item.querySelector(".faq-answer").style.maxHeight = null;
  });

  if (!isActive) {
    faqItem.classList.add("active");
    faqAnswer.style.maxHeight = faqAnswer.scrollHeight + "px";
  }
}

/* --------------------------------------------------------------------------
   10. Render Booking Section & Interactive Popup Logic
   -------------------------------------------------------------------------- */
function renderBookingSection() {
  const section = document.getElementById("booking");
  const data = websiteData.booking;

  // Set up modal UPI and Fee values dynamically
  document.getElementById("upi-val").textContent = data.upiId;
  document.getElementById("fee-val").textContent = `₹${data.fee}`;

  section.innerHTML = `
    <div class="container">
      <div class="booking-grid">
        <div class="booking-info">
          <div>
            <span class="section-tagline">Direct Scheduling</span>
            <h2 class="section-title" style="margin-bottom: 1.5rem;">${data.title}</h2>
            <p style="color: var(--text-muted); font-size: 1.1rem; line-height: 1.6;">${data.subtitle}</p>
          </div>
          
          <div class="booking-details">
            <div class="booking-item">
              <div class="booking-item-icon"><i class="fa-solid fa-envelope"></i></div>
              <div class="booking-item-text">
                <span>Support Email</span>
                <p>${data.email}</p>
              </div>
            </div>
            <div class="booking-item">
              <div class="booking-item-icon"><i class="fa-solid fa-phone"></i></div>
              <div class="booking-item-text">
                <span>Contact Number</span>
                <p>${data.phone}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="booking-form-box">
          <form id="booking-form" onsubmit="handleBookingSubmit(event)">
            <div class="form-row">
              <div class="form-group">
                <label for="book-name" class="form-label">Full Name</label>
                <input type="text" id="book-name" class="form-control" placeholder="Enter your name" required>
              </div>
              <div class="form-group">
                <label for="book-email" class="form-label">Email Address</label>
                <input type="email" id="book-email" class="form-control" placeholder="Enter your email" required>
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label for="book-date" class="form-label">Select Date</label>
                <input type="date" id="book-date" class="form-control" required>
              </div>
              <div class="form-group">
                <label for="book-time" class="form-label">Select Time Slot</label>
                <select id="book-time" class="form-control" required>
                  <option value="" disabled selected>Choose a slot</option>
                  <option value="10:00 AM - 10:45 AM">10:00 AM - 10:45 AM</option>
                  <option value="11:30 AM - 12:15 PM">11:30 AM - 12:15 PM</option>
                  <option value="02:00 PM - 02:45 PM">02:00 PM - 02:45 PM</option>
                  <option value="04:00 PM - 04:45 PM">04:00 PM - 04:45 PM</option>
                  <option value="06:30 PM - 07:15 PM">06:30 PM - 07:15 PM</option>
                </select>
              </div>
            </div>
            
            <div class="form-group">
              <label for="book-topic" class="form-label">What is your primary growth bottleneck?</label>
              <textarea id="book-topic" class="form-control" placeholder="Briefly describe your channel, niche, or automation goals..." required></textarea>
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%;">
              Book Growth Session <i class="fa-solid fa-calendar-check" style="font-size: 0.85rem;"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  `;
}

function handleBookingSubmit(event) {
  event.preventDefault();
  
  // Collect data
  currentBookingData = {
    name: document.getElementById("book-name").value,
    email: document.getElementById("book-email").value,
    date: document.getElementById("book-date").value,
    time: document.getElementById("book-time").value,
    topic: document.getElementById("book-topic").value
  };

  // Open the payment popup/modal
  openPaymentModal();
}

function openPaymentModal() {
  document.getElementById("payment-modal").classList.add("active");
}

function closePaymentModal() {
  document.getElementById("payment-modal").classList.remove("active");
}

function proceedToEmail() {
  if (!currentBookingData) return;

  const data = websiteData.booking;
  const subject = encodeURIComponent(`[AlgoGrowth Hub] Call Booked by ${currentBookingData.name}`);
  
  const bodyText = `Hi ALGOWINNER01,

I have booked a 1-on-1 strategy call with you.

Details of the Booking:
• Name: ${currentBookingData.name}
• Client Email: ${currentBookingData.email}
• Selected Date: ${currentBookingData.date}
• Selected Time Slot: ${currentBookingData.time}
• Bottleneck Topic: ${currentBookingData.topic}

Payment Info:
• Commitment Fee: ₹${data.fee}
• Method: Paid via UPI (to ${data.upiId})
• Status: Pending Verification

Please review the payment and reply with the Calendar / Meet invite link.

Thank you!`;

  const body = encodeURIComponent(bodyText);
  
  // Trigger mail compose
  window.location.href = `mailto:${data.email}?subject=${subject}&body=${body}`;

  // Reset booking form and close modal
  document.getElementById("booking-form").reset();
  closePaymentModal();
}

/* --------------------------------------------------------------------------
   11. Render Footer & Modal Policy Management
   -------------------------------------------------------------------------- */
function renderFooter() {
  const container = document.getElementById("footer-container");
  const headerData = websiteData.header;
  const bookingData = websiteData.booking;
  const data = websiteData.footer;

  const linksHtml = headerData.navLinks
    .map(link => `<a href="${link.href}">${link.text}</a>`)
    .join("");

  container.innerHTML = `
    <div class="container">
      <div class="footer-top">
        <div class="footer-brand">
          <h2>${headerData.logoText}</h2>
          <p>${data.tagline}</p>
        </div>
        
        <div class="footer-links-grid">
          <div class="footer-link-group">
            <h4>Quick Links</h4>
            <div class="footer-links">
              ${linksHtml}
            </div>
          </div>
          
          <div class="footer-link-group">
            <h4>Legal</h4>
            <div class="footer-links">
              <a onclick="showPolicy('privacy')">Privacy Policy</a>
              <a onclick="showPolicy('terms')">Terms & Conditions</a>
              <a onclick="showPolicy('refund')">Refund Policy</a>
            </div>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>${data.copyright}</p>
        <div class="footer-socials">
          <a href="${bookingData.instagram}" target="_blank" class="footer-social-btn" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
          <a href="${bookingData.telegram}" target="_blank" class="footer-social-btn" aria-label="Telegram"><i class="fa-brands fa-telegram"></i></a>
          <a href="${bookingData.youtube}" target="_blank" class="footer-social-btn" aria-label="YouTube"><i class="fa-brands fa-youtube"></i></a>
          <a href="${bookingData.whatsapp}" target="_blank" class="footer-social-btn" aria-label="WhatsApp"><i class="fa-brands fa-whatsapp"></i></a>
        </div>
      </div>
    </div>
  `;
}

function showPolicy(policyKey) {
  const data = websiteData.policies[policyKey];
  if (!data) return;

  document.getElementById("policy-title").textContent = data.title;
  document.getElementById("policy-body").innerHTML = data.content;
  document.getElementById("policy-modal").classList.add("active");
}

function closePolicyModal() {
  document.getElementById("policy-modal").classList.remove("active");
}

function setupChartTracker() {
  const container = document.getElementById("hero-chart-body");
  const svg = document.getElementById("growth-svg");
  const trackerLine = document.getElementById("tracker-line");
  const trackerDot = document.getElementById("tracker-dot");
  const tooltip = document.getElementById("chart-tooltip");
  const tooltipDate = document.getElementById("tooltip-date");
  const tooltipVal = document.getElementById("tooltip-value");
  
  if (!container || !svg || !trackerLine || !trackerDot || !tooltip) return;

  const points = [
    { x: 0, y: 170, label: "Jan (Starting)", val: "1.2K Reach" },
    { x: 50, y: 160, label: "Feb (Launch)", val: "2.8K Reach" },
    { x: 100, y: 130, label: "Mar (AI Setup)", val: "5.4K Reach" },
    { x: 150, y: 145, label: "Apr (Split Tests)", val: "7.9K Reach" },
    { x: 200, y: 95, label: "May (Viral Loop)", val: "18.2K Reach" },
    { x: 250, y: 110, label: "Jun (Stable)", val: "24.5K Reach" },
    { x: 300, y: 60, label: "Jul (Monetized)", val: "58.1K Reach" },
    { x: 350, y: 75, label: "Aug (Scaling)", val: "78.4K Reach" },
    { x: 400, y: 20, label: "Sep (System Active)", val: "148.2K Reach" }
  ];

  container.addEventListener("mousemove", (e) => {
    const rect = svg.getBoundingClientRect();
    const mouseX = ((e.clientX - rect.left) / rect.width) * 400;
    
    let closest = points[0];
    let minDist = Math.abs(mouseX - points[0].x);
    for (let i = 1; i < points.length; i++) {
      let dist = Math.abs(mouseX - points[i].x);
      if (dist < minDist) {
        minDist = dist;
        closest = points[i];
      }
    }

    trackerLine.setAttribute("x1", closest.x);
    trackerLine.setAttribute("x2", closest.x);
    trackerLine.style.display = "block";

    trackerDot.setAttribute("cx", closest.x);
    trackerDot.setAttribute("cy", closest.y);
    trackerDot.style.display = "block";

    tooltip.style.display = "block";
    tooltip.style.left = `${((closest.x / 400) * rect.width) + 15}px`;
    tooltip.style.top = `${((closest.y / 200) * rect.height) - 40}px`;

    tooltipDate.textContent = closest.label;
    tooltipVal.textContent = closest.val;
  });

  container.addEventListener("mouseleave", () => {
    trackerLine.style.display = "none";
    trackerDot.style.display = "none";
    tooltip.style.display = "none";
  });
}

// Window globally binding functions
window.toggleTheme = toggleTheme;
window.toggleFaq = toggleFaq;
window.handleBookingSubmit = handleBookingSubmit;
window.closePaymentModal = closePaymentModal;
window.proceedToEmail = proceedToEmail;
window.showPolicy = showPolicy;
window.closePolicyModal = closePolicyModal;
window.slideCreators = slideCreators;
window.setupChartTracker = setupChartTracker;
