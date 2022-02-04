import { UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authservice: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    //const user = await this.authservice.validateUser(username, password);
    //if (!user) {
    //  throw new UnauthorizedException();
    //}
    //return user;
  }
}
