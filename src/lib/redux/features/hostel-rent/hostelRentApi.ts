import { baseApi } from "../../api/baseApi";

const hostelRentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllHostelRents: builder.query({
            query: (params: any) => ({
                url: `/hostel-rents`,
                method: "GET",
                params,
            }),
            providesTags: ["hostel-rents"],
        }),
        getHostelRentById: builder.query({
            query: (id) => ({
                url: `/hostel-rents/${id}`,
                method: "GET",
            }),
            providesTags: ["hostel-rents"],
        }),
        createHostelRent: builder.mutation({
            query: (data) => ({
                url: `/hostel-rents`,
                method: "POST",
                data,
            }),
            invalidatesTags: ["hostel-rents"],
        }),
        updateHostelRent: builder.mutation({
            query: ({ id, data }) => ({
                url: `/hostel-rents/${id}`,
                method: "PATCH",
                data,
            }),
            invalidatesTags: ["hostel-rents"],
        }),
        deleteHostelRent: builder.mutation({
            query: (id) => ({
                url: `/hostel-rents/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["hostel-rents"],
        }),
        approveHostelRent: builder.mutation({
            query: ({ id, isApproved }) => ({
                url: `/hostel-rents/${id}/approve`,
                method: "PATCH",
                data: { isApproved },
            }),
            invalidatesTags: ["hostel-rents"],
        }),
    }),
    overrideExisting: true,
});

export const {
    useGetAllHostelRentsQuery,
    useGetHostelRentByIdQuery,
    useCreateHostelRentMutation,
    useUpdateHostelRentMutation,
    useDeleteHostelRentMutation,
    useApproveHostelRentMutation,
} = hostelRentApi;
