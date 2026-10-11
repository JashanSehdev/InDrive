import OfferDashboard from "@/app/ui/offer-dashboard/offer-dashboard"
import { Box } from "@mui/material"



export default async function Ride ({params} : {params : Promise<{id : string}>}) {
    const {id} =  await params
    return (
        <Box>
            <OfferDashboard rideId={Number(id)}/>
        </Box>
    )
}