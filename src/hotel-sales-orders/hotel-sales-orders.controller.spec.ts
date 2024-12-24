import { Test, TestingModule } from '@nestjs/testing';
import { HotelSalesOrdersController } from './hotel-sales-orders.controller';
import { HotelSalesOrdersService } from './hotel-sales-orders.service';

describe('HotelSalesOrdersController', () => {
  let controller: HotelSalesOrdersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HotelSalesOrdersController],
      providers: [HotelSalesOrdersService],
    }).compile();

    controller = module.get<HotelSalesOrdersController>(HotelSalesOrdersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
