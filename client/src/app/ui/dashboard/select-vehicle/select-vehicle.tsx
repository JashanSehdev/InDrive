'use client'
import { Box, Typography } from "@mui/material";
import styles from "./select-vehicle.module.css";
import EconomyImage from "@/../public/economy.png";
import ComfortImage from "@/../public/comfort.png";
import XL from "@/../public/xl.png";
import { useState } from "react";
import Image from "next/image";
import { InfoOutlined } from "@mui/icons-material";
import { UseFormGetValues, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { SetRideInput } from "../dashboard";


export const vehicleList = [
  {
    id: "economy",
    name: "Economy",
    description: "Good for daily rides",
    price: 8,
    image: EconomyImage,
  },
  {
    id: "confort",
    name: "Comfort",
    description: "More space & comfort",
    price: 10,
    image: ComfortImage,
  },
  {
    id: "xl",
    name: "XL",
    description: "For Groups",
    price: 12,
    image: XL,
  },
];

type Prop = {
  setValue : UseFormSetValue<SetRideInput>,
  getValues : UseFormGetValues<SetRideInput>,
  register : UseFormRegister<SetRideInput>
}

export default function SelectVehicle({setValue, getValues, register} : Prop) {
  const [selected, setSelected] = useState("economy");
  return (
    <Box className={styles.container}>
      <Typography variant="h6" sx={{ fontWeight: "700" }}>
        Suggested For you
      </Typography>
      <input hidden {...register('cab_type')} />

      <Typography className={styles.subtitle}>
        Based on Your route and nearby drivers
      </Typography>

      <Box className={styles.vehicleList}>
        {vehicleList.map((vehicle) => {
          const active = getValues('cab_type') === vehicle.id;
          return (
            <Box
              key={vehicle.id}
              component={"button"}
              type="button"
              onClick={() => setValue('cab_type', vehicle.id)}
              className={`${styles.vehicleCard} ${active ? styles.selected : ""}`}
              aria-pressed={active}
            >

                <Box className={styles.imageWrapper}>
                <Image
                  src={vehicle.image}
                  alt={vehicle.name}
                  width={150}
                  height={90}
                  className={styles.vehicleImage}
                />
                <Box className={styles.details}>
                <Box className={styles.titleRow}>
                  <Typography sx={{ fontWeight: "700" }}>
                    {vehicle.name}
                  </Typography>

                  <InfoOutlined className={styles.infoIcon} />
                </Box>

                <Typography className={styles.description}>
                  {vehicle.description}
                </Typography>

                <Typography className={styles.price}>
                  ₹{vehicle.price} per km
                </Typography>
              </Box>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
