import {
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const result = await super.canActivate(context);
      console.log('Authentication result:', result);
      return result as boolean;
    } catch (error) {
      console.error('Authentication error:', error);
      // if (error instanceof NotFoundException) {
      //   console.log(error.getResponse());
      //   throw new NotFoundException('User Not Found', {
      //     description: 'User with that email not FOund',
      //     cause: 'Invalid email',
      //   });
      // }
      throw error;
    }
  }
}
