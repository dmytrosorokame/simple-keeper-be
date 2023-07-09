import { ApiProperty } from '@nestjs/swagger';
import { Category as PrismaCategory } from '@prisma/client';
import { IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    type: String,
    description: 'Category name',
  })
  @IsString()
  name: string;
}

export class Category implements PrismaCategory {
  @ApiProperty({
    type: Number,
    description: 'Category id',
  })
  id: number;

  @ApiProperty({
    type: String,
    description: 'Category name',
  })
  name: string;

  @ApiProperty({
    type: Number,
    description: 'User id',
  })
  userId: number;
}
