// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
    
    // Close menu when clicking on links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Waitlist Functionality
let waitlistCount = parseInt(localStorage.getItem('waitlistCount') || '0');

// Initialize waitlist counter on page load
document.addEventListener('DOMContentLoaded', function() {
    const waitlistCountElement = document.getElementById('waitlistCount');
    if (waitlistCountElement) {
        waitlistCountElement.textContent = waitlistCount;
    }
});

// Waitlist Form Functionality
document.addEventListener('DOMContentLoaded', function() {
    const waitlistForm = document.getElementById('waitlistForm');
    if (waitlistForm) {
        waitlistForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('userName').value;
            const email = document.getElementById('userEmail').value;
            const userType = document.getElementById('userType').value;
            
            if (!name || !email || !userType) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Check if email already exists in waitlist
            const existingWaitlist = JSON.parse(localStorage.getItem('waitlist') || '[]');
            const emailExists = existingWaitlist.some(user => user.email === email);
            
            if (emailExists) {
                showNotification('This email is already on the waitlist!', 'warning');
                return;
            }
            
            // Add to waitlist
            const newUser = {
                name: name,
                email: email,
                userType: userType,
                joinedAt: new Date().toISOString()
            };
            
            existingWaitlist.push(newUser);
            localStorage.setItem('waitlist', JSON.stringify(existingWaitlist));
            
            // Update counter
            waitlistCount = existingWaitlist.length;
            localStorage.setItem('waitlistCount', waitlistCount.toString());
            document.getElementById('waitlistCount').textContent = waitlistCount;
            
            // Reset form
            waitlistForm.reset();
            
            // Show success message
            showNotification(`Thank you ${name}! You've been added to the waitlist. We'll notify you when RedSync PH launches!`, 'success');
        });
    }
});

// Hero waitlist button
document.addEventListener('DOMContentLoaded', function() {
    const heroDownloadBtn = document.getElementById('heroDownloadBtn');
    if (heroDownloadBtn) {
        heroDownloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('waitlist').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }
});

// Legacy download button handling (if any remain)
document.addEventListener('DOMContentLoaded', function() {
    const downloadButtons = document.querySelectorAll('#downloadBtn, .btn-download');
    downloadButtons.forEach(button => {
        if (button) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                showNotification('RedSync PH is currently in development. Join our waitlist to be notified when it\'s ready!', 'info');
                document.getElementById('waitlist').scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            });
        }
    });
});

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const icon = type === 'success' ? 'check-circle' : 
                 type === 'error' ? 'exclamation-circle' : 
                 type === 'warning' ? 'exclamation-triangle' : 'info-circle';
    
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${icon}"></i>
            <span>${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
    
    // Trigger animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
}

// Animation on scroll for elements
function animateOnScroll() {
    const elements = document.querySelectorAll('.feature-card, .challenge-card, .stat-card, .team-member');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', animateOnScroll);