import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../../models/User.model";
import axios from "../../../utils/axios";
import { RootState } from "../../store";

interface PayloadType {
  user: User;
  token: string;
  message: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  status: string | null;
  password?: string | null;
}

const initialState = {
  user: null,
  token: null,
  isLoading: false,
  status: null,
  password: null,
} as AuthState;

export const registration = createAsyncThunk(
  "auth/registration",
  async (params: FormData) => {
    try {
      console.log(params);

      const { data } = await axios.post("/api/auth/registration", params);
      if (data.token) {
        window.localStorage.setItem("token", data.token);
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }: User) => {
    try {
      const { data } = await axios.post("/api/auth/login", {
        email,
        password,
      });
      if (data.token) {
        window.localStorage.setItem("token", data.token);
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getMe = createAsyncThunk("auth/me", async () => {
  try {
    const { data } = await axios.get("/api/auth/me");
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const resetPassword = createAsyncThunk(
  "auth/reset",
  async (email: string) => {
    try {
      const { data } = await axios.post("/api/auth/reset", {
        email,
      });
      // if(data.token) {
      //     window.localStorage.setItem('token', data.token)
      // }
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state: AuthState) => {
      state.user = null;
      state.token = null;
      state.isLoading = false;
      state.status = null;
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
        state.user = payload?.user;
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
        state.user = payload?.user;
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
        state.user = payload?.user;
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
