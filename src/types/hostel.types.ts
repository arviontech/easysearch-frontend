export interface IHostelRent {
    id: string;
    title: string;
    description?: string;
    price: number;
    roomType: "SINGLE" | "DOUBLE" | "TRIPLE" | "SHARED";
    mealIncluded: boolean;
    mealDescription?: string;
    tenantType: "MALE" | "FEMALE" | "ANY";
    address: string;
    city: string;
    state?: string;
    zipCode?: string;
    images?: string[];
    facilities?: string[];
    isAvailable: boolean;
    availableFrom?: string;
    views: number;
    isApproved: boolean;
    owner: {
        id: string;
        name: string;
        email: string; // from user
        phoneNumber?: string;
    };
    category?: {
        id: string;
        categoryName: string;
    };
    createdAt: string;
    updatedAt: string;
}
