export interface IHouseRent {
    id: string;
    title: string;
    description?: string;
    price: number;
    bedrooms: number;
    bathrooms: number;
    squareFeet?: number;
    address: string;
    city: string;
    state?: string;
    zipCode?: string;
    latitude?: number;
    longitude?: number;
    images?: string[];
    amenities?: string[];
    features?: string[];
    nearbyPlaces?: Array<{ name: string; distance: string; type: string }>;
    rules?: string[];
    furnished: boolean;
    type?: string;
    parking?: { available: boolean; type: string; spaces: number };
    isAvailable: boolean;
    availableFrom?: string;
    views: number;
    isApproved: boolean;
    owner: {
        id: string;
        name: string;
        profilePhoto?: string;
    } | null;
    category?: {
        id: string;
        categoryName: string;
    };
    createdAt: string;
    updatedAt: string;
}
