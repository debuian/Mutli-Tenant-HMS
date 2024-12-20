import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  Res,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { HotelLoginDto } from './dto/Hotellogin.dto';
import { response, Response } from 'express';

@Controller()
@UsePipes(ValidationPipe)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('SignUp')
  async SignUp(@Body() hotelLoginDto: HotelLoginDto) {
    const result = await this.authService.SignUp(hotelLoginDto);
    return {
      message: `${hotelLoginDto.email} logged in succesfully`,
      result,
    };
  }

  @Post('SignIn')
  async SignIn(
    @Res({ passthrough: true }) response: Response,
    @Body() hotelLoginDto: HotelLoginDto,
  ) {
    const hotelInfo = await this.authService.ValidateHotel(hotelLoginDto);
    const payload = { hotelId: hotelInfo.id };
    const { accessToken, refreshToken } =
      await this.authService.SignIn(payload);

    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return {
      message: 'Hotel Logged in successfully',
      LoggedInfo: { accessToken },
    };
  }
}
