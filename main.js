// Initialize AOS
AOS.init({
    duration: 800,
    once: true
});

// Mobile menu toggle
function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('hidden');
}

// Close mobile menu when clicking a link
document.querySelectorAll('#mobileMenu a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('mobileMenu').classList.add('hidden');
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Initialize EmailJS with your public key
(function () {
    emailjs.init("v0vx3vl2-PlebgYyD"); // Replace with your actual public key
})();

// Generic function to close any modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.add('hidden');
}

// Generic function to show any modal
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('hidden');
    // Refresh AOS for the modal content
    AOS.refresh();
}

// Form submission handler
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form values
    const name = e.target.name.value;
    const email = e.target.email.value;
    const message = e.target.message.value;

    // Show loading state
    showModal('loadingModal');

    // Send email using EmailJS
    emailjs.send("service_xt3h4k8", "template_6v6uue7", {
        from_name: name,
        from_email: email,
        message: message
    }).then(
        function (response) {
            // Hide loading modal
            closeModal('loadingModal');
            // Show success modal
            showModal('successModal');
            console.log("SUCCESS!", response.status, response.text);
            e.target.reset();
        },
        function (error) {
            // Hide loading modal
            closeModal('loadingModal');
            // Show error modal
            showModal('errorModal');
            console.log("FAILED...", error);
        }
    );
});

// Close button handlers
document.getElementById('closeSuccess').addEventListener('click', () => closeModal('successModal'));
document.getElementById('closeError').addEventListener('click', () => closeModal('errorModal'));

// Close modals when clicking outside
document.addEventListener('click', function (e) {
    const modals = ['successModal', 'errorModal', 'loadingModal'];

    modals.forEach(modalId => {
        const modal = document.getElementById(modalId);
        if (e.target === modal) {
            closeModal(modalId);
        }
    });
});

// Close modals with Escape key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        const modals = ['successModal', 'errorModal'];
        modals.forEach(modalId => closeModal(modalId));
    }
});


// Scroll-based animations for skill bars
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.width = entry.target.getAttribute('data-width');
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.skill-bar').forEach(bar => {
    observer.observe(bar);
});

window.onload = () => {
    lucide.createIcons();
};

// Close Success Modal
document.getElementById('closeSuccess').addEventListener('click', function () {
    document.getElementById('successModal').classList.add('hidden');
});

// Close Error Modal
document.getElementById('closeError').addEventListener('click', function () {
    document.getElementById('errorModal').classList.add('hidden');
});
