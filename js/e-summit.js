/* E-Summit Page JavaScript */

// State Management
const summitState = {
  timelineVisible: false,
  testimonialIndex: 0,
  testimonials: [],
  formData: {},
  registrationOpen: true
};

// Initialize Summit Page
document.addEventListener('DOMContentLoaded', function() {
  initializeSummitPage();
});

function initializeSummitPage() {
  initializeAnimations();
  initializeTimeline();
  initializeTestimonials();
  initializeRegistrationForm();
  initializeCountdowns();
  initializeScrollEffects();
  loadTestimonialData();
  
  console.log('E-Summit page initialized');
}

// Timeline Animations
function initializeTimeline() {
  const timelineItems = document.querySelectorAll('.timeline-item');
  const markers = document.querySelectorAll('.marker-content');

  // Add intersection observer for timeline items
  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        animateTimelineItem(entry.target);
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '-50px'
  });

  timelineItems.forEach(item => {
    item.classList.add('fade-in-up');
    timelineObserver.observe(item);
  });

  // Add click handlers to timeline items
  timelineItems.forEach((item, index) => {
    item.addEventListener('click', () => expandTimelineItem(item, index));
  });

  // Animate markers with staggered delay
  setTimeout(() => {
    markers.forEach((marker, index) => {
      setTimeout(() => {
        marker.classList.add('animate');
        marker.style.animation = `marker-drop 0.8s ease-out ${index * 0.2}s both, marker-pulse 2s ease-in-out ${index * 0.2 + 1}s infinite`;
      }, index * 200);
    });
  }, 500);
}

function animateTimelineItem(item) {
  const card = item.querySelector('.timeline-card');
  const events = item.querySelectorAll('.event-item');
  
  if (card) {
    card.style.animation = 'slideInScale 0.8s ease-out both';
  }

  // Stagger animate events
  events.forEach((event, index) => {
    setTimeout(() => {
      event.style.opacity = '0';
      event.style.transform = 'translateX(-30px)';
      event.style.transition = 'all 0.5s ease-out';
      
      setTimeout(() => {
        event.style.opacity = '1';
        event.style.transform = 'translateX(0)';
      }, 50);
    }, index * 100);
  });
}

function expandTimelineItem(item, index) {
  const allItems = document.querySelectorAll('.timeline-item');
  const card = item.querySelector('.timeline-card');
  
  // Remove expanded state from all items
  allItems.forEach(otherItem => {
    otherItem.classList.remove('expanded');
  });

  // Add expanded state to clicked item
  item.classList.add('expanded');
  
  // Add bounce effect
  card.style.animation = 'timelineCardBounce 0.6s ease-out';
  
  // Track analytics
  trackEvent('Timeline Item Clicked', {
    day: index + 1,
    timestamp: new Date().toISOString()
  });
}

// Testimonials Carousel
function initializeTestimonials() {
  const track = document.querySelector('.testimonial-track');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  const indicators = document.querySelector('.carousel-indicators');

  if (!track) return;

  // Initialize carousel controls
  if (prevBtn) prevBtn.addEventListener('click', () => moveTestimonial('prev'));
  if (nextBtn) nextBtn.addEventListener('click', () => moveTestimonial('next'));

  // Auto-play carousel
  setInterval(() => {
    if (summitState.testimonials.length > 0) {
      moveTestimonial('next');
    }
  }, 5000);

  // Initialize touch/swipe support
  initializeTouchSupport();
}

function loadTestimonialData() {
  // Testimonial data
  summitState.testimonials = [
    {
      id: 1,
      quote: "The E-Summit was a transformative experience that connected me with incredible mentors and fellow entrepreneurs. The networking opportunities alone were worth the investment.",
      author: "Priya Sharma",
      role: "Founder, TechStart Solutions",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b4ac?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 2,
      quote: "Outstanding speakers, practical workshops, and real-world insights. This summit gave me the confidence and knowledge to launch my startup successfully.",
      author: "Rahul Mehta",
      role: "CEO, InnovateLab",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 3,
      quote: "The pitch competition was intense but incredibly rewarding. The feedback from industry experts helped refine our business model significantly.",
      author: "Anita Patel",
      role: "Co-founder, EcoVenture",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 4,
      quote: "From ideation to execution, every session was packed with actionable insights. The mentor-matching program connected me with the perfect advisor for my venture.",
      author: "Vikash Kumar",
      role: "Entrepreneur, FinTech Innovations",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
    }
  ];

  renderTestimonials();
  createIndicators();
}

function renderTestimonials() {
  const track = document.querySelector('.testimonial-track');
  if (!track) return;

  track.innerHTML = summitState.testimonials.map((testimonial, index) => `
    <div class="testimonial-card ${index === 0 ? 'active' : ''}">
      <div class="testimonial-content">
        <div class="quote-icon">💬</div>
        <p>"${testimonial.quote}"</p>
        <div class="testimonial-author">
          <img src="${testimonial.image}" alt="${testimonial.author}">
          <div class="author-info">
            <h4>${testimonial.author}</h4>
            <span>${testimonial.role}</span>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  updateTestimonialDisplay();
}

function createIndicators() {
  const indicatorContainer = document.querySelector('.carousel-indicators');
  if (!indicatorContainer) return;

  indicatorContainer.innerHTML = summitState.testimonials.map((_, index) => `
    <div class="indicator ${index === 0 ? 'active' : ''}" data-index="${index}"></div>
  `).join('');

  // Add click handlers
  indicatorContainer.querySelectorAll('.indicator').forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      summitState.testimonialIndex = index;
      updateTestimonialDisplay();
    });
  });
}

function moveTestimonial(direction) {
  const totalTestimonials = summitState.testimonials.length;
  
  if (direction === 'next') {
    summitState.testimonialIndex = (summitState.testimonialIndex + 1) % totalTestimonials;
  } else {
    summitState.testimonialIndex = summitState.testimonialIndex === 0 ? totalTestimonials - 1 : summitState.testimonialIndex - 1;
  }

  updateTestimonialDisplay();
  
  // Track carousel interaction
  trackEvent('Testimonial Carousel', {
    direction,
    index: summitState.testimonialIndex
  });
}

function updateTestimonialDisplay() {
  const track = document.querySelector('.testimonial-track');
  const indicators = document.querySelectorAll('.indicator');
  const cards = document.querySelectorAll('.testimonial-card');

  if (track) {
    track.style.transform = `translateX(-${summitState.testimonialIndex * 100}%)`;
  }

  // Update indicators
  indicators.forEach((indicator, index) => {
    indicator.classList.toggle('active', index === summitState.testimonialIndex);
  });

  // Update card states
  cards.forEach((card, index) => {
    card.classList.toggle('active', index === summitState.testimonialIndex);
  });
}

function initializeTouchSupport() {
  const carousel = document.querySelector('.testimonials-carousel');
  if (!carousel) return;

  let startX = 0;
  let isDragging = false;

  carousel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
  });

  carousel.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
  });

  carousel.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    
    if (Math.abs(diff) > 50) { // Minimum swipe distance
      moveTestimonial(diff > 0 ? 'next' : 'prev');
    }
    
    isDragging = false;
  });
}

// Registration Form
function initializeRegistrationForm() {
  const form = document.querySelector('.registration-form');
  if (!form) return;

  // Initialize form validation
  const inputs = form.querySelectorAll('input, select');
  inputs.forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => clearFieldError(input));
  });

  // Form submission
  form.addEventListener('submit', handleRegistrationSubmit);

  // Real-time form validation
  form.addEventListener('input', updateFormProgress);
  
  // Initialize pricing updates
  initializePricingLogic();
}

function validateField(field) {
  const value = field.value.trim();
  const fieldName = field.name;
  let isValid = true;
  let errorMessage = '';

  // Remove existing error styling
  clearFieldError(field);

  switch (fieldName) {
    case 'name':
      if (value.length < 2) {
        isValid = false;
        errorMessage = 'Name must be at least 2 characters long';
      }
      break;
    case 'email':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
      }
      break;
    case 'phone':
      const phoneRegex = /^[\d\s\+\-\(\)]{10,}$/;
      if (!phoneRegex.test(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid phone number';
      }
      break;
    case 'college':
      if (value.length < 3) {
        isValid = false;
        errorMessage = 'College name must be at least 3 characters long';
      }
      break;
    case 'experience':
    case 'tshirt':
    case 'accommodation':
      if (!value) {
        isValid = false;
        errorMessage = 'Please make a selection';
      }
      break;
  }

  if (!isValid) {
    showFieldError(field, errorMessage);
  }

  return isValid;
}

function showFieldError(field, message) {
  field.classList.add('error');
  
  let errorDiv = field.parentNode.querySelector('.field-error');
  if (!errorDiv) {
    errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    field.parentNode.appendChild(errorDiv);
  }
  
  errorDiv.textContent = message;
  errorDiv.style.color = 'var(--accent-red)';
  errorDiv.style.fontSize = 'var(--font-size-sm)';
  errorDiv.style.marginTop = 'var(--spacing-xs)';
}

function clearFieldError(field) {
  field.classList.remove('error');
  const errorDiv = field.parentNode.querySelector('.field-error');
  if (errorDiv) {
    errorDiv.remove();
  }
}

function updateFormProgress() {
  const form = document.querySelector('.registration-form');
  const requiredFields = form.querySelectorAll('input[required], select[required]');
  const filledFields = Array.from(requiredFields).filter(field => field.value.trim());
  
  const progress = (filledFields.length / requiredFields.length) * 100;
  
  // Update submit button state
  const submitBtn = form.querySelector('.btn-register');
  if (progress === 100) {
    submitBtn.textContent = 'Complete Registration 🚀';
    submitBtn.classList.add('ready');
  } else {
    submitBtn.textContent = `Complete Registration (${Math.round(progress)}%)`;
    submitBtn.classList.remove('ready');
  }
}

function initializePricingLogic() {
  const accommodationSelect = document.querySelector('select[name="accommodation"]');
  const priceAmount = document.querySelector('.amount');
  
  if (accommodationSelect && priceAmount) {
    accommodationSelect.addEventListener('change', updatePricing);
  }
}

function updatePricing() {
  const accommodation = document.querySelector('select[name="accommodation"]').value;
  const priceAmount = document.querySelector('.amount');
  
  let basePrice = 1999;
  let finalPrice = basePrice;
  
  if (accommodation === 'yes') {
    finalPrice += 800;
  }
  
  if (priceAmount) {
    priceAmount.textContent = finalPrice;
    
    // Add price change animation
    priceAmount.style.animation = 'priceUpdate 0.5s ease-out';
    setTimeout(() => {
      priceAmount.style.animation = '';
    }, 500);
  }
}

async function handleRegistrationSubmit(e) {
  e.preventDefault();
  
  const form = e.target;
  const formData = new FormData(form);
  const submitBtn = form.querySelector('.btn-register');
  
  // Validate all fields
  const inputs = form.querySelectorAll('input[required], select[required]');
  let isFormValid = true;
  
  inputs.forEach(input => {
    if (!validateField(input)) {
      isFormValid = false;
    }
  });
  
  // Check agreement checkbox
  const agreementCheckbox = form.querySelector('input[name="agreement"]');
  if (agreementCheckbox && !agreementCheckbox.checked) {
    showFieldError(agreementCheckbox, 'You must agree to the terms and conditions');
    isFormValid = false;
  }
  
  if (!isFormValid) {
    showFormMessage('Please correct the errors above', 'error');
    return;
  }
  
  // Show loading state
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Processing Registration...';
  submitBtn.disabled = true;
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Show success message
    showRegistrationSuccess(formData);
    
    // Track registration
    trackEvent('Registration Completed', {
      formData: Object.fromEntries(formData),
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Registration error:', error);
    showFormMessage('Registration failed. Please try again.', 'error');
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }
}

function showRegistrationSuccess(formData) {
  const formContainer = document.querySelector('.registration-form-container');
  
  // Create success message
  const successHtml = `
    <div class="registration-success">
      <div class="success-icon">🎉</div>
      <h2>Registration Successful!</h2>
      <p>Welcome to E-Summit 2024, <strong>${formData.get('name')}</strong>!</p>
      <div class="success-details">
        <p>📧 Confirmation email sent to: <strong>${formData.get('email')}</strong></p>
        <p>📱 WhatsApp updates will be sent to: <strong>${formData.get('phone')}</strong></p>
        <p>🎫 Your registration ID: <strong>#ESM${Date.now().toString().slice(-6)}</strong></p>
      </div>
      <div class="next-steps">
        <h3>What's Next?</h3>
        <ul>
          <li>Check your email for payment instructions</li>
          <li>Join our WhatsApp group for updates</li>
          <li>Follow us on social media</li>
          <li>Mark your calendar for March 15-16, 2024</li>
        </ul>
      </div>
      <button class="btn-primary" onclick="window.location.reload()">Register Another Person</button>
    </div>
  `;
  
  formContainer.innerHTML = successHtml;
  
  // Trigger confetti
  triggerConfetti();
  
  // Scroll to success message
  formContainer.scrollIntoView({ behavior: 'smooth' });
}

function showFormMessage(message, type) {
  const form = document.querySelector('.registration-form');
  let messageDiv = document.querySelector('.form-message');
  
  if (!messageDiv) {
    messageDiv = document.createElement('div');
    messageDiv.className = 'form-message';
    form.insertBefore(messageDiv, form.firstChild);
  }
  
  messageDiv.textContent = message;
  messageDiv.className = `form-message ${type}`;
  messageDiv.style.cssText = `
    padding: var(--spacing-sm);
    border-radius: var(--border-radius-sm);
    margin-bottom: var(--spacing-md);
    font-weight: 600;
    text-align: center;
    ${type === 'error' ? 
      'background: rgba(244, 67, 54, 0.1); color: var(--accent-red); border: 1px solid var(--accent-red);' :
      'background: rgba(76, 175, 80, 0.1); color: #4CAF50; border: 1px solid #4CAF50;'
    }
  `;
  
  // Auto-hide after 5 seconds
  setTimeout(() => {
    messageDiv.remove();
  }, 5000);
}

// Confetti Effect
function triggerConfetti() {
  const confettiContainer = document.querySelector('.confetti-container') || createConfettiContainer();
  
  // Create confetti pieces
  for (let i = 0; i < 100; i++) {
    createConfettiPiece(confettiContainer, i);
  }
  
  // Clean up after animation
  setTimeout(() => {
    confettiContainer.innerHTML = '';
  }, 4000);
}

function createConfettiContainer() {
  const container = document.createElement('div');
  container.className = 'confetti-container';
  document.body.appendChild(container);
  return container;
}

function createConfettiPiece(container, index) {
  const colors = ['#2196F3', '#FF9800', '#F44336', '#FFEB3B', '#4CAF50', '#9C27B0'];
  const piece = document.createElement('div');
  
  piece.style.cssText = `
    position: absolute;
    width: ${Math.random() * 10 + 5}px;
    height: ${Math.random() * 10 + 5}px;
    background: ${colors[Math.floor(Math.random() * colors.length)]};
    top: -10px;
    left: ${Math.random() * 100}%;
    border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
    animation: confetti-fall ${Math.random() * 3 + 2}s linear forwards;
    animation-delay: ${Math.random() * 2}s;
    z-index: 1000;
  `;
  
  container.appendChild(piece);
  
  // Remove piece after animation
  setTimeout(() => {
    if (piece.parentNode) {
      piece.parentNode.removeChild(piece);
    }
  }, 5000);
}

// Countdown and Animations
function initializeCountdowns() {
  // Early bird countdown
  const earlyBirdEndDate = new Date('2024-02-15T23:59:59').getTime();
  
  setInterval(() => {
    const now = new Date().getTime();
    const distance = earlyBirdEndDate - now;
    
    if (distance > 0) {
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      updateCountdownDisplay('early-bird', { days, hours, minutes, seconds });
    } else {
      // Early bird period ended
      handleEarlyBirdExpiry();
    }
  }, 1000);
}

function updateCountdownDisplay(type, time) {
  const urgencyBanner = document.querySelector('.urgency-banner');
  if (urgencyBanner && type === 'early-bird') {
    urgencyBanner.innerHTML = `
      <span class="urgency-icon">⚡</span>
      Early Bird Ends In: ${time.days}d ${time.hours}h ${time.minutes}m ${time.seconds}s
    `;
  }
}

function handleEarlyBirdExpiry() {
  const urgencyBanner = document.querySelector('.urgency-banner');
  const originalPrice = document.querySelector('.original-price');
  const currentPrice = document.querySelector('.amount');
  
  if (urgencyBanner) {
    urgencyBanner.textContent = '🔥 Regular Pricing Now Active';
    urgencyBanner.style.background = 'var(--accent-orange)';
  }
  
  if (originalPrice) originalPrice.style.display = 'none';
  if (currentPrice) currentPrice.textContent = '2999';
}

// Scroll Effects and Animations
function initializeScrollEffects() {
  // Parallax effect for hero section
  const hero = document.querySelector('.summit-hero');
  const heroContent = hero?.querySelector('.hero-content');
  const geometricShapes = hero?.querySelectorAll('.geometric-shapes .shape');
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.3;
    
    if (heroContent) {
      heroContent.style.transform = `translateY(${rate}px)`;
    }
    
    geometricShapes?.forEach((shape, index) => {
      const shapeRate = scrolled * (-0.2 - index * 0.1);
      shape.style.transform = `translateY(${shapeRate}px) rotate(${scrolled * 0.05}deg)`;
    });
  });
  
  // Highlight cards animation
  const highlightCards = document.querySelectorAll('.highlight-card');
  const highlightObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('animate-in');
        }, index * 100);
      }
    });
  }, { threshold: 0.2 });
  
  highlightCards.forEach(card => {
    card.classList.add('fade-in-up');
    highlightObserver.observe(card);
  });
}

function initializeAnimations() {
  // Add custom CSS animations
  const style = document.createElement('style');
  style.textContent = `
    @keyframes marker-drop {
      0% { transform: translateY(-100px) scale(0); opacity: 0; }
      60% { transform: translateY(10px) scale(1.1); opacity: 1; }
      100% { transform: translateY(0) scale(1); opacity: 1; }
    }
    
    @keyframes slideInScale {
      0% { transform: translateX(-50px) scale(0.8); opacity: 0; }
      100% { transform: translateX(0) scale(1); opacity: 1; }
    }
    
    @keyframes timelineCardBounce {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }
    
    @keyframes priceUpdate {
      0% { transform: scale(1); }
      50% { transform: scale(1.1); color: var(--accent-orange); }
      100% { transform: scale(1); }
    }
    
    @keyframes confetti-fall {
      to {
        transform: translateY(100vh) rotate(720deg);
        opacity: 0;
      }
    }
    
    .fade-in-up {
      opacity: 0;
      transform: translateY(30px);
      transition: all 0.6s ease-out;
    }
    
    .fade-in-up.visible,
    .fade-in-up.animate-in {
      opacity: 1;
      transform: translateY(0);
    }
    
    .registration-success {
      text-align: center;
      padding: var(--spacing-xxl);
      background: var(--glassmorphism-bg);
      border-radius: var(--border-radius-lg);
      animation: successSlideIn 0.8s ease-out;
    }
    
    .success-icon {
      font-size: 4rem;
      margin-bottom: var(--spacing-md);
      animation: successBounce 1s ease-out;
    }
    
    @keyframes successSlideIn {
      0% { transform: translateY(50px); opacity: 0; }
      100% { transform: translateY(0); opacity: 1; }
    }
    
    @keyframes successBounce {
      0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
      40% { transform: translateY(-20px); }
      60% { transform: translateY(-10px); }
    }
    
    .registration-form input.error,
    .registration-form select.error {
      border-color: var(--accent-red);
      box-shadow: 0 0 0 3px rgba(244, 67, 54, 0.1);
    }
  `;
  
  document.head.appendChild(style);
}

// Utility Functions
function trackEvent(eventName, data) {
  // Analytics tracking
  console.log('Event tracked:', eventName, data);
  
  // You can integrate with Google Analytics, Mixpanel, etc.
  if (typeof gtag !== 'undefined') {
    gtag('event', eventName, data);
  }
}

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initializeSummitPage,
    moveTestimonial,
    triggerConfetti,
    trackEvent
  };
}