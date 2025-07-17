document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const themeIcon = themeToggle.querySelector('i');
    
    // Function to check if it's after 6:30 PM in user's local time
    function isAfterEveningTime() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        
        // Return true if time is at or after 18:30 (6:30 PM)
        return hours > 18 || (hours === 18 && minutes >= 30);
    }
    
    // Function to get the appropriate theme based on time and saved preference
    function getInitialTheme() {
        // If user has explicitly set a theme preference, use that
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme;
        }
        
        // If it's after 6:30 PM, use dark theme
        if (isAfterEveningTime()) {
            return 'dark';
        }
        
        // Otherwise, use system preference or default to light
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    
    // Apply the initial theme
    const initialTheme = getInitialTheme();
    setTheme(initialTheme);
    
    // Theme toggle click handler
    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        
        // Save user's explicit preference
        localStorage.setItem('theme', newTheme);
        
        // Set a flag indicating user has manually set the theme
        localStorage.setItem('theme_manually_set', 'true');
    });
    
    // Function to set theme
    function setTheme(theme) {
        htmlElement.setAttribute('data-theme', theme);
        
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-sun';
        } else {
            themeIcon.className = 'fas fa-moon';
        }
    }
    
    // Check time every minute to automatically switch to dark mode after 6:30 PM
    // but only if user hasn't manually set a preference
    function checkTimeAndUpdateTheme() {
        const userManuallySet = localStorage.getItem('theme_manually_set') === 'true';
        
        // Only auto-switch if user hasn't set a preference manually
        if (!userManuallySet) {
            const shouldBeDark = isAfterEveningTime();
            const currentTheme = htmlElement.getAttribute('data-theme');
            
            if (shouldBeDark && currentTheme !== 'dark') {
                setTheme('dark');
            } else if (!shouldBeDark && currentTheme !== 'light') {
                setTheme('light');
            }
        }
    }
    
    // Check time initially and then every minute
    checkTimeAndUpdateTheme();
    setInterval(checkTimeAndUpdateTheme, 60000); // Check every minute
    
    // Scroll Progress Indicator
    const scrollProgress = document.querySelector('.scroll-progress');
    
    function updateScrollProgress() {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;
        scrollProgress.style.width = scrollPercentage + '%';
    }
    
    window.addEventListener('scroll', updateScrollProgress);
    
    // Animated Background
    const animatedBg = document.querySelector('.animated-bg');
    
    function createAnimatedBackground() {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const gradientColor1 = currentTheme === 'dark' ? 'rgba(79, 70, 229, 0.2)' : 'rgba(79, 70, 229, 0.1)';
        const gradientColor2 = currentTheme === 'dark' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(16, 185, 129, 0.1)';
        
        animatedBg.style.background = `
            radial-gradient(circle at ${Math.random() * 100}% ${Math.random() * 100}%, ${gradientColor1} 0%, transparent 50%),
            radial-gradient(circle at ${Math.random() * 100}% ${Math.random() * 100}%, ${gradientColor2} 0%, transparent 50%),
            radial-gradient(circle at ${Math.random() * 100}% ${Math.random() * 100}%, ${gradientColor1} 0%, transparent 50%),
            radial-gradient(circle at ${Math.random() * 100}% ${Math.random() * 100}%, ${gradientColor2} 0%, transparent 50%)
        `;
    }
    
    // Create initial background
    createAnimatedBackground();
    
    // Update background every 10 seconds
    setInterval(createAnimatedBackground, 10000);
    
    // Floating Action Button
    const floatingActionBtn = document.getElementById('floating-action-btn');
    const floatingMenu = document.getElementById('floating-menu');
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    const sharePortfolioBtn = document.getElementById('share-portfolio');
    const downloadResumeBtn = document.getElementById('download-resume');
    const printPortfolioBtn = document.getElementById('print-portfolio');
    
    // Toggle floating menu
    floatingActionBtn.addEventListener('click', () => {
        floatingMenu.classList.toggle('active');
        floatingActionBtn.querySelector('i').classList.toggle('fa-plus');
        floatingActionBtn.querySelector('i').classList.toggle('fa-times');
    });
    
    // Scroll to top
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Share portfolio
    sharePortfolioBtn.addEventListener('click', () => {
        if (navigator.share) {
            navigator.share({
                title: 'Samuel Nnanna - DevOps Engineer',
                text: 'Check out Samuel Nnanna\'s DevOps Engineer portfolio',
                url: window.location.href
            })
            .catch(error => console.log('Error sharing:', error));
        } else {
            // Fallback for browsers that don't support Web Share API
            const tempInput = document.createElement('input');
            document.body.appendChild(tempInput);
            tempInput.value = window.location.href;
            tempInput.select();
            document.execCommand('copy');
            document.body.removeChild(tempInput);
            
            alert('Portfolio URL copied to clipboard!');
        }
    });
    
    // Download resume
    downloadResumeBtn.addEventListener('click', () => {
        const resumeLink = document.querySelector('.download-btn');
        if (resumeLink) {
            resumeLink.click();
        }
    });
    
    // Print portfolio
    printPortfolioBtn.addEventListener('click', () => {
        window.print();
    });

    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add animation to skill badges
    const skillBadges = document.querySelectorAll('.skill-badge');
    skillBadges.forEach((badge, index) => {
        badge.style.animationDelay = `${index * 0.1}s`;
    });

    // Add hover effect to project cards
    const projectCards = document.querySelectorAll('.card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Simple typing effect for the header
    const headerTitle = document.querySelector('h1');
    const originalText = headerTitle.textContent;
    headerTitle.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < originalText.length) {
            headerTitle.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Start the typing effect after a short delay
    setTimeout(typeWriter, 500);

    // The contact form is now handled by Formspree
    // No need to prevent default form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        // Add loading state when form is submitted
        contactForm.addEventListener('submit', function() {
            const submitBtn = document.querySelector('.submit-btn');
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Form will be submitted to Formspree which will send the email
            // The page will redirect to the thank you page specified in the form's _next parameter
        });
    }

    // Add counter animation to achievement numbers
    const achievementCards = document.querySelectorAll('.achievement-card h3');
    
    const animateValue = (obj, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            
            // Extract the number from the text
            const text = obj.textContent;
            const match = text.match(/(\d+)([%]?)/);
            
            if (match) {
                const prefix = text.substring(0, match.index);
                const suffix = match[2] + text.substring(match.index + match[0].length);
                obj.textContent = prefix + value + suffix;
            }
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };
    
    // Animate skill progress bars
    const animateSkillBars = () => {
        const skillBars = document.querySelectorAll('.skill-progress-fill');
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width') + '%';
            // Initially set width to 0
            bar.style.width = '0%';
            
            // Animate to the target width
            setTimeout(() => {
                bar.style.width = width;
            }, 200);
        });
    };
    
    // Intersection Observer to trigger animations when elements come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // For achievement numbers
                if (entry.target.tagName === 'H3') {
                    const text = entry.target.textContent;
                    const match = text.match(/(\d+)([%]?)/);
                    
                    if (match) {
                        const number = parseInt(match[1]);
                        animateValue(entry.target, 0, number, 1500);
                    }
                }
                // For skill progress container
                else if (entry.target.classList.contains('skill-progress-container')) {
                    animateSkillBars();
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    // Observe achievement cards and skill progress container
    achievementCards.forEach(card => {
        observer.observe(card);
    });
    
    const skillProgressContainer = document.querySelector('.skill-progress-container');
    if (skillProgressContainer) {
        observer.observe(skillProgressContainer);
    }

    console.log('Portfolio loaded successfully with theme support');
});   
 // Testimonial Read More/Less functionality
    const testimonialToggles = document.querySelectorAll('.testimonial-toggle');
    
    testimonialToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const testimonialContent = this.closest('.testimonial-content');
            const fullText = testimonialContent.querySelector('.testimonial-full');
            
            if (fullText.style.display === 'none') {
                fullText.style.display = 'block';
                this.textContent = 'Read Less';
            } else {
                fullText.style.display = 'none';
                this.textContent = 'Read More';
            }
        });
    });