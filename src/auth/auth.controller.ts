import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() signUpDto: AuthDto) {
    return this.authService.signUp(signUpDto);
  }

  @Post('login')
  async login(@Body() signUpDto: AuthDto) {
    return this.authService.login(signUpDto);
  }
}
