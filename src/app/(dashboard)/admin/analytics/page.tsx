"use client";

import StatsCard from "@/app/(dashboard)/_component/statcards/StatsCard";
import {
    Building2,
    Users,
    DollarSign,
    TrendingUp,
    Clock,
    Activity,
    BarChart,
    PieChart
} from "lucide-react";
import {
    useGetAnalyticsSummaryQuery,
    useGetListingsStatsQuery,
    useGetUserStatsQuery,
} from "@/lib/redux/features/analytics/analyticsApi";

const AnalyticsPage = () => {
    const { data: summary, isLoading: isSummaryLoading } = useGetAnalyticsSummaryQuery(undefined);
    const { data: listingsStats, isLoading: isListingsLoading } = useGetListingsStatsQuery(undefined);
    const { data: userStats, isLoading: isUserLoading } = useGetUserStatsQuery(undefined);

    const isLoading = isSummaryLoading || isListingsLoading || isUserLoading;

    const stats = [
        {
            title: "Total Listings",
            value: isLoading ? "..." : (
                (listingsStats?.houseRent?.total || 0) +
                (listingsStats?.hostelRent?.total || 0) +
                (listingsStats?.food?.total || 0) +
                (listingsStats?.catering?.total || 0) +
                (listingsStats?.tourism?.total || 0)
            ).toLocaleString(),
            icon: Building2,
            trend: { value: 12.5, isPositive: true },
            color: "blue" as const,
        },
        {
            title: "Total Users",
            value: isLoading ? "..." : (userStats?.total || 0).toLocaleString(),
            icon: Users,
            trend: { value: 8.2, isPositive: true },
            color: "green" as const,
        },
        {
            title: "Pending Reviews",
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
            title: "Active Blogs",
            value: isLoading ? "..." : (summary?.content?.blogs || 0).toLocaleString(),
            icon: Activity,
            trend: { value: 5.3, isPositive: true },
            color: "purple" as const,
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
                    <p className="text-gray-600 mt-1">
                        Detailed insights and statistics about your platform.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <StatsCard key={stat.title} {...stat} />
                ))}
            </div>

            {/* Detailed Breakdowns */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Listings Breakdown */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                            <BarChart className="w-5 h-5 text-gray-500" />
                            Listings Breakdown
                        </h2>
                    </div>
                    <div className="space-y-4">
                        {[
                            { label: "House Rent", data: listingsStats?.houseRent },
                            { label: "Hostel Rent", data: listingsStats?.hostelRent },
                            { label: "Food", data: listingsStats?.food },
                            { label: "Catering", data: listingsStats?.catering },
                            { label: "Tourism", data: listingsStats?.tourism },
                        ].map((item) => (
                            <div key={item.label} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <span className="font-medium text-gray-700">{item.label}</span>
                                <div className="flex items-center gap-3">
                                    <span className="text-sm px-2 py-1 bg-green-100 text-green-700 rounded-md">
                                        {isLoading ? "..." : (item.data?.approved || 0)} Active
                                    </span>
                                    <span className="text-sm px-2 py-1 bg-yellow-100 text-yellow-700 rounded-md">
                                        {isLoading ? "..." : (item.data?.pending || 0)} Pending
                                    </span>
                                    <span className="font-bold text-gray-900 min-w-[3rem] text-right">
                                        {isLoading ? "..." : (item.data?.total || 0)}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* User Distribution */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                            <Users className="w-5 h-5 text-gray-500" />
                            User Distribution
                        </h2>
                    </div>
                    <div className="space-y-6">
                        {/* By Status */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">By Status</h3>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="text-center p-3 bg-green-50 rounded-lg border border-green-100">
                                    <div className="text-2xl font-bold text-green-600">
                                        {isLoading ? "..." : (userStats?.status?.active || 0)}
                                    </div>
                                    <div className="text-xs text-green-800 font-medium">Active</div>
                                </div>
                                <div className="text-center p-3 bg-red-50 rounded-lg border border-red-100">
                                    <div className="text-2xl font-bold text-red-600">
                                        {isLoading ? "..." : (userStats?.status?.blocked || 0)}
                                    </div>
                                    <div className="text-xs text-red-800 font-medium">Blocked</div>
                                </div>
                                <div className="text-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                                    <div className="text-2xl font-bold text-gray-600">
                                        {isLoading ? "..." : (userStats?.status?.inactive || 0)}
                                    </div>
                                    <div className="text-xs text-gray-800 font-medium">Inactive</div>
                                </div>
                            </div>
                        </div>

                        {/* By Role */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">By Role</h3>
                            <div className="space-y-3">
                                {[
                                    { label: "Customers", count: userStats?.roles?.customer, color: "bg-blue-500" },
                                    { label: "Hosts", count: userStats?.roles?.host, color: "bg-purple-500" },
                                    { label: "Admins", count: userStats?.roles?.admin, color: "bg-gray-800" },
                                ].map((role) => (
                                    <div key={role.label} className="relative">
                                        <div className="flex items-center justify-between text-sm mb-1">
                                            <span className="font-medium text-gray-700">{role.label}</span>
                                            <span className="font-bold text-gray-900">{isLoading ? "..." : (role.count || 0)}</span>
                                        </div>
                                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full ${role.color}`}
                                                style={{ width: isLoading ? '0%' : `${((role.count || 0) / (userStats?.total || 1)) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsPage;
