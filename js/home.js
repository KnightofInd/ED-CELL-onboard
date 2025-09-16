// Home Page JavaScript for Entrepreneurship Cell

class HomePage {
  constructor() {
    this.countdownInterval = null;
    this.heroStatsAnimated = false;
    this.init();
  }

  init() {
    this.setupCountdown();
    this.setupHeroStats();
    this.setupHeroButtons();
    this.setupQuickLinks();
    this.setupScrollEffects();
    this.setupRocketAnimation();
  }

  // Setup countdown timer
  setupCountdown() {
    // Set target date for E-Summit 2025 (March 15, 2025)
    const targetDate = new Date('2025-03-15T09:00:00').getTime();
    
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');

    if (!daysElement || !hoursElement || !minutesElement || !secondsElement) {
      return;
    }

    const updateCountdown = () => {
      const timeDiff = ECellUtils.getTimeDifference(targetDate);
      
      daysElement.textContent = ECellUtils.formatTime(timeDiff.days);
      hoursElement.textContent = ECellUtils.formatTime(timeDiff.hours);
      minutesElement.textContent = ECellUtils.formatTime(timeDiff.minutes);
      secondsElement.textContent = ECellUtils.formatTime(timeDiff.seconds);

      // Add pulse animation to countdown items
      this.pulseCountdownItems();
    };

    // Initial update
    updateCountdown();

    // Update every second
    this.countdownInterval = setInterval(updateCountdown, 1000);
  }

  // Add pulse animation to countdown items
  pulseCountdownItems() {
    const countdownItems = document.querySelectorAll('.countdown-item');
    countdownItems.forEach((item, index) => {
      setTimeout(() => {
        item.style.transform = 'scale(1.05)';
        setTimeout(() => {
          item.style.transform = 'scale(1)';
        }, 150);
      }, index * 50);
    });
  }

  // Setup hero statistics animation
  setupHeroStats() {
    const heroStats = document.querySelector('.hero-stats');
    if (!heroStats) return;

    const observer = ECellUtils.createObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.heroStatsAnimated) {
          this.animateHeroStats();
          this.heroStatsAnimated = true;
        }
      });
    }, { threshold: 0.5 });

    observer.observe(heroStats);
  }

  // Animate hero statistics
  animateHeroStats() {
    const stats = [
      { element: document.querySelector('.hero-stats .stat:nth-child(1) .stat-number'), target: 500 },
      { element: document.querySelector('.hero-stats .stat:nth-child(2) .stat-number'), target: 50 },
      { element: document.querySelector('.hero-stats .stat:nth-child(3) .stat-number'), target: 10 }
    ];

    stats.forEach((stat, index) => {
      if (stat.element) {
        setTimeout(() => {
          if (index === 2) {
            // For the last stat (₹10L+), animate to 10 then add L+
            ECellUtils.animateCounter(stat.element, stat.target, 2000);
            setTimeout(() => {
              stat.element.textContent = '₹10L+';
            }, 2000);
          } else {
            // For other stats, add the + after animation
            ECellUtils.animateCounter(stat.element, stat.target, 2000);
            setTimeout(() => {
              stat.element.textContent = stat.target + '+';
            }, 2000);
          }
        }, index * 200);
      }
    });
  }

  // Setup hero buttons
  setupHeroButtons() {
    const joinBtn = document.getElementById('join-btn');
    const learnMoreBtn = document.getElementById('learn-more-btn');

    if (joinBtn) {
      joinBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.handleJoinClick();
      });
    }

    if (learnMoreBtn) {
      learnMoreBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.handleLearnMoreClick();
      });
    }
  }

  // Handle Join E-Cell button click
  handleJoinClick() {
    // Show confetti effect
    this.createConfetti();
    
    // Scroll to contact section or show join modal
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      ECellUtils.smoothScrollTo(aboutSection);
    }

    // Show notification
    this.showNotification('Welcome to E-Cell! 🚀', 'success');
  }

  // Handle Learn More button click
  handleLearnMoreClick() {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      ECellUtils.smoothScrollTo(aboutSection);
    }
  }

  // Setup quick links interactions
  setupQuickLinks() {
    const linkCards = document.querySelectorAll('.link-card');
    
    linkCards.forEach((card, index) => {
      // Add staggered hover effect
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-12px) rotate(2deg)';
        card.style.boxShadow = '0 20px 40px rgba(33, 150, 243, 0.3)';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) rotate(0deg)';
        card.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.15)';
      });

      // Add click effect
      card.addEventListener('click', (e) => {
        e.preventDefault();
        this.handleQuickLinkClick(card, index);
      });
    });
  }

  // Handle quick link clicks
  handleQuickLinkClick(card, index) {
    const title = card.querySelector('h4').textContent;
    
    // Add click animation
    card.style.transform = 'scale(0.95)';
    setTimeout(() => {
      card.style.transform = 'translateY(-12px) rotate(2deg)';
    }, 150);

    // Handle different link types
    switch (index) {
      case 0: // Join Community
        this.showJoinCommunityModal();
        break;
      case 1: // Resources
        this.showResourcesModal();
        break;
      case 2: // Mentorship
        this.showMentorshipModal();
        break;
      case 3: // Support
        this.showSupportModal();
        break;
    }
  }

  // Setup scroll effects
  setupScrollEffects() {
    const scrollHandler = ECellUtils.throttle(() => {
      this.updateParallaxElements();
      this.updateFloatingElements();
    }, 16);

    window.addEventListener('scroll', scrollHandler);
  }

  // Update parallax elements
  updateParallaxElements() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-background .shape');
    
    parallaxElements.forEach((element, index) => {
      const speed = 0.3 + (index * 0.1);
      const yPos = scrolled * speed;
      element.style.transform = `translateY(${yPos}px)`;
    });
  }

  // Update floating elements
  updateFloatingElements() {
    const aboutCards = document.querySelectorAll('.about .card');
    const scrolled = window.pageYOffset;
    
    aboutCards.forEach((card, index) => {
      const speed = 0.05 + (index * 0.02);
      const yPos = Math.sin(scrolled * 0.01 + index) * 10 * speed;
      card.style.transform = `translateY(${yPos}px)`;
    });
  }

  // Setup rocket animation enhancements
  setupRocketAnimation() {
    const rocket = document.getElementById('rocket');
    if (!rocket) return;

    // Add interactive rocket animation
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / window.innerWidth) * 100;
      mouseY = (e.clientY / window.innerHeight) * 100;
    });

    const updateRocketPosition = () => {
      const offsetX = (mouseX - 50) * 0.1;
      const offsetY = (mouseY - 50) * 0.1;
      
      rocket.style.transform = `translate(${offsetX}px, ${offsetY}px) rotate(-45deg)`;
      
      requestAnimationFrame(updateRocketPosition);
    };

    updateRocketPosition();

    // Add click interaction
    rocket.addEventListener('click', () => {
      this.createRocketBoost();
    });
  }

  // Create rocket boost effect
  createRocketBoost() {
    const rocket = document.getElementById('rocket');
    if (!rocket) return;

    rocket.style.animation = 'none';
    rocket.style.transform = 'scale(1.5) rotate(-45deg)';
    rocket.style.filter = 'drop-shadow(0 0 30px rgba(255, 152, 0, 0.8))';

    setTimeout(() => {
      rocket.style.animation = '';
      rocket.style.transform = '';
      rocket.style.filter = '';
    }, 1000);

    this.createSparkles(rocket);
  }

  // Create sparkles effect
  createSparkles(element) {
    const rect = element.getBoundingClientRect();
    const colors = ['#FFEB3B', '#FF9800', '#F44336', '#2196F3'];

    for (let i = 0; i < 10; i++) {
      const sparkle = document.createElement('div');
      sparkle.style.cssText = `
        position: fixed;
        width: 6px;
        height: 6px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        left: ${rect.left + rect.width/2}px;
        top: ${rect.top + rect.height/2}px;
      `;

      document.body.appendChild(sparkle);

      const angle = (Math.PI * 2 * i) / 10;
      const velocity = 50 + Math.random() * 50;
      const vx = Math.cos(angle) * velocity;
      const vy = Math.sin(angle) * velocity;

      this.animateSparkle(sparkle, vx, vy);
    }
  }

  // Animate sparkle particle
  animateSparkle(sparkle, vx, vy) {
    let x = 0;
    let y = 0;
    let opacity = 1;
    const gravity = 0.5;
    let velocityY = vy;

    const animate = () => {
      x += vx * 0.02;
      y += velocityY * 0.02;
      velocityY += gravity;
      opacity -= 0.02;

      sparkle.style.transform = `translate(${x}px, ${y}px)`;
      sparkle.style.opacity = opacity;

      if (opacity > 0) {
        requestAnimationFrame(animate);
      } else {
        sparkle.remove();
      }
    };

    animate();
  }

  // Create confetti effect
  createConfetti() {
    const colors = ['#FFEB3B', '#FF9800', '#F44336', '#2196F3', '#4CAF50'];
    const shapes = ['circle', 'square', 'triangle'];

    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div');
      const color = colors[Math.floor(Math.random() * colors.length)];
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      
      confetti.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        background: ${color};
        pointer-events: none;
        z-index: 1000;
        left: ${Math.random() * window.innerWidth}px;
        top: -10px;
      `;

      if (shape === 'circle') {
        confetti.style.borderRadius = '50%';
      } else if (shape === 'triangle') {
        confetti.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';
      }

      document.body.appendChild(confetti);
      this.animateConfetti(confetti);
    }
  }

  // Animate confetti particle
  animateConfetti(confetti) {
    const velocity = Math.random() * 3 + 2;
    const swing = Math.random() * 0.2 + 0.1;
    let y = -10;
    let x = parseFloat(confetti.style.left);
    let rotation = 0;

    const animate = () => {
      y += velocity;
      x += Math.sin(y * swing) * 2;
      rotation += 5;

      confetti.style.top = y + 'px';
      confetti.style.left = x + 'px';
      confetti.style.transform = `rotate(${rotation}deg)`;

      if (y < window.innerHeight + 10) {
        requestAnimationFrame(animate);
      } else {
        confetti.remove();
      }
    };

    animate();
  }

  // Show notification
  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <span class="notification-message">${message}</span>
      <button class="notification-close">&times;</button>
    `;

    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#F44336' : '#2196F3'};
      color: white;
      padding: 15px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.2);
      z-index: 2000;
      display: flex;
      align-items: center;
      gap: 10px;
      transform: translateX(400px);
      transition: transform 0.3s ease-out;
    `;

    document.body.appendChild(notification);

    // Slide in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);

    // Close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
      background: none;
      border: none;
      color: white;
      font-size: 20px;
      cursor: pointer;
      padding: 0;
      margin-left: 10px;
    `;

    closeBtn.addEventListener('click', () => {
      this.closeNotification(notification);
    });

    // Auto close after 5 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        this.closeNotification(notification);
      }
    }, 5000);
  }

  // Close notification
  closeNotification(notification) {
    notification.style.transform = 'translateX(400px)';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 300);
  }

  // Show modal methods (placeholders for future implementation)
  showJoinCommunityModal() {
    this.showNotification('Join Community feature coming soon! 🚀', 'info');
  }

  showResourcesModal() {
    this.showNotification('Resources section coming soon! 📚', 'info');
  }

  showMentorshipModal() {
    this.showNotification('Mentorship program coming soon! 🎯', 'info');
  }

  showSupportModal() {
    this.showNotification('Support system coming soon! 💬', 'info');
  }

  // Cleanup function
  destroy() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }
}

// Initialize home page when DOM is ready
ECellUtils.ready(() => {
  window.homePage = new HomePage();
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  if (window.homePage) {
    window.homePage.destroy();
  }
});

// Export for global access
window.HomePage = HomePage;