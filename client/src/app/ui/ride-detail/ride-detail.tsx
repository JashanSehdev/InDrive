import { Avatar, Box, Paper, Typography } from "@mui/material";
import styles from "./ride-detail.module.css";
import Image from "next/image";
import carCard from '@/../public/car.png'

const driverImage =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv7ZIA3lp4a-RVqvPSL-4qFPwftWkctdCBynvavvnHGg&s=10";


export default function RideDetail() {
  return (
    <Box className={styles.container}>
      <Avatar className={styles.avatar} src={driverImage} />
      <Paper className={styles.CarCard}>
        <Image 
            className={styles.image}
            src={carCard}
            alt="car image"
        />
      </Paper>

      <Box className={styles.infoBox}>
        <Typography variant="h2" className={styles.driverName}>
          Akhil Singh
        </Typography>
      </Box>
    </Box>
  );
}
