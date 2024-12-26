import { Module } from '@nestjs/common';
import { HotelBillingService } from './hotel-billing.service';
import { HotelBillingController } from './hotel-billing.controller';
import { HotelInvoicesModule } from 'src/hotel-invoices/hotel-invoices.module';
import { HotelTransactionsModule } from 'src/hotel-transactions/hotel-transactions.module';
import { HotelSalesOrdersModule } from 'src/hotel-sales-orders/hotel-sales-orders.module';
import { HotelPurchaseOrderModule } from 'src/hotel-purchase-order/hotel-purchase-order.module';
import { HotelReceiptsModule } from 'src/hotel-receipts/hotel-receipts.module';

@Module({
  imports: [
    HotelSalesOrdersModule,
    HotelTransactionsModule,
    HotelInvoicesModule,
    HotelPurchaseOrderModule,
    HotelReceiptsModule,
  ],
  controllers: [HotelBillingController],
  providers: [HotelBillingService],
  exports: [HotelBillingService],
})
export class HotelBillingModule {}
