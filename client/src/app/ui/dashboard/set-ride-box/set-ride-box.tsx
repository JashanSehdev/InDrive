"use client";
import { Autocomplete, Button, Grid, TextField } from "@mui/material";
import styles from "./set-ride-box.module.css";
import axios from "axios";
import debounce from "debounce";
import { useCallback, useMemo, useState } from "react";

type LocationOption = {
  type: string;
  properties: {
    name?: string;
    city?: string;
    district?: string;
    county?: string;
    state?: string;
    country?: string;
    countrycode?: string;
    postcode?: string;
  };
  geometry: {
    coordinates: [number, number]; // longitude, latitude
  };
};

type Location = {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
};

export default function SetRideBox() {
  const [option, setOption] = useState([]);
  const fetchLocation = async (query: string) => {
    try {
      const response = await axios.get(
        `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=5&lat=20.5937&lon=78.9629`,
      );
      setOption(response.data.features);
    } catch (error) {
      console.error(error);
    }
  };

  const debouncedFetchLocation = useMemo(
    () => debounce((value: string) => fetchLocation(value), 1000),
    [],
  );

  return (
    <Grid container spacing={2} className={styles.container}>
      <Grid size={3}>
        <TextField
          className={styles.input}
          placeholder="Enter Your Location"
          
        />
        {/* <Autocomplete

          disablePortal
          options={option}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params}  />}
          onInputChange={(e) => debouncedFetchLocation(e.target.value)}
        /> */}
      </Grid>
      <Grid size={3}>
        <TextField
          className={styles.input}
          placeholder="Enter Your Destination"
          onChange={(e) => debouncedFetchLocation(e.target.value)}
        />
      </Grid>
      <Grid size={3}>
        <TextField className={styles.input} />
      </Grid>
      <Grid size={3}>
        <Button variant="contained" className={styles.button}>
          Find a Driver
        </Button>
      </Grid>
    </Grid>
  );
}
