import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'abcd',
    });
  }

  async validate(payload: any) {
    console.log('Inside JWT Strategy Validate Method');
    console.log('Payload:', payload);
    console.log('Authenticated User ID:', payload.payload.hotelId);

    return { HotelId: payload.payload.hotelId };
  }
}
