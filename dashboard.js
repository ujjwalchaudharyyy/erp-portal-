document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const sidebar = document.getElementById('sidebar');
  const sidebarToggleBtn = document.getElementById('sidebarToggleBtn');
  const themeBtns = document.querySelectorAll('.theme-btn');
  const navItems = document.querySelectorAll('.nav-item');
  const moduleSearch = document.getElementById('moduleSearch');
  
  // View Containers
  const homeView = document.getElementById('homeView');
  const dashboardView = document.getElementById('dashboardView');
  const homeBtn = document.getElementById('homeBtn');
  const navDashboard = document.getElementById('navDashboard');
  const brandLogoLink = document.getElementById('brandLogoLink');
  const userProfileWrap = document.getElementById('userProfileWrap');
  const btnBackOverview = document.getElementById('btnBackOverview');

  // Switch between Home View (default on login) and Dashboard View
  function showHomeView(pushHistory = true) {
    if (homeView) homeView.style.display = 'flex';
    if (dashboardView) dashboardView.style.display = 'none';
    navItems.forEach(n => n.classList.remove('active'));
    if (pushHistory && window.location.hash === '#dashboard') {
      history.pushState({ view: 'home' }, '', window.location.pathname);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function showDashboardView(pushHistory = true) {
    if (homeView) homeView.style.display = 'none';
    if (dashboardView) dashboardView.style.display = 'flex';
    navItems.forEach(n => n.classList.remove('active'));
    if (navDashboard) navDashboard.classList.add('active');
    if (pushHistory) {
      history.pushState({ view: 'dashboard' }, '', '#dashboard');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Handle browser back button (popstate)
  window.addEventListener('popstate', (e) => {
    if (e.state && e.state.view === 'dashboard') {
      showDashboardView(false);
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

  // Dashboard Nav Click (Sidebar menu)
  if (navDashboard) {
    navDashboard.addEventListener('click', (e) => {
      e.preventDefault();
      showDashboardView(true);
    });
  }

  // User Profile badge click
  if (userProfileWrap) {
    userProfileWrap.addEventListener('click', () => {
      showDashboardView(true);
    });
  }

  // Sidebar Toggle Collapse
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
      e.preventDefault();
      if (item === navDashboard) return; // Handled separately
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
  if (window.location.hash === '#dashboard') {
    showDashboardView(false);
  } else {
    showHomeView(false);
  }
});
