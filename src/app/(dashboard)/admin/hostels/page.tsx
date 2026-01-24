"use client";

import { useState } from "react";
import DataTable from "@/app/(dashboard)/_component/table/DataTable";
import { Edit, Trash2, Eye, CheckCircle, XCircle, MapPin, Loader2, Users, Plus } from "lucide-react";
import { toast } from "sonner";
import {
  useGetAllHostelRentsQuery,
  useApproveHostelRentMutation,
  useDeleteHostelRentMutation,
} from "@/lib/redux/features/hostel-rent/hostelRentApi";
import { IHostelRent } from "@/types";
import ConfirmationModal from "./_components/ConfirmationModal";
import HostelCreateModal from "@/app/(public)/_component/shared/modals/HostelCreateModal";

export default function HostelsPage() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [hostelToDelete, setHostelToDelete] = useState<string | null>(null);

  // RTK Query hooks
  const {
    data: response,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useGetAllHostelRentsQuery({ page, limit });

  // Mutations
  const [approveHostelRent, { isLoading: isApproving }] = useApproveHostelRentMutation();
  const [deleteHostelRent, { isLoading: isDeleting }] = useDeleteHostelRentMutation();

  const hostels: IHostelRent[] = response?.data || [];
  const total = response?.meta?.total || 0;
  const totalPages = Math.ceil(total / limit);

  // Approve/Reject hostel
  const handleToggleApproval = async (id: string, currentStatus: boolean) => {
    try {
      await approveHostelRent({ id, isApproved: !currentStatus }).unwrap();
      toast.success(`Hostel ${!currentStatus ? "approved" : "rejected"} successfully`);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update hostel status");
    }
  };

  // Delete hostel
  const handleDeleteClick = (id: string) => {
    setHostelToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (hostelToDelete) {
      try {
        await deleteHostelRent(hostelToDelete).unwrap();
        toast.success("Hostel deleted successfully");
        setIsDeleteModalOpen(false);
        setHostelToDelete(null);
      } catch (err: any) {
        toast.error(err?.data?.message || "Failed to delete hostel");
      }
    }
  };

  const columns = [
    {
      key: "title",
      label: "Hostel",
      render: (hostel: IHostelRent) => (
        <div>
          <p className="font-medium text-gray-900">{hostel.title}</p>
          <div className="flex items-center text-xs text-gray-500 mt-1">
            <MapPin className="w-3 h-3 mr-1" />
            {hostel.city}
          </div>
        </div>
      ),
    },
    {
      key: "roomType",
      label: "Room Type",
      render: (hostel: IHostelRent) => (
        <div className="flex items-center gap-1">
          <Users className="w-3 h-3 text-gray-500" />
          <span className="text-sm text-gray-700 capitalize">{hostel.roomType}</span>
        </div>
      ),
    },
    {
      key: "tenantType",
      label: "Tenant",
      render: (hostel: IHostelRent) => (
        <span className="capitalize text-sm text-gray-700">{hostel.tenantType}</span>
      ),
    },
    {
      key: "price",
      label: "Price",
      render: (hostel: IHostelRent) => (
        <span className="font-semibold text-gray-900">৳{hostel.price.toLocaleString()}/mo</span>
      ),
    },
    {
      key: "isApproved",
      label: "Status",
      render: (hostel: IHostelRent) => (
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${hostel.isApproved
            ? "bg-green-100 text-green-700"
            : "bg-yellow-100 text-yellow-700"
            }`}
        >
          {hostel.isApproved ? "Approved" : "Pending"}
        </span>
      ),
    },
    {
      key: "createdAt",
      label: "Posted",
      render: (hostel: IHostelRent) => (
        <span className="text-sm text-gray-500">
          {new Date(hostel.createdAt).toLocaleDateString()}
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
          <p className="text-gray-600">Loading hostels...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error && !response) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Hostels Management</h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-600 font-medium">Failed to fetch hostels</p>
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
          <h1 className="text-3xl font-bold text-gray-900">Hostels Management</h1>
          <p className="text-gray-600 mt-1">
            Manage all hostel rent listings
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
            {hostels.filter((h) => h.isApproved).length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Pending</p>
          <p className="text-2xl font-bold text-yellow-600">
            {hostels.filter((h) => !h.isApproved).length}
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
        data={hostels}
        columns={columns}
        searchPlaceholder="Search hostels..."
        actions={(hostel: IHostelRent) => (
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="View Details"
            >
              <Eye className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => handleToggleApproval(hostel.id, hostel.isApproved)}
              disabled={isApproving}
              className={`p-2 rounded-lg transition-colors disabled:opacity-50 ${hostel.isApproved
                ? "text-orange-600 hover:bg-orange-50"
                : "text-green-600 hover:bg-green-50"
                }`}
              title={hostel.isApproved ? "Reject" : "Approve"}
            >
              {hostel.isApproved ? <XCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
            </button>

            <button
              type="button"
              onClick={() => handleDeleteClick(hostel.id)}
              disabled={isDeleting}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
              title="Delete Hostel"
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
          setHostelToDelete(null);
        }}
        onConfirm={confirmDelete}
        title="Delete Hostel?"
        message="Are you sure you want to delete this hostel? This action cannot be undone."
        isLoading={isDeleting}
        confirmText="Delete Hostel"
        variant="danger"
      />

      <HostelCreateModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}