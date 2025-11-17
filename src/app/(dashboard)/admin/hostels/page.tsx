"use client";

import { useState } from "react";
import DataTable from "@/components/dashboard/DataTable";
import { Edit, Trash2, Eye, CheckCircle, XCircle, MapPin, Plus, Loader2, Users } from "lucide-react";
import { useAppDispatch } from "@/lib/redux/hooks";
import { addNotification } from "@/lib/redux/slices/uiSlice";
import {
  useGetHostelRentsQuery,
  useUpdateHostelRentMutation,
  useDeleteHostelRentMutation,
} from "@/lib/redux/api/hostelRentApi";
import type { HostelRent } from "@/lib/api/types";

interface HostelDisplay {
  id: string;
  title: string;
  type: string;
  location: string;
  price: number;
  owner: string;
  status: "approved" | "pending" | "rejected";
  postedAt: string;
  views: number;
  gender: string;
  roomType: string;
  mealOptions: string;
}

const HostelsPage = () => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  // RTK Query hooks - automatic caching, loading, error handling!
  const {
    data: response,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useGetHostelRentsQuery({ page, limit });

  // Mutations with optimistic updates
  const [updateHostelRent, { isLoading: isUpdating }] = useUpdateHostelRentMutation();
  const [deleteHostelRent, { isLoading: isDeleting }] = useDeleteHostelRentMutation();

  // Transform API data to display format
  const hostels: HostelDisplay[] = response?.data
    ? response.data.map((hostel: HostelRent) => ({
        id: hostel.id,
        title: hostel.title,
        type: hostel.type.toLowerCase(),
        location: `${hostel.area}, ${hostel.city}`,
        price: hostel.price,
        owner: hostel.ownerId,
        status: hostel.isAvailable ? "approved" : "rejected",
        postedAt: new Date(hostel.createdAt).toLocaleDateString(),
        views: 0,
        gender: hostel.gender,
        roomType: hostel.roomType.replace(/_/g, " "),
        mealOptions: hostel.mealOptions.replace(/_/g, " "),
      }))
    : [];

  const total = response?.meta?.total || 0;
  const totalPages = Math.ceil(total / limit);

  // Approve hostel (set isAvailable to true)
  const handleApprove = async (id: string) => {
    try {
      await updateHostelRent({ id, data: { isAvailable: true } }).unwrap();
      dispatch(addNotification({ type: "success", message: "Hostel approved successfully" }));
    } catch (err: any) {
      dispatch(
        addNotification({
          type: "error",
          message: err?.data?.message || "Failed to approve hostel",
        }),
      );
    }
  };

  // Reject hostel (set isAvailable to false)
  const handleReject = async (id: string) => {
    try {
      await updateHostelRent({ id, data: { isAvailable: false } }).unwrap();
      dispatch(addNotification({ type: "success", message: "Hostel rejected successfully" }));
    } catch (err: any) {
      dispatch(
        addNotification({
          type: "error",
          message: err?.data?.message || "Failed to reject hostel",
        }),
      );
    }
  };

  // Delete hostel
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this hostel?")) {
      return;
    }

    try {
      await deleteHostelRent(id).unwrap();
      dispatch(addNotification({ type: "success", message: "Hostel deleted successfully" }));
    } catch (err: any) {
      dispatch(
        addNotification({
          type: "error",
          message: err?.data?.message || "Failed to delete hostel",
        }),
      );
    }
  };

  const columns = [
    {
      key: "title",
      label: "Hostel",
      render: (hostel: HostelDisplay) => (
        <div>
          <p className="font-medium text-gray-900">{hostel.title}</p>
          <div className="flex items-center text-xs text-gray-500 mt-1">
            <MapPin className="w-3 h-3 mr-1" />
            {hostel.location}
          </div>
        </div>
      ),
    },
    {
      key: "type",
      label: "Type",
      render: (hostel: HostelDisplay) => (
        <span className="capitalize px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
          {hostel.type}
        </span>
      ),
    },
    {
      key: "roomType",
      label: "Room Type",
      render: (hostel: HostelDisplay) => (
        <div className="flex items-center gap-1">
          <Users className="w-3 h-3 text-gray-500" />
          <span className="text-sm text-gray-700 capitalize">{hostel.roomType}</span>
        </div>
      ),
    },
    {
      key: "gender",
      label: "Gender",
      render: (hostel: HostelDisplay) => (
        <span className="capitalize text-sm text-gray-700">{hostel.gender.toLowerCase()}</span>
      ),
    },
    {
      key: "price",
      label: "Price",
      render: (hostel: HostelDisplay) => (
        <span className="font-semibold text-gray-900">৳{hostel.price.toLocaleString()}/mo</span>
      ),
    },
    {
      key: "mealOptions",
      label: "Meals",
      render: (hostel: HostelDisplay) => (
        <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full capitalize">
          {hostel.mealOptions}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (hostel: HostelDisplay) => (
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${
            hostel.status === "approved"
              ? "bg-green-100 text-green-700"
              : hostel.status === "pending"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
          }`}
        >
          {hostel.status}
        </span>
      ),
    },
    {
      key: "postedAt",
      label: "Posted",
    },
  ];

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-yellow-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading hostels...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error && !response) {
    const errorMessage =
      "data" in error && error.data
        ? (error.data as any).message
        : "status" in error
          ? `Error ${error.status}`
          : "Failed to fetch hostels";

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Hostels Management</h1>
            <p className="text-gray-600 mt-1">Manage all hostel listings</p>
          </div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-600 font-medium">{errorMessage}</p>
          <button
            type="button"
            onClick={() => refetch()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Hostels Management</h1>
          <p className="text-gray-600 mt-1">
            Manage all hostel rent listings
            {isFetching && (
              <span className="ml-2 text-yellow-600 text-sm">
                <Loader2 className="inline w-3 h-3 animate-spin mr-1" />
                Updating...
              </span>
            )}
          </p>
        </div>
        <button
          type="button"
          className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors shadow-md flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add New Hostel
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Total Hostels</p>
          <p className="text-2xl font-bold text-gray-900">{total}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Approved</p>
          <p className="text-2xl font-bold text-green-600">
            {hostels.filter((h) => h.status === "approved").length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Rejected</p>
          <p className="text-2xl font-bold text-red-600">
            {hostels.filter((h) => h.status === "rejected").length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Current Page</p>
          <p className="text-2xl font-bold text-purple-600">
            {page} of {totalPages || 1}
          </p>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        data={hostels}
        columns={columns}
        searchPlaceholder="Search hostels..."
        actions={(hostel) => (
          <>
            <button
              type="button"
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="View Details"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              type="button"
              className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
              title="Edit Hostel"
            >
              <Edit className="w-4 h-4" />
            </button>
            {hostel.status === "rejected" ? (
              <button
                type="button"
                onClick={() => handleApprove(hostel.id)}
                disabled={isUpdating}
                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors disabled:opacity-50"
                title="Approve"
              >
                <CheckCircle className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => handleReject(hostel.id)}
                disabled={isUpdating}
                className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors disabled:opacity-50"
                title="Reject"
              >
                <XCircle className="w-4 h-4" />
              </button>
            )}
            <button
              type="button"
              onClick={() => handleDelete(hostel.id)}
              disabled={isDeleting}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
              title="Delete Hostel"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </>
        )}
      />

      {/* Pagination Controls */}
      {total > limit && (
        <div className="flex items-center justify-between bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-sm text-gray-600">
            Showing {(page - 1) * limit + 1} to {Math.min(page * limit, total)} of {total} hostels
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              disabled={page === 1 || isFetching}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(
                  (pageNum) =>
                    pageNum === 1 || pageNum === totalPages || Math.abs(pageNum - page) <= 1,
                )
                .map((pageNum, idx, arr) => (
                  <div key={pageNum}>
                    {idx > 0 && arr[idx - 1] !== pageNum - 1 && (
                      <span className="px-2 text-gray-500">...</span>
                    )}
                    <button
                      type="button"
                      onClick={() => setPage(pageNum)}
                      disabled={isFetching}
                      className={`px-4 py-2 rounded-lg transition-colors disabled:opacity-50 ${
                        page === pageNum
                          ? "bg-purple-500 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {pageNum}
                    </button>
                  </div>
                ))}
            </div>
            <button
              type="button"
              onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={page === totalPages || isFetching}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HostelsPage;
