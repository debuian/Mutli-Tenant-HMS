import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import e, { Request, Response } from 'express';
import { GlobalResponse } from '../interceptors/global-response.dto';

@Catch()
export class GobalExceptionFilter implements ExceptionFilter {
  constructor(private httpAdpaterHost: HttpAdapterHost) {}
  catch(exception: any, host: ArgumentsHost) {
    console.log(exception);
    const ctx = host.switchToHttp();
    const resposne = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let defaultStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    let defaultMessage: string = 'Internal Server Error';
    let defaultOptions: { description: string; cause: string | string[] } = {
      description: 'A default description',
      cause: ['An array of unknown error occurred'],
    };

    if (exception instanceof HttpException) {
      defaultStatus = exception.getStatus();
      defaultMessage = exception.message;
      const errorResponse = exception.getResponse();
      if (typeof errorResponse === 'object' && 'error' in errorResponse) {
        defaultOptions.description = errorResponse.error as string;
      }
      if (typeof errorResponse === 'object' && 'message' in errorResponse) {
        defaultOptions.cause = errorResponse.message as string[];
      }
    }
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
