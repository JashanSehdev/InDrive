import { Box, Button, Paper, Stack } from "@mui/material";
import styles from "./ride-detail.module.css";
import { useAppDispatch } from "@/features/store";
import { cancelRideAsync, completeRideAsync, startRideAsync } from "@/features/ride/manage-ride/ride.action";
import { Ride } from "@/type/ride.type";
import { enqueueSnackbar } from "notistack";


export default function RideDetail({ride} : {ride : Ride}) {
  const dispatch = useAppDispatch()

  const handleCompleteRide = async() => {
    try{
        const response = await dispatch(completeRideAsync(ride.id)).unwrap()
        enqueueSnackbar({message : 'ride has been completed', variant:'success'})
        console.log(response)
    } catch (error) {
        enqueueSnackbar({message: 'something went wrong while completing  ride', variant:'error'})
        console.error(error)
    }
  }

  const handleStartRide = async() => {
    try{
        const response = await dispatch(startRideAsync(ride.id)).unwrap()
        enqueueSnackbar({message : 'Ride has been started', variant:'success'})
        console.log(response)
    } catch (error) {
        enqueueSnackbar({message: 'something went wrong while starting the ride', variant:'error'})
        console.error(error)
    }
  }

  const handleCancelRide = async() => {
    try{
        const response = await dispatch(cancelRideAsync(ride.id)).unwrap()
        enqueueSnackbar({message : 'Ride has been cancelled', variant:'success'})
        console.log(response)
    } catch (error) {
        enqueueSnackbar({message: 'something went wrong while cancelling  ride', variant:'error'})
        console.error(error)
    }
  }



  return (
    <Box className={styles.container}>
      <Paper sx={{p: '1rem'}}>
        <Stack spacing={2}>
          <Button variant={"outlined"} onClick={handleStartRide}>Start Ride</Button>
          <Button variant={"contained"} onClick={handleCompleteRide}>Complete Ride</Button>
          <Button variant={"contained"} color="error" onClick={handleCancelRide}>
            Cancel Ride
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
