import type { User } from "@/lib/redux/slices/authSlice";

interface JWTPayload {
  userId?: string;
  id?: string;
  _id?: string;
  email?: string;
  name?: string;
  userName?: string;
  username?: string;
  fullName?: string;
  displayName?: string;
  role?: "CUSTOMER" | "HOST" | "ADMIN";
  contactNumber?: string;
  phone?: string;
  phoneNumber?: string;
  profilePhoto?: string;
  avatar?: string;
  picture?: string;
  exp?: number;
  iat?: number;
  [key: string]: any; // Allow any other fields
}

/**
 * Decode a JWT token without verification
 * Note: This should only be used for reading claims, not for security validation
 */
export function decodeJWT(token: string): JWTPayload | null {
  try {
    const base64Url = token.split(".")[1];
    if (!base64Url) return null;

    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Failed to decode JWT:", error);
    return null;
  }
}

/**
 * Extract user information from JWT token
 */
export function getUserFromToken(token: string): Partial<User> | null {
  const payload = decodeJWT(token);
  if (!payload) return null;



  // Try to extract ID from multiple possible field names
  const id = payload.userId || payload.id || payload._id || "";

  // Try to extract name from multiple possible field names
  const name = payload.name || payload.userName || payload.username || payload.fullName || payload.displayName || "";

  // Try to extract contact from multiple possible field names
  const contactNumber = payload.contactNumber || payload.phone || payload.phoneNumber;

  // Try to extract profile photo from multiple possible field names
  const profilePhoto = payload.profilePhoto || payload.avatar || payload.picture;



  return {
    id,
    email: payload.email || "",
    name,
    role: payload.role || "CUSTOMER",
    contactNumber,
    profilePhoto,
  };
}

/**
 * Check if JWT token is expired
 */
export function isTokenExpired(token: string): boolean {
  const payload = decodeJWT(token);
  if (!payload || !payload.exp) return true;

  return Date.now() >= payload.exp * 1000;
}
