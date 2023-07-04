import { Injectable } from '@nestjs/common';

import { PrismaService } from './../prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(
    name: string,
    userId: number,
  ): Promise<{ name: string; id: number; userId: number }> {
    return this.prisma.category.create({ data: { name, userId } });
  }

  async getAllByUserId(
    userId: number,
  ): Promise<{ name: string; id: number; userId: number }[]> {
    return this.prisma.category.findMany({
      where: { userId },
    });
  }

  async delete(
    id: number,
  ): Promise<{ name: string; id: number; userId: number }> {
    return this.prisma.category.delete({ where: { id } });
  }
}
