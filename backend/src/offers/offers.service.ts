import { Injectable } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { Repository } from 'typeorm';
import { Offer } from './entities/offer.entity.js';
import { InjectRepository } from '@nestjs/typeorm';
import { WebsocketGateway } from '../websocket/websocket.gateway.js';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private readonly offerRepository: Repository<Offer>,
    private readonly websocketGateway: WebsocketGateway,
  ) {}
  async create(createOfferDto: CreateOfferDto, driverId: number) {
    const offer = this.offerRepository.create({
      ...createOfferDto,
      driverId: driverId,
    });

    const result = await this.offerRepository.save(offer);
    const savedOffer = await this.findOne(result.id)
    if(savedOffer?.Ride?.passengerId) this.websocketGateway.emitOffersToPassenger(savedOffer, savedOffer.Ride.passengerId)
    return savedOffer
  } 

  findAll() {
    return `This action returns all offers`;
  }

  async findRideOffers(rideId : number) {
    const offer = await this.offerRepository.find({
      where: {
        rideId
      },
      relations:{
        driver: true
      },

      select: {
        driver : {
          id : true,
          username : true
        }
      }
    })

    return offer
  }

  findOne(id: number) {
    return this.offerRepository.findOne({
      where: {
        id,
      },

      relations: {
        driver: true,
        Ride : true
      },
      select: {
        driver: {
          id: true,
          username: true,
        },
        Ride: {
          passengerId : true
        }
      },
    });
  }

  update(id: number, updateOfferDto: UpdateOfferDto) {
    return `This action updates a #${id} offer`;
  }

  remove(id: number) {
    return `This action removes a #${id} offer`;
  }
}
