import {  Button, Container, Grid, Paper, StyledEngineProvider, TextField } from "@mui/material";
import styles from './dashboard.module.css'
import SetRideBox from "./set-ride-box/set-ride-box";
import SelectVehicle from "./select-vehicle/select-vehicle";

export default function Dashboard () {
    return (
    <Container maxWidth="xl">
        <SetRideBox />
        <SelectVehicle/>
    </Container>
    )
}