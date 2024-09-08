import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface';
import { UserService } from '../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: '13kalsd1weWQE_1231kl', // Use an environment variable for the secret in production
    });
  }

  async validate(payload: JwtPayload) {
    console.log(payload);
    const user = await this.userService.findByUsername(payload.username);
    // if (!user) {
    //   throw new UnauthorizedException('User not found or invalid token');
    // }
    return "user"; // Attach the validated user to the request object
  }
}
