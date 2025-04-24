// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            window.scrollTo({
                top: targetSection.offsetTop - 70,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            const navLinks = document.querySelector('.nav-links');
            const navToggle = document.querySelector('.nav-toggle');
            if (navLinks.classList.contains('show')) {
                navLinks.classList.remove('show');
                navToggle.classList.remove('active');
            }
        });
    });

    // Select all elements that should animate on scroll
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    function checkScroll() {
        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;

            if (elementPosition < screenPosition) {
                element.classList.add('animate');
            }
        });
    }

    // Initial check in case elements are already in view
    checkScroll();

    // Check again when scrolling
    window.addEventListener('scroll', checkScroll);

    // Add active class to navigation items when scrolling
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav a');

        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = '#' + section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === current) {
                link.classList.add('active');
            }
        });

        // Animate skill bars when in viewport
        const skillSection = document.querySelector('#skills');
        if (skillSection) {
            const sectionPosition = skillSection.getBoundingClientRect();

            if (sectionPosition.top < window.innerHeight && sectionPosition.bottom >= 0) {
                const progressBars = document.querySelectorAll('.progress');
                progressBars.forEach(bar => {
                    const width = bar.getAttribute('data-width') || bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 100);
                });
            }
        }
    });

    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // You would normally send to a server, but for now let's just show a message
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }

    // Mobile navigation toggle
    const navToggle = document.createElement('div');
    navToggle.className = 'nav-toggle';
    navToggle.innerHTML = '<span></span><span></span><span></span>';

    const nav = document.querySelector('nav');
    nav.appendChild(navToggle);

    navToggle.addEventListener('click', function() {
        const navLinks = document.querySelector('.nav-links');
        navLinks.classList.toggle('show');
        this.classList.toggle('active');
    });

    // Add animation to project cards
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        card.style.transitionDelay = `${index * 0.1}s`;

        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 400);
    });

    // Add parallax effect to home section
    const homeSection = document.getElementById('home');

    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        if (homeSection) {
            homeSection.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
        }
    });

    // ENHANCED ANIMATIONS ADDED BELOW

    // 1. Typing effect for the heading
    function typeEffect(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';

        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }

        type();
    }

    const heading = document.querySelector('#home h1');
    if (heading) {
        const originalText = heading.textContent;
        setTimeout(() => {
            typeEffect(heading, originalText, 100);
        }, 500);
    }

    // 2. Create particle background in home section
    function createParticleBackground() {
        const canvas = document.createElement('canvas');
        canvas.id = 'particle-background';
        const homeSection = document.querySelector('#home');
        if (homeSection) {
            homeSection.insertBefore(canvas, homeSection.firstChild);

            const ctx = canvas.getContext('2d');
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            const particles = [];
            const particleCount = 50;

            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 3 + 1,
                    color: 'rgba(74, 107, 223, 0.5)',
                    speedX: Math.random() * 1 - 0.5,
                    speedY: Math.random() * 1 - 0.5
                });
            }

            function animate() {
                requestAnimationFrame(animate);
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                particles.forEach(particle => {
                    ctx.beginPath();
                    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                    ctx.fillStyle = particle.color;
                    ctx.fill();

                    particle.x += particle.speedX;
                    particle.y += particle.speedY;

                    if (particle.x < 0 || particle.x > canvas.width) {
                        particle.speedX = -particle.speedX;
                    }

                    if (particle.y < 0 || particle.y > canvas.height) {
                        particle.speedY = -particle.speedY;
                    }
                });
            }

            animate();

            window.addEventListener('resize', () => {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            });
        }
    }

    createParticleBackground();

    // 3. Create floating animations for qualities
    const qualities = document.querySelectorAll('.quality');
    qualities.forEach((quality, index) => {
        quality.classList.add('animate-on-scroll');
        quality.style.transitionDelay = `${index * 0.2}s`;
    });

    // 4. Add 3D tilt effect to skill-category elements
    const skillCategories = document.querySelectorAll('.skill-category');

    skillCategories.forEach(category => {
        category.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const xPercent = (x / rect.width - 0.5) * 20;
            const yPercent = (y / rect.height - 0.5) * 20;

            this.style.transform = `perspective(1000px) rotateX(${-yPercent}deg) rotateY(${xPercent}deg) translateY(-5px)`;
        });

        category.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(-5px)';
            setTimeout(() => {
                this.style.transform = 'translateY(0)';
            }, 300);
        });
    });

    // 5. Add interactive hover effect to project cards
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('active');
        });

        card.addEventListener('mouseleave', () => {
            card.classList.remove('active');
        });
    });

    // 6. Create a stats section with number counting animation
    const statsSection = document.querySelector('#stats');
    if (statsSection) {
        const counters = document.querySelectorAll('.counter');

        function animateCounters() {
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // ~60fps
                let current = 0;

                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };

                updateCounter();
            });
        }

        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statsObserver.observe(statsSection);
    }

    // 7. Animate experience timeline
   // Animate experience timeline
   const experienceItems = document.querySelectorAll('.experience-item');
   experienceItems.forEach((item, index) => {
       // Make sure items are visible first, then animate
       item.style.opacity = '1';
       item.style.transform = 'translateY(0)';
       setTimeout(() => {
           item.classList.add('animate-on-scroll');
           item.style.transitionDelay = `${index * 0.2}s`;
       }, 100);
   });

    // 8. Create animated background gradient
    const body = document.querySelector('body');
    let hue = 220; // Start with blue hue

    function animateBackground() {
        hue = (hue + 0.1) % 360;
        body.style.backgroundImage = `linear-gradient(135deg,
            hsl(${hue}, 10%, 98%) 0%,
            hsl(${(hue + 15) % 360}, 10%, 95%) 100%)`;
        requestAnimationFrame(animateBackground);
    }

    // Uncomment this if you want a subtle animated background gradient
    // animateBackground();
});