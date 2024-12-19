import { Routes } from '@nestjs/core';
import { HotelModule } from './hotel.module';
import { AuthModule } from 'src/auth/auth.module';

export const HotelRoutes: Routes = [
  {
    path: 'hotel',
    module: HotelModule,
    children: [{ path: 'auth', module: AuthModule }],
  },
];
