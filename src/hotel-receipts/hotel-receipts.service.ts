import { Injectable } from '@nestjs/common';
import { CreateHotelReceiptDto } from './dto/create-hotel-receipt.dto';
import { UpdateHotelReceiptDto } from './dto/update-hotel-receipt.dto';

@Injectable()
export class HotelReceiptsService {
  create(createHotelReceiptDto: CreateHotelReceiptDto) {
    return 'This action adds a new hotelReceipt';
  }

  findAll() {
    return `This action returns all hotelReceipts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hotelReceipt`;
  }

  update(id: number, updateHotelReceiptDto: UpdateHotelReceiptDto) {
    return `This action updates a #${id} hotelReceipt`;
  }

  remove(id: number) {
    return `This action removes a #${id} hotelReceipt`;
  }
}
