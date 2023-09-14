import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { AxiosError } from "axios";

type KnownError = string

export const generateTaskImage = createAsyncThunk(
  "task/generateTaskImage",

  async (prompt: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/generate", { prompt});
      return data;
    } catch (error) {
      const err = error as AxiosError<KnownError>;
      return rejectWithValue(err?.response?.data);
    }
  }
);
