class LoginComponent {
  constructor() {
    this.isForgotPassword = false;
  }
  
  render() {
    if (this.isForgotPassword) {
      return this.renderForgotPassword();
    }
    return this.renderLogin();
  }
  
  renderLogin() {
    return `
            <div class="login-container">
                <div class="login-card p-8">
                    <div class="text-center mb-8">
                        <h1 class="text-3xl font-bold text-charcoal dark:text-white mb-2">GroccerGo Admin</h1>
                        <p class="text-gray-light dark:text-gray-400">Sign in to access the dashboard</p>
                    </div>
                    
                    <form id="login-form" class="space-y-6">
                        <div>
                            <label for="email" class="block text-sm font-medium text-charcoal dark:text-gray-300 mb-1">Username</label>
                            <input type="text" id="email" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary focus:border-primary bg-background-light dark:bg-background-dark/50" placeholder="Enter your username" required>
                        </div>
                        
                        <div class="relative">
                            <label for="password" class="block text-sm font-medium text-charcoal dark:text-gray-300 mb-1">Password</label>
                            <input type="password" id="password" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary focus:border-primary bg-background-light dark:bg-background-dark/50 pr-10" placeholder="Enter your password" required>
                            <button type="button" id="toggle-password" class="absolute right-3 top-9 text-gray-400 hover:text-gray-600">
                                <span id="password-icon" class="material-symbols-outlined">visibility_off</span>
                            </button>
                        </div>
                        
                        <div id="login-error" class="hidden text-red-500 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                            Invalid username or password. Please try again.
                        </div>
                        
                        <button type="submit" class="w-full py-3 bg-primary text-white font-bold rounded-lg hover:bg-green-600 transition-colors">
                            Sign In
                        </button>
                        
                        <div class="text-center">
                            <button type="button" id="forgot-password-link" class="text-primary hover:text-green-600 text-sm">Forgot password?</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
  }
  
  renderForgotPassword() {
    return `
            <div class="login-container">
                <div class="login-card p-8">
                    <div class="text-center mb-8">
                        <h1 class="text-3xl font-bold text-charcoal dark:text-white mb-2">Reset Password</h1>
                        <p class="text-gray-light dark:text-gray-400">Enter your username to reset your password</p>
                    </div>
                    
                    <form id="forgot-password-form" class="space-y-6">
                        <div>
                            <label for="reset-username" class="block text-sm font-medium text-charcoal dark:text-gray-300 mb-1">Username</label>
                            <input type="text" id="reset-username" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary focus:border-primary bg-background-light dark:bg-background-dark/50" placeholder="Enter your username" required>
                        </div>
                        
                        <button type="submit" class="w-full py-3 bg-primary text-white font-bold rounded-lg hover:bg-green-600 transition-colors">
                            Send Reset Instructions
                        </button>
                        
                        <div class="text-center">
                            <button type="button" id="back-to-login" class="text-primary hover:text-green-600 text-sm">Back to Login</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
  }
  
  attachEventListeners() {
    // Toggle password visibility
    const togglePassword = document.getElementById('toggle-password');
    if (togglePassword) {
      togglePassword.addEventListener('click', this.togglePasswordVisibility);
    }
    
    // Forgot password link
    const forgotPasswordLink = document.getElementById('forgot-password-link');
    if (forgotPasswordLink) {
      forgotPasswordLink.addEventListener('click', (e) => {
        e.preventDefault();
        this.isForgotPassword = true;
        this.rerender();
      });
    }
    
    // Back to login
    const backToLogin = document.getElementById('back-to-login');
    if (backToLogin) {
      backToLogin.addEventListener('click', (e) => {
        e.preventDefault();
        this.isForgotPassword = false;
        this.rerender();
      });
    }
    
    // Login form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', this.handleLogin.bind(this));
    }
    
    // Forgot password form
    const forgotPasswordForm = document.getElementById('forgot-password-form');
    if (forgotPasswordForm) {
      forgotPasswordForm.addEventListener('submit', this.handleForgotPassword.bind(this));
    }
  }
  
  togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const passwordIcon = document.getElementById('password-icon');
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    passwordIcon.textContent = type === 'password' ? 'visibility_off' : 'visibility';
  }
  
  handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorElement = document.getElementById('login-error');
    
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('isAuthenticated', 'true');
      window.dispatchEvent(new Event('authChange'));
    } else {
      errorElement.classList.remove('hidden');
    }
  }
  
  handleForgotPassword(e) {
    e.preventDefault();
    const username = document.getElementById('reset-username').value;
    alert(`Password reset instructions would be sent to ${username} in a real application.`);
    this.isForgotPassword = false;
    this.rerender();
  }
  
  rerender() {
    document.getElementById('app').innerHTML = this.render();
    this.attachEventListeners();
  }
}