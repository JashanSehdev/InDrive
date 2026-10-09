import { Avatar, Box, Button, ListItem, ListItemAvatar, ListItemText, Paper, Typography } from "@mui/material";
import SedanImage from "@/../public/car.png";
import Image from "next/image";
import styles from './cab-card.module.css'
import { success, symbol } from "zod";

const driverImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRZwbCedfNbYOUllyqONSaiRF7A_-9elFATj-o-kiFvQ&s=10'
export default function CabCard() {
    return (
        <Paper className={styles.container}>
            <Box className ={styles.image_container}>
                <Image
                    className={styles.image} 
                    src={SedanImage}
                    alt='cab-image'
                />
            </Box>
            <ListItem className={styles.driverDetails}>
                <ListItemAvatar>
                    <Avatar src={driverImage}/>
                </ListItemAvatar>
                <ListItemText>
                    Ravi Kumar
                </ListItemText>
                <Paper className = {styles.rating}>
                    4.5
                </Paper>
            </ListItem>

            <Typography variant="h6">Counter Price : 1300</Typography>

            <Button className={styles.bookButton} variant="contained">Book it</Button>
        </Paper>
    )
}