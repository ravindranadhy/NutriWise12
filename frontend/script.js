// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navCta = document.querySelector('.nav-cta');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        navCta.classList.toggle('active');
    });
}

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            if (hamburger && hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                navCta.classList.remove('active');
            }
        }
    });
});

// Navbar Background on Scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for Fade-in Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
const animatedElements = document.querySelectorAll('.feature-card, .step, .research-card, .testimonial-card');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// CTA Button Click Handlers
const ctaButtons = document.querySelectorAll('.btn-primary');
ctaButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        if (button.textContent.includes('Free Trial') || button.textContent.includes('Get Started')) {
            e.preventDefault();
            alert('🎉 Welcome to NutriWise360!\n\nOur sign-up page is coming soon.\n\nFor now, you can:\n✓ Explore all features\n✓ Read success stories\n✓ Learn about the science\n\nStay tuned!');
        }
    });
});

// Demo Button Click Handler
const demoButtons = document.querySelectorAll('.btn-secondary, .btn-outline');
demoButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        if (button.textContent.includes('Demo') || button.textContent.includes('How It Works')) {
            e.preventDefault();
            alert('🎬 Demo Video Coming Soon!\n\nSee how NutriWise360 transforms your nutrition journey:\n\n✓ Personalized meal plans\n✓ Real-time tracking\n✓ AI-powered insights\n✓ Cultural cuisine options\n\nScroll down to explore features!');
        }
    });
});

// Counter Animation for Stats
const animateCounter = (element, target, duration = 2000) => {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
};

// Trigger counter animation when stats are visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            const statNumber = entry.target.querySelector('.stat-number');
            const text = statNumber.textContent;
            
            if (text.includes('K')) {
                const num = parseInt(text.replace('K+', ''));
                animateCounter(statNumber, num);
                setTimeout(() => {
                    statNumber.textContent = num + 'K+';
                }, 2000);
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat').forEach(stat => {
    statsObserver.observe(stat);
});

// Add hover effect to floating cards
const floatingCards = document.querySelectorAll('.floating-card');
floatingCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'scale(1.05) translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'scale(1) translateY(0)';
    });
});

// Console welcome message
console.log('%c🌿 Welcome to NutriWise360! ', 'background: #16a34a; color: white; font-size: 20px; padding: 10px;');
console.log('%cPersonalized nutrition powered by AI', 'color: #16a34a; font-size: 14px;');
