
        class Navigation {
            constructor() {
                this.activeSection = 'home';
                this.isMenuOpen = false;
                this.theme = this.getTheme();
                
                this.navItems = [
                    { id: 'home', label: 'Home' },
                    { id: 'projects', label: 'Projects' },
                    { id: 'skills', label: 'Skills' },
                    { id: 'about', label: 'About' },
                    { id: 'contact', label: 'Contact' }
                ];

                this.init();
            }

            init() {
                this.setupEventListeners();
                this.applyTheme();
                this.handleScroll();
                this.bindEvents();
            }

            getTheme() {
                const saved = localStorage.getItem('theme');
                if (saved) return saved;
                return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            }

            setTheme(theme) {
                this.theme = theme;
                localStorage.setItem('theme', theme);
                this.applyTheme();
            }

            applyTheme() {
                const html = document.documentElement;
                html.classList.remove('light', 'dark');
                html.classList.add(this.theme);
                this.updateThemeIcons();
            }

            updateThemeIcons() {
                const sunIcons = document.querySelectorAll('.sun-icon');
                const moonIcons = document.querySelectorAll('.moon-icon');
                
                if (this.theme === 'light') {
                    sunIcons.forEach(icon => icon.style.display = 'none');
                    moonIcons.forEach(icon => icon.style.display = 'block');
                } else {
                    sunIcons.forEach(icon => icon.style.display = 'block');
                    moonIcons.forEach(icon => icon.style.display = 'none');
                }
            }

            toggleTheme() {
                this.setTheme(this.theme === 'light' ? 'dark' : 'light');
            }

            bindEvents() {
                const themeToggle = document.getElementById('themeToggle');
            }

            toggleMenu() {
                this.isMenuOpen = !this.isMenuOpen;
                const mobileMenu = document.getElementById('mobile-menu');
                const menuIcon = document.querySelector('.menu-icon');
                const xIcon = document.querySelector('.x-icon');

                if (this.isMenuOpen) {
                    mobileMenu.classList.add('open');
                    menuIcon.style.display = 'none';
                    xIcon.style.display = 'block';
                } else {
                    mobileMenu.classList.remove('open');
                    menuIcon.style.display = 'block';
                    xIcon.style.display = 'none';
                }
            }

            scrollToSection(sectionId) {
                const element = document.getElementById(sectionId);
                if (element) {
                    const navHeight = 80;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - navHeight;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                    this.setActiveSection(sectionId);
                    this.closeMenu();
                }
            }

            setActiveSection(sectionId) {
                this.activeSection = sectionId;
                
                // Update desktop nav links
                const desktopLinks = document.querySelectorAll('.nav-link');
                desktopLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.dataset.section === sectionId) {
                        link.classList.add('active');
                    }
                });

                // Update mobile nav links
                const mobileLinks = document.querySelectorAll('.mobile-nav-link');
                mobileLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.dataset.section === sectionId) {
                        link.classList.add('active');
                    }
                });
            }

            closeMenu() {
                if (this.isMenuOpen) {
                    this.toggleMenu();
                }
            }

            handleScroll() {
                const sections = this.navItems.map(item => item.id);
                const current = sections.find(section => {
                    const element = document.getElementById(section);
                    if (element) {
                        const rect = element.getBoundingClientRect();
                        return rect.top <= 100 && rect.bottom >= 100;
                    }
                    return false;
                });

                if (current && current !== this.activeSection) {
                    this.setActiveSection(current);
                }
            }

            setupEventListeners() {
                // Theme toggle buttons
                document.getElementById('theme-toggle-desktop').addEventListener('click', () => {
                    this.toggleTheme();
                });

                document.getElementById('theme-toggle-mobile').addEventListener('click', () => {
                    this.toggleTheme();
                });

                // Menu toggle
                document.getElementById('menu-toggle').addEventListener('click', () => {
                    this.toggleMenu();
                });

                // Navigation links - desktop
                const desktopLinks = document.querySelectorAll('.nav-link');
                desktopLinks.forEach(link => {
                    link.addEventListener('click', (e) => {
                        const section = e.target.dataset.section;
                        if (section) {
                            this.scrollToSection(section);
                        }
                    });
                });

                // Navigation links - mobile
                const mobileLinks = document.querySelectorAll('.mobile-nav-link');
                mobileLinks.forEach(link => {
                    link.addEventListener('click', (e) => {
                        const section = e.target.dataset.section;
                        if (section) {
                            this.scrollToSection(section);
                        }
                    });
                });

                // Scroll event
                window.addEventListener('scroll', () => {
                    this.handleScroll();
                });

                // Handle media query changes for dark mode preference
                const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
                mediaQuery.addEventListener('change', (e) => {
                    if (!localStorage.getItem('theme')) {
                        this.setTheme(e.matches ? 'dark' : 'light');
                    }
                });
            }
        }

        // Initialize navigation when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            new Navigation();
        });


         // Smooth Animations
        class AnimationManager {
            constructor() {
                this.init();
            }

            init() {
                this.observeElements();
            }

            observeElements() {
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

                // Observe animated elements
                const animatedElements = document.querySelectorAll('.animate-fade-in');
                animatedElements.forEach(el => {
                    el.style.opacity = '0';
                    el.style.transform = 'translateY(30px)';
                    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                    observer.observe(el);
                });
            }
        }


        // Interactive Features
        class InteractionManager {
            constructor() {
                this.init();
            }

            init() {
                this.bindEvents();
            }

            bindEvents() {
                // Download Resume button
                const downloadResumeBtn = document.getElementById('downloadResume');
                downloadResumeBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.handleResumeDownload();
                });

                // Badge hover effects
                const badges = document.querySelectorAll('.badge');
                badges.forEach(badge => {
                    badge.addEventListener('mouseenter', () => {
                        badge.style.transform = 'translateY(-4px) scale(1.05)';
                    });
                    badge.addEventListener('mouseleave', () => {
                        badge.style.transform = 'translateY(0) scale(1)';
                    });
                });

                // Button hover effects
                const buttons = document.querySelectorAll('.btn');
                buttons.forEach(button => {
                    button.addEventListener('mouseenter', () => {
                        if (button.classList.contains('btn-primary')) {
                            button.style.transform = 'translateY(-3px) scale(1.02)';
                        }
                    });
                    button.addEventListener('mouseleave', () => {
                        button.style.transform = 'translateY(0) scale(1)';
                    });
                });
            }

            handleResumeDownload() {
                // Placeholder for resume download functionality
                alert('Resume download functionality would be implemented here!');
                
                // In a real implementation, you might do something like:
                // const link = document.createElement('a');
                // link.href = '/path/to/resume.pdf';
                // link.download = 'Ponmile_Daramola_Resume.pdf';
                // link.click();
            }
        }

        // Initialize everything when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            new ThemeManager();
            new NavigationManager();
            new AnimationManager();
            new InteractionManager();

            // Add a subtle loading animation
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.5s ease';
            
            setTimeout(() => {
                document.body.style.opacity = '1';
            }, 100);
        });

        // Handle window resize for responsive behavior
        window.addEventListener('resize', () => {
            // Force recalculation of scroll positions
            setTimeout(() => {
                const navManager = new NavigationManager();
                navManager.handleScroll();
            }, 100);
        });


         // Smooth hover effects for cards
        function initializeCardEffects() {
            const cards = document.querySelectorAll('.card');
            
            cards.forEach(card => {
                card.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-4px)';
                });
                
                card.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0)';
                });
            });
        }

        // Button click handlers
        function initializeButtonHandlers() {
            const buttons = document.querySelectorAll('.btn:not([disabled])');
            
            buttons.forEach(button => {
                button.addEventListener('click', function(e) {
                    const buttonText = this.textContent.trim();
                    
                    switch(buttonText) {
                        case 'View Code':
                            e.preventDefault();
                            console.log('Opening GitHub repository...');
                            // Replace with actual GitHub URL
                            window.open('https://github.com/ponmile/iris-classification', '_blank');
                            break;
                        case 'Try Live Demo':
                            e.preventDefault();
                            console.log('Opening live demo...');
                            // Replace with actual demo URL
                            window.open('#', '_blank');
                            break;
                        default:
                            console.log(`${buttonText} clicked`);
                    }
                });
            });
        }

        // Intersection Observer for animations
        function initializeAnimations() {
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

            // Add initial styles and observe cards
            const cards = document.querySelectorAll('.card');
            cards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
                observer.observe(card);
            });
        }

        // Initialize everything when DOM is loaded
        document.addEventListener('DOMContentLoaded', function() {
            initializeTheme();
            initializeCardEffects();
            initializeButtonHandlers();
            initializeAnimations();
        });



        // Card interaction effects
        function initializeCardEffects() {
            const cards = document.querySelectorAll('.skill-card');
            
            cards.forEach(card => {
                // Add hover sound effect (optional)
                card.addEventListener('mouseenter', () => {
                    card.style.transform = 'translateY(-4px) scale(1.02)';
                });
                
                card.addEventListener('mouseleave', () => {
                    card.style.transform = 'translateY(0) scale(1)';
                });
                
                // Add click effect
                card.addEventListener('click', () => {
                    card.style.transform = 'translateY(-2px) scale(0.98)';
                    setTimeout(() => {
                        card.style.transform = 'translateY(-4px) scale(1.02)';
                    }, 150);
                });
            });

             // Intersection Observer for animations
        function initializeAnimations() {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }
                    });
                },
                {
                    threshold: 0.1,
                    rootMargin: '0px 0px -50px 0px'
                }
            );

            const cards = document.querySelectorAll('.skill-card');
            cards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
                observer.observe(card);
            });
        }

        // Smooth scroll behavior
        function initializeSmoothScroll() {
            document.documentElement.style.scrollBehavior = 'smooth';
        }

        // Performance optimization
        function debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        }

        // Responsive behavior
        function handleResize() {
            // Add any responsive JavaScript behavior here
            const cards = document.querySelectorAll('.skill-card');
            const isDesktop = window.innerWidth >= 1024;
            
            cards.forEach(card => {
                if (isDesktop) {
                    card.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                } else {
                    card.style.transition = 'all 0.2s ease';
                }
            });
        }

        // Initialize everything when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            initializeTheme();
            initializeCardEffects();
            initializeAnimations();
            initializeSmoothScroll();
            handleResize();
            
            // Add resize listener with debouncing
            window.addEventListener('resize', debounce(handleResize, 250));
            
            // System theme change listener
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                if (!localStorage.getItem('theme')) {
                    if (e.matches) {
                        document.documentElement.classList.add('dark');
                        updateThemeToggle('dark');
                    } else {
                        document.documentElement.classList.remove('dark');
                        updateThemeToggle('light');
                    }
                }
            });
        });

        // Keyboard accessibility
        document.addEventListener('keydown', (e) => {
            // Toggle theme with Ctrl/Cmd + Shift + T
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
                e.preventDefault();
                toggleTheme();
            }
        });
        }



        // Form handling
        document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
    const toast = document.getElementById('toast');
    const successMsg = document.getElementById('successMessage');

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        const data = { name, email, message };

        try {
            const response = await fetch('/contact/send/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken')
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (result.success) {
                form.reset();
                successMsg.style.display = 'block';
                toast.classList.add('show');

                setTimeout(() => {
                    toast.classList.remove('show');
                    successMsg.style.display = 'none';
                }, 3000);
            } else {
                alert("Error: " + result.error);
            }
        } catch (err) {
            alert("Error submitting the form.");
            console.error(err);
        }
    });

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let cookie of cookies) {
                cookie = cookie.trim();
                if (cookie.startsWith(name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
});


        // function showToast() {
        //     const toast = document.getElementById('toast');
        //     toast.classList.add('show');
            
        //     // Hide toast after 3 seconds
        //     setTimeout(() => {
        //         toast.classList.remove('show');
        //     }, 3000);
        // }

        // Add smooth scrolling for anchor links
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

        // Add form validation feedback
        // const inputs = document.querySelectorAll('.form-input, .form-textarea');
        // inputs.forEach(input => {
        //     input.addEventListener('blur', function() {
        //         if (this.value.trim() === '' && this.hasAttribute('required')) {
        //             this.style.borderColor = 'hsl(0, 72%, 51%)';
        //         } else {
        //             this.style.borderColor = 'hsl(220, 13%, 20%)';
        //         }
        //     });
            
        //     input.addEventListener('input', function() {
        //         if (this.style.borderColor === 'hsl(0, 72%, 51%)' && this.value.trim() !== '') {
        //             this.style.borderColor = 'hsl(220, 13%, 20%)';
        //         }
        //     });
        // });



        // function getCookie(name) {
        //     let cookieValue = null;
        //     if (document.cookie && document.cookie !== '') {
        //         const cookies = document.cookie.split(';');
        //         for (let i = 0; i < cookies.length; i++) {
        //             const cookie = cookies[i].trim();
        //             if (cookie.substring(0, name.length + 1) === (name + '=')) {
        //                 cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        //                 break;
        //             }
        //         }
        //     }
        //     return cookieValue;
        // }

        // const csrftoken = getCookie('csrftoken');

        // // Smooth scrolling for anchor links
        // function setupSmoothScrolling() {
        //     document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        //         anchor.addEventListener('click', function (e) {
        //             e.preventDefault();
        //             const target = document.querySelector(this.getAttribute('href'));
        //             if (target) {
        //                 target.scrollIntoView({
        //                     behavior: 'smooth',
        //                     block: 'start'
        //                 });
        //             }
        //         });
        //     });
        // }

        // Real-time form validation
        // function setupRealTimeValidation() {
        //     const nameField = document.getElementById('name');
        //     const emailField = document.getElementById('email');
        //     const messageField = document.getElementById('message');
            
        //     nameField.addEventListener('blur', function() {
        //         if (this.value.trim() && this.value.trim().length >= 2) {
        //             clearError('name');
        //         }
        //     });
            
        //     emailField.addEventListener('blur', function() {
        //         if (this.value.trim() && validateEmail(this.value.trim())) {
        //             clearError('email');
        //         }
        //     });
            
        //     messageField.addEventListener('blur', function() {
        //         if (this.value.trim() && this.value.trim().length >= 10) {
        //             clearError('message');
        //         }
        //     });
        // }

        // Animation on scroll
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
            
            // Observe elements with animation classes
            document.querySelectorAll('.animate-slide-up').forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
                observer.observe(el);
            });
        }

        // // Add CSS for spinning animation
        // const spinKeyframes = `
        //     @keyframes spin {
        //         from { transform: rotate(0deg); }
        //         to { transform: rotate(360deg); }
        //     }
        // `;
        // const style = document.createElement('style');
        // style.textContent = spinKeyframes;
        // document.head.appendChild(style);

        // // Initialize everything when DOM is loaded
        // document.addEventListener('DOMContentLoaded', function() {
        //     initializeTheme();
        //     setupSmoothScrolling();
        //     setupRealTimeValidation();
        //     setupScrollAnimations();
            
        //     // Attach form submission handler
        //     document.getElementById('contactForm').addEventListener('submit', handleFormSubmission);
            
        //     console.log('Contact section and footer initialized successfully!');
        // });

        // Handle theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                document.documentElement.classList.remove('light', 'dark');
                document.documentElement.classList.add(e.matches ? 'dark' : 'light');
            }
        });