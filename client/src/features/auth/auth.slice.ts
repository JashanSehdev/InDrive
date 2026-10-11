import { User } from "@/type/user.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getMeAsync,
  loginUserAsync,
  registerUserAsync,
} from "./manage-auth/auth.action";
import { enqueueSnackbar } from "notistack";

type InitialState = {
  user: User | null;
};

const initialState: InitialState = {
  user: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.user = action.payload
        enqueueSnackbar({ message: "Login SuccessFul", variant: "success" });
      })
      .addCase(registerUserAsync.fulfilled, (state, action) => {
        state.user = action.payload
        enqueueSnackbar({
          message: "registration SuccessFul",
          variant: "success",
        });
      })
      .addCase(getMeAsync.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(loginUserAsync.rejected, (state, action: PayloadAction<any>) => {
        if (action.payload?.code === "NOT_FOUND") {
          enqueueSnackbar({ message: "User Not Found", variant: "error" });
          return;
        }
        enqueueSnackbar({ message: "Login Failed", variant: "error" });
      })
      .addCase(
        registerUserAsync.rejected,
        (state, action: PayloadAction<any>) => {
          if (action.payload?.code === "ALREADY_EXIST") {
            enqueueSnackbar({ message: "User Not Found", variant: "error" });
            return;
          }
          enqueueSnackbar({ message: "Registration Failed", variant: "error" });
        },
      )
      .addCase(getMeAsync.rejected, (state, action) => {
        enqueueSnackbar('something went wrong')
      })
  },
});

export default authSlice.reducer;
