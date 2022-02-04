import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth.login.dto';
import { AuthSignupDto } from './dto/auth.signup.dto';
import { TokensDto } from './dto/token.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtRefreshTokenGuard } from './jwt-refresh.guard';
import { LocalAuthGuard } from './local.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() req: AuthLoginDto): Promise<TokensDto> {
    return await this.authService.login(req);
  }

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() req: AuthSignupDto): Promise<TokensDto> {
    return await this.authService.signup(req);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout() {
    return await this.authService.logout('');
  }

  @UseGuards(JwtRefreshTokenGuard)
  @Post('validate')
  @HttpCode(HttpStatus.OK)
  async refreshToken(@Body() req) {
    return await this.authService.refreshTokens();
  }
}
