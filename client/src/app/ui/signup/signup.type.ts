import z from "zod";

export enum Role {
    passenger = "passenger",
    driver = 'driver'
}

export const signupSchema = z.object({
        username : z.string().min(1, 'username required'),
        email : z.email(),
        role : z.enum(Role),
        password : z.string().min(6, 'password length should be greater than 6').max(12, 'password length should be less than 12'),
        confirmPassword : z.string().min(6, 'password length should be greater than 6').max(12, 'password length should be less than 12')
})
.refine((data) => data.password === data.confirmPassword, {
    message : "Password do not match",
    path : ["confirmPassword"]
})

export type signupInput = z.infer<typeof signupSchema>

export type DispatchSignupInput = Omit<signupInput, "confirmPassword">