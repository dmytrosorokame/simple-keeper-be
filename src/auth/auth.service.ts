import { PrismaService } from './../prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signUp({ email, password }) {
    const user = await this.prisma.user.create({
      data: {
        email,
        password,
      },
    });

    return user;
  }
}
