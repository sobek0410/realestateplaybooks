/* =====================================================
   AI Deal Hunter - Opt-in Page JavaScript
   Minimal functionality for easy GHL recreation
   ===================================================== */

(function() {
    'use strict';

    // Form handling
    const form = document.getElementById('optinForm');

    if (form) {
        form.addEventListener('submit', function(e) {
            // In production, this would be replaced by GHL form handling
            // For demo purposes, we'll just show a simple alert

            // Uncomment the line below to prevent default for testing
            // e.preventDefault();

            const firstName = document.getElementById('firstName').value;
            const email = document.getElementById('email').value;

            // Basic validation (HTML5 handles most of this)
            if (!firstName.trim() || !email.trim()) {
                return;
            }

            // You can add custom handling here
            // For GHL, you would replace this form's action attribute
            // with your GHL form submission URL

            console.log('Form submitted:', { firstName, email });
        });
    }

    // Optional: Add subtle animation on page load
    document.addEventListener('DOMContentLoaded', function() {
        // Add loaded class for any entrance animations
        document.body.classList.add('loaded');
    });

})();
