import { Routes } from '@nestjs/core';
import { AuthModule } from 'src/auth/auth.module';
import { HotelBillingModule } from 'src/hotel-billing/hotel-billing.module';
import { HotelRoomReservationsModule } from 'src/hotel-room-reservations/hotel-room-reservations.module';
import { HotelRoomModule } from 'src/hotel-room/hotel-room.module';
import { HotelModule } from 'src/hotel/hotel.module';

export const GobbalRoutes: Routes = [
  {
    path: 'hotel',
    module: HotelModule,
    children: [
      { path: 'auth', module: AuthModule },
      { path: 'room', module: HotelRoomModule },
      { path: 'billing', module: HotelBillingModule },
      { path: 'reservation', module: HotelRoomReservationsModule },
    ],
  },
];
