import { Test, TestingModule } from '@nestjs/testing';
import { HotelInvoicesService } from './hotel-invoices.service';

describe('HotelInvoicesService', () => {
  let service: HotelInvoicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HotelInvoicesService],
    }).compile();

    service = module.get<HotelInvoicesService>(HotelInvoicesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
