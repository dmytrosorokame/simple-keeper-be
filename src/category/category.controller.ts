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
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/category.dto';

@UseGuards(AuthGuard)
@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post()
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
    @Req() request: Request,
  ): Promise<{ name: string; id: number; userId: number }> {
    const userId = request['userId'] as number;

    return this.categoryService.create(createCategoryDto.name, userId);
  }

  @Get()
  async getAllByUserId(
    @Req() request: Request,
  ): Promise<{ name: string; id: number; userId: number }[]> {
    const userId = request['userId'] as number;

    return this.categoryService.getAllByUserId(userId);
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ name: string; id: number; userId: number }> {
    return this.categoryService.delete(id);
  }
}
