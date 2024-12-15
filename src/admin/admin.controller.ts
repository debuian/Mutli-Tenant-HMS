import {
  BadGatewayException,
  Controller,
  Get,
  UnauthorizedException,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { refCount } from 'rxjs';

@Controller()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('')
  async get() {
    // throw new UnauthorizedException('Admin is not Unauthorized', {
    //   description: 'kvho k vho',
    //   cause: ['1', 2],
    // });
    // throw new BadGatewayException();
    throw new Error('Just an Error');
    // return { data: 'Hello from Admin controller' };
    // return {
    //   message: 'Admin logged in successfully',
    //   id: 1,
    //   Admin_data: {
    //     id: 1,
    //     authdetials: {
    //       sessionId: 1,
    //     },
    //   },
    //   UserProfiel_data: {
    //     id: 1,
    //   },
    // };
    // return {
    //   message: 'Admin logged in successfully',
    //   data: {
    //     id: 1,
    //   },
    // };
  }
}
