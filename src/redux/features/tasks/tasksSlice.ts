import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../../../interfaces';
import { getByIds, getTasks } from './tasksThunk';


interface PayloadType {
    tasks: Task[] | []
    message: string
}

interface TaskState {
    tasks: Task[] | [];
    isLoading: boolean;
    status?: string;
    error: string,
}

const initialState: TaskState = {
    tasks: [],
    isLoading: false,
    status: "",
    error: "",
}

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        // getTasks
        builder.addCase(getTasks.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getTasks.fulfilled, (state, { payload }: PayloadAction<PayloadType>) => {
            state.isLoading = false
            state.tasks = payload?.tasks
        })
        builder.addCase(getTasks.rejected, (state, { payload }: PayloadAction<any>) => {
            state.isLoading = false
            state.status = payload?.message
            state.error = payload?.message
        })
        // getByIds
        builder.addCase(getByIds.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getByIds.fulfilled, (state, { payload }: PayloadAction<PayloadType>) => {
            state.isLoading = false
            state.tasks = payload?.tasks
        })
        builder.addCase(getByIds.rejected, (state, { payload }: PayloadAction<any>) => {
            state.isLoading = false
            state.status = payload?.message
            state.error = payload?.message

        })
    },
})

export const { } = tasksSlice.actions
export default tasksSlice.reducer



