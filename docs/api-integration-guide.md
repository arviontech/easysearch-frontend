# API Integration Guide

This guide explains how to use the API integrations in this project.

## Setup

### Environment Configuration

Make sure your `.env.local` file has the API URL configured:

```env
NEXT_PUBLIC_API_URL=https://easysearch-server.vercel.app
```

## Available API Services

### 1. Authentication API (`authAPI`)

```typescript
import { authAPI } from "@/lib/api";

// User Registration (HOST or CUSTOMER)
const registerResult = await authAPI.register({
  name: "John Doe",
  email: "john@example.com",
  contactNumber: "+8801777000000",
  password: "StrongP@ss123",
  role: "HOST", // or "CUSTOMER"
  profilePhoto: "https://example.com/photo.jpg", // optional
});

// User Login - Email/Password
const loginResult = await authAPI.login({
  email: "john@example.com",
  password: "StrongP@ss123",
});

// User Login - Phone/Password
const loginResult = await authAPI.login({
  contactNumber: "+8801777000000",
  password: "StrongP@ss123",
});

// User Login - Google OAuth
const loginResult = await authAPI.login({
  provider: "GOOGLE",
  name: "John Doe",
  email: "john@example.com",
  profilePhoto: "https://example.com/photo.jpg",
});
```

### 2. Users API (`usersAPI`)

```typescript
import { usersAPI } from "@/lib/api";

// Create Admin User (requires authentication)
const adminResult = await usersAPI.createAdmin({
  name: "Admin User",
  email: "admin@example.com",
  contactNumber: "+8801777000000",
  password: "AdminP@ss123",
  profilePhoto: "https://example.com/admin-photo.jpg", // optional
});

// Get All Users (requires authentication)
const usersResult = await usersAPI.getAll();
```

### 3. Categories API (`categoriesAPI`)

```typescript
import { categoriesAPI } from "@/lib/api";

// Create Category (requires authentication)
const createResult = await categoriesAPI.create({
  categoryName: "Apartments",
  categoryImage: "https://example.com/apartment.jpg",
});

// Get All Categories
const categoriesResult = await categoriesAPI.getAll();

// Update Category (requires authentication)
const updateResult = await categoriesAPI.update("category-id", {
  categoryName: "Updated Apartments",
  categoryImage: "https://example.com/updated-apartment.jpg",
});

// Delete Category (requires authentication)
const deleteResult = await categoriesAPI.delete("category-id");
```

### 4. House Rent API (`houseRentAPI`)

```typescript
import { houseRentAPI } from "@/lib/api";

// Create House Rent (requires authentication)
const createResult = await houseRentAPI.create({
  title: "Beautiful 3BHK Apartment",
  description: "Spacious apartment with modern amenities",
  price: 25000,
  propertyType: "Apartment",
  bedrooms: 3,
  bathrooms: 2,
  size: 1200.5,
  floor: "5th",
  totalFloors: 10,
  furnishing: "Furnished",
  availableFrom: "2024-01-01T00:00:00Z",
  address: "123 Main Street",
  area: "Gulshan",
  city: "Dhaka",
  division: "Dhaka",
  lat: 23.7808,
  lng: 90.2792,
  categoryId: "category-uuid",
  ownerId: "owner-uuid",
});

// Get All House Rents with pagination
const housesResult = await houseRentAPI.getAll({
  page: 1,
  limit: 10,
});

// Get All House Rents without pagination
const allHousesResult = await houseRentAPI.getAll();

// Update House Rent (requires authentication)
const updateResult = await houseRentAPI.update("house-id", {
  title: "Updated Beautiful 3BHK Apartment",
  price: 30000,
  bedrooms: 4,
  isAvailable: false,
});

// Delete House Rent (requires authentication)
const deleteResult = await houseRentAPI.delete("house-id");
```

### 5. Hostel Rent API (`hostelRentAPI`)

```typescript
import { hostelRentAPI } from "@/lib/api";

// Create Hostel Rent (requires authentication)
const createResult = await hostelRentAPI.create({
  title: "Comfortable Student Hostel",
  description: "Clean and safe hostel for students",
  price: 8000,
  currency: "BDT",
  type: "Hostel",
  gender: "MALE",
  tenantType: "Student",
  roomType: "Shared_2_person",
  mealOptions: "Included",
  mealsPerDay: 3,
  mealTiming: ["Breakfast 8:00 AM", "Lunch 1:00 PM", "Dinner 8:00 PM"],
  floor: "2nd",
  totalFloors: 4,
  address: "123 University Road",
  area: "Shahbag",
  city: "Dhaka",
  division: "Dhaka",
  lat: 23.728,
  lng: 90.398,
  categoryId: "category-uuid",
  ownerId: "owner-uuid",
});

// Get All Hostel Rents with pagination
const hostelsResult = await hostelRentAPI.getAll({
  page: 1,
  limit: 10,
});

// Get All Hostel Rents without pagination
const allHostelsResult = await hostelRentAPI.getAll();

// Update Hostel Rent (requires authentication)
const updateResult = await hostelRentAPI.update("hostel-id", {
  title: "Updated Student Hostel",
  price: 9000,
  gender: "OTHER",
  isAvailable: false,
});

// Delete Hostel Rent (requires authentication)
const deleteResult = await hostelRentAPI.delete("hostel-id");
```

## API Response Format

All API responses follow this format:

```typescript
{
  statusCode?: number;        // HTTP status code (e.g., 200, 201, 400)
  success: boolean;           // Whether the request was successful
  message: string;            // Response message
  data?: T;                   // Response data (type varies by endpoint)
  meta?: {                    // Pagination metadata (for list endpoints)
    page: number;
    limit: number;
    total: number;
  };
  errorMessages?: Array<{     // Validation errors (on failure)
    path: string;
    message: string;
  }>;
  error?: {                   // Server error details (on failure)
    name: string;
    message: string;
    stack?: string;
  };
}
```

## Authentication

The API client automatically handles authentication tokens:

1. **Login/Register**: After successful login or registration, store the access token:
   ```typescript
   const result = await authAPI.login(credentials);
   if (result.success && result.data?.accessToken) {
     localStorage.setItem("accessToken", result.data.accessToken);
   }
   ```

2. **Authenticated Requests**: The API client automatically includes the token from `localStorage` in requests that require authentication.

3. **Logout**: Clear the token:
   ```typescript
   localStorage.removeItem("accessToken");
   ```

## Error Handling

Always check the `success` field in responses:

```typescript
const result = await houseRentAPI.getAll();

if (result.success) {
  // Handle success
  const houses = result.data;
  const pagination = result.meta;
} else {
  // Handle error
  console.error(result.message);
  if (result.errorMessages) {
    result.errorMessages.forEach((error) => {
      console.error(`${error.path}: ${error.message}`);
    });
  }
}
```

## TypeScript Types

All types are exported from `@/lib/api`:

```typescript
import type {
  User,
  Category,
  HouseRent,
  HostelRent,
  CreateHouseRentRequest,
  UpdateHostelRentRequest,
  ApiResponse,
  // ... and more
} from "@/lib/api";
```

## Custom API Client

If you need to make custom API calls:

```typescript
import { apiClient } from "@/lib/api";

// GET request without auth
const result = await apiClient.get("/api/v1/custom-endpoint");

// POST request with auth
const result = await apiClient.post(
  "/api/v1/custom-endpoint",
  { data: "value" },
  true // includeAuth = true
);

// PATCH request
const result = await apiClient.patch("/api/v1/custom-endpoint/id", data, true);

// DELETE request
const result = await apiClient.delete("/api/v1/custom-endpoint/id", true);
```

## File Structure

```
src/lib/api/
├── index.ts           # Main exports
├── client.ts          # API client with auth handling
├── types.ts           # TypeScript interfaces
├── auth.ts            # Authentication API
├── users.ts           # Users API
├── categories.ts      # Categories API
├── houseRent.ts       # House Rent API
└── hostelRent.ts      # Hostel Rent API
```

## Notes

- All endpoints requiring authentication will automatically include the Bearer token from `localStorage`
- Network errors are automatically caught and returned in the standard response format
- The API base URL is configured via `NEXT_PUBLIC_API_URL` environment variable
