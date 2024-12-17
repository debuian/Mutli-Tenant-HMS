import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email', // Explicitly specify email as the username field
      passwordField: 'password', // Explicitly specify password field
    });
  }

  async validate(email: string, password: string) {
    console.log('Validate method called with:', { email, password });
    try {
      const user = await this.authService.ValidateHotel({ email, password });

      console.log('Validation result:', user);
      return user;
    } catch (error) {
      console.error('Validation error:', error);
      throw error;
    }
  }
}
