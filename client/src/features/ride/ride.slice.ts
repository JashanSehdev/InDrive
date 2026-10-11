import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "notistack";
import { createRideAsync } from "./manage-ride/ride.action";
import { Ride } from "@/type/ride.type";

type InitialState = {
  ride: Ride | null;
};

const initialState: InitialState = {
  ride: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createRideAsync.fulfilled, (state, action) => {
        state.ride = action.payload;
        enqueueSnackbar({ message: "Ride created", variant: "error" });
      })

      .addCase(createRideAsync.rejected, (state, action) => {
        enqueueSnackbar({ message: "Something went wrong", variant: "error" });
      });
  },
});

export default authSlice.reducer;
