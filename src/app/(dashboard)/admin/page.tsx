"use client";

import StatsCard from "@/app/(dashboard)/_component/statcards/StatsCard";
import {
  Building2,
  Users,
  FileText,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import {
  useGetAnalyticsSummaryQuery,
  useGetListingsStatsQuery,
  useGetUserStatsQuery,
} from "@/lib/redux/features/analytics/analyticsApi";

const AdminHomePage = () => {
  const { data: summary, isLoading: isSummaryLoading } = useGetAnalyticsSummaryQuery(undefined);
  const { data: listingsStats, isLoading: isListingsLoading } = useGetListingsStatsQuery(undefined);
  const { data: userStats, isLoading: isUserLoading } = useGetUserStatsQuery(undefined);

  const isLoading = isSummaryLoading || isListingsLoading || isUserLoading;

  // Mock data - replace with real data from API
  const stats = [
    {
      title: "Total Properties",
      value: isLoading ? "..." : (summary?.listings?.houseRent + summary?.listings?.hostelRent || 0).toLocaleString(),
      icon: Building2,
      trend: { value: 12.5, isPositive: true },
      color: "blue" as const,
    },
    {
      title: "Active Users",
      value: isLoading ? "..." : (userStats?.status?.active || 0).toLocaleString(),
      icon: Users,
      trend: { value: 8.2, isPositive: true },
      color: "green" as const,
    },
    {
      title: "Pending Approvals",
      value: isLoading ? "..." : (
        (listingsStats?.houseRent?.pending || 0) +
        (listingsStats?.hostelRent?.pending || 0) +
        (listingsStats?.food?.pending || 0) +
        (listingsStats?.catering?.pending || 0) +
        (listingsStats?.tourism?.pending || 0)
      ).toLocaleString(),
      icon: Clock,
      trend: { value: 3.1, isPositive: false },
      color: "yellow" as const,
    },
    {
      title: "Monthly Revenue",
      value: "$12,450", // Placeholder
      icon: DollarSign,
      trend: { value: 15.3, isPositive: true },
      color: "purple" as const,
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: "property",
      title: "New property listing",
      description: "3 BHK Apartment in Shaheb Bazar",
      user: "John Doe",
      time: "5 minutes ago",
      status: "pending",
    },
    {
      id: 2,
      type: "user",
      title: "New user registration",
      description: "Sarah Ahmed joined the platform",
      user: "Sarah Ahmed",
      time: "15 minutes ago",
      status: "approved",
    },
    {
      id: 3,
      type: "review",
      title: "New review posted",
      description: "5-star review for Hostel Prime",
      user: "Mike Johnson",
      time: "1 hour ago",
      status: "approved",
    },
    {
      id: 4,
      type: "report",
      title: "Content reported",
      description: "Inappropriate review flagged",
      user: "System",
      time: "2 hours ago",
      status: "pending",
    },
  ];

  const quickActions = [
    { name: "Add Property", icon: Building2, href: "/admin/properties/new", color: "blue" },
    { name: "Add Service", icon: FileText, href: "/admin/services/new", color: "green" },
    { name: "Approve Posts", icon: CheckCircle, href: "/admin/approvals", color: "yellow" },
    { name: "View Analytics", icon: TrendingUp, href: "/admin/analytics", color: "purple" },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600 mt-1">
            Welcome back! Here's what's happening with your platform today.
          </p>
        </div>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            const colorClasses = {
              blue: "from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
              green: "from-green-500 to-green-600 hover:from-green-600 hover:to-green-700",
              yellow: "from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600",
              purple: "from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700",
            };

            return (
              <a
                key={action.name}
                href={action.href}
                className={`bg-gradient-to-br ${colorClasses[action.color as keyof typeof colorClasses]
                  } text-white rounded-lg p-6 flex flex-col items-center justify-center space-y-2 hover:shadow-lg transition-all`}
              >
                <Icon className="w-8 h-8" />
                <span className="font-medium text-center">{action.name}</span>
              </a>
            );
          })}
        </div>
      </div>

      {/* Charts and Recent Activities Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart Placeholder */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Activity Overview</h2>
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
            <div className="text-center">
              <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Chart will be displayed here</p>
              <p className="text-sm text-gray-400 mt-1">
                Integration with chart library (e.g., recharts) needed
              </p>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Recent Activities</h2>
            <a href="/admin/activities" className="text-sm text-yellow-600 hover:text-yellow-700">
              View all
            </a>
          </div>
          <div className="space-y-4 max-h-64 overflow-y-auto">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start space-x-3 pb-4 border-b border-gray-100 last:border-b-0"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${activity.status === "approved"
                    ? "bg-green-100"
                    : activity.status === "pending"
                      ? "bg-yellow-100"
                      : "bg-red-100"
                    }`}
                >
                  {activity.status === "approved" ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-yellow-600" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                  <p className="text-sm text-gray-600 truncate">{activity.description}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-gray-500">{activity.user}</span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </div>
                </div>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${activity.status === "approved"
                    ? "bg-green-100 text-green-700"
                    : activity.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                    }`}
                >
                  {activity.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Properties by Type</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Houses</span>
              <span className="font-semibold text-gray-900">
                {isLoading ? "..." : (listingsStats?.houseRent?.total || 0).toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Hostels</span>
              <span className="font-semibold text-gray-900">
                {isLoading ? "..." : (listingsStats?.hostelRent?.total || 0).toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Apartments</span>
              <span className="font-semibold text-gray-900">
                {isLoading ? "..." : "0"}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Services Overview</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Doctors</span>
              <span className="font-semibold text-gray-900">
                {isLoading ? "..." : (summary?.listings?.doctor || 0).toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Catering</span>
              <span className="font-semibold text-gray-900">
                {isLoading ? "..." : (summary?.listings?.catering || 0).toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Tourism</span>
              <span className="font-semibold text-gray-900">
                {isLoading ? "..." : (summary?.listings?.tourism || 0).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">User Statistics</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Active Users</span>
              <span className="font-semibold text-gray-900">
                {isLoading ? "..." : (userStats?.status?.active || 0).toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Pending Approval</span>
              <span className="font-semibold text-yellow-600">
                {isLoading ? "..." : "0"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Blocked</span>
              <span className="font-semibold text-red-600">
                {isLoading ? "..." : (userStats?.status?.blocked || 0).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
