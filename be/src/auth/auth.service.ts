import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { AuthPayloadDto } from './dto/auth.payload.dto';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}
  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userService.findOne({ username });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const authorized = await bcrypt.compare(password, user.p_hash);
    if (!authorized) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async login(username: string, password: string): Promise<AuthPayloadDto> {
    const user = await this.validateUser(username, password);

    const payload = {
      userId: user.id,
    };
    const token = this.jwtService.sign(payload);
    return {
      access_token: token,
      user: user.username,
      expiresIn: '',
    };
  }

  async signup(): Promise<AuthPayloadDto> {
    return {
      access_token: '',
      user: '',
      expiresIn: '',
    };
  }
}
