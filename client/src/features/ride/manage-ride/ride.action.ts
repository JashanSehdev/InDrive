import api from "@/api/api";
import { SetRideOutput } from "@/app/ui/dashboard/dashboard";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const createRideAsync = createAsyncThunk(
    'ride/create',
    async(createRide : SetRideOutput, thunkApi) => {
        try {
            const response = await api.post("/rides", createRide);

            return response.data
 
        } catch(error: any) {
            return thunkApi.rejectWithValue(
                error?.response?.data || 'something went wrong'
            )
        }
    }
)

export const fetchRides = createAsyncThunk(
    'ride/create',
    async(_, thunkApi) => {
        try {
            const response = await api.get("/rides");

            return response.data
 
        } catch(error: any) {
            return thunkApi.rejectWithValue(
                error?.response?.data || 'something went wrong'
            )
        }
    }
)