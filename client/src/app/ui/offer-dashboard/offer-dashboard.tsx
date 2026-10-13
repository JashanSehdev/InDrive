"use client";
import { fetchOfferAsync } from "@/features/offer/manage-offers/offer.action";
import { useAppDispatch } from "@/features/store";
import { Box, Container, Skeleton, Stack } from "@mui/material";


import { useEffect } from "react";
import { useOffers } from "@/hooks/use-offer";
import OfferCard from "./offer-card/offer-card";
import { Offer } from "@/type/offer.type";
import { acceptRideAsync } from "@/features/ride/manage-ride/ride.action";
import { useRouter } from "next/navigation";
import { Ride } from "@/type/ride.type";

export default function OfferDashboard({ rideId }: { rideId: number }) {
  const { offers, setOffers } = useOffers(rideId);
  const dispatch = useAppDispatch();
  const route = useRouter();
  useEffect(() => {
    const getOffers = async () => {
      try {
        const result = await dispatch(fetchOfferAsync(rideId)).unwrap();
        setOffers(result);
      } catch (error) {
        console.error(error);
      }
    };

    getOffers();
  }, [dispatch, rideId]);

  const handleAccept = async (offer: Offer) => {
    try {
      const result: Ride | null = await dispatch(
        acceptRideAsync({ 
          accepted_offer_id: offer.id, 
          rideId: offer.rideId, 
          offerId: offer.id, 
          driverId: offer.driverId,
          status : 'accepted'
        }),
      ).unwrap()
      route.push(`/dashboard/ride/${result?.id}/live`);
    } catch (error) {
      console.error("Error occur while accepting offer", error);
    }
  };

  return (
    <div>
      <Box sx={{ maxWidth: "500px" }}>
        {offers.length === 0 ? (
          <Stack spacing={1}>
            <Skeleton variant="rectangular" width={400} height={60} />
            <Skeleton variant="rectangular" width={400} height={60} />
            <Skeleton variant="rectangular" width={400} height={60} />
          </Stack>
        ) : (
          offers.map((offer: any) => (
            <OfferCard offer={offer} key={offer.id} onAccept={handleAccept} />
          ))
        )}
      </Box>
    </div>
  );
}
