import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Roles } from "../entities/user.entity.js";


export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    username  : string

    @IsString()
    @IsNotEmpty()
    email : string

    @IsString()
    @IsNotEmpty()
    password : string

    @IsEnum(Roles, {message: 'role must be driver or passenger'})
    role : Roles
}