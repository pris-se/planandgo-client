import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { generateTaskImage } from '../thunks/aiThunk';


interface PayloadType {
    image: string,
	prompt: string
}

interface AiState {
    image: string
    prompt: string
    isLoading: boolean;
    status?: string;
    error: "",
}

const initialState:AiState = {
    image: '',
    isLoading: false,
    error: '',
    prompt: ''
}

export const aiSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(generateTaskImage.pending, (state) => {
            state.isLoading = true
            state.error = ""
        })
        builder.addCase(generateTaskImage.fulfilled, (state, { payload } : PayloadAction<PayloadType>) => {
            state.isLoading = false
            state.image = payload.image
            state.prompt = payload.prompt
            state.error = ""
        })
        builder.addCase(generateTaskImage.rejected, (state, { payload } : PayloadAction<any>) => {
            state.isLoading = false
            state.error = payload?.message
        })
      },
    })

    export const {  } = aiSlice.actions
export default aiSlice.reducer



