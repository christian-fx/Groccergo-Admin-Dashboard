class DashboardComponent {
    constructor() {
        this.activePage = 'dashboard';
        this.sidebarOpen = false;
    }

    render() {
        return `
            <div class="flex flex-col min-h-screen">
                <!-- Mobile Sidebar Toggle -->
                <div class="lg:hidden fixed top-4 left-4 z-50">
                    <button id="sidebar-toggle" class="p-2 bg-primary text-white rounded-lg shadow-lg">
                        <span class="material-symbols-outlined">menu</span>
                    </button>
                </div>
                
                <!-- Sidebar Overlay for Mobile -->
                <div id="sidebar-overlay" class="sidebar-overlay lg:hidden"></div>
                
                <!-- Sidebar -->
                ${this.renderSidebar()}
                
                <!-- Main Content -->
                <div class="main-content flex-1 bg-gray-50 dark:bg-gray-900">
                    <!-- Header -->
                    <header class="bg-white dark:bg-gray-800 shadow-sm p-4">
                        <div class="flex justify-between items-center">
                            <div>
                                <h1 class="text-2xl font-bold text-charcoal dark:text-white" id="page-title">Dashboard</h1>
                                <p class="text-gray-light dark:text-gray-400" id="page-subtitle">Welcome back, Admin!</p>
                            </div>
                            <div class="flex items-center gap-4">
                                <button id="notification-btn" class="relative p-2 text-charcoal dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                                    <span class="material-symbols-outlined">notifications</span>
                                    <span class="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">3</span>
                                </button>
                                <button id="logout-btn" class="flex items-center gap-2 p-2 text-charcoal dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                                    <div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold">A</div>
                                    <span class="text-charcoal dark:text-white font-medium hidden sm:block">Admin User</span>
                                </button>
                            </div>
                        </div>
                    </header>
                    
                    <!-- Page Content -->
                    <div class="p-4 md:p-6">
                        ${this.renderPageContent()}
                    </div>
                </div>
            </div>
        `;
    }

    renderSidebar() {
        const menuItems = [
            { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
            { id: 'products', label: 'Products', icon: 'inventory_2' },
            { id: 'orders', label: 'Orders', icon: 'shopping_cart' },
            { id: 'delivery', label: 'Delivery', icon: 'local_shipping' },
            { id: 'customers', label: 'Customers', icon: 'group' },
            { id: 'analytics', label: 'Analytics', icon: 'analytics' },
            { id: 'settings', label: 'Settings', icon: 'settings' },
        ];

        return `
            <div class="sidebar fixed top-0 left-0 h-full bg-white dark:bg-gray-800 shadow-lg z-50 lg:z-0 overflow-y-auto ${this.sidebarOpen ? 'open' : ''}">
                <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold">GG</div>
                        <div>
                            <h2 class="text-lg font-bold text-charcoal dark:text-white">GroccerGo</h2>
                            <p class="text-xs text-gray-light dark:text-gray-400">Admin Dashboard</p>
                        </div>
                    </div>
                </div>
                
                <nav class="p-4 space-y-2">
                    ${menuItems.map(item => `
                        <button class="nav-link flex items-center gap-3 p-3 rounded-lg w-full text-left ${
                            this.activePage === item.id 
                                ? 'bg-primary text-white' 
                                : 'text-charcoal dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }" data-page="${item.id}">
                            <span class="material-symbols-outlined">${item.icon}</span>
                            <span>${item.label}</span>
                        </button>
                    `).join('')}
                </nav>
            </div>
        `;
    }

    renderPageContent() {
        switch (this.activePage) {
            case 'dashboard':
                return this.renderDashboard();
            case 'products':
                return this.renderProducts();
            case 'analytics':
                return this.renderAnalytics();
            default:
                return `<div class="text-center py-8">${this.activePage} page content coming soon...</div>`;
        }
    }

    renderDashboard() {
        return `
            <!-- Stats Overview -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                ${this.renderStatsCards()}
            </div>
            
            <!-- Charts and Data -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <!-- Revenue Chart -->
                <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                    <h3 class="text-lg font-semibold text-charcoal dark:text-white mb-4">Revenue Overview</h3>
                    <div class="chart-container" id="revenue-chart"></div>
                </div>
                
                <!-- Top Products -->
                <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                    <h3 class="text-lg font-semibold text-charcoal dark:text-white mb-4">Top Products</h3>
                    <div class="space-y-4">
                        ${mockData.topProducts.map(product => `
                            <div class="flex items-center justify-between">
                                <div class="flex items-center gap-3">
                                    <div class="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                                        <span class="material-symbols-outlined text-gray-600 dark:text-gray-400">inventory_2</span>
                                    </div>
                                    <div>
                                        <p class="font-medium text-charcoal dark:text-white">${product.name}</p>
                                        <p class="text-gray-light dark:text-gray-400 text-sm">${product.category}</p>
                                    </div>
                                </div>
                                <div class="text-right">
                                    <p class="font-medium text-charcoal dark:text-white">$${product.revenue.toLocaleString()}</p>
                                    <p class="text-green-500 text-sm">+${product.change}%</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
            
            <!-- Recent Orders -->
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-lg font-semibold text-charcoal dark:text-white">Recent Orders</h3>
                    <a href="#" class="text-primary hover:text-green-600 text-sm font-medium">View All</a>
                </div>
                
                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead>
                            <tr class="border-b border-gray-200 dark:border-gray-700">
                                <th class="text-left py-3 px-4 text-sm font-medium text-gray-light dark:text-gray-400">Order ID</th>
                                <th class="text-left py-3 px-4 text-sm font-medium text-gray-light dark:text-gray-400">Customer</th>
                                <th class="text-left py-3 px-4 text-sm font-medium text-gray-light dark:text-gray-400">Date</th>
                                <th class="text-left py-3 px-4 text-sm font-medium text-gray-light dark:text-gray-400">Amount</th>
                                <th class="text-left py-3 px-4 text-sm font-medium text-gray-light dark:text-gray-400">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${mockData.recentOrders.map(order => `
                                <tr class="border-b border-gray-200 dark:border-gray-700">
                                    <td class="py-3 px-4 text-charcoal dark:text-white">${order.id}</td>
                                    <td class="py-3 px-4 text-charcoal dark:text-white">${order.customer}</td>
                                    <td class="py-3 px-4 text-charcoal dark:text-white">${order.date}</td>
                                    <td class="py-3 px-4 text-charcoal dark:text-white">$${order.amount}</td>
                                    <td class="py-3 px-4">
                                        <span class="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 text-xs rounded-full">${order.status}</span>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    renderStatsCards() {
        const stats = mockData.dashboardStats;
        const statCards = [
            {
                title: 'Total Revenue',
                value: `$${stats.totalRevenue.toLocaleString()}`,
                change: stats.revenueChange,
                icon: 'payments',
                color: 'green'
            },
            {
                title: 'Orders',
                value: stats.totalOrders.toLocaleString(),
                change: stats.ordersChange,
                icon: 'shopping_cart',
                color: 'blue'
            },
            {
                title: 'Customers',
                value: stats.totalCustomers.toLocaleString(),
                change: stats.customersChange,
                icon: 'group',
                color: 'purple'
            },
            {
                title: 'Avg. Order Value',
                value: `$${stats.avgOrderValue}`,
                change: stats.avgOrderChange,
                icon: 'trending_up',
                color: 'orange'
            }
        ];

        return statCards.map(stat => `
            <div class="stat-card bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-gray-light dark:text-gray-400 text-sm">${stat.title}</p>
                        <h3 class="text-2xl font-bold text-charcoal dark:text-white">${stat.value}</h3>
                        <p class="text-green-500 text-sm flex items-center">
                            <span class="material-symbols-outlined text-sm mr-1">trending_up</span>
                            +${stat.change}% from last month
                        </p>
                    </div>
                    <div class="p-3 bg-${stat.color}-100 dark:bg-${stat.color}-900/30 rounded-lg">
                        <span class="material-symbols-outlined text-${stat.color}-600 dark:text-${stat.color}-400">${stat.icon}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    renderProducts() {
        return `
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                <h3 class="text-lg font-semibold text-charcoal dark:text-white mb-4">Products Management</h3>
                <p class="text-gray-light dark:text-gray-400">Products page content will be implemented here.</p>
            </div>
        `;
    }

    renderAnalytics() {
        return `
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                <h3 class="text-lg font-semibold text-charcoal dark:text-white mb-4">Analytics Dashboard</h3>
                <div class="chart-container" id="analytics-chart"></div>
            </div>
        `;
    }

    attachEventListeners() {
        // Sidebar toggle
        const sidebarToggle = document.getElementById('sidebar-toggle');
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', () => {
                this.sidebarOpen = true;
                this.rerender();
            });
        }

        // Sidebar overlay
        const sidebarOverlay = document.getElementById('sidebar-overlay');
        if (sidebarOverlay) {
            sidebarOverlay.addEventListener('click', () => {
                this.sidebarOpen = false;
                this.rerender();
            });
        }

        // Navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.activePage = link.getAttribute('data-page');
                this.sidebarOpen = false;
                this.rerender();
                this.updateCharts();
            });
        });

        // Logout button
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                localStorage.removeItem('isAuthenticated');
                window.dispatchEvent(new Event('authChange'));
            });
        }
    }

    updateCharts() {
        if (this.activePage === 'dashboard') {
            setTimeout(() => {
                if (typeof ChartsComponent !== 'undefined') {
                    const charts = new ChartsComponent();
                    charts.renderRevenueChart();
                }
            }, 100);
        }
    }

    rerender() {
        document.getElementById('app').innerHTML = this.render();
        this.attachEventListeners();
        this.updateCharts();
    }
}