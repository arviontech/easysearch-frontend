import { baseApi } from "../../api/baseApi";
import { TMeta } from "@/types";
import { IBlog, CreateBlogRequest, UpdateBlogRequest, PublishBlogRequest } from "@/types/blog.types";

const blogApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getBlogs: builder.query<{ data: IBlog[]; meta: TMeta }, Record<string, any>>({
            query: (params) => ({
                url: "/blogs",
                method: "GET",
                params: params,
            }),
            providesTags: ["blogs"],
        }),
        getBlogById: builder.query<{ data: IBlog }, string>({
            query: (id) => ({
                url: `/blogs/${id}`,
                method: "GET",
            }),
            providesTags: (result, error, id) => [{ type: "blogs", id }],
        }),
        createBlog: builder.mutation<{ data: IBlog }, CreateBlogRequest>({
            query: (data) => ({
                url: "/blogs",
                method: "POST",
                data: data,
            }),
            invalidatesTags: ["blogs"],
        }),
        updateBlog: builder.mutation<{ data: IBlog }, { id: string; data: UpdateBlogRequest }>({
            query: ({ id, data }) => ({
                url: `/blogs/${id}`,
                method: "PATCH",
                data: data,
            }),
            invalidatesTags: (result, error, { id }) => ["blogs", { type: "blogs", id }],
        }),
        deleteBlog: builder.mutation<{ message: string }, string>({
            query: (id) => ({
                url: `/blogs/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["blogs"],
        }),
        publishBlog: builder.mutation<{ data: IBlog }, { id: string; data: PublishBlogRequest }>({
            query: ({ id, data }) => ({
                url: `/blogs/${id}/publish`,
                method: "PATCH",
                data: data,
            }),
            invalidatesTags: (result, error, { id }) => ["blogs", { type: "blogs", id }],
        }),
    }),
});

export const {
    useGetBlogsQuery,
    useGetBlogByIdQuery,
    useCreateBlogMutation,
    useUpdateBlogMutation,
    useDeleteBlogMutation,
    usePublishBlogMutation,
} = blogApi;
