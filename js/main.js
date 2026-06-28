// ============================================================
// DTCI ACADEMY - MAIN JAVASCRIPT (jQuery Version)
// ============================================================

$(document).ready(function() {
    console.log('🚀 DTCI Academy Website loaded successfully with jQuery!');

    // ============================================
    // MOBILE MENU
    // ============================================
    $('#menu-toggle').on('click', function() {
        $('#mobile-menu').toggleClass('hidden');
        $(this).find('i').toggleClass('fa-bars fa-times');
    });

    $('#mobile-menu a').on('click', function() {
        $('#mobile-menu').addClass('hidden');
        $('#menu-toggle').find('i').removeClass('fa-times').addClass('fa-bars');
    });

    // ============================================
    // LOAD MODULES - AJAX
    // ============================================
    function loadModules() {
        $('#modules-container').html(`
            <div class="col-span-full text-center py-12">
                <div class="loading-spinner mx-auto"></div>
                <p class="mt-4 text-gray-600">Karregando módulu sira...</p>
            </div>
        `);

        $.ajax({
            url: 'data/modules.json',
            method: 'GET',
            dataType: 'json',
            timeout: 5000,
            success: function(data) {
                if (data && data.modules) {
                    renderModules(data.modules);
                } else {
                    renderModulesFallback();
                }
            },
            error: function(xhr, status, error) {
                console.warn('⚠️ AJAX error, using fallback:', error);
                renderModulesFallback();
            }
        });
    }

    function renderModules(modules) {
        const container = $('#modules-container');
        container.empty();

        const colorMap = {
            blue: 'bg-blue-100 border-blue-300 text-blue-700',
            purple: 'bg-purple-100 border-purple-300 text-purple-700',
            pink: 'bg-pink-100 border-pink-300 text-pink-700',
            indigo: 'bg-indigo-100 border-indigo-300 text-indigo-700',
            green: 'bg-green-100 border-green-300 text-green-700',
            cyan: 'bg-cyan-100 border-cyan-300 text-cyan-700',
            orange: 'bg-orange-100 border-orange-300 text-orange-700',
            red: 'bg-red-100 border-red-300 text-red-700',
            teal: 'bg-teal-100 border-teal-300 text-teal-700',
            gray: 'bg-gray-100 border-gray-300 text-gray-700'
        };

        modules.forEach(function(module) {
            const colorClasses = colorMap[module.color] || colorMap.blue;
            const topicsList = module.topics.map(function(topic) {
                return `<li class="text-sm text-gray-600"><i class="fas fa-check text-blue-500 mr-2"></i>${topic}</li>`;
            }).join('');

            const card = `
                <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 transform hover:-translate-y-2">
                    <div class="p-6">
                        <div class="flex items-center justify-between mb-4">
                            <div class="w-14 h-14 rounded-full ${colorClasses} flex items-center justify-center text-2xl border-2">
                                <i class="fas ${module.icon}"></i>
                            </div>
                            <span class="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                                ${module.duration}
                            </span>
                        </div>
                        <h3 class="text-xl font-bold text-gray-900 mb-2">${module.id}. ${module.title}</h3>
                        <ul class="space-y-1 mb-4">${topicsList}</ul>
                        <div class="pt-4 border-t border-gray-200">
                            <p class="text-sm font-medium text-gray-700">
                                <i class="fas fa-project-diagram text-blue-500 mr-2"></i>
                                Projetu: ${module.projects.join(', ')}
                            </p>
                        </div>
                    </div>
                </div>
            `;
            container.append(card);
        });
    }

    function renderModulesFallback() {
        const container = $('#modules-container');
        container.empty();

        const fallbackData = [
            { id: 1, title: 'Computer & Digital Fundamental', icon: 'fa-laptop', color: 'blue', duration: '1-2 months', topics: ['Computer Basic', 'OS', 'Internet & Email', 'Microsoft Office'], projects: ['CV', 'Presentation'] },
            { id: 2, title: 'Graphic Design Fundamental', icon: 'fa-paint-brush', color: 'purple', duration: '2-3 months', topics: ['Design Principle', 'Color Theory', 'Typography'], projects: ['Company Profile', 'Marketing Kit'] },
            { id: 3, title: 'Advanced Graphic Design', icon: 'fa-edit', color: 'pink', duration: '2-3 months', topics: ['Adobe Photoshop', 'Adobe Illustrator', 'Video Editing'], projects: ['Logo Brand', 'Branding Guideline'] },
            { id: 4, title: 'UI/UX Design', icon: 'fa-pencil-ruler', color: 'indigo', duration: '1-2 months', topics: ['UI Design', 'Design System', 'UX Research'], projects: ['E-Commerce UI', 'Mobile App UI'] },
            { id: 5, title: 'Web Fundamental', icon: 'fa-code', color: 'green', duration: '2-3 months', topics: ['HTML5', 'CSS3', 'Bootstrap', 'JavaScript Basic'], projects: ['Portfolio Website', 'Landing Page'] },
            { id: 6, title: 'Frontend Development', icon: 'fa-react', color: 'cyan', duration: '2-3 months', topics: ['JavaScript Advanced', 'ReactJS', 'Next.js'], projects: ['Dashboard', 'Blog Platform'] },
            { id: 7, title: 'Database & Backend', icon: 'fa-database', color: 'orange', duration: '2-3 months', topics: ['MySQL', 'PHP', 'Laravel'], projects: ['Inventory System', 'Employee System'] },
            { id: 8, title: 'API & Fullstack', icon: 'fa-plug', color: 'red', duration: '1-2 months', topics: ['REST API', 'JWT', 'Laravel Sanctum'], projects: ['E-Commerce Platform'] },
            { id: 9, title: 'Mobile Development', icon: 'fa-mobile-alt', color: 'teal', duration: '2-3 months', topics: ['Dart', 'Flutter', 'API Integration'], projects: ['E-Commerce App', 'Delivery App'] },
            { id: 10, title: 'Modern Backend', icon: 'fa-server', color: 'gray', duration: '2-3 months', topics: ['Node.js', 'Express.js', 'Golang'], projects: ['Microservice API'] },
            { id: 11, title: 'DevOps & Cloud', icon: 'fa-cloud-upload-alt', color: 'indigo', duration: '1-2 months', topics: ['Linux', 'Docker', 'VPS'], projects: ['Deploy Fullstack App'] },
            { id: 12, title: 'AI & Emerging Technology', icon: 'fa-robot', color: 'purple', duration: '1 month', topics: ['ChatGPT', 'Midjourney', 'AI Automation'], projects: ['AI Powered App'] }
        ];

        fallbackData.forEach(function(module) {
            const colorClasses = {
                blue: 'bg-blue-100 border-blue-300 text-blue-700',
                purple: 'bg-purple-100 border-purple-300 text-purple-700',
                pink: 'bg-pink-100 border-pink-300 text-pink-700',
                indigo: 'bg-indigo-100 border-indigo-300 text-indigo-700',
                green: 'bg-green-100 border-green-300 text-green-700',
                cyan: 'bg-cyan-100 border-cyan-300 text-cyan-700',
                orange: 'bg-orange-100 border-orange-300 text-orange-700',
                red: 'bg-red-100 border-red-300 text-red-700',
                teal: 'bg-teal-100 border-teal-300 text-teal-700',
                gray: 'bg-gray-100 border-gray-300 text-gray-700'
            }[module.color] || colorMap.blue;

            const topicsList = module.topics.map(function(topic) {
                return `<li class="text-sm text-gray-600"><i class="fas fa-check text-blue-500 mr-2"></i>${topic}</li>`;
            }).join('');

            const card = `
                <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 transform hover:-translate-y-2">
                    <div class="p-6">
                        <div class="flex items-center justify-between mb-4">
                            <div class="w-14 h-14 rounded-full ${colorClasses} flex items-center justify-center text-2xl border-2">
                                <i class="fas ${module.icon}"></i>
                            </div>
                            <span class="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                                ${module.duration}
                            </span>
                        </div>
                        <h3 class="text-xl font-bold text-gray-900 mb-2">${module.id}. ${module.title}</h3>
                        <ul class="space-y-1 mb-4">${topicsList}</ul>
                        <div class="pt-4 border-t border-gray-200">
                            <p class="text-sm font-medium text-gray-700">
                                <i class="fas fa-project-diagram text-blue-500 mr-2"></i>
                                Projetu: ${module.projects.join(', ')}
                            </p>
                        </div>
                    </div>
                </div>
            `;
            container.append(card);
        });
    }

    // ============================================
    // LOAD TESTIMONIALS - AJAX
    // ============================================
    function loadTestimonials() {
        $('#testimonials-container').html(`
            <div class="col-span-full text-center py-12">
                <div class="loading-spinner mx-auto"></div>
                <p class="mt-4 text-gray-600">Karregando testemunhu...</p>
            </div>
        `);

        $.ajax({
            url: 'data/testimonials.json',
            method: 'GET',
            dataType: 'json',
            timeout: 5000,
            success: function(data) {
                if (data && data.testimonials) {
                    renderTestimonials(data.testimonials);
                } else {
                    renderTestimonialsFallback();
                }
            },
            error: function() {
                renderTestimonialsFallback();
            }
        });
    }

    function renderTestimonials(testimonials) {
        const container = $('#testimonials-container');
        container.empty();

        testimonials.forEach(function(item) {
            const stars = '★'.repeat(item.rating) + '☆'.repeat(5 - item.rating);
            const card = `
                <div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition">
                    <div class="flex items-center mb-4">
                        <div class="w-16 h-16 rounded-full bg-gradient-to-r from-[#6C3CE1] to-[#00D4AA] flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                            ${item.name.charAt(0)}
                        </div>
                        <div class="ml-4">
                            <h4 class="font-bold text-gray-900">${item.name}</h4>
                            <p class="text-sm text-gray-600">${item.role} - ${item.company}</p>
                        </div>
                    </div>
                    <p class="text-gray-700 italic">"${item.testimonial}"</p>
                    <div class="mt-3 text-yellow-400">${stars}</div>
                </div>
            `;
            container.append(card);
        });
    }

    function renderTestimonialsFallback() {
        const container = $('#testimonials-container');
        container.empty();

        const fallback = [
            { name: 'João da Silva', role: 'Frontend Developer', company: 'Tech Solutions TL', testimonial: 'DTCI Academy transforma hau husi zero to profissional.', rating: 5 },
            { name: 'Maria Fernandes', role: 'UI/UX Designer', company: 'Creative Studio Dili', testimonial: 'Instrutor sira profisional no suporte individual mak ajuda hau.', rating: 5 },
            { name: 'Carlos Amaral', role: 'Fullstack Developer', company: 'Freelancer', testimonial: 'Kursu kompletu tebes! Projetu real prepara hau ba merkadu.', rating: 5 }
        ];

        fallback.forEach(function(item) {
            const stars = '★'.repeat(item.rating) + '☆'.repeat(5 - item.rating);
            const card = `
                <div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition">
                    <div class="flex items-center mb-4">
                        <div class="w-16 h-16 rounded-full bg-gradient-to-r from-[#6C3CE1] to-[#00D4AA] flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                            ${item.name.charAt(0)}
                        </div>
                        <div class="ml-4">
                            <h4 class="font-bold text-gray-900">${item.name}</h4>
                            <p class="text-sm text-gray-600">${item.role} - ${item.company}</p>
                        </div>
                    </div>
                    <p class="text-gray-700 italic">"${item.testimonial}"</p>
                    <div class="mt-3 text-yellow-400">${stars}</div>
                </div>
            `;
            container.append(card);
        });
    }

    // ============================================
    // FILTER MODULES - jQuery
    // ============================================
    window.filterModules = function(query) {
        const searchTerm = query.toLowerCase().trim();
        const cards = $('#modules-container .bg-white');

        let visibleCount = 0;

        cards.each(function() {
            const $card = $(this);
            const text = $card.text().toLowerCase();

            if (text.includes(searchTerm) || searchTerm === '') {
                $card.show();
                visibleCount++;
            } else {
                $card.hide();
            }
        });

        if (visibleCount === 0 && searchTerm.length > 0) {
            $('#no-results').removeClass('hidden');
        } else {
            $('#no-results').addClass('hidden');
        }
    };

    // ============================================
    // SMOOTH SCROLL
    // ============================================
    $('a[href^="#"]').on('click', function(e) {
        const target = $(this.attr('href'));
        if (target.length) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top - 80
            }, 600);
        }
    });

    // ============================================
    // ANIMATE COUNTERS
    // ============================================
    function animateCounters() {
        $('[id$="-count"]').each(function() {
            const $this = $(this);
            const target = parseInt($this.text());

            if (!isNaN(target) && target > 0) {
                let current = 0;
                const increment = target / 50;
                const timer = setInterval(function() {
                    current += increment;
                    if (current >= target) {
                        $this.text(target);
                        clearInterval(timer);
                    } else {
                        $this.text(Math.floor(current));
                    }
                }, 40);
            }
        });
    }

    // ============================================
    // INITIALIZE
    // ============================================
    if ($('#modules-container').length) {
        loadModules();
    }

    if ($('#testimonials-container').length) {
        loadTestimonials();
    }

    animateCounters();

    // ============================================
    // EXPOSE FUNCTIONS
    // ============================================
    window.loadModules = loadModules;
    window.loadTestimonials = loadTestimonials;
    window.filterModules = filterModules;
});