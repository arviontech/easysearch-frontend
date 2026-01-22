export interface IBlog {
    id: string;
    title: string;
    content: string;
    featuredImage?: string;
    author?: string;
    isPublished: boolean;
    tags?: string[];
    views: number;
    slug: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateBlogRequest {
    title: string;
    content: string;
    featuredImage?: string;
    author?: string;
    tags?: string[];
}

export interface UpdateBlogRequest {
    title?: string;
    content?: string;
    featuredImage?: string;
    author?: string;
    tags?: string[];
}

export interface PublishBlogRequest {
    isPublished: boolean;
}
