import { BadGatewayException, Controller, Get } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  async get() {
    // throw new BadGatewayException();
    return 'Hello from Admin controller';
  }
}
