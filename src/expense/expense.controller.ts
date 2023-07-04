import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';

import { AuthGuard } from './../auth/auth.guard';
import { CreateExpenseDto } from './dto/expense.dto';
import { ExpenseService } from './expense.service';

@UseGuards(AuthGuard)
@Controller('expense')
export class ExpenseController {
  constructor(private expenseService: ExpenseService) {}

  @Post()
  create(
    @Body() dto: CreateExpenseDto,
    @Req() request: Request,
  ): Promise<{
    name: string;
    amount: number;
    categoryId: number;
    userId: number;
    comment: string;
  }> {
    const userId = request['userId'] as number;

    return this.expenseService.create({ ...dto, userId });
  }

  @Get()
  getAllByUserId(@Req() request: Request): Promise<
    {
      name: string;
      amount: number;
      categoryId: number;
      userId: number;
      comment: string;
    }[]
  > {
    const userId = request['userId'] as number;

    return this.expenseService.getAllByUserId(userId);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<{
    name: string;
    amount: number;
    categoryId: number;
    userId: number;
    comment: string;
  }> {
    return this.expenseService.delete(id);
  }
}
