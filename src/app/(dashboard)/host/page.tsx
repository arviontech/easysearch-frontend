import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Home, Calendar, DollarSign } from "lucide-react";

export default function HostDashboard() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-700 to-blue-700">
                    Host Dashboard
                </h1>
                <p className="text-gray-500 mt-2">Manage your properties and listings</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="bg-white/60 backdrop-blur-sm border-cyan-100 shadow-sm hover:shadow-md transition-all">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">
                            Total Properties
                        </CardTitle>
                        <Building2 className="h-4 w-4 text-cyan-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-gray-800">12</div>
                        <p className="text-xs text-green-600 font-medium mt-1">
                            +2 active listings
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-white/60 backdrop-blur-sm border-cyan-100 shadow-sm hover:shadow-md transition-all">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">
                            Total Hostels
                        </CardTitle>
                        <Home className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-gray-800">4</div>
                        <p className="text-xs text-gray-500 font-medium mt-1">
                            Full occupancy in 2
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-white/60 backdrop-blur-sm border-cyan-100 shadow-sm hover:shadow-md transition-all">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">
                            Active Bookings
                        </CardTitle>
                        <Calendar className="h-4 w-4 text-purple-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-gray-800">28</div>
                        <p className="text-xs text-green-600 font-medium mt-1">
                            +15% from last month
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-white/60 backdrop-blur-sm border-cyan-100 shadow-sm hover:shadow-md transition-all">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">
                            Total Revenue
                        </CardTitle>
                        <DollarSign className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-gray-800">$12,450</div>
                        <p className="text-xs text-green-600 font-medium mt-1">
                            +8% from last month
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Placeholder for Recent Activity or Charts */}
                <Card className="col-span-1 h-[300px] bg-white/60 backdrop-blur-sm border-cyan-100">
                    <CardHeader>
                        <CardTitle>Recent Bookings</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center justify-center h-[200px] text-gray-400">
                        No recent bookings
                    </CardContent>
                </Card>
                <Card className="col-span-1 h-[300px] bg-white/60 backdrop-blur-sm border-cyan-100">
                    <CardHeader>
                        <CardTitle>Occupancy Rate</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center justify-center h-[200px] text-gray-400">
                        Chart Placeholder
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
