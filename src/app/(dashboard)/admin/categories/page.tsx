"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import DataTable from "@/components/dashboard/DataTable";
import { Edit, Trash2, Eye, AlertCircle, Tag } from "lucide-react";
import {
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from "@/lib/redux/api/categoryApi";
import type { Category } from "@/lib/api/types";
import { addNotification } from "@/lib/redux/slices/uiSlice";
import Image from "next/image";

// Display interface for the table
interface CategoryDisplay {
  id: string;
  categoryName: string;
  categoryImage: string;
  createdAt: string;
  updatedAt: string;
}

const CategoriesPage = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  // RTK Query hooks
  const { data: response, isLoading, isFetching, error } = useGetCategoriesQuery({ page, limit });
  const [updateCategory, { isLoading: isUpdating }] = useUpdateCategoryMutation();
  const [deleteCategory, { isLoading: isDeleting }] = useDeleteCategoryMutation();

  // Transform API data to display format
  const categories: CategoryDisplay[] = response?.data
    ? response.data.map((category: Category) => ({
        id: category.id,
        categoryName: category.categoryName,
        categoryImage: category.categoryImage,
        createdAt: new Date(category.createdAt).toLocaleDateString(),
        updatedAt: new Date(category.updatedAt).toLocaleDateString(),
      }))
    : [];

  // Calculate statistics
  const totalCategories = response?.meta?.total || 0;

  const handleDeleteCategory = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await deleteCategory(id).unwrap();
        dispatch(
          addNotification({
            type: "success",
            message: "Category deleted successfully",
          }),
        );
      } catch (err) {
        dispatch(
          addNotification({
            type: "error",
            message: "Failed to delete category",
          }),
        );
      }
    }
  };

  const columns = [
    {
      key: "categoryImage",
      label: "Image",
      render: (category: CategoryDisplay) => (
        <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
          {category.categoryImage ? (
            <Image
              src={category.categoryImage}
              alt={category.categoryName}
              fill
              className="object-cover"
              sizes="64px"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Tag className="w-6 h-6 text-gray-400" />
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
          <p className="font-medium text-gray-900">{category.categoryName}</p>
          <p className="text-xs text-gray-500">ID: {category.id}</p>
        </div>
      ),
    },
    {
      key: "createdAt",
      label: "Created",
      render: (category: CategoryDisplay) => (
        <span className="text-sm text-gray-600">{category.createdAt}</span>
      ),
    },
    {
      key: "updatedAt",
      label: "Last Updated",
      render: (category: CategoryDisplay) => (
        <span className="text-sm text-gray-600">{category.updatedAt}</span>
      ),
    },
  ];

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading categories...</p>
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
          <p className="text-gray-900 font-semibold">Failed to load categories</p>
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
          <h1 className="text-3xl font-bold text-gray-900">Categories Management</h1>
          <p className="text-gray-600 mt-1">Manage all property categories</p>
        </div>
        <button
          type="button"
          className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-colors shadow-md"
        >
          Add New Category
        </button>
      </div>

      {/* Loading Indicator */}
      {isFetching && !isLoading && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600 mr-3"></div>
          <span className="text-sm text-green-700">Updating categories...</span>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Total Categories</p>
          <p className="text-2xl font-bold text-gray-900">{totalCategories}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Active</p>
          <p className="text-2xl font-bold text-green-600">{categories.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Properties</p>
          <p className="text-2xl font-bold text-blue-600">N/A</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Hostels</p>
          <p className="text-2xl font-bold text-purple-600">N/A</p>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        data={categories}
        columns={columns}
        searchPlaceholder="Search categories..."
        actions={(category) => (
          <>
            <button
              type="button"
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="View Category"
              disabled={isUpdating || isDeleting}
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              type="button"
              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
              title="Edit Category"
              disabled={isUpdating || isDeleting}
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => handleDeleteCategory(category.id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
              title="Delete Category"
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
            {response.meta.total} categories
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
              {response.meta &&
                Array.from({ length: Math.ceil(response.meta.total / limit) }, (_, i) => i + 1)
                  .filter(
                    (p) =>
                      p === 1 ||
                      p === page ||
                      p === Math.ceil(response.meta!.total / limit) ||
                      Math.abs(p - page) <= 1,
                  )
                  .map((p, i, arr) => (
                    <div key={p} className="flex items-center">
                      {i > 0 && arr[i - 1] !== p - 1 && (
                        <span className="px-2 text-gray-400">...</span>
                      )}
                      <button
                        type="button"
                        onClick={() => setPage(p)}
                        className={`px-3 py-1 rounded-lg ${
                          p === page
                            ? "bg-green-600 text-white"
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

export default CategoriesPage;
