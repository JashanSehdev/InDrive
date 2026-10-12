
import { Type } from "class-transformer";
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { CabType, Status } from "../entities/ride.entity.js";

export class LocationDto {
  @IsString()
  @IsNotEmpty()
  location: string;

  @Type(() => Number)
  @IsNumber()
  latitude: number;

  @Type(() => Number)
  @IsNumber()
  longitude: number;
}

export class CreateRideDto {
  @ValidateNested()
  @Type(() => LocationDto)
  pickup: LocationDto;

  @ValidateNested()
  @Type(() => LocationDto)
  drop: LocationDto;

  @IsEnum(CabType)
  cab_type: CabType;

  @IsEnum(Status)
  @IsOptional()
  status?: Status;

  @Type(() => Number)
  @IsNumber()
  price : number
 
  @IsOptional()
  @IsNumber()
  accepted_offer_id ?: number
}
