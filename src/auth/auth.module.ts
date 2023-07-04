import { PrismaService } from './../prisma.service';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [PrismaService, AuthService],
})
export class AuthModule {}
