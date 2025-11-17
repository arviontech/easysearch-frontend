import type { User, CreateAdminRequest, UpdateUserRequest } from "@/lib/api/types";
import { createCrudApi } from "./apiFactory";

/**
 * User API
 * Uses the CRUD API factory for automatic endpoints generation
 *
 * Provides:
 * - useGetUsersQuery({ page, limit })
 * - useGetUserByIdQuery(id)
 * - useCreateUserMutation()
 * - useUpdateUserMutation()
 * - useDeleteUserMutation()
 *
 * Features:
 * ✅ Automatic caching
 * ✅ Optimistic updates
 * ✅ Request deduplication
 * ✅ Background refetching
 * ✅ Cache invalidation
 */
export const userApi = createCrudApi<User, CreateAdminRequest, UpdateUserRequest>({
  reducerPath: "userApi",
  entityName: "users",
  tagTypes: ["User", "UserList"],
  endpoints: {
    getAll: "/users/create-admin", // Backend uses create-admin for GET all users
    getById: "/users",
    create: "/users/create-admin",
    update: "/users/update-user",
    delete: "/users/delete-user",
  },
});

// Export hooks for usage in components
export const {
  useGetAllQuery: useGetUsersQuery,
  useGetByIdQuery: useGetUserByIdQuery,
  useCreateMutation: useCreateUserMutation,
  useUpdateMutation: useUpdateUserMutation,
  useDeleteMutation: useDeleteUserMutation,
} = userApi;

// Export for store configuration
export const { endpoints, reducerPath, reducer, middleware } = userApi;
