'use client'
import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import styles from "./ride-request-card.module.css";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import StarIcon from "@mui/icons-material/Star";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { RideRequest } from "@/type/ride.type";
import { CreateOffer } from "@/features/offer/manage-offers/offer.type";
import { useState } from "react";
import CounterOfferModal from "./counter-offer-modal/counter-offer";
import { enqueueSnackbar } from "notistack";



type Props = {
  ride: RideRequest;
  onAccept: (offer: CreateOffer) => void;
  onCounterOffer: (offer: CreateOffer) => void;
  onReject: (rideId: number) => void;
};

export default function RideRequestDashboard({
  ride,
  onAccept,
  onCounterOffer,
  onReject,
}: Props) {
  const[counterOffer, setCounterOffer] = useState<number>(ride.price);
  const [open, setOpen] = useState<boolean>(false);
  const handleCounterOffer = () => {
    onCounterOffer({ rideId : ride.id, price : counterOffer})
    setOpen(false);
    enqueueSnackbar({message: 'Counter offer sent', variant:'success'})
  }
  return (
    <Card
      className={styles.card}
    >
      <CounterOfferModal
        setOpen={setOpen}
        setCounterOffer={setCounterOffer}
        min={ride.price}
        open={open}
        counterOffer={counterOffer}
        handleCounterOffer={handleCounterOffer}
      />
      <Grid container spacing={2} sx={{ alignItems: "center" }}>
        <Grid size={{ xs: 12, md: 3 }}>
          <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
            <Avatar>{ride.passengerName.charAt(0)}</Avatar>

            <Box>
              <Typography noWrap sx={{ fontWidth: "700" }}>
                {ride.passengerName}
              </Typography>
              <Stack
                direction="row"
                spacing={0.5}
                sx={{ alignItems: "center" }}
              >
                <StarIcon className={styles.starIcon} />
                <Typography variant="body2" sx={{ fontWeight: "600" }}>
                  {ride.rating}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  ({ride.totalRides} rides)
                </Typography>
              </Stack>
            </Box>
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Stack spacing={1.5}>
            <Stack
              direction="row"
              spacing={1}
              sx={{ alignItems: "flex-start" }}
            >
              <PlaceOutlinedIcon className={styles.placeOutline} />
              <Box>
                <Typography sx={{ fontWeight: "700" }}>
                  {ride.pickup}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {ride.pickupAddress}
                </Typography>
              </Box>
            </Stack>

            <Stack direction={"row"} spacing={1}>
              <PlaceOutlinedIcon sx={{ color: "#E53935", mt: 0.2 }} />

              <Box>
                <Typography sx={{ fontWeight: "700" }}>{ride.drop}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {ride.dropAddress}
                </Typography>
              </Box>
            </Stack>
          </Stack>
        </Grid>

        <Grid size={{ xs: 6, md: 2 }}>
          <Stack spacing={1}>
            <Stack direction="row" spacing={0.75} sx={{ alignItems: "center" }}>
              <AccessTimeOutlinedIcon
                sx={{ fontSize: 18, color: "text.secondary" }}
              />

              <Typography variant="body2" color="text.secondary">
                {ride.requestedAt}
              </Typography>
            </Stack>
            <Typography sx={{ fontWeight: "700" }}>
              {ride.distance} km
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ~ {ride.duration} min
            </Typography>
          </Stack>
        </Grid>

        <Grid>
          <Typography variant="body2" color="text.secondary">
            {` Passenger's Offer`}
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: "800" }}>
            ₹{ride.price}
          </Typography>
        </Grid>

        <Grid size={12}>
          <Divider sx={{ mb: 1.5, borderColor: "#E5E7EB" }} />
          <Grid container spacing={1.5}>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Button
                fullWidth
                variant="contained"
                onClick={() => onAccept({rideId : ride.id, price : ride.price})}
                sx={{
                  bgcolor: "#159447",
                  color: "#fff",
                  fontWeight: 700,
                  py: 1.2,
                  textTransform: "none",
                  "&:hover": { bgcolor: "#117A3B" },
                }}
              >
                Accept ₹{ride.price}
              </Button>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<EditOutlinedIcon />}
                onClick={() => setOpen(true)}
                sx={{
                  color: "#111827",
                  borderColor: "#CBD5E1",
                  fontWeight: 700,
                  py: 1.2,
                  textTransform: "none",
                }}
              >
                Counter Offer
              </Button>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Button
                fullWidth
                variant="contained"
                startIcon={<CloseIcon />}
                onClick={() => onReject(ride.id)}
                sx={{
                  bgcolor: "#FFE1E1",
                  color: "#D71920",
                  boxShadow: "none",
                  fontWeight: 700,
                  py: 1.2,
                  textTransform: "none",
                  "&:hover": {
                    bgcolor: "#FFCACA",
                    boxShadow: "none",
                  },
                }}
              >
                Reject
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}
