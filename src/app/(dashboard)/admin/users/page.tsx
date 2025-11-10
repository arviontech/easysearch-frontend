"use client";

import { useState } from "react";
import DataTable from "@/components/dashboard/DataTable";
import { Edit, Trash2, Ban, CheckCircle, Shield } from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
  role: "user" | "admin" | "moderator";
  status: "active" | "inactive" | "banned";
  registeredAt: string;
  lastActive: string;
  postsCount: number;
}

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "user",
      status: "active",
      registeredAt: "2024-01-10",
      lastActive: "2 hours ago",
      postsCount: 12,
    },
    {
      id: 2,
      name: "Sarah Ahmed",
      email: "sarah@example.com",
      role: "user",
      status: "active",
      registeredAt: "2024-01-15",
      lastActive: "1 day ago",
      postsCount: 5,
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      role: "moderator",
      status: "active",
      registeredAt: "2023-12-05",
      lastActive: "5 hours ago",
      postsCount: 34,
    },
    {
      id: 4,
      name: "Ali Hasan",
      email: "ali@example.com",
      role: "user",
      status: "inactive",
      registeredAt: "2024-01-12",
      lastActive: "1 week ago",
      postsCount: 8,
    },
    {
      id: 5,
      name: "Spam User",
      email: "spam@example.com",
      role: "user",
      status: "banned",
      registeredAt: "2024-01-14",
      lastActive: "2 days ago",
      postsCount: 45,
    },
  ]);

  const handleBanUser = (id: number) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === id ? { ...user, status: "banned" as const } : user)),
    );
  };

  const handleActivateUser = (id: number) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === id ? { ...user, status: "active" as const } : user)),
    );
  };

  const handleDeleteUser = (id: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers((prev) => prev.filter((user) => user.id !== id));
    }
  };

  const columns = [
    {
      key: "name",
      label: "User",
      render: (user: User) => (
        <div>
          <p className="font-medium text-gray-900">{user.name}</p>
          <p className="text-xs text-gray-500">{user.email}</p>
        </div>
      ),
    },
    {
      key: "role",
      label: "Role",
      render: (user: User) => (
        <span
          className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
            user.role === "admin"
              ? "bg-red-100 text-red-700"
              : user.role === "moderator"
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-700"
          }`}
        >
          {user.role === "admin" && <Shield className="w-3 h-3 mr-1" />}
          {user.role}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (user: User) => (
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${
            user.status === "active"
              ? "bg-green-100 text-green-700"
              : user.status === "inactive"
                ? "bg-gray-100 text-gray-700"
                : "bg-red-100 text-red-700"
          }`}
        >
          {user.status}
        </span>
      ),
    },
    {
      key: "postsCount",
      label: "Posts",
      render: (user: User) => (
        <span className="font-medium text-gray-900">{user.postsCount}</span>
      ),
    },
    {
      key: "registeredAt",
      label: "Registered",
    },
    {
      key: "lastActive",
      label: "Last Active",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Users Management</h1>
          <p className="text-gray-600 mt-1">Manage all users and their permissions</p>
        </div>
        <button
          type="button"
          className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-colors shadow-md"
        >
          Add New User
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Total Users</p>
          <p className="text-2xl font-bold text-gray-900">{users.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Active</p>
          <p className="text-2xl font-bold text-green-600">
            {users.filter((u) => u.status === "active").length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Inactive</p>
          <p className="text-2xl font-bold text-gray-600">
            {users.filter((u) => u.status === "inactive").length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Banned</p>
          <p className="text-2xl font-bold text-red-600">
            {users.filter((u) => u.status === "banned").length}
          </p>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        data={users}
        columns={columns}
        searchPlaceholder="Search users by name or email..."
        actions={(user) => (
          <>
            <button
              type="button"
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Edit User"
            >
              <Edit className="w-4 h-4" />
            </button>
            {user.status === "banned" ? (
              <button
                type="button"
                onClick={() => handleActivateUser(user.id)}
                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                title="Activate User"
              >
                <CheckCircle className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => handleBanUser(user.id)}
                className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                title="Ban User"
              >
                <Ban className="w-4 h-4" />
              </button>
            )}
            <button
              type="button"
              onClick={() => handleDeleteUser(user.id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete User"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </>
        )}
      />
    </div>
  );
};

export default UsersPage;
