import { PrismaService } from './../prisma.service';
import { Module } from '@nestjs/common';
import { ExpenseController } from './expense.controller';
import { ExpenseService } from './expense.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [ExpenseController],
  providers: [ExpenseService, PrismaService, JwtService],
})
export class ExpenseModule {}
