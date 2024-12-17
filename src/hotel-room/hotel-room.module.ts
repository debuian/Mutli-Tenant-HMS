import { Module } from '@nestjs/common';
import { HotelRoomService } from './hotel-room.service';
import { HotelRoomController } from './hotel-room.controller';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Module({
  controllers: [HotelRoomController],
  providers: [HotelRoomService, JwtStrategy, JwtAuthGuard],
})
export class HotelRoomModule {}
