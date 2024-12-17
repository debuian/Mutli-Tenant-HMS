import {
  Body,
  Controller,
  Post,
  Request,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { HotelLoginDto } from './dto/Hotellogin.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
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
  @UseGuards(LocalAuthGuard)
  async SignIn(
    @Request() req,
    @Res() response: Response,
    @Body() hotelLoginDto: HotelLoginDto,
  ) {
    const { accessToken, refreshToken } = await this.authService.SignIn(
      req.user,
    );
    response.cookie('refreshToken', refreshToken, {
      httpOnly: true, // Prevent JavaScript access
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
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
