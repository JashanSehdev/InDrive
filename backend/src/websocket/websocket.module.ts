import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { WebsocketGateway } from './websocket.gateway.js';
import { RidesModule } from '../rides/rides.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ride } from '../rides/entities/ride.entity.js';

@Module({
  imports: [
    JwtModule.register({
      secret: 'secret',
    }),
    TypeOrmModule.forFeature([Ride]),
  ],
  providers: [WebsocketGateway],
  exports: [WebsocketGateway],
})
export class WebsocketModule {}
