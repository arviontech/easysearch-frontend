import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";

/**
 * Shared API configuration
 */
export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "https://easysearch-server.vercel.app",
  version: "v1",
  timeout: 30000, // 30 seconds
} as const;

/**
 * Get full API base URL with version
 */
export const getApiBaseUrl = () => `${API_CONFIG.baseUrl}/api/${API_CONFIG.version}`;

/**
 * Get authentication token from localStorage
 */
const getAuthToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("accessToken");
};

/**
 * Shared base query with authentication
 * This is used by all API slices to ensure consistent configuration
 */
export const baseQuery = fetchBaseQuery({
  baseUrl: getApiBaseUrl(),
  prepareHeaders: (headers) => {
    // Add auth token if available
    const token = getAuthToken();
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    // Set content type
    headers.set("content-type", "application/json");

    return headers;
  },
  // Optional: Add timeout
  timeout: API_CONFIG.timeout,
});

/**
 * Base query with error handling and token refresh logic
 * You can extend this to handle token refresh, retry logic, etc.
 */
export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // Handle 401 Unauthorized - could implement token refresh here
  if (result.error && result.error.status === 401) {
    // Optional: Implement token refresh logic here
    // const refreshResult = await baseQuery('/auth/refresh', api, extraOptions);
    // if (refreshResult.data) {
    //   // Store new token
    //   // Retry original request
    // } else {
    //   // Logout user
    // }
  }

  return result;
};

/**
 * Common tag types used across APIs
 */
export const COMMON_TAG_TYPES = {
  HOUSE_RENT: "HouseRent" as const,
  HOUSE_RENT_LIST: "HouseRentList" as const,
  HOSTEL_RENT: "HostelRent" as const,
  HOSTEL_RENT_LIST: "HostelRentList" as const,
  USER: "User" as const,
  USER_LIST: "UserList" as const,
  CATEGORY: "Category" as const,
  CATEGORY_LIST: "CategoryList" as const,
};

/**
 * Helper to create provide tags for list endpoints
 */
export const providesList = <T extends { id: string }>(
  resultsWithIds: T[] | undefined,
  tagType: string,
) => {
  return resultsWithIds
    ? [
        ...resultsWithIds.map(({ id }) => ({ type: tagType, id })),
        { type: tagType, id: "LIST" },
      ]
    : [{ type: tagType, id: "LIST" }];
};

/**
 * Helper to invalidate list and specific item
 */
export const invalidatesList = (id: string | undefined, tagType: string) => {
  return id
    ? [
        { type: tagType, id },
        { type: tagType, id: "LIST" },
      ]
    : [{ type: tagType, id: "LIST" }];
};
