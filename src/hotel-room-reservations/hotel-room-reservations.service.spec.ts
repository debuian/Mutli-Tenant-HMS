import { Test, TestingModule } from '@nestjs/testing';
import { HotelRoomReservationsService } from './hotel-room-reservations.service';

describe('HotelRoomReservationsService', () => {
  let service: HotelRoomReservationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HotelRoomReservationsService],
    }).compile();

    service = module.get<HotelRoomReservationsService>(HotelRoomReservationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
