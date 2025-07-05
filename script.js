document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const navbar = document.querySelector('.navbar');
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    const navOverlay = document.getElementById('nav-overlay');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    // Mobile Menu Toggle
    function toggleMenu() {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
        navOverlay.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    }
    
    mobileMenu.addEventListener('click', toggleMenu);
    navOverlay.addEventListener('click', toggleMenu);
    
    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
            
            // Set active link
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            link.classList.add('active');
        });
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navbar scroll effects
    let lastScroll = 0;
    const navbarHeight = navbar.offsetHeight;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.scrollY;
        
        // Hide/show navbar on scroll
        if (currentScroll > lastScroll && currentScroll > navbarHeight) {
            navbar.classList.add('hidden');
        } else {
            navbar.classList.remove('hidden');
        }
        lastScroll = currentScroll;
        
        // Scrolled state
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Section active state
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    
    // Initialize navbar state
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    }
    
    // Hover effect for nav items
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            if (!this.classList.contains('hire-me')) {
                this.style.transform = 'translateY(-3px)';
            }
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Touch devices hover fix
    function hasTouch() {
        return 'ontouchstart' in document.documentElement
            || navigator.maxTouchPoints > 0
            || navigator.msMaxTouchPoints > 0;
    }
    
    if (hasTouch()) {
        document.body.classList.add('touch-device');
    }
});
/*--------------------------------------------------------------------------------------------------------*/

document.addEventListener('DOMContentLoaded', function() {
    const projectSwipers = document.querySelectorAll('.project-swiper');
    
    projectSwipers.forEach(slider => {
        new Swiper(slider, {
            slidesPerView: 1,
            spaceBetween: 0,
            loop: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            navigation: {
                nextEl: slider.querySelector('.swiper-button-next'),
                prevEl: slider.querySelector('.swiper-button-prev'),
            },
            pagination: {
                el: slider.querySelector('.swiper-pagination'),
                clickable: true,
            }
        });
    });
});
/*********************************************************************************************** */
document.querySelector('.contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // التحقق من الحقول المطلوبة
  const inputs = this.querySelectorAll('[required]');
  let isValid = true;
  
  inputs.forEach(input => {
    if (!input.value.trim()) {
      input.style.borderColor = 'red';
      isValid = false;
    } else {
      input.style.borderColor = '#ddd';
    }
  });
  
  if (isValid) {
    const submitBtn = this.querySelector('.submit-btn');
    submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
    submitBtn.disabled = true;
    
    // هنا يمكنك إضافة كود إرسال النموذج
    setTimeout(() => {
      submitBtn.innerHTML = 'Message Sent <i class="fas fa-check"></i>';
      this.reset();
      setTimeout(() => {
        submitBtn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
        submitBtn.disabled = false;
      }, 2000);
    }, 1500);
  }
});

















document.querySelector('.contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const form = e.target;
  fetch(form.action, {
    method: 'POST',
    body: new FormData(form)
  })
  .then(response => {
    if(response.ok) {
      alert('Message sent successfully!');
      form.reset();
    } else {
      alert('Error sending message, please try again later.');
    }
  })
  .catch(error => {
    alert('Network error, please check your connection.');
  });
});
/*--------------------------------------------------------------------------------------------------*/
      // DOM Elements
        const navbar = document.getElementById('navbar');
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const sidebar = document.getElementById('sidebar');
        const sidebarOverlay = document.getElementById('sidebarOverlay');
        const sidebarClose = document.getElementById('sidebarClose');
        const navLinks = document.querySelectorAll('.nav-link');
        const body = document.body;

        // Debug log to check if elements are found
        console.log('Sidebar Close Button:', sidebarClose);
        console.log('Mobile Menu Button:', mobileMenuBtn);
        console.log('Sidebar:', sidebar);

        // Navbar scroll effect
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            lastScrollY = currentScrollY;
        });

        // Open sidebar function
        function openSidebar() {
            console.log('Opening sidebar...');
            sidebar.classList.add('active');
            sidebarOverlay.classList.add('active');
            body.classList.add('no-scroll');
            
            // Update button icon
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            }
        }

        // Close sidebar function
        function closeSidebar() {
            console.log('Closing sidebar...');
            sidebar.classList.remove('active');
            sidebarOverlay.classList.remove('active');
            body.classList.remove('no-scroll');
            
            // Update button icon
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }

        // Mobile menu toggle
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Mobile menu button clicked');
                openSidebar();
            });
        }

        // Close sidebar events - Multiple event listeners for better reliability
        if (sidebarClose) {
            sidebarClose.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Close button clicked');
                closeSidebar();
            });

            // Add additional event listener for better reliability
            sidebarClose.addEventListener('touchend', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Close button touched');
                closeSidebar();
            });
        }

        if (sidebarOverlay) {
            sidebarOverlay.addEventListener('click', (e) => {
                console.log('Overlay clicked');
                closeSidebar();
            });
        }

        // Active link management - Updated to handle both desktop and sidebar links
        function setActiveLink(targetId) {
            // Handle desktop navigation links
            const desktopLinks = document.querySelectorAll('.nav-menu .nav-link');
            desktopLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${targetId}`) {
                    link.classList.add('active');
                }
            });
            
            // Handle sidebar navigation links
            const sidebarNavLinks = document.querySelectorAll('.sidebar-menu .nav-link');
            sidebarNavLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${targetId}`) {
                    link.classList.add('active');
                }
            });
        }

        // Smooth scrolling and active link updates
        function handleLinkClick(link) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const targetId = link.getAttribute('href').substring(1);
                console.log('Link clicked:', targetId);
                
                // Skip if it's the hire link
                if (targetId === 'hire') {
                    console.log('Hire button clicked');
                    // Close sidebar first if open
                    if (sidebar.classList.contains('active')) {
                        closeSidebar();
                    }
                    return;
                }
                
                const targetSection = document.getElementById(targetId);
                console.log('Target section:', targetSection);
                
                if (targetSection) {
                    // Close sidebar first on mobile
                    if (sidebar.classList.contains('active')) {
                        closeSidebar();
                        // Wait for sidebar to close before scrolling
                        setTimeout(() => {
                            const navbarHeight = navbar.offsetHeight;
                            const targetPosition = targetSection.offsetTop - navbarHeight - 20;
                            
                            window.scrollTo({
                                top: targetPosition,
                                behavior: 'smooth'
                            });
                            
                            setActiveLink(targetId);
                        }, 300);
                    } else {
                        // Desktop - scroll immediately
                        const navbarHeight = navbar.offsetHeight;
                        const targetPosition = targetSection.offsetTop - navbarHeight - 20;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                        
                        setActiveLink(targetId);
                    }
                }
            });
        }

        // Apply event listeners to all navigation links
        navLinks.forEach(link => {
            handleLinkClick(link);
        });

        // Also handle sidebar links specifically
        const sidebarLinks = document.querySelectorAll('.sidebar-menu .nav-link');
        sidebarLinks.forEach(link => {
            handleLinkClick(link);
        });

        // Intersection Observer for active link updates
        const sections = document.querySelectorAll('section[id]');
        const observerOptions = {
            root: null,
            rootMargin: `-${navbar.offsetHeight + 50}px 0px -50% 0px`,
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveLink(entry.target.id);
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            observer.observe(section);
        });

        // Keyboard accessibility
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && sidebar.classList.contains('active')) {
                closeSidebar();
            }
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && sidebar.classList.contains('active')) {
                closeSidebar();
            }
        });

        // Touch events for better mobile experience
        let touchStartX = 0;
        let touchStartY = 0;

        if (sidebar) {
            sidebar.addEventListener('touchstart', (e) => {
                touchStartX = e.touches[0].clientX;
                touchStartY = e.touches[0].clientY;
            });

            sidebar.addEventListener('touchmove', (e) => {
                const touchX = e.touches[0].clientX;
                const touchY = e.touches[0].clientY;
                const deltaX = touchX - touchStartX;
                const deltaY = touchY - touchStartY;

                // If swipe right is detected and it's more horizontal than vertical
                if (deltaX > 50 && Math.abs(deltaX) > Math.abs(deltaY)) {
                    closeSidebar();
                }
            });
        }

        // Initialize
        document.addEventListener('DOMContentLoaded', () => {
            console.log('DOM Content Loaded');
            // Add fade-in animation to content
            const heroSection = document.querySelector('.hero-section');
            if (heroSection) {
                heroSection.classList.add('fade-in');
            }
        });