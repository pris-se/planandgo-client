import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Task } from '../../../../models/Task.model';
import { createTask, getAll, getById, removeTask, updateTask } from '../thunks/taskThunks';


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



