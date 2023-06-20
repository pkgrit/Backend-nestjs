import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      secretOrKey: 'secretkey',
      // jwtFormRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      jwtFromRequest: (req: Request) => {
        const authHeader = req.headers['authorization'];
        const jwtToken = authHeader?.split(' ')[1];
        // console.log(jwtToken);
        return jwtToken;
      },
    });
  }

  async validate(payload: any, done: VerifiedCallback) {
    const user = await this.authService.validateUser(payload);
    if (!user) {
      return done(
        new HttpException('Unauthorized user', HttpStatus.UNAUTHORIZED),
      );
    }
    // return done(null, user, payload.iat);
    return { user };
  }
}
