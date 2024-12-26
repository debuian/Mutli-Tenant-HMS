import { Routes } from '@nestjs/core';
import { AuthModule } from 'src/auth/auth.module';
import { HotelRoomModule } from 'src/hotel-room/hotel-room.module';
import { HotelModule } from 'src/hotel/hotel.module';

export const GobbalRoutes: Routes = [
  {
    path: 'hotel',
    module: HotelModule,
    children: [
      { path: 'auth', module: AuthModule },
      { path: 'room', module: HotelRoomModule },
    ],
  },
];
