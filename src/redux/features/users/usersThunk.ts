import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import axios from "../../../utils/axios";
import { API } from "../../../api";

type KnownError = string;

export const getUser = createAsyncThunk(
    "users/getUser",
    async (id: string, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(API.getUserById(id));
            return data;
        } catch (error) {
            const err = error as AxiosError<KnownError>;
            return rejectWithValue(err?.response?.data);
        }
    }
);
export const getUsers = createAsyncThunk(
    "users/getUsers",
    async (query: string | undefined = "", { rejectWithValue }) => {
        try {
            const { data } = await axios.get(API.getUsers(query));
            return data;
        } catch (error) {
            const err = error as AxiosError<KnownError>;
            return rejectWithValue(err?.response?.data);
        }
    }
);
