import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Task } from "../../../models/Task.model";

export const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_API_URL + "tasks/",
  }),
  endpoints: (builder) => ({
    getAllTasks: builder.query<Task[], void>({
      query: () => "/",
    }),
  }),
});

export const { useGetAllTasksQuery } = taskApi;