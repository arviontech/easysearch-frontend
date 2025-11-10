import { apiClient } from "./client";
import type { ApiResponse, User, CreateAdminRequest } from "./types";

export const usersAPI = {
  /**
   * Create a new admin user
   * POST /api/v1/users/create-admin
   */
  async createAdmin(data: CreateAdminRequest): Promise<ApiResponse<User>> {
    return apiClient.post<User>("/api/v1/users/create-admin", data, true);
  },

  /**
   * Get all users
   * GET /api/v1/users/create-admin (Note: API docs show this endpoint for get all)
   */
  async getAll(): Promise<ApiResponse<User[]>> {
    return apiClient.get<User[]>("/api/v1/users/create-admin", true);
  },
};
