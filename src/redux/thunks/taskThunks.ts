import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { AxiosError } from "axios";
import { ITask } from "../../models/Task.model";

type KnownError = string
export interface SearchParams {
  label?: string;
  title?: string;
}

export const createTask = createAsyncThunk(
  "task/createTask",
  async (params: ITask, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/tasks/create", params);
      return data;
    } catch (error) {
      const err = error as AxiosError<KnownError>;
      return rejectWithValue(err?.response?.data);
    }
  }
);
export const updateTask = createAsyncThunk(
  "task/updateTask",
  async (params: ITask, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `/api/tasks/${params._id}`,
        params
      );
      return data;
    } catch (error) {
      const err = error as AxiosError<KnownError>;
      return rejectWithValue(err?.response?.data);
    }
  }
);
export const getAll = createAsyncThunk(
  "task/getAll",
  async (query: string = "", { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/tasks${query}`);
      return data;
    } catch (error) {
      const err = error as AxiosError<KnownError>;
      return rejectWithValue(err?.response?.data);
    }
  }
);
export const getMy = createAsyncThunk(
  "task/getMy",
  async (query: string = "", { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/tasks/my${query}`);
      return data;
    } catch (error) {
      const err = error as AxiosError<KnownError>;
      return rejectWithValue(err?.response?.data);
    }
  }
);
export const getById = createAsyncThunk(
  "task/getById",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/tasks/id/${id}`);
      return data;
    } catch (error) {
      const err = error as AxiosError<KnownError>;
      return rejectWithValue(err?.response?.data);
    }
  }
);
export const getByIds = createAsyncThunk(
  "task/getByIds",
  async (ids: string[] | string | URLSearchParams, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/tasks/ids/${ids}`);
      return data;
    } catch (error) {
      const err = error as AxiosError<KnownError>;
      return rejectWithValue(err?.response?.data);
    }
  }
);
export const removeTask = createAsyncThunk(
  "task/removeTask",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/api/tasks/${id}`);
      return data;
    } catch (error) {
      const err = error as AxiosError<KnownError>;
      return rejectWithValue(err?.response?.data);
    }
  }
);
