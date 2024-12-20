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
import { QueryFailedError } from 'typeorm';
import { formatQueryException } from './helper/query-exception.helper';
import { formatHttpException } from './helper/http-exception.helper';

@Catch()
export class GobalExceptionFilter implements ExceptionFilter {
  constructor(private httpAdpaterHost: HttpAdapterHost) {}
  catch(exception: any, host: ArgumentsHost) {
    console.log('****************************');
    console.log(exception);
    console.log('****************************');

    const ctx = host.switchToHttp();
    const resposne = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    //Setting Default value
    let defaultStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    let defaultMessage = 'Internal Server Error';

    let defaultOptions: { description: string; cause: string | string[] } = {
      description: 'A default description',
      cause: ['An array of unknown error occurred'],
    };
    let APIErrorObject;

    APIErrorObject = {
      name: exception.name,
      status: exception.status || defaultStatus,
      options: defaultOptions,
    };

    if (exception instanceof HttpException) {
      const httpErrorOptions = formatHttpException(exception);
      defaultMessage = httpErrorOptions.message;
      APIErrorObject = httpErrorOptions.error;
    }

    if (exception instanceof QueryFailedError) {
      const options = formatQueryException(exception);
      defaultMessage = options.message;
      APIErrorObject = options.error;
    }

    // Sending the Acutcal Response

    const { httpAdapter } = this.httpAdpaterHost;
    const responsePayload: GlobalResponse<any> = {
      success: false,
      statusCode: exception.status || defaultStatus,
      message: defaultMessage || exception.message,
      data: [],
      path: request.path,
      error: APIErrorObject,
    };
    httpAdapter.reply(resposne, responsePayload, defaultStatus);
  }
}
