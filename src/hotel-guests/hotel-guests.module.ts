import { Module } from '@nestjs/common';
import { HotelGuestsService } from './hotel-guests.service';
import { HotelGuestsController } from './hotel-guests.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelGuest } from './entities/hotel-guest.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HotelGuest])],
  controllers: [HotelGuestsController],
  providers: [HotelGuestsService],
  exports: [HotelGuestsService],
})
export class HotelGuestsModule {}
