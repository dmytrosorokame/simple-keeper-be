import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { SwaggerApiTag } from './../utils/swagger.utils';
import { AuthService } from './auth.service';
import { AuthDto, AuthResponse } from './dto/auth.dto';
import { AccessTokenGuard } from './guards/accessToken.guard';
import { RefreshTokenGuard } from './guards/refreshToken.guard';

@ApiTags(SwaggerApiTag.AUTH)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiResponse({ type: AuthResponse })
  @Post('sign-up')
  async signUp(@Body() dto: AuthDto): Promise<AuthResponse> {
    return this.authService.signUp(dto);
  }

  @ApiResponse({ type: AuthResponse })
  @Post('login')
  async login(@Body() dto: AuthDto): Promise<AuthResponse> {
    return this.authService.login(dto);
  }

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Get('logout')
  logout(@Req() req: Request): Promise<void> {
    const userId = req['user']['sub'] as number;

    return this.authService.logout(userId);
  }

  @ApiResponse({ type: AuthResponse })
  @ApiBearerAuth()
  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@Req() req: Request): Promise<AuthResponse> {
    const userId = req['user']['sub'] as number;
    const refreshToken = req['user']['refreshToken'] as string;

    return this.authService.refreshTokens(userId, refreshToken);
  }
}
