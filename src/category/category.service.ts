import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { Category } from './dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(name: string, userId: number): Promise<Category> {
    return this.prisma.category.create({
      data: { name, userId },
    });
  }

  async getAllByUserId(userId: number): Promise<Category[]> {
    return this.prisma.category.findMany({
      where: { userId },
    });
  }

  async delete(id: number, userId: number): Promise<Category> {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    if (category.userId !== userId) {
      throw new ForbiddenException(
        'You are not allowed to delete this category',
      );
    }

    return this.prisma.category.delete({ where: { id } });
  }
}
