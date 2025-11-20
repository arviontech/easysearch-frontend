"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import DataTable from "@/app/(dashboard)/_component/table/DataTable";
import { Edit, Trash2, Ban, CheckCircle, Shield, AlertCircle } from "lucide-react";
import {
  useGetUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from "@/lib/redux/features/api/userApi";
import type { User } from "@/lib/api/types";
import { addNotification } from "@/lib/redux/features/ui/uiSlice";

// Display interface for the table
interface UserDisplay {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  registeredAt: string;
  lastActive: string;
  postsCount: number;
  contactNumber: string;
}

const UsersPage = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  // RTK Query hooks
  const { data: response, isLoading, isFetching, error } = useGetUsersQuery({ page, limit });
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  // Transform API data to display format
  const users: UserDisplay[] = response?.data
    ? response.data.map((user: User) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role.toLowerCase(),
      status: "active", // Default - backend should provide this
      registeredAt: new Date(user.createdAt).toLocaleDateString(),
      lastActive: "N/A", // Backend should provide this
      postsCount: 0, // Backend should provide this
      contactNumber: user.contactNumber,
    }))
    : [];

  // Calculate statistics
  const totalUsers = response?.meta?.total || 0;
  const activeUsers = users.filter((u) => u.status === "active").length;
  const inactiveUsers = users.filter((u) => u.status === "inactive").length;
  const bannedUsers = users.filter((u) => u.status === "banned").length;

  const handleBanUser = async (id: string) => {
    try {
      await updateUser({ id, data: { isBanned: true, isActive: false } }).unwrap();
      dispatch(
        addNotification({
          type: "success",
          message: "User banned successfully",
        }),
      );
    } catch (err) {
      dispatch(
        addNotification({
          type: "error",
          message: "Failed to ban user",
        }),
      );
    }
  };

  const handleActivateUser = async (id: string) => {
    try {
      await updateUser({ id, data: { isBanned: false, isActive: true } }).unwrap();
      dispatch(
        addNotification({
          type: "success",
          message: "User activated successfully",
        }),
      );
    } catch (err) {
      dispatch(
        addNotification({
          type: "error",
          message: "Failed to activate user",
        }),
      );
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id).unwrap();
        dispatch(
          addNotification({
            type: "success",
            message: "User deleted successfully",
          }),
        );
      } catch (err) {
        dispatch(
          addNotification({
            type: "error",
            message: "Failed to delete user",
          }),
        );
      }
    }
  };

  const columns = [
    {
      key: "name",
      label: "User",
      render: (user: UserDisplay) => (
        <div>
          <p className="font-medium text-gray-900">{user.name}</p>
          <p className="text-xs text-gray-500">{user.email}</p>
        </div>
      ),
    },
    {
      key: "role",
      label: "Role",
      render: (user: UserDisplay) => (
        <span
          className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${user.role === "admin"
            ? "bg-red-100 text-red-700"
            : user.role === "host"
              ? "bg-blue-100 text-blue-700"
              : "bg-gray-100 text-gray-700"
            }`}
        >
          {user.role === "admin" && <Shield className="w-3 h-3 mr-1" />}
          {user.role.toUpperCase()}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (user: UserDisplay) => (
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${user.status === "active"
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
      render: (user: UserDisplay) => (
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

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <p className="text-gray-900 font-semibold">Failed to load users</p>
          <p className="text-gray-600 mt-2">Please try again later</p>
        </div>
      </div>
    );
  }

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
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-colors shadow-md"
        >
          Add New User
        </button>
      </div>

      {/* Loading Indicator */}
      {isFetching && !isLoading && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-center">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-3"></div>
          <span className="text-sm text-blue-700">Updating users...</span>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Total Users</p>
          <p className="text-2xl font-bold text-gray-900">{totalUsers}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Active</p>
          <p className="text-2xl font-bold text-green-600">{activeUsers}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Inactive</p>
          <p className="text-2xl font-bold text-gray-600">{inactiveUsers}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Banned</p>
          <p className="text-2xl font-bold text-red-600">{bannedUsers}</p>
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
              disabled={isUpdating || isDeleting}
            >
              <Edit className="w-4 h-4" />
            </button>
            {user.status === "banned" ? (
              <button
                type="button"
                onClick={() => handleActivateUser(user.id)}
                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors disabled:opacity-50"
                title="Activate User"
                disabled={isUpdating || isDeleting}
              >
                <CheckCircle className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => handleBanUser(user.id)}
                className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors disabled:opacity-50"
                title="Ban User"
                disabled={isUpdating || isDeleting}
              >
                <Ban className="w-4 h-4" />
              </button>
            )}
            <button
              type="button"
              onClick={() => handleDeleteUser(user.id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
              title="Delete User"
              disabled={isUpdating || isDeleting}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </>
        )}
      />

      {/* Pagination */}
      {response?.meta && response.meta.total > limit && (
        <div className="flex items-center justify-between bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-sm text-gray-600">
            Showing {(page - 1) * limit + 1} to {Math.min(page * limit, response.meta.total)} of{" "}
            {response.meta.total} users
          </div>
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <div className="flex items-center space-x-1">
              {response.meta && Array.from({ length: Math.ceil(response.meta.total / limit) }, (_, i) => i + 1)
                .filter((p) => p === 1 || p === page || p === Math.ceil(response.meta!.total / limit) || Math.abs(p - page) <= 1)
                .map((p, i, arr) => (
                  <div key={p} className="flex items-center">
                    {i > 0 && arr[i - 1] !== p - 1 && (
                      <span className="px-2 text-gray-400">...</span>
                    )}
                    <button
                      type="button"
                      onClick={() => setPage(p)}
                      className={`px-3 py-1 rounded-lg ${p === page
                        ? "bg-blue-600 text-white"
                        : "border border-gray-300 hover:bg-gray-50"
                        }`}
                    >
                      {p}
                    </button>
                  </div>
                ))}
            </div>
            <button
              type="button"
              onClick={() => setPage((p) => p + 1)}
              disabled={!response.meta || page >= Math.ceil(response.meta.total / limit)}
              className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage;
