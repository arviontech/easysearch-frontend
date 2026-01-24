export interface IBanner {
    id: string;
    title: string;
    subtitle?: string;
    imageUrl: string;
    altText: string;
    description?: string;
    linkUrl?: string;
    isActive: boolean;
    priority: number;
    createdAt: string;
    updatedAt: string;
}
