// animations.js - Animations for the website

// ============================================
// PARALLAX EFFECT
// ============================================
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        
        parallaxElements.forEach(el => {
            const speed = parseFloat(el.dataset.speed) || 0.5;
            const yPos = -(scrollY * speed);
            el.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// ============================================
// TYPEWRITER EFFECT
// ============================================
function initTypewriter(elementId, texts, speed = 100, delay = 2000) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timer;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            element.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            element.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = speed;
        
        if (isDeleting) {
            typeSpeed = speed / 2;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = delay;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }
        
        timer = setTimeout(type, typeSpeed);
    }
    
    type();
    
    // Return function to stop
    return function stop() {
        clearTimeout(timer);
    };
}

// ============================================
// COUNTDOWN TIMER
// ============================================
function initCountdown(targetDate, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        if (distance < 0) {
            container.innerHTML = 'Eventu komesa ona!';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        container.innerHTML = `
            <div class="flex justify-center space-x-4">
                <div class="text-center">
                    <div class="text-4xl font-bold text-blue-600">${days}</div>
                    <div class="text-xs text-gray-500">Loron</div>
                </div>
                <div class="text-4xl font-bold text-blue-600">${String(hours).padStart(2, '0')}</div>
                <div class="text-4xl font-bold text-blue-600">${String(minutes).padStart(2, '0')}</div>
                <div class="text-4xl font-bold text-blue-600">${String(seconds).padStart(2, '0')}</div>
            </div>
        `;
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// ============================================
// PROGRESS BAR
// ============================================
function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const width = bar.dataset.width || '0%';
                    bar.style.width = width;
                    observer.unobserve(bar);
                }
            });
        }, { threshold: 0.5 });
        
        progressBars.forEach(bar => {
            bar.style.width = '0%';
            observer.observe(bar);
        });
    }
}

// ============================================
// ANIMATE ON HOVER
// ============================================
function initHoverAnimations() {
    const hoverElements = document.querySelectorAll('.hover-scale');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        el.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// ============================================
// EXPOSE FUNCTIONS
// ============================================
window.initParallax = initParallax;
window.initTypewriter = initTypewriter;
window.initCountdown = initCountdown;
window.initProgressBars = initProgressBars;
window.initHoverAnimations = initHoverAnimations;

console.log('✅ animations.js loaded successfully!');