import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateExpenseDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  comment?: string;

  @IsNumber()
  amount: number;

  @IsNumber()
  categoryId: number;
}
