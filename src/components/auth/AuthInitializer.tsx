"use client";

import { useAuthPersistence } from "@/hooks/useAuthPersistence";

/**
 * Client component that initializes authentication state from localStorage
 * Must be used within StoreProvider
 */
export default function AuthInitializer() {
  useAuthPersistence();
  return null;
}
