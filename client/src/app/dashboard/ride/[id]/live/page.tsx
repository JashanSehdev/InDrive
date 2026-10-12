import Details from "@/app/ui/live-tracking-dashboard/details/details";
import LiveTracking from "@/app/ui/live-tracking-dashboard/live-dashboard";
import { Box } from "@mui/material";

export default async function Live ({params} : {params : Promise<{id : number}>}) {
    
    const {id} = await params
    return(
        <Box>
            <LiveTracking rideId={id}/>
            
        </Box>
    )
}