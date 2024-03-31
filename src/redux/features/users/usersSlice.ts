import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../../interfaces";
import { getUsers, getUser } from "./usersThunk";

interface PayloadType {
  me: User;
  user: User;
  users: User[];
  token: string;
  message: string;
}

interface UserState {
  user: User | null;
  users: User[] | [];
  isLoading: boolean;
  status: string | null;
  password?: string | null;
  error: string,

}

const initialState = {
  user: null,
  users: [],
  isLoading: false,
  status: null,
  password: null,
  error: "",

} as UserState;



export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
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
    builder.addCase(getUsers.pending, (state) => {
      state.isLoading = true;
      state.status = null;
    });
    builder.addCase(
      getUsers.fulfilled,
      (state, { payload }: PayloadAction<PayloadType>) => {
        state.isLoading = false;
        state.users = payload?.users;
        state.status = payload?.message;
      }
    );
    builder.addCase(
      getUsers.rejected,
      (state, { payload }: PayloadAction<any>) => {
        state.isLoading = false;
        state.status = payload?.message;
      }
    );
  },
});


export default userSlice.reducer;
