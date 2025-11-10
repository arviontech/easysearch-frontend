// Common API Response Types
export interface ApiResponse<T = unknown> {
  statusCode?: number;
  success: boolean;
  message: string;
  data?: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
  errorMessages?: Array<{
    path: string;
    message: string;
  }>;
  error?: {
    name: string;
    message: string;
    stack?: string;
  };
}

// User & Auth Types
export type UserRole = "CUSTOMER" | "HOST" | "ADMIN";

export interface User {
  id: string;
  name: string;
  email: string;
  contactNumber: string;
  profilePhoto?: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAdminRequest {
  name: string;
  email: string;
  contactNumber: string;
  profilePhoto?: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  contactNumber: string;
  profilePhoto?: string;
  password: string;
  role: "HOST" | "CUSTOMER";
}

export interface LoginRequest {
  email?: string;
  contactNumber?: string;
  password?: string;
  provider?: "GOOGLE";
  name?: string;
  profilePhoto?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    accessToken: string;
  };
  errorMessages?: Array<{
    path: string;
    message: string;
  }>;
}

// Category Types
export interface Category {
  id: string;
  categoryName: string;
  categoryImage: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryRequest {
  categoryName: string;
  categoryImage: string;
}

export interface UpdateCategoryRequest {
  categoryName?: string;
  categoryImage?: string;
}

// House Rent Types
export type PropertyType = "Apartment" | "House" | "Villa" | "Studio";
export type Furnishing = "Furnished" | "Semi_Furnished" | "Unfurnished";

export interface HouseRent {
  id: string;
  title: string;
  description: string;
  price: number;
  propertyType: PropertyType;
  bedrooms: number;
  bathrooms: number;
  size: number;
  floor: string;
  totalFloors: number;
  furnishing: Furnishing;
  availableFrom: string;
  address: string;
  area: string;
  city: string;
  division: string;
  lat: number;
  lng: number;
  isAvailable: boolean;
  categoryId: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateHouseRentRequest {
  title: string;
  description: string;
  price: number;
  propertyType: PropertyType;
  bedrooms: number;
  bathrooms: number;
  size: number;
  floor: string;
  totalFloors: number;
  furnishing: Furnishing;
  availableFrom: string;
  address: string;
  area: string;
  city: string;
  division: string;
  lat: number;
  lng: number;
  categoryId: string;
  ownerId: string;
}

export interface UpdateHouseRentRequest {
  title?: string;
  description?: string;
  price?: number;
  propertyType?: PropertyType;
  bedrooms?: number;
  bathrooms?: number;
  size?: number;
  floor?: string;
  totalFloors?: number;
  furnishing?: Furnishing;
  availableFrom?: string;
  address?: string;
  area?: string;
  city?: string;
  division?: string;
  lat?: number;
  lng?: number;
  categoryId?: string;
  ownerId?: string;
  isAvailable?: boolean;
}

// Hostel Rent Types
export type HostelType = "Hostel" | "Mess";
export type Gender = "MALE" | "FEMALE" | "OTHER";
export type TenantType = "Student" | "Professional" | "Both";
export type RoomType = "Single" | "Shared_2_person" | "Shared_3_person" | "Shared_4_person";
export type MealOptions = "Included" | "Optional" | "Not_Available";

export interface HostelRent {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  type: HostelType;
  gender: Gender;
  tenantType: TenantType;
  roomType: RoomType;
  mealOptions: MealOptions;
  mealsPerDay?: number;
  mealTiming: string[];
  floor: string;
  totalFloors: number;
  address: string;
  area: string;
  city: string;
  division: string;
  lat: number;
  lng: number;
  isAvailable: boolean;
  categoryId: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateHostelRentRequest {
  title: string;
  description: string;
  price: number;
  currency: string;
  type: HostelType;
  gender: Gender;
  tenantType: TenantType;
  roomType: RoomType;
  mealOptions: MealOptions;
  mealsPerDay?: number;
  mealTiming: string[];
  floor: string;
  totalFloors: number;
  address: string;
  area: string;
  city: string;
  division: string;
  lat: number;
  lng: number;
  categoryId: string;
  ownerId: string;
}

export interface UpdateHostelRentRequest {
  title?: string;
  description?: string;
  price?: number;
  currency?: string;
  type?: HostelType;
  gender?: Gender;
  tenantType?: TenantType;
  roomType?: RoomType;
  mealOptions?: MealOptions;
  mealsPerDay?: number;
  mealTiming?: string[];
  floor?: string;
  totalFloors?: number;
  address?: string;
  area?: string;
  city?: string;
  division?: string;
  lat?: number;
  lng?: number;
  categoryId?: string;
  ownerId?: string;
  isAvailable?: boolean;
}

// Pagination Query
export interface PaginationQuery {
  page?: number;
  limit?: number;
}
