import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../../utils/axios";

export const createTask = createAsyncThunk(
    'task/createTask',
    async (params : FormData) => {
        try {
            const { data } = await axios.post('/api/tasks/create', params)
            return data
        } catch (error) {
            console.log(error);
        }
    }
)
export const updateTask = createAsyncThunk(
    'task/updateTask',
    async (params:FormData) => {        
        try { 
            const { data } = await axios.put(`/api/tasks/${params.get('id')}`, params)
            return data
        } catch (error) {
            console.log(error);
        }
    }
)

export interface SearchParams {
    label?: string,
    title?: string,
}  
export const getAll = createAsyncThunk(
    'task/getAll',
    async (query?:string) => {
        try {
            const { data } = await axios.get(`/api/tasks${query}`)
            return data
        } catch (error) {
            console.log(error);
        }
    }
)
export const getById = createAsyncThunk(
    'task/getById',
    async (id:string) => {
        try {
            const { data } = await axios.get(`/api/tasks/id/${id}`)
            return data
        } catch (error) {
            console.log(error);
        }
    }
)
export const getByIds = createAsyncThunk(
    'task/getByIds',
    async (ids: string[]|string|URLSearchParams) => {
        try {
            const { data } = await axios.get(`/api/tasks/ids/${ids}`)
            return data
        } catch (error) {
            console.log(error);
        }
    }
)
export const removeTask = createAsyncThunk(
    'task/removeTask',
    async (id:string) => {
        try {
            const { data } = await axios.delete(`/api/tasks/${id}`)
            return data
        } catch (error) {
            console.log(error);
        }
    }
)

export const generateTaskImage = createAsyncThunk(
    'task/generateTaskImage',

    async (params : FormData) => {
        try {
            const { data } = await axios.post('/api/generate', params)
            return data
        } catch (error) {
            console.log(error);
        }
    }
)