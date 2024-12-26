export class RoomBookingDto {
  hotel_id: number;
  hotel_room_reservation_id: number;
  order_date: Date;
  order_total_price: number;
  quantity: number;
  unit_price: number;
  invoiceDueDate: Date;
}
export class PaymentDto {
  invoiceId: number;
  method: string;
  paid_amount: number;
}
