import api from "@/api/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { CreateOffer } from "./offer.type";

export const createOfferAsync = createAsyncThunk(
    'offer/create',
    async(createOffer : CreateOffer, thunkApi) => {
        try {
            const response = await api.post("/offers", createOffer);
            return response.data
 
        } catch(error: any) {
            return thunkApi.rejectWithValue(
                error?.response?.data || 'something went wrong'
            )
        }
    }
)

export const fetchOfferAsync = createAsyncThunk(
    'offer/fetch',
    async(rideId : number, thunkApi) =>{
        try{
            const respose = await api.get(`/offers/ride/${rideId}`);
            return respose.data

        } catch(error : any) {
            return thunkApi.rejectWithValue(
                error.response.data || 'something went wrong' 
            )
        }
    }
)