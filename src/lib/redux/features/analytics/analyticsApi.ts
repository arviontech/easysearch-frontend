import { baseApi } from '../../api/baseApi';

export const analyticsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAnalyticsSummary: builder.query({
            query: () => ({
                url: '/analytics/summary',
                method: 'GET',
            }),
        }),
        getListingsStats: builder.query({
            query: () => ({
                url: '/analytics/listings',
                method: 'GET',
            }),
        }),
        getUserStats: builder.query({
            query: () => ({
                url: '/analytics/users',
                method: 'GET',
            }),
        }),
    }),
});

export const {
    useGetAnalyticsSummaryQuery,
    useGetListingsStatsQuery,
    useGetUserStatsQuery,
} = analyticsApi;
