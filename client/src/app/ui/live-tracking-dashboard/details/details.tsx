import { Avatar, Box, Button, Card, IconButton, Paper, Stack, Typography } from "@mui/material";
import styles from "./details.module.css";
import StarIcon from "@mui/icons-material/Star";
import carImage from "@/../public/car.png";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import Image from "next/image";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import PinDropOutlinedIcon from "@mui/icons-material/PinDropOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import { AcceptedRide } from "../live-dashboard";

const cab_options = [
  {
    label: "Call",
    icon: <CallOutlinedIcon />,
  },
  {
    label: "Message",
    icon: <MessageOutlinedIcon />,
  },
  {
    label: "Share Ride",
    icon: <PinDropOutlinedIcon />,
  },
  {
    label: "Safety",
    icon: <ShieldOutlinedIcon />,
  },
];

const driver_image = 'https://img.magnific.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?semt=ais_hybrid&w=740&q=80'
export default function Details({ride} : {ride: AcceptedRide}) {
  return (
    <Stack spacing={6} className={styles.container}>


      <Stack>
        <Stack spacing={0}>
          <Typography variant="h4">DRIVER ARRIVES IN</Typography>
          <Stack direction="row" sx={{ alignItems: "baseline" }} spacing={1}>
            <Typography variant="h3" color="primary">
              5 min
            </Typography>
            <Typography color={"textSecondary"} sx={{ fontWeight: 500, color: "" }}>
              2.1km away
            </Typography>
          </Stack>
        </Stack>
      </Stack>

      <Paper elevation={1} sx={{ p: "1rem", width: "fit-content" }}>
        {/* Driver details */}
        <Stack direction="row" spacing={1.5}>
          <Avatar sx={{ width: 56, height: 56 }} src={driver_image}/>
          <Stack direction="column">
            <Typography>{ride.accepted_offer.driver.username}</Typography>
            <Stack direction="row" sx={{ alignItems: "center" }} spacing={0.5}>
              <StarIcon sx={{ color: "orange" }} />
              <Typography variant="body2"> 4.9 (100 rides)</Typography>
            </Stack>
          </Stack>
        </Stack>

        {/* Car Details */}

        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <Box>
            <Image src={carImage} alt="car Image" height={90} />
          </Box>
          <Stack>
            <Typography variant="h6">Maruti Suzuki Desire</Typography>
            <Typography variant="body1" color="textSecondary">
              White PB 10 JS 1234
            </Typography>
          </Stack>
        </Stack>

        <Stack direction={"row"} sx={{ justifyContent: "space-between" }}>
          {cab_options.map((item) => (
            <Stack key={item.label} sx={{ alignItems: "center" }}>
              <Paper sx={{ p: 1, borderRadius: "200px" }}>
                <IconButton>{item.icon}</IconButton>
              </Paper>
              <Typography variant="body2">{item.label}</Typography>
            </Stack>
          ))}
        </Stack>
      </Paper>

      <Stack spacing={1} sx={{mt:4}}>
        <Stack direction="row" spacing={3} sx={{ alignItems: "center" }}>
          <FmdGoodOutlinedIcon sx={{ color: "green" }} />
          <Stack spacing={-0.5}>
            <Typography variant="body2" color="textSecondary">
              Pickup Location
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "700" }}>
              {ride.pickup.location}
            </Typography>
            <Typography variant="body2">{ride.pickup.location}</Typography>
          </Stack>
        </Stack>

        {/* drop location */}

        <Stack direction="row" spacing={3} sx={{ alignItems: "center" }}>
          <FmdGoodOutlinedIcon sx={{ color: "red" }} />
          <Stack spacing={-0.5}>
            <Typography variant="body2" color="textSecondary">
              Drop Location
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "700" }}>
              {ride.drop.location}
            </Typography>
            <Typography variant="body2">{ride.drop.location}</Typography>
          </Stack>
        </Stack>
      </Stack>

      <Stack direction={'row'} sx={{justifyContent:'space-between'}}>
          <Typography variant="body1" sx={{fontWeight: 700}}>You agreed Fair</Typography><Typography variant="h5">{ride.accepted_offer.price}</Typography>
      </Stack>
      <Button variant="contained" color="error">
        Cancel Ride
      </Button>
    </Stack>
  );
}
