import { apiClient } from "./client";
import type {
  ApiResponse,
  Category,
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from "./types";

export const categoriesAPI = {
  /**
   * Create a new category
   * POST /api/v1/categories/create-category
   */
  async create(data: CreateCategoryRequest): Promise<ApiResponse<Category>> {
    return apiClient.post<Category>("/api/v1/categories/create-category", data, true);
  },

  /**
   * Get all categories
   * GET /api/v1/categories/get-all-category
   */
  async getAll(): Promise<ApiResponse<Category[]>> {
    return apiClient.get<Category[]>("/api/v1/categories/get-all-category");
  },

  /**
   * Update category by ID
   * PATCH /api/v1/categories/update-category/{id}
   */
  async update(
    id: string,
    data: UpdateCategoryRequest,
  ): Promise<ApiResponse<Category>> {
    return apiClient.patch<Category>(
      `/api/v1/categories/update-category/${id}`,
      data,
      true,
    );
  },

  /**
   * Delete category by ID
   * DELETE /api/v1/categories/delete-category/{id}
   */
  async delete(id: string): Promise<ApiResponse<Category>> {
    return apiClient.delete<Category>(
      `/api/v1/categories/delete-category/${id}`,
      true,
    );
  },
};
