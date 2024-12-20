import { Module } from '@nestjs/common';
import { HotelRoomService } from './hotel-room.service';
import { HotelRoomController } from './hotel-room.controller';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelRoom } from './entities/hotelRoom.entity';
import { HotelModule } from 'src/hotel/hotel.module';

@Module({
  imports: [TypeOrmModule.forFeature([HotelRoom]), HotelModule],
  controllers: [HotelRoomController],
  providers: [HotelRoomService, JwtStrategy, JwtAuthGuard],
  exports: [HotelRoomService],
})
export class HotelRoomModule {}
