import { Test, TestingModule } from '@nestjs/testing';
import { HotelReceiptsService } from './hotel-receipts.service';

describe('HotelReceiptsService', () => {
  let service: HotelReceiptsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HotelReceiptsService],
    }).compile();

    service = module.get<HotelReceiptsService>(HotelReceiptsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
