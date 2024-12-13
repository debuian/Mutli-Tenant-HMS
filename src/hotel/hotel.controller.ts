import {
  Controller,
  Get,
  Inject,
  Optional,
  Req,
  Request,
} from '@nestjs/common';
import { AppService } from 'src/app.service';

@Controller()
export class hotelController {
  constructor(@Optional() private appService: AppService) {}
  @Get()
  async getProfile(@Request() req) {
    return 'Hello from hotel controller';
  }
}
