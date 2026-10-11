'use client'
import { fetchOfferAsync } from "@/features/offer/manage-offers/offer.action";
import { useAppDispatch } from "@/features/store";
import { Box, Container } from "@mui/material";
// import { useEffect } from "react";

// export default function OfferDashboard({rideId} : {rideId : number}) {
    // const dispatch = useAppDispatch()
    // useEffect(() => {
    //     const getOffers = async() => {
    //         try{
    //             const result = await dispatch(fetchOfferAsync(rideId)).unwrap()
    //             console.log(result)
    //         } catch (error) {
    //             console.error(error)
    //         }
            
    //     }

    //     getOffers()
    // },[dispatch, rideId])
//     return (
//         <Box>

//         </Box>
//     )
// }

import { useEffect } from "react";
import { useOffers } from "@/hooks/use-offer";
import OfferCard from "./offer-card/offer-card";
import { Offer } from "@/type/offer.type";



export default function OfferDashboard({
  rideId,
}: {
  rideId: number;
}) {
  const {offers, setOffers} = useOffers(rideId)
      const dispatch = useAppDispatch()
    useEffect(() => {
        const getOffers = async() => {
            try{
                const result = await dispatch(fetchOfferAsync(rideId)).unwrap()
                setOffers(result)
            } catch (error) {
                console.error(error)
            }
            
        }

        getOffers()
    },[dispatch, rideId])

  const handleAccept = (offerId : Offer) => {
    
  }
  
  return (
    <div>
      <Box sx={{maxWidth:'500px'}}>
        {offers.map((offer : any) => (
        <OfferCard offer={offer} key={offer.id} onAccept={handleAccept} />
      ))}
      </Box>
      
    </div>
  );
}