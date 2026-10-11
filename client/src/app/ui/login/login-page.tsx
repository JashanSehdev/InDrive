"use client";
import { Button, Paper, TextField, Typography } from "@mui/material";
import styles from "./login-page.module.css";
import Link from "next/link";
import { LoginInputs, loginSchema } from "./login.type";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "@/features/store";
import { loginUserAsync } from "@/features/auth/manage-auth/auth.action";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    setLoading(true);
    try {
      const result = await dispatch(loginUserAsync(data)).unwrap();
      if (!user) return
      if (user.role === 'driver') router.push('/driver/dashboard')
      if (user.role === 'passenger') router.push('/dashboard')
    } catch (err) {
      console.error("Error occur while login", err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Paper className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h5" className={styles.title}>
          {" "}
          Login
        </Typography>
        <TextField
          className={styles.textField}
          fullWidth
          label="email"
          error={!!errors.email}
          helperText={errors.email?.message}
          {...register("email")}
        />
        <TextField
          className={styles.textField}
          label="password"
          fullWidth
          type="password"
          error={!!errors.password}
          helperText={errors.password?.message}
          {...register("password")}
        />
        <Typography variant="body1">{`Don't have an account?`}</Typography>{" "}
        <Link href={"/register"}>
          <Typography variant="body1" sx={{ color: "#425B9A", fontWeight: "bolder" }}>
            Sign up
          </Typography>
        </Link>
        <Button variant="contained" type="submit" className={styles.button} loading={loading}>
          Login
        </Button>
      </form>
    </Paper>
  );
}
