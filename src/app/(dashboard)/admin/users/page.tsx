"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { Edit, Trash2, Shield, User as UserIcon, Mail, Phone, Calendar, Search, Filter, Ban, CheckCircle, ShieldCheck, ShieldAlert } from "lucide-react";
import { addNotification } from "@/lib/redux/features/ui/uiSlice";
import {
  useGetUsersQuery,
  useUpdateUserStatusMutation,
  useDeleteUserMutation
} from "@/lib/redux/features/user/userApi";
import DataTable from "../../_component/table/DataTable";
import ConfirmationModal from "../categories/_components/ConfirmationModal";

// User status enum matching backend
enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BANNED = "BANNED"
}

// User role enum matching backend
enum UserRole {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  HOST = "HOST",
  CUSTOMER = "CUSTOMER"
}

interface User {
  id: string;
  email: string;
  contactNumber: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
}

const UsersPage = () => {
  const dispatch = useDispatch();
  const { data: usersData, isLoading, isError } = useGetUsersQuery({});
  const [updateStatus, { isLoading: isUpdating }] = useUpdateUserStatusMutation();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);

  const users = usersData?.data || [];

  const handleDelete = (id: string) => {
    setUserToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (userToDelete) {
      try {
        await deleteUser(userToDelete).unwrap();
        dispatch(addNotification({ message: "User deleted successfully", type: "success" }));
        setIsDeleteModalOpen(false);
        setUserToDelete(null);
      } catch (error: any) {
        dispatch(addNotification({
          message: error?.data?.message || "Failed to delete user",
          type: "error"
        }));
      }
    }
  };

  const handleStatusChange = async (id: string, newStatus: UserStatus) => {
    try {
      await updateStatus({ id, status: newStatus }).unwrap();
      dispatch(addNotification({ message: `User status updated to ${newStatus}`, type: "success" }));
    } catch (error: any) {
      dispatch(addNotification({
        message: error?.data?.message || "Failed to update user status",
        type: "error"
      }));
    }
  };

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case UserRole.SUPER_ADMIN:
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-700 border border-purple-200 shadow-sm">
            <ShieldCheck className="w-3 h-3 mr-1" />
            SUPER ADMIN
          </span>
        );
      case UserRole.ADMIN:
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-700 border border-rose-200 shadow-sm">
            <Shield className="w-3 h-3 mr-1" />
            ADMIN
          </span>
        );
      case UserRole.HOST:
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700 border border-blue-200 shadow-sm">
            <UserIcon className="w-3 h-3 mr-1" />
            HOST
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-700 border border-gray-200 shadow-sm">
            <UserIcon className="w-3 h-3 mr-1" />
            CUSTOMER
          </span>
        );
    }
  };

  const getStatusBadge = (status: UserStatus) => {
    switch (status) {
      case UserStatus.ACTIVE:
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 border border-emerald-200">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2 animate-pulse"></div>
            ACTIVE
          </span>
        );
      case UserStatus.INACTIVE:
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700 border border-amber-200">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-2"></div>
            INACTIVE
          </span>
        );
      case UserStatus.BANNED:
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 border border-red-200">
            <ShieldAlert className="w-3 h-3 mr-1" />
            BANNED
          </span>
        );
    }
  };

  const columns = [
    {
      key: "email",
      label: "User Detail",
      render: (user: User) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center border-2 border-white shadow-sm overflow-hidden">
            <UserIcon className="w-5 h-5 text-cyan-600" />
          </div>
          <div>
            <p className="font-bold text-gray-900 text-base flex items-center gap-2">
              {user.email}
            </p>
            <p className="text-[10px] text-gray-400 font-mono tracking-tighter">ID: {user.id}</p>
          </div>
        </div>
      ),
    },
    {
      key: "contactNumber",
      label: "Contact",
      render: (user: User) => (
        <div className="flex flex-col">
          <span className="text-sm text-gray-700 font-semibold flex items-center gap-2">
            <Phone className="w-3 h-3 text-cyan-500" />
            {user.contactNumber}
          </span>
          <span className="text-xs text-gray-500 flex items-center gap-2">
            <Mail className="w-3 h-3 text-gray-400" />
            {user.email}
          </span>
        </div>
      ),
    },
    {
      key: "role",
      label: "Role",
      render: (user: User) => getRoleBadge(user.role),
    },
    {
      key: "status",
      label: "Status",
      render: (user: User) => getStatusBadge(user.status),
    },
    {
      key: "createdAt",
      label: "Registered",
      render: (user: User) => (
        <span className="text-sm text-gray-600 font-medium italic flex items-center gap-2">
          <Calendar className="w-3 h-3 text-cyan-400" />
          {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">
            Users <span className="text-cyan-600">Management</span>
          </h1>
          <p className="text-gray-500 mt-1 font-medium italic">Manage user accounts and permissions</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Users", value: users.length, icon: UserIcon, color: "cyan" },
          { label: "Active", value: users.filter((u: any) => u.status === UserStatus.ACTIVE).length, icon: CheckCircle, color: "emerald" },
          { label: "Banned", value: users.filter((u: any) => u.status === UserStatus.BANNED).length, icon: Ban, color: "rose" },
          { label: "Admins", value: users.filter((u: any) => u.role === UserRole.ADMIN || u.role === UserRole.SUPER_ADMIN).length, icon: Shield, color: "purple" },
        ].map((stat, i) => (
          <div key={i} className="bg-white/60 backdrop-blur-md rounded-3xl p-5 border border-white shadow-[0_8px_16px_rgba(0,0,0,0.05),inset_0_4px_8px_rgba(255,255,255,0.5)] group hover:shadow-[0_12px_24px_rgba(0,0,0,0.08)] transition-all">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-2xl bg-${stat.color}-50 text-${stat.color}-600 group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
                <p className="text-2xl font-black text-gray-900 mt-0.5">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Data Table */}
      <div className="relative">
        <DataTable
          data={users}
          columns={columns}
          searchPlaceholder="Search users by email or contact..."
          actions={(user: User) => (
            <div className="flex items-center gap-1">
              {user.status !== UserStatus.ACTIVE && (
                <button
                  onClick={() => handleStatusChange(user.id, UserStatus.ACTIVE)}
                  type="button"
                  className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all active:scale-90"
                  title="Activate User"
                  disabled={isUpdating}
                >
                  <CheckCircle className="w-5 h-5" />
                </button>
              )}
              {user.status !== UserStatus.BANNED && (
                <button
                  onClick={() => handleStatusChange(user.id, UserStatus.BANNED)}
                  type="button"
                  className="p-2 text-amber-600 hover:bg-amber-50 rounded-xl transition-all active:scale-90"
                  title="Ban User"
                  disabled={isUpdating}
                >
                  <Ban className="w-5 h-5" />
                </button>
              )}
              <button
                onClick={() => handleDelete(user.id)}
                type="button"
                className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-all active:scale-90"
                title="Delete User"
                disabled={isDeleting}
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          )}
        />
        {isLoading && (
          <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px] flex items-center justify-center rounded-2xl">
            <div className="w-10 h-10 border-4 border-[#008ca1] border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        {isError && (
          <div className="p-12 text-center bg-red-50/50 backdrop-blur-md rounded-2xl border border-red-100">
            <p className="text-red-500 font-bold">Failed to load users. Please try again.</p>
          </div>
        )}
      </div>

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete User?"
        message="Are you sure you want to delete this user? This action cannot be undone and will remove all associated data including their profile and activities."
        isLoading={isDeleting}
        confirmText="Delete User"
        variant="danger"
      />
    </div>
  );
};

export default UsersPage;
