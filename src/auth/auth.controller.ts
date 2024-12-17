import {
  Body,
  Controller,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { HotelLoginDto } from './dto/Hotellogin.dto';
import { Response } from 'express';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('SignUp')
  @UsePipes(ValidationPipe)
  async SignUp(@Body() hotelLoginDto: HotelLoginDto) {
    const result = await this.authService.SignUp(hotelLoginDto);
    delete result.password;
    return {
      message: `${hotelLoginDto.email} logged in succesfully`,
      result,
    };
  }

  @Post('SignIn')
  @UsePipes(ValidationPipe)
  async SignIn(
    @Res() response: Response,
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
    return response.json({
      success: true,
      statusCode: 201,
      message: 'Hotel Logged in successfully',
      data: [
        {
          accessToken,
        },
      ],
      path: '/hotel/auth/SignIn',
      error: {},
    });
  }
}
