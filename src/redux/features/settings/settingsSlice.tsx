import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";


interface SettingsState {
    isDarkMode: boolean;
    isListView: boolean,
}

const initialState = {
    isDarkMode: window.localStorage.getItem("isDarkMode") == "true" || window.matchMedia('(prefers-color-scheme: dark)').matches,
    isListView: window.localStorage.getItem("isDarkMode") == "true",
  } as SettingsState;



export const settingsSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setDarkMode: (state: SettingsState, { payload }) => {
        state.isDarkMode = payload
        window.localStorage.setItem("isDarkMode", payload.toString())
        payload ? document.querySelector("body")?.classList.add("theme-dark")
        : document.querySelector("body")?.classList.remove("theme-dark")
    },
    setIsListView: (state: SettingsState, { payload }) => {
        state.isListView = payload
        window.localStorage.setItem("isListView", payload.toString())
    },
  },
  extraReducers: (builder) => {
  },
});


export const isDarkMode = (state: RootState) => Boolean(state.settings.isDarkMode);
export const isListView = (state: RootState) => Boolean(state.settings.isListView);

export const { setDarkMode, setIsListView } = settingsSlice.actions;
export default settingsSlice.reducer;
