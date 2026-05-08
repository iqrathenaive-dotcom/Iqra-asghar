/**
 * Iqra Asghar Portfolio Interactive Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Reveal sections on scroll using Intersection Observer
    const sections = document.querySelectorAll('section');
    
    const revealOption = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, revealOption);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // 2. Dynamic Glow Orb movement
    const orb = document.querySelector('.glow-orb');
    let mouseX = 0;
    let mouseY = 0;
    let orbX = 0;
    let orbY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateOrb() {
        // Smooth interpolation
        orbX += (mouseX - orbX - 300) * 0.05;
        orbY += (mouseY - orbY - 300) * 0.05;
        
        if (orb) {
            orb.style.left = `${orbX}px`;
            orb.style.top = `${orbY}px`;
        }
        
        requestAnimationFrame(animateOrb);
    }
    animateOrb();

    // 3. Navbar background change on scroll
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // 4. Stagger animation for pills and cards (when visible)
    const staggerItems = (containerSelector, itemSelector) => {
        const container = document.querySelector(containerSelector);
        if (!container) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const items = container.querySelectorAll(itemSelector);
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
            });
        }, { threshold: 0.1 });

        observer.observe(container);
    };

    // Initialize stagger (will add CSS classes to handle pre-animation state)
    document.querySelectorAll('.skill-pill, .card').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    });

    staggerItems('.skills-container', '.skill-pill');
    staggerItems('.grid', '.card');
});
