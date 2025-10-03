'use client';

import { useState, useEffect } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  ShoppingCart, 
  DollarSign, 
  Globe, 
  Mail,
  MessageCircle,
  Star,
  Package,
  CreditCard
} from 'lucide-react';

// TechNova Analytics Dashboard
const AnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [isLoading, setIsLoading] = useState(true);

  // Mock analytics data - in production, this would come from Google Analytics API
  const analyticsData = {
    overview: {
      totalUsers: 12547,
      totalSessions: 18934,
      totalRevenue: 284750,
      conversionRate: 3.2,
      avgOrderValue: 89.50,
      totalOrders: 3182
    },
    traffic: [
      { date: '2024-01-01', users: 1200, sessions: 1800, revenue: 24500 },
      { date: '2024-01-02', users: 1350, sessions: 1950, revenue: 28750 },
      { date: '2024-01-03', users: 1180, sessions: 1720, revenue: 22300 },
      { date: '2024-01-04', users: 1420, sessions: 2100, revenue: 31200 },
      { date: '2024-01-05', users: 1580, sessions: 2350, revenue: 35800 },
      { date: '2024-01-06', users: 1680, sessions: 2480, revenue: 38900 },
      { date: '2024-01-07', users: 1750, sessions: 2600, revenue: 42100 }
    ],
    countries: [
      { name: 'United States', users: 4500, percentage: 35.9 },
      { name: 'India', users: 3200, percentage: 25.5 },
      { name: 'United Kingdom', users: 1800, percentage: 14.3 },
      { name: 'Germany', users: 1200, percentage: 9.6 },
      { name: 'Canada', users: 800, percentage: 6.4 },
      { name: 'Others', users: 1047, percentage: 8.3 }
    ],
    products: [
      { name: 'TechNova Wireless Charger', sales: 450, revenue: 13500 },
      { name: 'TechNova Smart Watch', sales: 320, revenue: 19200 },
      { name: 'TechNova Earbuds', sales: 280, revenue: 14000 },
      { name: 'TechNova USB Hub', sales: 210, revenue: 7350 },
      { name: 'TechNova Gaming Mouse', sales: 180, revenue: 5400 }
    ],
    marketing: {
      emailSubscribers: 8940,
      emailOpenRate: 28.5,
      emailClickRate: 4.2,
      supportTickets: 156,
      chatSessions: 342,
      customerSatisfaction: 4.8
    }
  };

  const COLORS = ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#6b7280'];

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeRange]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900">Loading TechNova Analytics...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">TechNova Analytics</h1>
              <p className="text-gray-600">Global performance insights and key metrics</p>
            </div>
            <div className="flex gap-2">
              {['7d', '30d', '90d'].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    timeRange === range
                      ? 'bg-purple-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {range === '7d' ? 'Last 7 Days' : range === '30d' ? 'Last 30 Days' : 'Last 90 Days'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{analyticsData.overview.totalUsers.toLocaleString()}</h3>
            <p className="text-gray-600">Total Users</p>
            <p className="text-sm text-green-600 mt-1">+12.5% from last period</p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">${analyticsData.overview.totalRevenue.toLocaleString()}</h3>
            <p className="text-gray-600">Total Revenue</p>
            <p className="text-sm text-green-600 mt-1">+18.3% from last period</p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-green-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{analyticsData.overview.totalOrders.toLocaleString()}</h3>
            <p className="text-gray-600">Total Orders</p>
            <p className="text-sm text-green-600 mt-1">+8.7% from last period</p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{analyticsData.overview.conversionRate}%</h3>
            <p className="text-gray-600">Conversion Rate</p>
            <p className="text-sm text-green-600 mt-1">+0.3% from last period</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Traffic Chart */}
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Traffic & Revenue Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analyticsData.traffic}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value, name) => [
                  name === 'revenue' ? `$${value.toLocaleString()}` : value.toLocaleString(),
                  name === 'users' ? 'Users' : name === 'sessions' ? 'Sessions' : 'Revenue'
                ]} />
                <Line type="monotone" dataKey="users" stroke="#8b5cf6" strokeWidth={2} />
                <Line type="monotone" dataKey="sessions" stroke="#06b6d4" strokeWidth={2} />
                <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Country Distribution */}
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Global User Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analyticsData.countries}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) => `${name}: ${percentage}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="users"
                >
                  {analyticsData.countries.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [value.toLocaleString(), 'Users']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Product Performance & Marketing Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Top Products */}
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Products</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analyticsData.products} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={150} />
                <Tooltip formatter={(value, name) => [
                  name === 'revenue' ? `$${value.toLocaleString()}` : value.toLocaleString(),
                  name === 'sales' ? 'Sales' : 'Revenue'
                ]} />
                <Bar dataKey="sales" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Marketing Metrics */}
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Marketing & Support Metrics</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-purple-600" />
                  <span className="font-medium">Email Subscribers</span>
                </div>
                <span className="text-xl font-bold">{analyticsData.marketing.emailSubscribers.toLocaleString()}</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  <span className="font-medium">Email Open Rate</span>
                </div>
                <span className="text-xl font-bold">{analyticsData.marketing.emailOpenRate}%</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-5 h-5 text-green-600" />
                  <span className="font-medium">Support Chats</span>
                </div>
                <span className="text-xl font-bold">{analyticsData.marketing.chatSessions}</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Star className="w-5 h-5 text-yellow-600" />
                  <span className="font-medium">Customer Rating</span>
                </div>
                <span className="text-xl font-bold">{analyticsData.marketing.customerSatisfaction}/5.0</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
              <Package className="w-5 h-5 text-purple-600" />
              <span className="font-medium">Export Product Data</span>
            </button>
            
            <button className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
              <CreditCard className="w-5 h-5 text-blue-600" />
              <span className="font-medium">Payment Report</span>
            </button>
            
            <button className="flex items-center gap-3 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
              <Globe className="w-5 h-5 text-green-600" />
              <span className="font-medium">Global Analytics</span>
            </button>
            
            <button className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
              <Mail className="w-5 h-5 text-orange-600" />
              <span className="font-medium">Email Campaigns</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;