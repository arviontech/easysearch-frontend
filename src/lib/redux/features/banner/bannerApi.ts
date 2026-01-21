import { baseApi } from "../../api/baseApi";

const bannerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBanners: builder.query({
      query: (params: any) => ({
        url: `/banner`,
        method: 'GET',
        params
      }),
      providesTags: ["banners"],
    }),
    getActiveBanners: builder.query({
      query: () => ({
        url: '/banner/active',
        method: 'GET',
      }),
      providesTags: ["banners"],
    }),
    getBannerById: builder.query({
      query: (id) => ({
        url: `/banner/${id}`,
        method: 'GET',
      }),
      providesTags: ["banners"],
    }),
    createBanner: builder.mutation({
      query: (data) => ({
        url: `/banner`,
        method: 'POST',
        data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: ["banners"],
    }),
    updateBanner: builder.mutation({
      query: ({ id, data }) => ({
        url: `/banner/${id}`,
        method: 'PUT',
        data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: ["banners"],
    }),
    deleteBanner: builder.mutation({
      query: (id) => ({
        url: `/banner/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ["banners"],
    }),
  }),
  overrideExisting: true,
})

export const {
  useGetAllBannersQuery,
  useGetActiveBannersQuery,
  useGetBannerByIdQuery,
  useCreateBannerMutation,
  useUpdateBannerMutation,
  useDeleteBannerMutation
} = bannerApi