// curriculum-data.js - Fallback curriculum data

const curriculumData = [
    {
        quarter: "Quarter 1",
        months: "1-3",
        title: "Computer Fundamental & Design Basics",
        focus: "Fundamentu Komputador no Design Básiku",
        modules: [1, 2, 3],
        description: "Aprende komputador básiku, design gráfiku, no ferramenta kreativa."
    },
    {
        quarter: "Quarter 2",
        months: "4-6",
        title: "UI/UX & Frontend Development",
        focus: "UI/UX no Frontend Development",
        modules: [4, 5, 6],
        description: "Desenha interfase uzuáriu no dezenvolve aplikasaun web ho React."
    },
    {
        quarter: "Quarter 3",
        months: "7-9",
        title: "Backend & Fullstack Development",
        focus: "Backend no Fullstack Development",
        modules: [7, 8],
        description: "Kria backend ho Laravel no integra ho frontend."
    },
    {
        quarter: "Quarter 4",
        months: "10-12",
        title: "Mobile & Modern Backend",
        focus: "Mobile no Backend Modernu",
        modules: [9, 10],
        description: "Dezenvolve aplikasaun mobile no backend ho Node.js."
    },
    {
        quarter: "Quarter 5",
        months: "13-15",
        title: "DevOps, AI & Final Project",
        focus: "DevOps, AI no Final Project",
        modules: [11, 12],
        description: "Deploy aplikasaun, integra AI, no kompleta projetu final."
    }
];

// Export for Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = curriculumData;
}

// Make available globally
if (typeof window !== 'undefined') {
    window.curriculumData = curriculumData;
}

console.log('✅ curriculum-data.js fallback loaded!');