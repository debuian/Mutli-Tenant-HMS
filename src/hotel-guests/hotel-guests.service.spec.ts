import { Test, TestingModule } from '@nestjs/testing';
import { HotelGuestsService } from './hotel-guests.service';

describe('HotelGuestsService', () => {
  let service: HotelGuestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HotelGuestsService],
    }).compile();

    service = module.get<HotelGuestsService>(HotelGuestsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
