// --- Initialize Lucide Icons ---
const initLucide = () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }
};

if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', initLucide);
} else {
  initLucide();
}

// --- Cinematic Intro ---
window.addEventListener('load', () => {
  const introOverlay = document.getElementById('intro-overlay');
  setTimeout(() => {
    introOverlay.classList.add('hidden');
  }, 1500);
});

// --- Theme Toggle ---
const themeToggle = document.getElementById('theme-toggle');
const moonIcon = document.getElementById('moon-icon');
const sunIcon = document.getElementById('sun-icon');
const htmlEl = document.documentElement;

// Check Local Storage or System Preference
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
  htmlEl.setAttribute('data-theme', 'dark');
  moonIcon.style.display = 'none';
  sunIcon.style.display = 'block';
}

themeToggle.addEventListener('click', () => {
  const currentTheme = htmlEl.getAttribute('data-theme');
  if (currentTheme === 'dark') {
    htmlEl.removeAttribute('data-theme');
    localStorage.setItem('theme', 'light');
    moonIcon.style.display = 'block';
    sunIcon.style.display = 'none';
  } else {
    htmlEl.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    moonIcon.style.display = 'none';
    sunIcon.style.display = 'block';
  }
});

// --- Mobile Menu Toggle ---
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const navLinksContainer = document.querySelector('.nav-links');
const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');

const toggleMenu = () => {
  mobileMenuToggle.classList.toggle('active');
  navLinksContainer.classList.toggle('active');
  mobileMenuOverlay.classList.toggle('active');
  document.body.style.overflow = navLinksContainer.classList.contains('active') ? 'hidden' : 'auto';
};

if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener('click', toggleMenu);
  mobileMenuOverlay.addEventListener('click', toggleMenu);

  // Close menu when a link is clicked
  const mobileNavLinks = document.querySelectorAll('.nav-links a');
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navLinksContainer.classList.contains('active')) {
        toggleMenu();
      }
    });
  });
}

// --- Scroll Progress Bar ---
const scrollProgress = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  scrollProgress.style.width = scrollPercent + '%';
});

// --- Cursor Glow Effect ---
const cursorGlow = document.getElementById('cursor-glow');
if (window.matchMedia("(min-width: 768px)").matches) {
  document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
  });
}

// --- Intersection Observer for Scroll Reveal ---
const revealElements = document.querySelectorAll('.reveal');

const revealOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      
      // Staggered reveal for children
      const children = entry.target.querySelectorAll('.reveal-child');
      children.forEach((child, index) => {
        child.style.transitionDelay = `${(index + 1) * 0.15}s`;
      });
    }
  });
}, revealOptions);

revealElements.forEach(el => revealObserver.observe(el));

// --- Active Nav Indicator ---
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.pageYOffset >= (sectionTop - sectionHeight / 3)) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').includes(current)) {
      link.classList.add('active');
    }
  });
});

// --- Parallax Particles Background ---
const particlesContainer = document.getElementById('particles-bg');
// Generate particles
for (let i = 0; i < 20; i++) {
  const particle = document.createElement('div');
  particle.classList.add('particle');
  
  // Random size between 50px and 200px
  const size = Math.random() * 150 + 50;
  particle.style.width = size + 'px';
  particle.style.height = size + 'px';
  
  // Random position
  particle.style.left = Math.random() * 100 + 'vw';
  particle.style.top = Math.random() * 100 + 'vh';
  
  // Random float animation properties
  particle.style.setProperty('--float-x', `${(Math.random() - 0.5) * 100}px`);
  particle.style.setProperty('--float-y', `${(Math.random() - 0.5) * 100}px`);
  particle.style.setProperty('--float-duration', `${30 + Math.random() * 30}s`);
  particle.style.setProperty('--float-delay', `${-Math.random() * 30}s`);
  
  particlesContainer.appendChild(particle);
}

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  
  // Parallax for hero text
  const parallaxText = document.querySelector('.parallax-text');
  if(parallaxText && window.innerWidth > 768) {
    parallaxText.style.transform = `translateY(${scrolled * 0.3}px)`;
  } else if (parallaxText) {
    parallaxText.style.transform = 'none';
  }
});

// --- 3D Hover Tilt Effect for Project Cards ---
const tiltCards = document.querySelectorAll('.tilt-card');
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

if (!isTouchDevice) {
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
      card.style.transition = 'transform 0.5s ease, border-color 0.3s';
    });
    
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'none';
    });
  });
}

// --- Lightbox Functionality ---
const lightboxTriggers = document.querySelectorAll('.lightbox-trigger');
const lightbox = document.getElementById('lightbox');
const lightboxContent = lightbox.querySelector('.lightbox-content');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxIframe = document.getElementById('lightbox-iframe');
const lightboxGallery = document.getElementById('lightbox-gallery');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxDesc = document.getElementById('lightbox-desc');
const closeLightbox = document.querySelector('.close-lightbox');

lightboxTriggers.forEach(trigger => {
  trigger.addEventListener('click', (e) => {
    e.preventDefault();
    const source = trigger.src || trigger.href || '';
    const title = trigger.dataset.title || '';
    const desc = trigger.dataset.desc || '';
    const images = trigger.dataset.images ? JSON.parse(trigger.dataset.images) : [];
    
    // Reset display
    lightboxImg.style.display = 'none';
    lightboxIframe.style.display = 'none';
    lightboxGallery.innerHTML = '';
    lightboxTitle.innerText = title;
    lightboxDesc.innerText = desc;
    lightboxContent.classList.remove('active');

    if (images.length > 0) {
      // If there's a gallery, show the first image primarily
      lightboxImg.src = images[0];
      lightboxImg.style.display = 'block';
      
      // Only show thumbnails if there's more than one image
      if (images.length > 1) {
        images.forEach(imgSrc => {
          const thumb = document.createElement('img');
          thumb.src = imgSrc;
          thumb.loading = 'lazy';
          thumb.classList.add('gallery-item');
          thumb.addEventListener('click', () => {
            lightboxImg.src = imgSrc;
          });
          lightboxGallery.appendChild(thumb);
        });
      }
    } else if (source.endsWith('.pdf')) {
      lightboxIframe.src = source;
      lightboxIframe.style.display = 'block';
    } else if (source) {
      lightboxImg.src = source;
      lightboxImg.style.display = 'block';
    }
    
    lightbox.classList.remove('hidden');
    setTimeout(() => lightboxContent.classList.add('active'), 10);
    document.body.style.overflow = 'hidden';
  });
});

const closeLB = () => {
  lightboxContent.classList.remove('active');
  setTimeout(() => {
    lightbox.classList.add('hidden');
    lightboxIframe.src = ''; // stop PDF loading
    document.body.style.overflow = 'auto';
  }, 300);
};

closeLightbox.addEventListener('click', closeLB);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLB();
});

// --- Cyber Data Particles ---
const cyberContainer = document.getElementById('cyber-particles');
const binaryChars = ['0', '1', '{ }', '[ ]', '(? )', 'x86', '64', 'root', 'exec'];

function createDataParticle() {
  const p = document.createElement('div');
  p.classList.add('data-particle');
  p.innerText = binaryChars[Math.floor(Math.random() * binaryChars.length)];
  
  const startX = Math.random() * 100;
  const startY = Math.random() * 100;
  
  p.style.left = startX + '%';
  p.style.top = startY + '%';
  
  cyberContainer.appendChild(p);
  
  const duration = 2000 + Math.random() * 3000;
  
  p.animate([
    { opacity: 0, transform: 'translateY(0)' },
    { opacity: 0.4, offset: 0.5 },
    { opacity: 0, transform: `translateY(-${Math.random() * 100}px)` }
  ], {
    duration: duration,
    easing: 'linear'
  }).onfinish = () => {
    p.remove();
    createDataParticle();
  };
}

if (cyberContainer) {
  for (let i = 0; i < 15; i++) {
    setTimeout(createDataParticle, Math.random() * 5000);
  }
}

// --- Project Details Toggle ---
const detailsToggles = document.querySelectorAll('.details-toggle');
detailsToggles.forEach(toggle => {
  toggle.addEventListener('click', () => {
    const content = toggle.nextElementSibling;
    const isActive = toggle.classList.toggle('active');
    content.classList.toggle('active');
    
    // Smooth scroll into view if expanding
    if (isActive) {
      setTimeout(() => {
        content.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 300);
    }
  });
});
