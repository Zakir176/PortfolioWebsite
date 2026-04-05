// Improved cursor functionality with better performance
        const cursor = document.querySelector('.cursor');
        const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-item, .contact-method');
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;

        // Show cursor only on non-touch devices
        if (!('ontouchstart' in window)) {
            cursor.classList.add('visible');
            
            document.addEventListener('mousemove', (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;
            });

            // Smooth cursor animation
            function animateCursor() {
                cursorX += (mouseX - cursorX) * 0.15;
                cursorY += (mouseY - cursorY) * 0.15;
                cursor.style.left = cursorX + 'px';
                cursor.style.top = cursorY + 'px';
                requestAnimationFrame(animateCursor);
            }
            animateCursor();

            interactiveElements.forEach(element => {
                element.addEventListener('mouseenter', () => cursor.classList.add('hover'));
                element.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
            });
        }

        // Enhanced navigation with scroll detection
        const navbar = document.getElementById('navbar');
        const navLinks = document.querySelectorAll('.nav-link');
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const navLinksContainer = document.querySelector('.nav-links');

        // Mobile menu toggle
        mobileToggle.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
        });

        // Close mobile menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navLinksContainer.classList.remove('active');
            });
        });

        // Scroll-based navbar styling
        let lastScrollY = window.scrollY;
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            lastScrollY = window.scrollY;
        });

        // Enhanced smooth scrolling with offset for fixed navbar
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Enhanced intersection observer for animations and active nav links
        const observerOptions = {
            threshold: 0.3,
            rootMargin: '-80px 0px -50% 0px'
        };

        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Update active nav link
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, observerOptions);

        // Observe all sections
        document.querySelectorAll('section').forEach(section => {
            sectionObserver.observe(section);
        });

        // Animation observer for elements
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });

        // Animate elements on scroll with staggered delays
        const animatedElements = document.querySelectorAll('.skill-item, .project-card, .section-title, .about-text, .about-visual, .contact-content');
        animatedElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = `opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s, transform 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
            animationObserver.observe(element);
        });

        // Enhanced hero animations with staggered timing
        function initHeroAnimations() {
            const heroTitle = document.querySelector('.hero-title');
            const heroSubtitle = document.querySelector('.hero-subtitle');
            const heroDescription = document.querySelector('.hero-description');
            const heroCtas = document.querySelectorAll('.hero-cta');

            setTimeout(() => {
                if (heroTitle) heroTitle.style.animation = 'gradientFlow 4s ease-in-out infinite, fadeInUp 1s ease-out forwards';
            }, 300);

            setTimeout(() => {
                if (heroSubtitle) heroSubtitle.style.animation = 'fadeInUp 1s ease-out forwards';
            }, 600);

            setTimeout(() => {
                if (heroDescription) heroDescription.style.animation = 'fadeInUp 1s ease-out forwards';
            }, 900);

            setTimeout(() => {
                heroCtas.forEach((cta, index) => {
                    setTimeout(() => {
                        cta.style.animation = 'fadeInUp 1s ease-out forwards';
                    }, index * 200);
                });
            }, 1200);
        }

        // Enhanced parallax effect with performance optimization
        let ticking = false;
        function updateParallax() {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.holo-orb');
            
            parallaxElements.forEach((orb, index) => {
                const speed = (index + 1) * 0.5;
                const yPos = -(scrolled * speed);
                orb.style.transform = `translate3d(0, ${yPos}px, 0)`;
            });
            
            ticking = false;
        }

        function requestParallaxUpdate() {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }

        // Mouse move parallax for orbs
        document.addEventListener('mousemove', (e) => {
            if (window.innerWidth > 768) { // Only on desktop
                const mouseX = (e.clientX / window.innerWidth) - 0.5;
                const mouseY = (e.clientY / window.innerHeight) - 0.5;
                
                document.querySelectorAll('.holo-orb').forEach((orb, index) => {
                    const speed = (index + 1) * 10;
                    const x = mouseX * speed;
                    const y = mouseY * speed;
                    orb.style.transform = `translate(${x}px, ${y}px)`;
                });
            }
        });

        // Scroll parallax
        window.addEventListener('scroll', requestParallaxUpdate);

        // Enhanced skill item interactions
        document.querySelectorAll('.skill-item').forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-12px) rotateX(5deg)';
                this.classList.add('will-change');
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) rotateX(0deg)';
                this.classList.remove('will-change');
            });
        });

        // Project card 3D hover effect
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            });
        });

        // Dynamic gradient color cycling
        let colorShift = 0;
        function updateGradientColors() {
            colorShift += 0.3;
            const hue1 = (270 + colorShift) % 360;
            const hue2 = (195 + colorShift) % 360;
            const hue3 = (330 + colorShift) % 360;
            
            document.documentElement.style.setProperty('--primary-color', `hsl(${hue1}, 75%, 60%)`);
            document.documentElement.style.setProperty('--secondary-color', `hsl(${hue2}, 100%, 55%)`);
            document.documentElement.style.setProperty('--accent-color', `hsl(${hue3}, 100%, 65%)`);
        }
        
        // Only run color cycling if user hasn't set reduced motion preference
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setInterval(updateGradientColors, 150);
        }

        // Form validation and enhancement (if contact form is added later)
        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }

        // Initialize everything when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            initHeroAnimations();
            
            // Add loading animation completion
            document.body.classList.add('loaded');
        });

        // Performance monitoring
        if ('performance' in window) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    console.log(`Page loaded in ${perfData.loadEventEnd - perfData.loadEventStart}ms`);
                }, 0);
            });
        }

        // Error handling for missing images
        document.querySelectorAll('img').forEach(img => {
            img.addEventListener('error', function() {
                this.style.display = 'none';
                console.warn('Image failed to load:', this.src);
            });
        });

        // Keyboard navigation improvements
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                navLinksContainer.classList.remove('active');
            }
        });

        // Touch device optimizations
        if ('ontouchstart' in window) {
            document.body.classList.add('touch-device');
            // Disable hover effects on touch devices
            const style = document.createElement('style');
            style.textContent = `
                .touch-device .skill-item:hover,
                .touch-device .project-card:hover,
                .touch-device .contact-method:hover {
                    transform: none;
                }
            `;
            document.head.appendChild(style);
        }