# Banner Module Integration Guide

## Overview
The Banner module allows administrators to manage promotional banners and slideshows on the website. This guide explains how to use the Banner API and components in the frontend.

## API Endpoints

### Admin Endpoints
- `GET /banner` - Get all banners with pagination
- `GET /banner/active` - Get only active banners
- `GET /banner/{id}` - Get specific banner by ID
- `POST /banner` - Create new banner with image upload
- `PUT /banner/{id}` - Update existing banner with optional image update
- `DELETE /banner/{id}` - Delete banner with image cleanup

### Public Component
- `BannerCarousel` - Displays active banners in a rotating carousel

## Frontend Components

### 1. Banner Management Page (`/admin/banners`)
Located at: `/src/app/(dashboard)/admin/banners/page.tsx`

Features:
- Create, edit, delete banners
- Upload banner images with previews
- Set banner priority and active status
- Search and filter functionality
- Responsive table display

### 2. Banner Carousel (`BannerCarousel.tsx`)
Located at: `/src/app/(public)/banners/BannerCarousel.tsx`

Features:
- Rotating banner display
- Auto-rotation every 5 seconds
- Manual navigation controls
- Link support for banners
- Responsive design

## Redux Integration

### API Slice
Located at: `/src/lib/redux/features/banner/bannerApi.ts`

Available hooks:
- `useGetAllBannersQuery` - Fetch all banners
- `useGetActiveBannersQuery` - Fetch active banners only
- `useGetBannerByIdQuery` - Fetch specific banner
- `useCreateBannerMutation` - Create new banner
- `useUpdateBannerMutation` - Update existing banner
- `useDeleteBannerMutation` - Delete banner

### Store Configuration
The Banner API is integrated with RTK Query and follows the same patterns as other API slices in the application.

## Usage Examples

### Using Banner API in Components
```typescript
import { useGetActiveBannersQuery } from "@/lib/redux/features/banner/bannerApi";

const MyComponent = () => {
  const { data, isLoading, isError } = useGetActiveBannersQuery();

  if (isLoading) return <div>Loading banners...</div>;
  if (isError) return <div>Error loading banners</div>;

  return (
    <div>
      {data?.data.map(banner => (
        <div key={banner.id}>{banner.title}</div>
      ))}
    </div>
  );
};
```

### Creating a New Banner
```typescript
import { useCreateBannerMutation } from "@/lib/redux/features/banner/bannerApi";

const CreateBanner = () => {
  const [createBanner, { isLoading }] = useCreateBannerMutation();

  const handleSubmit = async (formData: FormData) => {
    try {
      await createBanner({
        title: "New Banner",
        altText: "Banner Alt Text",
        image: file,
        priority: 1,
        isActive: true
      }).unwrap();
    } catch (error) {
      console.error("Failed to create banner:", error);
    }
  };
};
```

## Environment Configuration

The API URL is configured in `.env`:
```
NEXT_PUBLIC_API_URL=http://localhost:3950
```

## Navigation

The Banner management page is accessible through the admin sidebar under "Banners".

## Styling

The Banner components use the same UI components and styling patterns as the rest of the application, ensuring consistency with the overall design system.