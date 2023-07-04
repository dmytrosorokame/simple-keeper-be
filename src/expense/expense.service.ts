import { Injectable } from '@nestjs/common';

import { PrismaService } from './../prisma.service';
import { CreateExpenseDto } from './dto/expense.dto';

@Injectable()
export class ExpenseService {
  constructor(private prisma: PrismaService) {}

  async create({
    name,
    amount,
    categoryId,
    userId,
    comment,
  }: CreateExpenseDto & { userId: number }): Promise<{
    name: string;
    amount: number;
    categoryId: number;
    userId: number;
    comment: string;
  }> {
    return this.prisma.expense.create({
      data: { name, amount, categoryId, userId, comment },
    });
  }

  async getAllByUserId(userId: number): Promise<
    {
      name: string;
      amount: number;
      categoryId: number;
      userId: number;
      comment: string;
    }[]
  > {
    return this.prisma.expense.findMany({
      where: { userId },
      include: { category: true },
    });
  }

  async delete(id: number): Promise<{
    name: string;
    amount: number;
    categoryId: number;
    userId: number;
    comment: string;
  }> {
    return this.prisma.expense.delete({ where: { id } });
  }
}
