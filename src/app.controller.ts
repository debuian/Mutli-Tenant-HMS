import { BadRequestException, Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('success')
  getSuccess() {
    return { data: 'hi' };
  }

  @Get('error')
  getError() {
    throw new Error('Jus an Error');
    // throw new BadRequestException();
    throw new BadRequestException(
      'An user friendly message that could be sent to frontend or user',
    );
    throw new BadRequestException(
      'An user friendly message that could be sent to frontend or user',
      {
        description: 'dexription of error',
        cause: ['array of strinng that mention causes []', 'abcd'],
      },
    );

    // response.error and  options.description are similar and when i mention cause i get nan cause opptions in my exp
  }
}
