"use client";
import { Box, Button, FormControl, FormControlLabel, FormLabel, Paper, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import styles from "./signUp-page.module.css";
import Link from "next/link";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Role, signupInput, signupSchema } from "./signup.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "@/features/store";
import { useState } from "react";
import { registerUserAsync } from "@/features/auth/manage-auth/auth.action";

export default function SignUpForm() {
  const [loading, setLoading] = useState<boolean>(false)
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<signupInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      role: Role.passenger
    }
  });

  const onSubmit: SubmitHandler<signupInput> = async (data : signupInput) => {
    setLoading(true);
    try {
      const { confirmPassword, ...registerData } = data
      await dispatch(registerUserAsync(registerData))
    } catch(error) {
      console.error("Error occur while register", error)
    } finally {
      setLoading(false)
    }
    console.log(data);
  };
  return (
    <Paper className={styles.container}>
      <Typography variant="h5" className={styles.title}>
        Sign up
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.input}
          fullWidth
          label="username"
          {...register("username")}
          error={!!errors.username}
          helperText={errors.username?.message}
        />
        <TextField
          className={styles.input}
          fullWidth
          label="email"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <FormControl component="fieldset" className={styles.radio}>
          {/* <FormLabel component="legend" color="success">Register as</FormLabel> */}
          <Typography variant="body1" sx={{fontSize:"large"}}>Login as</Typography>
          <Controller
            rules={{ required: true }}
            control={control}
            name="role"
            render={({ field }) => (
              <RadioGroup {...field}>
                <FormControlLabel value = {Role.passenger} control={<Radio />} label="Passenger" />
                <FormControlLabel value= {Role.driver} control={<Radio />} label="Driver" />
              </RadioGroup>
            )}
          />
        </FormControl>
        <TextField
          className={styles.input}
          fullWidth
          label="password"
          type="password"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <TextField
          className={styles.input}
          fullWidth
          label="Confirm Password"
          type="password"
          {...register("confirmPassword")}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
        />
        <Typography variant="body1" component={"span"}>
          Already have an account?
        </Typography>{" "}
        <Link href={"/login"}>
          {" "}
          <Typography
            sx={{ color: "#425B9A", fontWeight: "bolder" }}
            variant="body1"
            component={"span"}
          >
            SignIn
          </Typography>   
        </Link>
        <Button variant="contained" loading = {loading} className={styles.button} type="submit">
          SignUp
        </Button>
      </form>
    </Paper>
  );
}
