import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsDecimal,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

export class CreateHotelSalesOrderDetailDto {
  quantity: number;

  @IsDecimal()
  unit_price: number;
}

export class CreateHotelSalesOrderDto {
  hotel_id: number;
  hotel_room_reservation_id: number;

  @IsArray()
  @Type(() => CreateHotelSalesOrderDetailDto)
  @ValidateNested()
  hotelSalesOrderDetails: CreateHotelSalesOrderDetailDto[];

  @IsDate()
  order_date: Date;

  @IsDecimal()
  @Min(0)
  order_total_price: number;

  @IsString()
  order_status: string;
}
