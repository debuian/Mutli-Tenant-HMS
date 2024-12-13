import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Request, Response } from 'express';
import { GlobalResponse } from '../interceptors/global-response.dto';

@Catch()
export class GobalExceptionFilter implements ExceptionFilter {
  constructor(private httpAdpaterHost: HttpAdapterHost) {}
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const resposne = ctx.getResponse<Response>();
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let msg = 'Internal Server Error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      msg = exception.message;
    }

    const { httpAdapter } = this.httpAdpaterHost;
    const responsePayload: GlobalResponse<any> = {
      statusCode: status,
      message: msg,
    };
    httpAdapter.reply(resposne, responsePayload, status);
  }
}
