import { Test, TestingModule } from '@nestjs/testing';
import { HotelGuestsController } from './hotel-guests.controller';
import { HotelGuestsService } from './hotel-guests.service';

describe('HotelGuestsController', () => {
  let controller: HotelGuestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HotelGuestsController],
      providers: [HotelGuestsService],
    }).compile();

    controller = module.get<HotelGuestsController>(HotelGuestsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
