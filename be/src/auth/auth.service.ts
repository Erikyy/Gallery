import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { AuthPayloadDto } from './dto/auth.payload.dto';
import { Prisma, User } from '@prisma/client';
import { AuthUserDto } from './dto/auth.user.dto';
import { AuthSignupDto } from './dto/auth.signup.dto';
import { TokensDto } from './dto/token.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  private async genAccessToken(payload: AuthUserDto) {
    return this.jwtService.signAsync(payload);
  }

  private async genRefreshToken(payload: AuthPayloadDto) {
    return this.jwtService.signAsync(payload);
  }

  private async genTokens(
    userId: string,
    username: string,
  ): Promise<TokensDto> {
    const access_token = await this.jwtService.signAsync(
      {
        sub: userId,
        username,
      },
      {
        expiresIn: 60 * 15,
        secret: process.env.JWT_SECRET,
      },
    );
    const refresh_token = await this.jwtService.signAsync(
      {
        sub: userId,
        username,
      },
      {
        expiresIn: 60 * 60 * 24 * 7,
        secret: process.env.REFRESH_TOKEN_SECRE,
      },
    );
    return {
      access_token: '',
      refresh_token: '',
    };
  }

  async login() {}
  async logout() {}
  async signup(authDto: AuthSignupDto): Promise<TokensDto> {
    const hashedPassword = await bcrypt.hash(authDto.password, 10);
    const currentDate = new Date();
    const newUser = this.userService.create({
      p_hash: hashedPassword,
      email: authDto.email,
      username: authDto.username,
      created_at: currentDate,
    });

    return {
      access_token: '',
      refresh_token: '',
    };
  }
  async refreshTokens() {}
}
