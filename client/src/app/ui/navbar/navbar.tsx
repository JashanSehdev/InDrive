import { Box, Container } from "@mui/material";
import styles from './navbar.module.css'

const inDriveLogo = 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/20/InDrive_Logo.svg/960px-InDrive_Logo.svg.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail&_=20260502014542'

export default function Navbar() {
    return (
        <Box className = {styles.container}>
            <Container maxWidth="xl">
            <Box
                component={'img'}
                src={inDriveLogo}
                className={styles.logo}
            />
            </Container>
        </Box>
    )
}