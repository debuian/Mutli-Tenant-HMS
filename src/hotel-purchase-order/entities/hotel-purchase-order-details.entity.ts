import { GobalBaseEntity } from 'src/global/entity/BaseEntity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { HotelPurchaseOrderEntity } from './hotel-purchase-order.entity';

@Entity({ name: 'hotel_purchase_order_details' })
export class HotelPurchaseOrderDetailsEntity extends GobalBaseEntity {
  @ManyToOne(
    () => HotelPurchaseOrderEntity,
    (hotelPurchaseOrder) => hotelPurchaseOrder.hotelPurchaseOrderDetails,
    {
      onDelete: 'CASCADE',
      nullable: false,
    },
  )
  hotelPurchaseOrder: HotelPurchaseOrderEntity;

  @Column()
  quantity: number; // Corrected typo: 'qauntity' -> 'quantity'

  @Column('decimal', { precision: 10, scale: 2 })
  unit_price: number;
}
