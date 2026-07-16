/**
 * MODE CAFÉ DE ESPECIALIDAD — Landing Page Script
 * Interactive Features & Animations
 */

document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // HEADER SCROLL EFFECT
    // ==========================================
    const header = document.getElementById('header');
    let lastScrollY = 0;
    
    const handleHeaderScroll = () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollY = currentScrollY;
    };
    
    window.addEventListener('scroll', handleHeaderScroll, { passive: true });
    handleHeaderScroll();
    
    // ==========================================
    // MOBILE MENU
    // ==========================================
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    let menuOpen = false;
    
    const toggleMenu = () => {
        menuOpen = !menuOpen;
        mobileMenu.classList.toggle('active', menuOpen);
        hamburger.classList.toggle('active', menuOpen);
        document.body.style.overflow = menuOpen ? 'hidden' : '';
        
        // Animate hamburger lines
        const lines = hamburger.querySelectorAll('.header__hamburger-line');
        if (menuOpen) {
            lines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            lines[1].style.opacity = '0';
            lines[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            lines[0].style.transform = 'none';
            lines[1].style.opacity = '1';
            lines[2].style.transform = 'none';
        }
    };
    
    hamburger.addEventListener('click', toggleMenu);
    
    // Close menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (menuOpen) {
                toggleMenu();
            }
        });
    });
    
    // ==========================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ==========================================
    // MENU TABS
    // ==========================================
    const menuTabs = document.querySelectorAll('.menu__tab');
    const menuCategories = document.querySelectorAll('.menu__category');
    
    menuTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetCategory = tab.getAttribute('data-tab');
            
            // Update active tab
            menuTabs.forEach(t => t.classList.remove('menu__tab--active'));
            tab.classList.add('menu__tab--active');
            
            // Show target category
            menuCategories.forEach(cat => {
                cat.classList.remove('menu__category--active');
                if (cat.getAttribute('data-category') === targetCategory) {
                    cat.classList.add('menu__category--active');
                }
            });
            
            // Scroll to menu section if needed
            const menuSection = document.getElementById('menu');
            if (menuSection) {
                const rect = menuSection.getBoundingClientRect();
                if (rect.top < 0 || rect.top > window.innerHeight / 2) {
                    menuSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
    
    // ==========================================
    // SCROLL ANIMATIONS (Intersection Observer)
    // ==========================================
    const animateElements = document.querySelectorAll('[data-animate]');
    
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger animation for siblings
                const siblings = entry.target.parentElement.querySelectorAll('[data-animate]');
                let delay = 0;
                siblings.forEach((sibling, i) => {
                    if (sibling === entry.target) {
                        delay = i * 100;
                    }
                });
                
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, delay);
                
                animateOnScroll.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animateElements.forEach(el => animateOnScroll.observe(el));
    
    // ==========================================
    // HERO PARALLAX EFFECT
    // ==========================================
    const heroImage = document.querySelector('.hero__image');
    
    if (heroImage) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            if (scrolled < window.innerHeight) {
                heroImage.style.transform = `scale(1.05) translateY(${scrolled * 0.3}px)`;
            }
        }, { passive: true });
    }
    
    // ==========================================
    // HERO TEXT ANIMATION ON LOAD
    // ==========================================
    const heroContent = document.querySelector('.hero__text');
    
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);
    }
    
    // ==========================================
    // FORM TO WHATSAPP
    // ==========================================
    const reservationForm = document.getElementById('reservationForm');
    
    if (reservationForm) {
        reservationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;
            const people = document.getElementById('people').value;
            const message = document.getElementById('message').value;
            
            // Format date nicely
            let formattedDate = date;
            if (date) {
                const dateObj = new Date(date + 'T12:00:00');
                formattedDate = dateObj.toLocaleDateString('es-AR', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
            }
            
            // Build WhatsApp message
            let whatsappMessage = `Hola Mode Café 👋\n\n`;
            whatsappMessage += `Quisiera reservar una mesa:\n`;
            whatsappMessage += `📍 *Nombre:* ${name}\n`;
            whatsappMessage += `📱 *Teléfono:* ${phone}\n`;
            whatsappMessage += `📅 *Fecha:* ${formattedDate}\n`;
            whatsappMessage += `🕐 *Horario:* ${time}\n`;
            whatsappMessage += `👥 *Personas:* ${people}\n`;
            
            if (message) {
                whatsappMessage += `\n💬 *Mensaje:* ${message}\n`;
            }
            
            whatsappMessage += `\n¡Gracias! 🙏`;
            
            // Encode message for WhatsApp URL
            const encodedMessage = encodeURIComponent(whatsappMessage);
            const whatsappUrl = `http://wa.me/5491171550907?text=${encodedMessage}`;
            
            // Open WhatsApp
            window.open(whatsappUrl, '_blank');
            
            // Show success feedback
            const submitBtn = reservationForm.querySelector('.form__submit');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                ¡Mensaje enviado!
            `;
            submitBtn.style.backgroundColor = '#25D366';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.backgroundColor = '';
                reservationForm.reset();
            }, 3000);
        });
    }
    
    // ==========================================
    // WHATSAPP FLOAT BUTTON ANIMATION
    // ==========================================
    const whatsappFloat = document.querySelector('.whatsapp-float');
    
    if (whatsappFloat) {
        // Show with delay
        whatsappFloat.style.opacity = '0';
        whatsappFloat.style.transform = 'scale(0)';
        
        setTimeout(() => {
            whatsappFloat.style.transition = 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            whatsappFloat.style.opacity = '1';
            whatsappFloat.style.transform = 'scale(1)';
        }, 1500);
        
        // Pause animation on hover
        whatsappFloat.addEventListener('mouseenter', () => {
            whatsappFloat.style.animation = 'none';
        });
        
        whatsappFloat.addEventListener('mouseleave', () => {
            whatsappFloat.style.animation = '';
        });
    }
    
    // ==========================================
    // GALLERY LIGHTBOX EFFECT (simple)
    // ==========================================
    const galleryItems = document.querySelectorAll('.galeria__item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if (img) {
                // Create lightbox
                const lightbox = document.createElement('div');
                lightbox.className = 'lightbox';
                lightbox.innerHTML = `
                    <div class="lightbox__overlay"></div>
                    <div class="lightbox__content">
                        <img src="${img.src}" alt="${img.alt}">
                        <button class="lightbox__close" aria-label="Cerrar">&times;</button>
                    </div>
                `;
                
                // Add styles dynamically
                lightbox.style.cssText = `
                    position: fixed;
                    inset: 0;
                    z-index: 10000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 2rem;
                `;
                
                const overlay = lightbox.querySelector('.lightbox__overlay');
                overlay.style.cssText = `
                    position: absolute;
                    inset: 0;
                    background: rgba(26, 26, 26, 0.9);
                    animation: fadeIn 0.3s ease;
                `;
                
                const content = lightbox.querySelector('.lightbox__content');
                content.style.cssText = `
                    position: relative;
                    max-width: 90vw;
                    max-height: 90vh;
                    animation: scaleIn 0.3s ease;
                `;
                
                const lightboxImg = lightbox.querySelector('img');
                lightboxImg.style.cssText = `
                    max-width: 100%;
                    max-height: 85vh;
                    object-fit: contain;
                    border-radius: 8px;
                `;
                
                const closeBtn = lightbox.querySelector('.lightbox__close');
                closeBtn.style.cssText = `
                    position: absolute;
                    top: -40px;
                    right: 0;
                    background: none;
                    border: none;
                    color: white;
                    font-size: 2.5rem;
                    cursor: pointer;
                    line-height: 1;
                    transition: transform 0.2s ease;
                `;
                
                closeBtn.addEventListener('mouseenter', () => {
                    closeBtn.style.transform = 'scale(1.2)';
                });
                
                closeBtn.addEventListener('mouseleave', () => {
                    closeBtn.style.transform = 'scale(1)';
                });
                
                document.body.appendChild(lightbox);
                document.body.style.overflow = 'hidden';
                
                // Close lightbox
                const closeLightbox = () => {
                    lightbox.style.opacity = '0';
                    setTimeout(() => {
                        lightbox.remove();
                        document.body.style.overflow = '';
                    }, 300);
                };
                
                closeBtn.addEventListener('click', closeLightbox);
                overlay.addEventListener('click', closeLightbox);
                
                lightbox.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape') {
                        closeLightbox();
                    }
                });
            }
        });
    });
    
    // Add lightbox animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes scaleIn {
            from { transform: scale(0.9); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
        .lightbox {
            transition: opacity 0.3s ease;
        }
    `;
    document.head.appendChild(style);
    
    // ==========================================
    // SCROLL PROGRESS INDICATOR
    // ==========================================
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0;
        height: 3px;
        background: linear-gradient(90deg, #C9A84C, #9A7B2B);
        z-index: 10001;
        transition: width 0.1s linear;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = `${scrolled}%`;
    }, { passive: true });
    
    // ==========================================
    // LAZY LOAD IMAGES
    // ==========================================
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px'
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    // ==========================================
    // COUNTER ANIMATION FOR RATINGS
    // ==========================================
    const ratingElement = document.querySelector('.section-rating');
    
    if (ratingElement) {
        const observerOptions = {
            threshold: 0.5
        };
        
        const ratingObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(ratingElement, 0, 4.6, 1500);
                    ratingObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        ratingObserver.observe(ratingElement);
    }
    
    function animateCounter(element, start, end, duration) {
        const text = element.textContent;
        const ratingMatch = text.match(/(\d+\.\d)/);
        
        if (ratingMatch) {
            const startTime = performance.now();
            
            function update(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function
                const easeOut = 1 - Math.pow(1 - progress, 3);
                
                const current = start + (end - start) * easeOut;
                const formatted = current.toFixed(1);
                
                element.textContent = text.replace(ratingMatch[1], formatted);
                
                if (progress < 1) {
                    requestAnimationFrame(update);
                }
            }
            
            requestAnimationFrame(update);
        }
    }
    
    // ==========================================
    // TOUCH DEVICE DETECTION
    // ==========================================
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
        
        // Remove hover effects on touch
        const style = document.createElement('style');
        style.textContent = `
            .touch-device *:hover {
                transform: none !important;
                box-shadow: none !important;
            }
            .touch-device .menu__item:hover {
                transform: none;
            }
            .touch-device .torta:hover {
                transform: none;
            }
            .touch-device .testimonio:hover {
                transform: none;
            }
            .touch-device .momento:hover {
                transform: none;
            }
        `;
        document.head.appendChild(style);
    }
    
    // ==========================================
    // PAGE VISIBILITY API - PAUSE ANIMATIONS
    // ==========================================
    document.addEventListener('visibilitychange', () => {
        const heroImage = document.querySelector('.hero__image');
        if (heroImage) {
            heroImage.style.animationPlayState = document.hidden ? 'paused' : 'running';
        }
    });
    
    console.log('Mode Café de Especialidad - Landing Page loaded successfully ☕');
});