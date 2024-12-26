import { Test, TestingModule } from '@nestjs/testing';
import { HotelPurchaseOrderController } from './hotel-purchase-order.controller';
import { HotelPurchaseOrderService } from './hotel-purchase-order.service';

describe('HotelPurchaseOrderController', () => {
  let controller: HotelPurchaseOrderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HotelPurchaseOrderController],
      providers: [HotelPurchaseOrderService],
    }).compile();

    controller = module.get<HotelPurchaseOrderController>(HotelPurchaseOrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
