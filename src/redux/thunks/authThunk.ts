import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { User } from "../../models/User.model";
import { AxiosError } from "axios";

type KnownError = string;

export const registration = createAsyncThunk(
  "auth/registration",
  async (params: FormData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/auth/registration", params);
      if (data.token) {
        window.localStorage.setItem("token", data.token);
      }
      return data;
    } catch (error) {
      const err = error as AxiosError<KnownError>;
      return rejectWithValue(err?.response?.data);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }: User, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/auth/login", {
        email,
        password,
      });
      if (data.token) {
        window.localStorage.setItem("token", data.token);
      }
      return data;
    } catch (error) {
      const err = error as AxiosError<KnownError>;
      return rejectWithValue(err?.response?.data);
    }
  }
);
export const getMe = createAsyncThunk(
  "auth/me",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/auth/me");
      return data;
    } catch (error) {
      const err = error as AxiosError<KnownError>;
      return rejectWithValue(err?.response?.data);
    }
  }
);
export const getAll = createAsyncThunk(
  "auth/all",
  async (query:string = "", { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/auth/all${query}`);
      return data;
    } catch (error) {
      const err = error as AxiosError<KnownError>;
      return rejectWithValue(err?.response?.data);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/reset",
  async (email: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/auth/reset", {
        email,
      });
      return data;
    } catch (error) {
      const err = error as AxiosError<KnownError>;
      return rejectWithValue(err?.response?.data);
    }
  }
);

export const assignTask = createAsyncThunk(
  "auth/assignTask",
  async (params: FormData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/auth/assignTask", params);
      return data;
    } catch (error) {
      const err = error as AxiosError<KnownError>;
      return rejectWithValue(err?.response?.data);
    }
  }
);
