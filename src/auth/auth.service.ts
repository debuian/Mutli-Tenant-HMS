import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { HotelService } from 'src/hotel/hotel.service';
import { HotelLoginDto } from './dto/Hotellogin.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly hotelSerivce: HotelService,
    private readonly jwtService: JwtService,
  ) {}

  async SignUp(hotelLoginDto: HotelLoginDto) {
    const hotelInfo = await this.hotelSerivce.create(hotelLoginDto);
    return hotelInfo;
  }

  async SignIn(payload) {
    const accessToken = await this.jwtService.sign(
      { payload },
      {
        expiresIn: '5m',
      },
    );

    const refreshToken = await this.jwtService.sign(
      { payload },
      {
        expiresIn: '7d',
      },
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  async ValidateHotel(hotelLoginDto: HotelLoginDto) {
    const { email, password } = hotelLoginDto;
    const validUser = await this.hotelSerivce.checkUserExist(email);
    if (!validUser) {
      throw new NotFoundException(`User with Email: ${email} doesn't Exist`, {
        description: 'Authentication Failed',
        cause: 'Email is not registered',
      });
    }
    const isPasswordValid = await bcrypt.compare(password, validUser.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid Password', {
        description: 'Authentication Failed',
        cause: 'Incorrect Password',
      });
    }
    delete validUser.password;
    delete validUser.email;
    return validUser;
  }
}
