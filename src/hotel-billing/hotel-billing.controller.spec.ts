import { Test, TestingModule } from '@nestjs/testing';
import { HotelBillingController } from './hotel-billing.controller';
import { HotelBillingService } from './hotel-billing.service';

describe('HotelBillingController', () => {
  let controller: HotelBillingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HotelBillingController],
      providers: [HotelBillingService],
    }).compile();

    controller = module.get<HotelBillingController>(HotelBillingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
