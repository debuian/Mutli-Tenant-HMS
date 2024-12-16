import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  getHello() {
    const value = this.configService.get('databaseConfig');
    console.log(value);
    return { data: 'hi' };
  }

  @Get()
  getSuccess() {}
}
