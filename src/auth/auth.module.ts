import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { ConfigModule } from '../config/config.module';

import { PrismaService } from './../prisma.service';
import { UserService } from './../user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';

@Module({
  imports: [ConfigModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [
    PrismaService,
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    UserService,
  ],
})
export class AuthModule {}
