import { apiClient } from "./client";
import type {
  ApiResponse,
  HostelRent,
  CreateHostelRentRequest,
  UpdateHostelRentRequest,
  PaginationQuery,
} from "./types";

export const hostelRentAPI = {
  /**
   * Create a new hostel rent listing
   * POST /api/v1/hostel-rent/create-hostel-rent
   */
  async create(data: CreateHostelRentRequest): Promise<ApiResponse<HostelRent>> {
    return apiClient.post<HostelRent>(
      "/api/v1/hostel-rent/create-hostel-rent",
      data,
      true,
    );
  },

  /**
   * Get all hostel rents with pagination
   * GET /api/v1/hostel-rent/get-all-hostel-rent
   */
  async getAll(query?: PaginationQuery): Promise<ApiResponse<HostelRent[]>> {
    const params = new URLSearchParams();
    if (query?.page) params.append("page", query.page.toString());
    if (query?.limit) params.append("limit", query.limit.toString());

    const queryString = params.toString();
    const endpoint = queryString
      ? `/api/v1/hostel-rent/get-all-hostel-rent?${queryString}`
      : "/api/v1/hostel-rent/get-all-hostel-rent";

    return apiClient.get<HostelRent[]>(endpoint);
  },

  /**
   * Update hostel rent by ID
   * PATCH /api/v1/hostel-rent/update-hostel-rent/{id}
   */
  async update(
    id: string,
    data: UpdateHostelRentRequest,
  ): Promise<ApiResponse<HostelRent>> {
    return apiClient.patch<HostelRent>(
      `/api/v1/hostel-rent/update-hostel-rent/${id}`,
      data,
      true,
    );
  },

  /**
   * Delete hostel rent by ID
   * DELETE /api/v1/hostel-rent/delete-hostel-rent/{id}
   */
  async delete(id: string): Promise<ApiResponse<HostelRent>> {
    return apiClient.delete<HostelRent>(
      `/api/v1/hostel-rent/delete-hostel-rent/${id}`,
      true,
    );
  },
};
