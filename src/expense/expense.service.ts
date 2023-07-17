import { Injectable, NotFoundException } from '@nestjs/common';

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

  async getById(id: number, userId: number): Promise<Expense> {
    const expense = await this.prisma.expense.findUnique({
      where: { id },
    });

    if (!expense || expense.userId !== userId) {
      throw new NotFoundException('Expense not found');
    }

    return expense;
  }

  async delete(id: number): Promise<Expense> {
    return this.prisma.expense.delete({ where: { id } });
  }
}
