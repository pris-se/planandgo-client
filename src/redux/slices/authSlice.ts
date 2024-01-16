import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../models/User.model";
import { RootState } from "../store";
import { registration, login, getMe, resetPassword, getAll, getUser } from "../thunks/authThunk";

interface PayloadType {
  me: User;
  user: User;
  users: User[];
  token: string;
  message: string;
}

interface AuthState { 
  me: User | null;
  user: User | null;
  users: User[] | [];
  token: string | null;
  isLoading: boolean;
  status: string | null;
  password?: string | null;
}

const initialState = {
  me: null,
  user: null,
  users: [],
  token: null,
  isLoading: false,
  status: null,
  password: null,
} as AuthState;



export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state: AuthState) => {
      state.user = null;
      state.me = null;
      state.token = null;
      state.isLoading = false;
      state.status = null;
      window.localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    // Registration
    builder.addCase(registration.pending, (state) => {
      state.isLoading = true;
      state.status = null;
    });
    builder.addCase(
      registration.fulfilled,
      (state, { payload }: PayloadAction<PayloadType>) => {
        state.isLoading = false;
        state.me = payload?.user;
        state.status = payload?.message;
        state.token = payload?.token;
      }
    );
    builder.addCase(
      registration.rejected,
      (state, { payload }: PayloadAction<any>) => {
        state.isLoading = false;
        state.status = payload?.message;
      }
    );
    //Login
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
      state.status = null;
    });
    builder.addCase(
      login.fulfilled,
      (state, { payload }: PayloadAction<PayloadType>) => {
        state.isLoading = false;
        state.me = payload?.user;
        state.status = payload?.message;
        state.token = payload?.token;
      }
    );
    builder.addCase(
      login.rejected,
      (state, { payload }: PayloadAction<any>) => {
        state.isLoading = false;
        state.status = payload?.message;
      }
    );
    //Get me
    builder.addCase(getMe.pending, (state) => {
      state.isLoading = true;
      state.status = null;
    });
    builder.addCase(
      getMe.fulfilled,
      (state, { payload }: PayloadAction<PayloadType>) => {
        state.isLoading = false;
        state.me = payload?.user;
        state.status = payload?.message;
        state.token = payload?.token;
      }
    );
    builder.addCase(
      getMe.rejected,
      (state, { payload }: PayloadAction<any>) => {
        state.isLoading = false;
        state.status = payload?.message;
      }
    );
    //Get User
    builder.addCase(getUser.pending, (state) => {
      state.isLoading = true;
      state.status = null;
    });
    builder.addCase(
      getUser.fulfilled,
      (state, { payload }: PayloadAction<PayloadType>) => {
        state.isLoading = false;
        state.user = payload?.user;
        state.status = payload?.message;
      }
    );
    builder.addCase(
      getUser.rejected,
      (state, { payload }: PayloadAction<any>) => {
        state.isLoading = false;
        state.status = payload?.message;
      }
    );
    //Get all
    builder.addCase(getAll.pending, (state) => {
      state.isLoading = true;
      state.status = null;
    });
    builder.addCase(
      getAll.fulfilled,
      (state, { payload }: PayloadAction<PayloadType>) => {
        state.isLoading = false;
        state.users = payload?.users;
        state.status = payload?.message;
      }
    );
    builder.addCase(
      getAll.rejected,
      (state, { payload }: PayloadAction<any>) => {
        state.isLoading = false;
        state.status = payload?.message;
      }
    );
    //reset
    builder.addCase(resetPassword.pending, (state) => {
      state.isLoading = true;
      state.status = null;
    });
    builder.addCase(
        resetPassword.fulfilled,
      (state, { payload }: PayloadAction<PayloadType>) => {
        state.isLoading = false;
        state.status = payload?.message;
        state.password = payload?.token;
      }
    );
    builder.addCase(
        resetPassword.rejected,
      (state, { payload }: PayloadAction<any>) => {
        state.isLoading = false;
        state.status = payload?.message;
      }
    );
  },
});


export const checkIsAuth = (state: RootState) => Boolean(state.auth.token);

export const { logout } = authSlice.actions;
export default authSlice.reducer;
