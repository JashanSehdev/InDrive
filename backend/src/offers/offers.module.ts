import { Module } from '@nestjs/common';
import { OffersService } from './offers.service.js';
import { OffersController } from './offers.controller.js';
import { Offer } from './entities/offer.entity.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WebsocketModule } from '../websocket/websocket.module.js';

@Module({
  imports: [TypeOrmModule.forFeature([Offer]), WebsocketModule],
  controllers: [OffersController],
  providers: [OffersService],
  exports:[OffersService]
})
export class OffersModule {}
