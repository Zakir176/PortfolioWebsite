/**
 * Interaction Engine for Vibrant Noir
 * Focuses on smooth scroll reveals and basic interactions.
 */

class NoirEngine {
    constructor() {
        this.initScrollReveal();
        this.initParallax();
    }

    // 1. Smooth Fade-in on Scroll
    initScrollReveal() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Add reveal class to cards and sections
        const elements = document.querySelectorAll('.service-card, .hero-content, .hero-image-container');
        elements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
            observer.observe(el);
        });

        // Add a class to trigger the animation
        document.body.addEventListener('reveal-elements', () => {
             elements.forEach(el => {
                 if(el.classList.contains('reveal')) {
                     el.style.opacity = '1';
                     el.style.transform = 'translateY(0)';
                 }
             });
        });

        // Small bridge to CSS
        window.addEventListener('scroll', () => {
            document.body.dispatchEvent(new CustomEvent('reveal-elements'));
        });
        
        // Initial check
        setTimeout(() => {
            document.body.dispatchEvent(new CustomEvent('reveal-elements'));
        }, 100);
    }

    // 2. Subtle Aura Blobs Parallax
    initParallax() {
        window.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 40;
            const y = (e.clientY / window.innerHeight - 0.5) * 40;
            
            const auras = document.querySelectorAll('.aura-blob');
            auras.forEach((aura, index) => {
                const depth = (index + 1) * 0.5;
                aura.style.transform = `translate3d(${x * depth}px, ${y * depth}px, 0)`;
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new NoirEngine();
    console.log('Noir Engine Initialized');
});
