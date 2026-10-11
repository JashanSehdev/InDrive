
import api from "@/api/api";
import { LoginInputs } from "@/app/ui/login/login.type";
import { DispatchSignupInput } from "@/app/ui/signup/signup.type";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const loginUserAsync = createAsyncThunk(
    'auth/login',
    async(loginuser : LoginInputs, thunkApi) =>{
        try {
            const result = await api.post("/auth/login", loginuser)
            const response = thunkApi.dispatch(getMeAsync()).unwrap();
            return response
        } catch(error : any) {
            return thunkApi.rejectWithValue(
                error?.response?.data || 'something went wrong'
            )
        }
    }
)

export const registerUserAsync = createAsyncThunk(
    'auth/register',
    async(signupDate : DispatchSignupInput, thunkApi) =>{
        try {
            const result = await api.post("/auth/register", signupDate)
            const response = thunkApi.dispatch(getMeAsync()).unwrap();
            return response
        } catch(error : any) {
            return thunkApi.rejectWithValue(
                error?.response?.data || 'something went wrong'
            )
        }
    }
)

export const getMeAsync = createAsyncThunk(
    'auth/me',
    async(_, thunkApi) =>{
        try {
            const response = await api.get("/auth/me")
            return response.data
        } catch(error : any) {
            return thunkApi.rejectWithValue(
                error?.response?.data || 'something went wrong'
            )
        }
    }
)