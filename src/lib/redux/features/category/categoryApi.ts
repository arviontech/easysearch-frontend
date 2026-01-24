import { baseApi } from "../../api/baseApi";



const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: () => ({
        url: '/categories',
        method: 'GET',
      }),
      providesTags: ["categories"],
    }),
    createCategory: builder.mutation({
      query: (data) => ({
        url: '/categories',
        method: 'POST',
        data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: ["categories"],
    }),
    updateCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/categories/${id}`,
        method: 'PATCH',
        data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: ["categories"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/categories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ["categories"],
    }),
    reorderCategories: builder.mutation({
      query: (data) => ({
        url: '/categories/reorder',
        method: 'PATCH',
        data,
      }),
      invalidatesTags: ["categories"],
    }),
    getCategoryStatistics: builder.query({
      query: () => ({
        url: '/categories/statistics',
        method: 'GET',
      }),
      providesTags: ["categories"],
    }),
  }),
  overrideExisting: true,
})


export const {
  useGetAllCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useReorderCategoriesMutation,
  useGetCategoryStatisticsQuery
} = categoryApi
