"use client";

import { useState } from "react";
import DataTable from "@/app/(dashboard)/_component/table/DataTable";
import { Edit, Trash2, Eye, CheckCircle, XCircle, MapPin, Loader2, Home, Plus } from "lucide-react";
import { toast } from "sonner";
import {
  useGetAllHouseRentsQuery,
  useApproveHouseRentMutation,
  useRejectHouseRentMutation,
  useDeleteHouseRentMutation,
} from "@/lib/redux/features/house-rent/houseRentApi";
import { IHouseRent } from "@/types";
import ConfirmationModal from "../hostels/_components/ConfirmationModal";
import PropertyCreateModal from "@/app/(public)/_component/shared/modals/PropertyCreateModal";

export default function PropertiesPage() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState<string | null>(null);

  // RTK Query hooks
  const {
    data: response,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useGetAllHouseRentsQuery({ page, limit });

  // Mutations
  const [approveHouse, { isLoading: isApproving }] = useApproveHouseRentMutation();
  const [rejectHouse, { isLoading: isRejecting }] = useRejectHouseRentMutation();
  const [deleteHouse, { isLoading: isDeleting }] = useDeleteHouseRentMutation();

  const isUpdating = isApproving || isRejecting;

  const properties: IHouseRent[] = response?.data || [];
  const total = response?.meta?.total || 0;
  const totalPages = Math.ceil(total / limit);

  // Approve property
  const handleApprove = async (id: string) => {
    try {
      await approveHouse(id).unwrap();
      toast.success("Property approved successfully");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to approve property");
    }
  };

  // Reject property
  const handleReject = async (id: string) => {
    try {
      await rejectHouse(id).unwrap();
      toast.success("Property rejected successfully");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to reject property");
    }
  };

  // Delete property
  const handleDeleteClick = (id: string) => {
    setPropertyToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (propertyToDelete) {
      try {
        await deleteHouse(propertyToDelete).unwrap();
        toast.success("Property deleted successfully");
        setIsDeleteModalOpen(false);
        setPropertyToDelete(null);
      } catch (err: any) {
        toast.error(err?.data?.message || "Failed to delete property");
      }
    }
  };

  const columns = [
    {
      key: "title",
      label: "Property",
      render: (property: IHouseRent) => (
        <div>
          <p className="font-medium text-gray-900">{property.title}</p>
          <div className="flex items-center text-xs text-gray-500 mt-1">
            <MapPin className="w-3 h-3 mr-1" />
            {property.city}, {property.state || property.address}
          </div>
        </div>
      ),
    },
    {
      key: "bedrooms",
      label: "Details",
      render: (property: IHouseRent) => (
        <div className="flex flex-col text-xs text-gray-600">
          <span className="flex items-center gap-1">
            <Home className="w-3 h-3" />
            {property.bedrooms} Beds • {property.bathrooms} Baths
          </span>
          <span>{property.squareFeet || 0} sqft</span>
        </div>
      ),
    },
    {
      key: "price",
      label: "Price",
      render: (property: IHouseRent) => (
        <span className="font-semibold text-gray-900">৳{property.price.toLocaleString()}/mo</span>
      ),
    },
    {
      key: "isApproved",
      label: "Status",
      render: (property: IHouseRent) => (
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${property.isApproved
            ? "bg-green-100 text-green-700"
            : "bg-yellow-100 text-yellow-700"
            }`}
        >
          {property.isApproved ? "Approved" : "Pending"}
        </span>
      ),
    },
    {
      key: "createdAt",
      label: "Posted",
      render: (property: IHouseRent) => (
        <span className="text-sm text-gray-500">
          {new Date(property.createdAt).toLocaleDateString()}
        </span>
      ),
    },
  ];

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-[#008ca1] mx-auto mb-4" />
          <p className="text-gray-600">Loading properties...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error && !response) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Properties Management</h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-600 font-medium">Failed to fetch properties</p>
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
    <div className="space-y-6 pb-10">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Properties Management</h1>
          <p className="text-gray-600 mt-1">
            Manage all house rent listings
            {isFetching && (
              <span className="ml-2 text-[#008ca1] text-sm flex items-center inline-flex">
                <Loader2 className="w-3 h-3 animate-spin mr-1" />
                Updating...
              </span>
            )}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsCreateModalOpen(true)}
          className="px-6 py-3.5 bg-[#008ca1] hover:bg-[#007a8c] text-white rounded-2xl font-bold transition-all shadow-lg shadow-[#008ca1]/20 active:scale-95 flex items-center justify-center gap-2"
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
            {properties.filter((p) => p.isApproved).length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Pending</p>
          <p className="text-2xl font-bold text-yellow-600">
            {properties.filter((p) => !p.isApproved).length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Current Page</p>
          <p className="text-2xl font-bold text-[#008ca1]">
            {page} of {totalPages || 1}
          </p>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        data={properties}
        columns={columns}
        searchPlaceholder="Search properties..."
        actions={(property: IHouseRent) => (
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="View Details"
            >
              <Eye className="w-4 h-4" />
            </button>

            {property.isApproved ? (
              <button
                type="button"
                onClick={() => handleReject(property.id)}
                disabled={isUpdating}
                className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors disabled:opacity-50"
                title="Reject"
              >
                <XCircle className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => handleApprove(property.id)}
                disabled={isUpdating}
                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors disabled:opacity-50"
                title="Approve"
              >
                <CheckCircle className="w-4 h-4" />
              </button>
            )}

            <button
              type="button"
              onClick={() => handleDeleteClick(property.id)}
              disabled={isDeleting}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
              title="Delete Property"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      />

      {/* Pagination Controls */}
      {total > limit && (
        <div className="flex items-center justify-between bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-sm text-gray-600">
            Showing {(page - 1) * limit + 1} to {Math.min(page * limit, total)} of {total} properties
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
                        ? "bg-[#008ca1] text-white"
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

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setPropertyToDelete(null);
        }}
        onConfirm={confirmDelete}
        title="Delete Property?"
        message="Are you sure you want to delete this property? This action cannot be undone."
        isLoading={isDeleting}
        confirmText="Delete Property"
        variant="danger"
      />

      <PropertyCreateModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}
