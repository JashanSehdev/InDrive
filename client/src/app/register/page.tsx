import { Box } from "@mui/material";
import SignUpForm from "../ui/signup/signUp-page";
import styles from './register.module.css'

export default function Register() {
    return (
    <Box
    className={styles.container}
    >
        <SignUpForm/>
    </Box>
    )
}