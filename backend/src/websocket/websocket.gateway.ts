import { JwtService } from '@nestjs/jwt';
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { parseCookie } from 'cookie';

import { Server, Socket } from 'socket.io';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ride } from '../rides/entities/ride.entity.js';
import { Offer } from '../offers/entities/offer.entity.js';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  },
})
export class WebsocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly jwtService: JwtService,

    @InjectRepository(Ride)
    private readonly rideRepository: Repository<Ride>,
  ) {}

  async handleConnection(client: Socket) {
    try {
      const cookieHeader = client.handshake.headers.cookie;

      if (!cookieHeader) {
        console.error('Socket authentication failed: Cookie header missing');
        client.disconnect(true);
        return;
      }

      const cookies = parseCookie(cookieHeader);
      const token = cookies['access_token'];

      if (!token) {
        console.error('access_token cookie missing');
        client.disconnect(true);
        return;
      }

      const payload = await this.jwtService.verifyAsync(token);
      const userId = Number(payload.id);
      const role = payload.role;
      console.log("userId", userId , "role", role )
      if (
        !Number.isSafeInteger(userId) ||
        userId <= 0 ||
        !['driver', 'passenger'].includes(role)
      ) {
        console.log('Invalid cookie, socket disconnect');
        client.disconnect(true);
        return;
      }

      client.data.userId = userId;
      client.data.role = role;

      await client.join(`user:${userId}`);

      if (role === 'driver') {
        await client.join('drivers');

        console.log(`Driver with ${userId} is connected`);
      }

      console.log(`
                Socket Connected: user=${userId}, role=${role}`);
    } catch (error) {
      console.error('Socket authentication failed:', error);
      client.disconnect(true);
    }
  }

  handleDisconnect(client: Socket) {
    console.log(`Socket disconnected: user=${client.data.userId}`);
  }

  broadcastNewRide(ride: unknown) {
    this.server.to('drivers').emit(`ride:created`, ride);
    console.log("new ride message emited")
  }

  emitAcceptedOffer(ride: Ride) {
    this.server.to(`user:${ride.driverId}`).emit(`ride:accepted`, ride)
    console.log("accept offer emitted")
  }

  emitRideStatusChange(ride : Ride) {
    this.server.to(`user:${ride.passengerId}`).emit(`ride:status_change`, ride)
    console.log("RIDE:STATUS_CHANGE EMIT")
  }

  emitOffersToPassenger(offer : unknown, passengerId : number) {
    this.server.to(`user:${passengerId}`).emit(`offer:created`,  offer)
    console.log("offer:created emitted to ", passengerId)
  }

  broadcastToRide(rideId: number, event: string, data: unknown) {
    this.server.to(`ride:${rideId}`).emit(event, data);
  }

  @SubscribeMessage('ride:join')
  async joinRide(
    @ConnectedSocket() client: Socket,
    @MessageBody() body: { rideId: number },
  ) {
    const rideId = Number(body?.rideId);
    const userId = Number(client.data.userId);

    if (
      !Number.isSafeInteger(rideId) ||
      rideId <= 0 ||
      !Number.isSafeInteger(userId)
    ) {
      return {
        event: 'ride:error',
        data: { message: 'Invalid request' },
      };
    }

    const ride = await this.rideRepository.findOne({
      where: { id: rideId },
      select: {
        id: true,
        passengerId: true,
        driverId: true,
      },
    });

    if (!ride) {
      return {
        event: 'ride:error',
        data: { message: 'Ride not found' },
      };
    }

    const isPassenger = Number(ride.passengerId) === userId;
    const isDriver = Number(ride.driverId) === userId;

    if (!isPassenger && !isDriver) {
      return {
        event: 'ride:error',
        data: { message: 'You cannot access this ride' },
      };
    }

    await client.join(`ride:${rideId}`);

    return {
      event: 'ride:joined',
      data: { rideId },
    };
  }
}
