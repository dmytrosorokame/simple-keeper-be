import { Expense } from '@prisma/client';

export const expenseStub = (): Expense => ({
  id: 1,
  amount: 100,
  name: 'Test',
  comment: 'Test',
  createdAt: new Date('2021-01-01'),
  categoryId: 1,
  userId: 1,
});
