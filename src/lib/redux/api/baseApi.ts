import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import axiosBaseQuery from '../../../helper/axios/axiosBaseQuery'


export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: axiosBaseQuery({ baseUrl: 'https://easysearch-server.vercel.app/api/v1' }),
  endpoints: (build) => ({}),
  tagTypes: ["auth"]
})

