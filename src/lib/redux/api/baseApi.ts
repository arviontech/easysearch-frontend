import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import axiosBaseQuery from '../../../helper/axios/axiosBaseQuery'


export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: axiosBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api' }),
  endpoints: (build) => ({}),
  tagTypes: ["auth", "categories"]
})

