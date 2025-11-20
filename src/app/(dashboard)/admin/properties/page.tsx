"use client";

import { useState } from "react";
import DataTable from "@/app/(dashboard)/_component/table/DataTable";
import { Edit, Trash2, Eye, CheckCircle, XCircle, MapPin, Plus, Loader2 } from "lucide-react";
import { useAppDispatch } from "@/lib/redux/hooks";
import { addNotification } from "@/lib/redux/features/ui/uiSlice";
import {
  useGetHouseRentsQuery,
  useUpdateHouseRentMutation,
  useDeleteHouseRentMutation,
} from "@/lib/redux/features/api/houseRentApi";
import type { HouseRent } from "@/lib/api/types";
import PropertyCreateModal from "@/app/(public)/_component/shared/modals/PropertyCreateModal";

interface PropertyDisplay {
  id: string;
  title: string;
  type: string;
  location: string;
  price: number;
  owner: string;
  status: "approved" | "pending" | "rejected";
  postedAt: string;
  views: number;
  bedrooms: number;
  bathrooms: number;
  size: number;
}

const PropertiesPage = () => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // RTK Query hooks - automatic caching, loading, error handling!
  const {
    data: response,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useGetHouseRentsQuery({ page, limit });

  // Mutations with optimistic updates
  const [updateHouseRent, { isLoading: isUpdating }] = useUpdateHouseRentMutation();
  const [deleteHouseRent, { isLoading: isDeleting }] = useDeleteHouseRentMutation();

  // Transform API data to display format
  const properties: PropertyDisplay[] = response?.data
    ? response.data.map((house: HouseRent) => ({
      id: house.id,
      title: house.title,
      type: house.propertyType.toLowerCase(),
      location: `${house.area}, ${house.city}`,
      price: house.price,
      owner: house.ownerId,
      status: house.isAvailable ? "approved" : "rejected",
      postedAt: new Date(house.createdAt).toLocaleDateString(),
      views: 0,
      bedrooms: house.bedrooms,
      bathrooms: house.bathrooms,
      size: house.size,
    }))
    : [];

  const total = response?.meta?.total || 0;
  const totalPages = Math.ceil(total / limit);

  // Approve property (set isAvailable to true)
  const handleApprove = async (id: string) => {
    try {
      await updateHouseRent({ id, data: { isAvailable: true } }).unwrap();
      dispatch(addNotification({ type: "success", message: "Property approved successfully" }));
    } catch (err: any) {
      dispatch(
        addNotification({
          type: "error",
          message: err?.data?.message || "Failed to approve property",
        }),
      );
    }
  };

  // Reject property (set isAvailable to false)
  const handleReject = async (id: string) => {
    try {
      await updateHouseRent({ id, data: { isAvailable: false } }).unwrap();
      dispatch(addNotification({ type: "success", message: "Property rejected successfully" }));
    } catch (err: any) {
      dispatch(
        addNotification({
          type: "error",
          message: err?.data?.message || "Failed to reject property",
        }),
      );
    }
  };

  // Delete property
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this property?")) {
      return;
    }

    try {
      await deleteHouseRent(id).unwrap();
      dispatch(addNotification({ type: "success", message: "Property deleted successfully" }));
    } catch (err: any) {
      dispatch(
        addNotification({
          type: "error",
          message: err?.data?.message || "Failed to delete property",
        }),
      );
    }
  };

  const columns = [
    {
      key: "title",
      label: "Property",
      render: (property: PropertyDisplay) => (
        <div>
          <p className="font-medium text-gray-900">{property.title}</p>
          <div className="flex items-center text-xs text-gray-500 mt-1">
            <MapPin className="w-3 h-3 mr-1" />
            {property.location}
          </div>
        </div>
      ),
    },
    {
      key: "type",
      label: "Type",
      render: (property: PropertyDisplay) => (
        <span className="capitalize px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
          {property.type}
        </span>
      ),
    },
    {
      key: "price",
      label: "Price",
      render: (property: PropertyDisplay) => (
        <span className="font-semibold text-gray-900">৳{property.price.toLocaleString()}/mo</span>
      ),
    },
    {
      key: "owner",
      label: "Owner",
    },
    {
      key: "status",
      label: "Status",
      render: (property: PropertyDisplay) => (
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${property.status === "approved"
            ? "bg-green-100 text-green-700"
            : property.status === "pending"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
            }`}
        >
          {property.status}
        </span>
      ),
    },
    {
      key: "views",
      label: "Views",
      render: (property: PropertyDisplay) => <span className="text-gray-600">{property.views}</span>,
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
          <p className="text-gray-600">Loading properties...</p>
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
          : "Failed to fetch properties";

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Properties Management</h1>
            <p className="text-gray-600 mt-1">Manage all property listings</p>
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
          <h1 className="text-3xl font-bold text-gray-900">Properties Management</h1>
          <p className="text-gray-600 mt-1">
            Manage all house rent listings
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
          onClick={() => setIsCreateModalOpen(true)}
          className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-colors shadow-md flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add New Property
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Total Properties</p>
          <p className="text-2xl font-bold text-gray-900">{total}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Approved</p>
          <p className="text-2xl font-bold text-green-600">
            {properties.filter((p) => p.status === "approved").length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Rejected</p>
          <p className="text-2xl font-bold text-red-600">
            {properties.filter((p) => p.status === "rejected").length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Current Page</p>
          <p className="text-2xl font-bold text-blue-600">
            {page} of {totalPages || 1}
          </p>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        data={properties}
        columns={columns}
        searchPlaceholder="Search properties..."
        actions={(property) => (
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
              title="Edit Property"
            >
              <Edit className="w-4 h-4" />
            </button>
            {property.status === "rejected" ? (
              <button
                type="button"
                onClick={() => handleApprove(property.id)}
                disabled={isUpdating}
                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors disabled:opacity-50"
                title="Approve"
              >
                <CheckCircle className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => handleReject(property.id)}
                disabled={isUpdating}
                className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors disabled:opacity-50"
                title="Reject"
              >
                <XCircle className="w-4 h-4" />
              </button>
            )}
            <button
              type="button"
              onClick={() => handleDelete(property.id)}
              disabled={isDeleting}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
              title="Delete Property"
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
            Showing {(page - 1) * limit + 1} to {Math.min(page * limit, total)} of {total}{" "}
            properties
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
                      className={`px-4 py-2 rounded-lg transition-colors disabled:opacity-50 ${page === pageNum
                        ? "bg-yellow-500 text-white"
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

      {/* Create Property Modal */}
      <PropertyCreateModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
};

export default PropertiesPage;
