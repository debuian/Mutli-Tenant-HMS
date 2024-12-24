import { Module } from '@nestjs/common';
import { HotelController } from './hotel.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelEntity } from './entities/hotel.entity';
import { HotelService } from './hotel.service';

@Module({
  imports: [TypeOrmModule.forFeature([HotelEntity])],
  controllers: [HotelController],
  providers: [HotelService],
  exports: [HotelService],
})
export class HotelModule {}
