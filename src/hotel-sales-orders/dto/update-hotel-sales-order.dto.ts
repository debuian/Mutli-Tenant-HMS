import { PartialType } from '@nestjs/mapped-types';
import { CreateHotelSalesOrderDto } from './create-hotel-sales-order.dto';

export class UpdateHotelSalesOrderDto extends PartialType(CreateHotelSalesOrderDto) {}
