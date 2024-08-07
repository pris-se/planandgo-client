import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { API } from "../../../api";
import axios from "../../../utils/axios";
import { IMessage } from "../../../interfaces";

type KnownError = string;


export const createMessageFetch = createAsyncThunk(
    "messages/create-message",
    async (params: IMessage, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(API.createMessage, params);
            return data;
        } catch (error) {
            const err = error as AxiosError<KnownError>;
            return rejectWithValue(err?.response?.data);
        }
    }
);
export const getMessagesByChatIdFetch = createAsyncThunk(
    "messages/get-messages",
    async (chatId: string, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(API.getMessagesByChatId(chatId));
            return data;
        } catch (error) {
            const err = error as AxiosError<KnownError>;
            return rejectWithValue(err?.response?.data);
        }
    }
);
