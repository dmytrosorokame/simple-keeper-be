import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import * as argon2 from 'argon2';

import { UserService } from './../user/user.service';
import { generatePassword } from './../utils/generate-password.utils';
import { AuthDto, AuthResponse, ResetPasswordResponse } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private mailerService: MailerService,
  ) {}

  async signUp({ password, email }: AuthDto): Promise<AuthResponse> {
    const user = await this.userService.findByEmail(email);

    if (user) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await this.hashData(password);
    const newUser = await this.userService.create(email, hashedPassword);

    const tokens = await this.getTokens(newUser.id, newUser.email);

    await this.updateRefreshToken(newUser.id, tokens.refreshToken);

    return tokens;
  }

  async login({ email, password }: AuthDto): Promise<AuthResponse> {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new BadRequestException('User does not exist');
    }

    const passwordMatches = await argon2.verify(user.password, password);

    if (!passwordMatches) {
      throw new BadRequestException('Password is incorrect');
    }

    const tokens = await this.getTokens(user.id, user.email);

    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async logout(userId: number): Promise<void> {
    await this.userService.update(userId, {
      refreshToken: null,
    });
  }

  async resetPassword(email: string): Promise<ResetPasswordResponse> {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new BadRequestException('User does not exist');
    }

    const newPassword = generatePassword();

    const hashedPassword = await this.hashData(newPassword);

    try {
      await this.sendResetPasswordEmail(email, newPassword);

      await this.userService.update(user.id, {
        password: hashedPassword,
      });

      return {
        message: 'Password has been reset',
      };
    } catch (error) {
      throw new BadRequestException('Password has not been reset');
    }
  }

  sendResetPasswordEmail(email: string, password: string): Promise<void> {
    return this.mailerService.sendMail({
      to: email,
      subject: 'Reset password',
      html: `
        <h3>Hi there!</h3>

        <p>Your new password is: <b>${password}</b></p>
      `,
    });
  }

  async refreshTokens(
    userId: number,
    refreshToken: string,
  ): Promise<AuthResponse> {
    const user = await this.userService.findById(userId);

    if (!user?.refreshToken) {
      throw new ForbiddenException('Access Denied');
    }

    const refreshTokenMatches = await argon2.verify(
      user.refreshToken,
      refreshToken,
    );

    if (!refreshTokenMatches) {
      throw new ForbiddenException('Access Denied');
    }

    const tokens = await this.getTokens(user.id, user.email);

    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  hashData(data: string): Promise<string> {
    return argon2.hash(data);
  }

  async updateRefreshToken(
    userId: number,
    refreshToken: string,
  ): Promise<void> {
    const hashedRefreshToken = await this.hashData(refreshToken);

    await this.userService.update(userId, {
      refreshToken: hashedRefreshToken,
    });
  }

  async getTokens(userId: number, email: string): Promise<AuthResponse> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRATION'),
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRATION'),
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
