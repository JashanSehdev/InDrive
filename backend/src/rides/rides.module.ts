import { Module } from '@nestjs/common';
import { RidesService } from './rides.service.js';
import { RidesController } from './rides.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ride } from './entities/ride.entity.js';
import { WebsocketModule } from '../websocket/websocket.module.js';

@Module({
  imports: [TypeOrmModule.forFeature([Ride]), WebsocketModule],
  controllers: [RidesController],
  providers: [RidesService],
  exports:[RidesService]
})
export class RidesModule {}
