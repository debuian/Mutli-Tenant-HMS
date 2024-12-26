import { Injectable } from '@nestjs/common';
import { CreateHotelPurchaseOrderDto } from './dto/create-hotel-purchase-order.dto';
import { UpdateHotelPurchaseOrderDto } from './dto/update-hotel-purchase-order.dto';

@Injectable()
export class HotelPurchaseOrderService {
  create(createHotelPurchaseOrderDto: CreateHotelPurchaseOrderDto) {
    return 'This action adds a new hotelPurchaseOrder';
  }

  findAll() {
    return `This action returns all hotelPurchaseOrder`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hotelPurchaseOrder`;
  }

  update(id: number, updateHotelPurchaseOrderDto: UpdateHotelPurchaseOrderDto) {
    return `This action updates a #${id} hotelPurchaseOrder`;
  }

  remove(id: number) {
    return `This action removes a #${id} hotelPurchaseOrder`;
  }
}
