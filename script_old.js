/**
 * Portfolio Interaction Engine: Atmospheric Edition
 * Focused on smoothness, subtle depth, and premium transitions.
 */

class InteractivePortfolio {
    constructor() {
        this.initCursor();
        this.initTextScramble();
        this.initBackgroundPhysics();
        this.initScrollAnimations();
        this.initNavigation();
        this.initMobileMenu();
        this.initMagneticElements();
    }

    // 1. Premium Minimalist Cursor
    initCursor() {
        const cursor = document.querySelector('.cursor');
        const interactiveElements = document.querySelectorAll('a, button, .project-card, .bento-item');
        
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

    // 2. Subtle Magnetic Momentum
    initMagneticElements() {
        const magnets = document.querySelectorAll('.hero-cta, .nav-link, .social-icon');
        
        magnets.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                // Very subtle attraction
                el.style.transform = `translate3d(${x * 0.15}px, ${y * 0.15}px, 0)`;
            });
            
            el.addEventListener('mouseleave', () => {
                el.style.transform = `translate3d(0, 0, 0)`;
            });
        });
    }

    // 3. Text Scramble Logic
    initTextScramble() {
        const scrambleElements = document.querySelectorAll('[data-scramble="true"]');
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
                    }
                    iteration += 1 / 3;
                }, 30);
            }
        }

        scrambleElements.forEach(el => {
            const fx = new Scrambler(el);
            el.addEventListener('mouseenter', () => fx.scramble());
            setTimeout(() => fx.scramble(), 1000);
        });
    }

    // 4. Atmospheric Parallax (Orbs)
    initBackgroundPhysics() {
        const orbs = document.querySelectorAll('.holo-orb');
        
        window.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 30;
            const y = (e.clientY / window.innerHeight - 0.5) * 30;

            orbs.forEach((orb, index) => {
                const depth = (index + 1) * 0.4;
                orb.style.transform = `translate3d(${x * depth}px, ${y * depth}px, 0)`;
            });
        });
    }

    // 5. Section Entry Reveals
    initScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                    observer.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });

        const animatedElements = document.querySelectorAll(
            '.section-title, .bento-item, .project-card, .experience-card, .about-content'
        );

        animatedElements.forEach(el => {
            el.style.opacity = '0';
            observer.observe(el);
        });
    }

    // 6. Basic Navigation & Mobile Menu
    initNavigation() {
        const navbar = document.querySelector('nav');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) navbar.classList.add('scrolled');
            else navbar.classList.remove('scrolled');
        });
    }

    initMobileMenu() {
        const toggle = document.querySelector('.mobile-menu-toggle');
        const navLinks = document.querySelector('.nav-links');
        if (toggle) {
            toggle.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                toggle.classList.toggle('open');
            });
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new InteractivePortfolio();
});