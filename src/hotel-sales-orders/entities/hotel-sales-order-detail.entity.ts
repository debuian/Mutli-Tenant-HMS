import { GobalBaseEntity } from 'src/global/entity/BaseEntity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { HotelSalesOrderEntity } from './hotel-sales-order.entity';

@Entity({ name: 'hotel_sales_order_details' })
export class HotelSalesOrderDetails extends GobalBaseEntity {
  @ManyToOne(
    () => HotelSalesOrderEntity,
    (hotelSalesOrder) => hotelSalesOrder.hotelSalesOrderDetails,
    {
      onDelete: 'CASCADE',
      nullable: false,
    },
  )
  hotelSalesOrder: HotelSalesOrderEntity;

  @Column()
  quantity: number; // Corrected typo: 'qauntity' -> 'quantity'

  @Column('decimal', { precision: 10, scale: 2 })
  unit_price: number;
}
