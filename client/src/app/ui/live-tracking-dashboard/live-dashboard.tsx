"use client";
import { Box, CircularProgress, Grid } from "@mui/material";
import Details from "./details/details";
import Map, { Marker, GeolocateControl, NavigationControl } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { useAppDispatch } from "@/features/store";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchRide } from "@/features/ride/manage-ride/ride.action";
import { enqueueSnackbar } from "notistack";
import { usePassengerSocket } from "@/hooks/use-passenger-socket";

export type RideLocation = {
  latitude: number;
  longitude: number;
  location: string;
};

export type Passenger = {
  id: number;
  username: string;
};

export type AcceptedOffer = {
  id: number;
  price: number;
  driver: {
    id: number;
    username: string;
  };
};

export type AcceptedRide = {
  id: number;
  accepted_offer_id: number;
  cab_type: "economy" | "comfort" | "xl";
  createdAt: string;
  updatedAt: string;
  driverId: number | null;
  drop: RideLocation;
  pickup: RideLocation;
  passenger: Passenger;
  passengerId: number;
  price: number;
  status: "accepted";
  accepted_offer: AcceptedOffer;
};

export default function LiveTracking({ rideId }: { rideId: number }) {
  const {ride, setRide} = usePassengerSocket()
  console.log("current Ride", ride)
  // const [ride, setRide] = useState<AcceptedRide | null>(null);
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
  const dispatch = useAppDispatch();
  useEffect(() => {
    const getRide = async () => {
      try {
        const result = await dispatch(fetchRide(rideId)).unwrap();
        console.log("Result", result);
        setRide(result);
      } catch (error) {
        console.error(error);
        enqueueSnackbar({ message: "Something went wrong", variant: "error" });
        //router.push("/dashboard");
      }
    };

    getRide();
  }, []);

  return (
    <Box>
      {!ride ? (
        <CircularProgress />
      ) : (
        <Grid
  container
  sx={{
    flexDirection: {
      xs: "column",
      sm: "column",
      md: "column",
      lg: 'row'
    },
  }}
  spacing={2}
>
          <Grid size={{ xs: 12, md: 8, lg: 9 }}>
            <Map
              mapboxAccessToken={mapboxToken}
              mapStyle="mapbox://styles/mapbox/streets-v12"
              style={{ width: "100%", height: 450 }}
              initialViewState={{
                latitude: ride.pickup.latitude,
                longitude: ride.pickup.longitude,
                zoom: 10,
              }}
              maxZoom={20}
              minZoom={3}
            >
              {Number.isFinite(ride.pickup?.latitude) &&
                Number.isFinite(ride.pickup?.longitude) && (
                  <Marker
                    latitude={ride.pickup.latitude}
                    longitude={ride.pickup.longitude}
                    color="#16a34a"
                    anchor="bottom"
                  />
                )}

              {Number.isFinite(ride.drop?.latitude) && Number.isFinite(ride.drop?.longitude) && (
                <Marker
                  latitude={ride.drop.latitude}
                  longitude={ride.drop.longitude}
                  color="#dc2626"
                  anchor="bottom"
                />
              )}
              <GeolocateControl position="top-right" />
              <NavigationControl position="top-right" />
            </Map>
          </Grid>

          <Grid size={{sm: 'grow',md: '4', lg:'3'}}>
            <Details ride={ride} />
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
