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
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/category.dto';
import { Request } from 'express';

@UseGuards(AuthGuard)
@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post()
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
    @Req() request: Request,
  ) {
    const userId = request['userId'] as number;

    return this.categoryService.create(createCategoryDto.name, userId);
  }

  @Get()
  async getAllByUserId(@Req() request: Request) {
    const userId = request['userId'] as number;

    return this.categoryService.getAllByUserId(userId);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.delete(id);
  }
}
