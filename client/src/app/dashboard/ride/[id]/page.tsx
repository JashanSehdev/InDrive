import OfferDashboard from "@/app/ui/offer-dashboard/offer-dashboard"
import { Box, Paper, Typography } from "@mui/material"



export default async function Ride ({params} : {params : Promise<{id : string}>}) {
    const {id} =  await params
    return (
        <Box>
            <Paper sx={{ml:3, p:'1rem', width:'fit-content'}}>
                <Typography variant="h6" sx={{fontWeight: '700'}}>Available Riders</Typography>
                <OfferDashboard rideId={Number(id)}/>
            </Paper>
            
        </Box>
    )
}