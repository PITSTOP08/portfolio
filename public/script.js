document.addEventListener('DOMContentLoaded', () => {
  // ------------------------------------------------------------------
  // Mobile Navigation Menu Toggle
  // ------------------------------------------------------------------
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
      });
    });
  }

  // ------------------------------------------------------------------
  // Image Lightbox (Click-to-Zoom View)
  // ------------------------------------------------------------------
  const lightbox = document.getElementById('image-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');
  const zoomableImages = document.querySelectorAll('.zoomable-img');

  if (lightbox && lightboxImg) {
    // Open Lightbox when clicking any shirt image
    zoomableImages.forEach(img => {
      img.addEventListener('click', (e) => {
        e.stopPropagation();
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || 'Shirt Design View';
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // Prevent page scrolling while open
      });
    });

    // Close Lightbox when clicking the 'X' button
    if (lightboxClose) {
      lightboxClose.addEventListener('click', closeLightbox);
    }

    // Close Lightbox when clicking anywhere on the backdrop
    lightbox.addEventListener('click', (e) => {
      if (e.target !== lightboxImg) {
        closeLightbox();
      }
    });

    // Close Lightbox when pressing the Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
      }
    });

    function closeLightbox() {
      lightbox.classList.remove('active');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = ''; // Restore normal scrolling
    }
  }

  // ------------------------------------------------------------------
  // Contact Form Submission Handler
  // ------------------------------------------------------------------
  const form = document.getElementById('contact-form');
  const statusText = document.getElementById('form-status');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !message) {
        statusText.textContent = 'Please fill in all required fields.';
        statusText.className = 'form-status error';
        return;
      }

      statusText.textContent = 'Sending message...';
      statusText.className = 'form-status info';

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, phone, message })
        });

        const data = await response.json();

        if (response.ok) {
          statusText.textContent = 'Message sent successfully!';
          statusText.className = 'form-status success';
          form.reset();
        } else {
          throw new Error(data.message || 'Failed to send message');
        }
      } catch (err) {
        statusText.textContent = err.message || 'An error occurred. Please try again.';
        statusText.className = 'form-status error';
      }
    });
  }
});