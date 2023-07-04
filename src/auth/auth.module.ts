import { PrismaService } from './../prisma.service';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '30s' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [PrismaService, AuthService],
})
export class AuthModule {}
