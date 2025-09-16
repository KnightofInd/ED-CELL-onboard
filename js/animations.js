// Animation Controller for Entrepreneurship Cell Website

class AnimationController {
  constructor() {
    this.observers = new Map();
    this.animatedElements = new Set();
    this.init();
  }

  init() {
    this.setupScrollAnimations();
    this.setupIntersectionObservers();
    this.setupNavbarAnimation();
    this.setupRippleEffects();
  }

  // Setup scroll-based animations
  setupScrollAnimations() {
    const scrollHandler = ECellUtils.throttle(() => {
      this.updateNavbarOnScroll();
      this.updateParallaxElements();
    }, 16);

    window.addEventListener('scroll', scrollHandler);
  }

  // Setup intersection observers for reveal animations
  setupIntersectionObservers() {
    // Observer for fade-up animations
    const fadeUpObserver = ECellUtils.createObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.animatedElements.has(entry.target)) {
          this.animateElement(entry.target, 'fadeInUp');
          this.animatedElements.add(entry.target);
        }
      });
    }, { threshold: 0.1 });

    // Observer for staggered animations
    const staggerObserver = ECellUtils.createObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateStaggeredChildren(entry.target);
        }
      });
    }, { threshold: 0.2 });

    // Observer for counter animations
    const counterObserver = ECellUtils.createObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.animatedElements.has(entry.target)) {
          this.animateCounters(entry.target);
          this.animatedElements.add(entry.target);
        }
      });
    }, { threshold: 0.5 });

    // Observe elements with data-aos attributes
    document.querySelectorAll('[data-aos]').forEach(element => {
      fadeUpObserver.observe(element);
    });

    // Observe staggered containers
    document.querySelectorAll('[data-stagger]').forEach(element => {
      staggerObserver.observe(element);
    });

    // Observe counter elements
    document.querySelectorAll('.stat-number, .countdown-number').forEach(element => {
      counterObserver.observe(element);
    });

    this.observers.set('fadeUp', fadeUpObserver);
    this.observers.set('stagger', staggerObserver);
    this.observers.set('counter', counterObserver);
  }

  // Setup navbar scroll animation
  setupNavbarAnimation() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    const navToggle = document.getElementById('nav-toggle');
    const navLinks = navbar.querySelector('.nav-links');

    // Mobile menu toggle
    if (navToggle && navLinks) {
      navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
      });

      // Close mobile menu when clicking on links
      navLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
          navToggle.classList.remove('active');
          navLinks.classList.remove('active');
        });
      });
    }

    // Smooth scroll for navigation links
    navbar.addEventListener('click', (e) => {
      if (e.target.classList.contains('nav-link')) {
        e.preventDefault();
        const href = e.target.getAttribute('href');
        
        if (href.startsWith('#')) {
          const targetElement = document.querySelector(href);
          if (targetElement) {
            ECellUtils.smoothScrollTo(targetElement);
            this.updateActiveNavLink(e.target);
          }
        } else if (href !== '#') {
          window.location.href = href;
        }
      }
    });
  }

  // Update navbar appearance on scroll
  updateNavbarOnScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Update active section in navbar
    this.updateActiveSection();
  }

  // Update active navigation link
  updateActiveNavLink(activeLink) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
  }

  // Update active section based on scroll position
  updateActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[data-section]');
    
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-section') === current) {
        link.classList.add('active');
      }
    });
  }

  // Setup ripple effects for buttons
  setupRippleEffects() {
    document.addEventListener('click', (e) => {
      if (e.target.closest('.btn')) {
        const button = e.target.closest('.btn');
        ECellUtils.createRipple(e, button);
      }
    });
  }

  // Animate element with specified animation
  animateElement(element, animationType, delay = 0) {
    setTimeout(() => {
      element.classList.add('aos-animate');
      
      switch (animationType) {
        case 'fadeInUp':
          this.fadeInUp(element);
          break;
        case 'slideInRight':
          this.slideInRight(element);
          break;
        case 'slideInLeft':
          this.slideInLeft(element);
          break;
        case 'zoomIn':
          this.zoomIn(element);
          break;
        case 'rotateIn':
          this.rotateIn(element);
          break;
      }
    }, delay);
  }

  // Animate staggered children
  animateStaggeredChildren(container) {
    const children = container.children;
    const staggerDelay = parseInt(container.dataset.stagger) || 100;
    
    Array.from(children).forEach((child, index) => {
      if (!this.animatedElements.has(child)) {
        setTimeout(() => {
          this.animateElement(child, 'fadeInUp');
          this.animatedElements.add(child);
        }, index * staggerDelay);
      }
    });
  }

  // Animate counters
  animateCounters(container) {
    const counters = container.querySelectorAll('.stat-number, .countdown-number');
    
    counters.forEach(counter => {
      const target = parseInt(counter.dataset.target) || parseInt(counter.textContent);
      if (target) {
        ECellUtils.animateCounter(counter, target, 2000);
      }
    });
  }

  // Animation methods
  fadeInUp(element) {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'all 0.8s ease-out';
    
    requestAnimationFrame(() => {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    });
  }

  slideInRight(element) {
    element.style.opacity = '0';
    element.style.transform = 'translateX(50px)';
    element.style.transition = 'all 0.8s ease-out';
    
    requestAnimationFrame(() => {
      element.style.opacity = '1';
      element.style.transform = 'translateX(0)';
    });
  }

  slideInLeft(element) {
    element.style.opacity = '0';
    element.style.transform = 'translateX(-50px)';
    element.style.transition = 'all 0.8s ease-out';
    
    requestAnimationFrame(() => {
      element.style.opacity = '1';
      element.style.transform = 'translateX(0)';
    });
  }

  zoomIn(element) {
    element.style.opacity = '0';
    element.style.transform = 'scale(0.8)';
    element.style.transition = 'all 0.8s ease-out';
    
    requestAnimationFrame(() => {
      element.style.opacity = '1';
      element.style.transform = 'scale(1)';
    });
  }

  rotateIn(element) {
    element.style.opacity = '0';
    element.style.transform = 'rotate(-10deg) scale(0.9)';
    element.style.transition = 'all 0.8s ease-out';
    
    requestAnimationFrame(() => {
      element.style.opacity = '1';
      element.style.transform = 'rotate(0deg) scale(1)';
    });
  }

  // Update parallax elements
  updateParallaxElements() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    parallaxElements.forEach(element => {
      const speed = parseFloat(element.dataset.parallax) || 0.5;
      const yPos = -(window.scrollY * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  }

  // Animate page transitions
  animatePageTransition(direction = 'in') {
    const main = document.querySelector('main') || document.body;
    
    if (direction === 'out') {
      main.style.opacity = '0';
      main.style.transform = 'translateY(20px)';
      main.style.transition = 'all 0.3s ease-out';
    } else {
      main.style.opacity = '0';
      main.style.transform = 'translateY(20px)';
      
      requestAnimationFrame(() => {
        main.style.transition = 'all 0.5s ease-out';
        main.style.opacity = '1';
        main.style.transform = 'translateY(0)';
      });
    }
  }

  // Loading animation
  showLoading() {
    const loader = document.createElement('div');
    loader.id = 'page-loader';
    loader.innerHTML = `
      <div class="loader-content">
        <div class="rocket-loader">🚀</div>
        <div class="loader-text">Loading...</div>
      </div>
    `;
    
    loader.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, var(--primary-blue), var(--primary-blue-dark));
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      color: white;
    `;
    
    document.body.appendChild(loader);
    return loader;
  }

  hideLoading(loader) {
    if (loader) {
      ECellUtils.animationUtils.fadeOut(loader, 500);
      setTimeout(() => {
        if (loader.parentNode) {
          loader.parentNode.removeChild(loader);
        }
      }, 500);
    }
  }

  // Hover effects
  setupHoverEffects() {
    // Card hover effects
    document.querySelectorAll('.card, .link-card, .team-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px) scale(1.02)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
      });
    });

    // Button hover effects
    document.querySelectorAll('.btn').forEach(button => {
      button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-2px)';
      });
      
      button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
      });
    });
  }

  // Cleanup function
  destroy() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
    this.animatedElements.clear();
  }
}

// Initialize animation controller when DOM is ready
ECellUtils.ready(() => {
  window.animationController = new AnimationController();
  
  // Setup hover effects
  window.animationController.setupHoverEffects();
  
  // Animate page entrance
  window.animationController.animatePageTransition('in');
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
  if (!document.hidden && window.animationController) {
    // Restart animations when page becomes visible
    window.animationController.animatePageTransition('in');
  }
});

// Export for global access
window.AnimationController = AnimationController;