import { baseApi } from "../../api/baseApi";


const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registration: builder.mutation({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        data: data
      }),
      invalidatesTags: ["auth"]
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        data: data
      }),
      invalidatesTags: ["auth"]
    })
  })
})


export const { useRegistrationMutation, useLoginMutation } = authApi