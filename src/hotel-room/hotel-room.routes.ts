import { Routes } from '@nestjs/core';
import { HotelRoomModule } from './hotel-room.module';

export const HotelRoomRoutes: Routes = [
  {
    path: 'hotel-room',
    module: HotelRoomModule,
  },
];
