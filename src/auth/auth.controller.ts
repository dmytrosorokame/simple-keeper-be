import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  async signUp(
    @Body() signUpDto: AuthDto,
  ): Promise<{ email: string; userId: number }> {
    return this.authService.signUp(signUpDto);
  }

  @Post('login')
  async login(@Body() signUpDto: AuthDto): Promise<{ access_token: string }> {
    return this.authService.login(signUpDto);
  }
}
