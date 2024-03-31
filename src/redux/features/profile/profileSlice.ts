import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../../interfaces";
import { getMe, login, registration, resetPassword, updateUser } from "./profileThunk";

interface PayloadType {
	user: User;
	token: string;
	message: string;
}

interface UserState {
	me: User | null;
	token: string | null;
	isLoading: boolean;
	status: string | null;
	password?: string | null;
	error: string,

}

const initialState = {
	me: null,
	token: null,
	isLoading: false,
	status: null,
	password: null,
	error: "",

} as UserState;



export const profileSlice = createSlice({
	name: "profile",
	initialState,
	reducers: {
		logout: (state: UserState) => {
			state.me = null;
			state.token = null;
			state.isLoading = false;
			state.status = null;
			window.localStorage.removeItem("token");
			window.localStorage.removeItem("tokenStamp");
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
		//reset
		builder.addCase(resetPassword.pending, (state) => {
			state.isLoading = true;
			state.status = null;
		});
		builder.addCase(
			resetPassword.fulfilled,
			(state, { payload }: PayloadAction<PayloadType>) => {
				state.isLoading = false;
				state.me = payload?.user;
				state.status = payload?.message;
				state.token = payload?.token;
			}
		);
		builder.addCase(
			resetPassword.rejected,
			(state, { payload }: PayloadAction<any>) => {
				state.isLoading = false;
				state.status = payload?.message;
			}
		);
		//update
		builder.addCase(updateUser.pending, (state) => {
			state.isLoading = true
		})
		builder.addCase(updateUser.fulfilled, (state, { payload }: PayloadAction<PayloadType>) => {
			state.isLoading = false
			state.me = payload.user
		})
		builder.addCase(updateUser.rejected, (state, { payload }: PayloadAction<any>) => {
			state.isLoading = false
			state.status = payload?.message
			state.error = payload?.message
		})
	},
});

// export const checkIsAuth = (state: RootState) => Boolean(state.auth.token);
export const checkIsAuth = () => {
	const timeStamp = window.localStorage.getItem("timeStamp");
	const token = window.localStorage.getItem("token");
	const isValid = timeStamp && Number(timeStamp) - Date.now() < 100000;

	return Boolean(token) && isValid
};

export const { logout } = profileSlice.actions;
export default profileSlice.reducer;
