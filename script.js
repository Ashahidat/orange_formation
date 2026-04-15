// Configuration des particules
particlesJS("particles-js", {
  "particles": {
    "number": { "value": 90, "density": { "enable": true, "value_area": 800 } },
    "color": { "value": "#ffffff" },
    "opacity": { "value": 0.8 },
    "size": { "value": 3 },
    "line_linked": { "enable": true, "distance": 150, "color": "#ffffff", "opacity": 0.5, "width": 1 },
    "move": { "enable": true, "speed": 1.5 }
  },
  "interactivity": {
    "events": {
      "onhover": { "enable": true, "mode": "grab" },
      "onclick": { "enable": true, "mode": "repulse" }
    },
    "modes": {
      "repulse": { "distance": 200, "duration": 0.4 }
    }
  },
  "retina_detect": true
});

// Effet de répulsion au clic
document.addEventListener('click', (event) => {
  const canvas = document.querySelector('#particles-js canvas');
  if (!canvas) return;

  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  const particles = window.pJSDom[0].pJS.particles.array;
  particles.forEach(particle => {
    const dx = particle.x - mouseX;
    const dy = particle.y - mouseY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 100) {
      particle.x += dx * 2;
      particle.y += dy * 2;
    }
  });
});

// CORRECTION : Sticky header avec seuil à 50px
window.addEventListener("scroll", function() {
    const header = document.querySelector(".header-fixed");
    if (!header) return;
    
    // Si on a scrollé de plus de 50px, on active le mode sticky
    if (window.scrollY > 50) {
        header.classList.add("is-sticky");
    } else {
        header.classList.remove("is-sticky");
    }
});

// Initialisation du Swiper Portfolio avec navigation
const swiper = new Swiper('.portfolio-swiper', {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    // AJOUT DE LA NAVIGATION PAR FLÈCHES
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        // quand la largeur est >= 640px
        640: {
            slidesPerView: 2,
        },
        // quand la largeur est >= 1024px
        1024: {
            slidesPerView: 3,
            centeredSlides: true,
        }
    }
});

// Animation du bouton Back to Top (apparaît au scroll)
window.addEventListener('scroll', function() {
    const backToTop = document.querySelector('.back-to-top');
    if (window.scrollY > 400) {
        backToTop.style.display = "flex";
    } else {
        backToTop.style.display = "none";
    }
});