import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly ConfigService: ConfigService,
  ) {}

  @Get()
  getHello() {
    const value = this.ConfigService.get('POSTGRES_HOST');
    console.log(value);
    return { data: 'hi' };
  }

  @Get()
  getSuccess() {}
}
