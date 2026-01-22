import { baseApi } from "../../api/baseApi";

const settingsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getSettings: builder.query({
            query: () => ({
                url: "/settings",
                method: "GET",
            }),
            providesTags: ["settings"],
        }),
        getPublicSettings: builder.query({
            query: () => ({
                url: "/settings/public",
                method: "GET",
            }),
            providesTags: ["settings"],
        }),
        updateSettings: builder.mutation({
            query: (data) => ({
                url: "/settings",
                method: "PATCH",
                data,
            }),
            invalidatesTags: ["settings"],
        }),
    }),
});

export const { useGetSettingsQuery, useGetPublicSettingsQuery, useUpdateSettingsMutation } = settingsApi;
