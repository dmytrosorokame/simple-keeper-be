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
import { CategoryService } from './category.service';
import { Category, CreateCategoryDto } from './dto/category.dto';

@UseGuards(AccessTokenGuard)
@ApiBearerAuth()
@ApiTags(SwaggerApiTag.CATEGORIES)
@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @ApiResponse({ type: Category })
  @Post()
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
    @Req() req: Request,
  ): Promise<Category> {
    const userId = req['user']['sub'] as number;

    return this.categoryService.create(createCategoryDto.name, userId);
  }

  @ApiResponse({ type: Category, isArray: true })
  @Get()
  async getAllByUserId(@Req() req: Request): Promise<Category[]> {
    const userId = req['user']['sub'] as number;

    return this.categoryService.getAllByUserId(userId);
  }

  @ApiResponse({ type: Category })
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<Category> {
    return this.categoryService.delete(id);
  }
}
