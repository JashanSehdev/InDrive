import { Box, Container } from "@mui/material";
import styles from './bookride-detail.module.css'
import RideDetail from "@/app/ui/ride-detail/ride-detail";

const mapImage =
  "https://img.magnific.com/free-vector/digital-tracking-roadmap-with-orange-gps-navigator-route-path_1017-64661.jpg?semt=ais_hybrid&w=740&q=80";
export default function BookedRideDetails() {
  return (
    <Container>
      <Box component={"img"} src={mapImage} className={styles.image} />
      <RideDetail />
    </Container>
  );
}
