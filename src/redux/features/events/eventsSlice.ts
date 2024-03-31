import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Event, User } from "../../../interfaces";
import { createEvent, getEvents } from "./eventsThunk";

interface PayloadType {
  event: Event | null;
  events: Event[] | [];
  isLoading: boolean;
  status: string | null;
  error: string,
}

interface EventsState {
  event: Event | null;
  events: Event[] | [];
  isLoading: boolean;
  error: string,
}

const initialState = {
  event: null,
  events: [],
  isLoading: false,
  error: "",

} as EventsState;



export const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    // create event
    builder.addCase(createEvent.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      createEvent.fulfilled,
      (state, { payload }: PayloadAction<PayloadType>) => {
        state.isLoading = false;
        state.event = payload?.event;
      }
    );
    builder.addCase(
      createEvent.rejected,
      (state, { payload }: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = payload;
      }
    );
    // get events
    builder.addCase(getEvents.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getEvents.fulfilled,
      (state, { payload }: PayloadAction<PayloadType>) => {
        state.isLoading = false;
        state.events = payload?.events;
      }
    );
    builder.addCase(
      getEvents.rejected,
      (state, { payload }: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = payload;
      }
    );

  },
});


export default eventSlice.reducer;
