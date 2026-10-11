import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateOfferDto {

    @IsNumber()
    @IsNotEmpty()
    rideId : number

    @IsNumber()
    @IsNotEmpty()
    price : number

    @IsOptional()
    @IsString()
    message ?: string 
    
}
