'use client'
import {
  Container,

} from "@mui/material";
import SetRideBox from "./set-ride-box/set-ride-box";
import SelectVehicle from "./select-vehicle/select-vehicle";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "@/features/store";
import { createRideAsync } from "@/features/ride/manage-ride/ride.action";


const locationSchema = z.object({
  location : z.string(),
  latitude : z.number(),
  longitude : z.number()
})

const setRideSchema = z.object({   
  pickup :  locationSchema,
  drop : locationSchema,
  price : z.coerce.number().min(1, "Price must be greater than zero"),
  cab_type : z.string()
})



export type SetRideInput = z.input<typeof setRideSchema>
export type SetRideOutput = z.output<typeof setRideSchema>

export default function Dashboard() {
  const dispatch = useAppDispatch()
    const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<SetRideInput, unknown, SetRideOutput>({
    resolver:zodResolver(setRideSchema),
    defaultValues :{
      cab_type:'economy'
    }
  })
  const onSubmit: SubmitHandler<SetRideOutput> = (data : SetRideOutput) =>{
    dispatch(createRideAsync(data))
  }

  console.log("SetValue", watch())
  return (
    <Container maxWidth="xl">
      <form onSubmit={handleSubmit(onSubmit)}>
        <SetRideBox trigger={trigger} watch={watch} register={register} setValue={setValue} />
        <SelectVehicle register={register} getValues={getValues} setValue = {setValue}/>
      </form>
    </Container>
  );
}
