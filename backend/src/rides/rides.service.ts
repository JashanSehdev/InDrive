import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateRideDto } from './dto/create-ride.dto.js';
import { UpdateRideDto } from './dto/update-ride.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Ride } from './entities/ride.entity.js';
import { Repository } from 'typeorm';
import { WebsocketGateway } from '../websocket/websocket.gateway.js';

@Injectable()
export class RidesService {
  constructor(
    @InjectRepository(Ride)
    private readonly rideRepository : Repository<Ride>,
    private readonly websocketGateway : WebsocketGateway,
  ){}
  async create(createRideDto: CreateRideDto, passengerId : number) {
    const ride = this.rideRepository.create({...createRideDto, passengerId, accepted_offer:null});
    const newRide =  await  this.rideRepository.save(ride);
    const broadcastRide = await this.findOne(newRide.id)
    this.websocketGateway.broadcastNewRide(broadcastRide);
    return broadcastRide
  }

  async findAll() {
    return await this.rideRepository.find({
      relations : {
        driver : true,
        passenger : true
      },
      select : {
        driver: {
          id : true,
          username : true
        },
        passenger : {
          id : true,
          username : true
        }
      }
    })
  }

  findOne(id: number) {
    return this.rideRepository.findOne({
      where : {
        id 
      },
      relations: {
        passenger: true,
        accepted_offer:{
          driver:true
        }
      },

      select : {
        passenger : {
          id : true,
          username : true,
          
        },
        accepted_offer:{
          id:true,
          price: true,
          driver:{
            id : true,
            username : true
          }
        }
      }
    })
  }

  async update(id: number, updateRideDto: UpdateRideDto) {
    const ride = await this.findOne(id)
    if (!ride) throw new UnauthorizedException({code : 'NOT_FOUND', message :'Ride not found'})
    const newRide = {...ride, ...updateRideDto}

    await this.rideRepository.update(id, newRide)
    if (newRide?.status === 'accepted'){
      this.websocketGateway.emitAcceptedOffer(newRide)
    }
    this.websocketGateway.emitRideStatusChange(newRide)
    return newRide;
  }

  async remove(id: number) {
    const ride = await this.findOne(id)

    if (!ride) throw new NotFoundException({code:'NOT_FOUND', message : 'ride not found'})
    await this.rideRepository.remove(ride)

    return ride

  }
}
