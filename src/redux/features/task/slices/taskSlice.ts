import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ITask } from '../../../../models/Task.model';
import { createTask, generateTaskImage, getAll, getById, removeTask, updateTask } from '../thunks/taskThunks';


interface PayloadType {
    task: ITask|null,
	tasks: ITask[]|[]
	message: string
}

interface TaskState {
    task: ITask|null;
    tasks: ITask[]|[];
    isLoading: boolean;
    status?: null;
    error: "",
    generated? : string | null
}

const initialState:TaskState = {
    task: null,
    tasks: [],
    isLoading: false,
    status: null,
    error: "",
    generated : ""
}



    
 
export const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        clearGanerated(state) {
            state.generated = ""
        }
    },
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
            state.error = payload?.message

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
            state.error = payload?.message

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
            state.error = payload?.message

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
            state.error = payload?.message

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
            state.error = payload?.message

        })
        builder.addCase(generateTaskImage.pending, (state) => {
            state.isLoading = true
            state.error = ""
        })
        builder.addCase(generateTaskImage.fulfilled, (state, { payload } : PayloadAction<PayloadType>) => {
            state.isLoading = false
            state.generated = payload.task?.img
            state.error = ""
        })
        builder.addCase(generateTaskImage.rejected, (state, { payload } : PayloadAction<any>) => {
            state.isLoading = false
            state.status = payload?.message
            state.error = payload?.message
        })
      },
    })

    export const { clearGanerated } = taskSlice.actions
export default taskSlice.reducer



