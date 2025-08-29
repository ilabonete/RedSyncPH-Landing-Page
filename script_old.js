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

// Download Button Functionality - Updated to Waitlist
let waitlistCount = parseInt(localStorage.getItem('waitlistCount') || '0');
document.getElementById('waitlistCount').textContent = waitlistCount;

// Waitlist Form Functionality
document.getElementById('waitlistForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('userName').value;
    const email = document.getElementById('userEmail').value;
    const userType = document.getElementById('userType').value;
    
    if (!name || !email || !userType) {
        showNotification('Please fill in all fields', 'error');
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
    document.getElementById('waitlistForm').reset();
    
    // Show success message
    showNotification(`Thank you ${name}! You've been added to the waitlist. We'll notify you when RedSync PH launches!`, 'success');
});

// Hero waitlist button
document.getElementById('heroDownloadBtn').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('waitlist').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
});

// Legacy download button handling (if any remain)
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

// Notification System
                            <i class="fas fa-shield-alt"></i>
                            <span>Secure APK Distribution</span>
                        </div>
                    </div>
                    
                    <div class="system-requirements">
                        <h5>System Requirements:</h5>
                        <ul>
                            <li>Android 6.0 (API level 23) or higher</li>
                            <li>Minimum 100MB storage space</li>
                            <li>Internet connection for initial setup</li>
                            <li>Optional: Camera for QR code scanning</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary modal-close-btn">Close</button>
                <button class="btn btn-primary" onclick="window.location.href='mailto:redsync.ph@gmail.com?subject=RedSync PH APK Request'">
                    <i class="fas fa-envelope"></i> Request APK
                </button>
            </div>
        </div>
    `;
    
    // Add modal styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease-out;
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Close modal functionality
    const closeModal = () => {
        modal.style.animation = 'fadeOut 0.3s ease-out forwards';
        setTimeout(() => {
            document.body.removeChild(modal);
            document.body.style.overflow = 'auto';
        }, 300);
    };
    
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.querySelector('.modal-close-btn').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10B981' : '#3B82F6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.75rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        max-width: 400px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', function() {
        notification.style.animation = 'slideOutRight 0.3s ease-out forwards';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-out forwards';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add animation keyframes to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0.25rem;
        border-radius: 50%;
        transition: background-color 0.2s ease;
    }
    
    .notification-close:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }
    
    /* Download Modal Styles */
    .modal-content {
        background: white;
        border-radius: 1rem;
        max-width: 600px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        animation: slideInUp 0.3s ease-out;
    }
    
    @keyframes slideInUp {
        from {
            transform: translateY(50px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 2rem 2rem 1rem;
        border-bottom: 1px solid #E5E7EB;
    }
    
    .modal-header h3 {
        color: #DC2626;
        margin: 0;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .modal-close {
        background: none;
        border: none;
        font-size: 1.5rem;
        color: #6B7280;
        cursor: pointer;
        padding: 0.5rem;
        border-radius: 50%;
        transition: all 0.2s ease;
    }
    
    .modal-close:hover {
        background-color: #F3F4F6;
        color: #DC2626;
    }
    
    .modal-body {
        padding: 2rem;
    }
    
    .download-info {
        text-align: center;
    }
    
    .app-icon-large {
        width: 80px;
        height: 80px;
        background: linear-gradient(135deg, #DC2626, #EF4444);
        border-radius: 1.25rem;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 1.5rem;
    }
    
    .app-icon-large i {
        font-size: 2.5rem;
        color: white;
    }
    
    .download-info h4 {
        color: #111827;
        margin-bottom: 1rem;
    }
    
    .download-info p {
        color: #6B7280;
        margin-bottom: 2rem;
    }
    
    .contact-options {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-bottom: 2rem;
        text-align: left;
    }
    
    .contact-item {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 1rem;
        background: #F9FAFB;
        border-radius: 0.5rem;
        border-left: 4px solid #DC2626;
    }
    
    .contact-item i {
        color: #DC2626;
        width: 20px;
        text-align: center;
    }
    
    .contact-item span {
        color: #374151;
        font-weight: 500;
    }
    
    .system-requirements {
        background: #F3F4F6;
        padding: 1.5rem;
        border-radius: 0.75rem;
        text-align: left;
        margin-top: 2rem;
    }
    
    .system-requirements h5 {
        color: #111827;
        margin-bottom: 1rem;
        font-weight: 600;
    }
    
    .system-requirements ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    
    .system-requirements li {
        padding: 0.5rem 0;
        color: #6B7280;
        border-bottom: 1px solid #E5E7EB;
        position: relative;
        padding-left: 1.5rem;
    }
    
    .system-requirements li:last-child {
        border-bottom: none;
    }
    
    .system-requirements li::before {
        content: "✓";
        position: absolute;
        left: 0;
        color: #10B981;
        font-weight: bold;
    }
    
    .modal-footer {
        display: flex;
        justify-content: flex-end;
        gap: 1rem;
        padding: 1rem 2rem 2rem;
        border-top: 1px solid #E5E7EB;
    }
    
    /* Mobile Navigation Styles */
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            top: 80px;
            left: -100%;
            width: 100%;
            height: calc(100vh - 80px);
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(10px);
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            padding-top: 2rem;
            transition: left 0.3s ease;
            border-top: 1px solid rgba(220, 38, 38, 0.1);
        }
        
        .nav-menu.active {
            left: 0;
        }
        
        .nav-menu a {
            font-size: 1.2rem;
            margin: 1rem 0;
        }
        
        .nav-toggle.active span:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .nav-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .nav-toggle.active span:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
        
        .modal-content {
            width: 95%;
            margin: 1rem;
        }
        
        .modal-header, .modal-body, .modal-footer {
            padding: 1.5rem;
        }
        
        .contact-options {
            gap: 0.75rem;
        }
        
        .modal-footer {
            flex-direction: column;
        }
        
        .modal-footer .btn {
            width: 100%;
            justify-content: center;
        }
    }
`;
document.head.appendChild(style);

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = entry.target.dataset.animation || 'fadeInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.feature-card, .detail-item, .stat-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
});

// Phone Mockup Interactive Demo
document.addEventListener('DOMContentLoaded', function() {
    const phoneMockup = document.querySelector('.phone-mockup');
    const appContent = document.querySelector('.app-content');
    
    if (phoneMockup && appContent) {
        const features = [
            {
                icon: 'fas fa-calculator',
                title: 'Dosage Calculator',
                description: 'Quick risk assessment and dosage estimation'
            },
            {
                icon: 'fas fa-tint',
                title: 'Bleed Tracker',
                description: 'Log symptoms and get emergency guidance'
            },
            {
                icon: 'fas fa-map-marker-alt',
                title: 'Clinic Locator',
                description: 'Find nearby clinics and drug outlets'
            },
            {
                icon: 'fas fa-robot',
                title: 'AI Assistant',
                description: '24/7 health guidance and support'
            }
        ];
        
        let currentFeature = 0;
        
        function updateFeature() {
            const feature = features[currentFeature];
            appContent.innerHTML = `
                <div class="feature-icon">
                    <i class="${feature.icon}"></i>
                </div>
                <h4>${feature.title}</h4>
                <p>${feature.description}</p>
            `;
            currentFeature = (currentFeature + 1) % features.length;
        }
        
        // Auto-rotate features every 3 seconds
        setInterval(updateFeature, 3000);
    }
});

// Form Validation (if you add contact forms later)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Progressive Enhancement: Add hover effects for touch devices
if ('ontouchstart' in window) {
    document.addEventListener('touchstart', function() {}, {passive: true});
}

// Performance: Lazy load images (if you add more images)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Error handling for the download process
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // You could show a user-friendly error message here
});

// Service Worker registration (for offline functionality if needed)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment when you have a service worker file
        // navigator.serviceWorker.register('/sw.js')
        //     .then(function(registration) {
        //         console.log('SW registered: ', registration);
        //     })
        //     .catch(function(registrationError) {
        //         console.log('SW registration failed: ', registrationError);
        //     });
    });
}
