"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { Edit, Trash2, Eye, Plus, Tag, Search, Building2, Home, Utensils } from "lucide-react";
import { addNotification } from "@/lib/redux/features/ui/uiSlice";
import Image from "next/image";
import { useGetAllCategoriesQuery, useDeleteCategoryMutation } from "@/lib/redux/features/category/categoryApi";
import DataTable from "../../_component/table/DataTable";
import CreateCategoryModal from "./_components/CreateCategoryModal";
import ConfirmationModal from "./_components/ConfirmationModal";

// Display interface for the table
interface CategoryDisplay {
  id: string;
  categoryName: string;
  categoryImage: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

const CategoriesPage = () => {
  const dispatch = useDispatch();
  const { data: categoriesData, isLoading, isError } = useGetAllCategoriesQuery(undefined);
  const [deleteCategory, { isLoading: isDeleting }] = useDeleteCategoryMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editCategory, setEditCategory] = useState<CategoryDisplay | null>(null);
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);

  const categories = categoriesData?.data || [];

  const handleEdit = (category: CategoryDisplay) => {
    setEditCategory(category);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setCategoryToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (categoryToDelete) {
      try {
        await deleteCategory(categoryToDelete).unwrap();
        dispatch(addNotification({ message: "Category deleted successfully", type: "success" }));
        setIsDeleteModalOpen(false);
        setCategoryToDelete(null);
      } catch (error: any) {
        dispatch(addNotification({
          message: error?.data?.message || "Failed to delete category",
          type: "error"
        }));
      }
    }
  };

  const columns = [
    {
      key: "categoryImage",
      label: "Image",
      render: (category: CategoryDisplay) => (
        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-cyan-50 border border-white shadow-[0_2px_4px_rgba(0,0,0,0.05),inset_0_2px_4px_rgba(255,255,255,0.5)]">
          {category.categoryImage ? (
            <Image
              src={category.categoryImage}
              alt={category.categoryName}
              fill
              className="object-cover"
              sizes="48px"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Tag className="w-5 h-5 text-cyan-300" />
            </div>
          )}
        </div>
      ),
    },
    {
      key: "categoryName",
      label: "Category Name",
      render: (category: CategoryDisplay) => (
        <div>
          <p className="font-bold text-gray-900 text-base">{category.categoryName}</p>
          <p className="text-[10px] text-gray-400 font-mono tracking-tighter">ID: {category.id}</p>
        </div>
      ),
    },
    {
      key: "createdAt",
      label: "Created",
      render: (category: CategoryDisplay) => (
        <span className="text-sm text-gray-600 font-medium italic">
          {category.createdAt ? new Date(category.createdAt).toLocaleDateString() : "N/A"}
        </span>
      ),
    },
    {
      key: "updatedAt",
      label: "Last Updated",
      render: (category: CategoryDisplay) => (
        <span className="text-sm text-gray-500">
          {category.updatedAt ? new Date(category.updatedAt).toLocaleDateString() : "N/A"}
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
            Categories <span className="text-cyan-600">Management</span>
          </h1>
          <p className="text-gray-500 mt-1 font-medium italic">Organize and manage property classifications</p>
        </div>
        <button
          onClick={() => {
            setEditCategory(null);
            setIsModalOpen(true);
          }}
          type="button"
          className="px-6 py-3.5 bg-[#008ca1] hover:bg-[#007a8c] text-white rounded-2xl font-bold transition-all shadow-lg shadow-[#008ca1]/20 active:scale-95 flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Category</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Categories", value: categories.length, icon: Tag, color: "cyan" },
          { label: "Active Listings", value: "24", icon: Building2, color: "blue" },
          { label: "Top Category", value: "Apartments", icon: Home, color: "indigo" },
          { label: "Services", value: "12", icon: Utensils, color: "violet" },
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
          data={categories}
          columns={columns}
          searchPlaceholder="Search categories by name..."
          actions={(category: CategoryDisplay) => (
            <div className="flex items-center gap-1">
              <button
                type="button"
                className="p-2 text-[#008ca1] hover:bg-cyan-50 rounded-xl transition-all active:scale-90"
                title="View Category"
              >
                <Eye className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleEdit(category)}
                type="button"
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-all active:scale-90"
                title="Edit Category"
              >
                <Edit className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleDelete(category.id)}
                type="button"
                className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-all active:scale-90"
                title="Delete Category"
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
            <p className="text-red-500 font-bold">Failed to load categories. Please try again.</p>
          </div>
        )}
      </div>

      <CreateCategoryModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditCategory(null);
        }}
        editCategory={editCategory}
      />

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Category?"
        message="Are you sure you want to delete this category? This action cannot be undone and will remove all associated data."
        isLoading={isDeleting}
        confirmText="Delete Category"
        variant="danger"
      />
    </div>
  );
};

export default CategoriesPage;


