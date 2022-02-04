import {
  BadRequestException,
  ForbiddenException,
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
import { AuthLoginDto } from './dto/auth.login.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

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
      access_token,
      refresh_token,
    };
  }

  async login(login: AuthLoginDto): Promise<TokensDto> {
    const user = await this.userService.findOne({ username: login.username });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const authenticated = await bcrypt.compare(login.password, user.p_hash);
    if (!authenticated) {
      throw new ForbiddenException('Access denied');
    }
    const tokens = await this.genTokens(user.id, user.username);
    await this.updateRefreshToken(user.id, tokens.refresh_token);
    return tokens;
  }

  async logout(userId: string) {
    await this.userService.update(
      { id: userId },
      {
        refresh_token: null,
      },
    );
  }

  async signup(authDto: AuthSignupDto): Promise<TokensDto> {
    const hashedPassword = await bcrypt.hash(authDto.password, 10);
    const currentDate = new Date();
    const newUser = await this.userService.create({
      p_hash: hashedPassword,
      email: authDto.email,
      username: authDto.username,
      created_at: currentDate,
    });

    const tokens = await this.genTokens(newUser.id, newUser.username);
    await this.updateRefreshToken(newUser.id, tokens.refresh_token);
    return tokens;
  }

  async updateRefreshToken(userId: string, refresh_token: string) {
    const hash = await bcrypt.hash(refresh_token, 10);
    this.userService.update(
      { id: userId },
      {
        refresh_token: hash,
      },
    );
  }

  async refreshTokens(
    userId: string,
    refresh_token: string,
  ): Promise<TokensDto> {
    const user = await this.userService.findOne({ id: userId });
    if (!user) {
      throw new ForbiddenException('Access denied');
    }

    const refreshTokenMatch = await bcrypt.compare(
      refresh_token,
      user.refresh_token,
    );

    if (!refreshTokenMatch) {
      throw new ForbiddenException('Access denied');
    }

    const tokens = await this.genTokens(user.id, user.username);
    await this.updateRefreshToken(user.id, tokens.refresh_token);
    return tokens;
  }
}
