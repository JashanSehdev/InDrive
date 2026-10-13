import { Box } from '@mui/material'
import styles from './live-driver-ride.module.css'
import DriverLiveDashboard from '@/app/ui/driver/driver-live-tracking/driver-live-tracking'


export default async function Ride({params} : {params : Promise<{id : string}>}) {
    
    const {id} = await params

    return (
        <Box>
            {
                id ? <DriverLiveDashboard rideId={Number(id)}/> : (
                    <h1>Something went Wrong</h1>
                )
            }
            
        </Box>
    )
}