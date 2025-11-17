import type {
  HostelRent,
  CreateHostelRentRequest,
  UpdateHostelRentRequest,
} from "@/lib/api/types";
import { createCrudApi } from "./apiFactory";

/**
 * Hostel Rent API
 * Uses the CRUD API factory for automatic endpoints generation
 *
 * Provides:
 * - useGetHostelRentsQuery({ page, limit })
 * - useGetHostelRentByIdQuery(id)
 * - useCreateHostelRentMutation()
 * - useUpdateHostelRentMutation()
 * - useDeleteHostelRentMutation()
 *
 * Features:
 * ✅ Automatic caching
 * ✅ Optimistic updates
 * ✅ Request deduplication
 * ✅ Background refetching
 * ✅ Cache invalidation
 */
export const hostelRentApi = createCrudApi<
  HostelRent,
  CreateHostelRentRequest,
  UpdateHostelRentRequest
>({
  reducerPath: "hostelRentApi",
  entityName: "hostel-rent",
  tagTypes: ["HostelRent", "HostelRentList"],
});

// Export hooks for usage in components
export const {
  useGetAllQuery: useGetHostelRentsQuery,
  useGetByIdQuery: useGetHostelRentByIdQuery,
  useCreateMutation: useCreateHostelRentMutation,
  useUpdateMutation: useUpdateHostelRentMutation,
  useDeleteMutation: useDeleteHostelRentMutation,
} = hostelRentApi;

// Export for store configuration
export const { endpoints, reducerPath, reducer, middleware } = hostelRentApi;
