"use client";

import React, { useState } from "react";
import {
  useGetAllBannersQuery,
  useCreateBannerMutation,
  useUpdateBannerMutation,
  useDeleteBannerMutation
} from "@/lib/redux/features/banner/bannerApi";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { IBanner } from "@/types/banner.types";
import { BannerDialog } from "./_components/BannerDialog";
import { Badge, Tag, Edit, Trash2, Eye, Search, Layout, MousePointer2, Percent, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import DataTable from "../../_component/table/DataTable";
import ConfirmationModal from "./_components/ConfirmationModal";

export default function BannersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<IBanner | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [bannerToDelete, setBannerToDelete] = useState<string | null>(null);

  // RTK Query hooks
  const { data: bannersData, isLoading, refetch } = useGetAllBannersQuery({
    page: 1,
    limit: 10,
    search: searchTerm
  });
  const [createBanner, { isLoading: isCreating }] = useCreateBannerMutation();
  const [updateBanner, { isLoading: isUpdating }] = useUpdateBannerMutation();
  const [deleteBanner, { isLoading: isDeleting }] = useDeleteBannerMutation();

  const banners = bannersData?.data || [];

  // Handle form submission
  const handleSubmit = async (data: any) => {
    const { image, ...rest } = data;

    if (!image && !editingBanner) {
      toast.error("Please select an image to upload");
      return;
    }

    const formData = new FormData();
    if (image) {
      formData.append("image", image);
    }

    // Append other fields to formData
    Object.keys(rest).forEach((key) => {
      if (rest[key] !== undefined && rest[key] !== null && rest[key] !== "") {
        formData.append(key, rest[key].toString());
      }
    });

    try {
      if (editingBanner) {
        await updateBanner({
          id: editingBanner.id,
          data: formData,
        }).unwrap();
        toast.success("Banner updated successfully");
      } else {
        await createBanner(formData).unwrap();
        toast.success("Banner created successfully");
      }

      handleCloseModal();
      refetch();
    } catch (error) {
      console.error("Error saving banner:", error);
      toast.error(`Failed to ${editingBanner ? "update" : "create"} banner`);
    }
  };

  const handleEdit = (banner: IBanner) => {
    setEditingBanner(banner);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setBannerToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (bannerToDelete) {
      try {
        await deleteBanner(bannerToDelete).unwrap();
        toast.success("Banner deleted successfully");
        setIsDeleteModalOpen(false);
        setBannerToDelete(null);
        refetch();
      } catch (error) {
        console.error("Error deleting banner:", error);
        toast.error("Failed to delete banner");
      }
    }
  };

  const toggleBannerStatus = async (banner: IBanner) => {
    try {
      const formData = new FormData();
      formData.append("isActive", (!banner.isActive).toString());

      await updateBanner({
        id: banner.id,
        data: formData,
      }).unwrap();

      toast.success(
        `Banner ${banner.isActive ? "deactivated" : "activated"} successfully`
      );
      refetch();
    } catch (error) {
      console.error("Error toggling banner status:", error);
      toast.error("Failed to update banner status");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingBanner(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600 animate-pulse">Loading banners...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">
            Banner <span className="text-[#008ca1]">Management</span>
          </h1>
          <p className="text-gray-500 mt-1 font-medium italic">Manage website banners and promotional content</p>
        </div>
        <button
          onClick={() => {
            setEditingBanner(null);
            setIsModalOpen(true);
          }}
          type="button"
          className="px-6 py-3.5 bg-[#008ca1] hover:bg-[#007a8c] text-white rounded-2xl font-bold transition-all shadow-lg shadow-[#008ca1]/20 active:scale-95 flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Banner</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Banners", value: banners.length, icon: Layout, color: "cyan" },
          { label: "Active Now", value: banners.filter((b: IBanner) => b.isActive).length, icon: MousePointer2, color: "blue" },
          { label: "Avg Priority", value: banners.length > 0 ? (banners.reduce((acc: number, b: IBanner) => acc + b.priority, 0) / banners.length).toFixed(1) : "0", icon: Percent, color: "indigo" },
          { label: "Scheduled", value: "0", icon: ImageIcon, color: "violet" },
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
          data={banners}
          columns={[
            {
              key: "imageUrl",
              label: "Image",
              render: (banner: IBanner) => (
                <div className="relative w-16 h-10 rounded-xl overflow-hidden bg-cyan-50 border border-white shadow-[0_2px_4px_rgba(0,0,0,0.05),inset_0_2px_4px_rgba(255,255,255,0.5)]">
                  <Image
                    src={banner.imageUrl}
                    alt={banner.altText}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
              ),
            },
            {
              key: "title",
              label: "Banner Details",
              render: (banner: IBanner) => (
                <div>
                  <p className="font-bold text-gray-900 text-base">{banner.title}</p>
                  {banner.subtitle && (
                    <p className="text-xs text-[#008ca1] font-medium">{banner.subtitle}</p>
                  )}
                  {banner.description && (
                    <p className="text-xs text-gray-500 truncate max-w-xs">{banner.description}</p>
                  )}
                </div>
              ),
            },
            {
              key: "isActive",
              label: "Status",
              render: (banner: IBanner) => (
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${banner.isActive
                  ? "bg-green-50 text-green-600 border border-green-100"
                  : "bg-gray-50 text-gray-500 border border-gray-100"
                  }`}>
                  {banner.isActive ? "Active" : "Inactive"}
                </span>
              ),
            },
            {
              key: "priority",
              label: "Priority",
              render: (banner: IBanner) => (
                <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold border border-blue-100">
                  {banner.priority}
                </span>
              ),
            },
            {
              key: "createdAt",
              label: "Created",
              render: (banner: IBanner) => (
                <span className="text-sm text-gray-600 font-medium italic">
                  {new Date(banner.createdAt).toLocaleDateString()}
                </span>
              ),
            },
          ]}
          searchPlaceholder="Search banners by title or subtitle..."
          actions={(banner: IBanner) => (
            <div className="flex items-center gap-1">
              <button
                onClick={() => toggleBannerStatus(banner)}
                type="button"
                className={`p-2 rounded-xl transition-all active:scale-90 ${banner.isActive ? "text-gray-400 hover:bg-gray-50" : "text-green-500 hover:bg-green-50"
                  }`}
                title={banner.isActive ? "Deactivate" : "Activate"}
              >
                <Eye className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleEdit(banner)}
                type="button"
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-all active:scale-90"
                title="Edit Banner"
              >
                <Edit className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleDelete(banner.id)}
                type="button"
                className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-all active:scale-90"
                title="Delete Banner"
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
      </div>

      <BannerDialog
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        editingBanner={editingBanner}
        onSubmit={handleSubmit}
        isLoading={isCreating || isUpdating}
        onCancel={handleCloseModal}
      />

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setBannerToDelete(null);
        }}
        onConfirm={confirmDelete}
        title="Delete Banner?"
        message="Are you sure you want to delete this banner? This action cannot be undone."
        isLoading={isDeleting}
        confirmText="Delete Banner"
        variant="danger"
      />
    </div>
  );
}