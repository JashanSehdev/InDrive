import { Injectable } from '@nestjs/common';
import { DataSource, DeepPartial, FindManyOptions, Repository } from 'typeorm';
import { Ride } from '../../../rides/entities/ride.entity.js';
import { CreateRideDto } from '../../../rides/dto/create-ride.dto.js';

@Injectable()
export class RideRepository extends Repository<Ride> {
  constructor(dataSource: DataSource) {
    super(Ride, dataSource.createEntityManager());
  }
  async saveRide(payload: DeepPartial<Ride>) : Promise<Ride> {
    return this.save(payload)
  }
  async findRide(id : number) : Promise<Ride | null> {
    return await this.findOneBy({id})
  }

  async findRides(options : FindManyOptions<Ride>):Promise<Ride[]> {
    return await this.find(options)
  }
}
