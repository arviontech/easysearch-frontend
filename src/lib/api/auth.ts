import { apiClient } from "./client";
import type { AuthResponse, RegisterRequest, LoginRequest } from "./types";

export const authAPI = {
  /**
   * Register a new user (HOST or CUSTOMER)
   * POST /api/v1/users/register
   */
  async register(data: RegisterRequest): Promise<AuthResponse> {
    return apiClient.post<{ accessToken: string }>(
      "/api/v1/users/register",
      data,
    ) as Promise<AuthResponse>;
  },

  /**
   * User login (Email/Phone/OAuth)
   * POST /api/v1/auth/login
   */
  async login(data: LoginRequest): Promise<AuthResponse> {
    return apiClient.post<{ accessToken: string }>(
      "/api/v1/auth/login",
      data,
    ) as Promise<AuthResponse>;
  },
};
