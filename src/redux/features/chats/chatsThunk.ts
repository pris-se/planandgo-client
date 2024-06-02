import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { API } from "../../../api";
import axios from "../../../utils/axios";

type KnownError = string;

interface ChatCreationBody {
    participantId: string
    title: string
    type?: string
}

export const createChatFetch = createAsyncThunk(
    "chats/create-chat",
    async (params: ChatCreationBody, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(API.createChat, params);
            return data;
        } catch (error) {
            const err = error as AxiosError<KnownError>;
            return rejectWithValue(err?.response?.data);
        }
    }
);
export const getChatsFetch = createAsyncThunk(
    "chats/get-chats",
    async (params, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(API.getChats);
            return data;
        } catch (error) {
            const err = error as AxiosError<KnownError>;
            return rejectWithValue(err?.response?.data);
        }
    }
);
