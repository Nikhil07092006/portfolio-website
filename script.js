// Enhanced Portfolio JavaScript with Profile Section

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navlist = document.querySelector('.navlist');
    
    if (hamburger && navlist) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navlist.classList.toggle('active');
        });
    }

    // Navigation Links with smooth scrolling
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            // Close mobile menu if open
            if (hamburger && navlist) {
                hamburger.classList.remove('active');
                navlist.classList.remove('active');
            }

            // Smooth scroll to target section
            if (targetSection) {
                targetSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }

            // Update active nav link
            navLinks.forEach(nav => nav.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Active navigation on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Hire Me Button
    const hireBtn = document.getElementById('hireBtn');
    if (hireBtn) {
        hireBtn.addEventListener('click', () => {
            const email = 'kumarnikhil4963@gmail.com';
            const subject = encodeURIComponent('Hiring Inquiry from Portfolio Website');
            const body = encodeURIComponent('Hi Nikhil,\n\nI am interested in discussing a potential opportunity with you.\n\nBest regards,');
            const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;
            window.open(mailtoLink, '_blank');
        });
    }

    // Download CV Button (placeholder)
    const downloadBtn = document.querySelector('.btn-secondary');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            showNotification('CV download will be available soon!', 'info');
        });
    }

    // Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate skill bars when skills section is visible
                if (entry.target.id === 'skills') {
                    animateSkillBars();
                }
                
                // Animate stats when about section is visible
                if (entry.target.id === 'about') {
                    animateStats();
                }
            }
        });
    }, observerOptions);

    // Observe all sections for scroll animations
    sections.forEach(section => {
        observer.observe(section);
    });

    // Skill Bar Animation
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach((bar, index) => {
            const progress = bar.getAttribute('data-progress');
            if (progress) {
                setTimeout(() => {
                    bar.style.width = progress + '%';
                }, index * 200);
            }
        });
    }

    // Stats Animation
    function animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(stat => {
            const finalValue = stat.textContent;
            const numericValue = parseInt(finalValue.replace(/\D/g, '')) || 0;
            
            if (numericValue > 0) {
                animateCounter(stat, 0, numericValue, finalValue);
            }
        });
    }

    // Counter Animation
    function animateCounter(element, start, end, finalText) {
        const duration = 2000;
        const increment = end / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                element.textContent = finalText;
                clearInterval(timer);
            } else {
                const currentValue = Math.floor(current);
                const suffix = finalText.includes('+') ? '+' : 
                              finalText.includes('%') ? '%' : '';
                element.textContent = currentValue + suffix;
            }
        }, 16);
    }

    // Dynamic Text Animation for Hero Title
    const dynamicTexts = [
        "Software Developer",
        "Web Designer", 
        "Problem Solver",
        "Tech Enthusiast"
    ];
    
    let textIndex = 0;
    const titleElement = document.querySelector('.title .title-line:last-child');
    
    function changeText() {
        if (titleElement) {
            titleElement.style.opacity = '0';
            setTimeout(() => {
                textIndex = (textIndex + 1) % dynamicTexts.length;
                titleElement.textContent = dynamicTexts[textIndex] + '.';
                titleElement.style.opacity = '1';
            }, 500);
        }
    }

    // Change text every 4 seconds
    setInterval(changeText, 4000);

    // Profile Image Fallback Handling
    const profileImg = document.querySelector('.profile-pic');
    if (profileImg) {
        profileImg.addEventListener('error', () => {
            profileImg.style.display = 'none';
            const placeholder = document.querySelector('.placeholder-avatar');
            if (placeholder) {
                placeholder.style.display = 'flex';
            }
        });

        profileImg.addEventListener('load', () => {
            profileImg.style.display = 'block';
            const placeholder = document.querySelector('.placeholder-avatar');
            if (placeholder) {
                placeholder.style.display = 'none';
            }
        });
    }

    // Contact Form Handling
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const name = contactForm.querySelector('input[placeholder="Your Name"]').value;
            const email = contactForm.querySelector('input[placeholder="Your Email"]').value;
            const subject = contactForm.querySelector('input[placeholder="Subject"]').value;
            const message = contactForm.querySelector('textarea').value;
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Create mailto link with form data
            const mailtoSubject = encodeURIComponent(subject || 'Contact from Portfolio Website');
            const mailtoBody = encodeURIComponent(`Hi Nikhil,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\nBest regards,\n${name}`);
            const mailtoLink = `mailto:kumarnikhil4963@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
            
            // Open email client
            window.open(mailtoLink, '_blank');
            
            // Show success message
            showNotification('Message sent successfully!', 'success');
            
            // Reset form
            contactForm.reset();
        });
    }

    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Notification System
    function showNotification(message, type = 'info') {
        // Remove existing notification if any
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-icon">
                    <i class="fas ${getNotificationIcon(type)}"></i>
                </div>
                <span class="notification-message">${message}</span>
                <button class="notification-close" aria-label="Close notification">&times;</button>
            </div>
        `;

        // Add notification styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${getNotificationColor(type)};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 350px;
            display: flex;
            align-items: center;
            backdrop-filter: blur(10px);
        `;

        // Add notification content styles
        const notificationContent = notification.querySelector('.notification-content');
        notificationContent.style.cssText = `
            display: flex;
            align-items: center;
            gap: 0.75rem;
            width: 100%;
        `;

        const notificationIcon = notification.querySelector('.notification-icon');
        notificationIcon.style.cssText = `
            font-size: 1.2rem;
            opacity: 0.9;
        `;

        const notificationMessage = notification.querySelector('.notification-message');
        notificationMessage.style.cssText = `
            flex: 1;
            font-weight: 500;
        `;

        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            opacity: 0.7;
            transition: opacity 0.3s ease;
            padding: 0;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
        `;

        // Add to body
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Close button functionality
        closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        });

        closeBtn.addEventListener('mouseenter', () => {
            closeBtn.style.opacity = '1';
        });

        closeBtn.addEventListener('mouseleave', () => {
            closeBtn.style.opacity = '0.7';
        });

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(400px)';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    // Helper functions for notifications
    function getNotificationIcon(type) {
        switch (type) {
            case 'success': return 'fa-check-circle';
            case 'error': return 'fa-exclamation-circle';
            case 'warning': return 'fa-exclamation-triangle';
            default: return 'fa-info-circle';
        }
    }

    function getNotificationColor(type) {
        switch (type) {
            case 'success': return 'linear-gradient(135deg, #4CAF50, #45a049)';
            case 'error': return 'linear-gradient(135deg, #f44336, #d32f2f)';
            case 'warning': return 'linear-gradient(135deg, #ff9800, #f57c00)';
            default: return 'var(--gradient-primary)';
        }
    }

    // Parallax Effect for floating elements
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.2;
        
        const floatingElements = document.querySelectorAll('.float-element');
        floatingElements.forEach((element, index) => {
            const speed = rate * (0.5 + index * 0.2);
            element.style.transform = `translateY(${speed}px) rotate(${scrolled * 0.1}deg)`;
        });
    });

    // Smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Loading Animation (optional)
    function showPageLoad() {
        // Add subtle loading animation when page loads
        const sections = document.querySelectorAll('.section');
        sections.forEach((section, index) => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            setTimeout(() => {
                section.style.transition = 'all 0.6s ease';
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    // Initialize page load animation
    showPageLoad();

    // Project card hover effects
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Work card hover effects
    const workCards = document.querySelectorAll('.work-card');
    workCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.work-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.work-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });

    // Theme toggle functionality
    function addThemeToggle() {
        const themeToggle = document.createElement('button');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        themeToggle.className = 'theme-toggle';
        themeToggle.setAttribute('aria-label', 'Toggle dark/light theme');
        themeToggle.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: var(--gradient-primary);
            border: none;
            color: white;
            font-size: 1.2rem;
            cursor: pointer;
            z-index: 1000;
            transition: var(--transition);
            box-shadow: var(--shadow-light);
            backdrop-filter: blur(10px);
        `;
        
        document.body.appendChild(themeToggle);
        
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            const icon = themeToggle.querySelector('i');
            icon.className = document.body.classList.contains('light-theme') 
                ? 'fas fa-sun' 
                : 'fas fa-moon';
            
            // Save theme preference
            const theme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
            localStorage.setItem('theme', theme);
            
            showNotification(`Switched to ${theme} theme`, 'info');
        });
        
        themeToggle.addEventListener('mouseenter', () => {
            themeToggle.style.transform = 'scale(1.1)';
        });
        
        themeToggle.addEventListener('mouseleave', () => {
            themeToggle.style.transform = 'scale(1)';
        });
    }

    // Load saved theme
    function loadSavedTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-theme');
        }
    }

    // Initialize theme features
    loadSavedTheme();
    addThemeToggle();

    // Easter Egg - Konami Code
    let konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.keyCode === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    function activateEasterEgg() {
        // Add rainbow animation
        document.body.style.animation = 'rainbow 3s ease-in-out';
        showNotification('🎉 Easter egg activated! You found the secret Konami code!', 'success');
        
        // Add confetti effect (simple version)
        createConfetti();
        
        // Add rainbow animation CSS if not exists
        if (!document.querySelector('#rainbow-style')) {
            const rainbowStyle = document.createElement('style');
            rainbowStyle.id = 'rainbow-style';
            rainbowStyle.textContent = `
                @keyframes rainbow {
                    0% { filter: hue-rotate(0deg) brightness(1); }
                    25% { filter: hue-rotate(90deg) brightness(1.1); }
                    50% { filter: hue-rotate(180deg) brightness(1.2); }
                    75% { filter: hue-rotate(270deg) brightness(1.1); }
                    100% { filter: hue-rotate(360deg) brightness(1); }
                }
            `;
            document.head.appendChild(rainbowStyle);
        }
        
        // Remove effect after 3 seconds
        setTimeout(() => {
            document.body.style.animation = '';
        }, 3000);
    }

    function createConfetti() {
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.style.cssText = `
                    position: fixed;
                    top: -10px;
                    left: ${Math.random() * 100}%;
                    width: 10px;
                    height: 10px;
                    background: hsl(${Math.random() * 360}, 70%, 60%);
                    z-index: 10000;
                    animation: confettiFall 3s linear forwards;
                    border-radius: 2px;
                `;
                document.body.appendChild(confetti);
                
                setTimeout(() => confetti.remove(), 3000);
            }, i * 100);
        }
        
        // Add confetti animation if not exists
        if (!document.querySelector('#confetti-style')) {
            const confettiStyle = document.createElement('style');
            confettiStyle.id = 'confetti-style';
            confettiStyle.textContent = `
                @keyframes confettiFall {
                    to {
                        transform: translateY(100vh) rotate(360deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(confettiStyle);
        }
    }

    // Performance optimization
    let ticking = false;
    
    function updateScrollEffects() {
        // Add any scroll-based effects here
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);

    // Console welcome message for developers
    console.log(`
    🚀 Welcome to Nikhil Kumar's Enhanced Portfolio!
    
    Thanks for checking out the code!
    
    Features included:
    ✅ Dedicated Profile Section
    ✅ Smooth Animations
    ✅ Mobile Responsive
    ✅ Dark Theme
    ✅ Interactive Elements
    ✅ Easter Eggs (try the Konami code!)
    
    If you're interested in collaborating:
    📧 kumarnikhil4963@gmail.com
    
    Built with ❤️ using vanilla HTML, CSS, and JavaScript
    `);

    // Initialize complete
    showNotification('Portfolio loaded successfully! 🚀', 'success');
});