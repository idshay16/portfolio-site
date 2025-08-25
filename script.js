// Project data - ordered by relevance to low-level programming
const projects = [
    {
        title: "C Interpreter",
        description: "Complete bytecode virtual machine interpreter implementation in C featuring scanner, compiler, and VM components. Includes comprehensive debugging tools, web demo interface, and extensive documentation. Demonstrates deep understanding of compiler design and virtual machine architecture.",
        technologies: ["C", "Virtual Machine", "Compiler Design", "Bytecode", "Memory Management", "Parser Design"],
        repoLink: "https://github.com/Software-Engineering-courses-homeworks/C-Interpreter",
        liveLink: "https://software-engineering-courses-homeworks.github.io/C-Interpreter/",
        icon: "⚙️"
    },
    {
        title: "Unix Shell",
        description: "Advanced Unix shell implementation in C with specialized sub-shells for Math, String, and Logic operations. Features robust process management, command history, comprehensive error handling, and system call integration. Showcases expertise in operating systems and process control.",
        technologies: ["C", "Unix Systems", "Process Management", "System Calls", "Signal Handling", "IPC"],
        repoLink: "https://github.com/Software-Engineering-courses-homeworks/unix-shell",
        liveLink: null,
        icon: "🔧"
    },
    {
        title: "Blib",
        description: "Full-stack library management system built with Java and JavaFX. Features comprehensive book management, user authentication, borrowing/returning system, reservation handling, and detailed reporting. Uses MySQL database with JDBC and OCSF for efficient client-server communication.",
        technologies: ["Java", "JavaFX", "MySQL", "JDBC", "OCSF", "Client-Server Architecture"],
        repoLink: "https://github.com/Engineering-Methods-Course/Blib",
        liveLink: null,
        icon: "📚"
    },
    {
        title: "Cloud Project Phoenix", 
        description: "Comprehensive cloud-based Jupyter Notebook platform with MQTT sensor data integration, real-time visualization, search engine functionality, user management system, and admin dashboard. Demonstrates proficiency in data processing and system integration.",
        technologies: ["Python", "Jupyter", "MQTT", "Cloud Computing", "Data Processing", "System Integration"],
        repoLink: "https://github.com/Cloud-Course-Group-Phoenix/Project-Pheonix",
        liveLink: null,
        icon: "☁️"
    },
    {
        title: "Theatrix",
        description: "Modern cinema website built with HTML, CSS, and JavaScript. Features movie browsing, trailer viewing, ticket booking system, discount codes, form validation, and order confirmation. Includes responsive design and Hebrew language support with web workers for performance.",
        technologies: ["HTML", "CSS", "JavaScript", "Web Workers", "Form Validation", "Performance Optimization"],
        repoLink: "https://github.com/archithectureproject/theatrix",
        liveLink: "https://archithectureproject.github.io/theatrix/",
        icon: "🎭"
    },
    {
        title: "Silver Sync",
        description: "React-based web game that challenges users to connect actors through movies and TV shows. Features real-time gameplay, user authentication, leaderboards, and customizable game challenges with TMDB API integration. Demonstrates full-stack development capabilities.",
        technologies: ["React", "Next.js", "Firebase", "TMDB API", "Tailwind CSS", "Vercel"],
        repoLink: "https://github.com/Advance-Web-Design/silversync",
        liveLink: "https://connect-the-shows-client.vercel.app",
        icon: "🎬"
    }
    // Add more projects by copying the structure above
];

// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const projectsGrid = document.getElementById('projects-grid');

// Mobile menu toggle
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

// Close mobile menu when clicking on a link
function closeMobileMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}

// Generate project cards
function createProjectCard(project) {
    return `
        <div class="project-card fade-in">
            <div class="project-image">
                ${project.icon}
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.repoLink}" class="project-link" target="_blank" rel="noopener noreferrer">
                        <i class="fab fa-github"></i>
                        View Code
                    </a>
                    ${project.liveLink ? `
                        <a href="${project.liveLink}" class="project-link" target="_blank" rel="noopener noreferrer">
                            <i class="fas fa-external-link-alt"></i>
                            Live Demo
                        </a>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
}

// Render all projects
function renderProjects() {
    if (projectsGrid) {
        projectsGrid.innerHTML = projects.map(project => createProjectCard(project)).join('');
    }
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 70; // Height of fixed header
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
            closeMobileMenu();
        });
    });
}

// Intersection Observer for fade-in animations
function setupScrollAnimations() {
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

    // Observe elements that should fade in
    const fadeElements = document.querySelectorAll('.project-card, .about-content, .contact-content');
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Render projects
    renderProjects();
    
    // Setup smooth scrolling
    setupSmoothScrolling();
    
    // Setup scroll animations
    setupScrollAnimations();
    
    // Setup contact form
    setupContactForm();
    
    // Mobile menu event listeners
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Close mobile menu on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });
});

// Function to easily add a new project (for future use)
function addProject(newProject) {
    projects.push(newProject);
    renderProjects();
    setupScrollAnimations(); // Re-setup animations for new elements
}

// Function to update a project (for future use)
function updateProject(index, updatedProject) {
    if (index >= 0 && index < projects.length) {
        projects[index] = { ...projects[index], ...updatedProject };
        renderProjects();
        setupScrollAnimations();
    }
}

// Contact Form Handling
function setupContactForm() {
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            // Let Formspree handle the submission, but provide user feedback
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Re-enable after 3 seconds (Formspree will redirect or show success)
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 3000);
        });
    }
}

// Export functions for potential future use
window.portfolioApp = {
    addProject,
    updateProject,
    projects
};