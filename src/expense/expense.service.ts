import { Injectable } from '@nestjs/common';

import { PrismaService } from './../prisma.service';
import { CreateExpenseDto, Expense } from './dto/expense.dto';

@Injectable()
export class ExpenseService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateExpenseDto & { userId: number }): Promise<Expense> {
    return this.prisma.expense.create({
      data: dto,
    });
  }

  async getAllByUserId(userId: number): Promise<Expense[]> {
    return this.prisma.expense.findMany({
      where: { userId },
      include: { category: true },
    });
  }

  async delete(id: number): Promise<Expense> {
    return this.prisma.expense.delete({ where: { id } });
  }
}
