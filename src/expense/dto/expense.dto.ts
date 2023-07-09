import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expense as PrismaExpense } from '@prisma/client';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateExpenseDto {
  @ApiProperty({
    type: Number,
    description: 'Expense amount',
  })
  @IsNumber()
  amount: number;

  @ApiProperty({
    type: Number,
    description: 'Expense category id',
  })
  @IsNumber()
  categoryId: number;

  @ApiPropertyOptional({
    type: String,
    description: 'Expense name',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    type: String,
    description: 'Expense comment',
  })
  @IsString()
  @IsOptional()
  comment?: string;
}
export class Expense implements PrismaExpense {
  @ApiProperty({
    type: Number,
    description: 'Expense id',
  })
  id: number;

  @ApiProperty({
    type: Number,
    description: 'Expense amount',
  })
  amount: number;

  @ApiProperty({
    type: Number,
    description: 'Expense category id',
  })
  categoryId: number;

  @ApiPropertyOptional({
    type: String,
    description: 'Expense name',
  })
  name: string | null;

  @ApiPropertyOptional({
    type: String,
    description: 'Expense comment',
  })
  comment: string | null;

  @ApiProperty({
    type: Number,
    description: 'User id',
  })
  userId: number;

  @ApiProperty({
    type: Date,
    description: 'Expense created at',
  })
  createdAt: Date;
}
