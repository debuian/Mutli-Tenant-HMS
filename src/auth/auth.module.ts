import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { HotelService } from 'src/hotel/hotel.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelEntity } from 'src/hotel/entities/hotel.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([HotelEntity]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
      }),
    }),
  ], // Provides access to the HotelRepository
  controllers: [AuthController],
  providers: [AuthService, HotelService],
})
export class AuthModule {}
