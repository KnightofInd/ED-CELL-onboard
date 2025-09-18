// Team Page JavaScript for Entrepreneurship Cell

class TeamPage {
  constructor() {
    this.teamAnimated = false;
    this.init();
  }

  init() {
    this.setupTeamAnimations();
    this.setupContactForm();
    this.setupTeamCardInteractions();
    this.setupSocialLinks();
    this.setupFormValidation();
  }

  // Setup team card animations
  setupTeamAnimations() {
    const teamGrid = document.querySelector('.team-grid');
    if (!teamGrid) return;

    const observer = ECellUtils.createObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.teamAnimated) {
          this.animateTeamCards();
          this.teamAnimated = true;
        }
      });
    }, { threshold: 0.2 });

    observer.observe(teamGrid);
  }

  // Animate team cards with staggered effect
  animateTeamCards() {
    const teamCards = document.querySelectorAll('.team-card');
    
    teamCards.forEach((card, index) => {
      setTimeout(() => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px) rotateX(20deg)';
        card.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        requestAnimationFrame(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0) rotateX(0)';
        });

        // Add glowing effect
        setTimeout(() => {
          card.style.boxShadow = 'var(--shadow-glow)';
          setTimeout(() => {
            card.style.boxShadow = '';
          }, 1000);
        }, 400);

      }, index * 150);
    });
  }

  // Setup team card interactions
  setupTeamCardInteractions() {
    const teamCards = document.querySelectorAll('.team-card');
    
    teamCards.forEach((card, index) => {
      this.setupCardHoverEffect(card, index);
      this.setupCardClickEffect(card);
      this.setupRoleTagAnimation(card);
    });
  }

  // Setup individual card hover effects
  setupCardHoverEffect(card, index) {
    let hoverTimer = null;

    card.addEventListener('mouseenter', () => {
      // Clear any existing timer
      if (hoverTimer) clearTimeout(hoverTimer);
      
      // Add special hover effect based on role
      const roleTag = card.querySelector('.role-tag');
      if (roleTag) {
        this.addRoleSpecificEffect(card, roleTag.classList[1]);
      }

      // Add floating effect to other cards
      this.addFloatingEffectToOthers(card);
      
      // Show additional info animation
      hoverTimer = setTimeout(() => {
        this.showAdditionalInfo(card);
      }, 500);
    });

    card.addEventListener('mouseleave', () => {
      if (hoverTimer) clearTimeout(hoverTimer);
      
      // Reset all effects
      this.resetCardEffects(card);
      this.resetOtherCards();
      this.hideAdditionalInfo(card);
    });
  }

  // Add role-specific hover effects
  addRoleSpecificEffect(card, role) {
    const cardImage = card.querySelector('.card-image');
    
    switch (role) {
      case 'president':
        card.style.background = 'linear-gradient(135deg, rgba(244, 67, 54, 0.1), rgba(198, 40, 40, 0.1))';
        cardImage.style.borderColor = 'var(--accent-red)';
        break;
      case 'vice-president':
        card.style.background = 'linear-gradient(135deg, rgba(33, 150, 243, 0.1), rgba(25, 118, 210, 0.1))';
        cardImage.style.borderColor = 'var(--primary-blue)';
        break;
      case 'secretary':
        card.style.background = 'linear-gradient(135deg, rgba(255, 152, 0, 0.1), rgba(230, 81, 0, 0.1))';
        cardImage.style.borderColor = 'var(--accent-orange)';
        break;
      case 'treasurer':
        card.style.background = 'linear-gradient(135deg, rgba(76, 175, 80, 0.1), rgba(46, 125, 50, 0.1))';
        cardImage.style.borderColor = '#4CAF50';
        break;
      case 'marketing':
        card.style.background = 'linear-gradient(135deg, rgba(156, 39, 176, 0.1), rgba(106, 27, 154, 0.1))';
        cardImage.style.borderColor = '#9C27B0';
        break;
      case 'technical':
        card.style.background = 'linear-gradient(135deg, rgba(96, 125, 139, 0.1), rgba(55, 71, 79, 0.1))';
        cardImage.style.borderColor = '#607D8B';
        break;
    }
  }

  // Add floating effect to other cards
  addFloatingEffectToOthers(hoveredCard) {
    const teamCards = document.querySelectorAll('.team-card');
    
    teamCards.forEach(card => {
      if (card !== hoveredCard) {
        card.style.transform = 'translateY(-5px) scale(0.98)';
        card.style.opacity = '0.7';
      }
    });
  }

  // Reset other cards
  resetOtherCards() {
    const teamCards = document.querySelectorAll('.team-card');
    
    teamCards.forEach(card => {
      card.style.transform = '';
      card.style.opacity = '';
    });
  }

  // Reset card effects
  resetCardEffects(card) {
    card.style.background = '';
    const cardImage = card.querySelector('.card-image');
    if (cardImage) {
      cardImage.style.borderColor = '';
    }
  }

  // Setup card click effects - DISABLED for now
  setupCardClickEffect(card) {
    // Click functionality temporarily removed
    // Will be added later as requested by user
    card.style.cursor = 'default';
  }

  // Show team member details modal
  showTeamMemberDetails(card) {
    const name = card.querySelector('h3').textContent;
    const role = card.querySelector('.role-tag').textContent;
    const description = card.querySelector('p').textContent;
    const imageUrl = card.querySelector('img').src;

    // Create modal
    const modal = document.createElement('div');
    modal.className = 'team-member-modal';
    modal.innerHTML = `
      <div class="modal-overlay"></div>
      <div class="modal-content glassmorphism">
        <button class="modal-close">&times;</button>
        <div class="modal-body">
          <div class="member-image">
            <img src="${imageUrl}" alt="${name}" loading="lazy">
          </div>
          <div class="member-info">
            <h2>${name}</h2>
            <div class="role-tag ${card.querySelector('.role-tag').classList[1]}">${role}</div>
            <p>${description}</p>
            <div class="member-stats">
              <div class="stat-item">
                <span class="stat-number">3+</span>
                <span class="stat-label">Years Experience</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">25+</span>
                <span class="stat-label">Projects Led</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">100+</span>
                <span class="stat-label">Students Mentored</span>
              </div>
            </div>
            <div class="member-social">
              ${card.querySelector('.social-links').outerHTML}
            </div>
          </div>
        </div>
      </div>
    `;

    // Style the modal
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 2000;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s ease-out;
    `;

    document.body.appendChild(modal);

    // Animate modal in
    requestAnimationFrame(() => {
      modal.style.opacity = '1';
    });

    // Setup modal close
    this.setupModalClose(modal);
    this.styleTeamMemberModal(modal);
  }

  // Style team member modal
  styleTeamMemberModal(modal) {
    const style = document.createElement('style');
    style.textContent = `
      .team-member-modal .modal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(10px);
      }
      
      .team-member-modal .modal-content {
        position: relative;
        max-width: 600px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        background: rgba(255, 255, 255, 0.95);
        border-radius: var(--border-radius-lg);
        padding: var(--spacing-xl);
        margin: var(--spacing-lg);
      }
      
      .team-member-modal .modal-close {
        position: absolute;
        top: var(--spacing-md);
        right: var(--spacing-md);
        background: none;
        border: none;
        font-size: 2rem;
        cursor: pointer;
        color: var(--silver-grey-dark);
        transition: var(--transition-fast);
      }
      
      .team-member-modal .modal-close:hover {
        color: var(--accent-red);
        transform: rotate(90deg);
      }
      
      .team-member-modal .modal-body {
        display: grid;
        grid-template-columns: 1fr 2fr;
        gap: var(--spacing-xl);
        align-items: start;
      }
      
      .team-member-modal .member-image img {
        width: 100%;
        border-radius: var(--border-radius-md);
        box-shadow: var(--shadow-lg);
      }
      
      .team-member-modal .member-info h2 {
        color: var(--black);
        margin-bottom: var(--spacing-sm);
      }
      
      .team-member-modal .member-stats {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: var(--spacing-md);
        margin: var(--spacing-lg) 0;
      }
      
      .team-member-modal .stat-item {
        text-align: center;
        padding: var(--spacing-sm);
        background: var(--glassmorphism-bg);
        border-radius: var(--border-radius-sm);
      }
      
      .team-member-modal .stat-number {
        display: block;
        font-size: var(--font-size-md);
        font-weight: 700;
        color: var(--primary-blue);
      }
      
      .team-member-modal .stat-label {
        font-size: var(--font-size-xs);
        color: var(--silver-grey-dark);
      }
      
      @media (max-width: 768px) {
        .team-member-modal .modal-body {
          grid-template-columns: 1fr;
          text-align: center;
        }
        
        .team-member-modal .member-stats {
          grid-template-columns: 1fr;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Setup modal close functionality
  setupModalClose(modal) {
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');

    const closeModal = () => {
      modal.style.opacity = '0';
      setTimeout(() => {
        if (modal.parentNode) {
          modal.parentNode.removeChild(modal);
        }
      }, 300);
    };

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);

    // Close on escape key
    const escapeHandler = (e) => {
      if (e.key === 'Escape') {
        closeModal();
        document.removeEventListener('keydown', escapeHandler);
      }
    };

    document.addEventListener('keydown', escapeHandler);
  }

  // Show additional info on hover
  showAdditionalInfo(card) {
    const additionalInfo = document.createElement('div');
    additionalInfo.className = 'additional-info';
    additionalInfo.innerHTML = `
      <div class="info-item">🏆 Awards: 3</div>
      <div class="info-item">📚 Projects: 15+</div>
      <div class="info-item">🎯 Success Rate: 98%</div>
    `;

    additionalInfo.style.cssText = `
      position: absolute;
      bottom: var(--spacing-md);
      left: var(--spacing-md);
      right: var(--spacing-md);
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      border-radius: var(--border-radius-sm);
      padding: var(--spacing-sm);
      font-size: var(--font-size-xs);
      opacity: 0;
      transform: translateY(10px);
      transition: all var(--transition-fast);
      z-index: 10;
    `;

    card.style.position = 'relative';
    card.appendChild(additionalInfo);

    // Animate in
    requestAnimationFrame(() => {
      additionalInfo.style.opacity = '1';
      additionalInfo.style.transform = 'translateY(0)';
    });
  }

  // Hide additional info
  hideAdditionalInfo(card) {
    const additionalInfo = card.querySelector('.additional-info');
    if (additionalInfo) {
      additionalInfo.style.opacity = '0';
      additionalInfo.style.transform = 'translateY(10px)';
      setTimeout(() => {
        if (additionalInfo.parentNode) {
          additionalInfo.parentNode.removeChild(additionalInfo);
        }
      }, 200);
    }
  }

  // Setup role tag animations
  setupRoleTagAnimation(card) {
    const roleTag = card.querySelector('.role-tag');
    if (!roleTag) return;

    // Add pulsing animation on hover
    card.addEventListener('mouseenter', () => {
      roleTag.style.animation = 'role-pulse 1s ease-in-out';
    });

    card.addEventListener('mouseleave', () => {
      roleTag.style.animation = '';
    });

    // Add click effect
    roleTag.addEventListener('click', (e) => {
      e.stopPropagation();
      this.showRoleDescription(roleTag);
    });
  }

  // Show role description tooltip
  showRoleDescription(roleTag) {
    const roleDescriptions = {
      'president': 'Leads the organization and sets strategic direction',
      'vice-president': 'Supports leadership and manages key initiatives',
      'secretary': 'Handles communications and documentation',
      'treasurer': 'Manages finances and budgeting',
      'marketing': 'Drives brand awareness and community engagement',
      'technical': 'Oversees technical projects and digital initiatives'
    };

    const role = Array.from(roleTag.classList).find(cls => cls !== 'role-tag');
    const description = roleDescriptions[role] || 'Key team member';

    const tooltip = document.createElement('div');
    tooltip.className = 'role-tooltip';
    tooltip.textContent = description;
    tooltip.style.cssText = `
      position: absolute;
      top: -40px;
      left: 50%;
      transform: translateX(-50%);
      background: var(--black);
      color: var(--white);
      padding: var(--spacing-xs) var(--spacing-sm);
      border-radius: var(--border-radius-sm);
      font-size: var(--font-size-xs);
      white-space: nowrap;
      z-index: 100;
      opacity: 0;
      animation: fadeInUp 0.3s ease-out forwards;
    `;

    roleTag.style.position = 'relative';
    roleTag.appendChild(tooltip);

    setTimeout(() => {
      if (tooltip.parentNode) {
        tooltip.style.animation = 'fadeOutDown 0.3s ease-out forwards';
        setTimeout(() => {
          if (tooltip.parentNode) {
            tooltip.parentNode.removeChild(tooltip);
          }
        }, 300);
      }
    }, 3000);
  }

  // Setup social links
  setupSocialLinks() {
    const socialLinks = document.querySelectorAll('.team-card .social-links a');
    
    socialLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        // Add click animation
        link.style.transform = 'translateY(-3px) scale(1.2)';
        setTimeout(() => {
          link.style.transform = 'translateY(-3px) scale(1.1)';
        }, 150);

        // Show notification
        this.showSocialNotification(link);
      });

      // Add hover sound effect (visual indication)
      link.addEventListener('mouseenter', () => {
        link.style.boxShadow = '0 0 20px rgba(33, 150, 243, 0.5)';
      });

      link.addEventListener('mouseleave', () => {
        link.style.boxShadow = '';
      });
    });
  }

  // Show social notification
  showSocialNotification(link) {
    const platform = link.getAttribute('aria-label') || 'Social Media';
    const notification = document.createElement('div');
    notification.textContent = `${platform} link coming soon! 🔗`;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: var(--primary-blue);
      color: var(--white);
      padding: var(--spacing-sm) var(--spacing-md);
      border-radius: var(--border-radius-sm);
      font-size: var(--font-size-sm);
      z-index: 2000;
      animation: slideInRight 0.3s ease-out;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.3s ease-out';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }

  // Setup contact form
  setupContactForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleFormSubmission(form);
    });

    // Add real-time validation
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => {
        if (input.classList.contains('error')) {
          this.validateField(input);
        }
      });
    });
  }

  // Setup form validation
  setupFormValidation() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    // Add custom validation styles
    const style = document.createElement('style');
    style.textContent = `
      .form-group input.error,
      .form-group select.error,
      .form-group textarea.error {
        border-color: var(--accent-red);
        box-shadow: 0 0 0 3px rgba(244, 67, 54, 0.2);
      }
      
      .form-group input.success,
      .form-group select.success,
      .form-group textarea.success {
        border-color: #4CAF50;
        box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.2);
      }
      
      .error-message {
        color: var(--accent-red);
        font-size: var(--font-size-sm);
        margin-top: var(--spacing-xs);
        animation: fadeInUp 0.3s ease-out;
      }
    `;
    document.head.appendChild(style);
  }

  // Validate individual field
  validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    // Remove existing error classes and messages
    field.classList.remove('error', 'success');
    ECellUtils.formUtils.hideError(field);

    switch (field.name) {
      case 'name':
        isValid = ECellUtils.formUtils.validateRequired(value);
        errorMessage = 'Name is required';
        break;
      case 'email':
        isValid = ECellUtils.formUtils.validateRequired(value) && ECellUtils.formUtils.validateEmail(value);
        errorMessage = value ? 'Please enter a valid email' : 'Email is required';
        break;
      case 'position':
        isValid = ECellUtils.formUtils.validateRequired(value);
        errorMessage = 'Please select a position';
        break;
      case 'message':
        isValid = ECellUtils.formUtils.validateRequired(value) && value.length >= 10;
        errorMessage = value ? 'Message must be at least 10 characters' : 'Message is required';
        break;
    }

    if (!isValid) {
      field.classList.add('error');
      ECellUtils.formUtils.showError(field, errorMessage);
    } else {
      field.classList.add('success');
    }

    return isValid;
  }

  // Handle form submission
  handleFormSubmission(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Validate all fields
    let isFormValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
      if (!this.validateField(field)) {
        isFormValid = false;
      }
    });

    if (!isFormValid) {
      this.showFormError('Please fix all errors before submitting');
      return;
    }

    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = `
      <span>Submitting...</span>
      <div class="spinner"></div>
    `;
    submitBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
      this.showFormSuccess();
      form.reset();
      
      // Reset button
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      
      // Remove validation classes
      form.querySelectorAll('.success, .error').forEach(field => {
        field.classList.remove('success', 'error');
      });
      
    }, 2000);
  }

  // Show form success message
  showFormSuccess() {
    const successMessage = document.createElement('div');
    successMessage.className = 'form-success';
    successMessage.innerHTML = `
      <div class="success-icon">✅</div>
      <h3>Application Submitted!</h3>
      <p>Thank you for your interest in joining E-Cell. We'll review your application and get back to you soon.</p>
    `;

    successMessage.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: var(--white);
      padding: var(--spacing-xl);
      border-radius: var(--border-radius-lg);
      box-shadow: var(--shadow-lg);
      text-align: center;
      z-index: 2000;
      max-width: 400px;
      animation: zoomIn 0.5s ease-out;
    `;

    // Add overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 1999;
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(successMessage);

    // Auto close after 4 seconds
    setTimeout(() => {
      successMessage.style.animation = 'zoomOut 0.3s ease-out';
      overlay.style.opacity = '0';
      
      setTimeout(() => {
        if (successMessage.parentNode) {
          successMessage.parentNode.removeChild(successMessage);
        }
        if (overlay.parentNode) {
          overlay.parentNode.removeChild(overlay);
        }
      }, 300);
    }, 4000);

    // Create confetti effect
    this.createConfetti();
  }

  // Show form error message
  showFormError(message) {
    const errorElement = document.createElement('div');
    errorElement.textContent = message;
    errorElement.style.cssText = `
      background: var(--accent-red);
      color: var(--white);
      padding: var(--spacing-sm) var(--spacing-md);
      border-radius: var(--border-radius-sm);
      margin-top: var(--spacing-md);
      animation: shake 0.5s ease-in-out;
    `;

    const form = document.querySelector('.contact-form');
    form.appendChild(errorElement);

    setTimeout(() => {
      if (errorElement.parentNode) {
        errorElement.parentNode.removeChild(errorElement);
      }
    }, 5000);
  }

  // Create confetti effect
  createConfetti() {
    const colors = ['#FFEB3B', '#FF9800', '#F44336', '#2196F3', '#4CAF50'];
    
    for (let i = 0; i < 30; i++) {
      const confetti = document.createElement('div');
      confetti.style.cssText = `
        position: fixed;
        width: 8px;
        height: 8px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        pointer-events: none;
        z-index: 3000;
        border-radius: 50%;
        left: ${Math.random() * window.innerWidth}px;
        top: -10px;
      `;

      document.body.appendChild(confetti);

      // Animate confetti
      const velocity = Math.random() * 3 + 2;
      const swing = Math.random() * 0.2 + 0.1;
      let y = -10;
      let x = parseFloat(confetti.style.left);

      const animate = () => {
        y += velocity;
        x += Math.sin(y * swing) * 2;
        confetti.style.top = y + 'px';
        confetti.style.left = x + 'px';

        if (y < window.innerHeight + 10) {
          requestAnimationFrame(animate);
        } else {
          confetti.remove();
        }
      };

      animate();
    }
  }
}

// Initialize team page when DOM is ready
ECellUtils.ready(() => {
  window.teamPage = new TeamPage();
});

// Export for global access
window.TeamPage = TeamPage;