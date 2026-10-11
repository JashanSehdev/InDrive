import { Avatar, Box, Card, Paper, Stack, Typography } from "@mui/material";
import styles from "./details.module.css";
import StarIcon from "@mui/icons-material/Star";
import carImage from "@/../public/car.png";
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import Image from "next/image";

export default function Details() {
  return (
    <Box>
      <Box className={styles.cardContainer}>
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <Box
            component="img"
            src={carImage}
            alt="carImage"
            height={70}
            width={70}
            sx={{ borderRadius: 12, objectFit: "cover" }}
          />

          <Stack direction="column">
            <Typography variant="body1" sx={{ fontWeight: "700" }}>
              Your ride has been accepted
            </Typography>
            <Typography variant="body1" color="text.secandory">
              Driver is coming to your location
            </Typography>
          </Stack>
        </Stack>
      </Box>

      <Stack>
        <Stack spacing={-1}>
          <Typography variant="h4">DRIVER ARRIVES IN</Typography>
          <Stack direction="row" sx={{ alignItems: "baseline" }} spacing={1}>
            <Typography variant="h3" color="primary">
              5 min
            </Typography>
            <Typography
              color={"textSecondary"}
              sx={{ fontWeight: 500, color: "" }}
            >
              2.1km away
            </Typography>
          </Stack>
        </Stack>
      </Stack>

      <Paper elevation={1} sx={{ p: "1rem" }}>
        {/* Driver details */}
        <Stack direction="row" spacing={1.5}>
          <Avatar sx={{ width: 56, height: 56 }} />
          <Stack direction="column">
            <Typography>Driver Name</Typography>
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

        <Stack direction={"row"}>
          <Stack>
            <Paper sx={{p : 1, borderRadius: '200px'}}>
                <CallOutlinedIcon/>
            </Paper>
            <Typography variant="body2">Call</Typography>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
}
