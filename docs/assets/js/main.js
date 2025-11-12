// I-PIN Main Website JavaScript

// Audio wave animation for hero section
function initAudioWaveAnimation() {
    const canvas = document.getElementById('audioWave');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    let animationId;
    let time = 0;
    
    function drawWave() {
        ctx.clearRect(0, 0, width, height);
        
        // Draw multiple wave layers
        const waves = [
            { amplitude: 30, frequency: 0.02, phase: 0, color: 'rgba(37, 99, 235, 0.6)' },
            { amplitude: 20, frequency: 0.03, phase: Math.PI / 3, color: 'rgba(14, 165, 233, 0.4)' },
            { amplitude: 15, frequency: 0.025, phase: Math.PI / 2, color: 'rgba(59, 130, 246, 0.3)' }
        ];
        
        waves.forEach(wave => {
            ctx.beginPath();
            ctx.strokeStyle = wave.color;
            ctx.lineWidth = 2;
            
            for (let x = 0; x < width; x++) {
                const y = height / 2 + 
                         Math.sin(x * wave.frequency + time + wave.phase) * wave.amplitude;
                
                if (x === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            
            ctx.stroke();
        });
        
        time += 0.1;
        animationId = requestAnimationFrame(drawWave);
    }
    
    drawWave();
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Intersection Observer for animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate
    document.querySelectorAll('.feature-card, .metric-card, .workflow-step').forEach(el => {
        observer.observe(el);
    });
}

// Mobile navigation toggle
function initMobileNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }
}

// Performance metrics counter animation
function initCounterAnimations() {
    function animateCounter(element, targetValue, duration = 2000) {
        if (!element) return;
        
        const startValue = 0;
        const startTime = performance.now();
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            const currentValue = startValue + (targetValue - startValue) * easeOutCubic;
            
            if (element.textContent.includes('%')) {
                element.textContent = currentValue.toFixed(1) + '%';
            } else if (element.textContent.includes('dB')) {
                element.textContent = '+' + currentValue.toFixed(1) + 'dB';
            } else {
                element.textContent = currentValue.toFixed(3);
            }
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }
        
        requestAnimationFrame(updateCounter);
    }
    
    // Setup intersection observer for metrics
    const metricsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const text = element.textContent;
                
                if (text.includes('0.999')) {
                    animateCounter(element, 0.999);
                } else if (text.includes('92.3%')) {
                    animateCounter(element, 92.3);
                } else if (text.includes('6.6%')) {
                    animateCounter(element, 6.6);
                } else if (text.includes('+8.3dB')) {
                    animateCounter(element, 8.3);
                }
                
                metricsObserver.unobserve(element);
            }
        });
    });
    
    document.querySelectorAll('.metric-value').forEach(el => {
        metricsObserver.observe(el);
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initAudioWaveAnimation();
    initSmoothScrolling();
    initScrollAnimations();
    initMobileNavigation();
    initCounterAnimations();
});

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: slideInUp 0.6s ease-out forwards;
        opacity: 1;
        transform: translateY(0);
    }
    
    .feature-card,
    .metric-card,
    .workflow-step {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .nav-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .nav-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .nav-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            top: 70px;
            left: -100%;
            width: 100%;
            height: calc(100vh - 70px);
            background: white;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            padding-top: 2rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transition: left 0.3s ease;
            z-index: 999;
        }
        
        .nav-menu.active {
            left: 0;
        }
        
        .nav-menu li {
            margin: 1rem 0;
        }
        
        .nav-menu a {
            font-size: 1.1rem;
            padding: 0.5rem 1rem;
        }
    }
`;
document.head.appendChild(style);
