import { Box, Stack, Typography } from "@mui/material";
import RideRequestDashboard from "./ride-card/ride-request-card";
import { toRideRequest } from "./ride-to-rideRequest";
import { useDriverSocket } from "@/hooks/use-driver-socket";
import { useEffect } from "react";
import { fetchRides } from "@/features/ride/manage-ride/ride.action";
import { useAppDispatch } from "@/features/store";
import { createOfferAsync } from "@/features/offer/manage-offers/offer.action";
import { CreateOffer } from "@/features/offer/manage-offers/offer.type";



export default function DriverDashboard() {
  const {incomingRides, setIncomingRides} = useDriverSocket();
  const dispatch = useAppDispatch()
  const onAccept = (offer : CreateOffer): void => {
    try{
      dispatch(createOfferAsync(offer))
    } catch(error) {
      console.error("error while creating offer",error)
    }
  };
  const onReject = (rideId: number): void => {
    setIncomingRides(incomingRides.filter((item) => item.id !== rideId))
  };
  const OnCounterOffer = (offer: CreateOffer): void => {
    try{
      dispatch(createOfferAsync(offer))
    } catch(error) {
      console.error("error while creating offer",error)
    }
  };

  

  useEffect(() => {
    const getRides = async() => {
        try{
            const result = await dispatch(fetchRides()).unwrap()
            if (!result) throw new Error('Error while fetching rides')
            setIncomingRides(result)
        } catch(error) {
            console.error(error)
        } 
    }

    getRides()
  },[])

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{fontWeight:'700', mb:2}}>
        Available Rides
      </Typography>

      <Stack spacing={2}>
        {incomingRides.map((ride) => (
          <RideRequestDashboard
            key={ride.id}
            ride={toRideRequest(ride)}
            onAccept={onAccept}
            onReject={onReject}
            onCounterOffer={OnCounterOffer}
          />
        ))}
      </Stack>
    </Box>
  );
}
