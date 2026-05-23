// ─── Scroll Reveal ───
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('active'); } });
}, { threshold: 0.1 });
reveals.forEach(el => observer.observe(el));

// ─── Header scroll effect ───
window.addEventListener('scroll', () => {
  const h = document.getElementById('header');
  if (window.scrollY > 60) {
    h.style.background = 'rgba(245, 245, 220, 0.98)';
    h.style.boxShadow = '0 4px 20px rgba(62, 39, 35, 0.1)';
    h.style.backdropFilter = 'blur(20px)';
  } else {
    h.style.background = 'rgba(245, 245, 220, 0.92)';
    h.style.boxShadow = 'none';
    h.style.backdropFilter = 'blur(15px)';
  }
});

// ─── Mobile hamburger ───
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
hamburger.addEventListener('click', () => {
  const open = nav.style.display === 'flex';
  nav.style.cssText = open
    ? ''
    : 'display:flex;flex-direction:column;position:fixed;top:70px;left:0;right:0;background:rgba(245,245,220,0.98);padding:24px;gap:20px;border-bottom:1px solid rgba(62,39,35,0.1);z-index:999;backdrop-filter:blur(20px);';
});

// Close mobile nav on link click
nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => { nav.style.cssText = ''; });
});

// ─── Contact form ───
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    btn.textContent = 'Sending...';
    btn.disabled = true;

    const data = {
      fullName: form.name.value,
      workEmail: form.email.value,
      serviceNeeded: form.enquiry.value,
      projectDetails: `Country: ${form.country.value}\nMessage: ${form.message.value}`,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        btn.textContent = '✅ Sent! We\'ll reply within 24 hours.';
        btn.style.background = 'linear-gradient(135deg,#34d399,#059669)';
        form.reset();
      } else {
        throw new Error();
      }
    } catch {
      btn.textContent = '📧 Email us: hello@lastbench.in';
      btn.disabled = false;
      btn.style.background = '';
    }
  });
}

