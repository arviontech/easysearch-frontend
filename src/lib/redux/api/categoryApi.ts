import type { Category, CreateCategoryRequest, UpdateCategoryRequest } from "@/lib/api/types";
import { createCrudApi } from "./apiFactory";

/**
 * Category API
 * Uses the CRUD API factory for automatic endpoints generation
 *
 * Provides:
 * - useGetCategoriesQuery({ page, limit })
 * - useGetCategoryByIdQuery(id)
 * - useCreateCategoryMutation()
 * - useUpdateCategoryMutation()
 * - useDeleteCategoryMutation()
 *
 * Features:
 * ✅ Automatic caching
 * ✅ Optimistic updates
 * ✅ Request deduplication
 * ✅ Background refetching
 * ✅ Cache invalidation
 */
export const categoryApi = createCrudApi<Category, CreateCategoryRequest, UpdateCategoryRequest>({
  reducerPath: "categoryApi",
  entityName: "categories",
  tagTypes: ["Category", "CategoryList"],
  endpoints: {
    getAll: "/categories/get-all-category",
    getById: "/categories",
    create: "/categories/create-category",
    update: "/categories/update-category",
    delete: "/categories/delete-category",
  },
});

// Export hooks for usage in components
export const {
  useGetAllQuery: useGetCategoriesQuery,
  useGetByIdQuery: useGetCategoryByIdQuery,
  useCreateMutation: useCreateCategoryMutation,
  useUpdateMutation: useUpdateCategoryMutation,
  useDeleteMutation: useDeleteCategoryMutation,
} = categoryApi;

// Export for store configuration
export const { endpoints, reducerPath, reducer, middleware } = categoryApi;
