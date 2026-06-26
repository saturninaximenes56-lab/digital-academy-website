// modules-data.js - Fallback data if JSON fails to load

const modulesData = [
    {
        id: 1,
        title: "Computer & Digital Fundamental",
        duration: "1-2 months",
        icon: "fa-laptop",
        color: "blue",
        topics: ["Computer Basic", "Operating System", "Internet & Email", "Microsoft Office", "Google Workspace", "Cyber Security Basic"],
        projects: ["CV", "Presentation", "Digital Documentation"],
        level: "Level 1"
    },
    {
        id: 2,
        title: "Graphic Design Fundamental",
        duration: "2-3 months",
        icon: "fa-paint-brush",
        color: "purple",
        topics: ["Design Principle", "Color Theory", "Typography", "Social Media Design", "Flyer, Poster, Brochure", "Presentation Design", "Brand Identity"],
        projects: ["Company Profile", "Marketing Kit", "Social Campaign"],
        level: "Level 1"
    },
    {
        id: 3,
        title: "Advanced Graphic Design",
        duration: "2-3 months",
        icon: "fa-edit",
        color: "pink",
        topics: ["Adobe Photoshop", "Adobe Illustrator", "Banner & Poster", "Logo & Branding", "Video Editing (CapCut)", "Motion Graphic Basic"],
        projects: ["Logo Brand", "Branding Guideline", "Promotional Video"],
        level: "Level 1"
    },
    {
        id: 4,
        title: "UI/UX Design",
        duration: "1-2 months",
        icon: "fa-pencil-ruler",
        color: "indigo",
        topics: ["UI Design", "Design System", "Responsive Design", "UX Research", "Wireframe", "Prototype", "Usability Testing"],
        projects: ["E-Commerce UI", "Mobile App UI", "Dashboard Design"],
        level: "Level 1-2"
    },
    {
        id: 5,
        title: "Web Fundamental",
        duration: "2-3 months",
        icon: "fa-code",
        color: "green",
        topics: ["HTML5", "CSS3", "Bootstrap", "Tailwind CSS", "JavaScript Basic", "Git & GitHub"],
        projects: ["Portfolio Website", "Company Profile", "Landing Page"],
        level: "Level 2"
    },
    {
        id: 6,
        title: "Frontend Development",
        duration: "2-3 months",
        icon: "fa-react",
        color: "cyan",
        topics: ["JavaScript Advanced", "ES6+ (DOM, Async)", "Fetch API & JSON", "ReactJS", "Next.js", "State Management"],
        projects: ["Dashboard", "Blog Platform", "Product Catalog"],
        level: "Level 2"
    },
    {
        id: 7,
        title: "Database & Backend Development",
        duration: "2-3 months",
        icon: "fa-database",
        color: "orange",
        topics: ["ERP & Database Design", "MySQL", "PostgreSQL", "PHP Fundamental", "OOP PHP", "Laravel"],
        projects: ["Inventory System", "Employee System", "School System"],
        level: "Level 3"
    },
    {
        id: 8,
        title: "API & Fullstack Development",
        duration: "1-2 months",
        icon: "fa-plug",
        color: "red",
        topics: ["REST API", "JSON Handling", "JWT Authentication", "Laravel Sanctum", "React + Laravel", "Next.js + Laravel"],
        projects: ["E-Commerce Platform", "Online Booking System"],
        level: "Level 4"
    },
    {
        id: 9,
        title: "Mobile Development",
        duration: "2-3 months",
        icon: "fa-mobile-alt",
        color: "teal",
        topics: ["Dart Programming", "Widget System", "State Management", "API Integration", "Local Storage", "Push Notification"],
        projects: ["E-Commerce App", "Delivery App", "Attendance App"],
        level: "Level 5"
    },
    {
        id: 10,
        title: "Modern Backend Development",
        duration: "2-3 months",
        icon: "fa-server",
        color: "gray",
        topics: ["Node.js", "Express.js", "TypeScript", "Golang Basic", "API Development", "Real-Time System"],
        projects: ["Microservice API", "Real-Time Application"],
        level: "Level 5"
    },
    {
        id: 11,
        title: "DevOps & Cloud Deployment",
        duration: "1-2 months",
        icon: "fa-cloud-upload-alt",
        color: "indigo",
        topics: ["Linux Basic", "VPS Management", "Nginx", "Docker Basic", "CI/CD Basic", "Domain & SSL"],
        projects: ["Deploy Fullstack App", "Production Server Setup"],
        level: "Level 5"
    },
    {
        id: 12,
        title: "AI & Emerging Technology",
        duration: "1 month",
        icon: "fa-robot",
        color: "purple",
        topics: ["ChatGPT & Copilot", "Canva AI, Firefly", "Midjourney", "AI Video (Runway)", "Prompt Engineering", "AI Automation"],
        projects: ["AI Powered App", "AI Marketing Campaign"],
        level: "Level 5"
    }
];

// Export for Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = modulesData;
}

// Make available globally
if (typeof window !== 'undefined') {
    window.modulesData = modulesData;
}

console.log('✅ modules-data.js fallback loaded!');