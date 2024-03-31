import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../../../interfaces';
import { createTask, getById, removeTask, updateTask } from './tasksThunk';


interface PayloadType {
    task: Task | null,
    message: string
}

interface TaskState {
    task: Task | null;
    isLoading: boolean;
    status?: string;
    error: string,
}

const initialState = {
    task: null,
    isLoading: false,
    status: "",
    error: "",
} as TaskState

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        // createTask
        builder.addCase(createTask.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(createTask.fulfilled, (state, { payload }: PayloadAction<PayloadType>) => {
            state.isLoading = false
            state.task = payload?.task
        })
        builder.addCase(createTask.rejected, (state, { payload }: PayloadAction<any>) => {
            state.isLoading = false
            state.status = payload?.message
            state.error = payload?.message

        })
        // getById
        builder.addCase(getById.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getById.fulfilled, (state, { payload }: PayloadAction<PayloadType>) => {
            state.isLoading = false
            state.task = payload?.task
        })
        builder.addCase(getById.rejected, (state, { payload }: PayloadAction<any>) => {
            state.isLoading = false
            state.status = payload?.message
            state.error = payload?.message

        })
        // removeTask
        builder.addCase(removeTask.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(removeTask.fulfilled, (state, { payload }: PayloadAction<PayloadType>) => {
            state.isLoading = false
            state.task = payload.task
            state.status = payload?.message
        })
        builder.addCase(removeTask.rejected, (state, { payload }: PayloadAction<any>) => {
            state.isLoading = false
            state.status = payload?.message
            state.error = payload?.message

        })
        // updateTask
        builder.addCase(updateTask.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(updateTask.fulfilled, (state, { payload }: PayloadAction<PayloadType>) => {
            state.isLoading = false
            state.task = payload.task
        })
        builder.addCase(updateTask.rejected, (state, { payload }: PayloadAction<any>) => {
            state.isLoading = false
            state.status = payload?.message
            state.error = payload?.message
        })
    },
})

export const { } = taskSlice.actions
export default taskSlice.reducer



