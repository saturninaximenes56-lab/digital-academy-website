// load-data.js - Load all data from JSON files

// ============================================
// CONFIGURATION
// ============================================
const DATA_PATH = 'data/';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// ============================================
// CACHE MANAGEMENT
// ============================================
const dataCache = {};

function getCacheKey(url) {
    return `cache_${url}`;
}

function getCachedData(url) {
    const key = getCacheKey(url);
    const cached = localStorage.getItem(key);
    if (cached) {
        const data = JSON.parse(cached);
        if (Date.now() - data.timestamp < CACHE_DURATION) {
            return data.value;
        }
        localStorage.removeItem(key);
    }
    return null;
}

function setCachedData(url, data) {
    const key = getCacheKey(url);
    localStorage.setItem(key, JSON.stringify({
        timestamp: Date.now(),
        value: data
    }));
}

// ============================================
// GENERIC LOAD FUNCTION
// ============================================
async function loadJSON(url, useCache = true) {
    try {
        // Check cache first
        if (useCache) {
            const cached = getCachedData(url);
            if (cached) {
                console.log(`📦 Using cached data from: ${url}`);
                return cached;
            }
        }
        
        // Fetch from network
        console.log(`📡 Fetching data from: ${url}`);
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Store in cache
        if (useCache) {
            setCachedData(url, data);
        }
        
        return data;
    } catch (error) {
        console.error(`❌ Error loading ${url}:`, error);
        return null;
    }
}

// ============================================
// LOAD MODULES
// ============================================
async function loadModules(containerId = 'modules-container', showLoadingIndicator = true) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.warn(`⚠️ Container with id "${containerId}" not found`);
        return;
    }
    
    try {
        // Show loading
        if (showLoadingIndicator && typeof showLoading === 'function') {
            showLoading(containerId);
        }
        
        // Load data
        let data = await loadJSON(`${DATA_PATH}modules.json`);
        
        // Fallback to hardcoded data if JSON fails
        if (!data || !data.modules) {
            console.warn('⚠️ Using fallback modules data');
            if (typeof modulesData !== 'undefined') {
                data = { modules: modulesData };
            } else {
                throw new Error('No modules data available');
            }
        }
        
        // Render modules
        if (typeof renderModules === 'function') {
            renderModules(data.modules, containerId);
        } else {
            // Fallback rendering
            container.innerHTML = renderModulesHTML(data.modules);
        }
        
        // Apply animations
        if (typeof initAnimations === 'function') {
            setTimeout(initAnimations, 100);
        }
        
        console.log(`✅ ${data.modules.length} modules loaded successfully`);
        return data.modules;
        
    } catch (error) {
        console.error('❌ Failed to load modules:', error);
        container.innerHTML = `
            <div class="col-span-full text-center py-12">
                <i class="fas fa-exclamation-circle text-4xl text-red-500 mb-4"></i>
                <p class="text-gray-600">Falha atu karrega módulu sira. Favor refreska pájina.</p>
                <button onclick="loadModules()" class="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
                    <i class="fas fa-sync mr-2"></i> Tenta Tan
                </button>
            </div>
        `;
    }
}

function renderModulesHTML(modules) {
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
    
    let html = '';
    modules.forEach(module => {
        const colorClasses = colorMap[module.color] || colorMap.blue;
        const topicsList = module.topics.map(topic => 
            `<li class="text-sm text-gray-600"><i class="fas fa-check text-blue-500 mr-2"></i>${topic}</li>`
        ).join('');
        
        html += `
            <div class="module-card bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 transform hover:-translate-y-2">
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
                    <ul class="space-y-1 mb-4">
                        ${topicsList}
                    </ul>
                    <div class="pt-4 border-t border-gray-200">
                        <p class="text-sm font-medium text-gray-700">
                            <i class="fas fa-project-diagram text-blue-500 mr-2"></i>
                            Projetu: ${module.projects.join(', ')}
                        </p>
                    </div>
                </div>
            </div>
        `;
    });
    
    return html;
}

// ============================================
// LOAD CURRICULUM
// ============================================
async function loadCurriculum(containerId = 'curriculum-container') {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    try {
        let data = await loadJSON(`${DATA_PATH}schedule.json`);
        
        if (!data || !data.schedule || !data.schedule.quarterly_plan) {
            if (typeof curriculumData !== 'undefined') {
                data = { schedule: { quarterly_plan: curriculumData } };
            } else {
                throw new Error('No curriculum data available');
            }
        }
        
        const quarterlyPlan = data.schedule.quarterly_plan || data;
        
        let html = '';
        quarterlyPlan.forEach((item, index) => {
            const side = index % 2 === 0 ? 'left' : 'right';
            const modulesList = item.modules ? item.modules.map(m => 
                `<span class="inline-block bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full mr-2 mb-2">${m}</span>`
            ).join('') : '';
            
            html += `
                <div class="mb-12">
                    <div class="flex flex-col md:flex-row ${side === 'right' ? 'md:flex-row-reverse' : ''} items-start">
                        <div class="md:w-5/12 ${side === 'left' ? 'md:text-right' : ''} px-4">
                            <span class="text-blue-600 font-bold text-sm">${item.quarter || `Quarter ${index + 1}`}</span>
                            <h3 class="text-2xl font-bold text-gray-900">${item.focus || item.title}</h3>
                            <p class="text-gray-600">${item.months || item.duration || ''}</p>
                        </div>
                        <div class="hidden md:block w-2/12 relative">
                            <div class="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mx-auto z-10 relative">
                                <span class="text-white font-bold text-sm">${index + 1}</span>
                            </div>
                            ${index < quarterlyPlan.length - 1 ? `<div class="absolute top-10 left-1/2 transform -translate-x-1/2 w-1 h-16 bg-blue-200"></div>` : ''}
                        </div>
                        <div class="md:w-5/12 px-4">
                            <div class="bg-white p-6 rounded-xl shadow-lg">
                                <div class="flex flex-wrap">
                                    ${modulesList}
                                </div>
                                ${item.modules ? `<p class="text-sm text-gray-500 mt-2">${item.modules.length} módulu</p>` : ''}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
        
        container.innerHTML = html;
        
    } catch (error) {
        console.error('❌ Failed to load curriculum:', error);
        container.innerHTML = '<p class="text-center text-gray-600">Falha atu karrega kurikulum.</p>';
    }
}

// ============================================
// LOAD TESTIMONIALS
// ============================================
async function loadTestimonials(containerId = 'testimonials-container') {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    try {
        const data = await loadJSON(`${DATA_PATH}testimonials.json`);
        
        if (!data || !data.testimonials) {
            throw new Error('No testimonials data');
        }
        
        let html = '';
        data.testimonials.forEach(item => {
            const stars = '★'.repeat(item.rating) + '☆'.repeat(5 - item.rating);
            
            html += `
                <div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition">
                    <div class="flex items-center mb-4">
                        <img src="${item.image || 'assets/images/default-avatar.png'}" 
                             alt="${item.name}" 
                             class="w-16 h-16 rounded-full object-cover mr-4 border-2 border-blue-200"
                             onerror="this.src='assets/images/default-avatar.png'">
                        <div>
                            <h4 class="font-bold text-gray-900">${item.name}</h4>
                            <p class="text-sm text-gray-600">${item.role} - ${item.company}</p>
                        </div>
                    </div>
                    <p class="text-gray-700 italic">"${item.testimonial}"</p>
                    <div class="mt-3 text-yellow-400">
                        ${stars}
                    </div>
                    <p class="text-xs text-gray-400 mt-2">${item.date || ''}</p>
                </div>
            `;
        });
        
        container.innerHTML = html;
        
    } catch (error) {
        console.error('❌ Failed to load testimonials:', error);
        container.innerHTML = '<p class="text-gray-600">Falha atu karrega testemunhu.</p>';
    }
}

// ============================================
// LOAD PROJECTS
// ============================================
async function loadProjects(containerId = 'projects-container') {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    try {
        const data = await loadJSON(`${DATA_PATH}projects.json`);
        
        if (!data || !data.projects) {
            throw new Error('No projects data');
        }
        
        let html = '';
        data.projects.forEach(project => {
            const techs = project.technologies.map(t => 
                `<span class="inline-block bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full mr-1">${t}</span>`
            ).join('');
            
            html += `
                <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition">
                    <div class="h-48 bg-gray-300 flex items-center justify-center text-gray-500">
                        <i class="fas fa-image text-4xl opacity-50"></i>
                    </div>
                    <div class="p-6">
                        <span class="text-xs font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">${project.category}</span>
                        <h3 class="text-xl font-bold text-gray-900 mt-2">${project.title}</h3>
                        <p class="text-gray-600 text-sm mt-2">${project.description}</p>
                        <div class="mt-3 flex flex-wrap">
                            ${techs}
                        </div>
                        <p class="text-xs text-gray-400 mt-3">Estudante: ${project.student} | ${project.year}</p>
                    </div>
                </div>
            `;
        });
        
        container.innerHTML = html;
        
    } catch (error) {
        console.error('❌ Failed to load projects:', error);
        container.innerHTML = '<p class="text-gray-600">Falha atu karrega projetu.</p>';
    }
}

// ============================================
// LOAD TEAM
// ============================================
async function loadTeam(containerId = 'team-container') {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    try {
        const data = await loadJSON(`${DATA_PATH}team.json`);
        
        if (!data || !data.team) {
            throw new Error('No team data');
        }
        
        let html = '';
        data.team.forEach(member => {
            html += `
                <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition text-center">
                    <div class="h-48 bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                        <img src="${member.image || 'assets/images/default-avatar.png'}" 
                             alt="${member.name}" 
                             class="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                             onerror="this.src='assets/images/default-avatar.png'">
                    </div>
                    <div class="p-6">
                        <h3 class="text-xl font-bold text-gray-900">${member.name}</h3>
                        <p class="text-blue-600 font-semibold">${member.role}</p>
                        <p class="text-sm text-gray-600 mt-2">${member.specialty}</p>
                        <p class="text-xs text-gray-400 mt-1">${member.experience}</p>
                        <p class="text-sm text-gray-700 mt-3">${member.bio}</p>
                        <div class="mt-4 flex justify-center space-x-3">
                            ${member.social?.linkedin ? `<a href="${member.social.linkedin}" target="_blank" class="text-blue-600 hover:text-blue-800"><i class="fab fa-linkedin text-xl"></i></a>` : ''}
                            ${member.social?.github ? `<a href="${member.social.github}" target="_blank" class="text-gray-700 hover:text-gray-900"><i class="fab fa-github text-xl"></i></a>` : ''}
                            ${member.social?.portfolio ? `<a href="${member.social.portfolio}" target="_blank" class="text-purple-600 hover:text-purple-800"><i class="fas fa-briefcase text-xl"></i></a>` : ''}
                        </div>
                    </div>
                </div>
            `;
        });
        
        container.innerHTML = html;
        
    } catch (error) {
        console.error('❌ Failed to load team:', error);
        container.innerHTML = '<p class="text-gray-600">Falha atu karrega ekipa.</p>';
    }
}

// ============================================
// LOAD FAQ
// ============================================
async function loadFAQ(containerId = 'faq-container') {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    try {
        const data = await loadJSON(`${DATA_PATH}faq.json`);
        
        if (!data || !data.faq) {
            throw new Error('No FAQ data');
        }
        
        let html = '';
        data.faq.forEach(item => {
            html += `
                <div class="border-b border-gray-200 pb-4 mb-4">
                    <button class="faq-toggle flex justify-between items-center w-full text-left" data-target="faq-${item.id}">
                        <h3 class="text-lg font-semibold text-gray-900">${item.question}</h3>
                        <i class="fas fa-chevron-down text-blue-600 transition-transform"></i>
                    </button>
                    <div id="faq-${item.id}" class="faq-answer mt-2 hidden">
                        <p class="text-gray-600">${item.answer}</p>
                    </div>
                </div>
            `;
        });
        
        container.innerHTML = html;
        
        // Initialize FAQ toggle
        container.querySelectorAll('.faq-toggle').forEach(button => {
            button.addEventListener('click', function() {
                const targetId = this.dataset.target;
                const answer = document.getElementById(targetId);
                const icon = this.querySelector('i');
                
                if (answer.classList.contains('hidden')) {
                    answer.classList.remove('hidden');
                    icon.style.transform = 'rotate(180deg)';
                } else {
                    answer.classList.add('hidden');
                    icon.style.transform = 'rotate(0deg)';
                }
            });
        });
        
    } catch (error) {
        console.error('❌ Failed to load FAQ:', error);
        container.innerHTML = '<p class="text-gray-600">Falha atu karrega FAQ.</p>';
    }
}

// ============================================
// LOAD SETTINGS
// ============================================
async function loadSettings() {
    try {
        const data = await loadJSON(`${DATA_PATH}settings.json`);
        if (data && data.site) {
            // Update page title
            if (data.site.full_name && document.title) {
                document.title = data.site.full_name;
            }
            
            // Update meta description
            const metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc && data.site.description) {
                metaDesc.setAttribute('content', data.site.description);
            }
        }
        return data;
    } catch (error) {
        console.error('❌ Failed to load settings:', error);
        return null;
    }
}

// ============================================
// LOAD ALL DATA (Bulk)
// ============================================
async function loadAllData() {
    console.log('📦 Loading all data...');
    
    try {
        await Promise.all([
            loadSettings(),
            loadModules(),
            loadCurriculum(),
            loadTestimonials(),
            loadProjects(),
            loadTeam(),
            loadFAQ()
        ]);
        
        console.log('✅ All data loaded successfully!');
    } catch (error) {
        console.error('❌ Error loading all data:', error);
    }
}

// ============================================
// EXPOSE FUNCTIONS GLOBALLY
// ============================================
window.loadModules = loadModules;
window.loadCurriculum = loadCurriculum;
window.loadTestimonials = loadTestimonials;
window.loadProjects = loadProjects;
window.loadTeam = loadTeam;
window.loadFAQ = loadFAQ;
window.loadSettings = loadSettings;
window.loadAllData = loadAllData;
window.loadJSON = loadJSON;

console.log('✅ load-data.js loaded successfully!');