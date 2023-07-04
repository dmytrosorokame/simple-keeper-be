import { PrismaService } from './../prisma.service';
import { Injectable } from '@nestjs/common';
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
  }: CreateExpenseDto & { userId: number }) {
    return this.prisma.expense.create({
      data: { name, amount, categoryId, userId, comment },
    });
  }

  async getAllByUserId(userId: number) {
    return this.prisma.expense.findMany({
      where: { userId },
      include: { category: true },
    });
  }

  async delete(id: number) {
    return this.prisma.expense.delete({ where: { id } });
  }
}
