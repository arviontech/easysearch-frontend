"use client";

import { useState } from "react";
import DataTable from "@/app/(dashboard)/_component/table/DataTable";
import { Edit, Trash2, Eye, MapPin, Loader2, Home, Plus } from "lucide-react";
import { toast } from "sonner";
import { useAppSelector } from "@/lib/redux/hooks";
import {
  useGetAllHouseRentsQuery,
  useUpdateHouseRentMutation,
  useDeleteHouseRentMutation,
} from "@/lib/redux/features/house-rent/houseRentApi";
import { IHouseRent } from "@/types";
import ConfirmationModal from "@/app/(dashboard)/admin/hostels/_components/ConfirmationModal";
import PropertyCreateModal from "@/app/(public)/_component/shared/modals/PropertyCreateModal";

export default function HostHouseRentPage() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState<string | null>(null);
  
  const user = useAppSelector((state) => state.auth.user);

  // RTK Query hooks - get all properties (will be filtered by host on backend)
  const {
    data: response,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useGetAllHouseRentsQuery({ page, limit });

  // Mutations
  const [updateHouse, { isLoading: isUpdating }] = useUpdateHouseRentMutation();
  const [deleteHouse, { isLoading: isDeleting }] = useDeleteHouseRentMutation();

  // Filter properties for current host (in case backend doesn't filter)
  const properties: IHouseRent[] = response?.data?.filter(
    (property: IHouseRent) => property.owner?.id === user?.id
  ) || [];
  
  const total = properties.length;
  const totalPages = Math.ceil(total / limit);

  // Toggle property status (active/inactive)
  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      await updateHouse({ 
        id, 
        data: { isAvailable: !currentStatus } 
      }).unwrap();
      toast.success(`Property ${!currentStatus ? "activated" : "deactivated"} successfully`);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update property status");
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
        <div className="flex flex-col gap-1">
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full ${property.isApproved
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
              }`}
          >
            {property.isApproved ? "Approved" : "Pending"}
          </span>
          {property.isApproved && (
            <button
              onClick={() => handleToggleStatus(property.id, property.isAvailable)}
              disabled={isUpdating}
              className={`text-xs px-2 py-1 rounded transition-colors disabled:opacity-50 ${
                property.isAvailable
                  ? "bg-green-100 text-green-700 hover:bg-green-200"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {property.isAvailable ? "Available" : "Unavailable"}
            </button>
          )}
        </div>
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
          <p className="text-gray-600">Loading your properties...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error && !response) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">My Properties</h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-600 font-medium">Failed to fetch your properties</p>
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
          <h1 className="text-3xl font-bold text-gray-900">My Properties</h1>
          <p className="text-gray-600 mt-1">
            Manage your house rent listings
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
          <p className="text-sm text-gray-600">Active</p>
          <p className="text-2xl font-bold text-blue-600">
            {properties.filter((p) => p.isApproved && p.isAvailable).length}
          </p>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        data={properties}
        columns={columns}
        searchPlaceholder="Search your properties..."
        actions={(property: IHouseRent) => (
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
              className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
              title="Edit Property"
            >
              <Edit className="w-4 h-4" />
            </button>

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

      {/* Empty State */}
      {properties.length === 0 && !isLoading && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Home className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No properties yet</h3>
          <p className="text-gray-600 mb-6">
            Get started by adding your first property to rent out.
          </p>
          <button
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            className="px-6 py-3 bg-[#008ca1] hover:bg-[#007a8c] text-white rounded-2xl font-bold transition-all shadow-lg shadow-[#008ca1]/20 active:scale-95 flex items-center justify-center gap-2 mx-auto"
          >
            <Plus className="w-5 h-5" />
            Add Your First Property
          </button>
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
