import 'dotenv/config';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UsersModule } from './users/users.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { VehiclesModule } from './vehicles/vehicles.module.js';
import { RidesModule } from './rides/rides.module.js';
import { OffersModule } from './offers/offers.module.js';
import { AuthMiddleware } from './middleware/auth.middleware.js';
import { WebsocketModule } from './websocket/websocket.module.js';
@Module({
  imports: [UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT ?? 5432),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: false,
    }), JwtModule.register({
      global: true,
      secret : 'secret'
    }), VehiclesModule, RidesModule, OffersModule, WebsocketModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware)
    .exclude(
      {path: '/auth/login', method : RequestMethod.POST},
      {path: '/auth/register', method : RequestMethod.POST}
    )
    .forRoutes('*');
  }
}