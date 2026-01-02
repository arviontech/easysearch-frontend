import { baseApi } from "../../api/baseApi";



const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: () => ({
        url: '/categories/get-all-category',
        method: 'GET',
      }),
      providesTags: ["categories"],
    })
  })
})



export const { useGetAllCategoriesQuery } = categoryApi
