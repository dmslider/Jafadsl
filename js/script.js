const JAFAD = {
    init() {
        this.setupMenuToggle();
        this.setupCarousel();
        this.setupForm();
        this.lazyLoadImages();
    },

    setupMenuToggle() {
        const menuToggle = document.querySelector('.menu-toggle');
        const navLinks = document.querySelector('.nav-links');
        
        if (menuToggle && navLinks) {
            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
                    navLinks.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            });

            // Toggle menu
            menuToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                navLinks.classList.toggle('active');
                const isExpanded = navLinks.classList.contains('active');
                menuToggle.setAttribute('aria-expanded', isExpanded);
            });

            // Close menu when clicking a link
            navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                });
            });
        }
    },

    setupCarousel() {
        const carousel = document.querySelector('.carousel');
        if (!carousel) return;

        const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
        if (!slides.length) return;

        let currentSlide = 0;

        const showSlide = (index) => {
            slides.forEach(slide => {
                slide.classList.remove('active');
                slide.style.opacity = '0';
                slide.style.visibility = 'hidden';
            });

            slides[index].classList.add('active');
            slides[index].style.opacity = '1';
            slides[index].style.visibility = 'visible';
        };

        // Initialize first slide
        showSlide(0);

        // Auto advance slides
        setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }, 5000);
    },

    setupForm() {
        const form = document.querySelector('form');
        const formMessage = document.querySelector('.form-message');
        if (form && formMessage) {
            form.addEventListener('submit', async (event) => {
                event.preventDefault();
                const formData = new FormData(form);
                const data = Object.fromEntries(formData);

                try {
                    // Replace with actual backend or EmailJS integration
                    // await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', data);
                    formMessage.textContent = `Thank you, ${data.name}! Your request for ${data.service} has been submitted.`;
                    form.reset();
                } catch (error) {
                    formMessage.textContent = 'An error occurred. Please try again later.';
                }
            });
        }
    },

    lazyLoadImages() {
        if ('loading' in HTMLImageElement.prototype) {
            // Browser supports native lazy loading
            document.querySelectorAll('img[loading="lazy"]').forEach(img => {
                img.loading = 'lazy';
            });
        } else {
            // Fallback to Intersection Observer
            const images = document.querySelectorAll('img[loading="lazy"]');
            if ('IntersectionObserver' in window) {
                const imageObserver = new IntersectionObserver((entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            img.src = img.dataset.src;
                            img.removeAttribute('loading');
                            observer.unobserve(img);
                        }
                    });
                });
                images.forEach(img => imageObserver.observe(img));
            }
        }
    }
};

document.addEventListener('DOMContentLoaded', () => JAFAD.init());