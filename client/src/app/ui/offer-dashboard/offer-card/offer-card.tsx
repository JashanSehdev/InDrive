"use client";

import {
  Avatar,
  Box,
  Button,
  Chip,
  Typography,
} from "@mui/material";
import type { Offer } from "@/type/offer.type";
import styles from "./offer-card.module.css";

type OfferCardProps = {
  offer: Offer;
  onAccept: (offer: Offer) => void;
};

export default function OfferCard({
  offer,
  onAccept,
}: OfferCardProps) {
  const driverName = offer.driver.username;

  return (
    <Box className={styles.card}>
      <Box className={styles.driver}>
        <Avatar className={styles.avatar}>
          {driverName.charAt(0).toUpperCase()}
        </Avatar>

        <Box>
          <Typography className={styles.name}>
            {driverName}
          </Typography>

          <Typography className={styles.subtitle}>
            Driver ID: {offer.driverId}
          </Typography>
        </Box>
      </Box>

      <Box className={styles.offer}>
        <Typography className={styles.price}>
          ₹ {offer.price}
        </Typography>

        <Chip
          label="Driver offer"
          size="small"
          className={styles.badge}
        />
      </Box>

      <Button
        variant="contained"
        className={styles.accept}
        onClick={() => onAccept(offer)}
      >
        Accept
      </Button>
    </Box>
  );
}