// Smooth scrolling for navigation links
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

// Navbar scroll effect
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    let scrollTop = window.scrollY;
    
    if (scrollTop > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(14, 165, 233, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.focus-card, .expertise-category, .tech-badge').forEach(el => {
    el.style.animation = 'none';
    el.style.opacity = '0';
    observer.observe(el);
});

// CSS animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Active nav link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add active style for nav links
const navLinkStye = document.createElement('style');
navLinkStye.textContent = `
    .nav-link.active {
        color: var(--primary);
        font-weight: 600;
    }
`;
document.head.appendChild(navLinkStye);

// Fetch GitHub repositories (optional enhancement)
async function loadGitHubRepos() {
    try {
        const response = await fetch('https://api.github.com/users/yurilinc-devops/repos?sort=updated&per_page=6');
        if (!response.ok) throw new Error('Failed to fetch repos');
        
        const repos = await response.json();
        
        // You can optionally display repos if you add a section for them
        console.log('GitHub repos loaded successfully:', repos);
    } catch (error) {
        console.log('Could not load GitHub repos:', error);
    }
}

// Load repos on page load
document.addEventListener('DOMContentLoaded', () => {
    loadGitHubRepos();
});

// Add hover effect to buttons
document.querySelectorAll('.btn, .contact-button').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});