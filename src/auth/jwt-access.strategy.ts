import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class jwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'qwer',
      passReqToCallback: true,
    });
  }

  async validate(_, payload) {
    console.log(2);
    if (payload.exp < new Date().getTime() / 1000)
      throw new UnauthorizedException('만료된 토큰입니다.');
    return {
      id: payload.id,
      email: payload.email,
      sub: payload.sub,
      exp: payload.exp,
    };
  }
}