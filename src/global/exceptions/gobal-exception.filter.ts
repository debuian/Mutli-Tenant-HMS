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
    const resposne = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let defaultStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    let defaultMessage = 'Internal Server Error';
    let defaultOptions: { description: string; cause: string | string[] } = {
      description: '',
      cause: '',
    };
    //Checking for  instanceof HttpException
    if (exception instanceof HttpException) {
      defaultStatus = exception.getStatus();
      defaultMessage = exception.message;
    }
    // Checking for options obj in exception if it is there and attatch it
    if (
      exception.options != undefined &&
      Object.keys(exception.options).length > 0
    ) {
      defaultOptions = exception.options;
    }

    const { httpAdapter } = this.httpAdpaterHost;

    const APIErrorObject = {
      name: exception.name,
      status: exception.status || defaultStatus,
      message: exception.message || defaultMessage,
      options: defaultOptions,
    };

    const responsePayload: GlobalResponse<any> = {
      success: false,
      statusCode: exception.status || defaultStatus,
      message: exception.message || defaultMessage,
      data: [],
      path: request.path,
      error: APIErrorObject,
    };

    httpAdapter.reply(resposne, responsePayload, defaultStatus);
  }
}
