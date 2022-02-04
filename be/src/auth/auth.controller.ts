import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthSignupDto } from './dto/auth.signup.dto';
import { TokensDto } from './dto/token.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtRefreshTokenGuard } from './jwt-refresh.guard';
import { LocalAuthGuard } from './local.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    await this.authService.login();
    return req.user;
  }

  @Post('/signup')
  async signup(@Body() req: AuthSignupDto): Promise<TokensDto> {
    return await this.authService.signup(req);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/logout')
  async logout() {
    await this.authService.logout();
  }

  @UseGuards(JwtRefreshTokenGuard)
  @Post('/validate')
  async refreshToken(@Body() req) {
    await this.authService.refreshTokens();
  }
}
