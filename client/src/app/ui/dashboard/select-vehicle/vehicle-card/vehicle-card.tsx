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
            <Typography variant="subtitle1" sx={{fontWeight:'bold'}}>{vehicle.type}</Typography>
            <Typography>{vehicle.line}</Typography>
            <Typography>From: {vehicle.price}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
