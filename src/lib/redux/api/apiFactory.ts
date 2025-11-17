import { createApi } from "@reduxjs/toolkit/query/react";
import type { ApiResponse, PaginationQuery } from "@/lib/api/types";
import { baseQuery } from "./baseQuery";

/**
 * Configuration for creating a CRUD API
 */
interface CrudApiConfig {
  reducerPath: string;
  entityName: string; // e.g., "house-rent", "hostel-rent"
  tagTypes: [string, string]; // e.g., ["HouseRent", "HouseRentList"]
  endpoints?: {
    getAll?: string; // Custom endpoint name (default: "get-all-{entityName}")
    getById?: string; // Custom endpoint name (default: "{id}")
    create?: string; // Custom endpoint name (default: "create-{entityName}")
    update?: string; // Custom endpoint name (default: "update-{entityName}/{id}")
    delete?: string; // Custom endpoint name (default: "delete-{entityName}/{id}")
  };
}

/**
 * Response type for paginated data
 */
export interface PaginatedResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T[];
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
}

/**
 * Factory function to create a standard CRUD API
 * Reduces boilerplate by 90%!
 *
 * @example
 * export const houseRentApi = createCrudApi<HouseRent, CreateHouseRentRequest, UpdateHouseRentRequest>({
 *   reducerPath: "houseRentApi",
 *   entityName: "house-rent",
 *   tagTypes: ["HouseRent", "HouseRentList"],
 * });
 */
export const createCrudApi = <T extends { id: string }, CreateT = Partial<T>, UpdateT = Partial<T>>(
  config: CrudApiConfig,
) => {
  const {
    reducerPath,
    entityName,
    tagTypes: [itemTag, listTag],
    endpoints: customEndpoints = {},
  } = config;

  // Default endpoint paths
  const endpointPaths = {
    getAll: customEndpoints.getAll || `/${entityName}/get-all-${entityName}`,
    getById: customEndpoints.getById || `/${entityName}`,
    create: customEndpoints.create || `/${entityName}/create-${entityName}`,
    update: customEndpoints.update || `/${entityName}/update-${entityName}`,
    delete: customEndpoints.delete || `/${entityName}/delete-${entityName}`,
  };

  const api = createApi({
    reducerPath,
    baseQuery,
    tagTypes: [itemTag, listTag],
    endpoints: (builder) => ({
      // GET all with pagination
      getAll: builder.query<PaginatedResponse<T>, PaginationQuery | void>({
        query: (params) => {
          const { page = 1, limit = 10 } = params || {};
          return {
            url: endpointPaths.getAll,
            params: { page, limit },
          };
        },
        providesTags: (result) =>
          result?.data
            ? [
                ...result.data.map(({ id }) => ({ type: itemTag, id } as const)),
                { type: listTag, id: "LIST" } as const,
              ]
            : [{ type: listTag, id: "LIST" } as const],
      }),

      // GET by ID
      getById: builder.query<ApiResponse<T>, string>({
        query: (id) => `${endpointPaths.getById}/${id}`,
        providesTags: (result, error, id) => [{ type: itemTag, id }],
      }),

      // CREATE
      create: builder.mutation<ApiResponse<T>, CreateT>({
        query: (data) => ({
          url: endpointPaths.create,
          method: "POST",
          body: data,
        }),
        invalidatesTags: [{ type: listTag, id: "LIST" }],
      }),

      // UPDATE with optimistic update
      update: builder.mutation<ApiResponse<T>, { id: string; data: UpdateT }>({
        query: ({ id, data }) => ({
          url: `${endpointPaths.update}/${id}`,
          method: "PATCH",
          body: data,
        }),
        async onQueryStarted({ id, data }, { dispatch, queryFulfilled }) {
          // Optimistic update
          const patchResult = dispatch(
            api.util.updateQueryData("getAll", { page: 1, limit: 10 }, (draft) => {
              const item = draft.data?.find((item) => item.id === id);
              if (item) {
                Object.assign(item, data);
              }
            }),
          );

          try {
            await queryFulfilled;
          } catch {
            patchResult.undo();
          }
        },
        invalidatesTags: (result, error, { id }) => [
          { type: itemTag, id },
          { type: listTag, id: "LIST" },
        ],
      }),

      // DELETE with optimistic update
      delete: builder.mutation<ApiResponse<T>, string>({
        query: (id) => ({
          url: `${endpointPaths.delete}/${id}`,
          method: "DELETE",
        }),
        async onQueryStarted(id, { dispatch, queryFulfilled }) {
          // Optimistic update
          const patchResult = dispatch(
            api.util.updateQueryData("getAll", { page: 1, limit: 10 }, (draft) => {
              if (draft.data) {
                const filteredData = draft.data.filter((item) => item.id !== id);
                draft.data = filteredData as typeof draft.data;
                if (draft.meta) {
                  draft.meta.total -= 1;
                }
              }
            }),
          );

          try {
            await queryFulfilled;
          } catch {
            patchResult.undo();
          }
        },
        invalidatesTags: (result, error, id) => [
          { type: itemTag, id },
          { type: listTag, id: "LIST" },
        ],
      }),
    }),
  });

  return api;
};
