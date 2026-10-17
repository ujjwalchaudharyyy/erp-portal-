// State variables
let currentCaptcha = '';

// DOM Elements
const captchaCanvas = document.getElementById('captchaCanvas');
const captchaInput = document.getElementById('captchaInput');
const refreshCaptchaBtn = document.getElementById('refreshCaptchaBtn');
const loginForm = document.getElementById('loginForm');
const togglePasswordBtn = document.getElementById('togglePasswordBtn');
const passwordInput = document.getElementById('passwordInput');
const userIdInput = document.getElementById('userIdInput');
const toast = document.getElementById('toast');
const toastMsg = document.getElementById('toastMsg');
const modalOverlay = document.getElementById('modalOverlay');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const forgotIdLink = document.getElementById('forgotIdLink');
const forgotPasswordLink = document.getElementById('forgotPasswordLink');
const bgToggleBtn = document.getElementById('bgToggleBtn');

// Captcha Character Generator (excludes ambiguous characters like 0/O, 1/I)
function generateCaptchaCode(length = 5) {
  const chars = '23456789abcdefghkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ';
  let code = '';
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// Render Realistic CAPTCHA on Canvas matching reference style
function renderCaptcha() {
  if (!captchaCanvas) return;
  const ctx = captchaCanvas.getContext('2d');
  const width = captchaCanvas.width;
  const height = captchaCanvas.height;

  // Clear canvas
  ctx.clearRect(0, 0, width, height);

  // Background subtle dark gradient
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, 'rgba(15, 23, 42, 0.4)');
  bgGrad.addColorStop(1, 'rgba(25, 35, 55, 0.5)');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Draw colorful overlapping translucent circles (just like screenshot)
  const circleColors = [
    'rgba(244, 63, 94, 0.28)',   // Rose/Pink
    'rgba(59, 130, 246, 0.28)',   // Blue
    'rgba(34, 197, 94, 0.28)',   // Green
    'rgba(234, 179, 8, 0.25)',   // Yellow
    'rgba(168, 85, 247, 0.28)'   // Purple
  ];

  for (let i = 0; i < 7; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const radius = 10 + Math.random() * 20;
    const color = circleColors[Math.floor(Math.random() * circleColors.length)];
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
  }

  // Generate new code
  currentCaptcha = generateCaptchaCode(5);

  // Character colors (matching screenshot's pastel & vibrant tones)
  const charColors = [
    '#f1f5f9', '#f43f5e', '#38bdf8', '#fbbf24', '#a78bfa', '#4ade80', '#fb923c'
  ];

  const letterSpacing = width / (currentCaptcha.length + 1);

  // Draw each character with slight rotation and distortion
  for (let i = 0; i < currentCaptcha.length; i++) {
    const char = currentCaptcha[i];
    const x = letterSpacing * (i + 0.6) + (Math.random() * 6 - 3);
    const y = height / 2 + 7 + (Math.random() * 6 - 3);
    const angle = (Math.random() * 24 - 12) * Math.PI / 180;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);

    ctx.font = 'bold 24px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = charColors[i % charColors.length];
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = 4;
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 1;
    ctx.fillText(char, 0, 0);

    ctx.restore();
  }

  // Draw stylized wavy noise lines
  ctx.beginPath();
  ctx.moveTo(10, height / 2 + Math.random() * 10 - 5);
  ctx.bezierCurveTo(
    width * 0.3, Math.random() * height,
    width * 0.7, Math.random() * height,
    width - 10, height / 2 + Math.random() * 10 - 5
  );
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
  ctx.lineWidth = 1.8;
  ctx.stroke();

  // Second subtle colored line
  ctx.beginPath();
  ctx.moveTo(15, Math.random() * height);
  ctx.bezierCurveTo(
    width * 0.4, Math.random() * height,
    width * 0.6, Math.random() * height,
    width - 15, Math.random() * height
  );
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
  ctx.lineWidth = 1.2;
  ctx.stroke();
}

// Show Toast notification
function showToast(message, type = 'error') {
  toastMsg.textContent = message;
  toast.className = `toast-msg show ${type}`;
  setTimeout(() => {
    toast.className = 'toast-msg';
  }, 3500);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  renderCaptcha();

  // Refresh Captcha with spin animation
  if (refreshCaptchaBtn) {
    refreshCaptchaBtn.addEventListener('click', (e) => {
      e.preventDefault();
      refreshCaptchaBtn.classList.add('spinning');
      renderCaptcha();
      if (captchaInput) captchaInput.value = '';
      setTimeout(() => {
        refreshCaptchaBtn.classList.remove('spinning');
      }, 400);
    });
  }

  // Password visibility toggle
  if (togglePasswordBtn && passwordInput) {
    togglePasswordBtn.addEventListener('click', () => {
      const isPassword = passwordInput.getAttribute('type') === 'password';
      passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
      
      // Update eye icon SVG
      if (isPassword) {
        togglePasswordBtn.innerHTML = `
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
            <line x1="1" y1="1" x2="23" y2="23"></line>
          </svg>
        `;
      } else {
        togglePasswordBtn.innerHTML = `
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
        `;
      }
    });
  }

  // Form submission handler
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const userId = userIdInput ? userIdInput.value.trim() : '';
      const password = passwordInput ? passwordInput.value.trim() : '';
      const captchaEntered = captchaInput ? captchaInput.value.trim() : '';

      // Check User ID
      if (!userId) {
        showToast('Please enter your User ID / Roll Number!', 'error');
        if (userIdInput) userIdInput.focus();
        return;
      }

      // Check Password
      if (!password) {
        showToast('Please enter your password!', 'error');
        if (passwordInput) passwordInput.focus();
        return;
      }

      // Check CAPTCHA
      if (!captchaEntered) {
        showToast('Please enter the CAPTCHA code!', 'error');
        if (captchaInput) captchaInput.focus();
        return;
      }

      // Validate CAPTCHA (case-insensitive)
      if (captchaEntered.toLowerCase() !== currentCaptcha.toLowerCase()) {
        showToast('Invalid CAPTCHA code! Please try again.', 'error');
        renderCaptcha();
        if (captchaInput) {
          captchaInput.value = '';
          captchaInput.focus();
        }
        return;
      }

      // Validate Password (without ever revealing password on failure)
      if (password !== 'Vaishu@2307' && password !== 'admin' && password !== 'password') {
        showToast('Invalid User ID or Password! Please try again.', 'error');
        if (passwordInput) {
          passwordInput.value = '';
          passwordInput.focus();
        }
        renderCaptcha();
        if (captchaInput) {
          captchaInput.value = '';
        }
        return;
      }

      // Successful verification & smooth transition to dashboard
      showToast('Login successful! Redirecting to Student Dashboard...', 'success');
      
      const submitBtn = document.getElementById('submitBtn');
      if (submitBtn) {
        submitBtn.innerHTML = `<span>Signing in...</span>`;
        submitBtn.disabled = true;
      }

      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 500);
    });
  }

  // Forgot ID & Password modals
  if (forgotIdLink) {
    forgotIdLink.addEventListener('click', (e) => {
      e.preventDefault();
      modalTitle.textContent = 'Recover User ID';
      modalDesc.textContent = 'Please enter your registered student/faculty mobile number or alternate email address to receive your University User ID.';
      modalOverlay.classList.add('active');
    });
  }

  if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener('click', (e) => {
      e.preventDefault();
      modalTitle.textContent = 'Reset Password';
      modalDesc.textContent = 'Enter your User ID / Roll Number. A secure password reset link will be dispatched to your registered email ID.';
      modalOverlay.classList.add('active');
    });
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
    });
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
      }
    });
  }

  // Background toggle switcher
  let isClean = false;
  if (bgToggleBtn) {
    bgToggleBtn.addEventListener('click', () => {
      isClean = !isClean;
      document.body.style.backgroundImage = isClean 
        ? "url('assets/campus_perfect.jpg')" 
        : "url('assets/campus_bg.jpg')";
      bgToggleBtn.textContent = isClean ? 'Switch: Reference BG' : 'Switch: Clean BG';
    });
  // Auto-update copyright year
  const copyrightYear = document.querySelector('.copyright-text');
  if (copyrightYear) {
    copyrightYear.innerHTML = `&copy; ${new Date().getFullYear()} Cyborg IT Services Pvt. Ltd. All rights reserved.`;
  }
});
