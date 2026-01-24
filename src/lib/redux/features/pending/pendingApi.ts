import { baseApi } from "../../api/baseApi";

const pendingApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getPendingItems: builder.query({
            query: (params: any) => ({
                url: `/pending`,
                method: "GET",
                params,
            }),
            providesTags: ["pending"],
        }),
        approvePendingItem: builder.mutation({
            query: (data: { type: string; id: string }) => ({
                url: `/pending/approve`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["pending", "house-rents", "hostel-rents", "food", "tourisms", "blogs", "caterings"],
        }),
        rejectPendingItem: builder.mutation({
            query: (data: { type: string; id: string }) => ({
                url: `/pending/reject`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["pending", "house-rents", "hostel-rents", "food", "tourisms", "blogs", "caterings"],
        }),
    }),
    overrideExisting: true,
});

export const {
    useGetPendingItemsQuery,
    useApprovePendingItemMutation,
    useRejectPendingItemMutation,
} = pendingApi;
