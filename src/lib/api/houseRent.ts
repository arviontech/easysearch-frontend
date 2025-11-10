import { apiClient } from "./client";
import type {
  ApiResponse,
  HouseRent,
  CreateHouseRentRequest,
  UpdateHouseRentRequest,
  PaginationQuery,
} from "./types";

export const houseRentAPI = {
  /**
   * Create a new house rent listing
   * POST /api/v1/house-rent/create-house-rent
   */
  async create(data: CreateHouseRentRequest): Promise<ApiResponse<HouseRent>> {
    return apiClient.post<HouseRent>("/api/v1/house-rent/create-house-rent", data, true);
  },

  /**
   * Get all house rents with pagination
   * GET /api/v1/house-rent/get-all-house-rent
   */
  async getAll(query?: PaginationQuery): Promise<ApiResponse<HouseRent[]>> {
    const params = new URLSearchParams();
    if (query?.page) params.append("page", query.page.toString());
    if (query?.limit) params.append("limit", query.limit.toString());

    const queryString = params.toString();
    const endpoint = queryString
      ? `/api/v1/house-rent/get-all-house-rent?${queryString}`
      : "/api/v1/house-rent/get-all-house-rent";

    return apiClient.get<HouseRent[]>(endpoint);
  },

  /**
   * Update house rent by ID
   * PATCH /api/v1/house-rent/update-house-rent/{id}
   */
  async update(
    id: string,
    data: UpdateHouseRentRequest,
  ): Promise<ApiResponse<HouseRent>> {
    return apiClient.patch<HouseRent>(
      `/api/v1/house-rent/update-house-rent/${id}`,
      data,
      true,
    );
  },

  /**
   * Delete house rent by ID
   * DELETE /api/v1/house-rent/delete-house-rent/{id}
   */
  async delete(id: string): Promise<ApiResponse<HouseRent>> {
    return apiClient.delete<HouseRent>(
      `/api/v1/house-rent/delete-house-rent/${id}`,
      true,
    );
  },
};
