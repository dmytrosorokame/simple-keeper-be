import { AuthGuard } from './../auth/auth.guard';
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
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/expense.dto';
import { Request } from 'express';

@UseGuards(AuthGuard)
@Controller('expense')
export class ExpenseController {
  constructor(private expenseService: ExpenseService) {}

  @Post()
  create(@Body() dto: CreateExpenseDto, @Req() request: Request) {
    const userId = request['userId'] as number;

    return this.expenseService.create({ ...dto, userId });
  }

  @Get()
  getAllByUserId(@Req() request: Request) {
    const userId = request['userId'] as number;

    return this.expenseService.getAllByUserId(userId);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.expenseService.delete(id);
  }
}
