import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { HotelService } from 'src/hotel/hotel.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hotel } from 'src/hotel/entities/hotel.entity';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Hotel]),
    PassportModule,
    JwtModule.register({ secret: 'abcd' }),
  ], // Provides access to the HotelRepository
  controllers: [AuthController],
  providers: [AuthService, HotelService, LocalStrategy, LocalAuthGuard],
})
export class AuthModule {}