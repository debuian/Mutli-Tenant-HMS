import { Test, TestingModule } from '@nestjs/testing';
import { HotelTransactionsController } from './hotel-transactions.controller';
import { HotelTransactionsService } from './hotel-transactions.service';

describe('HotelTransactionsController', () => {
  let controller: HotelTransactionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HotelTransactionsController],
      providers: [HotelTransactionsService],
    }).compile();

    controller = module.get<HotelTransactionsController>(HotelTransactionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
