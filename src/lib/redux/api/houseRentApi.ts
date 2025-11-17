import type {
  HouseRent,
  CreateHouseRentRequest,
  UpdateHouseRentRequest,
} from "@/lib/api/types";
import { createCrudApi } from "./apiFactory";

/**
 * House Rent API
 * Uses the CRUD API factory for automatic endpoints generation
 *
 * Provides:
 * - useGetHouseRentsQuery({ page, limit })
 * - useGetHouseRentByIdQuery(id)
 * - useCreateHouseRentMutation()
 * - useUpdateHouseRentMutation()
 * - useDeleteHouseRentMutation()
 *
 * Features:
 * ✅ Automatic caching
 * ✅ Optimistic updates
 * ✅ Request deduplication
 * ✅ Background refetching
 * ✅ Cache invalidation
 */
export const houseRentApi = createCrudApi<
  HouseRent,
  CreateHouseRentRequest,
  UpdateHouseRentRequest
>({
  reducerPath: "houseRentApi",
  entityName: "house-rent",
  tagTypes: ["HouseRent", "HouseRentList"],
});

// Export hooks for usage in components
export const {
  useGetAllQuery: useGetHouseRentsQuery,
  useGetByIdQuery: useGetHouseRentByIdQuery,
  useCreateMutation: useCreateHouseRentMutation,
  useUpdateMutation: useUpdateHouseRentMutation,
  useDeleteMutation: useDeleteHouseRentMutation,
} = houseRentApi;

// Export for store configuration
export const { endpoints, reducerPath, reducer, middleware } = houseRentApi;
