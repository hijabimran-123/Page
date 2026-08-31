/**
 * ==========================================================================
 * HIJAB DEVELOPER PORTFOLIO - CORE JAVASCRIPT LOGIC & INTERACTIONS
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. TOAST NOTIFICATION UTILITY ---
    const toastContainer = document.getElementById('toastContainer');

    function showToast(message, type = 'success') {
        if (!toastContainer) return;

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;

        const iconClass = type === 'success' 
            ? 'fa-solid fa-circle-check' 
            : 'fa-solid fa-circle-exclamation';

        toast.innerHTML = `
            <i class="${iconClass}"></i>
            <span>${message}</span>
        `;

        toastContainer.appendChild(toast);

        // Auto remove after animation completes
        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 4000);
    }


    // --- 2. SCROLL PROGRESS BAR & STICKY HEADER ---
    const scrollProgress = document.getElementById('scrollProgress');
    const header = document.getElementById('header');
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progressPercentage = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

        if (scrollProgress) {
            scrollProgress.style.width = `${progressPercentage}%`;
        }

        // Header Background Glass State
        if (header) {
            if (scrollTop > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        // Back to top button visibility
        if (scrollTopBtn) {
            if (scrollTop > 350) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        }
    });

    // Scroll to Top action
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }


    // --- 3. SCROLLSPY / ACTIVE NAV HIGHLIGHTING ---
    const navLinks = document.querySelectorAll('.nav-menu .nav-link');
    const sections = document.querySelectorAll('section[id]');

    function updateActiveNav() {
        const scrollPosition = window.scrollY + 180;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);


    // --- 4. MOBILE NAVIGATION DRAWER ---
    const menuBtn = document.getElementById('menuBtn');
    const navMenu = document.getElementById('navMenu');

    if (menuBtn && navMenu) {
        menuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = menuBtn.querySelector('i');
            if (icon) {
                if (navMenu.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-xmark');
                } else {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            }
        });

        // Close mobile drawer when clicking any link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = menuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }


    // --- 5. REALISTIC MULTI-ROLE TYPEWRITER EFFECT ---
    const typingElement = document.getElementById('typing');
    const roles = [
        'Web Applications.',
        'Responsive Websites.',
        'WordPress Experiences.',
        'PHP & MySQL Systems.',
        'Clean UI/UX Designs.'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeDelay = 90;

    function typeWriter() {
        if (!typingElement) return;

        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typingElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typeDelay = 45;
        } else {
            typingElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typeDelay = 95;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            typeDelay = 1800;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeDelay = 350;
        }

        setTimeout(typeWriter, typeDelay);
    }

    typeWriter();


    // --- 6. INTERACTIVE HERO IDE CARD TABS & COPY CODE ---
    const ideTabs = document.querySelectorAll('.ide-tab');
    const codePanels = document.querySelectorAll('.code-panel');
    const copyCodeBtn = document.getElementById('copyCodeBtn');

    ideTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.getAttribute('data-tab');

            // Switch active tab button
            ideTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Switch active code panel
            codePanels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.getAttribute('id') === targetTab) {
                    panel.classList.add('active');
                }
            });
        });
    });

    if (copyCodeBtn) {
        copyCodeBtn.addEventListener('click', () => {
            const activePanel = document.querySelector('.code-panel.active');
            if (activePanel) {
                const codeText = activePanel.innerText;
                navigator.clipboard.writeText(codeText).then(() => {
                    showToast('Snippet copied to clipboard!', 'success');
                    copyCodeBtn.innerHTML = `<i class="fa-solid fa-check"></i> Copied!`;
                    setTimeout(() => {
                        copyCodeBtn.innerHTML = `<i class="fa-regular fa-copy"></i> Copy`;
                    }, 2000);
                }).catch(() => {
                    showToast('Failed to copy code', 'error');
                });
            }
        });
    }


    // --- 7. ANIMATED SKILL PROGRESS BARS WITH INTERSECTION OBSERVER ---
    const skillBars = document.querySelectorAll('.progress-bar-fill');

    if ('IntersectionObserver' in window) {
        const skillsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    skillBars.forEach(bar => {
                        const targetWidth = bar.getAttribute('data-progress') || '80%';
                        bar.style.width = targetWidth;
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        const skillsSection = document.getElementById('skills');
        if (skillsSection) {
            skillsObserver.observe(skillsSection);
        }
    } else {
        skillBars.forEach(bar => {
            bar.style.width = bar.getAttribute('data-progress') || '80%';
        });
    }


    // --- 8. SKILLS CATEGORY FILTERING ---
    const skillFilterBtns = document.querySelectorAll('[data-skill-filter]');
    const skillCards = document.querySelectorAll('.skills-grid .skill-card');

    skillFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-skill-filter');

            // Active button state
            skillFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter cards
            skillCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.4s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });


    // ==========================================================================
    // --- 9. DYNAMIC PROJECTS SYSTEM (CURRENT PROJECTS & FUTURE EXTENSIBILITY) ---
    // ==========================================================================

    /**
     * Default Master Project Catalog
     * You can add, edit, or remove any project objects here!
     * Each project can optionally include a "files" array: [{ name: 'index.html', content: '...' }]
     */
    const defaultProjects = [
        {
            id: 'proj-1',
            title: 'My Shoe & Footwear Store',
            category: 'ecommerce',
            categoryBadge: 'E-Commerce',
            icon: 'fa-solid fa-bag-shopping',
            desc: 'A responsive e-commerce web application featuring boys & girls shoe collections, category filters, interactive cart, search, and product modals.',
            tags: ['HTML5', 'CSS3', 'JavaScript ES6'],
            demoLink: '../website/ecommerce.html',
            codeLink: '#contact',
            isCustom: false,
            files: []
        },
        {
            id: 'proj-2',
            title: 'Modern Developer Portfolio',
            category: 'frontend',
            categoryBadge: 'Portfolio',
            icon: 'fa-solid fa-laptop-code',
            desc: 'High-performance personal developer portfolio with glassmorphic cards, interactive IDE hero widget, typing animations, project management, and contact handling.',
            tags: ['HTML5', 'Vanilla CSS', 'JavaScript'],
            demoLink: '#home',
            codeLink: '#contact',
            isCustom: false,
            files: []
        },
        {
            id: 'proj-3',
            title: 'Interactive Multi-Function Calculator',
            category: 'frontend',
            categoryBadge: 'Web App',
            icon: 'fa-solid fa-calculator',
            desc: 'A sleek and responsive calculator web tool supporting standard arithmetic, decimal calculations, memory operations, and keyboard events.',
            tags: ['HTML5', 'CSS Grid', 'JavaScript'],
            demoLink: 'caluculator.html',
            codeLink: '#contact',
            isCustom: false,
            files: []
        },
        {
            id: 'proj-4',
            title: 'Live Weather Forecast Dashboard',
            category: 'frontend',
            categoryBadge: 'Web App',
            icon: 'fa-solid fa-cloud-sun',
            desc: 'Dynamic real-time weather application displaying 5-day weather forecasts, humidity, wind velocity, and interactive city search with geolocation.',
            tags: ['JavaScript ES6+', 'OpenWeather API', 'CSS3 Glass'],
            demoLink: '#contact',
            codeLink: '#contact',
            isCustom: false,
            files: []
        },
        {
            id: 'proj-5',
            title: 'TaskFlow - Kanban & Productivity Board',
            category: 'frontend',
            categoryBadge: 'Productivity',
            icon: 'fa-solid fa-list-check',
            desc: 'An intuitive task management board with drag-and-drop workflow columns, priority tagging, local storage persistence, and deadline countdowns.',
            tags: ['JavaScript', 'Drag & Drop API', 'LocalStorage'],
            demoLink: '#contact',
            codeLink: '#contact',
            isCustom: false,
            files: []
        },
        {
            id: 'proj-6',
            title: 'Gourmet Food & Restaurant Ordering Website',
            category: 'ecommerce',
            categoryBadge: 'E-Commerce',
            icon: 'fa-solid fa-utensils',
            desc: 'Online culinary ordering portal with delicious menu categorization, interactive dish customizer, online table reservation, and checkout modal.',
            tags: ['HTML5', 'CSS3 Flexbox', 'JavaScript'],
            demoLink: '#contact',
            codeLink: '#contact',
            isCustom: false,
            files: []
        },
        {
            id: 'proj-7',
            title: 'Corporate WordPress Business Portal',
            category: 'cms',
            categoryBadge: 'WordPress',
            icon: 'fa-brands fa-wordpress',
            desc: 'Custom WordPress business site with tailored page templates, custom post types, dynamic blog system, and user contact capture integrations.',
            tags: ['WordPress', 'PHP', 'Custom CSS'],
            demoLink: '#contact',
            codeLink: '#contact',
            isCustom: false,
            files: []
        },
        {
            id: 'proj-8',
            title: 'Student & Course Management Database',
            category: 'fullstack',
            categoryBadge: 'Full-Stack',
            icon: 'fa-solid fa-database',
            desc: 'Backend database management system built with PHP and MySQL featuring complete CRUD operations, user role authentication, and data analytics.',
            tags: ['PHP', 'MySQL', 'Apache Server'],
            demoLink: '#contact',
            codeLink: '#contact',
            isCustom: false,
            files: []
        },
        {
            id: 'proj-9',
            title: 'Interactive Quiz & Knowledge Tester',
            category: 'frontend',
            categoryBadge: 'Web App',
            icon: 'fa-solid fa-graduation-cap',
            desc: 'Timed trivia and web development quiz app featuring multi-category selection, instant feedback explanations, progress bars, and score sharing.',
            tags: ['HTML5', 'CSS3', 'JavaScript ES6'],
            demoLink: '#contact',
            codeLink: '#contact',
            isCustom: false,
            files: []
        }
    ];

    // Load custom projects from LocalStorage (allows adding future projects anytime!)
    function getStoredCustomProjects() {
        try {
            const stored = localStorage.getItem('hijab_custom_projects');
            return stored ? JSON.parse(stored) : [];
        } catch (e) {
            console.error('Error loading custom projects from localStorage:', e);
            return [];
        }
    }

    function saveCustomProjects(projects) {
        try {
            localStorage.setItem('hijab_custom_projects', JSON.stringify(projects));
        } catch (e) {
            console.error('Error saving custom projects to localStorage:', e);
        }
    }

    // Combine default and user-added custom projects
    function getAllProjects() {
        const customProjects = getStoredCustomProjects();
        return [...customProjects, ...defaultProjects];
    }

    const projectsContainer = document.getElementById('projectsContainer');
    const projectsCountBadge = document.getElementById('projectsCount');
    const projectSearchInput = document.getElementById('projectSearchInput');
    const projectFilterBtns = document.querySelectorAll('[data-project-filter]');

    let currentCategory = 'all';
    let currentSearchTerm = '';

    // Render projects based on active filter and search term
    function renderProjects() {
        if (!projectsContainer) return;

        const allProjects = getAllProjects();

        // Filter by category and search keyword
        const filtered = allProjects.filter(p => {
            const matchesCategory = currentCategory === 'all' || p.category === currentCategory;
            
            const searchLower = currentSearchTerm.toLowerCase();
            const matchesSearch = !currentSearchTerm || 
                p.title.toLowerCase().includes(searchLower) ||
                p.desc.toLowerCase().includes(searchLower) ||
                p.tags.some(tag => tag.toLowerCase().includes(searchLower));

            return matchesCategory && matchesSearch;
        });

        // Update count badge
        if (projectsCountBadge) {
            projectsCountBadge.textContent = `Showing ${filtered.length} of ${allProjects.length} Projects`;
        }

        // Render Cards
        if (filtered.length === 0) {
            projectsContainer.innerHTML = `
                <div class="projects-empty-state">
                    <i class="fa-solid fa-folder-open"></i>
                    <h3>No Projects Found</h3>
                    <p>No projects match "${currentSearchTerm}" in this category.</p>
                    <button class="btn btn-outline btn-sm" id="resetProjectSearchBtn">
                        <i class="fa-solid fa-rotate-left"></i> Reset Filter
                    </button>
                </div>
            `;

            const resetBtn = document.getElementById('resetProjectSearchBtn');
            if (resetBtn) {
                resetBtn.addEventListener('click', () => {
                    if (projectSearchInput) projectSearchInput.value = '';
                    currentSearchTerm = '';
                    currentCategory = 'all';
                    projectFilterBtns.forEach(b => b.classList.remove('active'));
                    const allBtn = document.querySelector('[data-project-filter="all"]');
                    if (allBtn) allBtn.classList.add('active');
                    renderProjects();
                });
            }
            return;
        }

        projectsContainer.innerHTML = filtered.map((proj, idx) => {
            const projectNumber = String(idx + 1).padStart(2, '0');
            const customBadgeClass = proj.isCustom ? 'custom-badge' : '';
            const customBadgeText = proj.isCustom ? 'New' : proj.categoryBadge;

            const tagsHTML = proj.tags.map(tag => `<span class="tag-pill">${tag}</span>`).join('');
            const fileCount = Array.isArray(proj.files) ? proj.files.length : 0;

            return `
                <div class="project-card" data-category="${proj.category}">
                    <div class="project-thumbnail">
                        <div class="project-mockup-canvas">
                            <i class="${proj.icon} mockup-icon"></i>
                            <div class="mockup-tagline">${proj.title}</div>
                        </div>
                        <span class="project-badge ${customBadgeClass}">${customBadgeText}</span>
                    </div>
                    <div class="project-body">
                        <div>
                            <div class="project-header">
                                <span class="project-number">${projectNumber}.</span>
                                <h3>${proj.title}</h3>
                            </div>
                            <p>${proj.desc}</p>
                            <div class="project-tags">
                                ${tagsHTML}
                            </div>
                        </div>
                        <div class="project-actions">
                            <a href="${proj.demoLink}" ${proj.demoLink.startsWith('http') || proj.demoLink.includes('.html') ? 'target="_blank"' : ''} class="project-action-btn btn-demo">
                                <i class="fa-solid fa-arrow-up-right-from-square"></i> Live Demo
                            </a>
                            <button type="button" class="project-action-btn btn-code view-files-btn" data-project-id="${proj.id}">
                                <i class="fa-solid fa-folder-open"></i> Files (${fileCount})
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        // Wire up "Files" buttons for this render pass
        const viewFilesBtns = projectsContainer.querySelectorAll('.view-files-btn');
        viewFilesBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const projectId = btn.getAttribute('data-project-id');
                const project = getAllProjects().find(p => p.id === projectId);
                if (project) openFilesModal(project);
            });
        });
    }

    // Initialize Project Rendering
    renderProjects();

    // Search Input Listener with Debounce
    if (projectSearchInput) {
        projectSearchInput.addEventListener('input', (e) => {
            currentSearchTerm = e.target.value.trim();
            renderProjects();
        });
    }

    // Category Filter Buttons
    projectFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            currentCategory = btn.getAttribute('data-project-filter');
            projectFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderProjects();
        });
    });


    // --- 9b. VIEW PROJECT FILES MODAL LOGIC ---
    const viewFilesModal = document.getElementById('viewFilesModal');
    const closeViewFilesModalBtn = document.getElementById('closeViewFilesModalBtn');
    const viewFilesProjectTitle = document.getElementById('viewFilesProjectTitle');
    const filesListPanel = document.getElementById('filesListPanel');
    const fileContentView = document.getElementById('fileContentView');

    function openFilesModal(project) {
        if (!viewFilesModal) return;

        if (viewFilesProjectTitle) {
            viewFilesProjectTitle.textContent = `${project.title} — Files`;
        }

        const files = Array.isArray(project.files) ? project.files : [];

        if (filesListPanel) {
            if (files.length === 0) {
                filesListPanel.innerHTML = `<p style="font-size: 13px; color: var(--text-muted);">No files added for this project yet.</p>`;
            } else {
                filesListPanel.innerHTML = files.map((file, idx) => `
                    <button type="button" class="filter-btn file-select-btn" data-file-index="${idx}" style="width: 100%; justify-content: flex-start; text-align: left; font-size: 13px;">
                        <i class="fa-regular fa-file-code"></i> ${file.name}
                    </button>
                `).join('');

                filesListPanel.querySelectorAll('.file-select-btn').forEach(fileBtn => {
                    fileBtn.addEventListener('click', () => {
                        filesListPanel.querySelectorAll('.file-select-btn').forEach(b => b.classList.remove('active'));
                        fileBtn.classList.add('active');
                        const idx = parseInt(fileBtn.getAttribute('data-file-index'), 10);
                        if (fileContentView) {
                            fileContentView.textContent = files[idx].content || '(This file is empty)';
                        }
                    });
                });

                // Auto-open the first file
                filesListPanel.querySelector('.file-select-btn').click();
            }
        }

        if (files.length === 0 && fileContentView) {
            fileContentView.textContent = 'This project has no files attached yet. You can add files when creating a new project.';
        }

        viewFilesModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeFilesModal() {
        if (viewFilesModal) {
            viewFilesModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    if (closeViewFilesModalBtn) closeViewFilesModalBtn.addEventListener('click', closeFilesModal);

    if (viewFilesModal) {
        viewFilesModal.addEventListener('click', (e) => {
            if (e.target === viewFilesModal) {
                closeFilesModal();
            }
        });
    }


    // --- 10. ADD NEW PROJECT MODAL LOGIC ---
    const addProjectModal = document.getElementById('addProjectModal');
    const openAddProjectModalBtn = document.getElementById('openAddProjectModalBtn');
    const closeAddProjectModalBtn = document.getElementById('closeAddProjectModalBtn');
    const cancelAddProjectBtn = document.getElementById('cancelAddProjectBtn');
    const addProjectForm = document.getElementById('addProjectForm');

    // Holds the files the user has attached while the "Add Project" form is open
    let pendingProjectFiles = [];

    const newProjFilesList = document.getElementById('newProjFilesList');
    const newProjFileName = document.getElementById('newProjFileName');
    const newProjFileContent = document.getElementById('newProjFileContent');
    const addFileToProjectBtn = document.getElementById('addFileToProjectBtn');

    function renderPendingFilesList() {
        if (!newProjFilesList) return;

        if (pendingProjectFiles.length === 0) {
            newProjFilesList.innerHTML = '';
            return;
        }

        newProjFilesList.innerHTML = pendingProjectFiles.map((file, idx) => `
            <div style="display:flex; align-items:center; justify-content:space-between; background: rgba(255,255,255,0.04); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 8px 12px;">
                <span style="font-size: 13px; font-family: var(--font-code); color: var(--text-primary);">
                    <i class="fa-regular fa-file-code"></i> ${file.name}
                </span>
                <button type="button" class="remove-pending-file-btn" data-file-index="${idx}" style="background:none; border:none; color: var(--text-muted); cursor:pointer; font-size: 14px;">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
        `).join('');

        newProjFilesList.querySelectorAll('.remove-pending-file-btn').forEach(removeBtn => {
            removeBtn.addEventListener('click', () => {
                const idx = parseInt(removeBtn.getAttribute('data-file-index'), 10);
                pendingProjectFiles.splice(idx, 1);
                renderPendingFilesList();
            });
        });
    }

    if (addFileToProjectBtn) {
        addFileToProjectBtn.addEventListener('click', () => {
            const fileName = newProjFileName ? newProjFileName.value.trim() : '';
            const fileContent = newProjFileContent ? newProjFileContent.value : '';

            if (!fileName) {
                showToast('Please enter a file name first.', 'error');
                return;
            }

            pendingProjectFiles.push({ name: fileName, content: fileContent });
            renderPendingFilesList();

            if (newProjFileName) newProjFileName.value = '';
            if (newProjFileContent) newProjFileContent.value = '';
            showToast(`File "${fileName}" added to this project.`, 'success');
        });
    }

    function openModal() {
        if (addProjectModal) {
            addProjectModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeModal() {
        if (addProjectModal) {
            addProjectModal.classList.remove('active');
            document.body.style.overflow = '';
            if (addProjectForm) addProjectForm.reset();
            pendingProjectFiles = [];
            renderPendingFilesList();
        }
    }

    if (openAddProjectModalBtn) openAddProjectModalBtn.addEventListener('click', openModal);
    if (closeAddProjectModalBtn) closeAddProjectModalBtn.addEventListener('click', closeModal);
    if (cancelAddProjectBtn) cancelAddProjectBtn.addEventListener('click', closeModal);

    // Close when clicking outside modal
    if (addProjectModal) {
        addProjectModal.addEventListener('click', (e) => {
            if (e.target === addProjectModal) {
                closeModal();
            }
        });
    }

    // Handle Form Submit for Adding New Project
    if (addProjectForm) {
        addProjectForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const title = document.getElementById('newProjTitle').value.trim();
            const category = document.getElementById('newProjCategory').value;
            const icon = document.getElementById('newProjIcon').value;
            const desc = document.getElementById('newProjDesc').value.trim();
            const tagsInput = document.getElementById('newProjTags').value.trim();
            const demoLink = document.getElementById('newProjDemo').value.trim() || '#contact';
            const codeLink = document.getElementById('newProjCode').value.trim() || '#contact';

            if (!title || !desc || !tagsInput) {
                showToast('Please fill in all required fields.', 'error');
                return;
            }

            const tags = tagsInput.split(',').map(t => t.trim()).filter(t => t.length > 0);

            // Category badge name helper
            const categoryBadgeMap = {
                ecommerce: 'E-Commerce',
                frontend: 'Frontend',
                fullstack: 'Full-Stack',
                cms: 'WordPress'
            };

            const newProject = {
                id: 'custom-' + Date.now(),
                title: title,
                category: category,
                categoryBadge: categoryBadgeMap[category] || 'Custom',
                icon: icon,
                desc: desc,
                tags: tags,
                demoLink: demoLink,
                codeLink: codeLink,
                isCustom: true,
                files: pendingProjectFiles.slice() // copy the files attached in the form
            };

            const customProjects = getStoredCustomProjects();
            customProjects.unshift(newProject); // Put new project at the top
            saveCustomProjects(customProjects);

            pendingProjectFiles = [];
            renderPendingFilesList();

            closeModal();
            renderProjects();
            showToast(`Project "${title}" added successfully!`, 'success');
        });
    }


    // --- 11. ONE-CLICK EMAIL COPY TO CLIPBOARD ---
    const copyEmailCard = document.getElementById('copyEmailCard');
    const myEmailAddress = document.getElementById('myEmailAddress');

    if (copyEmailCard && myEmailAddress) {
        copyEmailCard.addEventListener('click', () => {
            const email = myEmailAddress.textContent.trim();
            navigator.clipboard.writeText(email).then(() => {
                showToast(`Email copied: ${email}`, 'success');
            }).catch(() => {
                showToast('Could not copy email', 'error');
            });
        });
    }


    // --- 12. MODERN CONTACT FORM HANDLING & VALIDATION ---
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const submitBtnText = document.getElementById('submitBtnText');
    const submitBtnIcon = document.getElementById('submitBtnIcon');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !message) {
                showToast('Please fill in all required fields.', 'error');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showToast('Please enter a valid email address.', 'error');
                return;
            }

            // Button loading state
            if (submitBtn && submitBtnText && submitBtnIcon) {
                submitBtn.disabled = true;
                submitBtnText.textContent = 'Sending Message...';
                submitBtnIcon.className = 'fa-solid fa-spinner fa-spin btn-icon';
            }

            setTimeout(() => {
                showToast(`Thank you, ${name}! Your message has been sent successfully.`, 'success');
                contactForm.reset();

                if (submitBtn && submitBtnText && submitBtnIcon) {
                    submitBtn.disabled = false;
                    submitBtnText.textContent = 'Send Message';
                    submitBtnIcon.className = 'fa-regular fa-paper-plane btn-icon';
                }
            }, 900);
        });
    }

});