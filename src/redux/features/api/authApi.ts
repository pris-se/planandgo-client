import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Task } from "../../../models/Task.model";
import { User } from "../../../models/User.model";

export const userApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
     baseUrl: process.env.REACT_APP_BASE_API_URL + "auth/" 
    }),
  endpoints: (builder) => ({
    getMe: builder.query<User, void>({
      query: () => "/me",
    }),
  }),
});

export const { useGetMeQuery } = userApi;
