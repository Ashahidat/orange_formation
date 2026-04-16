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

// ==========================================
// RÉCUPÉRATION ET POPUP DU FORMULAIRE DEVIS
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    // On cible le formulaire
    const quoteForm = document.querySelector(".quote-form");
    
    if (quoteForm) {
        quoteForm.addEventListener("submit", function(e) {
            // Empêche le rechargement classique de la page au clic sur "Envoyer"
            e.preventDefault(); 

            // Récupération des champs texte via leurs "placeholders" et "classes"
            const nom = document.querySelector('input[placeholder="Nom"]').value || "Non renseigné";
            const email = document.querySelector('input[placeholder="Email"]').value || "Non renseigné";
            const contact = document.querySelector('input[placeholder="Numéro de Contact"]').value || "Non renseigné";
            const pays = document.querySelector('input[placeholder="Nom du Pays"]').value || "Non renseigné";
            const whatsapp = document.querySelector('input[placeholder="Numéro Whatsapp / Identifiant Skype"]').value || "Non renseigné";
            const description = document.querySelector('.form-textarea').value || "Aucune description";

            // Récupération de la liste déroulante (Budget)
            const selectBudget = document.querySelector('.form-grid-2 select');
            let budget = "Non précisé";
            if (selectBudget.selectedIndex > 0) {
                budget = selectBudget.options[selectBudget.selectedIndex].text;
            }

            // Récupération des services cochés (Checkboxes)
            const checkedServices = document.querySelectorAll('.checkbox-grid-4 input[type="checkbox"]:checked');
            const servicesArray = Array.from(checkedServices).map(checkbox => {
                // On récupère le texte situé à côté de la case à cocher
                return checkbox.parentElement.textContent.trim();
            });
            const services = servicesArray.length > 0 ? servicesArray.join(", ") : "Aucun service sélectionné";

            // Affichage avec la belle popup SweetAlert2
            Swal.fire({
                title: 'Demande interceptée !',
                html: `
                    <div style="text-align: left; font-size: 14px;">
                        <b>Nom :</b> ${nom}<br>
                        <b>Email :</b> ${email}<br>
                        <b>Contact :</b> ${contact}<br>
                        <b>Pays :</b> ${pays}<br>
                        <b>Budget :</b> ${budget}<br>
                        <b>WhatsApp :</b> ${whatsapp}<br><br>
                        <b>Services :</b> ${services}<br><br>
                        <b>Description :</b> ${description}
                    </div>
                `,
                icon: 'success',
                confirmButtonText: 'Fermer',
                confirmButtonColor: '#fbb034' // La couleur jaune de ton thème
            });
            
            // (Optionnel) Vider le formulaire après affichage
            quoteForm.reset();
        });
    }
});