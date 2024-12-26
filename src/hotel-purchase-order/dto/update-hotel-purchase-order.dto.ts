import { PartialType } from '@nestjs/mapped-types';
import { CreateHotelPurchaseOrderDto } from './create-hotel-purchase-order.dto';

export class UpdateHotelPurchaseOrderDto extends PartialType(CreateHotelPurchaseOrderDto) {}
