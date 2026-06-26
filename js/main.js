// main.js - JavaScript prinsipál ba website hotu

// ============================================
// 1. WAITING FOR DOM TO LOAD
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 DTCI Academy Website loaded successfully!');
    
    // Initialize all components
    initMobileMenu();
    initSmoothScroll();
    initAnimations();
    initScrollSpy();
    initBackToTop();
    initFormValidation();
    
    // Load data dynamically
    if (typeof loadModules === 'function') {
        loadModules();
    }
    if (typeof loadTestimonials === 'function') {
        loadTestimonials();
    }
    if (typeof loadProjects === 'function') {
        loadProjects();
    }
    if (typeof loadTeam === 'function') {
        loadTeam();
    }
    if (typeof loadFAQ === 'function') {
        loadFAQ();
    }
    
    // Animate counters if they exist
    animateCounters();
});

// ============================================
// 2. MOBILE MENU
// ============================================
function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenu = document.getElementById('close-menu');
    
    if (menuToggle && mobileMenu) {
        // Toggle menu on button click
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            mobileMenu.classList.toggle('hidden');
            document.body.classList.toggle('overflow-hidden');
            
            // Change icon
            const icon = this.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });
        
        // Close menu on link click
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                document.body.classList.remove('overflow-hidden');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
        
        // Close menu on outside click
        document.addEventListener('click', function(e) {
            if (!mobileMenu.classList.contains('hidden') && 
                !mobileMenu.contains(e.target) && 
                !menuToggle.contains(e.target)) {
                mobileMenu.classList.add('hidden');
                document.body.classList.remove('overflow-hidden');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }
}

// ============================================
// 3. SMOOTH SCROLL
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// 4. INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================
function initAnimations() {
    // Fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in, .animate-on-scroll');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('opacity-100', 'translate-y-0');
                    entry.target.classList.remove('opacity-0', 'translate-y-10');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        fadeElements.forEach(el => {
            el.classList.add('opacity-0', 'translate-y-10');
            observer.observe(el);
        });
    } else {
        // Fallback for older browsers
        fadeElements.forEach(el => {
            el.classList.remove('opacity-0', 'translate-y-10');
            el.classList.add('opacity-100');
        });
    }
    
    // Counter animation
    const counterElements = document.querySelectorAll('.counter');
    if ('IntersectionObserver' in window) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.textContent);
                    if (!isNaN(target)) {
                        animateCounter(entry.target, target);
                    }
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counterElements.forEach(el => counterObserver.observe(el));
    }
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 60;
    const duration = 2000; // 2 seconds
    const stepTime = duration / 60;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, stepTime);
}

// ============================================
// 5. SCROLL SPY (Active nav links)
// ============================================
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    if (sections.length === 0 || navLinks.length === 0) return;
    
    window.addEventListener('scroll', function() {
        let current = '';
        const scrollPosition = window.scrollY + 120;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('text-blue-600', 'border-blue-600');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('text-blue-600', 'border-blue-600');
            }
        });
    });
}

// ============================================
// 6. BACK TO TOP BUTTON
// ============================================
function initBackToTop() {
    const button = document.getElementById('back-to-top');
    if (!button) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 400) {
            button.classList.remove('opacity-0', 'invisible');
            button.classList.add('opacity-100', 'visible');
        } else {
            button.classList.add('opacity-0', 'invisible');
            button.classList.remove('opacity-100', 'visible');
        }
    });
    
    button.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// 7. FORM VALIDATION
// ============================================
function initFormValidation() {
    const forms = document.querySelectorAll('form[data-validate]');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const inputs = this.querySelectorAll('input, textarea, select');
            
            inputs.forEach(input => {
                // Remove previous error states
                input.classList.remove('border-red-500');
                const errorMsg = input.parentElement.querySelector('.error-message');
                if (errorMsg) errorMsg.remove();
                
                // Validate required fields
                if (input.hasAttribute('required') && !input.value.trim()) {
                    isValid = false;
                    input.classList.add('border-red-500');
                    showError(input, 'Field ida ne\'e presize');
                }
                
                // Validate email
                if (input.type === 'email' && input.value.trim()) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(input.value.trim())) {
                        isValid = false;
                        input.classList.add('border-red-500');
                        showError(input, 'Email válidu de\'it');
                    }
                }
                
                // Validate phone
                if (input.type === 'tel' && input.value.trim()) {
                    const phoneRegex = /^[0-9+\-\s()]{7,15}$/;
                    if (!phoneRegex.test(input.value.trim())) {
                        isValid = false;
                        input.classList.add('border-red-500');
                        showError(input, 'Número telefone válidu de\'it');
                    }
                }
            });
            
            if (isValid) {
                // Show success message
                const successMsg = document.createElement('div');
                successMsg.className = 'bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mt-4';
                successMsg.innerHTML = '✅ Mensajem haruka ho susesu! Obrigadu.';
                this.appendChild(successMsg);
                
                // Reset form after 3 seconds
                setTimeout(() => {
                    this.reset();
                    successMsg.remove();
                }, 3000);
            }
        });
    });
}

function showError(input, message) {
    const error = document.createElement('p');
    error.className = 'error-message text-red-500 text-sm mt-1';
    error.textContent = '⚠️ ' + message;
    input.parentElement.appendChild(error);
}

// ============================================
// 8. ANIMATE COUNTERS (Global)
// ============================================
function animateCounters() {
    const counters = document.querySelectorAll('[id$="-count"]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        if (isNaN(target)) return;
        
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 40);
    });
}

// ============================================
// 9. SEARCH/FILTER FUNCTION
// ============================================
function filterModules(query) {
    const modules = document.querySelectorAll('#modules-container > div');
    const searchTerm = query.toLowerCase().trim();
    
    if (modules.length === 0) return;
    
    let visibleCount = 0;
    
    modules.forEach(module => {
        const title = module.querySelector('h3')?.textContent?.toLowerCase() || '';
        const topics = module.querySelector('ul')?.textContent?.toLowerCase() || '';
        
        if (title.includes(searchTerm) || topics.includes(searchTerm)) {
            module.style.display = 'block';
            visibleCount++;
        } else {
            module.style.display = 'none';
        }
    });
    
    // Show/hide no results message
    const noResults = document.getElementById('no-results');
    if (noResults) {
        if (visibleCount === 0 && searchTerm.length > 0) {
            noResults.classList.remove('hidden');
        } else {
            noResults.classList.add('hidden');
        }
    }
}

// ============================================
// 10. LOADING SPINNER
// ============================================
function showLoading(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = `
        <div class="flex justify-center items-center py-12">
            <div class="loading-spinner"></div>
            <span class="ml-3 text-gray-600">Karregando dadus...</span>
        </div>
    `;
}

function hideLoading(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Remove loading spinner if exists
    const spinner = container.querySelector('.loading-spinner');
    if (spinner) {
        spinner.remove();
    }
}

// ============================================
// 11. TOAST NOTIFICATIONS
// ============================================
function showToast(message, type = 'success') {
    const colors = {
        success: 'bg-green-500',
        error: 'bg-red-500',
        warning: 'bg-yellow-500',
        info: 'bg-blue-500'
    };
    
    const toast = document.createElement('div');
    toast.className = `fixed bottom-4 right-4 ${colors[type] || colors.success} text-white px-6 py-3 rounded-lg shadow-lg z-50 transform transition-transform duration-300 translate-y-0`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('translate-y-20');
        toast.classList.remove('translate-y-0');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ============================================
// 12. EXPOSE GLOBAL FUNCTIONS
// ============================================
window.filterModules = filterModules;
window.showToast = showToast;
window.showLoading = showLoading;
window.hideLoading = hideLoading;
window.animateCounters = animateCounters;

console.log('✅ main.js loaded successfully!');