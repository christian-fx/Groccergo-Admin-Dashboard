const mockData = {
  dashboardStats: {
    totalRevenue: 12426,
    totalOrders: 1248,
    totalCustomers: 8642,
    avgOrderValue: 42.36,
    revenueChange: 12.5,
    ordersChange: 8.2,
    customersChange: 5.7,
    avgOrderChange: 3.2
  },
  revenueData: [
    { month: 'Jan', revenue: 8500 },
    { month: 'Feb', revenue: 9200 },
    { month: 'Mar', revenue: 10100 },
    { month: 'Apr', revenue: 11300 },
    { month: 'May', revenue: 12500 },
    { month: 'Jun', revenue: 13800 },
    { month: 'Jul', revenue: 14200 },
    { month: 'Aug', revenue: 12800 },
    { month: 'Sep', revenue: 11900 },
    { month: 'Oct', revenue: 12426 }
  ],
  topProducts: [
    { name: 'Organic Gala Apples', category: 'Fruits', revenue: 2842, change: 12.4 },
    { name: 'Organic Bananas', category: 'Fruits', revenue: 1956, change: 8.7 },
    { name: 'Organic Brown Eggs', category: 'Dairy & Eggs', revenue: 1723, change: 5.3 },
    { name: 'Artisan Sourdough', category: 'Bakery', revenue: 1428, change: 10.2 }
  ],
  recentOrders: [
    { id: 'GG-783421', customer: 'Sarah Johnson', date: 'Oct 15, 2023', amount: 42.50, status: 'Delivered' },
    { id: 'GG-783420', customer: 'Michael Chen', date: 'Oct 15, 2023', amount: 67.25, status: 'Out for Delivery' },
    { id: 'GG-783419', customer: 'Emma Rodriguez', date: 'Oct 14, 2023', amount: 35.80, status: 'Processing' },
    { id: 'GG-783418', customer: 'David Wilson', date: 'Oct 14, 2023', amount: 89.45, status: 'Shipped' }
  ]
};