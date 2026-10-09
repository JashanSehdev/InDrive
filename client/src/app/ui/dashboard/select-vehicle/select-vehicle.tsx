import { Box, Paper, Typography } from "@mui/material";
import styles from './select-vehicle.module.css'
import VehicleCard from "./vehicle-card/vehicle-card";
import { vehicle as vehicle_data } from "./vehicle.data";

export default function SelectVehicle () {
    return(
    <Paper className={styles.container}>
        <Typography variant="h2" className={styles.container}>Select Your Ride</Typography>
        
        {
            vehicle_data.map((vehicle, index) => (
                <VehicleCard key={index} vehicle={vehicle}/>
            ))
        }
        
    </Paper>
    )
}