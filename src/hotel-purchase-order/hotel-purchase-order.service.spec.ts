import { Test, TestingModule } from '@nestjs/testing';
import { HotelPurchaseOrderService } from './hotel-purchase-order.service';

describe('HotelPurchaseOrderService', () => {
  let service: HotelPurchaseOrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HotelPurchaseOrderService],
    }).compile();

    service = module.get<HotelPurchaseOrderService>(HotelPurchaseOrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
