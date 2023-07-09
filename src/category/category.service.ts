import { Injectable } from '@nestjs/common';

import { PrismaService } from './../prisma.service';
import { Category } from './dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(name: string, userId: number): Promise<Category> {
    return this.prisma.category.create({ data: { name, userId } });
  }

  async getAllByUserId(userId: number): Promise<Category[]> {
    return this.prisma.category.findMany({
      where: { userId },
    });
  }

  async delete(id: number): Promise<Category> {
    return this.prisma.category.delete({ where: { id } });
  }
}
