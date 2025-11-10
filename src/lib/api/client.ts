import type { ApiResponse } from "./types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://easysearch-server.vercel.app";

export class APIClient {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  private getAuthToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("accessToken");
  }

  private getHeaders(includeAuth = false): HeadersInit {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (includeAuth) {
      const token = this.getAuthToken();
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
    }

    return headers;
  }

  async request<T>(
    endpoint: string,
    options: RequestInit = {},
    includeAuth = false,
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseURL}${endpoint}`;
      const headers = this.getHeaders(includeAuth);

      const response = await fetch(url, {
        ...options,
        headers: {
          ...headers,
          ...options.headers,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        return result;
      }

      return result;
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : "Network error occurred",
        errorMessages: [
          {
            path: "network",
            message: "Failed to connect to server",
          },
        ],
      };
    }
  }

  async get<T>(endpoint: string, includeAuth = false): Promise<ApiResponse<T>> {
    return this.request<T>(
      endpoint,
      {
        method: "GET",
      },
      includeAuth,
    );
  }

  async post<T>(
    endpoint: string,
    data: unknown,
    includeAuth = false,
  ): Promise<ApiResponse<T>> {
    return this.request<T>(
      endpoint,
      {
        method: "POST",
        body: JSON.stringify(data),
      },
      includeAuth,
    );
  }

  async patch<T>(
    endpoint: string,
    data: unknown,
    includeAuth = false,
  ): Promise<ApiResponse<T>> {
    return this.request<T>(
      endpoint,
      {
        method: "PATCH",
        body: JSON.stringify(data),
      },
      includeAuth,
    );
  }

  async delete<T>(endpoint: string, includeAuth = false): Promise<ApiResponse<T>> {
    return this.request<T>(
      endpoint,
      {
        method: "DELETE",
      },
      includeAuth,
    );
  }
}

// Export singleton instance
export const apiClient = new APIClient();
