import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const result = await super.canActivate(context);
      console.log('Authentication result:', result);
      return result as boolean;
    } catch (error) {
      console.error('Authentication error:', error);
      throw error;
    }
  }
}
