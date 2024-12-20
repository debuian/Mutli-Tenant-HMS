import { Module } from '@nestjs/common';
import { HotelRoomReservationsService } from './hotel-room-reservations.service';
import { HotelRoomReservationsController } from './hotel-room-reservations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelRoomReservation } from './entities/hotel-room-reservation.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { HotelModule } from 'src/hotel/hotel.module';
import { HotelGuestsModule } from 'src/hotel-guests/hotel-guests.module';
import { HotelRoomModule } from 'src/hotel-room/hotel-room.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([HotelRoomReservation]),
    HotelModule,
    HotelGuestsModule,
    HotelRoomModule,
  ],
  controllers: [HotelRoomReservationsController],
  providers: [HotelRoomReservationsService, JwtStrategy, JwtAuthGuard],
  exports: [HotelRoomReservationsService],
})
export class HotelRoomReservationsModule {}
