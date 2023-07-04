import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { ExpenseModule } from './expense/expense.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [AuthModule, CategoryModule, ExpenseModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {
  static port: string;

  constructor(configService: ConfigService) {
    AppModule.port = configService.get<string>('PORT');
  }
}
