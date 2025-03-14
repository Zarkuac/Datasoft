// Set current year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mainNav = document.querySelector('.main-nav');

if (mobileMenuBtn && mainNav) {
    // Stop propagation on the menu itself to prevent immediate closing
    mainNav.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    mobileMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent document click from immediately closing menu
        mainNav.classList.toggle('active');
        
        // Update icon to show open/closed state
        const icon = mobileMenuBtn.querySelector('i');
        if (mainNav.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', () => {
        if (mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for header height
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (window.innerWidth < 768 && mainNav) {
                mainNav.classList.remove('active');
                // Reset the burger icon
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
});

// Add scroll event for header shadow
const header = document.querySelector('.header');
if (header) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    });
}

// Simple animation for elements when they come into view
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-card, .feature-card, .testimonial-card');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Set initial styles for animation
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.service-card, .feature-card, .testimonial-card');
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run once on load
    animateOnScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', animateOnScroll);
});

// Modal functionality
const modal = document.getElementById('contact-modal');
const contactBtn = document.querySelector('a[href="#contact-form"]');
const closeModal = document.querySelector('.close-modal');
const contactForm = document.getElementById('contact-form');

// Open modal
contactBtn.addEventListener('click', (e) => {
    e.preventDefault();
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
});

// Close modal
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Re-enable scrolling
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Handle form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        company: document.getElementById('company').value
    };
    
    // Here you would typically send the data to your server
    console.log('Form submitted:', formData);
    
    // Show success message (you can customize this)
    alert('Thank you for your message. We will contact you soon!');
    
    // Reset form and close modal
    contactForm.reset();
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});