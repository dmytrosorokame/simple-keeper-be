import { PrismaService } from './../prisma.service';
import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

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
}
