import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { SwaggerApiTag } from './../utils/swagger.utils';
import { AuthService } from './auth.service';
import { AuthDto, LoginResponse, SignUpResponse } from './dto/auth.dto';

@Controller('auth')
@ApiTags(SwaggerApiTag.AUTH)
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiResponse({ type: SignUpResponse })
  @Post('sign-up')
  async signUp(@Body() dto: AuthDto): Promise<SignUpResponse> {
    return this.authService.signUp(dto);
  }

  @ApiResponse({ type: LoginResponse })
  @Post('login')
  async login(@Body() dto: AuthDto): Promise<LoginResponse> {
    return this.authService.login(dto);
  }
}
