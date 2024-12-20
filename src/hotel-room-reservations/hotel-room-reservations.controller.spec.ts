import { Test, TestingModule } from '@nestjs/testing';
import { HotelRoomReservationsController } from './hotel-room-reservations.controller';
import { HotelRoomReservationsService } from './hotel-room-reservations.service';

describe('HotelRoomReservationsController', () => {
  let controller: HotelRoomReservationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HotelRoomReservationsController],
      providers: [HotelRoomReservationsService],
    }).compile();

    controller = module.get<HotelRoomReservationsController>(HotelRoomReservationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
