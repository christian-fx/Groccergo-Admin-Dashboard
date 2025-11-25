class App {
  constructor() {
    this.loginComponent = new LoginComponent();
    this.dashboardComponent = new DashboardComponent();
    this.init();
  }
  
  init() {
    this.checkAuth();
    this.setupEventListeners();
  }
  
  checkAuth() {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    this.render(isAuthenticated);
  }
  
  setupEventListeners() {
    window.addEventListener('authChange', () => {
      this.checkAuth();
    });
    
    // Theme toggle
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.className = savedTheme;
  }
  
  render(isAuthenticated) {
    const appElement = document.getElementById('app');
    
    if (isAuthenticated) {
      appElement.innerHTML = this.dashboardComponent.render();
      this.dashboardComponent.attachEventListeners();
      
      // Initialize charts after a short delay
      setTimeout(() => {
        if (typeof ChartsComponent !== 'undefined') {
          const charts = new ChartsComponent();
          charts.renderRevenueChart();
        }
      }, 100);
    } else {
      appElement.innerHTML = this.loginComponent.render();
      this.loginComponent.attachEventListeners();
    }
  }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new App();
});

// Simple theme toggle function
function toggleTheme() {
  const html = document.documentElement;
  if (html.classList.contains('light')) {
    html.classList.remove('light');
    html.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    html.classList.remove('dark');
    html.classList.add('light');
    localStorage.setItem('theme', 'light');
  }
}

// Add theme toggle to window for easy access
window.toggleTheme = toggleTheme;