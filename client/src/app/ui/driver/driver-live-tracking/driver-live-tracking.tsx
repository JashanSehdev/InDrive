"use client";
import RideDetail from "@/app/driver/dashboard/ride/[id]/ride-detail/ride-detail.page";
import { fetchRide } from "@/features/ride/manage-ride/ride.action";
import { useAppDispatch } from "@/features/store";
import { Ride } from "@/type/ride.type";
import { Grid } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";

import Map, { GeolocateControl, Marker, NavigationControl } from "react-map-gl/mapbox";

const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

export default function DriverLiveDashboard({ rideId }: { rideId: number }) {
  const [ride, setRide] = useState<Ride | null>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getRide = async () => {
      try {
        const result = await dispatch(fetchRide(rideId)).unwrap();

        setRide(result);
      } catch (error) {
        console.error(error);
        enqueueSnackbar({ message: "something went wrong", variant: "error" });
      }
    };
    getRide();
  }, [dispatch, rideId]);

  if (!ride) return <h1>ERROR 404 Not Found</h1>;
  const pickup = ride?.pickup;
  const drop = ride?.drop;
  return (
    <Grid container size={12}>
      <Grid size={9}>
        <Map
          mapboxAccessToken={mapboxToken}
          mapStyle="mapbox://styles/mapbox/streets-v12"
          style={{ width: "100%", height: 450 }}
          initialViewState={{ latitude: 35.668641, longitude: 139.750567, zoom: 10 }}
          maxZoom={20}
          minZoom={3}
        >
          {Number.isFinite(pickup?.latitude) && Number.isFinite(pickup?.longitude) && (
            <Marker
              latitude={pickup.latitude}
              longitude={pickup.longitude}
              color="#16a34a"
              anchor="bottom"
            />
          )}

          {Number.isFinite(drop?.latitude) && Number.isFinite(drop?.longitude) && (
            <Marker
              latitude={drop.latitude}
              longitude={drop.longitude}
              color="#dc2626"
              anchor="bottom"
            />
          )}
          <GeolocateControl position="top-right" />
          <NavigationControl position="top-right" />
        </Map>
      </Grid>
      <Grid size={3}>
          <RideDetail ride={ride}/>
      </Grid>
    </Grid>
  );
}
