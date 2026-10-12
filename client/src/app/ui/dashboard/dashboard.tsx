"use client";
import { Container } from "@mui/material";
import SetRideBox from "./set-ride-box/set-ride-box";
import SelectVehicle from "./select-vehicle/select-vehicle";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "@/features/store";
import { createRideAsync } from "@/features/ride/manage-ride/ride.action";
import { useRouter } from "next/navigation";
import styles from "./dashboard.module.css";
import Map, {
  Marker,
  Source,
  Layer,
  GeolocateControl,
  NavigationControl,
} from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";

const locationSchema = z.object({
  location: z.string(),
  latitude: z.number(),
  longitude: z.number(),
});

const setRideSchema = z.object({
  pickup: locationSchema,
  drop: locationSchema,
  price: z.coerce.number().min(1, "Price must be greater than zero"),
  cab_type: z.string(),
});

// const Map = dynamic(() => import('@/app/ui/map/map'), {
//   ssr: false,
// });

export type SetRideInput = z.input<typeof setRideSchema>;
export type SetRideOutput = z.output<typeof setRideSchema>;

export default function Dashboard() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<SetRideInput, unknown, SetRideOutput>({
    resolver: zodResolver(setRideSchema),
    defaultValues: {
      cab_type: "economy",
    },
  });

  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

  const onSubmit: SubmitHandler<SetRideOutput> = async (data: SetRideOutput) => {
    try {
      const result = await dispatch(createRideAsync(data)).unwrap();
      if (result.id) {
        router.replace(`/dashboard/ride/${result.id}`);
      }
    } catch (error) {
      console.error(`Error occur while setting ride`, error);
    }
  };

  console.log("SetValue", watch());
  const pickup = watch('pickup')
  const drop = watch('drop')
  return (
    <Container maxWidth="xl" className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <SetRideBox trigger={trigger} watch={watch} register={register} setValue={setValue} />
        {/* Map*/}
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
        <SelectVehicle register={register} getValues={getValues} setValue={setValue} />
      </form>
    </Container>
  );
}
