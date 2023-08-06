import { expenseStub } from '../tests/stubs/expense.stub';

export const ExpenseService = jest.fn().mockReturnValue({
  create: jest.fn().mockReturnValue(expenseStub()),
  getAllByUserId: jest.fn().mockReturnValue([expenseStub()]),
  getById: jest.fn().mockReturnValue(expenseStub()),
  delete: jest.fn().mockReturnValue(expenseStub()),
});
