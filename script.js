document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Navigation Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navActions = document.querySelector('.nav-actions');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            // For a production app, we would toggle a class to show a mobile menu overlay.
            // Simulating basic toggle here for demonstration:
            const displayStyle = window.getComputedStyle(navLinks).display;
            if (displayStyle === 'none') {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.right = '0';
                navLinks.style.background = 'rgba(247, 244, 241, 0.98)';
                navLinks.style.padding = '2rem';
                navLinks.style.borderBottom = '1px solid rgba(0,0,0,0.1)';
                
                navActions.style.display = 'flex';
                navActions.style.position = 'absolute';
                navActions.style.top = 'calc(100% + 200px)';
                navActions.style.left = '0';
                navActions.style.right = '0';
                navActions.style.justifyContent = 'center';
                navActions.style.padding = '1rem';
                navActions.style.background = 'rgba(247, 244, 241, 0.98)';
            } else {
                navLinks.style.display = '';
                navActions.style.display = '';
            }
        });
    }

    // 2. Navbar Scroll Effect (Subtle shadow on scroll)
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.05)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });

    // 3. Scroll Reveal Animations using IntersectionObserver
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once revealed
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-up');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // 4. FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const answer = question.nextElementSibling;
            const icon = question.querySelector('.faq-icon');

            // Toggle active class
            faqItem.classList.toggle('active');

            // Toggle answer visibility
            if (faqItem.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                icon.textContent = '-';
            } else {
                answer.style.maxHeight = '0';
                icon.textContent = '+';
            }

            // Close other open items
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== question) {
                    const otherItem = otherQuestion.parentElement;
                    const otherAnswer = otherQuestion.nextElementSibling;
                    const otherIcon = otherQuestion.querySelector('.faq-icon');

                    otherItem.classList.remove('active');
                    otherAnswer.style.maxHeight = '0';
                    otherIcon.textContent = '+';
                }
            });
        });
    });
});
