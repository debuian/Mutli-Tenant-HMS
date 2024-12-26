import { Test, TestingModule } from '@nestjs/testing';
import { HotelBillingService } from './hotel-billing.service';

describe('HotelBillingService', () => {
  let service: HotelBillingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HotelBillingService],
    }).compile();

    service = module.get<HotelBillingService>(HotelBillingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
