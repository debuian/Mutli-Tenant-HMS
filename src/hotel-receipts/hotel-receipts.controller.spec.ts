import { Test, TestingModule } from '@nestjs/testing';
import { HotelReceiptsController } from './hotel-receipts.controller';
import { HotelReceiptsService } from './hotel-receipts.service';

describe('HotelReceiptsController', () => {
  let controller: HotelReceiptsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HotelReceiptsController],
      providers: [HotelReceiptsService],
    }).compile();

    controller = module.get<HotelReceiptsController>(HotelReceiptsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
