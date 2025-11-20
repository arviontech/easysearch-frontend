import { baseApi } from "../../api/baseApi";


const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registration: builder.mutation({
      query: (data) => ({
        url: "/auth/registraton",
        method: "POST",
        data: data
      }),
      invalidatesTags: ["auth"]
    })
  })
})


export const { useRegistrationMutation } = authApi