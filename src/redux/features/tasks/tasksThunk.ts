import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import axios from "../../../utils/axios";
import { API } from "../../../api";

type KnownError = string
export interface SearchParams {
  label?: string;
  title?: string;
}

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        API.createTask,
        formData
      );
      return data;
    } catch (error) {
      const err = error as AxiosError<KnownError>;
      return rejectWithValue(err?.response?.data);
    }
  }
);
export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ formData, id }: { formData: FormData, id: string }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        API.updateTask(id),
        formData
      );
      return data;
    } catch (error) {
      const err = error as AxiosError<KnownError>;
      return rejectWithValue(err?.response?.data);
    }
  }
);
export const getTasks = createAsyncThunk(
  "tasks/getTasks",
  async (query: string = "", { rejectWithValue }) => {
    try {
      const { data } = await axios.get(API.getTasks(query));
      return data;
    } catch (error) {
      const err = error as AxiosError<KnownError>;
      return rejectWithValue(err?.response?.data);
    }
  }
);
export const getById = createAsyncThunk(
  "tasks/getById",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(API.getTaskById(id));
      return data;
    } catch (error) {
      const err = error as AxiosError<KnownError>;
      return rejectWithValue(err?.response?.data);
    }
  }
);
export const getByIds = createAsyncThunk(
  "tasks/getByIds",
  async (ids: string[] | string | URLSearchParams, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(API.getTaskByIds(ids));
      return data;
    } catch (error) {
      const err = error as AxiosError<KnownError>;
      return rejectWithValue(err?.response?.data);
    }
  }
);
export const removeTask = createAsyncThunk(
  "tasks/removeTask",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(API.deleteTask(id));
      return data;
    } catch (error) {
      const err = error as AxiosError<KnownError>;
      return rejectWithValue(err?.response?.data);
    }
  }
);
