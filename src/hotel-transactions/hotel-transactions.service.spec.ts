import { Test, TestingModule } from '@nestjs/testing';
import { HotelTransactionsService } from './hotel-transactions.service';

describe('HotelTransactionsService', () => {
  let service: HotelTransactionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HotelTransactionsService],
    }).compile();

    service = module.get<HotelTransactionsService>(HotelTransactionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
