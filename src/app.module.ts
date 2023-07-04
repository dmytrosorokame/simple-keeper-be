import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { CategoryModule } from './category/category.module';
import { ExpenseModule } from './expense/expense.module';

@Module({
  imports: [AuthModule, CategoryModule, ExpenseModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
