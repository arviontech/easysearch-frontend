import { baseApi } from "../../api/baseApi";

const cateringApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllCaterings: builder.query({
            query: () => ({
                url: '/caterings',
                method: 'GET',
            }),
            providesTags: ["caterings"],
        }),
        createCatering: builder.mutation({
            query: (data) => ({
                url: '/caterings',
                method: 'POST',
                data,
                contentType: "multipart/form-data",
            }),
            invalidatesTags: ["caterings"],
        }),
        updateCatering: builder.mutation({
            query: ({ id, data }) => ({
                url: `/caterings/${id}`,
                method: 'PATCH',
                data,
                contentType: "multipart/form-data",
            }),
            invalidatesTags: ["caterings"],
        }),
        deleteCatering: builder.mutation({
            query: (id) => ({
                url: `/caterings/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["caterings"],
        }),
    }),
    overrideExisting: true,
})

export const {
    useGetAllCateringsQuery,
    useCreateCateringMutation,
    useUpdateCateringMutation,
    useDeleteCateringMutation
} = cateringApi
