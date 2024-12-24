import { Test, TestingModule } from '@nestjs/testing';
import { HotelInvoicesController } from './hotel-invoices.controller';
import { HotelInvoicesService } from './hotel-invoices.service';

describe('HotelInvoicesController', () => {
  let controller: HotelInvoicesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HotelInvoicesController],
      providers: [HotelInvoicesService],
    }).compile();

    controller = module.get<HotelInvoicesController>(HotelInvoicesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
