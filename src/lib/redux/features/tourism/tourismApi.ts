import { baseApi } from "../../api/baseApi";

const tourismApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllTourism: builder.query({
            query: () => ({
                url: '/tourism',
                method: 'GET',
            }),
            providesTags: ["tourism"],
        }),
        createTourism: builder.mutation({
            query: (data) => ({
                url: '/tourism',
                method: 'POST',
                data,
                contentType: "multipart/form-data",
            }),
            invalidatesTags: ["tourism"],
        }),
        updateTourism: builder.mutation({
            query: ({ id, data }) => ({
                url: `/tourism/${id}`,
                method: 'PATCH',
                data,
                contentType: "multipart/form-data",
            }),
            invalidatesTags: ["tourism"],
        }),
        deleteTourism: builder.mutation({
            query: (id) => ({
                url: `/tourism/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["tourism"],
        }),
    }),
    overrideExisting: true,
})

export const {
    useGetAllTourismQuery,
    useCreateTourismMutation,
    useUpdateTourismMutation,
    useDeleteTourismMutation
} = tourismApi
