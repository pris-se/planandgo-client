import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Task } from '../../../models/Task.model';
import axios from '../../../utils/axios'


interface PayloadType {
    task: Task|null,
	tasks: Task[]|[]
	message: string
}

interface AuthState {
    task: Task|null;
    tasks: Task[]|[];
    isLoading: boolean;
    status: string|null;
}

const initialState:AuthState = {
    task: null,
    tasks: [],
    isLoading: false,
    status: null,
}

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
export const getAll = createAsyncThunk(
    'task/getAll',
    async () => {
        try {
            const { data } = await axios.get('/api/tasks/')
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
            const { data } = await axios.get(`/api/tasks/${id}`)
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


    
 
export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createTask.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(createTask.fulfilled, (state, { payload } : PayloadAction<PayloadType>) => {
            state.isLoading = false
            state.tasks = payload?.tasks
        })
        builder.addCase(createTask.rejected, (state, { payload } : PayloadAction<any>) => {
            state.isLoading = false
            state.status = payload?.message
        })
        builder.addCase(getAll.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getAll.fulfilled, (state, { payload } : PayloadAction<PayloadType>) => {
            state.isLoading = false
            state.tasks = payload?.tasks
        })
        builder.addCase(getAll.rejected, (state, { payload } : PayloadAction<any>) => {
            state.isLoading = false
            state.status = payload?.message
        })
        builder.addCase(getById.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getById.fulfilled, (state, { payload } : PayloadAction<PayloadType>) => {
            state.isLoading = false
            state.task = payload?.task
        })
        builder.addCase(getById.rejected, (state, { payload } : PayloadAction<any>) => {
            state.isLoading = false
            state.status = payload?.message
        })
        builder.addCase(removeTask.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(removeTask.fulfilled, (state, { payload } : PayloadAction<PayloadType>) => {
            state.isLoading = false
            state.task = state.task
        })
        builder.addCase(removeTask.rejected, (state, { payload } : PayloadAction<any>) => {
            state.isLoading = false
            state.status = payload?.message
        })
        builder.addCase(updateTask.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(updateTask.fulfilled, (state, { payload } : PayloadAction<PayloadType>) => {
            state.isLoading = false
            state.task = payload.task
        })
        builder.addCase(updateTask.rejected, (state, { payload } : PayloadAction<any>) => {
            state.isLoading = false
            state.status = payload?.message
        })
      },
    })


export default taskSlice.reducer



