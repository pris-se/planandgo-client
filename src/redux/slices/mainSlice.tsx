import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";


interface MainState {
    isDarkMode: boolean;
}

const initialState = {
    isDarkMode: window.localStorage.getItem("isDarkMode") == "true" || window.matchMedia('(prefers-color-scheme: dark)').matches
} as MainState;



export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setDarkMode: (state: MainState, { payload }) => {
        state.isDarkMode = payload
        window.localStorage.setItem("isDarkMode", payload.toString())
        payload ? document.querySelector("body")?.classList.add("theme-dark")
        : document.querySelector("body")?.classList.remove("theme-dark")
    },
  },
  extraReducers: (builder) => {
  },
});


export const isDarkMode = (state: RootState) => Boolean(state.main.isDarkMode);

export const { setDarkMode } = mainSlice.actions;
export default mainSlice.reducer;
