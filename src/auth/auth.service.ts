import { PrismaService } from './../prisma.service';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async signUp({ email, password }) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    delete createdUser.password;

    return createdUser;
  }

  async login({ email, password }) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new BadRequestException('Wrong password');
    }

    const payload = { sub: user.id, email: user.email };

    return {
      access_token: await this.jwt.signAsync(payload),
    };
  }
}
