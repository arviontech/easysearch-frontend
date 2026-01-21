import { baseApi } from "../../api/baseApi";

const houseRentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllHouseRents: builder.query({
            query: (params: any) => ({
                url: `/house-rents`,
                method: "GET",
                params,
            }),
            providesTags: ["house-rents"],
        }),
        getHouseRentById: builder.query({
            query: (id) => ({
                url: `/house-rents/${id}`,
                method: "GET",
            }),
            providesTags: ["house-rents"],
        }),
        createHouseRent: builder.mutation({
            query: (data) => ({
                url: `/house-rents`,
                method: "POST",
                data,
            }),
            invalidatesTags: ["house-rents"],
        }),
        updateHouseRent: builder.mutation({
            query: ({ id, data }) => ({
                url: `/house-rents/${id}`,
                method: "PATCH",
                data,
            }),
            invalidatesTags: ["house-rents"],
        }),
        deleteHouseRent: builder.mutation({
            query: (id) => ({
                url: `/house-rents/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["house-rents"],
        }),
        approveHouseRent: builder.mutation({
            query: (id) => ({
                url: `/house-rents/${id}/approve`,
                method: "PATCH",
            }),
            invalidatesTags: ["house-rents"],
        }),
        rejectHouseRent: builder.mutation({
            query: (id) => ({
                url: `/house-rents/${id}/reject`,
                method: "PATCH",
            }),
            invalidatesTags: ["house-rents"],
        }),
    }),
    overrideExisting: true,
});

export const {
    useGetAllHouseRentsQuery,
    useGetHouseRentByIdQuery,
    useCreateHouseRentMutation,
    useUpdateHouseRentMutation,
    useDeleteHouseRentMutation,
    useApproveHouseRentMutation,
    useRejectHouseRentMutation,
} = houseRentApi;
