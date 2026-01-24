import { baseApi } from "../../api/baseApi";

const foodApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllFood: builder.query({
            query: () => ({
                url: '/food',
                method: 'GET',
            }),
            providesTags: ["food"],
        }),
        createFood: builder.mutation({
            query: (data) => ({
                url: '/food',
                method: 'POST',
                data,
                contentType: "multipart/form-data",
            }),
            invalidatesTags: ["food"],
        }),
        updateFood: builder.mutation({
            query: ({ id, data }) => ({
                url: `/food/${id}`,
                method: 'PATCH',
                data,
                contentType: "multipart/form-data",
            }),
            invalidatesTags: ["food"],
        }),
        deleteFood: builder.mutation({
            query: (id) => ({
                url: `/food/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["food"],
        }),
    }),
    overrideExisting: true,
})

export const {
    useGetAllFoodQuery,
    useCreateFoodMutation,
    useUpdateFoodMutation,
    useDeleteFoodMutation
} = foodApi
