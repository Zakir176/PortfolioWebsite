/**
 * Interaction Engine for Vibrant Noir
 * Merging premium features from Version 1 into the new design.
 */

class NoirEngine {
    constructor() {
        this.initCursor();
        this.initTextScramble();
        this.initScrollReveal();
        this.initMagneticElements();
        this.initParallax();
    }

    // 1. Premium Cursor
    initCursor() {
        const cursor = document.createElement('div');
        cursor.className = 'cursor';
        document.body.appendChild(cursor);

        const interactiveElements = document.querySelectorAll('a, button, .service-card, .noir-project-card');
        
        if (window.matchMedia('(pointer: fine)').matches) {
            document.addEventListener('mousemove', (e) => {
                requestAnimationFrame(() => {
                    cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
                });
                cursor.classList.add('visible');
            });

            interactiveElements.forEach(el => {
                el.addEventListener('mouseenter', () => cursor.classList.add('active'));
                el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
            });
        }
    }

    // 2. Text Scramble Logic
    initTextScramble() {
        const scrambleElements = document.querySelectorAll('.text-gradient, .hero-title, .section-heading');
        const chars = '!<>-_\\/[]{}—=+*^?#________';

        class Scrambler {
            constructor(el) {
                this.el = el;
                this.originalText = el.innerText;
                this.update = this.update.bind(this);
            }

            scramble() {
                let iteration = 0;
                clearInterval(this.interval);
                
                this.interval = setInterval(() => {
                    this.el.innerText = this.originalText
                        .split('')
                        .map((char, index) => {
                            if (index < iteration) return this.originalText[index];
                            return chars[Math.floor(Math.random() * chars.length)];
                        })
                        .join('');
                    
                    if (iteration >= this.originalText.length) {
                        clearInterval(this.interval);
                        this.el.innerText = this.originalText; // Ensure it ends exactly
                    }
                    iteration += 1 / 3;
                }, 30);
            }
        }

        scrambleElements.forEach(el => {
            const fx = new Scrambler(el);
            el.addEventListener('mouseenter', () => fx.scramble());
            // Trigger once on load
            setTimeout(() => fx.scramble(), 1000);
        });
    }

    // 3. Scroll Reveal with IntersectionObserver
    initScrollReveal() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, observerOptions);

        const revealElements = document.querySelectorAll(
            '.service-card, .noir-project-card, .noir-exp-item, .noir-community-card, .hero-content, .hero-image, .section-heading, .services-grid, .noir-projects-grid'
        );

        revealElements.forEach(el => {
            el.classList.add('reveal');
            if (el.classList.contains('services-grid') || el.classList.contains('noir-projects-grid')) {
                el.classList.add('stagger-reveal');
            }
            observer.observe(el);
        });
    }

    // 4. Magnetic Momentum for Buttons
    initMagneticElements() {
        const magnets = document.querySelectorAll('.btn-grad, .btn-outline, .nav-link, .noir-contact-card');
        
        magnets.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                el.style.transform = `translate3d(${x * 0.2}px, ${y * 0.2}px, 0)`;
            });
            
            el.addEventListener('mouseleave', () => {
                el.style.transform = `translate3d(0, 0, 0)`;
            });
        });
    }

    // 5. Parallax for Atmosphere
    initParallax() {
        window.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;
            
            const auras = document.querySelectorAll('.aura-blob');
            auras.forEach((aura, index) => {
                const depth = (index + 1) * 0.3;
                aura.style.transform = `translate3d(${x * depth}px, ${y * depth}px, 0)`;
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new NoirEngine();
});
