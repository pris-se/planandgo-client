import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { API } from "../../../api";
import axios from "../../../utils/axios";

type KnownError = string;

export const registration = createAsyncThunk(
    "profile/registration",
    async (params: FormData, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(API.register, params);
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
    "profile/login",
    async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(API.login, {
                email,
                password,
            });
            if (data.token) {
                window.localStorage.setItem("token", data.token);
                window.localStorage.setItem("timeStamp", Date.now().toString());
            }
            return data;
        } catch (error) {
            const err = error as AxiosError<KnownError>;
            return rejectWithValue(err?.response?.data);
        }
    }
);
export const getMe = createAsyncThunk(
    "profile/me",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(API.getProfile);
            return data;
        } catch (error) {
            const err = error as AxiosError<KnownError>;
            return rejectWithValue(err?.response?.data);
        }
    }
);
export const resetPassword = createAsyncThunk(
    "profile/reset",
    async (email: string, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(API.resetPassword, {
                email,
            });
            if (data.token) {
                window.localStorage.setItem("token", data.token);
                window.localStorage.setItem("timeStamp", Date.now().toString());
            }
            return data;
        } catch (error) {
            const err = error as AxiosError<KnownError>;
            return rejectWithValue(err?.response?.data);
        }
    }
);
export const updateUser = createAsyncThunk(
    "profile/updateUser",
    async ({ formData, _id }: { formData: FormData, _id: string }, { rejectWithValue }) => {

        try {
            const { data } = await axios.put(API.updateProfile, formData);
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