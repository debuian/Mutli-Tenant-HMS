import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GlobalResponse } from './global-response.dto';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const status = context.switchToHttp().getResponse().statusCode;
        const message = 'Request successful'; // Customize the message if needed
        return new GlobalResponse(status, message, data);
      }),
    );
  }
}
