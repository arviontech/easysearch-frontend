import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: (params) => ({
                url: "/users",
                method: "GET",
                params: params,
            }),
            providesTags: ["users"],
        }),
        updateUserStatus: builder.mutation({
            query: ({ id, status }) => ({
                url: `/users/${id}/status`,
                method: "PATCH",
                data: { status },
            }),
            invalidatesTags: ["users"],
        }),
        updateUser: builder.mutation({
            query: ({ id, data }) => ({
                url: `/users/${id}`,
                method: "PATCH",
                data: data,
            }),
            invalidatesTags: ["users"],
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/users/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["users"],
        }),
    }),
});

export const {
    useGetUsersQuery,
    useUpdateUserStatusMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = userApi;
