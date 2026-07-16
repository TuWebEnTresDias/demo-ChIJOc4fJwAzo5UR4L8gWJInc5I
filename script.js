// mode café de especialidad - Interactive Script

document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.getElementById('header');
    const hero = document.getElementById('hero');
    
    function handleScroll() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    // Mobile navigation
    const hamburger = document.getElementById('hamburger');
    const mainNav = document.getElementById('main-nav');
    let mobileNav = null;
    
    function createMobileNav() {
        mobileNav = document.createElement('nav');
        mobileNav.className = 'mobile-nav';
        mobileNav.innerHTML = `
            <ul class="mobile-nav__menu">
                <li><a href="#diferenciales">Nosotros</a></li>
                <li><a href="#menu">Menú</a></li>
                <li><a href="#galeria">Galería</a></li>
                <li><a href="#momentos">Momentos</a></li>
                <li><a href="#contacto">Contacto</a></li>
            </ul>
        `;
        document.body.appendChild(mobileNav);
        
        // Close mobile nav when clicking a link
        const mobileLinks = mobileNav.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
    
    createMobileNav();
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileNav.classList.toggle('active');
        document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Menu tabs functionality
    const menuTabs = document.querySelectorAll('.menu__tab');
    const menuPanels = document.querySelectorAll('.menu__panel');
    
    menuTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabTarget = tab.getAttribute('data-tab');
            
            // Remove active class from all tabs and panels
            menuTabs.forEach(t => t.classList.remove('active'));
            menuPanels.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding panel
            tab.classList.add('active');
            const targetPanel = document.getElementById(tabTarget);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
    
    // Scroll animations using Intersection Observer
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animateElements.forEach(el => observer.observe(el));
    
    // Contact form submission to WhatsApp
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;
            
            // Create WhatsApp message
            const whatsappMessage = `Hola! Soy ${name}.\n\n${message}\n\nMi WhatsApp: ${phone}`;
            const encodedMessage = encodeURIComponent(whatsappMessage);
            const whatsappUrl = `https://wa.me/5491171550907?text=${encodedMessage}`;
            
            // Open WhatsApp
            window.open(whatsappUrl, '_blank');
            
            // Reset form
            contactForm.reset();
            
            // Show thank you message
            showNotification('¡Gracias! Te redirigimos a WhatsApp.');
        });
    }
    
    // Notification function
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            bottom: 100px;
            right: 24px;
            background-color: #1A1A1A;
            color: #F5F0E8;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            font-family: 'DM Sans', sans-serif;
            font-size: 0.9375rem;
            box-shadow: 0 4px 20px rgba(26, 26, 26, 0.2);
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Add animation keyframes
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideIn 0.3s ease reverse';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
    
    // Add parallax effect to hero on scroll
    const heroImage = document.querySelector('.hero__image');
    
    if (heroImage) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroHeight = hero.offsetHeight;
            
            if (scrolled < heroHeight) {
                const parallax = scrolled * 0.3;
                heroImage.style.transform = `scale(1.05) translateY(${parallax}px)`;
            }
        }, { passive: true });
    }
    
    // Add hover effects for gallery items
    const galleryItems = document.querySelectorAll('.galeria__item');
    
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.zIndex = '10';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.zIndex = '';
        });
    });
    
    // Lazy loading for images (native support with fallback)
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            img.src = img.src; // Trigger load
        });
    } else {
        // Fallback for browsers without native lazy loading
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src;
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '200px 0px'
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    // Smooth reveal for WhatsApp button
    const whatsappFloat = document.querySelector('.whatsapp-float');
    
    if (whatsappFloat) {
        whatsappFloat.style.opacity = '0';
        whatsappFloat.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            whatsappFloat.style.transition = 'all 0.5s ease';
            whatsappFloat.style.opacity = '1';
            whatsappFloat.style.transform = 'scale(1)';
        }, 1500);
    }
    
    // Add active state to navigation links based on scroll position
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveNav() {
        const scrollPos = window.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                // Desktop nav
                const navLinks = document.querySelectorAll('.header__menu a');
                navLinks.forEach(link => {
                    link.style.color = '';
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.style.color = 'var(--color-mustard-dark)';
                    }
                });
                
                // Mobile nav
                if (mobileNav) {
                    const mobileLinks = mobileNav.querySelectorAll('a');
                    mobileLinks.forEach(link => {
                        link.style.color = '';
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.style.color = 'var(--color-mustard-dark)';
                        }
                    });
                }
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav, { passive: true });
    
    // Add animation delay classes to stagger elements
    function addAnimationDelays() {
        const grids = document.querySelectorAll('.diferenciales__grid, .galeria__grid, .testimonios__grid, .momentos__grid');
        
        grids.forEach(grid => {
            const items = grid.querySelectorAll('.animate-on-scroll');
            items.forEach((item, index) => {
                if (!item.classList.contains('delay-1') && 
                    !item.classList.contains('delay-2') && 
                    !item.classList.contains('delay-3') &&
                    !item.classList.contains('delay-4') &&
                    !item.classList.contains('delay-5')) {
                    item.classList.add(`delay-${Math.min(index + 1, 5)}`);
                }
            });
        });
    }
    
    addAnimationDelays();
});