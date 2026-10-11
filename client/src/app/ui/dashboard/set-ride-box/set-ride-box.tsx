"use client";

import { Box, Button, Input, Paper, Typography } from "@mui/material";
import styles from "./set-ride-box.module.css";
import { AddressField } from "../location-autocomplete/autocomplete";
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from "react-hook-form";
import { SetRideInput } from "../dashboard";
import { vehicleList } from "../select-vehicle/select-vehicle";
import { useEffect } from "react";

function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
) {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const R = 6371; // Earth's radius in km

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

  return 2 * R * Math.asin(Math.sqrt(a));
}

type Prop = {
  setValue: UseFormSetValue<SetRideInput>;
  register: UseFormRegister<SetRideInput>;
  watch: UseFormWatch<SetRideInput>;
  trigger: UseFormTrigger<SetRideInput>;
};
export default function SetRide({ setValue, watch, register, trigger }: Prop) {
  const pickup = watch("pickup");
  const drop = watch("drop");
  const cab_type = watch("cab_type");
  const distance =
    pickup && drop
      ? calculateDistance(
          pickup.latitude,
          pickup.longitude,
          drop.latitude,
          drop.longitude,
        )
      : 0;

  const vehicle = vehicleList.find((vehicle) => vehicle.id === cab_type);
  const minimumFare = Math.ceil(distance * (vehicle?.price ?? 0));

  useEffect(() => {
    setValue("price", minimumFare, {
      shouldValidate: true,
    });
    trigger("price");
  }, [minimumFare, setValue, trigger]);

  return (
    <Paper className={styles.container}>
      <Typography variant="h4">Where are you heading Today?</Typography>

      <Box className={styles.inputContainer}>
        <Box>
          <Typography>🟢</Typography>
        </Box>
        <Box>
          <Typography variant="body2">Pickup location</Typography>
          {/* <Input fullWidth/> */}
          <AddressField name="pickup" setValue={setValue} />
        </Box>
      </Box>

      <Box className={styles.inputContainer}>
        <Box>
          <Typography>🔴</Typography>
        </Box>
        <Box>
          <Typography variant="body2">Destination</Typography>
          <AddressField name="drop" setValue={setValue} />
        </Box>
      </Box>

      <Typography variant="h6" sx={{ fontWeight: "700" }}>
        Choose your fare
      </Typography>
      <Typography sx={{ color: "#777b80" }}>
        Set a fair price. Drivers will send you offers
      </Typography>
      <Box className={styles.inputContainer}>
        <Typography variant="h5">₹</Typography>
        <Input
          type="number"
          fullWidth
          className={styles.priceInput}
          {...register("price", {
            valueAsNumber: true,
            min: {
              value: minimumFare,
              message: `Minimum fare is ₹${minimumFare}`,
            },
            required: "Please enter your fare",
          })}
          inputProps={{
            min: minimumFare,
            step: 1,
          }}
        />
      </Box>
      <Button fullWidth type="submit" variant="contained">
        Find drivers
      </Button>
    </Paper>
  );
}
