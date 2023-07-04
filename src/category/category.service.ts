import { PrismaService } from './../prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(name: string, userId: number) {
    return this.prisma.category.create({ data: { name, userId } });
  }

  async getAllByUserId(userId: number) {
    return this.prisma.category.findMany({
      where: { userId },
    });
  }

  async delete(id: number) {
    return this.prisma.category.delete({ where: { id } });
  }
}
