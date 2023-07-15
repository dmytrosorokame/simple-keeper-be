import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerOptions = new DocumentBuilder()
  .setTitle('Simple Keeper API')
  .setDescription('')
  .setVersion('1.0')
  .build();

export enum SwaggerApiTag {
  EXPENSES = 'Expenses',
  CATEGORIES = 'Categories',
  AUTH = 'Auth',
  USERS = 'Users',
}
