/* ==========================================================================
   MOHAMMED AASIM - PORTFOLIO INTERACTIVE SCRIPT (2026 EDITION)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    /* --------------------------------------------------------------------------
       1. PRELOADER SIMULATION
       -------------------------------------------------------------------------- */
    const preloader = document.getElementById('preloader');
    const percentEl = document.querySelector('.loader-percentage');
    const progressBar = document.querySelector('.loader-progress');
    
    let count = 0;
    const duration = 2000; // 2 seconds preloader simulation
    const intervalTime = 20;
    const step = 100 / (duration / intervalTime);
    
    const loadingTimer = setInterval(() => {
        count += step;
        if (count >= 100) {
            count = 100;
            clearInterval(loadingTimer);
            
            // Hide preloader with smooth transition
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            
            // Trigger initial scroll reveals once preloader is gone
            setTimeout(() => {
                revealElements();
            }, 300);
        }
        percentEl.textContent = `${Math.floor(count)}%`;
        progressBar.style.width = `${count}%`;
    }, intervalTime);


    /* --------------------------------------------------------------------------
       2. PARTICLE BACKGROUND SYSTEM
       -------------------------------------------------------------------------- */
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');

    let particles = [];
    const particleCount = window.innerWidth < 768 ? 40 : 80;
    const connectionDistance = 120;
    let mouse = { x: null, y: null, radius: 150 };

    // Resize canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Track mouse coordinates
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    // Particle Class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 0.6 - 0.3;
            this.speedY = Math.random() * 0.6 - 0.3;
            this.baseAlpha = Math.random() * 0.3 + 0.15;
            this.alpha = this.baseAlpha;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Bounce on boundaries
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

            // Mouse repulsion effect
            if (mouse.x !== null && mouse.y !== null) {
                let dx = this.x - mouse.x;
                let dy = this.y - mouse.y;
                let dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < mouse.radius) {
                    let force = (mouse.radius - dist) / mouse.radius;
                    let angle = Math.atan2(dy, dx);
                    this.x += Math.cos(angle) * force * 1.5;
                    this.y += Math.sin(angle) * force * 1.5;
                    this.alpha = Math.min(0.8, this.baseAlpha + force * 0.4);
                } else {
                    if (this.alpha > this.baseAlpha) {
                        this.alpha -= 0.01;
                    }
                }
            }
        }

        draw() {
            ctx.fillStyle = `rgba(6, 182, 212, ${this.alpha})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Initialize particles array
    function initParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    initParticles();

    // Draw connecting lines between close particles
    function connectParticles() {
        for (let a = 0; a < particles.length; a++) {
            for (let b = a + 1; b < particles.length; b++) {
                let dx = particles[a].x - particles[b].x;
                let dy = particles[a].y - particles[b].y;
                let dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < connectionDistance) {
                    let alpha = (1 - dist / connectionDistance) * 0.12;
                    ctx.strokeStyle = `rgba(37, 99, 235, ${alpha})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    // Animation Loop
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        
        connectParticles();
        requestAnimationFrame(animateParticles);
    }
    animateParticles();


    /* --------------------------------------------------------------------------
       3. CUSTOM TYPING ANIMATION
       -------------------------------------------------------------------------- */
    const strings = [
        "AI Frontend Developer",
        "AI JavaScript Developer",
        "AI & Data Science Student",
        "AI Web Developer",
        "Aspiring Full Stack Developer"
    ];
    
    const typingSpan = document.querySelector('.typing-element');
    let stringIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentString = strings[stringIndex];
        
        if (isDeleting) {
            typingSpan.textContent = currentString.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Deleting is faster
        } else {
            typingSpan.textContent = currentString.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 120; // Normal typing speed
        }

        // Handle string completion and deletion cycles
        if (!isDeleting && charIndex === currentString.length) {
            typingSpeed = 1800; // Keep text displayed for a while
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            stringIndex = (stringIndex + 1) % strings.length;
            typingSpeed = 500; // Short pause before typing next word
        }

        setTimeout(type, typingSpeed);
    }
    
    if (typingSpan) {
        setTimeout(type, 1000);
    }


    /* --------------------------------------------------------------------------
       4. MOBILE NAVIGATION OVERLAY
       -------------------------------------------------------------------------- */
    const mobileNav = document.getElementById('mobile-nav');
    const hamburgerToggle = document.getElementById('hamburger-toggle');
    const mobileClose = document.getElementById('mobile-close');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    function openMobileMenu() {
        mobileNav.classList.add('open');
        document.body.style.overflow = 'hidden'; // Stop page scrolling
    }

    function closeMobileMenu() {
        mobileNav.classList.remove('open');
        document.body.style.overflow = 'auto'; // Re-enable page scrolling
    }

    hamburgerToggle.addEventListener('click', openMobileMenu);
    mobileClose.addEventListener('click', closeMobileMenu);
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });


    /* --------------------------------------------------------------------------
       5. ACTIVE NAV LINK HIGHLIGHT & SCROLL EFFECTS
       -------------------------------------------------------------------------- */
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const headerElement = document.querySelector('.navbar-header');
    const backToTopBtn = document.getElementById('back-to-top-btn');

    // Sticky Navbar & Back to Top behavior on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            headerElement.classList.add('scrolled');
        } else {
            headerElement.classList.remove('scrolled');
        }

        if (window.scrollY > 500) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    // Scroll to Top action
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // IntersectionObserver for active section link highlighting
    const navObserverOptions = {
        root: null,
        rootMargin: '-30% 0px -40% 0px', // Target middle region of viewport
        threshold: 0
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeId = entry.target.getAttribute('id');
                
                // Highlight corresponding desktop links
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${activeId}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });

                // Highlight corresponding mobile links
                mobileLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${activeId}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, navObserverOptions);

    sections.forEach(section => {
        navObserver.observe(section);
    });


    /* --------------------------------------------------------------------------
       6. INTERACTION EFFECTS (3D TILT & MOVING GLOW)
       -------------------------------------------------------------------------- */
    const cards = document.querySelectorAll('.glass-card');

    cards.forEach(card => {
        // Create glowing element if not already inside card
        let glow = card.querySelector('.card-glow');
        if (!glow) {
            glow = document.createElement('div');
            glow.className = 'card-glow';
            card.appendChild(glow);
        }

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Move glow element relative to mouse coordinates
            glow.style.left = `${x}px`;
            glow.style.top = `${y}px`;

            // Apply 3D tilt effect on hover if card has data-tilt or is a project card
            if (card.hasAttribute('data-tilt') || card.classList.contains('project-card')) {
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                // Max rotation angles (degrees)
                const maxRotationX = 8;
                const maxRotationY = 8;
                
                const rotateX = ((centerY - y) / centerY) * maxRotationX;
                const rotateY = ((x - centerX) / centerX) * maxRotationY;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
            }
        });

        card.addEventListener('mouseleave', () => {
            if (card.hasAttribute('data-tilt') || card.classList.contains('project-card')) {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
            }
        });
    });


    /* --------------------------------------------------------------------------
       7. PERFORMANCE SCROLL REVEALS & ANIMS
       -------------------------------------------------------------------------- */
    const revealElementsList = document.querySelectorAll('.scroll-reveal');

    function revealElements() {
        const triggerBottom = window.innerHeight * 0.85;
        
        revealElementsList.forEach(el => {
            const boxTop = el.getBoundingClientRect().top;
            if (boxTop < triggerBottom) {
                el.classList.add('revealed');
                
                // If it is a skills element, trigger bar width loading
                if (el.classList.contains('skills-section') || el.querySelector('.skill-bar')) {
                    animateSkillBars(el);
                }
                
                // If it contains stats, trigger count-up counters
                const stats = el.querySelectorAll('.stat-numberCounter');
                if (stats.length > 0) {
                    stats.forEach(stat => {
                        if (!stat.classList.contains('counted')) {
                            countUp(stat);
                        }
                    });
                }
            }
        });
    }

    // Scroll reveal observer
    const revealObserverOptions = {
        root: null,
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                // Trigger internal component animations
                const bars = entry.target.querySelectorAll('.skill-bar');
                if (bars.length > 0) {
                    bars.forEach(bar => {
                        const targetWidth = bar.getAttribute('data-width');
                        bar.style.width = targetWidth;
                    });
                }

                const counters = entry.target.querySelectorAll('.stat-numberCounter');
                if (counters.length > 0) {
                    counters.forEach(counter => {
                        if (!counter.classList.contains('counted')) {
                            countUp(counter);
                        }
                    });
                }
                
                // Stop observing once animated
                revealObserver.unobserve(entry.target);
            }
        });
    }, revealObserverOptions);

    revealElementsList.forEach(el => {
        revealObserver.observe(el);
    });

    // Animate skill progress bars manually (fallback check)
    function animateSkillBars(parent) {
        const bars = parent.querySelectorAll('.skill-bar');
        bars.forEach(bar => {
            const targetWidth = bar.getAttribute('data-width');
            bar.style.width = targetWidth;
        });
    }

    // Animated Count-Up Counters
    function countUp(element) {
        element.classList.add('counted');
        const target = +element.getAttribute('data-target');
        let current = 0;
        const speed = target > 50 ? 2 : 1; // Speed factor
        const stepTime = target > 50 ? 20 : 150; // Intervals

        const timer = setInterval(() => {
            current += speed;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = current;
            }
        }, stepTime);
    }

});
