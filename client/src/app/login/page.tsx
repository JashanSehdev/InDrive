'use client'
import { useState } from "react";
// import { auth } from "@/lib/firebase";
// import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
// import { enqueueSnackbar } from "notistack";
// import { xor } from "firebase/firestore/pipelines";
import LoginForm from "../ui/login/login-page";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";

const imageUrl = 'https://images.pexels.com/photos/29586678/pexels-photo-29586678.jpeg?cs=srgb&dl=pexels-steve-29586678.jpg&fm=jpg'
export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);



  return (
    <Box
    
    sx={{

        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        
        width: '100%',
        minHeight: '400px',
        height: '100dvh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
      }}>
      <LoginForm/>
    </Box>
  )
}