import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateHotelRoomReservationDto } from './dto/create-hotel-room-reservation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { HotelRoomReservationEntity } from './entities/hotel-room-reservation.entity';
import { Repository } from 'typeorm';
import { HotelService } from 'src/hotel/hotel.service';
import { HotelGuestsService } from 'src/hotel-guests/hotel-guests.service';
import { HotelRoomService } from 'src/hotel-room/hotel-room.service';
import { HotelSalesOrdersService } from 'src/hotel-sales-orders/hotel-sales-orders.service';
import { HotelRoomStatus } from 'src/hotel-room/entities/hotelRoom.entity';

@Injectable()
export class HotelRoomReservationsService {
  constructor(
    @InjectRepository(HotelRoomReservationEntity)
    private readonly hotelRoomreservationRepo: Repository<HotelRoomReservationEntity>,
    private hotelService: HotelService,
    private hotelRoomService: HotelRoomService,
    private hotelGuestsService: HotelGuestsService,
    private hotelSalesOrdersService: HotelSalesOrdersService,
  ) {}
  async create(createHotelRoomReservationDto: CreateHotelRoomReservationDto) {
    const {
      hotelRoomId,
      hotelId,
      hotelGuestId,
      check_in_date,
      check_out_date,
    } = createHotelRoomReservationDto;

    const checkInDate = new Date(check_in_date);
    const checkOutDate = new Date(check_out_date);
    await this.validateReservationDates(checkInDate, checkOutDate);
    const hotelReservationInfo =
      await this.hotelRoomreservationRepo.manager.transaction(
        async (transactionalEntityManager) => {
          const hotelRoom = await this.hotelRoomService.findById(hotelRoomId);
          if (!hotelRoom) {
            throw new NotFoundException('Hotel room not found', {
              description: 'Room Lookup Failed',
              cause: `Room with ID ${hotelRoomId} does not exist`,
            });
          }
          if (hotelRoom.hotel.id !== hotelId) {
            throw new UnauthorizedException(
              'Cannot book room from different hotel',
              {
                description: 'Hotel Validation Failed',
                cause: `Room ${hotelRoomId} does not belong to hotel ${hotelId}`,
              },
            );
          }
          if (hotelRoom.status.trim() !== HotelRoomStatus.Available) {
            throw new BadRequestException(
              'The room is not available for booking',
              {
                description: 'Room Status Conflict',
                cause: `Room with ID ${hotelRoom.id} has status ${hotelRoom.status}`,
              },
            );
          }

          const [hotelResult, hotelGuestResult] = await Promise.allSettled([
            this.hotelService.findById(hotelId),
            this.hotelGuestsService.findById(hotelGuestId),
          ]);
          if (
            hotelResult.status !== 'fulfilled' ||
            hotelGuestResult.status !== 'fulfilled'
          ) {
            throw new BadRequestException(
              'Failed to fetch hotel or guest information',
              {
                description: 'Lookup Failed',
                cause: 'One or more required lookups failed',
              },
            );
          }
          if (!hotelResult.value) {
            throw new NotFoundException('Hotel not found', {
              description: 'Hotel Lookup Failed',
              cause: `Hotel with ID ${hotelId} does not exist`,
            });
          }

          if (!hotelGuestResult.value) {
            throw new NotFoundException('Guest does not exist', {
              description: 'Hotel Guest Lookup Failed',
              cause: `Hotel Guest with ID ${hotelGuestId} does not exist`,
            });
          }
          const hotelValue = hotelResult.value;
          const hotelGuestValue = hotelGuestResult.value;

          const newReservation = this.hotelRoomreservationRepo.create({
            hotel: { id: hotelValue.id },
            hotelRoom: { id: hotelRoom.id },
            hotelGuest: { id: hotelGuestValue.id },
            check_in_date,
            check_out_date,
          });
          const savedReservation = await transactionalEntityManager.save(
            HotelRoomReservationEntity,
            newReservation,
          );

          const salesOrderDto = {
            hotel_id: hotelValue.id,
            hotel_room_reservation_id: savedReservation.id,
            hotelSalesOrderDetails: [
              { quantity: 1, unit_price: hotelRoom.pricePerNight },
            ],
            order_date: new Date(),
            order_total_price: hotelRoom.pricePerNight,
            order_status: 'PENDING',
          };
          const newSalesOrder =
            await this.hotelSalesOrdersService.createWithTransaction(
              salesOrderDto,
              transactionalEntityManager,
            );
          await this.hotelRoomService.changeRoomStatusWithTransaction(
            hotelRoom.id,
            HotelRoomStatus.Booked,
            transactionalEntityManager,
          );
          return savedReservation;
        },
      );
    return hotelReservationInfo;
  }
  async validateReservationDates(checkInDate: Date, checkOutDate: Date) {
    if (checkOutDate <= checkInDate) {
      throw new BadRequestException('Invalid date range', {
        description: 'Date Validation Failed',
        cause: 'Check-out date must be after check-in date',
      });
    }

    if (checkInDate < new Date()) {
      throw new BadRequestException('Invalid check-in date', {
        description: 'Date Validation Failed',
        cause: 'Check-in date cannot be in the past',
      });
    }
    return true;
  }
}
