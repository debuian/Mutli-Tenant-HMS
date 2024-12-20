import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { GlobalResponse } from './global-response.dto';
import { Request } from 'express';

@Injectable()
export class GlobalResponseInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const cxt = context.switchToHttp();
    const request = cxt.getRequest<Request>();

    return next.handle().pipe(
      map((data) => {
        const status = cxt.getResponse().statusCode;
        let { message, ...ControllerResponseData } = data;
        if (!message) {
          message = 'Request Successful';
        }
        console.log('ControllerResponseData', ControllerResponseData);
        const responsePayload: GlobalResponse<any> = {
          success: true,
          statusCode: status,
          message: message,
          data: [ControllerResponseData],
          path: request.path,
          error: {},
        };
        return responsePayload;
      }),
      catchError((err) => {
        return throwError(() => err);
      }),
    );
  }
}
