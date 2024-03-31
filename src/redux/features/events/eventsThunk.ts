import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import axios from "../../../utils/axios";
import { API } from "../../../api";

type KnownError = string;

export const createEvent = createAsyncThunk(
    "events/createEvent",
    async (formData: FormData, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(
                API.createEvent,
                formData
            );
            return data;
        } catch (error) {
            const err = error as AxiosError<KnownError>;
            return rejectWithValue(err?.response?.data);
        }
    }
);
export const getEvents = createAsyncThunk(
    "events/getEvent",
    async (query: string | undefined = "", { rejectWithValue }) => {
        try {
            const { data } = await axios.get(
                API.getEvents(query),
            );
            return data;
        } catch (error) {
            const err = error as AxiosError<KnownError>;
            return rejectWithValue(err?.response?.data);
        }
    }
);

