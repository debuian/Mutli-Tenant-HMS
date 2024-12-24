import { Test, TestingModule } from '@nestjs/testing';
import { HotelSalesOrdersService } from './hotel-sales-orders.service';

describe('HotelSalesOrdersService', () => {
  let service: HotelSalesOrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HotelSalesOrdersService],
    }).compile();

    service = module.get<HotelSalesOrdersService>(HotelSalesOrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
