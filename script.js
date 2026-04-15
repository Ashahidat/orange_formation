particlesJS("particles-js", {
  "particles": {
    "number": { "value": 90, "density": { "enable": true, "value_area": 800 } },
    "color": { "value": "#ffffff" }, // Particules plus claires
    "opacity": { "value": 0.8 }, // Augmentation de l'opacité
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

// Ajout d'un écouteur pour détecter les clics partout sur la page
document.addEventListener('click', (event) => {
  const canvas = document.querySelector('#particles-js canvas');
  if (!canvas) return; // Vérifie si le canevas existe

  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  // Déplacer les particules loin de l'endroit cliqué
  const particles = window.pJSDom[0].pJS.particles.array;
  particles.forEach(particle => {
    const dx = particle.x - mouseX;
    const dy = particle.y - mouseY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 100) { // Si la particule est proche du clic
      particle.x += dx * 2; // Déplace la particule plus loin
      particle.y += dy * 2;
    }
  });
});