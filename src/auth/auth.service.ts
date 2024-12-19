import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { HotelService } from 'src/hotel/hotel.service';
import { HotelLoginDto } from './dto/Hotellogin.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Hotel } from 'src/hotel/entities/hotel.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly hotelSerivce: HotelService,
    private readonly jwtService: JwtService,
  ) {}

  async SignUp(hotelLoginDto: HotelLoginDto) {
    let { email, password } = hotelLoginDto;
    const userExist = await this.hotelSerivce.checkHotelExist(email);
    if (userExist) {
      throw new ConflictException('A hotel with this email already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const hotelInfo = await this.hotelSerivce.create({
      ...hotelLoginDto,
      password: hashedPassword,
    });
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

  async ValidateHotel(hotelLoginDto: HotelLoginDto): Promise<Hotel> {
    const { email, password } = hotelLoginDto;
    const validHotel = await this.hotelSerivce.checkHotelExist(email);
    if (!validHotel) {
      throw new NotFoundException(`User with Email: ${email} doesn't Exist`, {
        description: 'Authentication Failed',
        cause: 'Email is not registered',
      });
    }
    const isPasswordValid = await bcrypt.compare(password, validHotel.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid Password', {
        description: 'Authentication Failed',
        cause: 'Incorrect Password',
      });
    }
    delete validHotel.password;
    delete validHotel.email;
    return validHotel;
  }
}
