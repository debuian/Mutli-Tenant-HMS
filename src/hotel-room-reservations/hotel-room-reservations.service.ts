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
import { HotelRoomStatus } from 'src/hotel-room/entities/hotelRoom.entity';
import { HotelBillingService } from 'src/hotel-billing/hotel-billing.service';
import { RoomBookinBillingDto } from 'src/hotel-billing/dto/room-booking.dto';
import { UpdateHotelRoomDto } from 'src/hotel-room/dto/update-hotel-room.dto';

@Injectable()
export class HotelRoomReservationsService {
  constructor(
    @InjectRepository(HotelRoomReservationEntity)
    private readonly hotelRoomreservationRepo: Repository<HotelRoomReservationEntity>,
    private hotelService: HotelService,
    private hotelRoomService: HotelRoomService,
    private hotelGuestsService: HotelGuestsService,
    private readonly hotelBillingService: HotelBillingService,
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
          const hotelRoom = await this.hotelRoomService.findByIdWithTransaction(
            hotelRoomId,
            transactionalEntityManager,
          );
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
          const hotel = hotelResult.value;
          const hotelGuest = hotelGuestResult.value;
          // Creating Reservation
          const newReservation = this.hotelRoomreservationRepo.create({
            hotel: { id: hotel.id },
            hotelRoom: { id: hotelRoom.id },
            hotelGuest: { id: hotelGuest.id },
            check_in_date,
            check_out_date,
          });
          const savedReservation = await transactionalEntityManager.save(
            HotelRoomReservationEntity,
            newReservation,
          );
          await this.hotelRoomService.changeRoomStatusWithTransaction(
            hotelRoom.id,
            { hotelId: hotel.id, status: HotelRoomStatus.Booked },
            transactionalEntityManager,
          );
          // Setting Parameter of Billing Service or Sales order Transaction and Invoice
          // Convert the difference from milliseconds to days
          // Creating Bills
          const differenceInTime =
            checkOutDate.getTime() - checkInDate.getTime();
          const totalNumberOfNights = differenceInTime / (1000 * 3600 * 24);
          const totalPrice = totalNumberOfNights * hotelRoom.pricePerNight;
          const currentDate = new Date();

          const roomBookingDtO: RoomBookinBillingDto = {
            hotel_id: hotel.id,
            hotel_room_reservation_id: savedReservation.id,
            order_date: currentDate,
            order_total_price: totalPrice,
            quantity: totalNumberOfNights,
            unit_price: hotelRoom.pricePerNight,
            invoiceDueDate: checkOutDate,
          };

          const HotelBillingInfo =
            await this.hotelBillingService.processRoomBookingBilling(
              roomBookingDtO,
              transactionalEntityManager,
            );

          return { savedReservation, HotelBillingInfo };
        },
      );
    return hotelReservationInfo;
  }
  async validateReservationDates(checkInDate: Date, checkOutDate: Date) {
    if (checkOutDate <= checkInDate) {
      throw new BadRequestException('Invalid date range', {
        description: 'Date Validation Failed',
        cause: `Check-out date must be after check-in date. Check-out Date = ${checkOutDate} and Check-in Date = ${checkInDate} `,
      });
    }

    if (checkInDate < new Date()) {
      throw new BadRequestException('Invalid check-in date', {
        description: 'Date Validation Failed',
        cause: `Check-in date cannot be in the past.Date ${checkInDate}`,
      });
    }
    return true;
  }
}
