document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navMenu = document.querySelector('nav ul');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('show');
        });
    }

    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentTestimonial = 0;

    // Hide all testimonials except the first one
    function initTestimonials() {
        testimonials.forEach((testimonial, index) => {
            if (index !== 0) {
                testimonial.style.display = 'none';
            }
        });
    }

    // Show the current testimonial and hide the others
    function showTestimonial(index) {
        testimonials.forEach(testimonial => {
            testimonial.style.display = 'none';
        });
        testimonials[index].style.display = 'block';
    }

    // Initialize the testimonials
    if (testimonials.length > 0) {
        initTestimonials();

        // Previous button click
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                currentTestimonial--;
                if (currentTestimonial < 0) {
                    currentTestimonial = testimonials.length - 1;
                }
                showTestimonial(currentTestimonial);
            });
        }

        // Next button click
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                currentTestimonial++;
                if (currentTestimonial >= testimonials.length) {
                    currentTestimonial = 0;
                }
                showTestimonial(currentTestimonial);
            });
        }

        // Auto-slide testimonials every 5 seconds
        setInterval(function() {
            currentTestimonial++;
            if (currentTestimonial >= testimonials.length) {
                currentTestimonial = 0;
            }
            showTestimonial(currentTestimonial);
        }, 5000);
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('header nav a, .hero a, .about-text a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu.classList.contains('show')) {
                    navMenu.classList.remove('show');
                }
            }
        });
    });

    // Form submission
    const contactForm = document.getElementById('inquiry-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const tripType = document.getElementById('trip-type').value;
            const message = document.getElementById('message').value;
            
            // In a real application, you would send this data to a server
            console.log('Form submitted:', { name, email, tripType, message });
            
            // Show success message
            alert('Thank you for your inquiry! We will contact you soon.');
            
            // Reset form
            contactForm.reset();
        });
    }

    // Scroll animations
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        sections.forEach(section => {
            // If section is in viewport
            if (section.offsetTop - 300 <= scrollPosition && 
                section.offsetTop + section.offsetHeight > scrollPosition) {
                // Add animation class
                section.classList.add('animate');
            }
        });
    });

    // Add animation class to the header when scrolling down
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Add CSS for new dynamic classes
    const style = document.createElement('style');
    style.textContent = `
        nav ul.show {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 60px;
            left: 0;
            width: 100%;
            background-color: white;
            box-shadow: 0 5px 10px rgba(0,0,0,0.1);
            padding: 20px;
            z-index: 999;
        }
        
        nav ul.show li {
            margin: 10px 0;
        }
        
        header.scrolled {
            background-color: rgba(255,255,255,0.98);
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        
        section.animate {
            animation: fadeInUp 0.8s ease forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);

    // Initialize animation for visible sections
    window.dispatchEvent(new Event('scroll'));
});