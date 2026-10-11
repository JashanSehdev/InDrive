import { PartialType } from '@nestjs/mapped-types';
import { CreateRideDto } from './create-ride.dto.js';

export class UpdateRideDto extends PartialType(CreateRideDto) {}
