import { Injectable } from '@nestjs/common';
import { CreateHotelInvoiceDto } from './dto/create-hotel-invoice.dto';
import { UpdateHotelInvoiceDto } from './dto/update-hotel-invoice.dto';

@Injectable()
export class HotelInvoicesService {
  create(createHotelInvoiceDto: CreateHotelInvoiceDto) {
    return 'This action adds a new hotelInvoice';
  }

  findAll() {
    return `This action returns all hotelInvoices`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hotelInvoice`;
  }

  update(id: number, updateHotelInvoiceDto: UpdateHotelInvoiceDto) {
    return `This action updates a #${id} hotelInvoice`;
  }

  remove(id: number) {
    return `This action removes a #${id} hotelInvoice`;
  }
}
