import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export class JwtAuthGuard extends AuthGuard('jwt') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('Inside JwtAuthGuard');
    try {
      const result = await super.canActivate(context);
      console.log('Authentication result:', result);
      return result as boolean;
    } catch (error) {
      console.error('Authentication error:', error);
      throw new UnauthorizedException('Invalid JWT Token', {
        description: 'Invalid JWt Token',
        cause: [
          'No token Found inside Auth Header',
          'Expried/ Invalid Jwt Token',
        ],
      });
    }
  }
}
