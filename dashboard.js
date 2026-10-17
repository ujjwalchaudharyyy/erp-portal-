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
  const navHostel = document.getElementById('navHostel');
  const navPlacement = document.getElementById('navPlacement');
  const hostelFeeCard = document.getElementById('hostelFeeCard');
  const placementCard = document.getElementById('placementCard');
  const btnPlacementViewAll = document.getElementById('btnPlacementViewAll');
  const placementEmptyBox = document.getElementById('placementEmptyBox');
  const pillPlacementStatus = document.getElementById('pillPlacementStatus');
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
    } else if (view === 'hostel') {
      handleHostelClick(null, false);
    } else if (view === 'placement') {
      handlePlacementClick(null, false);
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

  // Hostel & Placement Handlers
  function handleHostelClick(e, pushHistory = true) {
    if (e && e.preventDefault) e.preventDefault();
    closeMobileSidebar();
    showFeeView(pushHistory);
    navItems.forEach(n => n.classList.remove('active'));
    if (navHostel) navHostel.classList.add('active');
    if (pushHistory) {
      history.pushState({ view: 'hostel' }, '', '#hostel');
    }
    setTimeout(() => {
      const card = document.getElementById('hostelFeeCard');
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        card.classList.add('card-pulse-highlight');
        setTimeout(() => card.classList.remove('card-pulse-highlight'), 1800);
      }
    }, 150);
  }

  function handlePlacementClick(e, pushHistory = true) {
    if (e && e.preventDefault) e.preventDefault();
    closeMobileSidebar();
    alert("Not eligible in 3 Sem!\n\nCampus placement drives, company registrations, and full-time internships eligibility begins in Semester 6 / 7.");
    showFeeView(pushHistory);
    navItems.forEach(n => n.classList.remove('active'));
    if (navPlacement) navPlacement.classList.add('active');
    if (pushHistory) {
      history.pushState({ view: 'placement' }, '', '#placement');
    }
    setTimeout(() => {
      const card = document.getElementById('placementCard');
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        card.classList.add('card-pulse-highlight');
        setTimeout(() => card.classList.remove('card-pulse-highlight'), 1800);
      }
    }, 150);
  }

  // Hostel Nav Click
  if (navHostel) {
    navHostel.addEventListener('click', (e) => handleHostelClick(e, true));
  }

  // Placement Nav & Card Clicks
  if (navPlacement) {
    navPlacement.addEventListener('click', (e) => handlePlacementClick(e, true));
  }
  if (btnPlacementViewAll) {
    btnPlacementViewAll.addEventListener('click', (e) => handlePlacementClick(e, false));
  }
  if (placementEmptyBox) {
    placementEmptyBox.addEventListener('click', (e) => handlePlacementClick(e, false));
  }
  if (pillPlacementStatus) {
    pillPlacementStatus.addEventListener('click', (e) => handlePlacementClick(e, false));
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
      if (item === navDashboard || item === navAcademic || item === navTimetable || item === navFee || item === navExam || item === navHostel || item === navPlacement) return; // Handled separately
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

  // =========================================================
  // DYNAMIC LIVE DATE & TIME AUTO-UPDATER
  // =========================================================
  function updateLiveDateTime() {
    const now = new Date();
    
    const daysShortUpper = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const daysShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const daysFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthsShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const dayOfWeek = now.getDay();
    const dayDate = now.getDate();
    const monthIndex = now.getMonth();
    const fullYear = now.getFullYear();
    
    // 1. Topbar Date (e.g., "SAT 17 Oct, 2026")
    const topbarDateEl = document.getElementById('topbarCurrentDate') || document.querySelector('.current-date');
    if (topbarDateEl) {
      topbarDateEl.textContent = `${daysShortUpper[dayOfWeek]} ${dayDate} ${monthsShort[monthIndex]}, ${fullYear}`;
    }

    // 2. Timetable Panel Date Pill on Home Overview (e.g., "Sat 17 Oct")
    const homeDatePillEl = document.getElementById('homeTimetableDatePill') || document.querySelector('.date-pill');
    if (homeDatePillEl) {
      homeDatePillEl.textContent = `${daysShort[dayOfWeek]} ${dayDate} ${monthsShort[monthIndex]}`;
    }

    // 3. Timetable Live Day & Time Pills (Official Timetable View)
    const ttLiveDayPill = document.getElementById('ttLiveDayPill') || document.querySelector('.day-active-pill');
    if (ttLiveDayPill) {
      ttLiveDayPill.innerHTML = `<span class="live-dot"></span> ${daysFull[dayOfWeek]}`;
    }

    const ttLiveTimePill = document.getElementById('ttLiveTimePill') || document.querySelector('.time-active-pill');
    if (ttLiveTimePill) {
      let hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      ttLiveTimePill.textContent = `${String(hours).padStart(2, '0')}:${minutes} ${ampm}`;
    }

    // 4. Session Badge Auto-Calculation (e.g. SESSION 2026-27)
    const sessionBadgeText = document.getElementById('sessionBadgeText');
    if (sessionBadgeText) {
      const startYear = monthIndex >= 6 ? fullYear : fullYear - 1;
      const endYearShort = String((startYear + 1) % 100).padStart(2, '0');
      sessionBadgeText.innerHTML = `SESSION <strong>${startYear}-${endYearShort}</strong>`;
    }

    // 5. Highlight today's row in weekly timetable
    const currentDayName = daysFull[dayOfWeek];
    const timetableRows = document.querySelectorAll('.official-timetable tbody tr');
    let matchedDay = false;
    timetableRows.forEach(row => {
      const dayCell = row.querySelector('.col-sticky-day.day-name');
      if (dayCell) {
        const cellDay = dayCell.textContent.trim();
        if (cellDay.toLowerCase() === currentDayName.toLowerCase()) {
          row.classList.add('row-active-day');
          dayCell.classList.add('day-highlight');
          matchedDay = true;
        } else {
          row.classList.remove('row-active-day');
          dayCell.classList.remove('day-highlight');
        }
      }
    });

    // If weekend (Sunday or Saturday), highlight Friday as latest class reference
    if (!matchedDay && timetableRows.length > 0) {
      const fridayRow = Array.from(timetableRows).find(r => r.querySelector('.day-name')?.textContent.includes('Friday'));
      if (fridayRow) {
        fridayRow.classList.add('row-active-day');
        fridayRow.querySelector('.day-name')?.classList.add('day-highlight');
      }
    }
  }

  // Initial update and live auto-updater every 1 second
  updateLiveDateTime();
  setInterval(updateLiveDateTime, 1000);

  // Check initial URL hash
  if (window.location.hash === '#dashboard' || window.location.hash === '#academic') {
    showDashboardView(false);
  } else if (window.location.hash === '#timetable') {
    showTimetableView(false);
  } else if (window.location.hash === '#fee') {
    showFeeView(false);
  } else if (window.location.hash === '#hostel') {
    handleHostelClick(null, false);
  } else if (window.location.hash === '#placement') {
    handlePlacementClick(null, false);
  } else if (window.location.hash === '#exam') {
    showExamView(false);
  } else {
    showHomeView(false);
  }
});
