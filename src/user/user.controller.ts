import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { AccessTokenGuard } from './../auth/guards/accessToken.guard';
import { SwaggerApiTag } from './../utils/swagger.utils';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@ApiTags(SwaggerApiTag.USERS)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiResponse({ type: UserDto })
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Get('me')
  async getMe(@Req() req: Request): Promise<UserDto> {
    const userId = req['user']['sub'] as number;

    const user = await this.userService.findById(userId);

    delete user.password;
    delete user.refreshToken;

    return user;
  }
}
