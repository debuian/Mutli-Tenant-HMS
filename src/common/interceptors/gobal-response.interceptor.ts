import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NotAcceptableException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { GlobalResponse } from './global-response.dto';
import { log } from 'node:console';

@Injectable()
export class GobalResponseInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const cxt = context.switchToHttp();
    const request = cxt.getRequest();
    console.log(request.path);

    return next.handle().pipe(
      map((data) => {
        console.log(data);
        const status = cxt.getResponse().statusCode;
        const message = 'Request successful'; // Customize the message if needed
        return new GlobalResponse(status, message, data);
      }),
      catchError((err) => {
        return throwError(() => {
          console.log('Intercepot', err.status);
          return new NotAcceptableException();
        });
      }),
    );
  }
}
