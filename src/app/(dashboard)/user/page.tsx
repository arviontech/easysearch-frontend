import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Heart, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function UserDashboard() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-700 to-blue-700">
                        Welcome Back!
                    </h1>
                    <p className="text-gray-500 mt-2">Find your next perfect stay or service.</p>
                </div>
                <Link href="/search">
                    <Button className="bg-cyan-600 hover:bg-cyan-700 text-white shadow-lg shadow-cyan-600/20">
                        <Search className="mr-2 h-4 w-4" /> Start Searching
                    </Button>
                </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="bg-white/60 backdrop-blur-sm border-cyan-100 shadow-sm hover:shadow-md transition-all">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">
                            Upcoming Bookings
                        </CardTitle>
                        <Calendar className="h-4 w-4 text-cyan-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-gray-800">2</div>
                        <p className="text-xs text-gray-500 font-medium mt-1">
                            Next: Green Valley Hotel (Tomorrow)
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-white/60 backdrop-blur-sm border-cyan-100 shadow-sm hover:shadow-md transition-all">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">
                            Saved Places
                        </CardTitle>
                        <Heart className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-gray-800">14</div>
                        <p className="text-xs text-gray-500 font-medium mt-1">
                            Access your wishlist
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-white/60 backdrop-blur-sm border-cyan-100 shadow-sm hover:shadow-md transition-all">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">
                            Recent Searches
                        </CardTitle>
                        <Clock className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-gray-800">8</div>
                        <p className="text-xs text-gray-500 font-medium mt-1">
                            Resume where you left off
                        </p>
                    </CardContent>
                </Card>
            </div>

            <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Recommended for You</h2>
                <div className="grid gap-6 md:grid-cols-3">
                    <Card className="bg-white shadow-sm border-0 overflow-hidden">
                        <div className="h-40 bg-gray-200 w-full animate-pulse" />
                        <CardContent className="p-4">
                            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse" />
                            <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse" />
                        </CardContent>
                    </Card>
                    <Card className="bg-white shadow-sm border-0 overflow-hidden">
                        <div className="h-40 bg-gray-200 w-full animate-pulse" />
                        <CardContent className="p-4">
                            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse" />
                            <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse" />
                        </CardContent>
                    </Card>
                    <Card className="bg-white shadow-sm border-0 overflow-hidden">
                        <div className="h-40 bg-gray-200 w-full animate-pulse" />
                        <CardContent className="p-4">
                            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse" />
                            <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse" />
                        </CardContent>
                    </Card>
                </div>
            </section>
        </div>
    );
}
