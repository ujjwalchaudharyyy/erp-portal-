document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const sidebar = document.getElementById('sidebar');
  const sidebarToggleBtn = document.getElementById('sidebarToggleBtn');
  const sidebarCloseBtn = document.getElementById('sidebarCloseBtn');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const sidebarOverlay = document.getElementById('sidebarOverlay');
  const themeBtns = document.querySelectorAll('.theme-btn');
  const navItems = document.querySelectorAll('.nav-item');
  const moduleSearch = document.getElementById('moduleSearch');
  
  // View Containers
  const homeView = document.getElementById('homeView');
  const dashboardView = document.getElementById('dashboardView');
  const timetableView = document.getElementById('timetableView');
  const feeView = document.getElementById('feeView');
  const examView = document.getElementById('examView');
  const homeBtn = document.getElementById('homeBtn');
  const navDashboard = document.getElementById('navDashboard');
  const navAcademic = document.getElementById('navAcademic');
  const navTimetable = document.getElementById('navTimetable');
  const navFee = document.getElementById('navFee');
  const navExam = document.getElementById('navExam');
  const brandLogoLink = document.getElementById('brandLogoLink');
  const userProfileWrap = document.getElementById('userProfileWrap');
  const btnBackOverview = document.getElementById('btnBackOverview');
  const backToHomeBtns = document.querySelectorAll('.btn-back-to-home');
  const homeFeeCard = document.getElementById('homeFeeCard');
  const homeCarryCard = document.getElementById('homeCarryCard');

  // Mobile Drawer helpers
  function openMobileSidebar() {
    if (sidebar) sidebar.classList.add('mobile-open');
    if (sidebarOverlay) sidebarOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileSidebar() {
    if (sidebar) sidebar.classList.remove('mobile-open');
    if (sidebarOverlay) sidebarOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function hideAllViews() {
    if (homeView) homeView.style.display = 'none';
    if (dashboardView) dashboardView.style.display = 'none';
    if (timetableView) timetableView.style.display = 'none';
    if (feeView) feeView.style.display = 'none';
    if (examView) examView.style.display = 'none';
    navItems.forEach(n => n.classList.remove('active'));
  }

  // Switch Views
  function showHomeView(pushHistory = true) {
    closeMobileSidebar();
    hideAllViews();
    if (homeView) homeView.style.display = 'flex';
    if (pushHistory && window.location.hash) {
      history.pushState({ view: 'home' }, '', window.location.pathname);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function showDashboardView(pushHistory = true) {
    closeMobileSidebar();
    hideAllViews();
    if (dashboardView) dashboardView.style.display = 'flex';
    if (navDashboard) navDashboard.classList.add('active');
    if (navAcademic) navAcademic.classList.add('active');
    if (pushHistory) {
      history.pushState({ view: 'dashboard' }, '', '#dashboard');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function showTimetableView(pushHistory = true) {
    closeMobileSidebar();
    hideAllViews();
    if (timetableView) timetableView.style.display = 'flex';
    if (navTimetable) navTimetable.classList.add('active');
    if (pushHistory) {
      history.pushState({ view: 'timetable' }, '', '#timetable');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function showFeeView(pushHistory = true) {
    closeMobileSidebar();
    hideAllViews();
    if (feeView) feeView.style.display = 'flex';
    if (navFee) navFee.classList.add('active');
    if (pushHistory) {
      history.pushState({ view: 'fee' }, '', '#fee');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function showExamView(pushHistory = true) {
    closeMobileSidebar();
    hideAllViews();
    if (examView) examView.style.display = 'flex';
    if (navExam) navExam.classList.add('active');
    if (pushHistory) {
      history.pushState({ view: 'exam' }, '', '#exam');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Handle browser back button (popstate)
  window.addEventListener('popstate', (e) => {
    const view = (e.state && e.state.view) || (window.location.hash.replace('#', ''));
    if (view === 'dashboard') {
      showDashboardView(false);
    } else if (view === 'timetable') {
      showTimetableView(false);
    } else if (view === 'fee') {
      showFeeView(false);
    } else if (view === 'exam') {
      showExamView(false);
    } else {
      showHomeView(false);
    }
  });

  // Back button inside Dashboard view
  if (btnBackOverview) {
    btnBackOverview.addEventListener('click', (e) => {
      e.preventDefault();
      showHomeView(true);
    });
  }

  // Home Button (blue 🏠 button in topbar)
  if (homeBtn) {
    homeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showHomeView(true);
    });
  }

  if (brandLogoLink) {
    brandLogoLink.addEventListener('click', (e) => {
      e.preventDefault();
      showHomeView(true);
    });
  }

  // Dashboard Nav Click
  if (navDashboard) {
    navDashboard.addEventListener('click', (e) => {
      e.preventDefault();
      showDashboardView(true);
    });
  }

  // Academic Nav Click -> Opens Dashboard View directly
  if (navAcademic) {
    navAcademic.addEventListener('click', (e) => {
      e.preventDefault();
      showDashboardView(true);
    });
  }

  // Time Table Nav Click
  if (navTimetable) {
    navTimetable.addEventListener('click', (e) => {
      e.preventDefault();
      showTimetableView(true);
    });
  }

  // Fee Nav Click
  if (navFee) {
    navFee.addEventListener('click', (e) => {
      e.preventDefault();
      showFeeView(true);
    });
  }

  // Exam Nav Click
  if (navExam) {
    navExam.addEventListener('click', (e) => {
      e.preventDefault();
      showExamView(true);
    });
  }

  // Home Carry Card Click
  if (homeCarryCard) {
    homeCarryCard.addEventListener('click', (e) => {
      e.preventDefault();
      showExamView(true);
    });
  }

  // All 'Back to Main Overview' buttons
  backToHomeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      showHomeView(true);
    });
  });

  // Home Fee Card Click
  if (homeFeeCard) {
    homeFeeCard.addEventListener('click', (e) => {
      e.preventDefault();
      showFeeView(true);
    });
  }

  // Home Timetable Panel Full Schedule button
  const btnOpenFullTimetable = document.getElementById('btnOpenFullTimetable');
  if (btnOpenFullTimetable) {
    btnOpenFullTimetable.addEventListener('click', (e) => {
      e.preventDefault();
      showTimetableView(true);
    });
  }

  // User Profile badge click
  if (userProfileWrap) {
    userProfileWrap.addEventListener('click', () => {
      showDashboardView(true);
    });
  }

  // Mobile Drawer Toggle Button
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openMobileSidebar();
    });
  }

  // Mobile Drawer Close Button
  if (sidebarCloseBtn) {
    sidebarCloseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeMobileSidebar();
    });
  }

  // Backdrop overlay click to close
  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', () => {
      closeMobileSidebar();
    });
  }

  // Sidebar Toggle Collapse (Desktop)
  if (sidebarToggleBtn && sidebar) {
    sidebarToggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('collapsed');
      sidebarToggleBtn.textContent = sidebar.classList.contains('collapsed') ? '»' : '«';
    });
  }

  // Theme Switcher (Blue, Light, Dark)
  themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      themeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const themeVal = btn.getAttribute('data-theme-val');
      document.documentElement.setAttribute('data-theme', themeVal);
      localStorage.setItem('cyborg_theme', themeVal);
    });
  });

  // Restore saved theme
  const savedTheme = localStorage.getItem('cyborg_theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeBtns.forEach(btn => {
      if (btn.getAttribute('data-theme-val') === savedTheme) {
        themeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      }
    });
  }

  // Other Navigation items click
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      if (item === navDashboard || item === navAcademic || item === navTimetable || item === navFee || item === navExam) return; // Handled separately
      e.preventDefault();
      closeMobileSidebar();
      navItems.forEach(n => n.classList.remove('active'));
      item.classList.add('active');
    });
  });

  // Live Module Search
  if (moduleSearch) {
    moduleSearch.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      navItems.forEach(item => {
        const text = item.querySelector('span')?.textContent.toLowerCase() || '';
        if (text.includes(q)) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }

  // Check initial URL hash
  if (window.location.hash === '#dashboard' || window.location.hash === '#academic') {
    showDashboardView(false);
  } else if (window.location.hash === '#timetable') {
    showTimetableView(false);
  } else if (window.location.hash === '#fee') {
    showFeeView(false);
  } else if (window.location.hash === '#exam') {
    showExamView(false);
  } else {
    showHomeView(false);
  }
});
