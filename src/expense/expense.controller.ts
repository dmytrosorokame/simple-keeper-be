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
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { AccessTokenGuard } from './../auth/guards/accessToken.guard';
import { SwaggerApiTag } from './../utils/swagger.utils';
import { CreateExpenseDto, Expense } from './dto/expense.dto';
import { ExpenseService } from './expense.service';

@UseGuards(AccessTokenGuard)
@ApiBearerAuth()
@ApiTags(SwaggerApiTag.EXPENSES)
@Controller('expenses')
export class ExpenseController {
  constructor(private expenseService: ExpenseService) {}

  @ApiResponse({ type: Expense })
  @Post()
  create(@Body() dto: CreateExpenseDto, @Req() req: Request): Promise<Expense> {
    const userId = req['user']['sub'] as number;

    return this.expenseService.create({ ...dto, userId });
  }

  @ApiResponse({ type: Expense, isArray: true })
  @Get()
  getAllByUserId(@Req() req: Request): Promise<Expense[]> {
    const userId = req['user']['sub'] as number;

    return this.expenseService.getAllByUserId(userId);
  }

  @ApiResponse({ type: Expense })
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<Expense> {
    return this.expenseService.delete(id);
  }
}
