import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hotel } from './entities/hotel.entity';
import { Repository } from 'typeorm';
import { CreateHotelDto } from './dto/create-hotel.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class HotelService {
  constructor(@InjectRepository(Hotel) private hotelRepo: Repository<Hotel>) {}

  async create(createHotelDto: CreateHotelDto): Promise<Hotel> {
    let { email, password } = createHotelDto;
    const userExist = await this.checkUserExist(email);
    if (userExist) {
      throw new ConflictException('A hotel with this email already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newHotel = this.hotelRepo.create({
      ...createHotelDto,
      password: hashedPassword,
    });
    const hotelInfo = await this.hotelRepo.save(newHotel);
    return hotelInfo;
  }

  async ValidateUser(createHotelDto: CreateHotelDto): Promise<Hotel> {
    const { email, password } = createHotelDto;
    const userExist = await this.checkUserExist(email);
    if (!userExist) {
      throw new NotFoundException('User not Found');
    }
    const isPasswordValid = await bcrypt.compare(password, userExist.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }
    delete userExist.password;
    return userExist;
  }

  async checkUserExist(email: string) {
    const userExist = await this.hotelRepo.findOneBy({ email });
    if (userExist) {
      return userExist;
    }
    return false;
  }
}
