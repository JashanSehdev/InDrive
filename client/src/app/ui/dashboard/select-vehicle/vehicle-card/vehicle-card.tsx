import { Box, Grid, Paper, Typography } from "@mui/material";
import Image from "next/image";
import styles from "./vehicle-card.module.css";
import { Vehicle } from "@/type/vehicle.type";


type Prop =  {
  vehicle : Vehicle
}
export default function VehicleCard({vehicle} : Prop) {
  return (
    <Paper className={styles.container}>
      <Grid
        container
        spacing={3}
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Grid container spacing={5} sx={{alignItems: 'center'}}>
          <Grid>
            <Image className={styles.image} src={vehicle.image} alt="car image" />
          </Grid>
          <Grid>
            <Typography>{vehicle.type}</Typography>
            <Typography>people : {vehicle.people}</Typography>
            <Typography>luggage : {vehicle.luggage}</Typography>
          </Grid>
        </Grid>

        <Grid>
          <Typography variant="h3">INR {vehicle.price}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}
