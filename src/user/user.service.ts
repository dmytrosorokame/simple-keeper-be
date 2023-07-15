import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { PrismaService } from './../prisma.service';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  findByEmail(email: string): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
  }

  findById(id: number): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
  }

  create(email: string, password: string): Promise<User> {
    return this.prismaService.user.create({
      data: {
        email,
        password,
      },
    });
  }

  update(id: number, data: Partial<User>): Promise<User> {
    return this.prismaService.user.update({
      where: {
        id,
      },
      data,
    });
  }
}
